---
title: "Self-Maintainable CI ── Go testの失敗をClaudeで自動修復する仕組み"
source: "https://tech.layerx.co.jp/entry/self-maintainable-go-test-ci"
publishedDate: "2026-04-02"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "shibu526"
---

## はじめに

LayerX バクラク事業部 Platform Engineering 部 Enabling グループの shibutani です。

CIのテストが落ちたとき、開発者がやることは意外と多いです。ログを読み、原因を特定し、担当者を探し修正依頼 or 自分で修正する。これがrace conditionやflaky testのように再現しにくいものだと、対応はさらに後回しにされがちです。

今回、Go testの失敗を検知したらClaudeが自動でログを分析し、担当チームに通知し、修正PRまで作成する仕組みを構築しました。本記事ではその設計と実装を紹介します。

## `-race` フラグの分離と、その先の課題

出発点はPull Request作成時のCIの速度改善でした。これまではPull Request作成時のCIで `-race` フラグ付きの `go test` を実行していましたが、`-race` フラグはGoのrace detectorを有効にするオプションで、[公式ドキュメント](https://go.dev/doc/articles/race_detector)によると**メモリ使用量5〜10倍、実行時間2〜20倍**のオーバーヘッドが発生します。Pull Requestのたびにこのコストがかかり、開発者のフィードバックループを遅くしていました。

Agentic codingの普及によりPull Requestの量が増えつつある今、CIのthroughputを上げることの重要性は高まっています（参考: [ハーネスエンジニアリング：エージェントファーストの世界における Codex の活用](https://openai.com/index/harness-engineering/)）。そこで `-race` フラグをmainブランチへのpush後のCIに移し、Pull Request作成時のCIは `-race` なしで高速に実行する構成に変更しました。

しかし、単純に分離するだけでは新たな問題が生まれます。Pull Request作成時のCIで即座にフィードバックされていたrace conditionやflaky testが、mainブランチにマージされて初めて検出されるようになります。なお、バクラクではmainブランチへのマージが即本番デプロイされるわけではなく、QAなどの工程を経てリリースされるため、mainで検出しても本番への影響を防ぐ余地はあります。とはいえ、race conditionは「稀にしか起きない」「再現しにくい」、flaky testは「もう一回走らせたら通る」という性質から、mainブランチで失敗しても対応が後回しにされがちです。放置すればrace conditionは本番で影響の大きいバグとして発現し、flaky testはCIの信頼性を徐々に損ないます。

分離によるCI高速化のメリットを享受しつつ、検知した失敗が放置されない仕組みが必要でした。そこで、失敗の分析・担当チームへの通知・修正PRの作成までを自動化するパイプラインを構築しました。

## 全体のフロー

mainブランチへのpushをトリガーに、以下のフローで動作します。

flowchart TD
    A\[mainへのpush\] --> B\["go test -race<br/>testwrapper経由"\]
    B --> C{失敗あり？}
    C -- No --> D\[通知なし\]
    C -- Yes --> E\[Claudeによる失敗ログ分析\]
    E --> F{"既知のflaky<br/>のみ？"}
    F -- Yes --> G\[通知なし\]
    F -- No --> H\[CODEOWNERSからオーナーチームを特定\]
    H --> I\[Slackにグループメンション付きで通知\]
    I --> K{"DATA RACE<br/>あり？"}
    K -- Yes --> L\[修正 Draft PR を作成\]
    K -- No --> M\["Flaky Mark PR<br/>+ 修正 Draft PR を作成"\]

ポイントは、すべての失敗を検知しつつ、既知のflaky testによるノイズは通知しないことです。通知の信頼性を保つことで、「またflakyか」と無視される状態を防ぎ、本当に対処が必要な失敗に開発者の注意を集中させます。

## testwrapperによるテスト実行

通知の信頼性を保つためには、既知のflaky testと新規の失敗を区別する仕組みが必要です。

`go test` を直接実行する代わりに、社内で整備している `testwrapper` というCLIラッパーを経由して実行しています。この仕組みは [Tailscaleのtestwrapper/flakytest](https://github.com/tailscale/tailscale/tree/main/cmd/testwrapper) を参考にしたもので、弊社の @upamuneが [Go Conference 2025での発表](https://speakerdeck.com/upamune/flaky-testhenoxian-shi-jie-wogonopuropozarukarakao-eru-go-conference-2025) で詳しく解説しています。テスト関数内で `flakytest.Mark()` を呼ぶことで「このテストはflakyである」と宣言し、testwrapperがその情報を検知して自動的に最大3回までリトライします。

func TestSomething(t \*testing.T) {
    flakytest.Mark(t, "https://github.com/org/repo/issues/123")
    
}

`flakytest.Mark()` の第2引数にはTracking IssueのURLを渡します。なぜflaky化されているのか、いつ解消する予定かをIssueで管理する運用です。

既知のflaky testのみで失敗した場合は、testwrapperが自動リトライを試みます。リトライで通ればそのまま成功として扱い、リトライしても失敗が残った場合でもSlack通知やPR作成は行いません。既知のflaky testとして管理されている以上、対応済みと判断するためです。それ以外の失敗が含まれる場合に、次のClaudeによる分析フローに進みます。

テスト失敗を検知したら、Claudeがログ分析から修正PRの作成までを一気通貫で行います。この自動化はGitHub Actionsのカスタムアクションとして実装しており、[Anthropic SDK](https://docs.anthropic.com/en/api/getting-started)を通じてClaude APIを呼び出しています。

### ログの絞り込み

CIのログをそのままClaudeに渡すのではなく、関連度の高い部分に絞り込んでからプロンプトに含めています。DATA RACEブロックが検出された場合はそのブロックを優先的に抽出し、そうでない場合は `--- FAIL:` の前後20行を抽出します。

ログ全体を渡すとコンテキストウィンドウを消費するだけでなく、関係のない情報にClaudeが引きずられるリスクもあります。ノイズの除去が分析精度の向上に直結するため、この前処理は重要です。

### オーナーチームへの通知

失敗したテストのパッケージパスからCODEOWNERSを逆引きしてオーナーチームを特定し、GitHubチームとSlackグループのマッピングを通じてグループメンションを送ります。「テストが失敗した → 担当チームに通知が届く」という流れを自動化することで、誰にも気づかれないまま放置されるリスクを減らしています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shibu526/20260402/20260402140745.png)

SlackへのCI失敗通知の例

### 失敗種別に応じたPR自動作成

Claudeは失敗の種別に応じて、異なるPRを自動作成します。

**DATA RACEが検出された場合**、Claudeがソースコードを分析し、race conditionを修正するDraft PRを作成します。

**DATA RACEなしだが未マークのテスト失敗**の場合は、2種類のPRを作成します。

-   **FlakyをMarkするPR**: 該当テストに `flakytest.Mark()` を追加し、tracking Issueも同時に作成します。このPRをマージすると、次回以降はtestwrapperが自動リトライするようになり、Slackへの通知も止まります。
-   **Flakyを修正するDraft PR**: テストの非決定性を除去する修正案をClaudeが生成します。

いずれもDraft PRはエンジニアがレビューするまでマージされません。Claudeが自動でコードを書きますが、最終的な判断は人間が行う設計です。

FlakyをMarkするPRをマージするだけで、そのテストに起因する通知が次回から止まります。これにより、対処すればするほどノイズが減り、通知の信頼性が上がっていく好循環が生まれます。

## おわりに

今回構築した仕組みのポイントをまとめます。

-   `-race` フラグをmainブランチのCIに分離し、Pull Request作成時のCIの高速化とrace condition検知を両立した
-   testwrapperと `flakytest.Mark()` で既知のflaky testを自動リトライし、通知のノイズを除去した
-   Claudeによるログ分析・PR自動作成で、検知から修正提案までを自動化した
-   CODEOWNERSの逆引きでオーナーチームにグループメンションし、通知の見落としを防いだ

race conditionもflaky testも、放置されがちな問題です。原因の特定が難しく、影響がすぐには見えにくいため、目の前のタスクに押されて後回しになりがちです。この仕組みでは、検知・通知・修正提案を自動化することで対処のハードルを下げ、開発者が本来の開発に集中できる環境を目指しました。