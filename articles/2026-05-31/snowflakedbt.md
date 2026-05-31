---
title: "Snowflakeとdbtでモデルの依存関係にガバナンスを効かせる"
source: "https://tech.layerx.co.jp/entry/dbt-authorized-models"
publishedDate: "2026-05-29"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "civitaspo"
---

こんにちは。バクラク事業部 BizOps部 データグループの[@civitaspo](https://twitter.com/Civitaspo)です。

この記事では、Snowflake と dbt を使ったデータ基盤で、意図しないデータ参照を防ぐために作った dbt package、[`dbt-authorized-models`](https://github.com/civitaspo/dbt-authorized-models) を紹介します。

[github.com](https://github.com/civitaspo/dbt-authorized-models)

## はじめに

LayerX のデータ基盤では、dbt を使って、データの用途や加工段階に応じてモデルを階層化して管理しています。たとえば、生データに近い層、分析しやすい形に整えた層、業務やプロダクトで使いやすい形に集約した層、というように責務を分けています。

この構造は [Medallion Architecture](https://docs.databricks.com/en/lakehouse/medallion.html) の亜種だと考えてもらえるとわかりやすいと思います。以降では説明のために Bronze / Silver / Gold という呼び方を使いますが、staging / intermediate / mart のような構成や、各社で使っている階層構造に読み替えながら読んでください。

[docs.databricks.com](https://docs.databricks.com/en/lakehouse/medallion.html)

このような階層構造では、依存関係の向きが重要です。たとえば Gold 層のモデルは Silver 層を参照して作られますが、Silver 層のモデルが Gold 層を参照してしまうと、データアーキテクチャ上の責務が崩れます。再利用してよいと思っていた中間モデルが、実は下流の業務ロジックに依存していた、という状態になると変更影響の見通しも悪くなります。

また、単一の dbt Project の中でも、すべてのモデルを同じ参照可能範囲で扱えるとは限りません。ディメンショナルモデリング等で適切にモデリングされた、広く参照されてよいデータモデルもあれば、データオーナーやモデルオーナーが許可した範囲でのみ参照できるようにしたいモデルもあります。

この記事では、このようなデータアーキテクチャにおいて、意図しないデータ参照をどう防ぐかを扱います。LayerX でも、これまではドキュメントやコードレビューで設計意図を共有しながら運用してきました。しかし、機械的にポリシーを強制できる仕組みがなければ、データ基盤の利用者や開発者が増えるにつれて、人の注意だけで参照ポリシーを守り続けるのは難しくなります。さらに、AI Agent による実装が当たり前になっていくことも踏まえると、ポリシーに準拠していることを機械的に検査できる仕組みがより重要になると考えています。

-   [はじめに](#はじめに)
-   [dbt-authorized-models を作った背景](#dbt-authorized-models-を作った背景)
    -   [Snowflake の機能では、データ間の参照境界を強制することはできない](#Snowflake-の機能ではデータ間の参照境界を強制することはできない)
    -   [dbt 実行ロールが広い参照権限を持つと、本来許可してはいけない参照が成立してしまう](#dbt-実行ロールが広い参照権限を持つと本来許可してはいけない参照が成立してしまう)
    -   [dbt の model access は、今回必要な許可ルールとは粒度が異なる](#dbt-の-model-access-は今回必要な許可ルールとは粒度が異なる)
    -   [dbt-authorized-models を作った背景まとめ](#dbt-authorized-models-を作った背景まとめ)
-   [dbt-authorized-models を使って、参照ルールに違反した依存関係を検出する](#dbt-authorized-models-を使って参照ルールに違反した依存関係を検出する)
-   [dbt-authorized-models の使い方](#dbt-authorized-models-の使い方)
    -   [package を追加して authorization check を実行する](#package-を追加して-authorization-check-を実行する)
    -   [モデルオーナーが参照範囲を管理できるようにする](#モデルオーナーが参照範囲を管理できるようにする)
    -   [許可ルールを誰が変更できるかまで考える](#許可ルールを誰が変更できるかまで考える)
    -   [導入時の注意点](#導入時の注意点)
-   [まとめ](#まとめ)
-   [We are hiring 🔥](#We-are-hiring-)

ここから前半では、なぜ `dbt-authorized-models` が必要になったのかを説明します。使い方だけ先に確認したい方は、後半の「dbt-authorized-models の使い方」から読んでください。

### Snowflake の機能では、データ間の参照境界を強制することはできない

意図しないデータ参照を防ぐ方法として、まず考えたのは、dbt の DAG とは別にインフラレイヤーで参照境界を強制することでした。この発想は、BigQuery の [authorized view](https://cloud.google.com/bigquery/docs/authorized-views) や [authorized dataset](https://cloud.google.com/bigquery/docs/authorized-datasets) に近いものです。データプラットフォーム側で「このデータは、許可された view や dataset 経由でのみ参照できる」という境界を表現できれば、dbt のコードやレビューだけに頼らずにガバナンスを効かせられます。

[cloud.google.com](https://cloud.google.com/bigquery/docs/authorized-views) [cloud.google.com](https://cloud.google.com/bigquery/docs/authorized-datasets)

authorized view は、利用者に元テーブルへの直接権限を与えず、許可された view 経由でデータを参照させるための仕組みです。authorized dataset は、その考え方を dataset 単位に広げ、特定の dataset に含まれる view 群を、別 dataset のデータにアクセスできる主体としてまとめて許可するための仕組みです。

一方、Snowflake には、被参照データ側の ACL 等に特定の view 群や dataset を authorized resource として登録し、そこを経由した参照だけを許可する、という BigQuery の authorized dataset と同じ考え方の機能は存在しません。もちろん Snowflake にも、ロールベースの権限管理、Secure View、Row Access Policy、Masking Policy など、データアクセスを制御するための機能はあります。利用者にデータソースとなるテーブルへの直接権限を与えず、制御された view を公開する設計も可能です。

単一の権限主体によるアクセスであれば、Snowflake の built-in 機能だけでも多くのケースを制御できます。たとえば BI やアドホッククエリの利用者に対しては、RBAC や Secure View などを組み合わせることで、データソースとなるテーブルへの直接参照を制御できます。

問題になるのは、dbt Project の実行のように、複数の権限主体が持つ参照範囲を単一の実行ロールがまとめて持ちうるケースです。

### dbt 実行ロールが広い参照権限を持つと、本来許可してはいけない参照が成立してしまう

dbt Project の実行では、Snowflake に接続するときの role が profile の接続設定で決まります。dbt-snowflake で単一の Project / run を実行する場合、参照元モデルごとに Snowflake role が自動で切り替わるわけではありません。

一方、dbt のモデル依存関係は、SQL の中で `ref()` や `source()` を書くことで追加できます。つまり、DAG 上ではモデル単位で参照関係を作れますが、その参照関係に合わせて Snowflake の権限境界がモデル単位で切り替わるわけではありません。

複数の target や job に分ければ権限分離はできます。ただし、権限境界に合わせて実行単位を細かく分けるほど、開発、CI、リリース、依存関係の管理は複雑になります。モデルごとに Snowflake role を切り替えて参照範囲を制御する運用は、dbt の標準的な実行モデルとは相性がよくありません。

結果として、単一 Project のまま多くのデータモデルを管理する場合、dbt の実行ロールには広い参照権限が付与されがちです。本来であれば別々の権限主体が持つべき参照範囲を、dbt の実行ロールがまとめて持つことになります。このような実行ロールでモデルを構築すると、権限上は参照できても、データアーキテクチャ上は本来許可してはいけない参照が成立してしまいます。

### dbt の model access は、今回必要な許可ルールとは粒度が異なる

ここまでの課題に対して、dbt が持つガバナンス機能で解けないかも考えました。

まず、権限境界ごとに dbt Project を分け、[dbt Mesh](https://docs.getdbt.com/best-practices/how-we-mesh/mesh-2-who-is-dbt-mesh-for?version=1.12) として運用する方法があります。複数のチームや Project がデータプロダクトを共有する組織では自然な選択肢です。ただし、Project を分けると、公開モデルの管理、利用側との調整、CI/CD やリリース単位の設計も必要になります。既存の単一 Project で許可していない参照を防ぐためだけに Project を分割すると、運用の負荷が大きくなりがちです。

[docs.getdbt.com](https://docs.getdbt.com/best-practices/how-we-mesh/mesh-2-who-is-dbt-mesh-for)

では、単一 Project のまま dbt の機能で参照境界を表現できないでしょうか。dbt のドキュメントでは [model governance](https://docs.getdbt.com/docs/mesh/govern/about-model-governance?version=1.12) は dbt Mesh の文脈で説明されていますが、model access、model contracts、model versions などは単一の dbt Project でも利用できます。そのため、Project を分割しない場合でも、[model access](https://docs.getdbt.com/docs/mesh/govern/model-access) で今回の課題を解けないかは検討対象になります。

[docs.getdbt.com](https://docs.getdbt.com/docs/mesh/govern/about-model-governance) [docs.getdbt.com](https://docs.getdbt.com/docs/mesh/govern/model-access)

model access は、`group` と `access` を使い、モデルの所有者と公開レベルを表現するための機能です。モデルを `private` / `protected` / `public` として扱い、どの範囲から `ref()` できるかを制御できます。

これは、モデルを内部実装として閉じるのか、同じ Project 内で使えるようにするのか、他の Project からも参照できる安定したインターフェースとして公開するのかを表現するには有用です。一方で、特定のモデルや source に対して、どの参照主体からの利用を許可するかを細かく定義するための機能ではありません。また、model governance は model を対象にした機能であり、source への参照制御には使えません。

今回扱いたいのは、参照されるモデルや source ごとに「どの dbt node からの参照を許可するか」を明示・強制することです。たとえば、「このモデルはこの schema のモデルからだけ参照してよい」「この source はこの tag を持つモデルからだけ参照してよい」のように、参照元の `database`、`schema`、`identifier`、`package_name`、`tags` などのメタデータに基づいて許可範囲を定義したい場合があります。

つまり、model access はモデルの所有者と公開範囲を表現するには有用ですが、参照元メタデータに基づく細かな allow-list や、`source()` への参照制御を表現するためのものではありません。単一 Project のまま参照境界を守るには、別の仕組みで参照関係を検査する必要があります。

### dbt-authorized-models を作った背景まとめ

ここまで見てきたように、今回の課題は Snowflake の権限設定だけでは解決しきれません。dbt Project では、1つの実行ロールが広い参照権限を持ちがちです。そのため、権限上は参照できても、データアーキテクチャ上は作るべきではない依存関係が入り込む余地があります。

この課題に対する選択肢として、dbt Mesh のように権限境界に合わせて Project を分ける方法はあります。ただし、既存の単一 Project の中で参照ポリシーを守りたい場合、Project を分けるには運用設計の変更が大きくなります。また、model access はモデルの所有者と公開レベルを表現する機能であり、参照元メタデータに基づいて細かく許可範囲を定義する用途とは粒度が異なります。

そこで必要になったのは、単一 Project の中で、参照されるモデルや source の側に「どの dbt node からの参照を許可するか」という条件を持たせる仕組みです。この仕組みがあれば、レビューで気づけるかどうかに頼らず、参照関係を機械的に検査できます。

この仕組みで守りたい参照ルールは、主に2つあります。1つは、データアーキテクチャ上の層の向きです。たとえば Silver 層から Gold 層への参照を禁止したい場合、Gold 層のモデル側に「どの参照元からなら参照してよいか」を定義し、その条件に合わない `ref()` を検出できる必要があります。

もう1つは、参照を制限したいモデルや source が、モデルオーナーの意図しない形で使われることを防ぐことです。情報の公開範囲を制御したいリソースは、存在しているからといって誰でも参照してよいわけではありません。参照元の `resource_type`、`database`、`schema`、`package_name`、`tags` などのメタデータに基づいて、データオーナーやモデルオーナーが明示的に許可した参照だけを認める必要があります。

この要件を満たすには、許可ルールの責務を参照される側のモデルや source に置く必要があります。参照する側のモデルに「このリソースを参照してよい」と書けるだけでは、参照される側のモデルオーナーが参照範囲を管理できません。参照される側が、自身を参照できる dbt node の条件を宣言し、その条件に合わない依存関係を違反として扱える必要があります。

この被参照側主導の許可モデルを dbt の依存関係に対して検査するために、 `dbt-authorized-models` を作りました。

## dbt-authorized-models を使って、参照ルールに違反した依存関係を検出する

[`dbt-authorized-models`](https://github.com/civitaspo/dbt-authorized-models) は、dbt のモデルや source への参照関係を検査する dbt package です。

[github.com](https://github.com/civitaspo/dbt-authorized-models)

参照される側のモデルや source に `meta.authorize` を定義し、参照する側の dbt node がそのルールにマッチするかを確認します。マッチしない場合は、警告として出すことも、コンパイルエラーとして止めることもできます。

`dbt-authorized-models` は deny-by-default です。参照されるモデルや source に `meta.authorize` が定義されていない場合、そのリソースへの参照は許可されていないものとして扱われます。

重要なのは、この package は Snowflake 上の権限を作ったり、ビューを作ったり、grant を発行したりしないという点です。Snowflake の権限管理を置き換えるのではなく、dbt のコード上にある依存関係が、宣言した参照ルールに従っているかを検査するために使います。

## dbt-authorized-models の使い方

ここからは、`dbt-authorized-models` の具体的な使い方を説明します。

### package を追加して authorization check を実行する

まず `packages.yml` に package を追加します。

packages:
  \- git: "https://github.com/civitaspo/dbt-authorized-models.git"
    revision: v0.2.0

次に、root project の `on-run-start` hook で `check_authorization()` を呼び出します。

on-run-start:
  \- "{{ dbt\_authorized\_models.check\_authorization() }}"

vars:
  dbt\_authorized\_models:
    enforce: true
    exclude\_resource\_types: \["test", "analysis"\]

設定は以上です。この設定により、明示的に参照許可が定義されていないモデルが検出されると dbt compile 時に失敗するようになります。

以下の例では、参照元 node の `database` が `analytics` で、`schema` が `finance` または `compliance` に一致する dbt model からのみ `restricted_revenue_metrics` への参照を許可しています。

models:
  \- name: restricted\_revenue\_metrics
    config:
      meta:
        authorize:
          \- resource\_type: "model"
            database: "analytics"
            schema: "finance"
          \- resource\_type: "model"
            database: "analytics"
            schema: "compliance"

ルールは「1つのルールの中では AND」「複数のルールの間では OR」として評価されます。各プロパティの値は正規表現として扱われ、大文字小文字を区別した全体一致で評価されます。

`database` や `schema` を条件に使う場合は、dbt が実際に持っている node metadata を見るのが大切です。開発環境、CI、本番環境で target database や schema suffix が変わる場合があるため、期待通りにマッチしないときは実際の値を確認してからルールを書くと安全です。

警告内容を見て意図したポリシーになっていることを確認したら、`enforce: true` に変更します。これ以降、許可されていない参照が追加されると、`on-run-start` hook を通る dbt の実行が失敗します。

### モデルオーナーが参照範囲を管理できるようにする

先ほど説明した通り、この package では、参照される側のモデルや source がポリシーを持ちます。

finance\_report -> ref("restricted\_revenue\_metrics")

この場合、`finance_report` が自分自身に「`restricted_revenue_metrics` を参照してよい」と書くのではありません。`restricted_revenue_metrics` の `meta.authorize` に、`finance_report` が満たすべき条件を書きます。

この形にしておくと、モデルオーナーは自分が管理するモデルの参照範囲をコード上で確認できます。広く参照されてよいモデルは `authorize: ["*"]` として明示し、参照を制限したいモデルは schema、package\_name、tag などで許可範囲を絞ります。

タグを使う場合は、`tags` 単体ではなく、`resource_type`、`database`、`schema`、`identifier` または `alias` といった親プロパティもあわせて指定します。これは、意図せず広い範囲にタグ条件だけが適用されることを避けるためです。また、タグは参照元モデル側のメタデータでもあるため、タグの付与ルールやレビュー範囲もあわせて設計しておく必要があります。

参照されるモデルや source に `meta.authorize` がない場合、そのリソースへの参照は拒否されます。そのため、レビュー時に「このモデルは本当に広く参照されてよいのか」「このモデルの許可範囲は妥当か」を確認しやすくなります。

### 許可ルールを誰が変更できるかまで考える

`dbt-authorized-models` は、依存関係の違反を検出できます。しかし、`meta.authorize` の変更そのものを誰がレビューするかは、別途決める必要があります。そこで CODEOWNERS と組み合わせます。

たとえば参照を制限したいモデルと、そのプロパティ定義の YAML を同じオーナーが管理するディレクトリに置き、CODEOWNERS でモデルオーナーを指定します。その上で、GitHub の branch protection rules や repository rulesets で Code Owners のレビューを必須にします。CODEOWNERS を置くだけではレビューは強制されないため、GitHub 側の設定まで含めて運用します。

\# .github/CODEOWNERS
/models/restricted/\*\* @your-org/data-platform @your-org/security-data-owners
/models/marts/finance/\*\* @your-org/finance-data-owners

この構成にすると、参照を制限したいモデルの SQL だけでなく、`meta.authorize` を含む YAML の変更にもモデルオーナーのレビューを要求できます。

実際には、`meta.authorize` はモデル横の YAML だけでなく、`dbt_project.yml` の path config や、SQL 内の `config(meta=...)` などからも設定できます。そのため、`dbt_project.yml`、CI workflow、package 設定、hook 設定など、authorization check を迂回できる変更経路もレビュー対象に含めておくのが大切です。

運用イメージは次のようになります。

1.  モデルオーナーが `meta.authorize` で参照許可ルールを定義する
2.  CODEOWNERS と branch protection / rulesets により、参照を制限したいモデルの変更にはオーナーのレビューが必要になる
3.  CI で `dbt-authorized-models` が依存関係を検査する
4.  許可されていない `ref()` や `source()` が追加された場合は CI が落ちる

このようにすると、設計意図をドキュメントだけに閉じ込めず、コードレビューと CI の両方で守れるようになります。

### 導入時の注意点

既存の dbt Project に導入する場合、最初から `enforce: true` にすると大量のエラーが出る可能性があります。まずは `enforce: false` で導入し、現在の依存関係を棚卸しするのがよいです。

その上で、広く使われるべきモデルには `authorize: ["*"]` を付けます。deny-by-default である以上、既存プロジェクトでは「守りたいモデルだけに設定する」だけでは足りません。広く参照されてよいモデルにも明示的なワイルドカードを付ける必要があるため、最初の棚卸しには一定の作業量がかかります。もし小さく「守りたいモデルだけに設定する」方針で進めたい場合、 `dbt_projects.yml` ですべての source や model に対して `authorize: ["*"]` の設定を適用するのも1つの始め方です。

参照を制限したいモデルについては、まず守りたい境界を決めます。たとえば社内限定の指標、財務系 mart、外部共有に使うモデルなどから順に、明示的な許可リストを定義していくと導入しやすいです。

また、この package はデータウェアハウス側の権限管理を代替しません。Snowflake の role、grant、Masking Policy、Row Access Policy などは引き続き必要です。`dbt-authorized-models` は、そうした実行時のアクセス制御に加えて、dbt の依存関係をコード上で検査するための仕組みです。

## まとめ

Snowflake と dbt を使ったデータ基盤では、データウェアハウス側の権限管理だけでなく、dbt のモデル依存関係にもガバナンスを効かせたくなる場面があります。

特に、Medallion Architecture のように層の責務を分けている場合や、単一の dbt Project の中に広く参照されてよいモデルと参照を制限したいモデルが混在している場合、意図しない `ref()` や `source()` を防ぐ仕組みが必要になります。

`dbt-authorized-models` は、参照される側のモデルや source に `meta.authorize` を定義し、dbt の manifest / graph metadata をもとに依存関係を検査します。これは Snowflake の権限管理を置き換えるものではなく、dbt で管理するモデル依存関係のルールをコードとして検査するための package です。

さらに CODEOWNERS と組み合わせることで、モデルオーナーが許可した範囲だけを参照可能にする運用を作れます。

データ基盤のガバナンスは、ドキュメントやレビューだけで守るには限界があります。設計意図をコードに落とし込み、CI で継続的に検査することで、データ基盤の利用者や開発者が増えても設計意図を失わずに変更し続けられる状態を作っていきたいと考えています。

## We are hiring 🔥

LayerX では、Snowflake や dbt を活用しながら、事業と AI/ML 活用を支えるデータ基盤をつくっています。Production-ReadyなAI開発をサポートするためのデータ基盤開発、時系列データ処理、リアルタイムデータパイプラインの構築などに興味がある方、そして、データ基盤を事業成長のドライバーだと信じて止まない方は、ぜひ一緒にチャレンジしましょう!

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/61470) [open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/77873)