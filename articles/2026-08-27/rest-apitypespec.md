---
title: "REST APIにTypeSpecを導入してスキーマ駆動開発"
source: "https://tech.layerx.co.jp/entry/typespec-in-aiworkforce"
publishedDate: "2026-08-26"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "ninjinkun"
---

[Ai Workforce](https://getaiworkforce.com/) （以下AiW）を開発しているフロントエンドエンジニアの[![](https://cdn.profile-image.st-hatena.com/users/ninjinkun/profile.png)id:ninjinkun](http://blog.hatena.ne.jp/ninjinkun/)です。AiWではサーバーとフロントエンドの通信にREST APIを使っています。これまではサーバーサイドのFastAPI（Python）からOpenAPI Specを出力してクライアントコードの自動生成を行うフローはあったものの、サーバーサイドの実装が完了しないとフロントエンドの実装が始められない課題がありました。

私はGraphQLを利用した経験が長かったため、APIスキーマを実装前に定義し、フロントエンドとバックエンドがスキーマを使って並行で開発を行うスキーマ駆動開発をAiWにも持ち込みたいと考えました。また、APIスキーマなどの定義フォーマットはコーディングエージェントとも相性が良いため、全員がコーディングエージェントを活用するチーム全体の生産性にも寄与する狙いがありました。

そこで、APIスキーマを記述する方法として、いくつかの候補の中からTypeSpecを選定しました。

TypeSpecはTypeScriptの開発元であるMicrosoftが開発しているAPIスキーマフォーマットで、TypeScriptから強い影響を受けています。主な特徴は以下の通りです。

-   型による表現力が強力
    -   Union型やDiscriminated Unionが利用可能
    -   エラーも型として定義できる
-   コンパイラにより型に矛盾がないか事前に検証可能
-   OpenAPI YAMLに変換可能
    -   これによりOpenAPIのインフラを全て利用可能
    -   クライアント生成などをそのまま利用できる

以下は実際に使われているAPI定義の一例です。`/workflow-runs/{workflowRunId}`に対するGETとDELETEを定義しています。

namespace AiWorkforce.Rest;

@route("/workflow-runs/{workflowRunId}")

namespace WorkflowRuns {
    @doc("ワークフロー実行の表示用サマリーを取得する")
    @get
    op get(@path workflowRunId: Models.uuid): Models.WorkflowRunSummaryResponse;
    
    @doc("ワークフロー実行を削除する")
    @delete
    op remove(
        @path workflowRunId: Models.uuid,
    ): Models.WorkflowRunNoContentResponse | Models.WriteErrors;
    …
}

## TypeSpecの選定

REST APIをスキーマで定義する方法はいくつかありますが、一番有名なのは前述のOpenAPIをスキーマとして使う方法でしょう。OpenAPIは表現力が高くほとんどの用途を賄えますが、YAMLで記述する必要があり、複雑な定義になると人が読み書きすることは困難になります。

APIスキーマフォーマットの選定にあたってはOpenAPIを直接使う方法をはじめ、[Fern](https://buildwithfern.com/)、[Smithy](https://smithy.io/)など他のAPIスキーマフォーマットと比較を行いました。既存のAPIエンドポイントのスキーマをコーディングエージェントに書かせた上で評価した結果は以下の通りです。

評価軸

TypeSpec

Fern

Smithy

OpenAPI 直書き

記述の簡潔さ

◎

◎

○

△

型の表現力

◎

○

◎

△

学習コスト

○

○

△

◎

ツールエコシステム

○

△

○

◎

AI 生成・レビューの容易さ

◎

○

○

△

環境構築の手軽さ

◎

△ (Docker+Node22必須)

△ (JVM必須)

◎

既存ワークフローとの統合

◎

△

△

◎

長期メンテナンス性

◎

○

○

○

各ツールの Pros / Cons詳細

### **1\. TypeSpec (Microsoft)**

**概要:** Microsoft が開発した API 定義 DSL。TypeScript ライクな構文で API を定義し、OpenAPI 等を生成する。

**Pros:**

-   簡潔な記述 — ソース **410行**で 9 エンドポイントを定義でき、4 候補中最少
-   型の表現力が高い — model 継承 (`extends`)、template、union、decorator でモデル間の関係を自然に表現できる
-   コンパイル時の型チェック — YAML と違い、未定義の型参照や構造エラーをビルド時に検出
-   TypeScript ライクな構文 — フロントエンドチームが馴染みやすい
-   AI 生成・レビューとの親和性 — 構造化された DSL は LLM にとって生成しやすく、人間のレビューでも差分が読みやすい（YAML の `$ref` パスよりモデル定義が直感的）
-   Microsoft がバックしており Azure / .NET エコシステムとの統合が進んでいる
-   VSCode 拡張でのエディタ支援（補完、ホバー、ジャンプ）

**Cons:**

-   TypeSpec 固有の構文学習が必要（ただし TypeScript 経験者には障壁が低い）
-   生成される OpenAPI の細部を直接制御しにくい（emitter の変換ロジックに依存）
-   エコシステムが成長途中（2023年 GA）。StackOverflow やブログの情報は OpenAPI ほど多くない
-   `@typespec/rest` の namespace ベースルーティングはやや独特

* * *

### **2\. Fern**

**概要:** API ファーストの開発プラットフォーム。Fern Definition Language (FDL) で API を定義し、SDK / ドキュメントを自動生成。YAML ベースの独自フォーマット。

**Pros:**

-   YAML ベースで学習コストが低い — 既存の YAML 知識がそのまま活かせる。ソース **437行** と TypeSpec (410行) に近い簡潔さ
-   `extends` による型の継承をサポート — OpenAPI 直書きや Smithy にない DRY な記述が可能
-   SDK 自動生成に強み — TypeScript, Python, Go, Java 等のクライアント SDK をワンコマンドで生成
-   ドキュメント生成が美しい — Fern Docs でホスティング可能な API ドキュメントを自動生成
-   OpenAPI 3.1 を生成 — 最新仕様に対応

**Cons:**

-   **Docker が必須** — OpenAPI 生成は `fernapi/fern-openapi:latest` コンテナ経由で実行されるため、ローカル環境に Docker が必要
-   **Node.js 22 限定** — Node.js 25 では動作せず、バージョン管理に注意が必要 (fern-api v4.102.0 時点)
-   YAML なので型安全性はない — typo や構造エラーは `fern check` まで検出できない（コンパイラ型チェックではない）
-   SaaS 依存 — SDK 生成やドキュメントホスティングの一部が Fern Cloud 前提
-   コミュニティ規模が小さい — エンタープライズ事例は限定的
-   独自フォーマットのため、OpenAPI エコシステムのツール（Redoc, Stoplight 等）で直接編集・プレビューはできない

* * *

### **3\. Smithy (AWS)**

**概要:** AWS が開発した IDL (Interface Definition Language)。protocol-agnostic なモデル定義から OpenAPI 等を生成する。

**Pros:**

-   強力な型システム — structure、union、enum、list を明示的に定義でき、モデルの制約を厳密に表現
-   protocol-agnostic — REST だけでなく RPC やイベントベースの API も同一の IDL で定義可能
-   バリデーション trait が豊富 — `@required`, `@range`, `@length`, `@pattern` 等がビルトイン
-   AWS サービスの実績 — 大規模な API 定義で実証済み

**Cons:**

-   **JVM が必須** — ビルドに Java ランタイムが必要で、フロントエンドチームの開発環境に追加の依存
-   学習コストが高い — Smithy 独自の構文に加え、AWS 固有の trait (`aws.protocols#restJson1`) の理解が必要
-   list 型の明示定義が冗長 — `list AssetResponseList { member: AssetResponse }` のようなボイラープレートが必要で、ソース **673行**と TypeSpec の約 1.6 倍
-   model 継承がない — `WorkroomDefinitionWithUsage` で `WorkroomDefinitionResponse` のフィールドを全て再定義する必要があった（DRY に反する）
-   `@httpPayload` に list を直接バインドできない — structure でラップする必要があり、レスポンスの形が変わる
-   union は自動的にタグ付き — TypeSpec / Fern の `discriminated: false` 相当の表現が難しい
-   コミュニティが AWS エコシステム寄り — REST API 中心のユースケースではオーバースペック
-   生成される OpenAPI が JSON のみ（1,001行）で、YAML 出力はデフォルトで未サポート

* * *

### **4\. OpenAPI 直書き (YAML)**

**概要:** OpenAPI 3.0 仕様を YAML で直接記述。`$ref` でファイル分割し、Redocly CLI で lint / bundle する。

**Pros:**

-   追加の言語学習が不要 — OpenAPI の知識さえあれば誰でも読み書きできる
-   業界標準 — Swagger, Redoc, Orval, Stoplight 等、圧倒的なツールエコシステム
-   出力を完全に制御できる — 生成ツールの変換を介さないため、意図した通りの OpenAPI spec になる
-   依存が軽い — Redocly CLI 1 つだけ（JVM 不要、Node.js のみ）
-   CI/CD への組み込みが容易

**Cons:**

-   冗長 — 同じ API を記述するのに **771行**（TypeSpec の約 1.9 倍）
-   `$ref` が読みにくい — `"../models/common.yaml#/uuid"` のような参照パスが多用され、コードレビュー時にモデルの全体像を把握しにくい
-   DRY が弱い — 共通パターン（ページネーション等）を再利用する仕組みがなく、コピペが発生しやすい
-   型安全性がない — YAML なので typo や不正な構造は lint 時にしか検出できない
-   AI 生成時に冗長な YAML を正確に出力させるのが難しく、`$ref` パスの不整合が起きやすい

結果としてTypeScript由来の型の表現力、記述の簡潔さによってTypeSpecを選定しました。私を含め開発メンバーがTypeScriptに慣れていたことも、選定の大きな後押しになりました。

## Ai Workforceでの開発フロー

実際の開発フローは以下の通りです。

1.  フロントエンドエンジニア、バックエンドエンジニアのどちらかがTypeSpecを記述してレビューに出す
    -   このレビューは最も重要なのでAIを使いながらも人間がしっかり見る
2.  レビューが通ったらフロントエンドは[Orval](https://orval.dev/)でOpenAPI YAMLから[MSW](https://mswjs.io/)を利用するモックAPIと[SWR](https://vercel.com/oss/swr)を使ったクライアントを生成し、実装を開始する
3.  バックエンドは並行してスキーマを満たすAPIを実装する
    -   コーディングエージェントがスキーマから実装
    -   スキーマ違反は実装から生成されるOpenAPIとの比較を行う自作スクリプトによりCI上で検知される
4.  バックエンドが実装できたらフロントエンドはモックを外して実際のAPIに接続する
    -   モックは引き続きテストやStorybookなどで利用可能

## 利用して見えたメリット

実際に利用してみた感想は以下の通りです。

-   スキーマ駆動開発におけるフロントエンド、バックエンドの並行開発は生産性が高い
-   型による表現力は期待以上
    -   特に型によって必要なプロパティを絞れる[Discriminated Types](https://typespec.io/docs/standard-library/discriminated-types/)（Discriminated Union）が便利
    -   TypeScriptに慣れていれば同じ感覚で使える
-   APIが返すエラーを型として網羅的に定義し、対応漏れを避けられる
-   コーディングエージェントが参照する定義としても有用
    -   コードやOpenAPIを読むよりも行数が少なく済むのでトークンにも優しい
-   MSWによるモックはあまり使われなかった
    -   コーディングエージェントによってバックエンド開発が高速化したのも一因かも

以下は特に便利だったDiscriminated Typesの例です。ただしAPIがやり取りするJSONそのものには型の情報がないため、以下の`scope`のような型判別用のプロパティをリクエストやレスポンスに含める必要があります。

@doc("閲覧権限のデフォルト設定。scope フィールドで workspace / groups を判別する。")
@discriminated(#{ envelope: "none", discriminatorPropertyName: "scope" })
union DefaultViewer {
  workspace: DefaultViewerWorkspace,
  groups: DefaultViewerGroups,
}

@doc("閲覧権限のデフォルト: ワークスペース全員に共有")
model DefaultViewerWorkspace {
  scope: "workspace";
}

@doc("閲覧権限のデフォルト: 特定グループに共有")
model DefaultViewerGroups {
  scope: "groups";

  @doc("閲覧権限のデフォルトグループ ID リスト。")
  groupIds: uuid\[\];
}

また、先日行った振り返りでも、開発に参加したエンジニア全員が今回のプロジェクトで良かったこととしてTypeSpecの導入を支持しました。

## 今後の課題

初めはTypeSpecファイルを同じディレクトリにフラットに置いていたのですが、REST APIが増えるに従って管理しづらくなってきました。TypeSpec自体は階層構造を定義しないため、ユーザー側が構造を考える必要があり、チーム開発においては今後何らかの標準化を行う必要がありそうです。

課題はあるものの、TypeSpecの導入によってスキーマ駆動開発への移行はスムーズに実現でき、チームの生産性向上を実感しています。REST APIのスキーマ駆動開発を検討している方の参考になれば幸いです。

## お知らせ: AIカンファレンス「Bet AI Day 2026」を開催します

AIは「使う」段階から「共に働く」段階へ。 2回目となる「Bet AI Day 2026」は "AIエージェントと働く未来に、Betしよう" のメッセージを軸に、LayerXにおけるAIエージェント活用の実践知などを余すことなく共有します。

昨年同様にオンラインでも開催しますので、全国どこからでも、PCやスマートフォンからお気軽にご視聴いただけます。AIエージェントと働く未来について興味のある方、ぜひ「Bet AI Day 2026」にご参加ください。

EVENT

### AIカンファレンス「Bet AI Day 2026」開催概要

開催日時

2026年9月3日（木）12:00 開演

開催方法

オンライン配信

参加費用

無料（事前申込制）

[connpass でお申し込み](https://layerx.connpass.com/event/399169/)