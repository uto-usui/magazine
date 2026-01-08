---
title: "Spanner Data Boostを活用したリアルタイムなリコンサイルエラーの検出"
source: "https://engineering.mercari.com/blog/entry/20241224-spannar-data-boost/"
publishedDate: "2024-12-24"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。Mercari Corporate Products Teamのエンジニアの[@yuki.watanabe](https://github.com/yuki0920)です。  
この記事は、[Mercari Advent Calendar 2024](https://engineering.mercari.com/blog/entry/20241125-mercari-advent-calendar-2024/) の21日目の記事です。

## はじめに

現在、内製の会計仕訳システムの開発に携わっています。このシステムには様々なバッチ処理が実装されているのですが、BigQueryへクエリしデータを抽出するためのバッチで誤検出の問題がありました。本記事ではこの問題に対して検討した複数のソリューションと結果的にどの方法を採用したのかについて紹介します。  
バッチ処理の課題を解決する際の参考にしていただけると幸いです。

## リコンサイルエラー検出のバッチについて

### 会計仕訳システムにおけるデータの流れ

まず、会計仕訳システム(図のAccounting System)におけるデータの流れを紹介します。お客さまがメルカリやメルペイを使用した場合、取引内容に応じて様々なMicroservicesが処理を行い、金銭に関わるデータがある場合は、会計仕訳システムのPub/Subに送信します。会計仕訳システムではCloud Functionsでバリデーションを行い、Spannerのaccounting\_dataテーブルへ登録します。  
次に、各Microservicesは会計仕訳システムのPub/Subに送信済みのデータについて、会計仕訳システムのリコンサイル用APIへ送信します。このAPIは後述するリコンサイルと呼ばれる突合処理を行い、結果をSpannerのreconciliationテーブルへ登録するもので、Kubernetes上のgRPC ServerのAPIとして実装されています。  
Spannerへ登録されたデータ(accounting\_data、 reconciliation)は、Cloud ComposerとDataflowを用いて、BigQueryへ1日に1度差分を同期しています。

![](https://storage.googleapis.com/prd-engineering-asset/2024/12/9c15d849-golduck_architecture-2024-12%E3%83%86%E3%83%83%E3%82%AF%E3%83%95%E3%82%99%E3%83%AD%E3%82%AF%E3%82%99%E7%94%A8.png)

### リコンサイルは会計データの確からしさを検証する仕組み

リコンサイルとは、会計仕訳システムと会計データの送り元となるMicroservice間のデータの突合処理のことを指します。Microserviceはデータベースに登録した会計データをリクエストデータに含め、リコンサイル用APIへリクエストします。APIでは、リクエストデータと会計仕訳システムに登録された会計データ(accounting\_data)を突合し、突合結果をreconciliationテーブルのstatusカラムに保持して登録します。このリコンサイルを通じて、Microservice側のデータと会計仕訳システム側のデータが一致していることを保証しています。  
以下はreconciliationに登録されるstatusカラムの値のイメージです。

-   突合成功: status=’success’
-   突合失敗: status=’failed’

### リコンサイル検証用バッチでリコンサイルのエラーがないかを確認する

突合が失敗したデータについてはリコンサイルのエラーと考えられます。そこで、リコンサイルエラー検出用のバッチをCronJobを用いて実装しています。このCronJobでは1日に1度BigQueryへクエリし、リコンサイルエラーのデータを抽出します。エラーのデータが存在する場合は、Microservice Teamへ共有し、再度のリコンサイルAPIへのリクエストを依頼しています。

### SpannerとBigQueryの同期タイムラグによる誤検出

しかし、上記のバッチには課題が存在しました。Spannerにはリアルタイムにリコンサイル結果が登録されていますが、バッチが参照しているBigQueryには1日に1度しか同期されません。このSpannerとBigQueryの同期タイムラグにより、バッチの実行結果には誤検出である偽陽性のデータが含まれていました。「Spannerには突合済みのデータが存在するが、BigQueryには未同期」のデータは本来は突合が成功していますが、バッチでは突合が失敗したデータとして検出されていました。  
このため、バッチによってリコンサイルエラーとして抽出されたデータについて、エンジニアが「Spannerにクエリをして本当にリコンサイルのエラーがあるのかどうかを調べる」という手動の運用作業が発生していました。  
会計仕訳システムでは、会計データを扱っているという特性上、毎月の月初に前月分のデータを確定する、いわゆる「締め」が必要になります。月末付近に発生したリコンサイルエラーは速やかに送り元であるMicroservice Teamにリコンサイル依頼をし、リコンサイルエラーを解消しなければなりません。しかし、上記の運用作業が発生する場合、リコンサイルエラーの検出から解消までに日をまたいでしまうこともあり、会計業務への影響が出てしまうこともありました。  
これらの運用課題の解消のためには、「リコンサイルエラー検出のバッチの誤検出をゼロにする」ということが必要でした。

## Spanner Data Boostの採用

### 検討したソリューション

運用課題の解消のため、複数のソリューションを検討しました。

#### 1\. StreamingでSpannerからBigQueryへ同期する方法

まず、Spannerに登録されたデータをStreamingでリアルタイムにBigQueryへ同期する方法を検討しました。Dataflowの[Spanner change streams to BigQuery template](https://cloud.google.com/dataflow/docs/guides/templates/provided/cloud-spanner-change-streams-to-bigquery)などを利用し同期用のJobを作成することで、技術的には実現可能な方法ではあります。Streamingでリアルタイムに同期できると、上記以外の課題の解消にも役立てられるため、大きな恩恵を得られたでしょう。一方で、Stremingの同期用のJobを採用する場合は、同期の不具合がある場合にも備えなければなりません。例えば、同期用Jobが停止する、BigQueryへ二重でデータが登録される、BigQueryへの一部のデータの登録が失敗するなどが考えられます。こうした不具合が発生した場合には、手動運用でリカバリするか、もしくはリカバリ用のシステムの実装が必要になりますが、初期の実装とその後の運用まで含めた工数を考慮すると、既存の課題に対するソリューションとしては過大だと考え、採用を見送りました。

#### 2\. SpannerとBigQueryの同期頻度を増加する方法

次に、SpannerからBigQueryの同期頻度を増加する方法を検討しました。現状1日に1度行っている同期を2〜3回に増加させ、その後にリコンサイルエラー検出のバッチを実行する方法です。これまでの方法と比較し、偽陽性のデータを減らすことは可能だったかと思います。しかし、Spannerに登録されているBigQuery未連携のデータは多少なりとも存在するため、リコンサイルエラー検出のバッチの誤検出をゼロにすることには向かないと考え、採用を見送りました。

#### 3\. Spanner federated queriesとSpanner Data Boostを利用する方法

最終的に、Spannerの[Data Boost](https://cloud.google.com/spanner/docs/databoost/databoost-overview)を活用することにしました。上述の通り、リコンサイルエラー検出のバッチではBigQueryにクエリをしていますが、このクエリを修正し、BigQueryの[Spanner federated queries](https://cloud.google.com/bigquery/docs/spanner-federated-queries)の機能を使い、Spannerへのクエリもしています。Spannerへクエリする際に「Spannerには登録済みだがBigQueryには未同期のデータ」も併せて取得することで、BigQueryとSpannerのデータをどちらも考慮して、リコンサイルエラーのあるデータのみを抽出することができるようになっています。  
重要な点としては、Spanner federated queriesを利用する際に、Data Boostを有効化するということです。Data BoostはSpannerのPrimary Instanceへ負荷を与えることなくSpannerへクエリすることができる非常に便利な機能です。リコンサイルエラー検出のバッチでは、Spannerへ登録された1日分のデータを取得しますが、1日分でもかなりのレコード数となるため、もしPrimary Instanceへクエリした場合はパフォーマンスへの影響は避けられません。そこで、Data Boostを有効化しこの問題を回避しています。  
この方法を採用した理由は、「リコンサイルエラー検出のバッチの誤検出をゼロにする」という目的を達成可能であり、かつ実装工数の観点でも既存のクエリの改修の範囲で早急に実現できることが見込まれたためです。

### BigQueryへのクエリ改修前後のサンプルコード

リコンサイルエラー検出のバッチで使用しているBigQueryへのクエリの改修前後のサンプルコードを記載します。

### 改修前のクエリサンプル

```
SELECT *
FROM example_dataset.reconciliation
WHERE status != 'success'
```

まず、改修前のクエリではBigQueryのDatasetであるexample\_datasetのreconciliationテーブルをFROM句に指定し、statusがsuccess以外のレコードを抽出していました。

### 改修後のクエリサンプル

```
WITH spanner_reconciliation AS (
  SELECT * 
  FROM EXTERNAL_QUERY('spanner_connection_example', """
  SELECT *
    FROM reconciliation
    WHERE created >= TIMESTAMP(CURRENT_DATE("Asia/Tokyo"), "Asia/Tokyo")
  """)
)
SELECT * FROM example_dataset.reconciliation
LEFT JOIN spanner_reconciliation ON reconciliation.id = spanner_reconciliation.id
WHERE status != 'success'
AND (spanner_reconciliation.id IS NULL OR spanner_reconciliation.status != 'success')
```

改修後のポイントは2点あります。1点目は、WITH句でEXTERNAL\_QUERYの関数を利用している点です。第1引数にSpannerを指定したBigQueryのConnection IDを指定し、第2引数には、クエリ実行日に登録されたreconciliationテーブルのレコードを抽出するクエリを指定しています。  
2点目は、メインのクエリのWHERE句の絞り込みです。FROM句にreconciliationテーブルを指定することは改修前と同様ですが、加えてWITH句で定義したspanner\_reconciliationテーブルをLEFT JOINし、WHERE句で利用しています。これにより、「BigQueryのreconciliationテーブルのレコードでエラーが発生している」かつ「実行日に登録されたSpannerのreconciliationテーブルのレコードでエラーが発生している、またはレコードが存在しない」条件に該当したレコードのみを抽出できるようになっています。

## まとめ

会計仕訳システムのリコンサイル検証用バッチには、SpannerとBigQueryの同期タイムラグによる誤検出の課題が存在しました。そこで、バッチで実行しているBigQueryへのクエリを改修し、Spanner federated queriesとData Boostを利用しSpannerへもクエリすることで、BigQueryへ未同期のデータも抽出するようにし、同期タイムラグによる課題を解決しました。  
本記事執筆時点で、改修版のリリースから2ヶ月程度が経過しています。改修前と比較し、月に10件程度発生していたSpannerの手動クエリによる運用作業がほぼゼロになるなどの効果が出ています。  
また、この経験が早速別の機会にも役立ちました。あるバッチでSpannerへクエリする処理が、とある変更をきっかけにインデックスが効かなくなり大幅にパフォーマンスが悪化してしまう問題があったのですが、Spanner federated queriesとData Boostを利用することで、これを解決することができました。  
今後もSpannerとBigQueryをしばらく使い続けることが予想されるため、Spanner federated queriesとData Boostを利用したアプローチを様々な場面で活用できるかと思います。  
明日の記事は kimras さんです。引き続きお楽しみください。

## 参考資料

-   [Data Boost Overview | Spanner | Google Cloud](https://cloud.google.com/spanner/docs/databoost/databoost-overview)
-   [Connect to Spanner | BigQuery | Google Cloud](https://cloud.google.com/bigquery/docs/connect-to-spanner)
-   [Spanner federated queries | BigQuery | Google Cloud](https://cloud.google.com/bigquery/docs/spanner-federated-queries)
-   [データ指向アプリケーションデザイン ―信頼性、拡張性、保守性の高い分散システム設計の原理](https://www.oreilly.co.jp/books/9784873118703/)
-   [データエンジニアリングの基礎 ―データプロジェクトで失敗しないために](https://www.oreilly.co.jp/books/9784814400652/)