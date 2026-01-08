---
title: "モジュラモノリスの品質を支えるリーダビリティチーム ― AI時代のスケーラブルなコード管理"
source: "https://engineering.mercari.com/blog/entry/20251021-scaling-code-quality-modular-monolith-readability-team-ai-era/"
publishedDate: "2025-10-21"
category: "engineering"
feedName: "Mercari Engineering"
---

## 1\. イントロダクション

こんにちは、Cross Border(XB) Engineeringのバックエンドエンジニアのosari.kです。本日は私が所属するリーダビリティチームの活動と、具体例として開発したバックエンドの共通パッケージについて紹介します。

メルカリグローバルアプリは、開発複雑性を抑えながら拡張性を保つためモジュラモノリスアーキテクチャを採用しています。モジュール間の依存関係を厳格化するため、システムはBFF層とTier1-4の階層構造で構成され、リクエストは上位から下位Tierへ流れます。モジュール間通信はProtocol Buffer + gRPCで標準化されています。詳しくは[ブログシリーズ](https://engineering.mercari.com/blog/entry/20251003-mercari-crossborder/ "ブログシリーズ")をご参照ください:

-   [グローバル展開にむけたアプリと基盤の再構築](https://engineering.mercari.com/blog/entry/20251007-a09afcd49b/ "グローバル展開にむけたアプリと基盤の再構築")
-   [グローバル展開を支える基盤の裏側](https://engineering.mercari.com/blog/entry/20251007-behind-the-infrastructure-powering-global-expansion/ "グローバル展開を支える基盤の裏側")

しかし、モジュラモノリスを採用するだけでは、マイクロサービス開発で発生した課題を解決できません。サービス間の差異によるメンテナンスコストやオンボーディングコストの増加は、モジュール間でも同様に発生する可能性があります。これらを解決するには、コードのリーダビリティと一貫性の維持が不可欠です。

そこで、グローバルアプリ開発の当初から**リーダビリティチーム**が組成されました。このチームは、モジュラモノリスの利点を最大限活かすため、Backendシステム全体のコードのリーダビリティを改善・維持する役割を担っています。メンバーは、アーキテクト、SREメンバー、バックエンドエンジニアで構成され、日本とインドの両拠点から参加しています。

一貫性のあるコードを維持することで、開発者を柔軟にアサインでき、効率的な配置が可能になります。また、AI Agentを活用した開発においても、明確なガイドライン、自動チェック、一貫したコードベースがAIの活用効果を高めます。

## 2\. リーダビリティチームの役割と活動

### 2.1 目的

リーダビリティチームの主な目標は、コードの可読性を向上させることです。可読性が高く、一貫性のあるコードは、以下の効果をもたらします:

-   新しいエンジニアの学習曲線を緩和し、オンボーディングを加速
-   組織内での担当変更やチーム間の貢献を円滑化
-   バグの検出や修正を容易にし、開発の品質とスピードを向上

### 2.2 活動内容

リーダビリティチームは以下の活動を通じて、コードの品質向上と開発スケールを支援しています:

-   **コードレビュー**: 複雑度の高いPRを中心にレビュー
-   **ガイドラインの作成と維持**: コードおよびPRガイドラインをGitHubリポジトリに集約
-   **自動化ツールの開発**: CIによる自動チェックを実装
-   **ワークショップの開催**: ベストプラクティスの共有
-   **隔週ミーティング**: ガイドライン、課題、改善点の議論
-   **メトリクス駆動の改善**: 開発ボトルネックの特定と継続的な改善

中でもメトリクス駆動の改善については、GitHubのメトリクスを活用して目標を設定し、定期的にボトルネックを分析しています。特に以下の2つのメトリクスの改善に取り組んできました:

-   一人あたり週何個のPull Requestをマージできたか
-   Pull RequestをOpenしてからマージまでの時間

これらを可視化することで、開発プロセスのボトルネックを特定し、継続的な改善につなげています。

## 3\. AI時代のスケーラブルな品質管理

開発初期はメンバーが少なく、リーダビリティチームがほぼ全てのPull Requestをレビューできていました。しかし、開発が本格化し、開発メンバーの増加やAI Agent活用の普及により、PRのボリュームが急増し、従来の方法では対応できなくなってきました。

幸い、ガイドラインをGitHubリポジトリに集約・維持していたため、LLMを活用したレビューの自動化基盤は整っていました。課題は、この基盤でどうスケーラブルに品質を担保するかでした。以下、具体的な取り組みをいくつか紹介します。

**Claude活用**  
ClaudeでPull Requestを複雑性とサイズの観点から自動分類し、ラベル付けを行っています。Claudeは、PRをより小さい単位に分割する助言も提供します。

このラベルを使い、複雑度が高いPull Requestを優先的にレビューできるようになりました。

また、GitHubに集約したガイドラインを活用したClaudeによるレビューの自動化で、コードレビューとガイドラインの適用を効率化しています。

**効率的レビュー**  
リーダビリティチームのレビューは必須ではありません。少なくとも一人のコードオーナーからレビューをもらえばPRはマージできます。これにより、リーダビリティチームが開発のボトルネックになりません。

一方で、マージされたPRの中で複雑度が高いものは後追いでレビューします。こうした複雑なPRから課題を検知し、新しいパターンやライブラリを導入することで、今後の開発を改善していきます。このアプローチで、効率的にレビューリソースを配分し、最も重要な部分に注力できています。

**自動化**  
ガイドラインを全て把握するのは困難なため、機械的にチェック可能なルールはCIに組み込んでいます。

例えば、データベースのスキーマ設計では、社内のDatabase リライアビリティエンジニアと相談し、[PostgreSQL ガイドライン](https://future-architect.github.io/arch-guidelines/documents/forDB/postgresql_guidelines.html "PostgreSQL ガイドライン")などを参考にガイドラインを策定しました。これを[SQL Fluff](https://www.sqlfluff.com/ "SQL Fluff")のプラグインとして実装し、自動チェックを行っています。

これにより、レビュアーの負担を軽減し、人間のレビュアーはより高度な設計判断やアーキテクチャの妥当性に集中できます。

## 4\. Feature Flag伝搬システムの設計

ここからは、リーダビリティチームが設計した品質管理の具体例として、Backendシステム全体で利用されるFeature Flag伝搬の仕組みを紹介します。

### 4.1 背景: Experiment Platformとモジュラモノリスアーキテクチャ

グローバルアプリでは、新機能のリリースを安全に行うため、メルカリの基盤システムである**Experiment Platform**を利用しています。この中でもFeature Flagを活用しており、お客さまごとに各種機能のオン・オフを管理できます。

Feature Flagを使うことで、Web UI上で機能をオンにするお客さまを段階的に増やせるため、新機能のリリースを様子を見ながら進めることができます。問題が発生した場合も、システム自体を再デプロイすることなく、Web UI上で機能をオフに設定し、即座に無効化できます。Experiment Platformは割当(Assignments)を管理し、システム側でこの割当を取得して実装に組み込みます。

Feature FlagはMobileアプリやWebアプリでも利用されています。これらのクライアントアプリでは、1人のお客さまが継続して利用するため、アプリ起動時などにFeature Flagを取得してキャッシュできます。一方、バックエンドシステムではリクエストごとにお客さまが異なるため、Experiment PlatformのAPIを毎回呼び出してデータを取得する必要があります。

前述の通り、グローバルアプリのBackend systemではモジュラーモノリスを採用しており、クライアントアプリからの１リクエストが内部的には複数のモジュールへのリクエストを発生させます。

![図1. 単純化した商品ページの例](https://storage.googleapis.com/prd-engineering-asset/2025/10/8eabf989-fig1-product-page-flow.png)

図1. 単純化した商品ページの例

全てのモジュールがFeature FlagのAssignmentsを必要とする可能性があります。 このようなアーキテクチャのため、もし各モジュールが毎回Experiment Platformからデータを取得する場合、APIのレイテンシがその分増加してしまいます。

![図2. 各モジュールがExperiment Platformを呼び出すとレイテンシが増加](https://storage.googleapis.com/prd-engineering-asset/2025/10/2ecb117a-fig2-latency-issue.png)

図2. 各モジュールがExperiment Platformを呼び出すとレイテンシが増加

グローバルアプリの開発が進み、Feature Flagを利用する状況になってきた中で、レイテンシの増加を防ぐため、効率的にAssignmentsを参照するメカニズムとガイドラインが必要になりました。

### 4.2 設計要件と実装

Assignmentsの効率的な参照メカニズムを設計するにあたり、以下の要件を定義しました:

-   Experiment Platformを一度だけ呼び出す
-   ネットワークトラフィックを抑える
-   割当に型安全なアクセス手段を提供する
-   既存のコードが割当を使いたくなった場合のコードの変更量を最小限にする

これらの要件を満たすために、 最終的に採用した解決策は、以下の3つの要素を組み合わせたものです:

1.  **gRPC metadataを使ってモジュール間のAssignments伝搬**: シリアライズしたAssignmentsをgRPC metadata（HTTP Header）で運ぶ
    -   BFF層のServer InterceptorがExperiment PlatformのAPIを呼び出し、Assignmentsを取得
    -   各モジュールのClient interceptorがAssignmentsをシリアライズしてgRPC metadataに設定
    -   BFF層以外のServer InterceptorがgRPC metadataから取得し、デリリアライズしてAssignmentsを取得
2.  **context.Contextを使ってモジュール内のAssignments伝搬**:
    -   Server InterceptorがAssignmentsを`context.Context`に格納
    -   アプリケーションロジックはAssignmentsを`context.Context`から取得
3.  **Protocol Bufferでの型定義**: Assignmentsを明示的に定義し、型安全性を確保かつコンパクトなシリアライズを実現

![図3. BFFがExperiment Platformを呼び出し、AssignmentsをgRPC metadataで伝搬](https://storage.googleapis.com/prd-engineering-asset/2025/10/62997b06-fig3-solution.png)

図3. BFFがExperiment Platformを呼び出し、AssignmentsをgRPC metadataで伝搬

BFFモジュールがExperiment platformのAPIを呼び出しAssignmentsを取得し、それを下位Tierのモジュールを呼び出すときにgRPC metadataで伝搬しています。 先程の図と異なり、BFFのみがExperiment platformを呼び出すため、レイテンシへの影響を抑えることができています。

モジュール内の伝搬に`context.Context`を利用しているので、アプリケーションロジックがAssignmentsを参照したくなった場合も、コードの変更は最小限に抑えられます。

一方でAssignmentsをリクエストに付与することでネットワークトラフィックには影響があります。そこで効率的なシリアライズ方法が必要です。

Experiment PlatformのAssignmentsは、パラメータ名と値のkey-value形式です。Feature Flagの値は`"true"`、`"false"`、または未割り当ての3つの状態を取ります。未割り当ては、段階的リリースでお客さまの一部のみが割当対象になっている場合に発生します。

例えば以下のような形式です（"feature\_flag1"は未割り当てのため含まれていない）:

```
{
  "feature_flag2": "false",
  "feature_flag3": "true",
  "foo": "10",
  "bar": "OK"
}
```

当初は`map[string]string`のJSON文字列としてシリアライズする案を検討しました。しかし、この方法では**パラメータ名の長さがシリアライズ結果に影響し**、数百〜数千のパラメータをサポートする場合に破綻します。  
そこで、**AssignmentsをProtocol Bufferで明示的に定義し、シリアライズする**ことにしました。  
上記の例をProtocol Bufferで定義するとこのようになります:

```
message Assignments {
  optional bool parameter1 = 1;
  optional bool parameter2 = 2;
  optional bool parameter3 = 3;
  optional int64 foo       = 4;
  optional string bar      = 5;
}
```

この方法により、以下の利点が得られます:

-   **コンパクトなシリアライズ結果**: パラメータ名はシリアライズ後のバイト長に影響を与えることがなくなり、Experiment Platform利用者はわかりやすい名前を使うことができます
-   **型安全性**: `optional`をつけることで、未割り当ての場合とfalseを区別できます。`*bool`型とすることで、Experiment Platformの利用時に陥りやすい罠である、未割り当て（`nil`）と`false`の区別が明示的になりました

Protocol Bufferで明示的に定義する方法は、新規パラメータ追加時にProtoファイルの変更が必要という欠点があります。しかし、どちらの方法でもGoコードの変更とデプロイは必要です。一方で、**どのパラメータがどこで利用されているか明確に把握できる**利点を我々は重視しました。

### 4.3 検討の詳細

ここでは設計で候補案として上がったものとの比較内容を通じて検討の詳細の一部を紹介します。

#### 4.3.1 in-memory cache案

gRPC metadataを使ったモジュール間の伝搬以外の方法として、in-memory cacheを利用したデータ共有という案がありました。 Experiment Platform ClientをProxyしてin-memory cacheのデータを返すことで、API呼び出しのレイテンシを削減する方法です。

in-memory cacheの場合、モジュール間でAssignmentsの伝搬をする必要がないため、ネットワークトラフィックを抑えることも可能です。 特に、多くのモジュールがAssignmentsを利用しない場合にgRPC metadataを使う方法に対して優位性があります。

![図4. in-memory cacheを利用した方法（BFFとTier2 ProductだけがAssignmentsを利用する場合）](https://storage.googleapis.com/prd-engineering-asset/2025/10/059170eb-fig4-alt-cache.png)

図4. in-memory cacheを利用した方法（BFFとTier2 ProductだけがAssignmentsを利用する場合）

最終的には、Protocol bufferを利用したassignmentsのシリアライズによりネットワークトラフィックの優位性が小さいこと、 **分割して運用が可能なモジュラモノリス**を実現していく中で、モジュール間でcacheが共有されないケースが増えていくことが予想されるため gRPC metadata を利用した方法を選択しました。

#### 4.3.2 明示的なリクエストフィールド案

gRPC metadataではなく、Protocol Bufferで明示的なリクエストフィールドとして定義する案も検討しました。グローバルアプリBackendでは、API仕様の可視性や型安全性の観点から、一般的には明示的なフィールドを選択しています。

しかし、この方法には全てのモジュールの全てのエンドポイントにAssignmentsフィールドを定義しなければならないという問題があります。Tier2のProductモジュールがAssignmentsを必要とする場合、中継するだけのTier1のエンドポイントにも同様のフィールドが必要になります。すでに多くのエンドポイントが開発されており、全てに修正を加えるのは現実的ではありませんでした。

また、Protocol Bufferを利用することでgRPC metadataの長さも十分小さくなることが分かったため、gRPC metadataによる伝搬を選択しました。

### 4.4 将来対応

gRPC metadataを使うため、Headerのサイズ制限に引っかからないよう対策を講じています。ユニットテストで最大バイト長になりうるシリアライズ結果がしきい値を超えていないか検知できるようにしています。

現在は全てのパラメータが`optional bool`型であるため非常にコンパクトですが、しきい値を超えた場合の対応策として、どのモジュールがどのパラメータを参照しているかを静的に解析し、必要なパラメータだけを伝搬するように機能を拡張する予定です。Protocol Bufferで明示的にパラメータを定義しているため、Assignmentsの参照の解析が容易になります。これも、明示的な定義を選択した利点の一つです。

## 5\. まとめ

本記事では、メルカリグローバルアプリのリーダビリティチームの活動と、Feature Flag伝搬システムの設計について紹介しました。

リーダビリティチームは、モジュラモノリスアーキテクチャの利点を最大限活かすため、コードの可読性と一貫性を維持し、開発をスケールさせる役割を担っています。GitHubメトリクスを活用した継続的な改善、Claudeによる複雑度分析、CIによる自動チェックなど、様々な活動を通じて品質を担保しています。

Feature Flag伝搬システムでは、以下を重視しました:

-   **Protocol Bufferによる明示的な型定義**: 型安全性と利用状況の可視化
-   **gRPC metadataとcontext.Contextによる透過的な伝搬**: 既存コードへの影響を最小限に

これらの設計判断は、技術的な実装の問題だけでなく、開発チーム全体のスケーラビリティを考慮したものです。

AI時代において、ガイドラインの明文化、自動チェック、一貫したコードベースの維持は、AI Agentを活用した開発の重要な基盤となります。リーダビリティチームは、開発の品質とスピードの両立を目指して活動を続けていきます。

最後までお読みいただき、ありがとうございました。