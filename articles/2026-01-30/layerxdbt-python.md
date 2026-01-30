---
title: "LayerXのdbt Pythonモデル活用術 - 外部連携の実装パターン"
source: "https://tech.layerx.co.jp/entry/dbt-python-external-integration-patterns"
publishedDate: "2025-12-20"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "saeeeeru"
---

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/saeeeeru/20251218/20251218213943.jpg)

この記事は、dbt Advent Calendar 2025 の 20日目の記事です。

[qiita.com](https://qiita.com/advent-calendar/2025/dbt)

バクラク事業部 BizOps部 データグループへ25年11月に入社した さえない（ [@saeeeeru](https://x.com/saeeeeru) ）です。LayerX のデータグループは BizOps 部に所属し、「事業成果に直結するデータ基盤」を構築しています。事業の意思決定を支える Fact Base の提供から、AI エージェントが活用できるデータ環境の整備まで、幅広い役割を担っています。詳しくは昨日の記事で紹介していますので、気になった方は是非ご覧ください。

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/analytics-engineer-first-30-days)

このデータ基盤でデータモデリングの中核になっているのが dbt （data build tool）です。dbt はデータウェアハウス内のデータ変換を SQL で記述・管理するツールで、変換ロジックを持つモデルは基本的に SQL で書く「SQL first」の思想を持っています。ただ、外部連携や複雑な文字列変換など SQL だと厳しい処理もあるため、Python モデルもサポートされています。

LayerX では、この dbt Python モデルを使って SaaS からのデータ取り込みや、Slack 通知・Salesforce へのデータ同期といった外部連携を行っています。入社してこの活用範囲の広さに驚いたので、本記事ではチームで運用している **外部連携の実装パターン** をユースケースとともに紹介します。

以下の読者を想定しています。

-   dbt を運用しており、Python モデルの導入を検討している方
-   SaaS からのデータ取り込みや外部システムへの連携など、具体的なユースケースを知りたい方
-   外部 API 連携や Custom Materialization [\*1](#f-6dd2d215 "https://tech.layerx.co.jp/entry/dbt-snowflake-python-model-custom-materialization") の実装パターンを知りたい方

本記事では dbt Python モデルの技術的な詳細にまでは踏み込みません。基礎的な構文や実行環境については、弊社から発表した以下のスライドで詳しく説明していますので、そちらをご参照ください。

[speakerdeck.com](https://speakerdeck.com/trsnium/dbt-pythonmoderudeshi-xian-surusnowflakehuo-yong-shu)

## 外部連携の実装パターン

LayerX では、外部連携の要件に応じて、主に以下のパターンを使い分けています。

パターン

概要

ユースケース例

Incremental Model

時系列データを API Call 数を抑えながら、効率的に取り込む

Zendesk チケット

Alert + Procedure

条件やスケジュールをトリガーに、外部 API を呼び出す

Slack 通知

post\_hook + Procedure

dbt model の実行後に、外部へデータを書き戻す（Reverse ETL）

Salesforce 同期

後半2つのパターンでは **Snowflake Alert** と **Stored Procedure** を活用しています。各ユースケースの説明に入る前に、これらの機能について簡単に紹介します。

### Snowflake Alert とは

[Snowflake Alert](https://docs.snowflake.com/en/user-guide/alerts) は、スケジュールに基づいて条件をチェックし、条件が満たされた場合にアクションを実行する Snowflake 独自の機能です。SQL クエリの結果が特定の条件を満たしたときに Stored Procedure を呼び出せるため、データを用いたビジネスイベントの通知に活用しています。

### Stored Procedure の dbt 管理

LayerX では [Stored Procedure](https://docs.snowflake.com/ja/developer-guide/stored-procedure/stored-procedures-overview) 用の Custom Materialization（`materialized='procedure'`）を独自に実装しており、Procedure の定義も dbt で一元管理しています。詳しくは以下の記事をご参照ください。

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/dbt-snowflake-python-model-custom-materialization)

ここからは、それぞれの実装パターンを説明していきます。

> **Note**: 本記事のコード例は概念理解のための擬似コードです。実際の運用では、レート制限への対応（リトライなど）、一時的なネットワークエラーのハンドリングといった考慮が必要になります。

## Incremental Model： Zendesk チケットデータの取り込み

### 背景

弊社では Zendesk をカスタマーサポートのチケット管理ツールとして利用しており、チケットに紐づくコメントデータまで Snowflake に取り込んで、顧客対応に関する分析や品質改善に活用しています。さらに、取り込んだコメントデータに対して Snowflake の Cortex AISQL 関数[\*2](#f-3ded9fc1 "https://docs.snowflake.com/ja/user-guide/snowflake-cortex/aisql")を活用することで、誰でも簡単に自然言語分析ができる環境を社内に提供しています。

### 実装のポイント

**Zendesk Incremental Export API による効率的なデータ取得**

Zendesk には Cursor ベースの [Incremental Export API](https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/) が用意されており、前回取得時点の Cursor を保存しておくことで、次回実行時にはそれ以降の更新データのみを取得できます。これにより API コール数を大幅に削減でき、レートリミットに抵触するリスクも軽減されます。

from snowflake.snowpark.types import StructType, StructField, StringType, LongType, TimestampType

def model(dbt, session):
    dbt.config(
        materialized='incremental',
        unique\_key='id',
        packages=\['snowflake-snowpark-python', 'requests'\],
        external\_access\_integrations=\['zendesk\_api'\],
        secrets={'zendesk\_api\_token': '...'},
    )

    client = ZendeskClient(subdomain, email, api\_token)

    if dbt.is\_incremental:
        
        current = session.table(f'{dbt.this}')
        start\_time = current.select(F.max('updated\_at')).collect()\[0\]\[0\]
    else:
        
        start\_time = datetime.now() - timedelta(days=365)

    tickets = client.incremental\_export('tickets', start\_time)

    
    schema = StructType(\[
        StructField('id', LongType()),
        StructField('subject', StringType()),
        StructField('status', StringType()),
        StructField('updated\_at', TimestampType()),
        
    \])
    return session.create\_dataframe(tickets, schema=schema)

**API クライアントの実装**

Zendesk API クライアントの実装は、一般的な REST API 呼び出しのプラクティスに則ります。Cursor ベースのページネーション、レートリミット対応、エラーハンドリングなど、SaaS API 連携における標準的なパターンを適用してください。

参考：[Zendesk API Rate Limits](https://developer.zendesk.com/api-reference/introduction/rate-limits/)

## Alert + Procedure： Slack 通知

### 背景

ビジネスプロセスにおける「次のアクション」をデータから算出して Slack チャンネルに自動投稿しています。Snowflake のクエリ結果をテキスト、CSV、グラフなど様々な形式で送信できます。

### 対応フォーマット

-   **テキストメッセージ**：簡易なアラート通知
-   **CSV ファイル**：詳細データの共有
-   **グラフ画像**：line, bar, hist, box, kde, density など `matplotlib` で描画

### 実装のポイント

**Procedure 定義**

def model(dbt, session):
    dbt.config(
        materialized='procedure',
        arguments=\[
            {'name': 'channel', 'type': 'varchar'},
            {'name': 'message', 'type': 'varchar'},
            {'name': 'query\_id', 'type': 'varchar'},
            {'name': 'plot\_type', 'type': 'varchar', 'default': "'none'"},
        \],
        packages=\['snowflake-snowpark-python', 'requests', 'matplotlib', 'pandas'\],
        external\_access\_integrations=\['slack\_api'\],
        secrets={'slack\_token': 'slack\_bot\_token'},
    )
    return None

この `arguments` の仕様は Snowflake の CREATE PROCEDURE 構文に準拠しています。詳細は[公式ドキュメント](https://docs.snowflake.com/en/sql-reference/sql/create-procedure)を参照してください。

> **Note**: 通常の dbt Python モデルでは `model` 関数から DataFrame を返しますが、Custom Materialization（`materialized='procedure'`）では `return None` で問題ありません。これは Procedure の「登録」のみを行い、テーブルを作成しないためです。また、Procedure の実際の処理ロジックは後述の `procedure` 関数に記述します。これらは Custom Materialization 独自の仕様です。

**グラフ描画 → Slack 投稿フロー（擬似コード）**

def procedure(dbt, session, channel, message, query\_id, plot\_type):
    
    df = session.sql(f"SELECT \* FROM TABLE(RESULT\_SCAN('{query\_id}'))").to\_pandas()

    
    if plot\_type != 'none':
        fig, ax = plt.subplots()
        df.plot(kind=plot\_type, ax=ax)
        buf = io.BytesIO()
        fig.savefig(buf, format\='png')
        buf.seek(0)

        
        upload\_url = get\_upload\_url(slack\_token, filename='chart.png')
        requests.post(upload\_url, files={'file': buf})
        complete\_upload(slack\_token, channel, message)
    else:
        
        post\_message(slack\_token, channel, message)

    return 'OK'

こちらの procedure を Snowflake Alerts のアクションとして活用しており、ビジネスイベント通知・不正検知アラートなど、定期的な異常検知・通知を実現しています。

**Alert 定義の例**

CREATE OR REPLACE ALERT fraud\_detection\_alert
  WAREHOUSE = compute\_wh
  SCHEDULE = 'USING CRON 0 \* \* \* \* Asia/Tokyo'
  IF (EXISTS (
    SELECT 1
    FROM analytics.fraud\_scores
    WHERE score > 0.9
      AND created\_at > DATEADD(hour, \-1, CURRENT\_TIMESTAMP())
  ))
  THEN
    CALL slack\_notify\_procedure('#alert-channel', '不正検知: 高リスクトランザクションを検出', LAST\_QUERY\_ID(), 'none');

ALTER ALERT fraud\_detection\_alert RESUME;

`IF (EXISTS (...))` の条件が満たされた場合のみ `THEN` のアクションが実行される仕様になっています。

## post\_hook + Procedure： Salesforce へのデータ同期

### 背景

Snowflake で加工・集計したデータを Salesforce に書き戻す、いわゆる **Reverse ETL** のユースケースです。カスタマーサポートチームがプロダクトの利用状況など集計済みデータを Salesforce 上で確認できる仕組みを提供しています。

### 実装のポイント

**post\_hook による Procedure 呼び出し**

dbt model の `post_hook` を使って、モデル実行後に Salesforce への同期処理を自動実行しています。`{{ this }}` で現在のモデルのテーブル名を渡すことで、変換後のデータをそのまま同期できます。

\# dbt model の config 例
{{
  config(
    materialized='table',
    post\_hook="CALL salesforce\_upsert\_procedure('{{ this }}', 'Account', 'External\_Id\_\_c')"
  )
}}

**Bulk API v2 による大量データ処理**

Salesforce の Bulk API v2 を使用しています。REST API では 1 レコードずつ処理が必要ですが、Bulk API v2 なら数万件を一括で送信できるため、大量データの Upsert に適しています。

def model(dbt, session):
    dbt.config(
        materialized='procedure',
        arguments=\[
            {'name': 'snowflake\_table\_fqn', 'type': 'varchar'},
            {'name': 'salesforce\_object\_name', 'type': 'varchar'},
            {'name': 'upsert\_key', 'type': 'varchar'},
        \],
        packages=\['snowflake-snowpark-python', 'requests'\],
        external\_access\_integrations=\['salesforce\_api'\],
        secrets={'sf\_client\_id': '...', 'sf\_client\_secret': '...'},
    )
    return None

**Bulk Upsert フロー（擬似コード）**

def procedure(dbt, session, snowflake\_table\_fqn, salesforce\_object\_name, upsert\_key):
    
    token = get\_salesforce\_token(client\_id, client\_secret)

    
    session.sql(f"COPY INTO @stage FROM {snowflake\_table\_fqn} FILE\_FORMAT=(TYPE=CSV)")

    
    job = create\_bulk\_job(token, salesforce\_object\_name, upsert\_key)

    
    for chunk in read\_staged\_files(session):
        upload\_data(token, job\['id'\], chunk)

    
    while True:
        status = get\_job\_status(token, job\['id'\])
        if status in ('JobComplete', 'Failed'):
            break
        time.sleep(10)

    return f"Processed {status\['numberRecordsProcessed'\]} records"

## まとめ

本記事では、dbt Python モデルを活用した外部連携の実装パターンを 3 つのユースケースとともに紹介しました。

ユースケース

パターン

特徴

Zendesk データ取り込み

Incremental Model

Cursor ベースの差分更新で API Call 数を削減

Slack 通知

Alert + Procedure

条件トリガーで多様なフォーマットの通知を実現

Salesforce 同期

post\_hook + Procedure

Reverse ETL で大量データを効率的に書き戻し

dbt は「SQL first」なツールですが、Python モデルを使えばできることがぐっと広がります。 Python データサイエンティストだった自分にとって、 dbt は「SQLのツール」というイメージでしたが、 Python モデルのコードを読んでみると馴染みのあるライブラリもそのまま使われていて、すんなり理解できました。ETL だけでなく、通知・同期・書き戻しまで dbt の DAG（依存関係グラフ）で一元管理できるのは運用もしやすいため、今後もユースケースを増やしていくことで、データ基盤の価値をより一層高めていきたいと考えています。

> — YAMAMOTO Yuta (@\_\_Y4M4MOTO\_\_) [2025年12月10日](https://twitter.com/__Y4M4MOTO__/status/1998708922916773903?ref_src=twsrc%5Etfw)

また、このような多岐に渡るデータソースを使って、「事業成果に資するAI-Readyなデータ基盤を作る」という挑戦に興味を持った方は是非お話ししましょう。 アナリティクスエンジニア、データエンジニアのカジュアル面談はこちらから 👇

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/opendoor/2cccdd370bae80068a1ec3cc8bae5fb0/)