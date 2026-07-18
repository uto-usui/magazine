---
title: "Langfuse トレース取り込み処理の改善による ClickHouse の負荷低減"
source: "https://tech.layerx.co.jp/entry/langfuse-clickhouse-read-skip"
publishedDate: "2026-07-16"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "yuu2634"
---

バクラク事業部 Platform Engineering 部 SRE グループの [uehara](https://x.com/m_on_yu) です。

LayerX のバクラクでは、LLMOps プラットフォームとして Langfuse を採用しています。また、Langfuse のストレージとして ClickHouse を使用しており、いずれもセルフホストで運用中です。詳細については、以下の記事も合わせてご覧ください。

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/2025/05/02/123428) [tech.layerx.co.jp](https://tech.layerx.co.jp/entry/deep-dive-clickhouse)

バクラク内で LLM を用いた機能が増えてきた頃、Langfuse へのトレース記録遅延が目立つようになりました。

お客様の利用に直接影響する事象ではありませんが、ピーク時はトレースの反映まで1日近くかかることもあり、プロンプト変更後のモニタリングや改善作業にも影響が出ている状況でした。

参考までに、トレースが取り込まれるまでの流れは以下の通りです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20260715/20260715143330.png)

-   クライアントから Langfuse へトレースが送信される
-   Langfuse はジョブを Redis キューへ積む
-   Langfuse worker がジョブを取り出しトレースを永続化

当時の Redis メモリ使用率は次の通りで、アイテム数の急増に伴ってメモリ使用率が上昇しており、処理遅延に伴う滞留が確認できます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20260715/20260715113735.png)

Redis メモリ使用率

キューを処理する Langfuse worker は CPU を使い切れておらず、流量が増える日中は 30% 台で頭打ちになりました。書き込み先ストレージである ClickHouse も CPU 60% 前後で頭打ちの状況です。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20260715/20260715113731.png)

Langfuse worker CPU 使用率

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20260715/20260715113727.png)

ClickHouse CPU 使用率

一方で、EFS DataReadIOBytes が大幅に増えていることも判明しました。処理の内容はトレースの書き込みですが、EFS で増えているのは読み取りという少し不思議な状況です。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20260715/20260715113723.png)

EFS DataReadIOBytes

## Langfuse トレース取り込み処理の概要

まずは Langfuse worker のトレース取り込み処理を調査しました。説明簡略化のために、本記事では以下のように用語を使い分けます。

-   プロジェクト: トレースの保管先。バクラクではプロダクトや機能単位で切っています
-   トレース: LLM アプリケーションの1リクエスト/1操作に相当する記録単位
-   イベント: トレースの作成/更新など SDK から送信されるデータ。Observation の種別である「Event」とは別です
-   レコード: ClickHouse に書き込まれる1行。同一トレースに対する複数イベントをマージした結果

トレース取り込みの流れをもう少し詳しく見てみると、次の処理が行われています。

1.  クライアント SDK からイベントが送信される
2.  イベント情報を S3 へ保存し、worker 用のジョブを Redis に積む
3.  worker がジョブを受け取り、S3 から同一トレースのイベント情報を全取得してマージ
4.  **ClickHouse を検索し、同一トレースの既存レコードがあれば新イベント情報とマージ**
5.  マージ結果を1レコードとして ClickHouse へ書き込んで永続化

トレースを保管する際、S3 のイベント情報や ClickHouse の既存レコードとマージする点が重要です。特に4番の処理では、ClickHouse に対して以下のクエリが発行されます。

> ```
> SELECT *
> FROM ${table}
> WHERE project_id = {projectId: String}
> AND id = {entityId: String}
> ${additionalFilters.whereCondition}
> ORDER BY event_ts DESC
> LIMIT 1 BY id, project_id SETTINGS use_query_cache = false;
> ```
> 
> [https://github.com/langfuse/langfuse/blob/v3.119.0/worker/src/services/IngestionService/index.ts#L1310-L1318](https://github.com/langfuse/langfuse/blob/v3.119.0/worker/src/services/IngestionService/index.ts#L1310-L1318)

特定の1レコードを検索する処理で、クエリキャッシュの無効化オプションも付いています。これがイベント1件ごとに毎回発行されるため、膨大な件数の SELECT が走ることとなります。

ClickHouse はカラム単位の大量データ集計やスキャンには強い一方で、特定1レコードの検索や読み取りを大量に繰り返す処理は苦手としています。今回の処理遅延の要因はこの SELECT クエリの増加にありました。

## SELECT クエリのスキップによる負荷軽減

Langfuse worker にはこの SELECT クエリをスキップするための環境変数 `LANGFUSE_SKIP_INGESTION_CLICKHOUSE_READ_MIN_PROJECT_CREATE_DATE` が用意されています。

> ```
> // Set a date after which S3 was active. Projects created after this date do
> // perform a ClickHouse read as part of the ingestion pipeline.
> LANGFUSE_SKIP_INGESTION_CLICKHOUSE_READ_MIN_PROJECT_CREATE_DATE: z
>   .string()
>   .date()
>   .optional(),
> ```
> 
> [https://github.com/langfuse/langfuse/blob/v3.119.0/worker/src/env.ts#L130-L135](https://github.com/langfuse/langfuse/blob/v3.119.0/worker/src/env.ts#L130-L135)

この環境変数には `YYYY-MM-DD` 形式で日付を指定します。指定日以降に作成されたプロジェクトの場合、ClickHouse からの SELECT クエリがスキップされる仕様です。

本設定が用意された背景として、Langfuse v2 と v3 でトレースの取り込み処理が大幅に異なる点があります。v2 ではイベント情報を PostgreSQL へ直接書き込んでいましたが、v3 からは S3 を経由した非同期処理となりました。

v2 から v3 へ更新した環境では、PostgreSQL 上のデータが ClickHouse へ移行されるものの、S3 には v2 時代のイベント情報が残っていません。つまり、v2 時代に作成されたプロジェクトでトレースを更新する場合、S3 に加えて ClickHouse のレコードも含めてマージする必要があります。

しかし、弊社では運用開始時点から v3 を利用しており、S3 に全イベント情報が保存 [\*1](#f-a4466eea "保存先バケットでオブジェクトを削除するライフサイクルルールは設定していません") されています。全プロジェクトで ClickHouse の SELECT クエリをスキップできるため、環境変数には「Langfuse 運用開始日より前の日付」をセットしました。

## 設定変更後の効果

ClickHouse への SELECT クエリを止めたところ、すぐに効果が現れました。

Redis のメモリ使用率を見ると、滞留解消に伴ってアイテム数が減り、メモリ使用率も急減しました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20260715/20260715115727.png)

Redis メモリ使用率 (設定変更後)

後続処理が詰まって 30% 台で頭打ちになっていた Langfuse worker も、滞留したジョブを一気に捌いたあとは従来の半分以下の負荷に落ち着いています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20260715/20260715115732.png)

Langfuse worker CPU 使用率 (設定変更後)

ClickHouse は CPU 使用率が一桁台まで急減し、リソースに余裕が生まれました。この状態で安定的に運用できたこともあり、後日にはタスクのスケールダウンによりコストを最適化できています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20260715/20260715115740.png)

ClickHouse CPU 使用率 (設定変更後)

EFS の DataReadIOBytes も、休日や深夜の閑散時間帯と同程度の負荷に落ち着きました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20260715/20260715115736.png)

EFS DataReadIOBytes (設定変更後)

## まとめ

Langfuse トレース取り込みの処理遅延について調査し、ClickHouse への SELECT 処理をスキップすることで解消しました。

行った変更自体は環境変数を1つ追加したのみですが、ClickHouse の苦手とするワークロードを取り除くことで、取り込み処理を大幅に高速化できました。運用チューニングの一事例として参考になりましたら幸いです。

* * *

今回はセルフホストならではの深堀り事例でしたが、弊社では要件に応じてマネージドサービスも積極的に活用しています。

バクラク事業部の SRE チームでは、こうした技術選定からパフォーマンス改善、開発プラットフォームの整備まで一緒に取り組める仲間を探しています。少しでもご興味のある方は、ぜひお話させてください！

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/0cc0b754363d428eaca0f2d9922c941c) [open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/52741)

* * *

### AIカンファレンス「Bet AI Day 2026」を開催します！

AIは「使う」段階から「共に働く」段階へ。 2回目となる「Bet AI Day 2026」は"AIエージェントと働く未来に、Betしよう"のメッセージを軸に、LayerXにおけるAIエージェント活用の実践知などを余すことなく共有します。

昨年同様にオンラインでも開催しますので、全国どこからでも、PCやスマートフォンからお気軽にご視聴いただけます。AIエージェントと働く未来について興味のある方、ぜひ「Bet AI Day 2026」にご参加ください！

「Bet AI Day 2026」開催概要  
開催日：2026年9月3日（木）12:00 開演  
開催方法：オンライン配信  
参加費：無料（事前申込制）  
お申し込み（connpass）：[https://layerx.connpass.com/event/399169/](https://layerx.connpass.com/event/399169/)

[\*1](#fn-a4466eea):保存先バケットでオブジェクトを削除するライフサイクルルールは設定していません