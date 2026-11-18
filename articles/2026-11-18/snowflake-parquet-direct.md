---
title: "Snowflake Parquet Direct の仕様をドキュメントと実測から理解する"
source: "https://tech.layerx.co.jp/entry/snowflake-parquet-direct"
publishedDate: "2026-11-18"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "civitaspo"
---

> **Note:** Full content could not be retrieved. [Read the original article](https://tech.layerx.co.jp/entry/snowflake-parquet-direct)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20261118/20261118010228.png) こんにちは。コーポレートエンジニアリング室 データグループの[@civitaspo](https://x.com/civitaspo)です。そろそろクリスマスに向けて、子どもたちにAmbientな要件ヒアリングが求められる時期になってきましたね。今年は「サンタへの手紙」という確定仕様書を、問題なく手に入れられるといいのですが...

# はじめに

Snowflake の Parquet Direct 機能が Public Preview で発表されましたね！僕としては待望していた機能だったので、Xで興奮のつぶやきを発してしまったくらいです。

> これで過去の資産も大きなコストかけずにSnowflakeから参照できるようになる！ADD\_FILES\_COPYだとコピーが発生してたけど、これは発生しないし、何よりHive Partitioningに対応してるから、パスに含まれる key=valueを再ロードなくカラムとして参照できる！マジで最高！ [#Snowflake](https://x.com/hashtag/Snowflake?src=hash&ref_src=twsrc%5Etfw) [#DataSuperhero](https://x.com/hashtag/DataSuperhero?src=hash&ref_src=twsrc%5Etfw) [https://t.co/PN9Imtpy8N](https://t.co/PN9Imtpy8N)
> 
> — ｷｳﾞｨﾀｽﾎﾟ(人工知能) (@civitaspo) [2026年10月26日](https://x.com/civitaspo/status/2114581743055646990?ref_src=twsrc%5Etfw)

Parquet Direct は、オブジェクトストレージ上に保存された Parquet ファイルをコピーせずに、Iceberg テーブルとして Snowflake から参照する機能です。ファイルをコピーして取り込む方法と比べ、データのコピーや保存にかかる費用を抑えながら、過去のデータを参照できます。

また、この機能で注目しているのは Hive-style Partitioning にも対応していることです。Hive 形式のパーティションでは、パーティションの値が Parquet ファイル内のデータではなく、`date=2026-11-11/` のようなパスに含まれる場合があります。Parquet Direct では、そのパスからパーティション列と値を導出できるため、既存ファイルをコピーせずにパーティション付きの Iceberg テーブルとして参照できます。

本記事では、2026年11月11日時点の Snowflake 公式ドキュメントと、2026年11月11日〜17日に筆者の検証環境で得た実測結果をもとに、Parquet Direct の仕様を整理します。非常に情報量が多く、マニア向けの記事となっているので、ふんわり Parquet Direct を知りたいだけの方は「実測編」は飛ばすのをオススメします。

なお、過去に COPY LOAD\_MODE = ADD\_FILES\_COPY に関しても同様のスタイルで検証しているので、Parquet ファイルをSnowflakeで扱う方法として合わせて読んでいただけると嬉しいです。

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/snowflake-iceberg-copy-add-files-copy)

-   [はじめに](#はじめに)
-   [おことわり](#おことわり)
-   [Parquet Direct は何をするのか](#Parquet-Direct-は何をするのか)
    -   [Parquet ファイルからテーブルを作成する](#Parquet-ファイルからテーブルを作成する)
    -   [Hive 形式のパスからパーティション列を導出する](#Hive-形式のパスからパーティション列を導出する)
-   [ドキュメントから読み取れる仕様](#ドキュメントから読み取れる仕様)
-   [実測編①: パーティション列による読み取りの絞り込み](#実測編-パーティション列による読み取りの絞り込み)
    -   [パーティション列を条件に入れることでスキャン対象が減る](#パーティション列を条件に入れることでスキャン対象が減る)
    -   [複数のパーティション列を条件にする](#複数のパーティション列を条件にする)
    -   [Parquet 内の列でもファイルを絞り込めるか](#Parquet-内の列でもファイルを絞り込めるか)
-   [実測編②: ファイルの選択と更新](#実測編-ファイルの選択と更新)
    -   [特定の path prefix のファイルだけを登録する](#特定の-path-prefix-のファイルだけを登録する)
    -   [存在しない path prefix を指定した refresh では全体が更新されなかった](#存在しない-path-prefix-を指定した-refresh-では全体が更新されなかった)
    -   [自動更新で S3 のファイル追加・削除が反映される](#自動更新で-S3-のファイル追加削除が反映される)
    -   [削除後、refresh 前の読み取りはキャッシュの有無で変わる](#削除後refresh-前の読み取りはキャッシュの有無で変わる)
    -   [登録済みファイルを上書きすると読み取りに失敗することがある](#登録済みファイルを上書きすると読み取りに失敗することがある)
-   [実測編③: 更新状況とエラーの確認](#実測編-更新状況とエラーの確認)
    -   [自動更新の状態は SYSTEM$PARQUET\_DIRECT\_AUTO\_REFRESH\_STATUS で確認できる](#自動更新の状態は-SYSTEMPARQUET_DIRECT_AUTO_REFRESH_STATUS-で確認できる)
    -   [登録履歴からファイルの追加・上書き・削除を確認する](#登録履歴からファイルの追加上書き削除を確認する)
    -   [壊れたファイルは手動 refresh が成功してもスキップされる](#壊れたファイルは手動-refresh-が成功してもスキップされる)
-   [実測編④: スキーマと型の変化](#実測編-スキーマと型の変化)
    -   [スキーマ推論は明示していないカラムを補完する](#スキーマ推論は明示していないカラムを補完する)
    -   [スキーマ推論と Schema Evolution の設定を組み合わせる](#スキーマ推論と-Schema-Evolution-の設定を組み合わせる)
    -   [schema evolution が有効なら追加された列を参照できる](#schema-evolution-が有効なら追加された列を参照できる)
    -   [列名の大文字・小文字は照合設定によって扱いが変わる](#列名の大文字小文字は照合設定によって扱いが変わる)
    -   [互換性のある型変更は schema evolution で取り込める](#互換性のある型変更は-schema-evolution-で取り込める)
    -   [型が衝突しても自動更新自体は続く](#型が衝突しても自動更新自体は続く)
    -   [テーブルと型が衝突するファイルを含む手動 refresh は失敗する](#テーブルと型が衝突するファイルを含む手動-refresh-は失敗する)
    -   [テーブル作成後に変更できる設定とできない設定がある](#テーブル作成後に変更できる設定とできない設定がある)
    -   [テーブル作成後にカラムを追加・削除・型変更できない](#テーブル作成後にカラムを追加削除型変更できない)
    -   [不正な UTF-8 は読み取り時に置換できる](#不正な-UTF-8-は読み取り時に置換できる)
    -   [JSON 文字列は VARIANT として直接読み込めない](#JSON-文字列は-VARIANT-として直接読み込めない)
-   [大量のファイルを扱うときに考えたいこと](#大量のファイルを扱うときに考えたいこと)
-   [おわりに](#おわりに)
-   [We are hiring!](#We-are-hiring)

# おことわり

本記事は、Parquet Direct を使ってオブジェクトストレージ上の Parquet ファイルを Snowflake から参照する方式を設計・検証している方向けに書いています。Snowflake、Apache Iceberg、Parquet、オブジェクトストレージに関する基本的な用語は前提知識として扱います。

Parquet Direct の公式ドキュメントを確認したうえで、運用を考えるなかで気になった次のような挙動を検証します。項目が多いので、困ったときに参照するくらいの気持ちで読んでもらえると嬉しいです。

-   ファイルの初回登録、手動・自動 refresh による追加・削除・上書きと、更新状態や登録履歴の確認
-   パーティション列による pruning と、パスを指定したファイルの選択
-   ファイル削除後の、キャッシュの有無による読み取り結果の違い
-   スキーマ推論、Schema Evolution によるカラム追加と型拡張、列名の照合
-   型が衝突するファイルや壊れたファイルの登録結果、不正な UTF-8 の読み取り
-   JSON 文字列と Parquet の Variant Logical Type の扱い

検証には Amazon S3 上の Parquet ファイルを使いました。ファイルの変更や削除の実験には、数行の検証用データを用いています。

本記事では、挙動の検証を中心に扱います。大量のファイルを使った性能・費用の定量評価は扱いません。

2026 年 11 月 18 日時点で Parquet Direct は Public Preview です。仕様や制約は変更される可能性があるため、利用時は最新のドキュメントを確認してください。

# Parquet Direct は何をするのか

Parquet Direct は、オブジェクトストレージ上の Parquet ファイルを、移動やコピーすることなく Iceberg テーブルのデータファイルとして登録し、Snowflake から参照する機能です。

このテーブルは読み取り専用です。テーブルの作成後にストレージ上でファイルが追加・変更・削除された場合は、その変更をテーブルのメタデータにも反映する必要があります。Snowflake はイベント通知を使う自動更新と、`ALTER ICEBERG TABLE ... REFRESH` による手動更新を提供しています。

既存の Parquet ファイルを Snowflake から利用する方法には、Snowflake-managed Iceberg table に取り込む方法もあります。たとえば [`COPY INTO ... LOAD_MODE = ADD_FILES_COPY`](https://tech.layerx.co.jp/entry/snowflake-iceberg-copy-add-files-copy) は、Parquet ファイルをテーブルのストレージにコピーして登録します。Parquet Direct は元の場所にあるファイルを参照するのみで、Snowflake からデータを変更できない点が異なります。

### Parquet ファイルからテーブルを作成する

Parquet Direct では、ストレージへのアクセスを設定した External Volume と、パスの解釈方法を指定する Catalog Integration を用意し、それらを使って Iceberg テーブルを作成します。たとえば、次のような Hive 形式のパスに Parquet ファイルが配置されているとします。

sales/
  d=2026-11-09/part-0001.parquet
  d=2026-11-10/part-0002.parquet

[External Volume](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-external-volume) は設定済みとし、Catalog Integration とテーブルを作成します。

CREATE CATALOG INTEGRATION my\_parquet\_catalog\_integration
  CATALOG\_SOURCE = OBJECT\_STORE
  TABLE\_FORMAT = HIVE
  ENABLED = TRUE;

CREATE ICEBERG TABLE sales
  EXTERNAL\_VOLUME = 'example\_volume'
  CATALOG = 'my\_parquet\_catalog\_integration'
  BASE\_LOCATION = 'sales/'
  AUTO\_REFRESH = FALSE
  ENABLE\_SCHEMA\_INFERENCE = TRUE
  ENABLE\_SCHEMA\_EVOLUTION = TRUE
  MATCH\_BY\_COLUMN\_NAME = CASE\_INSENSITIVE
  REPLACE\_INVALID\_CHARACTERS = FALSE;

SELECT \* FROM sales;

ここで重要なのは、Catalog Integration に `CATALOG_SOURCE = OBJECT_STORE` を指定している点です。`CREATE ICEBERG TABLE` に `PARQUET_DIRECT` のような指定はなく、テーブルが参照する Catalog Integration の設定によって、Parquet Direct かどうかを判断します。

`TABLE_FORMAT = HIVE` を指定すると、`d=2026-11-09/` のようなパスからパーティション列とその値が導出されます。Hive 形式を使わずパーティション列を式で定義する場合は `NONE` を指定します。テーブルの `CATALOG` を省略すると、スキーマ、データベース、アカウントに設定されたデフォルト値が使われます。以下の例のように、スキーマのデフォルトを `my_parquet_catalog_integration` に設定すると、そのスキーマ内では `CREATE ICEBERG TABLE` に `CATALOG` を書かなくても `my_parquet_catalog_integration` を使えます。

\-- スキーマにデフォルトの Catalog Integration を設定
ALTER SCHEMA my\_db.my\_schema SET CATALOG = 'my\_parquet\_catalog\_integration';

\-- CATALOG を省略すると、スキーマの設定が使われる
CREATE ICEBERG TABLE my\_db.my\_schema.sales
  EXTERNAL\_VOLUME = 'example\_volume'
  BASE\_LOCATION = 'sales/';

デフォルト値が複数の階層に設定されている場合は、スキーマ、データベース、アカウントの順に優先されます。いずれの場合も Parquet Direct には `OBJECT_STORE` の Catalog Integration が必要です。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-catalog-integration#set-a-default-catalog-at-the-account-database-or-schema-level)

`BASE_LOCATION` は External Volume の基準パスからの相対パスです。この例では、作成時に `sales/` 配下の既存ファイルを登録し、Parquet のメタデータからスキーマを導出し、Hive 形式のパスからパーティション列と値を導出します。`ENABLE_SCHEMA_INFERENCE = TRUE` は作成時にファイルからカラムを導出する設定です。`ENABLE_SCHEMA_EVOLUTION = TRUE` は、後続の更新で新しいカラムや対応する型拡張を反映します。`MATCH_BY_COLUMN_NAME` は、ファイルとテーブルのカラム名を照合する際に大文字・小文字を区別するかを指定します。

ファイルを追加・削除した後は、テーブルを更新してから参照します。手動更新には `REFRESH` を使います。

ALTER ICEBERG TABLE sales REFRESH;

イベント通知を使う自動更新には、S3 から Snowflake に通知を届ける設定が必要です。[Snowflake のチュートリアル](https://docs.snowflake.com/en/user-guide/tutorials/parquet-direct-auto-refresh-s3)で設定方法を確認できます。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tutorials/parquet-direct-auto-refresh-s3)

### Hive 形式のパスからパーティション列を導出する

[Hive 形式のパーティショニング](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#partitioning)は、`キー=値/` を含むパスでデータを分ける配置方法です。`d=2026-11-09/` と `d=2026-11-10/` の下に、それぞれの日付のオブジェクトを配置できます。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#partitioning)

Catalog Integration に `TABLE_FORMAT = HIVE` を指定すると、Snowflake はこのパスから `d` という**パーティション列**と、その値を導出します。ファイルを追加・削除した場合は、refresh によってパーティションの情報も更新されます。導出した列は、次のように SQL の条件に使えます。

SELECT \*
FROM sales
WHERE d = '2026-11-09';

パーティション列を条件に使うと、条件に合わないパーティションの読み取りを省く partition pruning が期待できます。Snowflake も Parquet Direct でのパーティション分割を推奨しています。一方、Snowflake の `CLUSTER BY` は指定したキーに基づいてテーブル内のデータを配置し、必要に応じて再配置する仕組みです。Parquet Direct は `CLUSTER BY` に対応しないため、パスやファイルの配置は書き込み側で管理します。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#considerations-and-limitations)

# ドキュメントから読み取れる仕様

Snowflake のドキュメントから読み取れる仕様を整理します。

観点

ドキュメントに記載された仕様

テーブル

読み取り専用で、Snowflake からの INSERT / UPDATE / DELETE はできません。 [https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#considerations-and-limitations](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#considerations-and-limitations)

接続先

`EXTERNAL_VOLUME` はファイルへの接続先、`CATALOG` は `CATALOG_SOURCE = OBJECT_STORE` の Catalog Integration を指定します。いずれもスキーマ・データベース・アカウントのデフォルトを利用できます。 [https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet)

ストレージ

Amazon S3、Azure Blob Storage、Google Cloud Storage に対応します。 [https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct)

対象ファイル

`BASE_LOCATION` は External Volume からの相対ディレクトリを指定し、その配下の Parquet を登録します。`PATTERN` でファイルパスを正規表現により選択できます。 [https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet)

初回登録

`REFRESH_ON_CREATE` のデフォルトは `TRUE` で、テーブル作成時に既存ファイルを登録します。`REFRESH_ON_CREATE = FALSE` で省略した場合、後続の refresh で登録します。 [https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet)

パーティション

Catalog Integration が `TABLE_FORMAT = HIVE` なら Hive 形式のパスからパーティション列と値を導出し、`NONE` なら `METADATA$FILENAME` の式でパーティション列を定義し、`PARTITION BY` に指定します。 [https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#partitioning](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#partitioning)

更新

`AUTO_REFRESH` のデフォルトは `FALSE` です。`TRUE` ならイベント通知を処理し、手動更新はベースパス全体または指定した相対パスを対象にします。自動更新が有効な間は手動更新できません。 [https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#refresh](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#refresh)

スキーマ推論

`ENABLE_SCHEMA_INFERENCE` はテーブル作成時に Parquet ファイルからカラムを導出します。カラム定義を省略した場合のデフォルトは `TRUE`、指定した場合は `FALSE` です。`TRUE` では明示したカラム以外も導出できます。`REFRESH_ON_CREATE = FALSE` の場合は、カラム定義を省略できません。 [https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet)

スキーマ変更

`ENABLE_SCHEMA_EVOLUTION = TRUE` をテーブル作成時に指定すると、後続の refresh で新規カラムと対応する型拡張を反映します。`ENABLE_SCHEMA_INFERENCE = TRUE` が必要で、`ENABLE_SCHEMA_INFERENCE` の指定を省略すると自動的に `TRUE` になります。`ENABLE_SCHEMA_EVOLUTION` のデフォルトは `FALSE` で、テーブル作成後には有効化できません。 [https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#schema-evolution](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#schema-evolution)

不正な UTF-8

`REPLACE_INVALID_CHARACTERS` はクエリ結果に含まれる不正な UTF-8 を置換する設定です。`TRUE` は Unicode の置換文字 `�` に置き換え、`FALSE` はエラーを返します。デフォルトは `FALSE` で、スキーマ・データベース・アカウントにも設定できます。 [https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet)

列名の照合

テーブルの `MATCH_BY_COLUMN_NAME` パラメータで、列名の大文字・小文字を区別するか指定します。デフォルトは `CASE_INSENSITIVE` です。 [https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet)

仮想列・制約

式による仮想列や、`NOT NULL`、`UNIQUE`、`PRIMARY KEY`、`FOREIGN KEY` の制約を定義できます。 [https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet)

ポリシー・メタデータ

列の `MASKING POLICY`、テーブルの `ROW ACCESS POLICY`、`TAG`、テーブルや列の `COMMENT` を指定できます。 [https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet)

型拡張

対応する拡張として Iceberg の `int → long`、`float → double`、scale を変えない decimal の precision 拡張が挙げられています。ネストされたフィールドにも再帰的に適用されます。 [https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#schema-evolution](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#schema-evolution)

監視

自動更新の状態は `SYSTEM$PARQUET_DIRECT_AUTO_REFRESH_STATUS`、ファイル単位の登録結果は `ICEBERG_TABLE_FILE_REGISTRATION_HISTORY` で確認できます。 [https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#monitor-refresh](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#monitor-refresh)

テーブルメンテナンス

Snowflake によるテーブルメンテナンスと `CLUSTER BY` はサポートされません。 [https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#considerations-and-limitations](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#considerations-and-limitations)

費用

テーブル作成・手動 refresh の Compute Resource と自動更新の Serverless Compute に加え、追加データ 1 TB あたり 0.35 クレジットの登録料金が発生します。データ登録料金は 2026 年 12 月 1 日から適用されます。 [https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#billing](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#billing)

`REFRESH_ON_CREATE = FALSE` とスキーマ推論について、公式ドキュメントには食い違いがあります。[CREATE ICEBERG TABLE のリファレンス](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet)は、初回登録を省略する場合、カラム定義が必要と説明しています。一方、[Parquet Direct のガイド](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#use-auto-refresh-when-creating-large-tables)には、カラム定義を省略したまま `REFRESH_ON_CREATE = FALSE` を指定する例があり、その直後の注記ではカラム定義が必要と説明されています。

大量のファイルがある場合に作成時の全ファイル登録を避けるには、先にカラム定義を用意して `REFRESH_ON_CREATE = FALSE` でテーブルを作り、必要なパスから順に refresh する方法があります。カラム定義を作る際は、stage 上の Parquet ファイルから [`INFER_SCHEMA`](https://docs.snowflake.com/en/sql-reference/functions/infer_schema) でスキーマを取得できます。`FILES` で対象ファイルを指定するか、同じスキーマのファイルが多数ある場合は `MAX_FILE_COUNT` で調査するファイル数を制限できます。Iceberg テーブル向けには `KIND => 'ICEBERG'` が推奨されています。`MAX_FILE_COUNT` では調査するファイルを選べないため、対象ファイルのスキーマに差がある場合は注意が必要です。

手動 refresh では、対象範囲の追加・変更・削除をメタデータに反映します。毎回すべてのファイルを新規登録し直すわけではありません。存在しないパスを指定した場合については、[公式ドキュメント](https://docs.snowflake.com/en/sql-reference/sql/alter-iceberg-table-refresh)の記述と実測結果が異なったため、後ほど取り上げます。

Parquet Direct の公式ドキュメントでは、1 回の refresh のファイル数上限は確認できませんでした。参考として、[External Table のドキュメント](https://docs.snowflake.com/en/sql-reference/sql/create-external-table)は、対象に約 100 万ファイル以上が含まれる場合、作成時の refresh を省略し、サブパスごとに段階的に refresh することを推奨しています。これは External Table に対する推奨ですが、大量のファイルを扱う場合は、Parquet Direct にも制限がある可能性を考慮し、利用時に確認するとよいでしょう。

[docs.snowflake.com](https://docs.snowflake.com/en/sql-reference/sql/create-external-table#optional-parameters)

[データ登録料金](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#billing)は追加されたファイルに課金され、変更のないファイルや削除にはかかりません。クエリの Compute Resource や S3 側の費用も別途考慮する必要があります。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#billing)

また、Parquet に Variant Logical Type が追加されたのは 2025 年 8 月です。Variant の追加前から提供されているサービスで出力した Parquet では、半構造化データがどの型で表現されるか確認するとよいでしょう。

[parquet.apache.org](https://parquet.apache.org/blog/2026/02/27/variant-type-in-apache-parquet-for-semi-structured-data/)

# 実測編①: パーティション列による読み取りの絞り込み

ここからは、Parquet Direct の運用で気になった挙動を実測で確認します。テーブル名やパスは、読みやすいように変更しています。

### パーティション列を条件に入れることでスキャン対象が減る

日付ごとに 5,000 行の Parquet ファイルを 1 つずつ配置し、パーティション列 `D` による絞り込みを確認しました。

d=2026-11-10/a.parquet
d=2026-11-11/b.parquet

結果キャッシュを無効にし、各クエリの実行前にウェアハウスを再開してローカルキャッシュもクリアしました。同じ列を読み取るクエリで比較します。

ALTER SESSION SET USE\_CACHED\_RESULT = FALSE;

SELECT COUNT(\*) AS N, SUM(LENGTH(MESSAGE)) AS CHARS
FROM partition\_pruning\_example
WHERE D = '2026-11-10';
\-- N     | CHARS
\-- 5000  | 160000

SELECT COUNT(\*) AS N, SUM(LENGTH(MESSAGE)) AS CHARS
FROM partition\_pruning\_example;
\-- N     | CHARS
\-- 10000 | 320000

各 SELECT のクエリ ID を指定し、[GET\_QUERY\_OPERATOR\_STATS](https://docs.snowflake.com/en/sql-reference/functions/get_query_operator_stats) で TableScan の統計を確認しました。

SELECT OPERATOR\_STATISTICS:pruning AS PRUNING,
       OPERATOR\_STATISTICS:io:bytes\_scanned AS BYTES\_SCANNED,
       OPERATOR\_STATISTICS:io:percentage\_scanned\_from\_cache AS CACHE\_RATIO
FROM TABLE(GET\_QUERY\_OPERATOR\_STATS('<SELECT のクエリ ID>'))
WHERE OPERATOR\_TYPE = 'TableScan';

\-- 条件あり: PRUNING = {"partitions\_scanned": 1, "partitions\_total": 2}
\--           BYTES\_SCANNED = 184082, CACHE\_RATIO = 0
\-- 条件なし: PRUNING = {"partitions\_scanned": 2, "partitions\_total": 2}
\--           BYTES\_SCANNED = 368164, CACHE\_RATIO = 0

パーティション列の条件によって、対象外のパーティションの読み取りが省かれました。`partitions_scanned` は Snowflake のスキャン単位であり、Hive パーティションや Parquet ファイルの数と常に一致するとは限りません。

### 複数のパーティション列を条件にする

`year` と `month` の 2 列を含む Hive 形式のパスに、各 2,000 行のファイルを配置しました。各ファイルには 1,000 行ずつの row group が 2 つあります。

year=2025/month=01/part.parquet
year=2025/month=02/part.parquet
year=2026/month=01/part.parquet
year=2026/month=02/part.parquet

Hive 形式の Catalog Integration を使って作成したテーブルでは、`year` と `month` はともにパーティション列として導出されました。次のクエリの `WHERE` 句を変えて比較します。

SELECT COUNT(\*) AS N, SUM(LENGTH(payload)) AS CHARS
FROM multi\_partition\_example
WHERE year = 2026 AND month = 1;
\-- N    | CHARS
\-- 2000 | 128000

結果キャッシュを無効にし、クエリごとに検証用ウェアハウスを再開してローカルキャッシュをクリアしました。再開後もキャッシュ利用が記録された場合は再実行し、利用率が 0 の結果を掲載しています。各クエリの TableScan を先ほどと同じ `GET_QUERY_OPERATOR_STATS` で確認しました。`BYTES_SCANNED` はバイト数、`CACHE_RATIO` はウェアハウスのローカルキャッシュから読み取った割合です。

WHERE 句

N

PARTITIONS\_SCANNED

PARTITIONS\_TOTAL

BYTES\_SCANNED

CACHE\_RATIO

`1 = 1`

8,000

8

4

4,181,256

0

`year = 2026`

4,000

4

4

2,090,976

0

`month = 1`

4,000

4

4

2,114,168

0

`year = 2026 AND month = 1`

2,000

2

4

1,056,992

0

`year >= 2025 AND year < 2026`

4,000

4

4

2,090,280

0

`MOD(year, 10) = 6`

4,000

4

4

2,090,976

0

片方の列だけを指定した場合と、両方を指定した場合で、それぞれスキャン量が減りました。範囲条件と `MOD` を使った条件でも減っています。実際に使う関数や条件式でも、同じようにスキャン量を確認するとよいでしょう。

ここでは `PARTITIONS_SCANNED` が `PARTITIONS_TOTAL` を上回っています。これらの値を Hive パーティションやファイルの個数としては扱わず、同じデータに対するクエリ間の比較に使います。

### Parquet 内の列でもファイルを絞り込めるか

パーティション列ではない Parquet 内の `id` でも確認します。次のように、2 ファイルそれぞれに異なる値の範囲を入れ、各ファイルを 2 つの row group に分けました。

part-0.parquet  row group 0: id =    0〜 999
                row group 1: id = 1000〜1999
part-1.parquet  row group 0: id = 2000〜2999
                row group 1: id = 3000〜3999

各 row group の最小値と最大値は Parquet の統計に記録されています。同じ列を読み取るクエリで、`WHERE` 句を変えて比較しました。

SELECT COUNT(\*) AS N, SUM(LENGTH(payload)) AS CHARS
FROM column\_filter\_example
WHERE id < 2000;
\-- N    | CHARS
\-- 2000 | 128000

WHERE 句

N

PARTITIONS\_SCANNED

PARTITIONS\_TOTAL

BYTES\_SCANNED

CACHE\_RATIO

`id >= 0`

4,000

4

2

2,085,824

0

`id < 2000`

2,000

2

2

1,041,648

0

`id < 1000`

1,000

2

2

1,045,744

0

`id < 2500`

2,500

4

2

2,094,016

0

`id < 2000` では、全ファイルを対象とする条件と比べてスキャン量が減りました。一方、同じファイル内で 1 つの row group に絞れる `id < 1000` では、`id < 2000` と比べて `PARTITIONS_SCANNED` は減りませんでした。今回の検証ではファイル単位で読み取り対象が絞り込まれ、対象ファイル内の 2 つの row group はどちらも読み取られました。

# 実測編②: ファイルの選択と更新

### 特定の path prefix のファイルだけを登録する

次のように、異なる path prefix にファイルを配置した場合を試します。

run-a/part.parquet  # ID 1
run-b/part.parquet  # ID 2

テーブル作成時の `PATTERN` で `run-a/` に一致するファイルを選択できます。

CREATE ICEBERG TABLE pattern\_table (ID INT, VALUE STRING)
  EXTERNAL\_VOLUME = 'example\_volume'
  CATALOG = 'my\_parquet\_catalog\_integration'
  BASE\_LOCATION = 'filter-review/'
  PATTERN = '.\*run-a/.\*';

SELECT ID, VALUE FROM pattern\_table ORDER BY ID;
\-- ID | VALUE
\--  1 | base

初回登録を省略し、自動更新を無効にしたテーブルでは、手動 `REFRESH` に path prefix を指定して登録することもできます。

ALTER ICEBERG TABLE manual\_table REFRESH 'run-a/';
\-- Statement executed successfully.

SELECT ID, VALUE FROM manual\_table ORDER BY ID;
\-- ID | VALUE
\--  1 | base

`PATTERN` は後続の更新にも適用されます。一方、手動更新での指定はその更新の対象範囲です。その後に全体を更新したり、自動更新を有効にしたりすると、ほかのファイルも登録対象になります。

### 存在しない path prefix を指定した refresh では全体が更新されなかった

手動更新では、対象を BASE\_LOCATION からの相対パスで指定できます。ファイル名だけでなく path prefix も指定できます。[公式ドキュメント](https://docs.snowflake.com/en/sql-reference/sql/alter-iceberg-table-refresh)には、存在しないパスを指定した場合について、次のように記載されています。

> If you specify a path that doesn’t exist, the refresh proceeds as if you didn’t specify a path.

[docs.snowflake.com](https://docs.snowflake.com/en/sql-reference/sql/alter-iceberg-table-refresh)

パスを省略した場合は `BASE_LOCATION` 配下の全ファイルが refresh の対象です。

ALTER ICEBERG TABLE example\_table REFRESH 'base.parquet';

存在しないパスを指定した refresh も試しました。登録対象に未登録の Parquet ファイルを 2 つ置き、`REFRESH_ON_CREATE = FALSE` と `AUTO_REFRESH = FALSE` を指定してテーブルを作成しました。テーブル名は短縮しています。

\-- S3 の BASE\_LOCATION 配下に base.parquet と wide.parquet を配置済み
\-- テーブル作成直後は未登録
SELECT COUNT(\*) AS N FROM manual\_refresh\_retest;
\-- N
\-- 0

\-- 存在しないファイルを指定
ALTER ICEBERG TABLE manual\_refresh\_retest REFRESH 'no-such-file.parquet';
\-- Statement executed successfully.

SELECT COUNT(\*) AS N FROM manual\_refresh\_retest;
\-- N
\-- 0

\-- パスを省略して更新
ALTER ICEBERG TABLE manual\_refresh\_retest REFRESH;
\-- Statement executed successfully.

SELECT COUNT(\*) AS N FROM manual\_refresh\_retest;
\-- N
\-- 2

SELECT FILE\_NAME, OPERATION\_STATUS, MESSAGE
FROM TABLE(my\_db.INFORMATION\_SCHEMA.ICEBERG\_TABLE\_FILE\_REGISTRATION\_HISTORY(
  TABLE\_NAME => 'my\_db.my\_schema.manual\_refresh\_retest'))
ORDER BY FILE\_NAME;

\-- FILE\_NAME                                  | OPERATION\_STATUS | MESSAGE
\-- blog/base.parquet      | REGISTERED\_NEW   | File registered successfully.
\-- blog/wide.parquet      | REGISTERED\_NEW   | File registered successfully.

存在しないファイル名を指定した refresh は成功しましたが、行数は 0 のままで、直後の登録履歴にもファイルはありませんでした。パスを省略した refresh の後には両方のファイルが登録されました。

存在しない path prefix でも別のテーブルを使って確認しました。`BASE_LOCATION` 配下には 2 ファイル、計 4 行を配置しています。

\-- REFRESH\_ON\_CREATE = FALSE で作成した直後のテーブル
ALTER ICEBERG TABLE missing\_directory\_example REFRESH 'missing-directory/';
\-- Statement executed successfully.

SELECT COUNT(\*) AS N FROM missing\_directory\_example;
\-- N
\-- 0

ALTER ICEBERG TABLE missing\_directory\_example REFRESH;
\-- Statement executed successfully.

SELECT COUNT(\*) AS N FROM missing\_directory\_example;
\-- N
\-- 4

ファイル名と path prefix のどちらでも、存在しないものを指定した場合は全体が更新されませんでした。この結果は、全体が更新されるというドキュメントの記述と異なります。

### 自動更新で S3 のファイル追加・削除が反映される

Parquet Direct の自動更新では、S3 のイベント通知を Snowflake に届け、ファイルの追加や削除を反映します。AWS での通知経路は [Snowflake のチュートリアル](https://docs.snowflake.com/en/user-guide/tutorials/parquet-direct-auto-refresh-s3)に説明されています。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tutorials/parquet-direct-auto-refresh-s3)

空のパスを指すテーブルを `AUTO_REFRESH = TRUE` で作成し、その後に Parquet ファイルを追加しました。手動 `REFRESH` を実行せず、登録履歴に `REGISTERED_NEW` が記録され、ファイル内の 210 行を取得できました。

削除は 2 ファイルで確認しました。時刻は UTC、テーブル名とパスは短縮しています。

\-- base.parquet と replacement.parquet を登録済み（各 2 行）
\-- 08:20:41 に S3 上の replacement.parquet を削除
\-- 手動 REFRESH は実行していない

SELECT ID, MESSAGE, CURRENT\_TIMESTAMP() AS OBSERVED\_AT
FROM auto\_refresh\_example ORDER BY ID;
\-- OBSERVED\_AT 08:20:47: ID 1, 2, 7, 8

\-- 08:23:15 に同じ SELECT を再実行
\-- OBSERVED\_AT 08:23:15: ID 1, 2

SELECT OPERATION\_TIME, FILE\_NAME, OPERATION\_STATUS
FROM TABLE(my\_db.INFORMATION\_SCHEMA.ICEBERG\_TABLE\_FILE\_REGISTRATION\_HISTORY(
  TABLE\_NAME => 'my\_db.my\_schema.auto\_refresh\_example'))
ORDER BY OPERATION\_TIME;
\-- OPERATION\_TIME (UTC) | FILE\_NAME           | OPERATION\_STATUS
\-- 08:19:23.514         | base.parquet        | REGISTERED\_NEW
\-- 08:20:02.300         | replacement.parquet | REGISTERED\_NEW
\-- 08:21:15.831         | replacement.parquet | UNREGISTERED

削除から約 34 秒後に登録解除され、その後の SELECT は残った 2 行を返しました。削除 6 秒後の SELECT は旧 4 行を返しており、このクエリの TableScan 統計では読み取ったデータのキャッシュ率が 100% でした。自動更新の反映には時間差があります。

### 削除後、refresh 前の読み取りはキャッシュの有無で変わる

`AUTO_REFRESH = FALSE` のテーブルに 100 行のファイルを登録し、S3 上のファイルを削除しました。refresh 前にデータを読み取るクエリを実行すると、ウェアハウスによって結果が異なりました。

\-- S3 上の登録済みファイル base.parquet を削除
SELECT SUM(LENGTH(VALUE))
FROM my\_db.my\_schema.DELETED\_FILE\_EXAMPLE;
\-- SUM(LENGTH(VALUE)): 2329
\-- TableScan の percentage\_scanned\_from\_cache: 1

\-- 別のウェアハウスで結果キャッシュを無効にして実行
USE WAREHOUSE cold\_warehouse;
ALTER SESSION SET USE\_CACHED\_RESULT = FALSE;
SELECT SUM(LENGTH(VALUE)) AS N
FROM my\_db.my\_schema.DELETED\_FILE\_EXAMPLE;
\-- The parquet file 'blog/deep-nov13/delete2/base.parquet'
\-- for table 'my\_db.my\_schema.DELETED\_FILE\_EXAMPLE'
\-- was inaccessible.

ALTER ICEBERG TABLE my\_db.my\_schema.DELETED\_FILE\_EXAMPLE REFRESH;
SELECT ID, VALUE FROM my\_db.my\_schema.DELETED\_FILE\_EXAMPLE;
\-- 0 rows

最初のクエリは TableScan の読み取りがすべてキャッシュからでした。別のウェアハウスでは削除済みファイルにアクセスできず、refresh 後は登録が解除されました。

### 登録済みファイルを上書きすると読み取りに失敗することがある

登録済みの Parquet ファイルを、同じ S3 キーのまま別の内容で上書きした場合を試します。まず `AUTO_REFRESH = FALSE` のテーブルに、ID が 1、2 のファイルを登録しました。そのファイルを ID が 7、8 のファイルで上書きし、手動 `REFRESH` の前後で SELECT を実行します。

\-- S3 上の登録済みファイル base.parquet を別の内容で上書き
\-- 上書き前の ID: 1, 2
\-- 上書き後の ID: 7, 8

SELECT ID, MESSAGE, CURRENT\_TIMESTAMP() AS OBSERVED\_AT
FROM my\_db.my\_schema.EVOLVE\_ISOLATED\_OFF
ORDER BY ID;

\-- The parquet file 'blog/base.parquet' for table
\-- 'my\_db.my\_schema.EVOLVE\_ISOLATED\_OFF' was modified.

ALTER ICEBERG TABLE my\_db.my\_schema.EVOLVE\_ISOLATED\_OFF REFRESH;
\-- Statement executed successfully.

\-- 上と同じ SELECT が成功し、ID 7、8 を取得

上書き後、テーブルのメタデータを更新する前の SELECT は、ファイルが変更されたというエラーになりました。手動 `REFRESH` 後には上書き後のデータを読め、登録履歴では旧ファイルの `UNREGISTERED` と新ファイルの `REGISTERED_NEW` を確認できました。

`AUTO_REFRESH = TRUE` の別テーブルでも、同じ S3 キーを ID 1、2 から ID 7、8 のファイルに上書きしました。結果キャッシュを無効にし、ウェアハウスを再開してローカルキャッシュもクリアしてから SELECT しています。

ALTER SESSION SET USE\_CACHED\_RESULT = FALSE;

\-- S3 の base.parquet を別の内容に上書き
SELECT ID, MESSAGE FROM overwrite\_example ORDER BY ID;
\-- The parquet file '.../base.parquet' for table '...OVERWRITE\_EXAMPLE' was modified.

\-- 自動更新の登録履歴: base.parquet が UNREGISTERED → REGISTERED\_NEW
\-- しばらく待ってから同じ SELECT を実行
SELECT ID, MESSAGE FROM overwrite\_example ORDER BY ID;
\-- ID | MESSAGE
\--  7 | replacement-7
\--  8 | replacement-8

この例では自動更新前の読み取りが失敗し、登録し直された後に新しい内容を読めました。同じキーへの上書きは、更新が反映されるまで読み取りに失敗する可能性があります。

# 実測編③: 更新状況とエラーの確認

### 自動更新の状態は SYSTEM$PARQUET\_DIRECT\_AUTO\_REFRESH\_STATUS で確認できる

テーブル作成後に auto-refresh を有効にし、ファイルを追加した後の状態を確認しました。通知キューの ARN、バケット名とパスは置き換えています。

SELECT SYSTEM$PARQUET\_DIRECT\_AUTO\_REFRESH\_STATUS('my\_db.my\_schema.my\_table');

\-- {
\--   "notificationChannelName": "<通知キューのARN>",
\--   "lastReceivedMessageTimestamp": "2026-11-11T17:17:44.072Z",
\--   "lastForwardedFilePath": "<バケット>/<パス>/good-before.parquet",
\--   "pendingFileCount": 1,
\--   "executionState": "RUNNING",
\--   "numOutstandingMessagesOnChannel": 1,
\--   "lastForwardedMessageTimestamp": "2026-11-11T17:17:19.373Z"
\-- }

`pendingFileCount` は処理待ちのファイル数です。ただし、0 の場合でも、クラウドプロバイダー側からの通知が遅れたり欠損したりしていると、すべてのファイルが登録済みかどうかは分かりません。登録済みファイルは `ICEBERG_TABLE_FILES`、登録や失敗の履歴は `ICEBERG_TABLE_FILE_REGISTRATION_HISTORY` で確認し、期待する S3 ファイルと照合します。`SYSTEM$PARQUET_DIRECT_AUTO_REFRESH_STATUS` の実行にはテーブルの OWNERSHIP が必要です。[公式ドキュメント](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#monitor-refresh)には、各項目と確認方法が記載されています。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#monitor-refresh)

### 登録履歴からファイルの追加・上書き・削除を確認する

手動 refresh の登録履歴を確認するため、同じテーブルでファイルの追加、上書き、削除を順に行い、最後に壊れた Parquet ファイルを登録しました。

\-- S3 に base.parquet を追加
ALTER ICEBERG TABLE history\_example REFRESH 'base.parquet';

\-- S3 の base.parquet を別の Parquet ファイルで上書き
ALTER ICEBERG TABLE history\_example REFRESH 'base.parquet';

\-- S3 の base.parquet を削除
ALTER ICEBERG TABLE history\_example REFRESH 'base.parquet';

\-- S3 に壊れた corrupt.parquet を追加
ALTER ICEBERG TABLE history\_example REFRESH 'corrupt.parquet';

SELECT SPLIT\_PART(FILE\_NAME, '/', \-1) AS FILE\_NAME, OPERATION\_STATUS, MESSAGE
FROM TABLE(my\_db.INFORMATION\_SCHEMA.ICEBERG\_TABLE\_FILE\_REGISTRATION\_HISTORY(
  TABLE\_NAME => 'my\_db.my\_schema.history\_example'))
WHERE FILE\_NAME LIKE '%/base.parquet' OR FILE\_NAME LIKE '%/corrupt.parquet'
ORDER BY OPERATION\_TIME;

\-- FILE\_NAME       | OPERATION\_STATUS | MESSAGE
\-- base.parquet    | REGISTERED\_NEW   | File registered successfully.
\-- base.parquet    | UNREGISTERED     | File unregistered successfully.
\-- base.parquet    | REGISTERED\_NEW   | File registered successfully.
\-- base.parquet    | UNREGISTERED     | File unregistered successfully.
\-- corrupt.parquet | SKIPPED          | Invalid: File is too small for Parquet.

上書き時には、元のファイルの登録解除と上書き後のファイルの登録がそれぞれ記録されました。壊れたファイルの refresh は成功しましたが、履歴には `SKIPPED` と記録されています。refresh の成否だけでなく、ファイルごとの登録結果を確認する必要があります。

### 壊れたファイルは手動 refresh が成功してもスキップされる

別テーブルに壊れた `z-broken.parquet` を追加して refresh し、その後、正常な `a-good.parquet` を追加してもう一度 refresh しました。

ALTER ICEBERG TABLE invalid\_file\_example REFRESH;
\-- Statement executed successfully.

SELECT SPLIT\_PART(FILE\_NAME, '/', \-1) AS FILE\_NAME, OPERATION\_STATUS, MESSAGE
FROM TABLE(my\_db.INFORMATION\_SCHEMA.ICEBERG\_TABLE\_FILE\_REGISTRATION\_HISTORY(
  TABLE\_NAME => 'my\_db.my\_schema.invalid\_file\_example'))
ORDER BY OPERATION\_TIME;
\-- FILE\_NAME        | OPERATION\_STATUS | MESSAGE
\-- base.parquet     | REGISTERED\_NEW   | File registered successfully.
\-- z-broken.parquet | SKIPPED          | Invalid: File is too small for Parquet.
\-- z-broken.parquet | SKIPPED          | Invalid: File is too small for Parquet.
\-- a-good.parquet   | REGISTERED\_NEW   | File registered successfully.

この例では正常ファイルの行は追加されましたが、壊れたファイルは `SKIPPED` でした。refresh の成功だけでは、対象ファイルがすべて登録されたとは判断できません。

# 実測編④: スキーマと型の変化

### スキーマ推論は明示していないカラムを補完する

`id` と `message` の 2 カラムを持つ Parquet ファイルを使い、テーブルには `id` だけを明示して作成します。

CREATE ICEBERG TABLE inference\_on (id INT)
  EXTERNAL\_VOLUME = 'example\_volume'
  CATALOG = 'my\_parquet\_catalog\_integration'
  BASE\_LOCATION = 'options/'
  PATTERN = '.\*inference\[.\]parquet'
  ENABLE\_SCHEMA\_INFERENCE = TRUE;

DESC ICEBERG TABLE inference\_on;
\-- name    | type
\-- ID      | NUMBER(10,0)
\-- MESSAGE | VARCHAR(134217728)

CREATE ICEBERG TABLE inference\_off (id INT)
  EXTERNAL\_VOLUME = 'example\_volume'
  CATALOG = 'my\_parquet\_catalog\_integration'
  BASE\_LOCATION = 'options/'
  PATTERN = '.\*inference\[.\]parquet'
  ENABLE\_SCHEMA\_INFERENCE = FALSE;

DESC ICEBERG TABLE inference\_off;
\-- name | type
\-- ID   | NUMBER(10,0)

推論を有効にすると、明示していない `message` も追加されました。無効にした場合は `id` のみです。

同じファイルを使い、指定を省略した場合も比較しました。カラムを明示せずに推論の指定も省略すると `ID` と `MESSAGE` が作られます。一方、`id` を明示した場合は `ID` のみです。ただし `id` を明示しても `ENABLE_SCHEMA_EVOLUTION = TRUE` を指定すると、推論が有効になり `MESSAGE` も作られました。

また、`id` を明示し、推論を有効にして `REFRESH_ON_CREATE = FALSE` で作成した場合、作成直後の列は `ID` のみでした。Schema Evolution が無効な状態で後からファイルを refresh しても `MESSAGE` は追加されませんでした。

### スキーマ推論と Schema Evolution の設定を組み合わせる

`ENABLE_SCHEMA_INFERENCE = FALSE` と `ENABLE_SCHEMA_EVOLUTION = TRUE` は同時に指定できません。カラムを明示していても、次の指定はエラーになりました。

CREATE ICEBERG TABLE inference\_conflict (id INT)
  EXTERNAL\_VOLUME = 'example\_volume'
  CATALOG = 'my\_parquet\_catalog\_integration'
  BASE\_LOCATION = 'example/'
  ENABLE\_SCHEMA\_INFERENCE = FALSE
  ENABLE\_SCHEMA\_EVOLUTION = TRUE;
\-- SQL compilation error:
\-- ENABLE\_SCHEMA\_EVOLUTION requires ENABLE\_SCHEMA\_INFERENCE to be enabled.
\-- Cannot explicitly disable schema inference when schema evolution is enabled.

`ENABLE_SCHEMA_INFERENCE` は作成時の設定です。作成後に `ALTER ICEBERG TABLE ... SET ENABLE_SCHEMA_INFERENCE = TRUE` を試すと、`Unsupported feature 'ENABLE_SCHEMA_INFERENCE'.` とエラーになりました。

### schema evolution が有効なら追加された列を参照できる

Parquet ファイルに追加されたカラムは、schema evolution を有効にしたテーブルでは refresh 後に参照できます。

`ENABLE_SCHEMA_EVOLUTION = TRUE` によるカラム追加を確認します。型拡張は後で確認します。

`id` と `message` を持つ 2 行の Parquet に、さらに `extra` を持つ 1 行の Parquet を追加し、手動更新で比較しました。

ENABLE\_SCHEMA\_EVOLUTION

登録後の行数

`extra` の扱い

`TRUE`

3

カラムが追加され、新しい行には `new-column`、古い 2 行には `NULL`

`FALSE`

3

テーブルにカラムは追加されず、新しい値を参照できない

`ENABLE_SCHEMA_EVOLUTION = FALSE` の場合もファイルの登録自体は成功しました。新しいカラムを使えないことは、更新の成否だけでは分かりません。自動更新が有効なテーブルでも、別のファイル追加によって `extra` が追加されることを確認しています。

`ENABLE_SCHEMA_EVOLUTION = FALSE` で作ったテーブルに後から `ADD COLUMN` する方法も試しましたが、ADD COLUMN は拒否されました。

### 列名の大文字・小文字は照合設定によって扱いが変わる

`MATCH_BY_COLUMN_NAME` はテーブルに設定するパラメータです。`CASE_INSENSITIVE` では大文字と小文字の両ファイルを登録できましたが、`CASE_SENSITIVE` では大文字の列に紐づけた後、小文字のファイルの登録がエラーになりました。

`ID, VALUE` 列を定義し、それぞれ `MATCH_BY_COLUMN_NAME` を指定したテーブルを用意します。初回登録を省略し、後から大文字の `ID, VALUE`、小文字の `id, value` を持つファイルを個別に登録しました。

CREATE ICEBERG TABLE case\_insensitive\_table (ID INT, VALUE STRING)
  EXTERNAL\_VOLUME = 'example\_volume'
  CATALOG = 'my\_parquet\_catalog\_integration'
  BASE\_LOCATION = 'case/'
  REFRESH\_ON\_CREATE = FALSE
  MATCH\_BY\_COLUMN\_NAME = CASE\_INSENSITIVE;

CREATE ICEBERG TABLE case\_sensitive\_table (ID INT, VALUE STRING)
  EXTERNAL\_VOLUME = 'example\_volume'
  CATALOG = 'my\_parquet\_catalog\_integration'
  BASE\_LOCATION = 'case/'
  REFRESH\_ON\_CREATE = FALSE
  MATCH\_BY\_COLUMN\_NAME = CASE\_SENSITIVE;

\-- MATCH\_BY\_COLUMN\_NAME = CASE\_INSENSITIVE
ALTER ICEBERG TABLE case\_insensitive\_table REFRESH 'upper.parquet';
ALTER ICEBERG TABLE case\_insensitive\_table REFRESH 'lower.parquet';
SELECT ID, VALUE FROM case\_insensitive\_table ORDER BY ID;
\-- ID | VALUE
\--  1 | upper
\--  2 | lower

\-- MATCH\_BY\_COLUMN\_NAME = CASE\_SENSITIVE
ALTER ICEBERG TABLE case\_sensitive\_table REFRESH 'upper.parquet';
ALTER ICEBERG TABLE case\_sensitive\_table REFRESH 'lower.parquet';
\-- Parquet Column 'id' has a case-insensitively duplicated name to the existing name mapping.
\-- The matching Snowflake Table Column 'ID' already maps to the Parquet Column 'ID'.

また、1 ファイルに `Name` と `name` の両方がある場合、`CASE_INSENSITIVE` の refresh は `Parquet file schema has two fields 'name' and 'Name' mapped to the same column 'NAME'` と失敗しました。

続いて、`CASE_INSENSITIVE` のテーブルで大文字と小文字のファイルを登録した後、`CASE_SENSITIVE` に変更しました。設定変更前に登録した行と、変更後に追加した小文字のファイルは読み取れました。

\-- upper.parquet（ID, VALUE）と lower.parquet（id, value）は登録済み
ALTER ICEBERG TABLE case\_insensitive\_table SET MATCH\_BY\_COLUMN\_NAME = CASE\_SENSITIVE;

SELECT ID, VALUE FROM case\_insensitive\_table ORDER BY ID;
\-- ID | VALUE
\--  1 | upper
\--  2 | lower

\-- S3 に lower2.parquet（id, value）を追加
ALTER ICEBERG TABLE case\_insensitive\_table REFRESH 'lower2.parquet';

SELECT ID, VALUE FROM case\_insensitive\_table ORDER BY ID;
\-- ID | VALUE
\--  1 | upper
\--  2 | lower
\--  3 | lower2

一方、これまでと異なる大文字・小文字の組み合わせを持つファイルは、`CASE_SENSITIVE` の状態では登録できませんでした。`CASE_INSENSITIVE` に戻すと、同じファイルを登録できました。

\-- CASE\_INSENSITIVE に戻し、lower3.parquet（id, value）を登録
ALTER ICEBERG TABLE case\_insensitive\_table SET MATCH\_BY\_COLUMN\_NAME = CASE\_INSENSITIVE;
ALTER ICEBERG TABLE case\_insensitive\_table REFRESH 'lower3.parquet';

ALTER ICEBERG TABLE case\_insensitive\_table SET MATCH\_BY\_COLUMN\_NAME = CASE\_SENSITIVE;

\-- S3 に mixed.parquet（Id, value）を追加
ALTER ICEBERG TABLE case\_insensitive\_table REFRESH 'mixed.parquet';
\-- Parquet Column 'Id' has a case-insensitively duplicated name to the existing name mapping.
\-- The matching Snowflake Table Column 'ID' already maps to the Parquet Column 'ID'.
\-- File Name: '.../mixed.parquet'.

ALTER ICEBERG TABLE case\_insensitive\_table SET MATCH\_BY\_COLUMN\_NAME = CASE\_INSENSITIVE;
ALTER ICEBERG TABLE case\_insensitive\_table REFRESH 'mixed.parquet';

SELECT ID, VALUE FROM case\_insensitive\_table ORDER BY ID;
\-- ID | VALUE
\--  1 | upper
\--  2 | lower
\--  3 | lower2
\--  4 | lower3
\--  5 | mixed

この例では、設定変更前に登録した小文字の列名は変更後も読み取れましたが、新たな列名の組み合わせは登録エラーになりました。

### 互換性のある型変更は schema evolution で取り込める

Snowflake の公式ドキュメントが `ENABLE_SCHEMA_EVOLUTION = TRUE` で対応する型拡張として挙げるのは、次の 3 種類です。構造体・配列・マップの内部にも再帰的に適用されます。

Iceberg の変更前

変更後

条件

`int`

`long`

`float`

`double`

どちらも Snowflake の `FLOAT` に対応

`decimal(p1, s)`

`decimal(p2, s)`

scale を変えず precision を拡張

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#schema-evolution)

次の検証は整数の組み合わせです。

`INT32` の値 `9` を持つファイルの後に、`INT64` の値 `2147483648` を持つファイルを手動登録しました。

ENABLE\_SCHEMA\_EVOLUTION

INT64 ファイルの REFRESH

結果

`TRUE`

成功

両方の値を参照できた

`FALSE`

失敗

先に登録した `9` のみを参照できた

有効側の登録後の Iceberg 型は `LONG` でした。逆に、`LONG` 列のテーブルに `INT64`、続けて `INT32` を登録しても両方の値を読めました。

残る 2 種類の型拡張も、それぞれ別のテーブルで試しました。

Parquet の型変更

追加後に参照できた値

登録後のテーブル型

FLOAT → DOUBLE

1.25、2.5

DOUBLE

DECIMAL(8,2) → DECIMAL(12,2)

123.45、123456789.12

DECIMAL(12,2)

いずれも `ENABLE_SCHEMA_EVOLUTION = TRUE` で、旧型のファイルの登録後に新型のファイルを追加し、手動 `REFRESH` に成功しました。

一方、decimal の scale 変更は schema evolution を有効にしていても拒否されました。

Conflicting data types identified for column VALUE in Parquet files.
Conflict: {"types":\["NUMBER(12,2)","NUMBER(12,3)"\]}.

ネストした型でも、`ENABLE_SCHEMA_EVOLUTION = TRUE` にして内部の整数を `INT32 → INT64` に変更しました。それぞれ別テーブルで旧ファイルを登録した後、新ファイルを refresh しています。

Parquet の構造

旧ファイルの値

新ファイルの値

登録後の型

struct

`{"n": 1}`

`{"n": 2147483648}`

`OBJECT(n LONG)`

list

`[1, 2]`

`[2147483648]`

`ARRAY(LONG)`

map

`{"a": 1}`

`{"a": 2147483648}`

`MAP(STRING, LONG)`

3 テーブルとも両ファイルの値を参照できました。さらに struct 内の `n` を文字列に変えたファイルは、`OBJECT(n NUMBER(19,0))` と `OBJECT(n VARCHAR(134217728))` の型衝突として拒否されました。

同じネスト構造で `ENABLE_SCHEMA_EVOLUTION = FALSE` も試しました。struct、list、map のいずれも、内部の `INT32 → INT64` を含むファイルの登録が拒否され、登録済みの旧ファイルだけを参照できました。struct のエラーは次のとおりです。

Parquet file schema data type is incompatible with table column.
Kind: 'physical', Parquet Type: 'INT64', Expected Type: 'INT32',
Parquet Path: 'value.n'

タイムゾーンなしの `timestamp` とタイムゾーン付きの `timestamptz` の間では、両方向とも UTC 調整の設定が一致しないというエラーになりました。Snowflake ではそれぞれ `TIMESTAMP_NTZ(6)` と `TIMESTAMP_LTZ(6)` に対応します。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg-data-types)

\-- TIMESTAMP\_NTZ のテーブルに isAdjustedToUTC=true のファイルを登録
ALTER ICEBERG TABLE matrix\_timestamp REFRESH 'timestamptz.parquet';
\-- Parquet file timestamp column has wrong UTC adjustment.
\-- TIMESTAMP\_NTZ columns expect values without UTC adjustment and
\-- TIMESTAMP\_LTZ columns expect values with UTC adjustment.
\-- Actual adjustment: 'true'

整数と文字列の間も、両方向でファイルの登録が拒否されました。

タイムゾーンなしのタイムスタンプでは、Parquet の精度の違いも試しました。`ENABLE_SCHEMA_EVOLUTION = TRUE` で `TIMESTAMP(MILLIS)` のファイルから作成したテーブルに、`TIMESTAMP(MICROS)` を追加します。

ALTER ICEBERG TABLE timestamp\_precision\_example REFRESH 'timestamp-us.parquet';
\-- SQL execution error: Conflicting data types identified for column VALUE in Parquet files.
\-- Conflict: {"types":\["TIMESTAMP\_NTZ(3)","TIMESTAMP\_NTZ(6)"\]}.

逆に `MICROS` のファイルから作成したテーブルに `MILLIS` を追加した場合も型衝突で登録できませんでした。

[Iceberg の仕様](https://iceberg.apache.org/spec/#schema-evolution)には v3 以降の `date → timestamp` なども記載されていますが、Snowflake が Parquet Direct のドキュメントで対応を明記している型拡張は上記の 3 種類です。

[iceberg.apache.org](https://iceberg.apache.org/spec/#schema-evolution)

### 型が衝突しても自動更新自体は続く

`AUTO_REFRESH = TRUE`、`ENABLE_SCHEMA_EVOLUTION = TRUE` のテーブルで、型が衝突するファイルを追加した場合を試しました。整数の `id` を持つファイルを登録した後、文字列の `id` を持つ非互換ファイル、再び整数の `id` を持つ互換ファイルを順に追加しました。手動 `REFRESH` は実行していません。

\-- 整数の id を持つ base.parquet を登録済み
\-- S3 に good-before.parquet、incompatible.parquet、
\-- good-after.parquet を順に追加

SELECT TO\_VARCHAR(CONVERT\_TIMEZONE('UTC', OPERATION\_TIME),
                  'YYYY-MM-DD HH24:MI:SS.FF3') AS OPERATION\_TIME\_UTC,
       SPLIT\_PART(FILE\_NAME, '/', \-1) AS FILE\_NAME,
       OPERATION\_STATUS, MESSAGE
FROM TABLE(my\_db.INFORMATION\_SCHEMA.ICEBERG\_TABLE\_FILE\_REGISTRATION\_HISTORY(
  TABLE\_NAME => 'my\_db.my\_schema.my\_table'))
ORDER BY OPERATION\_TIME;

\-- OPERATION\_TIME\_UTC      | FILE\_NAME            | OPERATION\_STATUS | MESSAGE
\-- 2026-11-11 17:16:36.776 | base.parquet         | REGISTERED\_NEW   | File registered successfully.
\-- 2026-11-11 17:17:27.463 | good-before.parquet  | REGISTERED\_NEW   | File registered successfully.
\-- 2026-11-11 17:18:39.142 | incompatible.parquet | SKIPPED          | Column registration failed.
\-- 2026-11-11 17:19:41.655 | good-after.parquet   | REGISTERED\_NEW   | File registered successfully.

SELECT PARSE\_JSON(SYSTEM$PARQUET\_DIRECT\_AUTO\_REFRESH\_STATUS(
  'my\_db.my\_schema.my\_table')):executionState::STRING AS EXECUTION\_STATE;

\-- EXECUTION\_STATE
\-- RUNNING

型が衝突するファイルは `SKIPPED` になりましたが、後続の互換ファイルは登録されました。`SKIPPED` から後続ファイルの登録まで 1 分以上経過しましたが、履歴に非互換ファイルの再登録はありませんでした。登録済みファイルの一覧にも含まれておらず、ファイル全体がテーブルに登録されていません。

SELECT SPLIT\_PART(FILE\_NAME, '/', \-1) AS FILE\_NAME, ROW\_COUNT
FROM TABLE(my\_db.INFORMATION\_SCHEMA.ICEBERG\_TABLE\_FILES(
  TABLE\_NAME => 'my\_db.my\_schema.my\_table'))
ORDER BY FILE\_NAME;

\-- FILE\_NAME           | ROW\_COUNT
\-- base.parquet        | 2
\-- good-after.parquet  | 2
\-- good-before.parquet | 2

この検証では自動更新全体は停止しませんでした。一方、状態が `RUNNING` のままでもデータの欠落が発生するため、`ICEBERG_TABLE_FILE_REGISTRATION_HISTORY` で `SKIPPED` を含むファイルごとの結果を確認する必要があります。エラーの詳細として今回の履歴に表示されたのは `Column registration failed.` までです。

登録を省略してテーブルを作成した後に自動更新を有効にし、既存ファイルの登録も試しました。型が衝突するファイルは `SKIPPED` になりました。続けて自動更新を無効にし、そのファイルを互換性のある内容に置き換えてから手動で更新すると、登録できました。

\-- 既存ファイルの自動登録で incompatible.parquet が SKIPPED になった後
ALTER ICEBERG TABLE retry\_example SET AUTO\_REFRESH = FALSE;

\-- S3 上の incompatible.parquet を互換性のある Parquet に置き換える
ALTER ICEBERG TABLE retry\_example REFRESH 'incompatible.parquet';

SELECT ID, MESSAGE FROM retry\_example ORDER BY ID;
\-- ID | MESSAGE
\--  1 | base-1
\--  2 | base-2
\--  7 | replacement-7
\--  8 | replacement-8

このテーブルの登録履歴では、置き換え前の `SKIPPED` と手動更新後の `REGISTERED_NEW` を確認しました。

### テーブルと型が衝突するファイルを含む手動 refresh は失敗する

整数の `ID` を持つ `base.parquet` を登録した後、同じ型の `a-good.parquet` と、`ID` が文字列の `z-bad.parquet` を追加して一括 refresh しました。

ALTER ICEBERG TABLE type\_conflict\_example REFRESH;
\-- Parquet file schema data type is incompatible with table column.
\-- Parquet Type: 'STRING', Expected Type: 'INT', Parquet Path: 'id'

SELECT SPLIT\_PART(FILE\_NAME, '/', \-1) AS FILE\_NAME
FROM TABLE(my\_db.INFORMATION\_SCHEMA.ICEBERG\_TABLE\_FILES(
  TABLE\_NAME => 'my\_db.my\_schema.type\_conflict\_example'))
ORDER BY FILE\_NAME;
\-- FILE\_NAME
\-- base.parquet

\-- 型が衝突するファイルを個別に指定しても失敗
ALTER ICEBERG TABLE type\_conflict\_example REFRESH 'z-bad.parquet';
\-- Parquet file schema data type is incompatible with table column.
\-- Parquet Type: 'STRING', Expected Type: 'INT', Parquet Path: 'id'

ALTER ICEBERG TABLE type\_conflict\_example REFRESH 'a-good.parquet';
SELECT ID, VALUE FROM type\_conflict\_example ORDER BY ID;
\-- ID | VALUE
\--  1 | base
\--  2 | good

自動更新では型が衝突するファイルが `SKIPPED` になりましたが、手動 `REFRESH` では、そのファイルを含む一括更新も、ファイルを個別に指定した更新もエラーになりました。一括更新の失敗後、互換ファイルも登録されていませんでした。互換ファイルは個別に指定すると登録できました。

### テーブル作成後に変更できる設定とできない設定がある

`TABLE_FORMAT = NONE` の Catalog Integration を使ったテーブルで、設定や列定義の変更を試しました。成功した変更の後には手動 refresh と SELECT も実行しています。

操作

結果

`PATTERN` の設定・解除

失敗

仮想列の追加・削除

失敗

`PARTITION BY` の追加・削除・置換

失敗

既存カラムへの `NOT NULL` の設定・解除

失敗

主キー・一意制約・外部キーの追加・削除

成功

列のマスキングポリシー、テーブルの行アクセスポリシーの設定・解除

成功

テーブル・列のタグとコメントの設定・解除

成功

`MATCH_BY_COLUMN_NAME`、`REPLACE_INVALID_CHARACTERS`、`LOG_EVENT_LEVEL` の変更

成功

たとえば、`PATTERN` の変更と `PARTITION BY` の追加は次のエラーになりました。

ALTER ICEBERG TABLE alter\_example SET PATTERN = '.\*base.\*';
\-- Unsupported feature 'PATTERN'.

ALTER ICEBERG TABLE alter\_example ADD PARTITION BY (ID);
\-- Unsupported feature 'ADD PARTITION BY on externally-managed iceberg tables'.

`ENABLE_SCHEMA_EVOLUTION` は、テーブル作成後に `FALSE` から `TRUE` には変更できません。一方、`TRUE` から `FALSE` への変更は成功しました。

\-- ENABLE\_SCHEMA\_EVOLUTION = FALSE で作成したテーブル
ALTER ICEBERG TABLE v2 SET ENABLE\_SCHEMA\_EVOLUTION = TRUE;
\-- SQL Compilation error: Enabling schema evolution after table creation is not supported.
\-- Table 'V2' must be recreated with ENABLE\_SCHEMA\_EVOLUTION=true.

\-- ENABLE\_SCHEMA\_EVOLUTION = TRUE で作成したテーブル
ALTER ICEBERG TABLE v1\_none SET ENABLE\_SCHEMA\_EVOLUTION = FALSE;
\-- Statement executed successfully.

テーブル名とファイルパスは短縮しています。これらは今回試した SQL とテーブルにおける結果です。

### テーブル作成後にカラムを追加・削除・型変更できない

`DROP COLUMN` して新しい型を登録する方法も試しましたが、schema evolution の有効・無効のどちらでも拒否されました。`ALTER COLUMN` による型変更も拒否されています。原因ファイルを修正するか、旧型と新型を別テーブルで扱う必要があります。手動更新のエラーは `QUERY_HISTORY` でも確認できます。

別テーブルで扱う場合の例として、整数型の `ID` を持つテーブルと文字列型の `ID` を持つテーブルを用意し、ビューで文字列に揃えて結合しました。テーブル名は短縮しています。

\-- 初めは整数型の旧テーブルのみを参照
CREATE VIEW versioned\_view AS
SELECT ID::STRING AS ID FROM integer\_table;

SELECT ID FROM versioned\_view ORDER BY ID;
\-- ID: 1, 2, 7, 8

\-- 文字列型の新テーブルも参照するように変更
CREATE OR REPLACE VIEW versioned\_view AS
SELECT ID::STRING AS ID FROM integer\_table
UNION ALL
SELECT ID FROM string\_table;

SELECT ID FROM versioned\_view ORDER BY ID;
\-- ID: 1, 2, 7, 8, not-an-integer

旧テーブルの整数と新テーブルの文字列を、ビューから同じ文字列型として参照できました。型を揃える変換はデータに合わせて選ぶ必要があります。

[公式ドキュメント](https://docs.snowflake.com/en/user-guide/tables-iceberg-parquet-direct#monitor-refresh)は、auto-refresh のファイル登録失敗を event table の `parquet_direct_file_ingestion_failure` で監視する方法も示しています。この機能の利用には Snowflake Support へのアクセス申請が必要です。状態が `RUNNING` でも、登録対象のファイルが揃っていることの証明にはならないため、期待するファイルとの照合も必要です。

### 不正な UTF-8 は読み取り時に置換できる

文字列列に不正な UTF-8 のバイト `0xFF` を含む Parquet ファイルを用意し、手動で登録します。

CREATE ICEBERG TABLE invalid\_utf8 (id INT, message STRING)
  EXTERNAL\_VOLUME = 'example\_volume'
  CATALOG = 'my\_parquet\_catalog\_integration'
  BASE\_LOCATION = 'options/'
  REFRESH\_ON\_CREATE = FALSE
  REPLACE\_INVALID\_CHARACTERS = FALSE;

ALTER ICEBERG TABLE invalid\_utf8 REFRESH 'invalid-utf8.parquet';
\-- Statement executed successfully.

SELECT id, message FROM invalid\_utf8 ORDER BY id;
\-- Invalid UTF8 detected in string 'invalid:0xFF:end'

\-- 問題の文字列列を参照しない場合
SELECT id FROM invalid\_utf8 ORDER BY id;
\-- ID
\--  1
\--  2

ALTER ICEBERG TABLE invalid\_utf8 SET REPLACE\_INVALID\_CHARACTERS = TRUE;

SELECT id, message FROM invalid\_utf8 ORDER BY id;
\-- ID | MESSAGE
\--  1 | valid
\--  2 | invalid:�:end

ファイルの登録は成功しましたが、不正な文字列列の読み取りは `FALSE` ではエラーになり、`TRUE` では置換文字を含む結果が返りました。設定は作成後にも変更できます。元の Parquet ファイルをダウンロードして確認したところ、内容は変わっていませんでした。

### JSON 文字列は VARIANT として直接読み込めない

JSON 文字列を含む検証用 Parquet を使い、そのカラムを Snowflake の `VARIANT` として定義すると、型不一致でテーブル作成が拒否されました。`STRING` として読み込み、`PARSE_JSON` で変換すると値を参照できました。

Parquet の Variant Logical Type も試しました。文字列 `hello` を持つ Variant は、カラムを `VARIANT` と明示したテーブルから読み取れました。

一方、`name` と `score` を持つオブジェクトの Variant を含むファイルでは、Iceberg v2 と v3 の両方で内部エラーになりました。初回登録を省略してテーブルを作り、同じファイルを手動 refresh した結果です。

CREATE ICEBERG TABLE variant\_v3 (id INT, payload VARIANT)
  EXTERNAL\_VOLUME = 'example\_volume'
  CATALOG = 'my\_parquet\_catalog\_integration'
  BASE\_LOCATION = 'variant-object/'
  ICEBERG\_VERSION = 3
  REFRESH\_ON\_CREATE = FALSE;

ALTER ICEBERG TABLE variant\_v3 REFRESH;
\-- SQL execution internal error:
\-- Processing aborted due to error 300010:1506013847; incident 1350304.

\-- ICEBERG\_VERSION = 2 で作成したテーブルでも同じファイルを refresh
ALTER ICEBERG TABLE variant\_v2 REFRESH;
\-- SQL execution internal error:
\-- Processing aborted due to error 300010:1506013847; incident 1358568.

作成時にファイルを登録する場合も、v2 と v3 の両方で同じ種類の内部エラーになりました。これは試したファイルでの結果です。

値の種類を変えた Parquet Variant のファイルを用意し、Iceberg v3 の別テーブルにそれぞれ手動登録しました。数値 `42`、真偽値 `true`、SQL の `NULL` は読み取れました。一方、配列とネストしたオブジェクトも内部エラーになりました。

ALTER ICEBERG TABLE variant\_array\_example REFRESH 'array.parquet';
\-- SQL execution internal error:
\-- Processing aborted due to error 300010:1506013847; incident 5961599.

ALTER ICEBERG TABLE variant\_nested\_example REFRESH 'nested.parquet';
\-- SQL execution internal error:
\-- Processing aborted due to error 300010:1506013847; incident 2345111.

# 大量のファイルを扱うときに考えたいこと

Parquet Direct はテーブルメンテナンスと `CLUSTER BY` に対応していないため、ファイルサイズや配置は書き込み側で考える必要があります。

小さなファイルが増えると、ファイルごとの処理が増え、読み取りが遅くなることが考えられます。また、ファイルサイズやパーティションごとのデータ量に偏りがある Data Skew も、処理の偏りやクエリ性能に影響する可能性があります。影響はワークロードによって異なるため、Parquet Direct を利用する前に、ファイル数やこうした偏りを確認し、実際のクエリで性能を検証することをおすすめします。ファイルサイズやデータの偏りを Snowflake 側でメンテナンスしたい場合は、ファイルをコピーして取り込む `ADD_FILES_COPY` も選択肢です。

パーティションがクエリの条件に合わなければ、必要以上のデータを読む可能性があります。

ファイル数は登録時にも影響します。Snowflake によると、大量の既存ファイルを含むテーブルは作成時の登録に時間がかかるため、初回登録を省略して自動更新で非同期に登録する方法があります。この方法では、登録が進むにつれて参照できる行が増えるため、全ファイルの登録完了を確認する必要があります。[Snowflake のドキュメント](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-parquet)は、`PATTERN` で多数のファイルを除外すると性能に影響するため、避けるよう推奨しています。

# おわりに

今回は、Snowflake の Parquet Direct について、公式ドキュメントを読み、実際に Parquet ファイルを使って挙動を確認しました。

既存のファイルをコピーせずに参照でき、Hive 形式のパスから導出したパーティション列によって、スキャン対象を絞り込めました。また、ファイルの追加・削除や、対応するスキーマ変更を自動で反映できることも確認しました。

一方、型が衝突するファイルは自動更新でスキップされても、更新自体は動き続けます。そのため、更新の状態だけでなく、ファイルの登録履歴を確認する運用が必要です。また、テーブルメンテナンスは動作しないため、ファイルの配置やサイズを出力側で管理できるか、必要な性能が得られるかを踏まえて、`ADD_FILES_COPY` と使い分けたいと思います。

# We are hiring!

LayerXでは、データ基盤技術が大好きで、データ基盤の力で事業をドライブできると本気で思っているデータエンジニアを大募集しています！興味のある方は是非カジュアル面談でお話しましょう！

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/opendoor/000e07c574f74e868b44ec9a795545ce/)