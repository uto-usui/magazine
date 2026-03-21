---
title: "Python製ETL「dlt」を選んだ話 - Azure Cosmos DB for PostgreSQL × Container App Jobでいい感じにDatalakeを構築する"
source: "https://tech.layerx.co.jp/entry/python-dlt-azure"
publishedDate: "2026-03-18"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "shinyorke"
---

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shinyorke/20260313/20260313160927.jpg)

こんにちは。LayerX Ai Workforce事業部でSREをしています [@shinyorke](https://x.com/shinyorke)（しんよーく）と申します。

最近はAi Workforceのデータ周りの基盤を作る仕事をしながら、個人としては野球解説AI Agentの開発を頑張っています。

本ブログでは、Ai Workforceのデータ周りの基盤のコンポーネントの一部であるELTの選定をどうしたかについて執筆します。

特に今回は、

-   マネージドサービス（Azure Data Factory、通称ADF）での構築・実装を検討していたが **なぜ断念したのか**
-   ADF の代替として **dlt + Container App Job** を選んだ経緯と、実際どうだったか
-   Azure Cosmos DB for PostgreSQL の Read Replica を相手にしたときに **ハマった点と対策**

を中心に共有できればと思います。

なお、以下については本ブログのスコープ外とさせてもらえればと思います。

-   データ基盤構築・運用の具体
-   データを使って何をするか
-   その他、Ai Workforceの特定の機能や業務に関する言及

* * *

## TL;DR

-   **dlt（data load tool）は「Pythonで書くだけ」のシンプルさが強み。** SQLAlchemy と組み合わせるだけで PostgreSQL → Parquet → Azure Blob が完結する&Container App Jobとの相性が良い。
-   **ADF + Self-hosted IR は運用複雑性が高く、Private 接続環境では導入に覚悟が必要。**
-   **Cosmos DB for PostgreSQLの Read Replica 経由の連携に要注意。** Server-side Cursorとの WAL 競合、NullPool の必要性、OOM 対策など、やってから気がつくポイントが複数。

* * *

## 目次

-   [TL;DR](#TLDR)
-   [目次](#目次)
-   [マネージドサービス（ADF）を検討したが見送った](#マネージドサービスADFを検討したが見送った)
-   [dlt とは何か](#dlt-とは何か)
-   [アーキテクチャ概要](#アーキテクチャ概要)
-   [実装の詳細とハマりポイント](#実装の詳細とハマりポイント)
    -   [NullPool は必須](#NullPool-は必須)
    -   [Read Replica の WAL 競合問題](#Read-Replica-の-WAL-競合問題)
    -   [OOM 対策：テーブルバッチ分割 + 子プロセス化](#OOM-対策テーブルバッチ分割--子プロセス化)
-   [やってみてどうだったか](#やってみてどうだったか)
-   [結び](#結び)

* * *

## マネージドサービス（ADF）を検討したが見送った

最初の設計では **Azure Data Factory（ADF）+ Self-hosted Integration Runtime（SHIR）** の組み合わせで実装しようとしていました。

ADF は Azure ネイティブのデータ統合サービスで、GUIでパイプラインを組めてエンタープライズ向けの機能も充実しています。

最初はこれでイケるやろ...と考えましたが、**ネットワーク構成上、プライベートにやりたい（L4レベル）という要件を満たそうとして破綻しました。**

この要件（Private 接続環境）で使う場合には **Self-hosted IR（SHIR）** というコンポーネントを自前で立てる必要があるのですが以下の課題があり見送ることにしました。

課題

内容

**Managed PE の制約**

ADF の Managed PE は使えず、SHIR 経由となるため接続設計が複雑化

**コンポーネント数の多さ**

ADF / SHIR / Linked Service / Pipeline と管理対象が多く、障害時の切り分けが大変

**SHIR の状態管理**

VMじゃないとSHIRが使えないため常時起動が必要。イメージタグ固定・コントロールプレーン到達性など障害面が多い

**ランニングコスト**

SHIR 用 VM が常時起動のためコストが発生し続ける

明確なKnockout Factorは「**Managed PE（Private Endpoint） の制約**」です。ここができないとわかり詰みました。

要するに「シンプルな日次バッチをやりたいだけなのに、維持するものが多すぎる」という状態になってしまいました。

> 「Blob dump を中心に DWH が参照する疎結合構成」という要件に対して実装経路が重い

というのが正直な所感でした。そこで PoC を経て **ADF + SHIR を廃止し、dlt + Container App Job に置き換える** という判断をしました。

* * *

**dlt（data load tool）** は、Pythonで書けるオープンソースの ETL ライブラリです。

[dlthub.com](https://dlthub.com/)

一言で言うと **「Pythonでデータパイプラインをいい感じに書けるツール」** です。

特徴を挙げると、

-   データの移動や読み込みをシンプルに行えるオープンソースのPythonライブラリ。
-   特定のバックエンド環境を必須としない一方で、コンテナ環境上でもPythonコードとして柔軟に組み込んで動かすことができる
-   Amazon S3上のCSVファイルや各種REST APIからデータを読み込み、DuckDBやSnowflakeといった具体的なデータベースやデータウェアハウスへ、整理されたデータセットとして直接保存することができる

事が挙げられます。今回やりたかったことが、

-   Azure Cosmos DB for PostgreSQL上のデータをParquet形式でBlob Storageに出力
-   上記の処理をRead Replicaから日次で実行
-   Azure Container Appを使いたかったのでDocker Container化する

であったので正にうってつけの存在でした[\*1](#f-6c3089f7 "ひと昔前で言えばEmbulkみたいなことがやりたかったイメージです。")。

なお、今回の構成では、以下のライブラリを組み合わせて使いました。

ライブラリ

役割

`dlt[filesystem,parquet,az]`

抽出・ロード制御・Parquet 出力・Azure Blob 書き込み

`sqlalchemy` + `psycopg`

PostgreSQL 接続

`pyarrow`

Parquet 変換

`adlfs`

Azure Blob Storage ファイルシステム

* * *

## アーキテクチャ概要

全体の構成は以下のとおりです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shinyorke/20260313/20260313155711.png)

dltを使ったetlおよびdatalakeからDWH（snowflake）への流れ ※Nano Bananaによる作図

**Container App Job** を採用したのは、「日次バッチ」という要件に対して「起動→実行→終了」というサイクルが自然にはまるからです。SHIR のように常時起動する必要がなく、実行時のみリソースを消費します。コスト・運用の両面でシンプルです。

Blob 上のファイルレイアウトはこのようになっています。

snowflake-stage/
  raw/
    <table\_name>/
      <load\_id>.<hash>.parquet   ← 実行前に旧ファイル削除→新規書き込み
    \_dlt\_loads/
    \_dlt\_pipeline\_state/

**「常に最新の完全コピー」** を Snowflake から参照するシンプルな設計で、日付パーティションは持ちません。

この構成でいい感じに動かすことができました。

* * *

## 実装の詳細とハマりポイント

ここは重箱の隅をつつくようなTipsです。

**Cosmos DB for PostgreSQL の Read Replica を相手にすると独特のハマりどころがあります。**

### NullPool は必須

dlt はデフォルトで複数テーブルを並列 fetch します。SQLAlchemy のデフォルト接続プールである `QueuePool`（size=5, overflow=10）を使うと、並列コネクション上限を超えてタイムアウトが発生します。

**解決策：`NullPool` を使う**

from sqlalchemy.pool import NullPool
import sqlalchemy as sa

engine = sa.create\_engine(pg\_url, poolclass=NullPool)

`NullPool` は `connect()` のたびに独立した物理コネクションを生成し、`close()` で即切断します。バッチジョブでコネクション再利用が不要な場合、これが一番シンプルで確実です。

### Read Replica の WAL 競合問題

次のハマりどころは、Server-side Cursor との WAL競合 [\*2](#f-ffaf0a6f "Write-Ahead Log（ログ先行書き込み）のこと。")です。

dlt + SQLAlchemy の組み合わせでは、大量データのストリーミング取得に `stream_results=True` を使いたくなります（psycopg3 の ServerCursor / `DECLARE CURSOR` に相当）。ところが、**Cosmos DB for PostgreSQLの Read Replica でこれを使うと SSL 接続が強制切断されます**。

OperationalError: SSL connection closed unexpectedly

原因は Read Replica の WAL 適用との競合です。マネージドサービスの制約上、チューニングできるパラメータに限りがあるため、クライアント側（dltのアプリケーション内）での回避が必要でした。[\*3](#f-3b43bc8c "通常のPostgreSQLであれば max_standby_streaming_delay 等で調整できますが、Azure Cosmos DB for PostgreSQL ではこれらのパラメータが設定不可で、かつ master DB への影響も与えられない制約があります。")

**解決策：`yield_per` のみを使う**

stmt = sa.select(table).execution\_options(yield\_per=10000)

`yield_per` を指定することで `DECLARE CURSOR` を使わずに `fetchmany()` 相当のチャンク単位で結果を取得できます。WAL 競合を回避しつつ、メモリ効率も保てます。

### OOM 対策：テーブルバッチ分割 + 子プロセス化

`yield_per` を使っても、テーブル全体を順次読み切る点は変わりません。テーブルが大きかったり数が多かったりすると、プロセスのメモリが積み上がって OOM（Out of Memory）が発生します。

これを防ぐために、以下の3つを組み合わせました。

**1\. `workers=1`（同時処理テーブル数を1に絞る）**

pipeline.extract(source, write\_disposition="replace", workers=1)

**2\. `BATCH_COUNT` による分割処理**

全テーブルを N 個のバッチに分割して順次処理します。環境変数 `BATCH_COUNT`（デフォルト5）で制御しています。

**3\. `multiprocessing.spawn` で子プロセス化**

ctx = multiprocessing.get\_context("spawn")
proc = ctx.Process(target=run\_batch, args=(batch,))
proc.start()
proc.join()

`engine.dispose()` はコネクションは解放しますが、Python ヒープは解放しません。**子プロセスを spawn して終了させることで、OS レベルで RAM を確実に回収** できます。

> `fork` ではなく `spawn` を使う点がポイントです。`fork` だと親プロセスのメモリが引き継がれてしまうため、OOM 対策として不完全になります。

* * *

## やってみてどうだったか

**「やりたいことがシンプルにできた、インフラ上は（ただしdltは芸細かいことしている）」** というのが率直な感想です。

ADF + SHIR の構成では「設定が多すぎてどこに何があるかわからなくなる」という状態でしたが、dlt では **Python ファイルを見れば何をやっているかが全部わかる** という状態になりました。

一方で、冒頭でも触れた通り CosmosDB for PostgreSQL の Read Replica には独特の制約があり、「ドキュメントを読むだけではわからない」レベルのハマりどころがありました。特に WAL 競合と NullPool は、実際に動かしてエラーを見るまで気づけませんでした。

そして、Cosmos DB for PostgreSQLの制約を回避するための実装や設定が煩雑になってしまったのは反省です。なるべくドキュメント化、テストには落としているものの負債化しないようにケアする必要があります。

* * *

## 結び

本ブログでは、

> -   **dlt（data load tool）は「Pythonで書くだけ」のシンプルさが強み。** SQLAlchemy と組み合わせるだけで PostgreSQL → Parquet → Azure Blob が完結する&Container App Jobとの相性が良い。
> -   **ADF + Self-hosted IR は運用複雑性が高く、Private 接続環境では導入に覚悟が必要。**
> -   **Cosmos DB for PostgreSQLの Read Replica 経由の連携に要注意。** Server-side Cursorとの WAL 競合、NullPool の必要性、OOM 対策など、やってから気がつくポイントが複数。

についてお話しました。

「Python で書ける ETL を探している」「ADFを採用すべきか否か」「Cosmos DB for PostgreSQLを使ったデータ基盤を作ろうとしている」という方の参考になれば嬉しいです。

なお、今回のケースはあくまで「ADFやCosmos DB for PostgreSQLのユースケースとのかみ合わせが悪かった」というだけであり、サービス・製品としての優劣ではない事は一応補足しておきます[\*4](#f-8dd0bdef "ADFは使うことなく終わりましたが、Cosmos DB for PostgreSQL自体はAi Workforceの立ち上げ期からいい感じに使えているので良いプロダクトだと思います。")。

Ai Workforce SRE チームでは、引き続きデータ基盤の整備を進めていきます。

次のステップとして Snowflake環境の構築、dbt による分析レイヤーの整備も控えており、またネタができたらブログに書こうと思います。

また、SREおよびデータエンジニア募集中ですので興味がある方は是非カジュアル面談でも何でもしましょう！

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/52751)

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/109629)

最後までお読みいただきありがとうございました。

[\*1](#fn-6c3089f7):ひと昔前で言えばEmbulkみたいなことがやりたかったイメージです。

[\*2](#fn-ffaf0a6f):[Write-Ahead Log](https://ja.wikipedia.org/wiki/%E3%83%AD%E3%82%B0%E5%85%88%E8%A1%8C%E6%9B%B8%E3%81%8D%E8%BE%BC%E3%81%BF)（ログ先行書き込み）のこと。

[\*3](#fn-3b43bc8c):通常のPostgreSQLであれば max\_standby\_streaming\_delay 等で調整できますが、Azure Cosmos DB for PostgreSQL ではこれらのパラメータが設定不可で、かつ master DB への影響も与えられない制約があります。

[\*4](#fn-8dd0bdef):ADFは使うことなく終わりましたが、Cosmos DB for PostgreSQL自体はAi Workforceの立ち上げ期からいい感じに使えているので良いプロダクトだと思います。