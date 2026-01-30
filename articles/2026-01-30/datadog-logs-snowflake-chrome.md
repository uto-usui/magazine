---
title: "Datadog Logs の検索体験を Snowflake に持ち込む Chrome 拡張"
source: "https://tech.layerx.co.jp/entry/2025/12/07/100000"
publishedDate: "2025-12-07"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "nato9598"
---

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/nato9598/20251204/20251204151443.png)

初めまして、今年 9 月にバクラク事業部に入社した [rerorero](https://github.com/rerorero) です。

この記事は [LayerX Tech Advent Calendar 2025](https://tech.layerx.co.jp/entry/tech-advent-calendar-2025) 7 日目の記事です。

もう今年も残り一月弱ですね。 自分にとっては今年も本当にあっという間でした。

年末になるといつも[「ジャネの法則」](https://ja.wikipedia.org/wiki/%E3%82%B8%E3%83%A3%E3%83%8D%E3%81%AE%E6%B3%95%E5%89%87)を思い出します。 人は年齢に反比例して時間を早く感じるという概念で、例えば 30 歳の人にとっては 10 歳の 3 倍、50 歳の人には 5 倍の速さに感じるというものです。 時間は平等で一定だと思っていたけれど、歳をとるにつれ短くなる感覚に焦りを覚えます。

今日はそんな貴重な業務での時間をちょっと節約する Chrome 拡張を作ったよという小ネタをお話しします。

## 背景：LayerX の Datadog ログ運用

LayerX ではコスト最適化の一環として、Datadog Logs の保存期間（リテンション）を 7 日間に設定しています。

Datadog Logs のコスト削減については以前のブログでも紹介されてますので、詳しく知りたい方はそちらをご覧ください。

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/datadog-cost-optimization)

記事でも触れられていますが、7 日以上古いログも参照できるよう [Archiving & Forwarding](https://docs.datadoghq.com/observability_pipelines/destinations/amazon_s3/) を利用して S3 にもアーカイブするようにしています。

アーカイブする際、ログフィルタを利用し、用途に応じて以下の 3 つのログに分割してアーカイブしています。

-   **アクセスログ(access\_log)**: HTTP リクエスト/レスポンスの情報
-   **DB の SQL ログ(sql)**: データベースへのクエリ情報
-   **通常のログ(all\_log)**: 上記以外のアプリケーションログ

S3 にアーカイブされた Datadog Log は JSON Object として保存されますが、さらに Snowpipe と dbt を使って Snowflake に取り込まれ、分析可能な形で保存されています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/nato9598/20251204/20251204151526.png)

Datadog Logs データパイプライン

たとえば access\_log View は、各サービスが出力するリクエストとレスポンスの情報を含むログを格納しています。 LayerX では多くのサービスが Go で実装され、 アクセスログ用の共通のミドルウェアを利用して同じスキーマでログを出力するようにしています。 Snowflake 上で Datadog Log の attributes のデータから、http\_status 等のよく利用するものをカラムにして、分析に利用しやすいようなスキーマに変換します。

以下が access\_log View の変換クエリの一部です。

SELECT
    raw\_data:\_id::text \_id,
    date,
    source,
    service,
    raw\_data:host::string as host,
    status,
    raw\_data:message::string as message,
    raw\_data:attributes::variant as attributes,
    raw\_data:tags::array as tags,
    raw\_data:trace\_id::string as trace\_id,
    raw\_data:span\_id::string as span\_id,
    raw\_data:attributes::variant:url::string as url,
    raw\_data:attributes::variant:request\_body::string as request\_body,
    raw\_data:attributes::variant:response\_body::string as response\_body,
    raw\_data:attributes::variant:http\_status::number as http\_status,
    raw\_data:attributes::variant:http\_method::string as http\_method,
    :

一方 all\_log View はアプリケーションのログを格納するテーブルで、共通の attributes はないため、変換するカラムは多くありません。

SELECT
    raw\_data:\_id::text \_id,
    date,
    source,
    service,
    status,
    raw\_data:message::text as message,
    raw\_data:attributes::variant as attributes,
    raw\_data:tags::array as tags,
    raw\_data:trace\_id::text as trace\_id,
    raw\_data:span\_id::text as span\_id,
    :

これらのパイプラインはデータチームが整備しており、適切なアクセス管理のもと利用できる形になっています。

## 課題：「1 週間前のログ見たい！」

ここからが本題です。 お客様からの問い合わせ対応をしていると、こんなケースによく出会います。

**「先週の水曜日に〇〇という操作をしたんですが、エラーになって...」**

先週の水曜日。それは Datadog のリテンション期間（7 日）を超えています。

Datadog Log Explorer は非常に便利な検索体験を提供しており、 特定の顧客 ID で絞り込んだりするには、今見ているログのフィールドの三点リーダーから「Replace filter with」や「Exclude」などのショートカットメニューを使ってログの検索クエリを素早く切り替えることができます。

しかし１週間以上前の調査となると Snowflake 上のログを調べなければなりません。 ここでちょっと腰が重くなります、というのも

「あれ、status ってカラムだっけ、attributes の中だっけ...」

「アクセスログと通常ログでスキーマ違うんだよな...」

毎回こんな感じで View の定義を見に行って正しいクエリを組み立てる必要があり、これが地味に面倒で億劫な作業でした。

この「地味な面倒」を解消するため、Chrome 拡張を作りました。 機能はシンプルで、 Datadog Log Explorer を開いている状態で拡張のアイコンをクリックすると、現在の検索クエリに対応する Snowflake SQL を生成してくれます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/nato9598/20251204/20251204151522.png)

Chrome 拡張 の様子

### 使い方

1.  Datadog Log Explorer で調査を開始
2.  フィルターを使って目的のログを絞り込む
3.  「1 週間前のデータも見たい」となったら Chrome 拡張をクリック
4.  生成された SQL を Snowflake にコピペ
5.  日付範囲を調整して実行

つまり、**Datadog Log Explorer の快適な検索体験をそのままに、Snowflake のデータにもアクセスできる**というわけです。

### 実装のポイント

実装はシンプルです

Datadog Log Explorer の URL には検索クエリと時間範囲がパラメータとして入っています。

https://example.datadoghq.com/logs?query=service%3Aapi%20%40user\_id%3A123&from\_ts=1700000000000&to\_ts=1700100000000

これをパースして、クエリ文字列と時間範囲を抽出します。

そして dbt のモデル定義を参考に、Datadog の attribute 名が Snowflake のどのカラムに対応するかをマッピングします。 UI でアクセスログか通常ログかを選択できるようにし、それぞれでクエリ先のテーブルとカラムマッピングが切り替わるといった具合です。

Claude Code に頼んで 1 時間程度で作成できました（アイコンは Gemini 製）。

## 展開：社内 Chrome ウェブストアへ

LayerX には社内向け Chrome 拡張専用の GitHub リポジトリがあり、そこでみんなが作った拡張が共有され誰でも利用できます。 さらに[社内向けの Chrome ウェブストア](https://developer.chrome.com/docs/webstore/cws-enterprise?hl=ja#private-cws)があり、社員に簡単に Chrome 拡張を共有できる環境が整っています。

さっそく自分の拡張も公開してもらいました！

## おわりに

今回はコスト最適化のために失われた利便性を、ちょっとした工夫でカバーしたというお話でした。

Snowflake への連携や、社内向け Chrome ウェブストアなど、LayerX には日々の業務効率化をやりやすくする環境が揃っています。 入社して間もないですが、「もっとこうしたい」を形にしやすい環境だなとひしひしと感じています。

業務改善が好きな方、Chrome 拡張好きな方、データパイプラインに興味ある方等々、ぜひお話ししましょう！

明日の記事もお楽しみに。