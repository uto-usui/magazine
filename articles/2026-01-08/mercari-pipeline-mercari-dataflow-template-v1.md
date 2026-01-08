---
title: "Mercari Pipeline (旧Mercari Dataflow Template) v1(β版)を公開しました"
source: "https://engineering.mercari.com/blog/entry/20250620-mercari-pipeline-beta1/"
publishedDate: "2025-06-20"
category: "engineering"
feedName: "Mercari Engineering"
---

## はじめに

こんにちは。メルペイ Solutionsチーム所属のデータエンジニア [@orfeon](https://twitter.com/orfeon) です。  
この記事は、[Merpay & Mercoin Tech Openness Month 2025](https://engineering.mercari.com/blog/entry/20250528-merpay-mercoin-tech-openness-month-2025/) の15日目の記事です。

2020年にデータパイプラインをJSONで定義して実行することができるツールとしてmercari/DataflowTemplateを開発して[OSSとして公開](https://engineering.mercari.com/blog/entry/mercari-dataflow-template/)しました。  
最近このツールに大幅な機能追加を行い、 [mercari/pipeline](https://github.com/mercari/pipeline/) と名前を変更してv1.0.0(β版)をリリースしました。

この記事では今回開発を行った以下の機能について紹介していきます。

-   運用の容易化
    -   YAML対応
    -   パイプライン構成管理の強化
    -   dead-letter設定の追加
-   パイプライン定義の容易化
    -   checkerツールの提供

## 運用の容易化

多くのデータパイプラインの開発・デプロイを進めていくと、極力少ない工数で多くのパイプラインを運用していく必要性が高まります。  
ここではデータパイプラインのプロダクション環境での運用負荷を軽減するために追加された以下の機能について紹介します。

-   YAML対応
-   パイプライン構成管理強化
-   dead-letter設定の追加

### YAML対応

パイプラインの定義を行うconfigファイルのフォーマットは、これまでJSON形式のみサポートしていたのですが、YAML形式でも定義できるようになりました。  
JSONでは、改行やダブルクオートを含むようなパラメータがあった場合にサニタイズする手間が発生したり、コメントを書けなかったり、可読性が落ちたりするなどconfigファイルの保守に問題もありました。YAMLで定義することでこうしたパラメータでも直接指定できるようになり、configをよりシンプルに定義して保守できるようになりました。

YAML定義によるbigquery sourceの定義例

```
sources:
  - name: bigquery_source
    module: bigquery
    parameters:
      query: |-
        WITH subquery AS ( -- some comment
          SELECT
            user_id,
            MIN(timestamp) AS first_timestamp
          FROM
            `mytataset.mytable`
          GROUP BY
            user_id
        )

        SELECT
          format('%d#g', user_id) as row_key,
          first_timestamp
        FROM subquery 
```

### パイプライン構成管理強化

さまざまなデータパイプラインを運用していると、別々のパイプラインで共通する処理や設定を使いまわしたいケースがあります。

-   起動時に変数を指定してパイプラインのパラメータを変更する
-   パイプラインの中で指定したパスのみ実行する
-   複数のパイプライン定義を一つのパイプラインにマージして動かす

本来共通する部分を別々で定義してしまうと、変更時にそれぞれ修正する必要があり、データパイプラインの保守性が落ちてしまいます。  
今回configのsystemの項目で新たに以下のパラメータが追加されました。これらを指定することで、上記のようなケースに対応するためのパイプラインの構成制御ができるようになりました。

-   system
    -   args
    -   context
    -   imports

以降の節でこれらのパラメータによる構成の制御方法について説明します。

#### argsによる起動時のパイプラインのパラメータの変更

system.argsパラメータを使うことで、パイプラインの起動時のオプションに指定した変数を使ってモジュールのパラメータを書き換えることができるようになります。  
実はこれまでのmercari/DataflowTemplateでもパイプラインの起動時の変数指定はできたのですが、複数手段があったり、パイプライン実行時の動的な変数指定(データの値に応じて宛先のtopicをスイッチするなど)と競合したりするなど、いろいろと問題があったため今回argsパラメータとして整理をしました。

args機能を利用するユースケースとしては、通常起動時はcronの起動時の条件でデータを読み込み、問題発生時のデータのバックフィルで読み込み元のテーブルやフィルタ条件の日付を起動時に指定する例などが挙げられます。

以下はargsでパイプラインの起動時に変数を指定して、パラメータの値を書き換えるconfigの例です。  
argsでは起動時の指定が無い場合の変数のデフォルト値を設定しています。  
デフォルト値では固定値だけでなくTemplate Engineを使って動的に生成することもできます。  
target\_tableではクエリで参照するテーブル名、current\_dateではクエリのフィルタ条件として使うための日付として起動時の日付を生成しています。  
bigqueryモジュールのqueryパラメータでこれらの変数の値を埋め込むことでクエリの条件を起動時に制御できます。

```
system:
  args:
    target_table: "myproject.mydataset.mytable"
    current_date: "${utils.datetime.current_date('Asia/Tokyo')}"
sources:
  - name: bigquery_source
    module: bigquery
    parameters:
      query: |-
        SELECT
          *
        FROM
          `${target_table}`
        WHERE
          created_date >= DATE("${current_date}")
```

パイプライン起動時に以下のようにparameters=args.{変数名}を指定すると、argsで定義した変数のデフォルト値を指定した値で置き換えることができます。

```
gcloud dataflow flex-template run sample-job \
  --project=myproject \
  --region=asia-northeast1 \
  --template-file-gcs-location=gs://xxx/yyy/zzz \
  --parameters=config="$(cat path/to/config.yaml)" \
  --parameters=args.target_table=myproject2.mydataset2.mytable2
```

#### contextによるパイプラインのパスの指定

単一の目的のためのデータパイプラインではあるものの、状況により処理を派生させたいケースがあります。  
こうした派生する処理ごとに別々のconfigファイルを定義すると管理が煩雑になってしまいます。  
contextとtagsパラメータを使うことで、派生する処理も含めて単一のconfigファイルで定義しておき、状況に応じて一部の処理を切り替えることができます。  
具体的にはconfigファイルで各モジュールにtagを設定して、起動時にcontextで指定したtagのモジュールだけでパイプラインを構成して実行することができます。  
contextとtagsを使う例として、機械学習の学習用パイプラインと予測用パイプラインを単一のconfigファイルで定義してcontextで切り替える構成を紹介します。  
![](https://storage.googleapis.com/prd-engineering-asset/2025/06/9b2f8d38--2025-06-18-10.37.25-1024x805.png)

機械学習では予測モデルを構築する際に、学習用と予測用で別々のパイプラインを作ることがあります。データのソースは学習時と予測時で別々だが特徴量を生成する処理は共通というケースを想定します。  
以下のconfigファイルでは、特徴量生成は共通ですが、学習用にはBigQueryのデータソース/結果シンクを用い、予測用にはPub/Subのデータソース/結果シンクを用いています。

```
system:
  context: train
sources:
  - name: ml_source
    module: bigquery
    tags:
      - train
    parameters:
      table: xxx
    timestampAttribute: timestamp_field
  - name: ml_source
    tags:
      - prediction
    schema:
      avro:
        file: xxx
    parameters:
      format: avro
      subscription: xxx
transforms:
  - name: feature
    inputs:
      - ml_source
    tags:
      - train
      - prediction
    parameters:
      groupFields:
        - user_id
      select:
        - name: moving_avg
          field: amount_field
          func: avg
          range:
            count: 10
sinks:
  - name: feature_sink
    module: bigquery
    tags:
      - feature
    inputs:
      - feature
    parameters:
      table: xxx
  - name: feature_sink
    module: pubsub
    tags:
      - prediction
    inputs:
      - feature
    parameters:
      topic: xxx
```

sourcesとsinksにそれぞれml\_sourceとfeature\_sinkという同じnameを持つモジュールがあります。ただしtagsではtrain、 predictionと異なるtagを持っています。  
transformsでは特徴量を生成するselectモジュールとして直近の指定した個数の移動平均を計算する設定をしています。バッチでもストリーミングでも同じ特徴量を生成します。  
tagsではtrainとpredictionの両方を指定しています。  
system.contextでtrainを指定した場合、sourcesとsinksではtagsでtrainが指定されたモジュール(この場合はbigquery)のみでパイプラインが構成されます(contextでpredictionを指定した場合はsourcesとsinksでpubsubのみ)。  
transformのselectモジュールはtagsでtrainとprediction両方指定されているのでどちらのコンテキストでも利用されます。  
(なおcontextで何も指定しない場合は全てのモジュールが使われ、同じnameでコンフリクトが発生してエラーになります)

contextにより、複数のコンテキストに応じたモジュールの設定を単一のconfigファイルに定義しておき、起動時にcontextを指定することでパイプラインの処理を簡単に切り替えられるようになります。

#### importsによる複数configファイルのマージ

パイプラインのためのインフラや運用のコストを減らすために複数の処理を単一のパイプラインにまとめたい場合があります。  
一方で、一つのパイプラインに複数の処理をまとめるとconfigファイルが肥大化してパイプライン定義の見通しが悪くなります。  
そこでconfigファイルは用途に応じて別々に定義しておいて、importsパラメータでそれらのconfigファイルを指定することでパイプラインを一つにまとめることができるようになりました。

以下ではimportsパラメータを利用したconfigファイルの例を説明します。  
この例のconfigファイルではsystem.importsパラメータのみ指定されています。実際の処理はimportsのfilesで指定されたconfigファイルで定義されており、起動時にこれらのファイルを読み込んで一つのパイプラインとして構成・実行します。  
(baseパラメータでconfigファイルのパスのprefixを指定しています)

```
system:
  imports:
    - base: gs://example-bucket/configs/
      files:
        - pipeline_1.yaml
        - pipeline_2.yaml
        - subdir/pipeline_3.yaml
```

このimports機能は、単純に複数のconfigファイルで定義されたモジュールをマージしているだけなので、各configファイルではnameが重複しないように注意が必要です。  
(imports時の重複チェックなどの機能は今後改善予定です)

### dead-letter設定の追加

運用のためには処理の途中でエラーが発生した場合は原因を特定したりリカバリを行うために、問題のあったデータを切り分けて保持する必要があります。またデータパイプラインの要件によっては問題が発生した場合でも処理を正常に続ける必要があります(streaming処理や処理全体をやり直すコストが非常に大きい場合など)。  
今回のバージョンアップではほぼ全てのモジュールで修正を行い、処理に問題が発生した場合も極力処理を正常に続行できるようにしました。また問題のあったデータを切り分けて指定したdead-letterに簡単に出力できるようになりました。

以下、dead-letterのconfigファイルの設定例になります。  
このconfigではfailuresの項目が新たに追加されています。  
failuresのモジュールでは通常のsinkとは異なりinputsを指定する必要はありません、パイプラインの全てのモジュールで処理に失敗したデータはこのfailuresで指定されたモジュールに送られます。

```
system:
  failure:
    failFast: false
sources:
  - name: pubsub_source
    module: pubsub
    parameters:
      format: avro
      subscription: xxx
sinks:
  - name: pubsub_sink
    inputs:
      - pubsub_source
    parameters:
      format: avro
      topic: xxx
failures:
  - name: pubsub_failure_sink
    parameters:
      format: avro
      topic: xxx
```

処理に失敗したエラーデータは共通のスキーマでfailuresで定義したモジュールに送られます。  
あらかじめBigQueryでこのスキーマに準じたテーブルを作っておき、Pub/SubのBigQuery subscriptionを通じてBQに連携・保持することもできます。

## パイプライン定義の容易化

パイプラインの定義を作って動作確認する際に、これまでは実際にJobを実行してうまくいくか確認する必要がありました。  
しかしこれは手間がかかる作業であり、パイプラインの定義自体が非常に時間の掛かるプロセスでした。  
ここではパイプラインの定義をもっと手軽に試行錯誤できるようにするために追加した以下の機能を紹介します。

-   checkerツールの提供

### checkerツールの提供

ブラウザ上で簡単にconfigファイルの内容をチェックするためのツールを同梱しました。  
これまでのmercari/DataflowTemplateのビルド成果物は基本的にDataflow Flex Templateのためのコンテナイメージのみでした。  
mercari/pipelineではビルド時のプロファイルを切り替えることで複数のビルド成果物を生成することができるようになりました。  
現在では以下のプロファイルがサポートされています。

-   dataflow
    -   Cloud Dataflow Flex Template用のコンテナイメージを生成
-   direct
    -   パイプラインのローカル実行用のコンテナイメージを生成
-   server
    -   パイプラインのローカル実行機能をAPIとして提供するサーバ用のコンテナイメージを生成

プロファイルでserverを指定して生成されたコンテナイメージは、ローカルにpullして起動、利用することもできますし、Cloud Runなどにデプロイして使うこともできます。  
APIだけでなくチェック用のUIも備えているのでブラウザ上で操作できます。

以下はこのserverのコンテナイメージを起動してブラウザで開いた画面の例になります。  
![](https://storage.googleapis.com/prd-engineering-asset/2025/06/58ad9cda--2025-06-18-10.05.07-1024x761.png)

画面の左側がconfigの内容を記述するテキストエリアになります。  
右側はconfigの実行結果を表示するエリアになります。  
右上のヘッダーには定義したconfigを実行するために以下の2つのボタンが並んでいます。

-   Dry Run
    -   定義したパイプライン処理の実行グラフを生成する
    -   各モジュールのパラメータのチェック
    -   各モジュール間の関係整合性のチェック
    -   各モジュールの出力スキーマの確認
-   Run
    -   定義したパイプライン処理をローカルで実行する

Dry Runボタンでは、定義したconfigの内容に問題がないか確認できます。  
問題があった場合は右側にエラー内容が表示されるので、それを確認して修正することができます。  
問題がなかった場合は右側に各モジュールの出力のスキーマが表示されるので、処理内容が想定した通りか確認することができます。

Runボタンでは、定義したconfigの内容で実際にパイプラインをローカルで実行します。  
パイプラインでクラウドリソースにアクセスする場合(BigQueryのクエリ結果を取得するなど)はローカル実行しているサービスアカウントに必要な権限が付与されているか注意してください。

以下のコマンドは、利用者のローカルマシン(MacOS)で自分の権限でserverコンテナを起動する例です。

```
docker run \
  -p "8080:8080" \
  -v ~/.config/gcloud:/mnt/gcloud:ro \
  --rm asia-northeast1-docker.pkg.dev/{deploy_project}/{template_repo_name}/server:latest
```

Cloud Runにデプロイして使うこともできます。以下Cloud Runにデプロイするためのコマンド例です。  
(データ処理でBQ等の外部リソースにアクセスする場合はCloud Runのサービスアカウントに権限が必要です)

```
gcloud run deploy {service_name} \
  --project={project} \
  --image=asia-northeast1-docker.pkg.dev/{deploy_project}/{template_repo_name}/server:latest \
  --platform=managed \
  --region=asia-northeast1 \
  --execution-environment=gen2 \
  --port=8080 \
  --no-allow-unauthenticated
```

ローカルであっても規模の小さいデータ処理であれば特に問題なく実行できるはずです。バッチでちょっとしたデータの加工や移動をするための便利ツールとしても利用することができます。  
なお現在このcheckerツールではstreamingモードでのRun実行はサポートしていないので、streamingモードでローカル実行する場合はdirectのコンテナイメージをコマンドラインで起動して使うことを推奨しています。  
directコンテナを動かすのは基本的にserverイメージをdirectに差し替えるだけです。  
ただしconfigファイルを起動時のパラメータに指定する必要があります。  
以下のコマンドは、利用者のローカルマシン(MacOS)で自分の権限でdirectコンテナをstreamingモードで起動する例です。

```
docker run \
  -v ~/.config/gcloud:/mnt/gcloud:ro \
  --rm asia-northeast1-docker.pkg.dev/{deploy_project}/{template_repo_name}/direct:latest \
  --streaming=true \
  --config="$(cat path/to/config.yaml)"
```

ちなみにこのUIの部分の開発はClaude Codeを使いながら作りました。  
自分はフロントエンド開発の経験はほとんどないのですが、ちょっとしたUIを持ったサービスをサクッと作れてとても便利でした。

## 今後の開発

今後のmercari/pipelineの開発としては大まかに以下のような項目について開発を進めていきたいと考えています。

-   checkerツールの拡張
-   streaming処理機能の強化
-   Apache Flink, SparkなどCloud Dataflow以外のRunnerへの対応

### checkerツールの拡張

checkerツールは現在はまだシンプルなconfigファイルの簡易チェックや簡易な動作確認しかできませんが、非エンジニアでもデータパイプラインを手軽に利用できるように機能を拡張していきたいと考えています。  
将来は自然言語で処理内容を指示するとエージェントがドキュメントや過去のconfigファイルの履歴などを参照して利用者とインタラクティブにパイプラインを構築できるようにしていきたいと考えています。  
今回のリリースには間に合いませんでしたが、エンジニアがインタラクティブにconfigファイルの定義をできるようにcheckerツールをMCPサーバとして利用できるように準備を進めています。  
エージェントの連携を強化するためにも、リポジトリのドキュメントの整備やconfigファイルのexamplesの拡張も進めていきたいと思います。

### streaming処理機能の強化

Google Cloudにおいてバッチ処理についてはBigQueryでかなりのことができるようになってきました。例えば [Federated Query](https://cloud.google.com/bigquery/docs/federated-queries-intro) や [Reverse ETL](https://cloud.google.com/bigquery/docs/export-to-spanner)を使うことで、Cloud Spanner や Cloud Bigtable などの外部のデータソースから取得したデータをBigQueryのクエリエンジンで処理して結果を書き戻すことも手軽にできるようになりました。  
[BigQuery ML](https://cloud.google.com/bigquery/docs/generative-ai-overview)で機械学習モデルやLLMの推論結果を手軽にクエリの中で付与することもできます。  
またちょっとしたリアルタイム処理も、BigQueryの[Continuous queries](https://cloud.google.com/bigquery/docs/continuous-queries-introduction)や、Cloud Pub/Sub の [Single Message Transforms](https://cloud.google.com/pubsub/docs/smts/smts-overview) などを使うことで手軽に実現できるようになってきました。  
Google CloudにおいてCloud Dataflowは、大規模データに対する複雑なstreamingデータ処理を担うことを役割として期待されているように思います。  
streaming処理の中でも、Apache Beamの特徴であるbatchとstreamingで同じ処理をするユースケースに対して特に集中して機能開発をしていきたいと考えています。

### Cloud Dataflow以外のRunnerのサポート予定

名前を mercari/DataflowTemplate から mercari/pipeline に変更した理由でもあるのですが、mercari/pipeline を Cloud Dataflow 以外のデータ処理基盤でも動かせるようにしていきたいと考えています。  
Google CloudでもApache Spark, Flink, Kafkaなどの人気でオープンなビッグデータのフレームワークやそのエコシステムとの連携にも力を入れていこうとしているように思います。  
こうしたフレームワークとの連携も進めていき、Cloud Dataprocなどでもパイプラインを動かせるように機能を拡張をしていきたいと考えています。

[mercari/pipeline](https://github.com/mercari/pipeline) は大幅に変更があり、まだβ版でのリリースのため、機能が不足していたり一部バグがあったりするかもしれません。もし問題に気付かれた方がおられましたら、お知らせいただけますと助かります。  
またフィードバックやコントリビュータも随時募集しているので、こんな機能があったら嬉しいといった要望などありましたら、気軽にIssueで相談いただいたり、PRを送っていただけたりすると嬉しいです。

明日の記事はtakeshiさんによる「[「自分ができる領域が増えた」-Cursorを使って未経験のKotlinコードレビューに挑戦](https://engineering.mercari.com/blog/entry/20250620-018cdf7e2b/ "「自分ができる領域が増えた」-Cursorを使って未経験のKotlinコードレビューに挑戦")」とShuntaさんによる「[初めてのWWDC25に現地参加！Apple Parkで体験した特別な数日感](https://engineering.mercari.com/blog/entry/20250622-1c1848f606/ "初めてのWWDC25に現地参加！Apple Parkで体験した特別な数日感")」の2本です。引き続きお楽しみください。