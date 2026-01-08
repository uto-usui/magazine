---
title: "Cloud SQL for PostgreSQL のインスタンス統合"
source: "https://engineering.mercari.com/blog/entry/20250220-8685a1def6/"
publishedDate: "2025-02-21"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。Mercari DBRE(Database Reliability Engineer) チームのエンジニアの [@takashi-kun](https://www.linkedin.com/in/takashi-honda-646a5889/) です.  
今回私達のチームでは複数の Cloud SQL for PostgreSQL インスタンス(以下 Cloud SQL インスタンス)の一部を一つのインスタンスに統合するという作業を行いました. 本記事ではその作業の詳細やダウンタイムを短くするために選択した方法などを紹介します.

## はじめに

今回の対象サービスのメルカリ Shops では microservice アーキテクチャを採用(ref: [メルカリShopsはマイクロサービスとどう向き合っているか](https://engineering.mercari.com/blog/entry/20210806-3c12d85b97/))しており, それぞれの microservice 毎にデータベースが存在します. スペックやデータサイズは大小様々ですが, おおよそ 50 程度のインスタンスが稼働しています. これらのインスタンスは運用効率化のためすべて Enterprise Plus Edition で稼働しています. 先のブログでも紹介されていますが, データベースが microservice 毎に別となっているため, 障害の局所化や他 microservice のデータベースを意識せずに開発できるなど, 開発からリリースまでを迅速に行えるという多くのメリットを享受しました. 一方でサービスの利用が拡大していき, それらをそのまま運用していくうえでいくつかの課題がありました.

![](https://storage.googleapis.com/prd-engineering-asset/2025/02/64f0b16a-elephant-8359382_1280.jpg)

[https://pixabay.com/photos/elephant-herd-animals-trunk-safari-8359382/](https://pixabay.com/photos/elephant-herd-animals-trunk-safari-8359382/)

## メルカリ Shops DB の課題

この章では現在メルカリ Shops において直面していた DB 運用の課題についていくつか紹介します.

### コスト

まず1点目はコスト(サーバ費用)です. microservice 毎に DB が存在しているため, 利用が少なく最低スペックにも関わらずインスタンスを起動させ続けなければならない, という問題があります. インスタンス1台の費用は小さいですが, microservice の数が多いため “チリツモ” で費用が膨れていくにも関わらず, インスタンス Tier は最低で運用しているため [CUD](https://cloud.google.com/sql/cud) 以外のコスト削減の手段を取れていませんでした.

### 管理

microservice 毎にインスタンスがあるため, [near-zero downtime](https://cloud.google.com/sql/docs/postgres/maintenance#nearzero) といえどメンテナンスが大量に一度に通知されてしまいます. またIaC で管理されているとはいえ, 数が多いため現在のチーム体制ですべてを網羅的に管理運用することが難しくなっていました. 性質上, それぞれの microservice を廃止/統合するといったことは難しく, かといってインスタンスを減らすということはできず限られたメンバーで多くのインスタンスの対応が必要となっていました.

### 余剰ストレージ

Cloud SQL にはストレージの自動拡張機能と PITR がありますが, メルカリ Shops ではかつてこの機能を全てのインスタンスで有効化していました. 特に更新(INSERT/UPDATE/DELETE)が多く行われる系統のインスタンスでは, PITR のために保存している WAL のサイズが多く, それが要因でインスタンスのストレージサイズを拡張し続ける, という問題が発覚しました. 止血対応として PITR を無効化したものの, Cloud SQL では[一度拡張したストレージサイズは縮小できない](https://cloud.google.com/sql/docs/postgres/instance-settings#storage-capacity-2ndgen)ため, 添付のよう余剰なストレージサイズに対して課金し続けていました.

![](https://storage.googleapis.com/prd-engineering-asset/2025/02/417cb151-browsinghistory_storage.png)

4.5TB のディスクに対し実データは 250GB 程度

## 対策の手法

メルカリ Shops では上記のような運用/インスタンス費用の課題に対する対策として, Cloud SQL インスタンスの統合を行うことを決定しました. 単純にインスタンスを統合するにもいくつか方法があり, それぞれについて簡単に解説し, 今回メルカリ Shops がどのような手法で統合を行ったかについて説明していきます.

### 前提

#### サービス要件

まず, 統合作業時のサービス側の要件について紹介します. メルカリ Shops は利用者数が店舗・購入者ともに拡大しており, かつメルカリからの導線もあるため, 長時間(1時間以上)の停止メンテナンスを行うことはできませんでした. また作業時の停止についてもメルカリ Shops の DB は基本的に read heavy な構成のため, 書き込み(INSERT/UPDATE/DELETE)は停止しても読み込み(SELECT)については停止しないように進める必要がありました.  
加えて統合対象の中には決済やレポート(店舗側に売上内容を表示する)機能といったサービス的にクリティカルな機能も含まれていたため, ダウンタイムをできるだけ短くしたい要望がありました.  
一方, 今回の統合作業において重要な観点として **切り戻しの準備は不要** ということで合意をしました. つまり仮に切り替え後に何らかの問題があって切り戻した場合には, 切り戻し完了までに書き込まれたデータは欠損しても問題ない, ということです. これによって構成が少しシンプルになります.

#### システム

メルカリ Shops ではインスタンスはすべて各 microservice 毎に論理データベース, クレデンシャル(user/password), 権限(GRANT)が分離されています. また, 接続方法については各インスタンスの持っている Private IP に接続する方式となっており, [Cloud SQL Auth Proxy](https://cloud.google.com/sql/docs/postgres/sql-proxy) や [Cloud SQL Go Connector](https://cloud.google.com/sql/docs/postgres/samples/cloud-sql-postgres-databasesql-connect-connector) などを利用していませんでした. そのため, インスタンス統合後の切り替えのために Instance Connection Name(`${project}:${region}:${instance}`)などを変更する必要がなく, アプリケーション側での作業が不要で切り替えを実施できます.

### 統合方法案

上記の前提を踏まえて, インスタンス統合で検討した方法と実際に行った方法を紹介します.

![](https://storage.googleapis.com/prd-engineering-asset/2025/02/3759dfde-screenshot-2025-02-20-at-13.22.55.png)

[https://wiki.postgresql.org/wiki/Logo](https://wiki.postgresql.org/wiki/Logo)

#### DMS

まず, Google Cloud 上で DB の移行が可能な managed service で [Data Migration Service(DMS)](https://cloud.google.com/database-migration) があります. 詳細については省略しますが, これは Cloud SQL(source) を primary とする external replica の作成と切り替えをフォローする managed service です. DMS は現時点では統合はサポートしていないこと(destination のインスタンスに DB があると実行できない), 切り替えは DB の切り替えのみサポートしていてアプリケーションの変更は別途必要ということで今回は要件に見合いませんでした.

#### export/import

当初やろうとしていた方法はこれで, source インスタンスで書き込みだけを停止し該当 DB を export , そしてそれを destination へと import し, 完了したらアプリケーションを destination へと変更する方法です. この方法は最も手順がシンプルかつ事前準備もほとんどいらないため, 最も楽な方法ではある一方, 書き込みの停止時間が長くなります. 特にメルカリ Shops では source インスタンスを参照している分析用バッチなどが多く動いていて, それらを import 後に切り替えるなどをするとどうしても 1 時間以上書き込み停止発生してしまい, その停止時間がサービスにクリティカルな機能の要件に見合わないということで, この方法も断念しました.

#### Logical Replication(manual)

最後に検討した方法が PostgreSQL の [Logical Replication](https://www.postgresql.org/docs/current/logical-replication.html) を利用する方法です. Cloud SQL では [Logical Replication をサポートしている](https://cloud.google.com/sql/docs/postgres/replication/configure-logical-replication)ため, これらを利用してデータの同期と切り替えを行います.

Logical Replication は, primary を source としないといけない, 同期レプリケーションはサポートしてない(設定できない), ConnectorEnforcement が有効化されている場合は機能しないなどの [Cloud SQL としての制限](https://cloud.google.com/sql/docs/postgres/replication/configure-logical-replication#limitations-general)や, DDL は伝播しない, large object は伝播しないなど [Logical Replication としての制限](https://www.postgresql.org/docs/current/logical-replication-restrictions.html)がいくつかありますが, 今回のケースではいずれも大きな問題とはなりませんでした. 加えて export/import で問題になった分析用バッチなどもこの方法だと同期が完了したタイミングで参照先をアプリケーションより前に変更しておくなど, 切り替え方法を工夫することで停止時間を短くできるため, 今回はこの方法をとることにしました.

## 統合手順

Logical Replication を構成し統合するにはこのような流れで進めていきます:

1.  インスタンスで `cloudsql.logical_decoding` を有効化
2.  schema dump & restore
3.  Logical Replication を設定
4.  同期完了を待つ
5.  アプリケーションの接続を DNS ベースにする
6.  source 側で書き込み block(downtime 開始)
7.  ブロックする前までのデータ更新が追いついたことを確認
8.  DNS 変更
9.  source 側で既存の接続を kill

大きく分けて Logical Replication 準備(1-4), 切り替え前作業(5-7), 切り替え(8-9)の3つに分けて説明していきます.

### Logical Replication 準備

ここではインスタンスで Logical Replication を構成するための設定をします. 以下, 統合先インスタンスを destination, 統合元インスタンスを source とします.

まず最初に source に対して `cloudsql.logical_decoding` を有効化する必要がありますが, これには再起動が必要となります. データ量や TPS などによって異なるかと思いますが, 大体 30s ~ 60s 程度で起動が完了しました.

続いて destination に source と同じ PostgreSQL user, database を作成します. [user](https://cloud.google.com/sql/docs/postgres/create-manage-users), [database](https://cloud.google.com/sql/docs/postgres/create-manage-databases) を作成したら destination に source の schema をリストアします. 実データは Logical Replication の `COPY` によって同期されていくため単に空のテーブルとアクセス権のみ設定するだけでよいです. インスタンスに接続するのは前述の Cloud SQL Auth Proxy 経由で接続しています(この後の Cloud SQL Auth Proxy の起動は省略).

また, この後何度もインスタンスに接続をするので, このように `/etc/hosts` や `~/.pgpass` を設定しておいて機械的にアクセスできるようにしておくと良いでしょう.

```
## /etc/hosts

127.0.0.1 source-001
127.0.0.2 destination-001

## ~/.pgpass
###  source-001, destination-001 に src user として src database に接続
source-001:5432:src:src:${PASSWORD}
destination-001:5432:src:src:${PASSWORD}
```

```
$ cloud-sql-proxy \
    ${PROJECT}:${REGION}:source-001 \
    --address $(grep source-001 /etc/hosts | cut -d' ' -f1)

$ cloud-sql-proxy \
    ${PROJECT}:${REGION}:destination-001 \
    --address $(grep destination-001 /etc/hosts | cut -d' ' -f1)
```

なお Logical Replication は DDL を伝播しないという制約があり, dump/restore やLogical Replication 中に誤って DDL を実行してしまわないようにスクリプト側でもブロックするなどしてそれに対応しました.

```
## dump
$ pg_dump \
  -U ${USER} \
  -h source-001 \
  --schema-only > src.$(date '+%Y%m%d-%H%M%S').sql

## restore
$ psql -h destination-001 \
  --user src \
  --dbname src < src.xxxxxx.sql
```

Logical Replication を構成するためには publication を source 側に, subscription を destination 側に作成する必要があります. それぞれ以下のような形で作成可能です:

```
## publication の作成
CREATE PUBLICATION pub FOR ALL TABLES;
SELECT * FROM pg_publication_tables;
```

subscription でつなぐユーザーは, 区別できるようにアプリケーションが利用しているものとは別のものを用意するとよいでしょう.

```
## subscription の作成
CREATE SUBSCRIPTION sub_src
    CONNECTION 'host=xxxxxxx port=5432 dbname=src user=replication password=xxxxxx'
    PUBLICATION pub;

SELECT * FROM pg_stat_subscription;
```

これで Logical Replication が開始し, `COPY` コマンドが source 側で実行され, データの初期同期(既存のデータのコピー)が行われます. `COPY` が終わったらデータの差分同期が行われるようになります. データサイズの大きいテーブルだとかなり時間がかかるため, `COPY` 作業が終わったかどうかは source 側で pg\_stat\_activity を見るか, destination 側で `COPY` 対象テーブルにロックが掛かってるかを見るとわかります:

```
## source
SELECT * FROM pg_stat_activity WHERE query LIKE '%COPY%';

## destination
SELECT * FROM xxx LIMIT 1;
```

`COPY` が終わり差分同期が始まったら source と destination の差はこのようにして求められます. 両方 0 だった場合は追いついています.

```
## source
SELECT
    pg_wal_lsn_diff(sent_lsn,write_lsn) write_diff,
    pg_wal_lsn_diff(sent_lsn,flush_lsn) flush_diff,
    pg_wal_lsn_diff(sent_lsn,replay_lsn) replay_diff
FROM
    pg_stat_replication;

## destination
SELECT pg_wal_lsn_diff(received_lsn,latest_end_lsn) FROM pg_stat_subscription;
```

`COPY` が終わりそれぞれの diff が 0 となっていたら差分同期も追いついているため, 切り替え前作業に進みます.

### 切り替え前作業

ここでは書き込みを停止して実際に切り替えを実行する前までの作業を説明します. 前述しましたがメルカリ Shops の DB 構成は

1.  DB への接続は直接 IP ベースで接続している
2.  write/read ユーザーを分けていない, `cloudsqlsuperuser` Role を持つ

ということがあります. 書き込み停止を確実に行い, かつ短時間で済むようにするにはいくつかの工夫をする必要があります.

#### 接続方法の変更

IP ベースでの接続となると, アプリケーションを統合先インスタンスへと向き先を変更する必要があり, そのためにはデプロイが必要となります. 書き込み停止時間中にデプロイをすると数十分かかるため, 事前にアプリケーションの接続を FQDN を使うように変更することにしました. 例えば DSN では

```
postgres://src:xxxxxx@10.0.0.1:5432/src
```

と `10.0.0.1` に向いていたものを `src.db-consolidation.mercari.internal` と FQDN に変更します:

```
postgres://src:xxxxxx@src.db-consolidation.mercari-shops.internal.:5432/src
```

こうすることによって書き込み停止した後に `src.db-consolidation.mercari.internal` を source から destination に変更することで, アプリケーションのデプロイを伴わずに切り替えが可能となります.

#### 書き込み停止

書き込みの停止については write/read ユーザーが分かれておらず同一ユーザーでクエリが実行されていたため, 少し工夫が必要です. もしユーザーが分かれていれば write ユーザーの RENAME などでブロックすることも可能ですが, そうなってはいないためユーザーの権限を剥奪するかデータベースごと read only にするかの 2 通りの方法が考えられます. ユーザーは`cloudsqlsuperuser` Role を持っているため, REVOKE を実行して更新権限剥奪するよりも, 有効/無効が単純なデータベースを read only にすることにしました:

```
ALTER DATABASE xxx SET default_transaction_read_only TO on;
```

ただし, この ALTER 文は default を変更するのみで transaction で明示的に `SET TRANSACTION` などが実行されている場合は書き込み可能となってしまうため, それが利用されていないことを確認する必要があります. メルカリ Shops では DB 周りは [https://github.com/ent/ent](https://github.com/ent/ent) を利用しており, `SET` するには [WithVar](https://github.com/ent/ent/blob/master/dialect/sql/driver.go#L95) を実行するか, 直接 `SET XXX` を実行する必要がありますが, そのどちらも実行されていないため `ALTER DATABASE` を採用しました.

実際の流れですが, まずアプリケーションの DSN を FQDN(向き先は source-001) に変更しデプロイします. デプロイ完了し, 実際に FQDN が利用されていることが確認できたら書き込みを停止させるために source 側で ALTER 文を打ちます. この ALTER 文は Connection Pooling などすでに接続されているクライアントには有効ではないため, 一度すべての接続を切断して再接続を促します.

```
## 書き込みを停止
ALTER DATABASE src SET default_transaction_read_only TO on;

## 自分以外の接続をすべて KILL
SELECT
    pg_terminate_backend(pid)
FROM
    pg_stat_activity
WHERE
    pid <> pg_backend_pid()
AND
    datname = current_database()
AND usename = CURRENT_USER;
```

このあとの接続はすべて `default_transaction_read_only = ON` となっているため, (明示的に指定しない限り)書き込みは失敗します.

### 切り替え

切り替えは FQDN の向き先を destination の IP に変更することで切り替え可能です. その前にデータが同期されているかなどを確認しておく必要があります. Cloud SQL での Logical Replication は同期レプリケーションではないため, 厳密にはすべての更新が伝播したかをチェックする必要がありますが, 前述の通りメルカリ Shops は read heavy なユースケースであって差分同期は十分早いため, シンプルな確認だけするようにしました.

```
## source
SELECT
    pg_wal_lsn_diff(sent_lsn,write_lsn) write_diff,
    pg_wal_lsn_diff(sent_lsn,flush_lsn) flush_diff,
    pg_wal_lsn_diff(sent_lsn,replay_lsn) replay_diff
FROM
    pg_stat_replication;

## destination
SELECT pg_wal_lsn_diff(received_lsn,latest_end_lsn) FROM pg_stat_subscription;
```

これらの source/destination での WAL の同期状況, 実行状況を何度か確認しそれぞれ 0 のままだった場合は切り替え可能として進めます. また, Logical Replication は仕様として sequence は同期されないため, もし利用している場合はそれもここで合わせておく必要があります:

```
## source
SELECT * FROM pg_sequences;

SELECT
    max_value
FROM
    pg_sequences
WHERE
   sequencename = '${SEQUENCE_NAME}';

## destination
SELECT setval('${SEQUENCE_NAME}', 99999);
SELECT
    max_value
FROM
    pg_sequences
WHERE
   sequencename = '${SEQUENCE_NAME}';
```

これで source と destination のデータが揃っている状態となるため, FQDN の向き先を destination の Private IP に変更し, DNS が伝播した後に再度 source 側の接続を `KILL` します. これで source 側に残っている接続がすべて destination に切り替わります.

```
$ dig +short src.db-consolidation.mercari-shops.internal.
10.0.0.2

## source
SELECT
    pg_terminate_backend(pid)
FROM
    pg_stat_activity
WHERE
    pid <> pg_backend_pid()
AND
    datname = current_database()
AND usename = CURRENT_USER;

## destination
SELECT
    *
FROM
    pg_stat_activity
WHERE
    pid <> pg_backend_pid()
AND
    datname = current_database()
AND usename = CURRENT_USER;
```

FQDN を変更し source への接続を `KILL` しすべての接続が destination に向くことが確認できたら, downtime は終了となります.

## 統合した結果

上記の手順で統合作業を行うことで, 長くても 2~3 分程度の停止時間で切り替えが完了し, 実作業はメンテナンスなどを設けずにすべてオンラインで日中に完了させられました. エラーも切り替え作業前後の接続を `KILL` することによる再接続でエラーとなる程度で, 瞬断程度の問題で済みました.

また統合による効果として

-   コスト効果: 25%程度削減
-   余剰なインスタンス削除による運用負荷軽減

など, 当初の課題をいくつか解消することができました.

メルカリ Shops では IP ベースでの接続をしていたためこのような手法で統合/切り替えを行ってきましたが, Cloud SQL Auth Proxy などではまた別のアプローチ([v2.15.0](https://github.com/GoogleCloudPlatform/cloud-sql-proxy/releases/tag/v2.15.0) の DNS ベースを利用するなど)を取る必要があるかと思います. また, より強い整合性が求められるケースや切り戻し用インスタンスを準備して切り戻しに備えるなど, 今回の統合手法よりも難しいケースも考えられます. 普段チームでよく運用している MySQL とは勝手が違うことが多くかなり勉強になりました.

## 最後に

現在, メルカリでは学生インターン/エンジニアを積極的に募集しています. ぜひ [Job Description](https://careers.mercari.com/jobs/) をご覧ください。