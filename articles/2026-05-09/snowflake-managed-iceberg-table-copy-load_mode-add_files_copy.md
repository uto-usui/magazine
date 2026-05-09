---
title: "Snowflake-managed Iceberg table の COPY LOAD_MODE = ADD_FILES_COPY の仕様をドキュメントと実測から理解する"
source: "https://tech.layerx.co.jp/entry/snowflake-iceberg-copy-add-files-copy"
publishedDate: "2026-05-07"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "civitaspo"
---

こんにちは。バクラク事業部 BizOps部 データグループの[@civitaspo](https://twitter.com/Civitaspo)です。

先日、光栄にも Snowflake Data Superhero に選出いただきました。これからも Snowflake のマニアックな話を届けていきますので応援よろしくお願いします！

[www.snowflake.com](https://www.snowflake.com/ja/news/press-releases/snowflake-2026-data-superheroes/)

## はじめに

さて、今回の記事は Snowflake-managed Iceberg table のデータ取り込み方式に関する内容です。Snowflake-managed Iceberg table とは、`CATALOG = 'SNOWFLAKE'` を指定して作成する、Snowflake を catalog とする Iceberg table を指します。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg#use-snowflake-as-the-catalog)

Snowflake-managed Iceberg table には既存の Parquet ファイルを取り込む方法として、`COPY INTO ... LOAD_MODE = ADD_FILES_COPY` があります。このロード方式は、Snowflake が Parquet ファイルを読み込んで再書き込みする `COPY INTO ... LOAD_MODE = FULL_INGEST` とは異なり、Iceberg-compatible な Parquet ファイルを Snowflake-managed Iceberg table の base location に server-side copy し、Snowflake-managed Iceberg table へ登録します。

[docs.snowflake.com](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-examples-iceberg-compatible-parquet)

`ADD_FILES_COPY` は Parquet ファイルの scan / rewrite を避けられるため、データ取り込みにかかるコストを大きく下げられる可能性があります。一方で、`ADD_FILES_COPY` は制約が厳しいロード方式であるため、通常の `COPY` と同じ感覚で使えるものではありません。file format、case-sensitiveなカラム名マッチング、partitioning、clustering、ネスト型のデータ、Schema Evolution などについて、公式ドキュメントや実測結果から、制約を理解して使用する必要があります。

本記事では、2026月5月1日時点の Snowflake 公式ドキュメントと、 筆者の検証環境における実測結果をもとに、Snowflake-managed Iceberg table に対する `COPY INTO ... LOAD_MODE = ADD_FILES_COPY` の仕様を整理します。

-   [はじめに](#はじめに)
-   [おことわり](#おことわり)
-   [tl;dr](#tldr)
-   [ADD\_FILES\_COPY は何をするのか](#ADD_FILES_COPY-は何をするのか)
-   [ドキュメントから読み取れる仕様](#ドキュメントから読み取れる仕様)
-   [実測で確認した ADD\_FILES\_COPY の挙動](#実測で確認した-ADD_FILES_COPY-の挙動)
    -   [PARTITION BY を指定したテーブルでは ADD\_FILES\_COPY を使用できない](#PARTITION-BY-を指定したテーブルでは-ADD_FILES_COPY-を使用できない)
    -   [CLUSTER BY を指定してもファイル配置は変わらない](#CLUSTER-BY-を指定してもファイル配置は変わらない)
    -   [ネスト型は VARIANT 型のカラムへ格納できない](#ネスト型は-VARIANT-型のカラムへ格納できない)
    -   [Schema Evolution は COPY 前に行う](#Schema-Evolution-は-COPY-前に行う)
    -   [同じファイルを再 COPY した場合 skip される](#同じファイルを再-COPY-した場合-skip-される)
-   [実装前に確認すること](#実装前に確認すること)
-   [おわりに](#おわりに)
-   [We are hiring 🔥](#We-are-hiring-)

## おことわり

本記事は、Snowflake-managed Iceberg table へ Parquet ファイルを取り込む方式を設計・検証している方向けに書いています。Snowflake、Apache Iceberg、Parquet、COPY構文に関する基本的な用語は前提知識として扱います。

また、本記事で扱う内容は、主に Snowflake-managed Iceberg table の `COPY INTO ... LOAD_MODE = ADD_FILES_COPY` に関する以下の5点です。

-   `ADD_FILES_COPY` の公式ドキュメント上の必須条件と非対応条件
-   `PARTITION BY` / `CLUSTER BY` を指定した Snowflake-managed Iceberg table に対する `ADD_FILES_COPY` の挙動
-   `CLUSTER BY` とロード対象ファイルの配置が scan bytes に与える影響
-   ネスト型のデータを構造化データ型 `OBJECT` / `ARRAY` / `MAP` として扱う場合のスキーマ互換性
-   `ADD_FILES_COPY` を使う設計で必要になる COPY 前のスキーマ互換性チェック / Schema Evolution の順序

一方、この記事では COPY 実行時に消費する Snowflake credits の定量比較や、Google BigQuery の export、AWS Glue jobs などで生成した Parquet ファイルが Snowflake-managed Iceberg table の型要件を満たすかどうかの網羅的な検証は扱いません。

なお、実測結果は2026年5月1日に筆者の検証環境で観測したものです。Snowflake のドキュメントに明記されていない挙動は、今後変わる可能性があります。

## tl;dr

Snowflake-managed Iceberg table は、Parquet ファイルを取り込む方式として `COPY INTO ... LOAD_MODE = ADD_FILES_COPY` をサポートしています。`ADD_FILES_COPY` は、Iceberg-compatible な Parquet ファイルを Snowflake-managed Iceberg table の base location に server-side copy し、data file として登録するロード方式です。Snowflake 側で Parquet ファイルを scan / rewrite しないため、取り込みコストを抑えられる可能性があります。

一方で、`ADD_FILES_COPY` はロード時の変換、フィルタリング、データ型変換、再クラスタリングを行いません。Parquet ファイルとコピー先のテーブル定義は、COPY 実行前に互換である必要があります。

重要な点は次のとおりです。

-   ロード対象の Parquet ファイルは、`COPY INTO <table> FROM @stage/path` の形式で名前付き stage 経由で参照する必要がある。internal stage と external stage が利用できる。
-   external stage を使う場合、その cloud provider は Snowflake アカウントの cloud provider に揃える必要はない。AWS 上の Snowflake アカウントからでも、Google Cloud Storage や Azure Blob Storage を backend に持つ external stage からロードできる。ただし、cloud provider をまたぐデータ転送の latency とコストは別途評価する必要がある。
-   コピー先は Snowflake-managed Iceberg table だが、`PARTITION BY` を指定したテーブルでは `ADD_FILES_COPY` を使用できない。
-   Parquet ファイルの top-level column name とコピー先のカラム名は、大文字・小文字を区別して一致させる必要がある。コピー先のカラム型は、Parquet ファイルの型と互換である必要がある。
-   `CLUSTER BY` を指定したテーブルへの COPY は成功する。ただし、ロード時に Parquet ファイルが clustering key に沿って書き換えられたり、配置し直されたりするわけではない。scan bytes は、ロード対象ファイルの配置と統計情報に依存する。
-   ネスト型のデータは、Parquet のネスト型と互換性のある構造化データ型 `OBJECT` / `ARRAY` / `MAP` として扱う。通常の Parquet `struct` / `list` / `map` を Iceberg v3 `VARIANT` に変換することはできない。
-   Snowflake-managed Iceberg table の Schema Evolution は、`ADD_FILES_COPY` によって自動実行されるものではない。ロード対象の Parquet ファイルに合わせてテーブル定義を進化させる必要がある場合は、COPY 前に `ALTER ICEBERG TABLE` を実行する。コピー先のテーブル定義にない field を含む Parquet ファイルを先にロードすると、その field はロード済みの data file から復元できない。
-   同じ staged file の再 COPY は、`FORCE = TRUE` を指定しない限り skip される。再ロードする場合は、`FORCE = TRUE`、ファイル内容の変更、または `TRUNCATE TABLE` を使う。
-   warehouse のサイズを上げても COPY 時間が大きく短縮するとは限らない。Snowflake のドキュメントでは、`ADD_FILES_COPY` の処理の大部分は warehouse ではなく、Snowflake が管理する Cloud Services 側の計算リソースに依存すると説明されている。

`ADD_FILES_COPY` は Snowflake-managed Iceberg table に Parquet ファイルをロードする方式の1つです。ここでいう Parquet ファイルは、Apache Iceberg がサポートするデータ型のみで構成された Parquet ファイルのことです。

[docs.snowflake.com](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#loading-iceberg-compatible-parquet-data-into-an-iceberg-table)

Snowflake が解釈できる Iceberg のデータ型は、Snowflake のドキュメントに一覧されています。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg-data-types)

`ADD_FILES_COPY` は、ロード対象の Parquet ファイルを Snowflake-managed Iceberg table の base location に server-side copy したうえで、Snowflake-managed Iceberg table に登録します。ロード対象の Parquet ファイルをそのまま参照登録する方式ではないため、metadata-only load や zero-copy load ではありません。一方で、 `FULL_INGEST` のように Snowflake が Parquet ファイルをスキャンして完全に新しい data file として再構成する方式でもありません。`ADD_FILES_COPY` は Parquet ファイルをコピーして data file として登録するのみで、scan / rewriteは行いません。

`ADD_FILES_COPY`を実現する、最小構成のクエリは次のとおりです。

COPY INTO <iceberg\_table>
FROM @<stage>/<path\>/
FILE\_FORMAT = (TYPE = PARQUET USE\_VECTORIZED\_SCANNER = TRUE)
LOAD\_MODE = ADD\_FILES\_COPY
MATCH\_BY\_COLUMN\_NAME = CASE\_SENSITIVE;

Snowflake-managed Iceberg table 側では、Parquet ファイルのフッターに記録された top-level のカラム名と大文字・小文字を区別して一致させる必要があります。小文字を含むカラムが定義されたParquetファイルをロードする場合、コピー先のテーブル側で quoted identifier を使ってカラム定義します。

CREATE ICEBERG TABLE <iceberg\_table> (
  "id" BIGINT,
  "dt" DATE,
  "value" VARCHAR
)
  CATALOG = 'SNOWFLAKE'
  EXTERNAL\_VOLUME = '<external\_volume>'
  BASE\_LOCATION = '<base\_location>'
  ICEBERG\_VERSION = 3;

## ドキュメントから読み取れる仕様

Snowflake のドキュメントから、`ADD_FILES_COPY` について少なくとも次の仕様を読み取れます。

観点

内容

参照箇所

コピー先のテーブル

Snowflake-managed Iceberg table である必要があります。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet)  

> The target table must be a Snowflake-managed Iceberg table with column data types that are compatible with the source Parquet file data types.

ロード対象の Parquet ファイル

Apache Iceberg がサポートするデータ型のみで構成された Parquet ファイルである必要があります。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet)  

> A raw Iceberg-compatible Parquet file isn’t registered with an Iceberg catalog, but contains Iceberg compatible data types.

ロード対象のファイルの参照方法

名前付き stage 経由で参照します。internal stage / external stage のいずれも利用できます。stage object を作成せず、Cloud Storage の URL と `STORAGE INTEGRATION` を `COPY` 文に直接指定する形式は非対応です。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet)  

> The following options aren’t supported when you use LOAD\_MODE = ADD\_FILES\_COPY: Copying unstaged data by specifying a cloud storage location and a storage integration.

external stage の cloud provider

external stage を使う場合、Amazon S3、Google Cloud Storage、Microsoft Azure を参照できます。Snowflake アカウントの Cloud Provider には限定されません。

[https://docs.snowflake.com/en/sql-reference/sql/create-stage](https://docs.snowflake.com/en/sql-reference/sql/create-stage)  

> References data files stored in a location outside of Snowflake. Currently, the following cloud storage services are supported: Amazon S3 buckets, Google Cloud Storage buckets, Microsoft Azure containers.

file format

`TYPE = PARQUET` かつ `USE_VECTORIZED_SCANNER = TRUE` を指定します。これ以外の `FILE_FORMAT` オプションは非対応です。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet)  

> The source file format type must be Iceberg-compatible Parquet, and you must use a vectorized scanner: FILE\_FORMAT = ( TYPE = PARQUET USE\_VECTORIZED\_SCANNER = TRUE).

カラム名のマッチング

`MATCH_BY_COLUMN_NAME = CASE_SENSITIVE` を指定し、Parquet ファイルのフッターとコピー先のテーブルでカラム名を大文字・小文字を区別して一致させる必要があります。`MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE` / `NONE` は非対応です。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet)  

> You must use case-sensitive column names with the LOAD\_MODE = ADD\_FILES\_COPY option. ... Set the MATCH\_BY\_COLUMN\_NAME option to CASE\_SENSITIVE." / "The following options aren’t supported when you use LOAD\_MODE = ADD\_FILES\_COPY: ... MATCH\_BY\_COLUMN\_NAME = CASE\_INSENSITIVE | NONE.

スキーマの互換性

コピー先のテーブルのカラムのデータ型は、ロード対象の Parquet ファイルのデータ型と互換性がある必要があります（Snowflake-managed Iceberg table のデータ型マッピングルールに従います）。`ADD_FILES_COPY` は Parquet ファイルを変換してロードする方式ではありません。また、Snowflake docs は `COPY` が Parquet ファイルのデータ型変換を検証しないと説明しています。そのため、型の互換性はロード前に確認します。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#usage-notes](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#usage-notes)  

> The target table must be a Snowflake-managed Iceberg table with column data types that are compatible with the source Parquet file data types." / "The COPY command does not validate data type conversions for Parquet files.

エラーハンドリング

`ON_ERROR = CONTINUE` / `SKIP_FILE_N` / `SKIP_FILE_X%` は非対応です。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet)  

> The following options aren’t supported when you use LOAD\_MODE = ADD\_FILES\_COPY: ... ON\_ERROR = CONTINUE | SKIP\_FILE\_N | SKIP\_FILE\_X%.

変換 / フィルタリング

`COPY INTO ... FROM (SELECT ... FROM @stage)` のような、ロード前のデータ変換やフィルタリングは非対応です。必要な場合は `FULL_INGEST` を使います。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet)  

> Transforming or filtering the data before loading. To transform the data, use the FULL\_INGEST option instead.

検証モード

Snowflake-managed Iceberg table では `VALIDATION_MODE` は非対応です。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#usage-notes](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#usage-notes)  

> VALIDATION\_MODE isn’t supported for Iceberg tables.

`PARTITION BY` 付きコピー先のテーブル

`PARTITION BY` を指定して作成した Snowflake-managed Iceberg table では `LOAD_MODE = ADD_FILES_COPY` は非対応です。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#usage-notes](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#usage-notes)  

> For partitioned Iceberg tables: ... LOAD\_MODE = ADD\_FILES\_COPY is not supported.

warehouse のサイズ

`ADD_FILES_COPY` では warehouse のサイズを上げても COPY 時間が大きく短縮するとは限りません。Snowflake docs は、処理の大部分が warehouse ではなく Snowflake が管理する Cloud Services 側の計算リソースに依存すると説明しています。

[https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#label-copy-into-table-usage-notes-iceberg-parquet)  

> For ADD\_FILES\_COPY, using a larger warehouse does not significantly decrease the duration of the COPY query. The majority of the COPY operation relies on Cloud Services compute resources.

この表のとおり、`ADD_FILES_COPY` はロード時の変換、フィルタリング、柔軟なエラーハンドリング、`VALIDATION_MODE` を使えるロード方式ではありません。カラム名とスキーマの互換性は、ロード前に揃える必要があります。

なお、Snowflake のドキュメントは、すでに別の Iceberg table に属している Parquet ファイルを `ADD_FILES_COPY` で登録することを推奨していません。既存の Iceberg table を Snowflake-managed Iceberg table に移行する場合は、`ADD_FILES_COPY` ではなく `ALTER ICEBERG TABLE ... CONVERT TO MANAGED` のような手段を使いましょう。

## 実測で確認した `ADD_FILES_COPY` の挙動

ここまでは、Snowflake の公式ドキュメントから読み取れる `ADD_FILES_COPY` の仕様を整理しました。ここからは、それらの仕様が筆者の検証環境でどのように振る舞うかを確認します。

以下の表では、筆者が実行した操作、公式ドキュメントから読み取れる仕様、実測結果を分けて記載しています。

検証した内容

公式ドキュメントから読み取れる仕様

実測結果

`PARTITION BY` を指定していない Snowflake-managed Iceberg table に、ネスト型のデータを含まないプリミティブ型だけの Parquet ファイルを `ADD_FILES_COPY` でロードする。

コピー先のテーブルが Snowflake-managed Iceberg table であり、ロード対象の Parquet ファイルと互換性のあるカラム定義を持つ場合、`ADD_FILES_COPY` のコピー先として利用できる。

COPY は成功し、公式ドキュメントから読み取れる仕様と一致した。

`PARTITION BY ("dt")` を指定して作成した Snowflake-managed Iceberg table に、同じ Parquet ファイルを `ADD_FILES_COPY` でロードする。

`PARTITION BY` を指定した Snowflake-managed Iceberg table では、`LOAD_MODE = ADD_FILES_COPY` は非対応。

COPY は失敗し、公式ドキュメントから読み取れる仕様と一致した。

同じコピー先のテーブルに対する `FULL_INGEST` は成功したため、非対応なのは `PARTITION BY` 付きテーブルそのものではなく、`PARTITION BY` 付きテーブルに対する `ADD_FILES_COPY` である。

`CLUSTER BY ("dt")` を指定して作成した Snowflake-managed Iceberg table に、Parquet ファイルを `ADD_FILES_COPY` でロードする。

`CLUSTER BY` は `ADD_FILES_COPY` の非対応条件としては列挙されていない。ただし、`CLUSTER BY` 付きテーブルへの `COPY` には注意事項がある。

COPY は成功した。`GET_DDL` でも `CLUSTER BY ("dt")` は保持された。

一方で、ロード対象の Parquet ファイルはそのまま `base location` 配下に copy され、cluster key に沿ったファイルの書き換えやディレクトリ配置の変更は発生しなかった。

各ファイルに複数日分の `dt` が混在している Parquet ファイル群を、`CLUSTER BY` なしのテーブルと `CLUSTER BY ("dt")` 付きのテーブルにそれぞれロードし、`WHERE "dt" = DATE '2026-01-05'` で scan bytes を比較する。

`ADD_FILES_COPY` がロード時に cluster key に沿ってファイルを書き換えるとは説明されていない。

`CLUSTER BY` なしのテーブルと `CLUSTER BY ("dt")` 付きのテーブルで scan bytes は同一だった。`CLUSTER BY` を指定しても、ロード時にファイルは再配置されない。

日付ごとに分割した Parquet ファイル群を、`CLUSTER BY` なしのテーブルと `CLUSTER BY ("dt")` 付きのテーブルにそれぞれロードし、`WHERE "dt" = DATE '2026-01-05'` で scan bytes を比較する。

query pruning の効きは、ロード対象の Parquet ファイルの統計情報やファイル配置に依存し得る。

`CLUSTER BY` なしのテーブルと `CLUSTER BY ("dt")` 付きのテーブルの両方で scan bytes は小さくなった。改善は `CLUSTER BY` ではなく、日付ごとに Parquet ファイルが分割されていることによるものだった。

Iceberg `struct` に対応する Parquet カラムを、Snowflake-managed Iceberg table 側で structured `OBJECT` として定義してロードする。

Iceberg `struct` は Snowflake の structured `OBJECT` に対応する。

ネスト型の field の名前、型、順序が互換であれば COPY は成功した。

Iceberg `list<struct>` に対応する Parquet カラムを、Snowflake-managed Iceberg table 側で structured `ARRAY(OBJECT(...))` として定義してロードする。

Iceberg `list` は Snowflake の structured `ARRAY` に対応する。

COPY は成功した。

Iceberg `map` に対応する Parquet カラムを、Snowflake-managed Iceberg table 側で `MAP` として定義してロードする。

Iceberg `map` は Snowflake の `MAP` に対応する。

COPY は成功した。

Iceberg `struct` に対応する Parquet カラムを、Snowflake-managed Iceberg table 側で Iceberg v3 `VARIANT` として定義してロードする。

Iceberg v3 `VARIANT` は Preview。Iceberg / Parquet のネスト型と Iceberg v3 `VARIANT` は別の型として扱う必要がある。`ADD_FILES_COPY` では Parquet のネスト型のデータを `VARIANT` に変換しない。

COPY は失敗した。Parquet の `struct` / `list` / `map` を `VARIANT` として格納することはできない。

`struct(b number, a string)` の順序で書かれた Parquet カラムを、`OBJECT(a varchar, b number)` として定義したコピー先のテーブルにロードする。

コピー先のテーブルのカラムのデータ型は、ロード対象の Parquet ファイルのデータ型と互換性がある必要がある。

COPY は失敗した。ネスト型の field は top-level column とは異なり、自由に並べ替えられるわけではなく、ソースとコピー先で順序を揃える必要がある。

`struct(a string, b number)` の Parquet カラムを、`OBJECT(a varchar, b varchar)` として定義したコピー先のテーブルにロードする。

コピー先のテーブルのカラムのデータ型は、ロード対象の Parquet ファイルのデータ型と互換性がある必要がある。

COPY は失敗した。ネスト型の field の型が互換でない場合、`ADD_FILES_COPY` は型変換してロードしない。

`struct(a string, b number, c string)` の Parquet カラムをロードする前に、コピー先の構造化データ型 `OBJECT` に `c` を追加してから `ADD_FILES_COPY` を実行する。

構造化データ型は `ALTER ICEBERG TABLE ... ALTER COLUMN ... SET DATA TYPE` で拡張できる。

COPY は成功し、追加した `c` の値を読めた。Schema Evolution は COPY 前に行えば有効に働く。

`struct(a string, b number, c string)` の Parquet カラムを、`OBJECT(a varchar, b number)` のまま先にロードし、その後に `OBJECT(a varchar, b number, c varchar)` へ拡張する。

構造化データ型は後から拡張できるが、`ADD_FILES_COPY` はロード時点のコピー先のテーブル定義に基づいてファイルを登録する。

COPY 自体は成功したが、後から `c` を追加してもロード済みの行では `c` は復元されなかった。コピー先のテーブル定義にない field を含む Parquet ファイルを先にロードしてから後でテーブル定義を拡張しても、欠落した field は補完されない。

同じ Snowflake-managed Iceberg table に、同じ staged file をもう一度 `ADD_FILES_COPY` でロードする。

`FORCE = TRUE` を指定しない限り、すでにロード済みで内容が変わっていない staged file は無視される。

2回目の COPY では staged file は再処理されず、0 files processed になった。

以降では、この表の中でも設計上の影響が大きい挙動を順に見ていきます。

## `PARTITION BY` を指定したテーブルでは `ADD_FILES_COPY` を使用できない

Snowflake-managed Iceberg table 自体は `PARTITION BY` を指定して作成できます。

[docs.snowflake.com](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table-snowflake#partition-expression-parameters-partitionexpression)

一方、Snowflake の `COPY INTO` docs では、partitioned Iceberg table に対する `LOAD_MODE = ADD_FILES_COPY` は非対応とされています。

検証では、`PARTITION BY ("dt")` を指定して作成した Snowflake-managed Iceberg table に、プリミティブ型だけで構成された Parquet ファイルを `ADD_FILES_COPY` でロードしました。結果は失敗です。返ってきたエラーメッセージは次のとおりです。

> The LOAD\_MODE = ADD\_FILES\_COPY option is not supported for copy into partitioned iceberg target tables.

同じコピー先のテーブルに対して `LOAD_MODE = FULL_INGEST` を指定した場合、COPY は成功しました。したがって、非対応なのは partitioned Iceberg table 一般ではなく、`PARTITION BY` を指定したコピー先のテーブルに対する `ADD_FILES_COPY` です。

この挙動から、`ADD_FILES_COPY` を使う設計では、コピー先の Snowflake-managed Iceberg table に `PARTITION BY` を指定できません。日付単位などで再処理を行いたい場合は、Iceberg table の `PARTITION BY` ではなく、通常のカラムを再処理単位として扱う設計にする必要があります。

## `CLUSTER BY` を指定してもファイル配置は変わらない

次に、`CLUSTER BY` を指定したコピー先のテーブルに対して `ADD_FILES_COPY` を実行した場合の挙動を確認します。

`CLUSTER BY` は `ADD_FILES_COPY` で使用することができます。実際に、`CLUSTER BY ("dt")` を指定して作成した Snowflake-managed Iceberg table に Parquet ファイルをロードすると COPY は成功します。`GET_DDL` でも `CLUSTER BY ("dt")` は保持されます。

CREATE ICEBERG TABLE <iceberg\_table> (
  "id" BIGINT,
  "dt" DATE,
  "payload" VARCHAR
)
  CLUSTER BY ("dt")
  CATALOG = 'SNOWFLAKE'
  EXTERNAL\_VOLUME = '<external\_volume>'
  BASE\_LOCATION = '<base\_location>'
  ICEBERG\_VERSION = 3;

ただし、これはロード時に Parquet ファイルが cluster key に沿って配置が変更される、という意味ではありません。実測では、コピー先の `base location` 配下の data file は、ロード対象のファイルパスを反映した次のような配置になりました。

<base\_location>.<random\_id>/data/<source\_bucket>/<source\_prefix>/<source\_file>.parquet

`CLUSTER BY ("dt")` を指定しても、`dt=...` のようなHive-style partitioningのディレクトリ配置は作られません。ロード対象が 5 ファイルならコピー先にも 5 data files が copy されます。ロード対象が日付ごとの 10 directories / 10 files なら、コピー先にもそのファイルパスを反映した 10 data files が copy されます。

次に、`CLUSTER BY` が query pruning に効くかを見るため、同じ Parquet ファイル群を `CLUSTER BY` なし / ありの2つのコピー先のテーブルにロードし、`WHERE "dt" = DATE '2026-01-05'` の scan bytes を比較しました。

ソースのファイル配置

コピー先のテーブル

クエリ

scan bytes

5 ファイル。各ファイルに 10 日分の `dt` が混在

`CLUSTER BY` なし

`WHERE "dt" = DATE '2026-01-05'`

27,601,840

5 ファイル。各ファイルに 10 日分の `dt` が混在

`CLUSTER BY ("dt")`

`WHERE "dt" = DATE '2026-01-05'`

27,601,840

10 ファイル。各ファイルが 1 日分の `dt` のみを含む

`CLUSTER BY` なし

`WHERE "dt" = DATE '2026-01-05'`

2,754,800

10 ファイル。各ファイルが 1 日分の `dt` のみを含む

`CLUSTER BY ("dt")`

`WHERE "dt" = DATE '2026-01-05'`

2,754,800

日付が混在したファイル配置では、`CLUSTER BY` の有無で scan bytes は変わりませんでした。一方、日付ごとに分割したファイル配置では、`CLUSTER BY` の有無に関係なく scan bytes は小さくなりました。つまり、この検証で scan bytes を減らした要因は、コピー先のテーブルに指定した `CLUSTER BY` ではなく、ロード対象の Parquet ファイルの統計情報によるものです。

Snowflake のドキュメントには、Snowflake-managed Iceberg table の table optimization や data compaction に関する記載があります。ただし、`ADD_FILES_COPY` のロード時点で cluster key に沿ってファイルが書き換えられるとは書かれていません。`ADD_FILES_COPY` でロード直後の scan 効率を上げたい場合は、コピー先の `CLUSTER BY` に期待するのではなく、ロード対象の Parquet ファイル配置を先に設計する必要があります。`CLUSTER BY` による長期的なメンテナンスやクエリパフォーマンスへの影響は、`ADD_FILES_COPY` の COPY 可否とは別に、実データ量、ファイルサイズ、ファイル数、クエリパターンを固定して検証する必要があります。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg-manage#automatic-clustering)

## ネスト型は `VARIANT` 型のカラムへ格納できない

Parquet ファイルには、Iceberg の `struct` / `list` / `map` に対応するネスト型のデータが含まれることがあります。このようなデータを Snowflake-managed Iceberg table に `ADD_FILES_COPY` で取り込む場合、コピー先のカラムはロード対象の Parquet ファイルと互換性のある構造化データ型として定義する必要があります。

[iceberg.apache.org](https://iceberg.apache.org/spec/#nested-types) [github.com](https://github.com/apache/parquet-format/blob/96edf77704b60b6f3ca2232c218c64eff6c874d3/LogicalTypes.md#nested-types)

ネスト型のデータで field の増減が発生し得る場合、Iceberg v3 の `VARIANT` 型を汎用的な格納先として使いたくなります。しかし、Iceberg / Parquet のネスト型と `VARIANT` 型には互換性がありません。Iceberg `struct` / `list` / `map` として書かれたデータは、Parquet のネスト型のデータとして書き出されます。`VARIANT` 型のカラムへ格納するには、Parquet ファイル側も Iceberg v3 `VARIANT` に対応する形式で書かれている必要があります。

先に述べたとおり、`ADD_FILES_COPY` ではデータの変換を実行できません。そのため、`struct` / `list` / `map` として書かれたネスト型のデータを、コピー先の `VARIANT` カラムに格納することはできません。

なお、これは `VARIANT` 型そのものが `COPY` 非対応である、という意味ではありません。Parquet ファイルには Iceberg の `VARIANT` 型に対応するデータ型が存在します。

[iceberg.apache.org](https://iceberg.apache.org/spec/#parquet) [github.com](https://github.com/apache/parquet-format/blob/96edf77704b60b6f3ca2232c218c64eff6c874d3/LogicalTypes.md#variant)

このデータ型を使用する Parquet ファイルであれば、`ADD_FILES_COPY` で `VARIANT` カラムにデータを格納できます。

検証結果は次のとおりです。

ロード対象の Parquet schema

コピー先のカラム定義

結果

`struct(a string, b number)`

`OBJECT(a varchar, b number)`

成功

`list<struct(a string, b number)>`

`ARRAY(OBJECT(a varchar, b number))`

成功

`map<string, number>`

`MAP(varchar, number)`

成功

`struct(a string, b number)`

Iceberg v3 `VARIANT`

失敗

`struct(b number, a string)`

`OBJECT(a varchar, b number)`

失敗

`struct(a string, b number)`

`OBJECT(a varchar, b varchar)`

失敗

`struct(a string, b number(9,0))`

`OBJECT(a varchar, b number(38,0))`

成功

`struct(a string, b number, c string nullable)`

`OBJECT(a varchar, b number, c varchar)`

成功。`NULL` も保持される

トップレベルのカラムは `MATCH_BY_COLUMN_NAME = CASE_SENSITIVE` で名前一致します。一方、ネスト型の field は同じ感覚で自由に並べ替えられるわけではありません。`struct(b, a)` を `OBJECT(a, b)` にロードすると、ネスト型の定義順序やスキーマ互換性の不一致として失敗します。ソースの schema から Snowflake-managed Iceberg table の schema を生成する場合は、ネスト型 field の名前、型、順序を揃える必要があります。

また、Snowflake のドキュメントでは、構造化データ型のカラムは最大 1000 sub-columns までサポートすると説明されています。

[docs.snowflake.com](https://docs.snowflake.com/en/user-guide/tables-iceberg-data-types)

`ADD_FILES_COPY` でネスト型のデータを扱う場合は、COPY 前にソース schema とコピー先のテーブル定義を比較し、field 数、field 名、型、順序が互換であることを確認します。

## Schema Evolution は COPY 前に行う

Snowflake-managed Iceberg table では、構造化データ型のカラムに対して `ALTER ICEBERG TABLE ... ALTER COLUMN ... SET DATA TYPE` を実行できます。Snowflake のドキュメントには、構造化データ型である `OBJECT` への key 追加、key 削除、key の並べ替え、key の rename、field type evolution が記載されています。

ここで重要なのは、Snowflake-managed Iceberg table の Schema Evolution が、`ADD_FILES_COPY` によって自動実行されるものではないことです。ロード対象の Parquet ファイルに合わせてテーブル定義を進化させる必要がある場合は、COPY 前に `ALTER ICEBERG TABLE` を実行します。

[docs.snowflake.com](https://docs.snowflake.com/en/sql-reference/sql/alter-iceberg-table-alter-column-set-data-type)

検証では、COPY 前にコピー先のテーブルの schema を拡張すると、追加した field の値をロード後に参照できました。例えば、ロード対象の Parquet ファイルが `struct(a string, b number, c string)` を持つ場合、コピー先のカラムを先に `OBJECT(a varchar, b number, c varchar)` に変更してから `ADD_FILES_COPY` を実行すると、ロード後に `c` の値を読み取れます。

検証した変更

結果

`OBJECT(a, b)` から `OBJECT(a, b, c)` への key 追加

成功。既存の行の `c` は `NULL` になる

`ARRAY(OBJECT(a, b))` から `ARRAY(OBJECT(a, b, c))` への key 追加

成功

ネストした `OBJECT` への key 追加

成功

`number(9,0)` から `number(38,0)` への precision widening

成功

一方、コピー先のカラムが `OBJECT(a, b)` のまま `c` を含む Parquet ファイルを `ADD_FILES_COPY` でロードしても、COPY 自体は成功します。しかし、その後にコピー先のカラムを `OBJECT(a, b, c)` へ拡張しても、ロード済みの行では `c` は `NULL` を返します。ロード時点でコピー先のカラムに存在しなかった field の値は、`ADD_FILES_COPY` でロードした data file からは復元できません。

この結果から、ネスト型のデータを扱う場合は、COPY 実行前にロード対象の Parquet ファイルの schema とコピー先のテーブルの schema を比較する必要があります。許容できる field 追加や型拡張であれば、`ALTER ICEBERG TABLE` を先に実行してから `ADD_FILES_COPY` を実行します。許容できない差分であれば、COPY を実行する前に処理を止めます。

Iceberg の Schema Evolution は field ID に基づきます。Apache Iceberg spec によれば、field を追加するときは新しい field ID が割り当てられ、version 間で一致する field には既存の field ID が再利用されます。Snowflake のドキュメントでも、構造化データ型の field type evolution として、`int` から `long` への拡張、`float` から `double` への拡張、`decimal(p,s)` からより大きい precision の `decimal(p',s)` への拡張が説明されています。任意の型変更が許されるわけではありません。

[iceberg.apache.org](https://iceberg.apache.org/spec/#schema-evolution) [docs.snowflake.com](https://docs.snowflake.com/en/sql-reference/sql/alter-iceberg-table-alter-column-set-data-type#evolving-types)

`ADD_FILES_COPY` は Parquet ファイルのデータ型変換を検証しません。また、Snowflake-managed Iceberg table では COPY 構文の `VALIDATION_MODE` を指定できません。`ADD_FILES_COPY` でネスト型のデータを扱う場合は、COPY 前にスキーマ互換性をチェックする処理を組み込む必要があります。

## 同じファイルを再 COPY した場合 skip される

Snowflake のドキュメントによると、`FORCE = TRUE` を指定しない限り、すでにコピー先のテーブルにロード済みで内容が変わっていない staged data files は `COPY` コマンドが無視します。

実測でも、同じ Snowflake-managed Iceberg table に対して同じ staged file を再度 `COPY` すると、ファイルは再処理されませんでした。`COPY` の結果は 0 files processed になりました。

これは、同一テーブルに同一ファイルを重複投入することを避ける動きとして期待できます。一方で、同じファイルを意図的に再処理したい場合は、`FORCE = TRUE` を指定するか、ファイル自体を変更して新しい checksum にする必要があります。

また、`TRUNCATE TABLE` はテーブルのロードメタデータも削除します。そのため、テーブル全体を空にしてから同じファイル群を再ロードしたい場合は、`TRUNCATE TABLE` と `DELETE` の違いを理解しておく必要があります。

## 実装前に確認すること

`ADD_FILES_COPY` を使う場合、ロード処理の中で吸収できる差分はほとんどありません。COPY を実行する前に、以下の点を確認するとよいでしょう。

確認すること

確認内容

コピー先のテーブル

Snowflake-managed Iceberg table であること。`PARTITION BY` が指定されていないこと。

ファイルの参照方法

ロード対象の Parquet ファイルを名前付き stage 経由で参照できること。external stage の backend は S3 / GCS / Azure Blob Storage のいずれでもよいが、cloud provider をまたぐ場合は latency とコストを別途確認する。

COPY option

`FILE_FORMAT = (TYPE = PARQUET USE_VECTORIZED_SCANNER = TRUE)` と `MATCH_BY_COLUMN_NAME = CASE_SENSITIVE` を指定すること。COPY 内の変換、フィルタリング、`VALIDATION_MODE`、`ON_ERROR = CONTINUE | SKIP_FILE_N | SKIP_FILE_X%` を使わないこと。

top-level column

Parquet ファイルの column name とコピー先のカラム名が、大文字・小文字を区別して一致していること。コピー先のカラム型が、Parquet ファイルの型と互換であること。

ネスト型のデータ

Parquet `struct` / `list` / `map` を、互換性のある構造化データ型 `OBJECT` / `ARRAY` / `MAP` として定義していること。`VARIANT` を汎用的な格納先にしないこと。

ネスト型 field

field の名前、型、順序がソース schema と一致していること。

Schema Evolution

COPY 前に schema 差分を検出すること。許容できる field 追加や型拡張は先に `ALTER ICEBERG TABLE` で反映し、許容できない差分は COPY 前に処理を止めること。

ファイル配置

scan bytes を抑えたい場合は、ロード対象の Parquet ファイルの配置や統計情報を設計すること。`CLUSTER BY` を指定しても、`ADD_FILES_COPY` のロード時にファイルは cluster key に沿って書き換えられない。

再ロード

同じ staged file を再ロードする条件を決めること。`DELETE` はロードメタデータを削除しない。`TRUNCATE TABLE` はロードメタデータも削除する。通常の `COPY INTO <table>` と Snowpipe では、modified file の扱いが異なる。

## おわりに

`COPY INTO ... LOAD_MODE = ADD_FILES_COPY` は、Snowflake-managed Iceberg table に外部で生成した Parquet ファイルを取り込むうえで、コスト効率の良い選択肢です。Snowflake 側で Parquet ファイルを scan / rewrite せず、Iceberg-compatible な Parquet ファイルを data file として copy / register できます。

ただし、`ADD_FILES_COPY` は、Parquet ファイルを読み込んでコピー先のテーブル定義に合わせで data file を作り直すロード方式ではありません。Parquet ファイルとコピー先のテーブル定義は、COPY 実行前に互換性が担保されている必要があります。カラム名の大文字・小文字の不一致、データ型の不一致、ネスト型 field の順序違い、テーブル定義に存在しない field は、COPY 前に検出して解消しなければなりません。ネスト型のデータや Schema Evolution を扱う場合は、この前提がさらに重要になります。

そのため、`ADD_FILES_COPY` を使う設計では、Snowflake 側の COPY 文よりも前段の Parquet 生成が重要になります。Parquet ファイルの schema、ファイル配置、再処理単位を Snowflake-managed Iceberg table の定義に合わせて作れるかを先に確認します。

Parquet ファイルを Snowflake-managed Iceberg table の定義に合わせて生成できる場合、`ADD_FILES_COPY` は Snowflake-managed Iceberg table への実用的なロード方式になります。逆に、ロード時の変換、フィルタリング、partitioned table への取り込み、柔軟なスキーマ吸収を期待する場合は、別の取り込み方式を選ぶべきです。

## We are hiring 🔥

LayerXでは、Snowflakeを活用したデータ基盤の構築と、その上でのAI/MLシステムの開発を進めています。単に新しい機能を使うだけではなく、公式ドキュメント、実測結果、運用上の制約を踏まえて、事業で使い続けられる形に落とし込むことを大切にしています。Production-ReadyなAI開発をサポートするためのデータ基盤開発、時系列データ処理、リアルタイムデータパイプラインの構築などに興味がある方、そして、データ基盤を事業成長のドライバーだと信じて止まない方は、ぜひ一緒にチャレンジしましょう!

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/61470) [open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/77873)