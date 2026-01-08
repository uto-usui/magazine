---
title: "TTLを利用したTiDBの効率的なインスタンス活用"
source: "https://engineering.mercari.com/blog/entry/20260105-0fedbf6898/"
publishedDate: "2026-01-06"
category: "engineering"
feedName: "Mercari Engineering"
---

MySQLに高い互換性を持つデータベースのTiDBには、古いデータを自動的に削除するTTL(Time to Live)の機能があります。本記事では、これを活用しコスト削減および障害耐性の向上を実現した事例を紹介します

## 背景

メルカリでは、商品に対してコメントを付与することができ、値引きの依頼だったり、さまざまなやり取りを行うことができます。このコメントが、例えば公序良俗に違反すると想定される場合、お客さまがそれを「通報」する機能がありますが、メルカリ内部でも自動的にこれらを検知する仕組みが古くから実装され、運用に利用されています。

これらのコメントのデータは、歴史的経緯から古くはMySQL、現在はTiDBに格納されています。

自動検知の機能自体は、事前定義されたあるキーワードがコメントに含まれるかどうか、いわゆる「全文検索」によって実現されています。

```
: 全文検索クエリのイメージ
SELECT table1.* FROM table1 FORCE INDEX(idx_xxx_xxx) \
WHERE (column1 like ''%a%'' OR column1 like ''%b%'' … ) \
AND (column1 not like ''%c%'' OR column1 not like ''%d%'' … )
AND ... \
ORDER BY created DESC LIMIT 10;
```

またこの機能を動作させるには、多くのコメントに対し高頻度で多数の全文検索を実行する必要があり、このような使い方はもちろんMySQLにはあまり向かないものです。しかし、TiDBに移行した際にさらにこの負荷の影響が目立つようになりました。

## 初期の対応

TiDB User Day 2025でResource Controlの導入について紹介([発表資料](https://static.pingcap.co.jp/files/2025/10/20165547/TiUD2025-Mercari.pdf))しており、詳細は割愛しますが、対象のクエリにヒント句でResource Groupを割当て、Burstableでない制約を加えることにより、TiKVでの優先度の制御と、TiDBでの多少の負荷の平滑化を実現していました。

しかしこの負荷は、定期的に実行されかつ実行間隔が短いものでしたので、実行を完了しなければいけないタイムウィンドウの制約が比較的厳しいものであることから、平滑化による制御の効果が限定的でした。

また、Resource Controlによる制御は、TiDBへのOLTPのワークロードに関しては比較的うまくいくものの、TiKVに対しては主に優先度でしか制御できず、リソースの隔離が不十分であるため、アプローチを変えて対応することにしました。

## 検討したアプローチ

問題のあるコメントの検知に関しては、コメントのデータが追記式で、後から編集できない(更新されない)というデータの性質上、ある程度最近のデータにのみクエリを発行できれば良いため、最近のデータだけをうまく処理するという方針を軸に、主に下記の観点から2点のアプローチを主に比較しました

-   既存のTiDBからデータが簡易に生成できる
-   コストが妥当
-   クライアントの変更が少ない

### a. TiDBからTiCDCへ流通させたデータにKSQLを発行する

![KSQL downstream](https://storage.googleapis.com/prd-engineering-asset/2025/12/14ee415a-cleanshot-2025-12-25-at-16.47.27.png)

TiCDCダウンストリームをKSQL DBとして活用

TiDBには[TiCDC](https://docs.pingcap.com/tidb/stable/ticdc-overview/)という、TiDBの実データを保存するTiKVの変更を取得し、ダウンストリームのデータベースに変更を伝播させるための、いわゆるCDC(Change Data Capture)の便利な機能があります。

MySQLであれば、例えば[debezium](https://github.com/debezium/debezium)といったソフトウェアがこれにあたり、TiCDCは変更イベントを以下のような様々なプロトコルで出力可能な柔軟さを持っています。

-   [Avro](https://docs.pingcap.com/tidb/stable/ticdc-avro-protocol/)
-   [Debezium](https://docs.pingcap.com/tidb/stable/ticdc-debezium/)
-   [Canal-JSON](https://docs.pingcap.com/tidb/stable/ticdc-canal-json/)

このTiCDCを使って、Debezium形式で下流のKafkaにデータを流せば、[KSQL](https://www.confluent.io/blog/ksql-streaming-sql-for-apache-kafka/)というストリームデータに対してSQLを発行できる機能を活用し、インメモリでクエリを発行できる可能性があります。

KSQLの発行先であるKSQL DBのレコードはイミュータブルになります。  
また、KSQLは全文検索に特化した機能はありませんが、全文検索のクエリも発行できます。

KSQL自体はすでに社内で活用/運用実績がある状況でした。

### b. TTLにより一部のデータを保持する専用のTiDB Clusterを作成する

![TTL downstream](https://storage.googleapis.com/prd-engineering-asset/2025/12/0faa6a8a-cleanshot-2025-12-25-at-16.45.40.png)

まずは、必要なテーブルのみを持つTiDB Clusterを作成します。  
TiCDCのレプリケーションタスクはChangefeedと呼ばれますが、テーブルの絞り込みには、このChangefeedの[Table Filter](https://docs.pingcap.com/tidb/stable/ticdc-filter/#table-filter)という機能が活用できます。本ケースでは、コメントを保存するテーブルのみを保持するClusterを用意することになります。

次に、このテーブルのデータを最新のデータのみ保持するようにします。  
TiDBには、Spanner同様、古いデータを自動的に削除する[TTLの機能](https://docs.pingcap.com/tidbcloud/time-to-live/)があります。(MySQLにはありません)。この機能を活用すると最近のデータ以外は不要、という要件を簡易に達成できます。  
TTLの機能をCluster単体で利用した場合は、特に追加の考慮は必要ありませんが、TiCDCを経由したデータに対して利用した場合は、追加の考慮が必要です。  
すなわち、上流には存在する一方、下流には(TTLで削除されたため)存在しない、というデータが発生し、全てのイベントを伝播した場合、例えば、下流に存在しないデータに対しての削除が伝播し、エラーになるといったことが発生する可能性に対処する必要があります。  
この問題に対しては、Changefeedに[Event Filter](https://docs.pingcap.com/tidb/stable/ticdc-filter/#event-filter-rules)という機能があり、特定のDELETEやUPDATEを無視する、といった設定が可能です。

![](https://storage.googleapis.com/prd-engineering-asset/2025/12/579860f1-cleanshot-2025-12-26-at-10.22.53.png)

```
: 上記のデータセットでEvent Filterがないとエラーになるクエリの例
DELETE FROM comments WHERE id=1 /* すでに下流にはデータがない */;
UPDATE comments SET comment="good morning" where id=2 /* すでに下流にはデータがない */; 
```

さらに、TTLパラメータにより、保持するデータがメモリに収まるようコントロールできれば、実質的に多くのケースでインメモリに近い形で処理可能です。

なお、メルカリではTiDBのマネージドサービスである、TiDB Cloudを利用しており、ここで紹介したChangefeedのTable Filterおよび Event FilterはTiDB Cloudでも利用可能な機能です。

## 手法の決定

主にクライアントへの変更要求が少ないことから、TTLを用いる手法を選択することにしました。  
万が一問題が発生した場合の切戻し、および暫定対処に関しても、クエリの発行先を、元のClusterに戻し、元のClusterのリソースを増やしてあげれば良いだけである、という便利さもあります。

ここで改めて、隔離した一部のデータセットを作成し、そこにクエリを発行するというアプローチを取った利点を確認します。

### 利点1： 構築が容易/短期で可能

特筆すべきこととして、TTLが十分短ければ、初期構築が非常に迅速、かつ容易に行えることが言えます。

既存のデータベースからある一部のデータを保持する別のデータベースを作成する際に、最も手間となるのは、既存のデータベースからのエクスポート/リストアから始まる初期データの作成ではないかと思います。

しかし、Event Filterで所定の構成をすれば、TTLが短い場合、下流に空のデータベースを用意し、その時点からデータの複製を始めれば、保持すべきTTLを待つだけでデータの用意が完了します。

### 利点2： 障害単位が独立し個別調整の余地が出る

リソースを完全に独立させた専用のClusterを用意することで、障害の単位も分離でき、さらに、決まった使われ方をする独立したClusterに対して、積極的にリソースを活用するようチューニングが可能です。

もちろん、設定が同一ではない、非対称なものが生まれるのは運用における認知負荷が上がるという問題はあり、構成変更により得られる効果とのバランスをチームで納得のいくものにする必要があります。

## 結果

変更前後のTiKVの負荷について示します。

-   A) 変更前のTiKVの負荷  
    ![before](https://storage.googleapis.com/prd-engineering-asset/2025/12/5bc093c7-cleanshot-2025-10-30-at-12.11.18-1.png)
    
-   B) 変更後のTiKVの負荷(ピーキーな負荷が隔離され利用量が平滑化された)  
    ![after](https://storage.googleapis.com/prd-engineering-asset/2026/01/b86b34aa-cleanshot-2026-01-05-at-09.19.24@2x.png)
    
-   C) 新規TiKV with TTLの負荷
    

![new cluster](https://storage.googleapis.com/prd-engineering-asset/2026/01/cd1a7078-cleanshot-2026-01-05-at-09.28.59.png)

このように負荷は別のClusterに分離され、上位のスペックで運用していた既存のClusterの負荷が減少し、かつ安定したことから、既存のClusterのノード数を減らすことができました。  
新規に別のClusterを作成しているものの、トータルコストとしても削減でき、障害に関するリスクも分離できました。

追記：BのグラフのCPU利用率はAより高くなっていますが、BのグラフをTiKVノードを減らした後に作成したためです。負荷が平滑化され、上下の激しい負荷が別Clusterに分離されたという文脈でご参照ください

## まとめ

本記事では、Changefeedのフィルター機能(Table Filter, Event Filter)、TiDBのTTLを活用し、一部のデータに対して、高頻度で発行される全文検索の負荷を、独立したClusterに分離することでコスト削減をした事例を紹介しました。

このアプローチでは、アプリケーションの変更および、構築、共に少ない変更ですみ、結果として早期に移行を完了することができました。

メルカリでは、TiDBを利用していますが、初期導入のフェーズから、この記事のような継続的改善のフェーズに入っています。現在、様々な取り組みをしており、近々別の記事で紹介していく予定です。

## 関連/補足

本論とは少しそれる、細かな検討事項について補足します。

-   TiDBの全文検索については、一部のリージョン、一部のサービスプロバイダ、一部のサービス提供形態で、試験的に利用できるものが提供されています。現状では選択肢には入りませんでした。また、商品に対するコメントについては、ある商品のコメントを表示する、コメントを書き込むというのが主な用途であり、そういった点からも元データとしてはこのデータのみを全文検索エンジンに格納するのは相応しくないと考えています。  
    [https://docs.pingcap.com/tidbcloud/vector-search-full-text-search-sql](https://docs.pingcap.com/tidbcloud/vector-search-full-text-search-sql)
-   [TiKV MVCC In-Memory Engine](https://docs.pingcap.com/tidb/stable/tikv-in-memory-engine/)については、B案の一部として試しました。今回のケースが、In Memory Engineに向いたケースではなく、「構成変更により得られる効果とのバランス」が悪かったため、今回は採用には至りませんでした。