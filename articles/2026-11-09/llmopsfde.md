---
title: "【LLMOps】FDEの開発を支えるトレーシング基盤の開発"
source: "https://developers.cyberagent.co.jp/blog/archives/67361/"
publishedDate: "2026-11-09"
category: "frontend"
feedName: "CyberAgent Developers Blog"
author: "技術 / クリエイティブ広報"
---

## はじめに

こんにちは、AI Shift AIチームの林崎 ([@u\_hyszk](https://x.com/u_hyszk)) です。

AIエージェントを導入した後に「そろそろ評価をして改善に繋げよう」となった段階で、評価に使うための実行履歴を集める基盤が整っていなかった...という経験はないでしょうか？実行履歴を集めようにも、どのようにすれば良いのかが分からず、優先順位が下がってしまった...という経験もないでしょうか？

本記事では、AI Workerを導入するお客様向けに、多様なAIエージェントやアプリケーションを開発する**FDE (Forward Deployed Engineer)** が、実行履歴を残して活用していくために作成した仕組みについてご紹介します。

![トレーシング基盤](https://static.zenn.studio/user-upload/4c4ebb1f17a5-20261029.png)  
_トレーシング基盤_

## 背景と課題

今回の開発を行うことになった経緯について、弊社プロダクト「AI Worker Platform」とFDEの働き方についての前提と課題感を踏まえて説明します。

## AI Worker PlatformとFDE

AI Shiftでは、業務プロセス全体をAI化するための統合プラットフォームとして「**AI Worker Platform**」というプロダクトを提供しています。

既存プロダクトである「[AI Worker VoiceAgent](https://www.aiworker.jp/voiceagent/)」と比較して、

-   扱う業務領域 (バックオフィス業務・営業支援・データ分析など) が極めて広く、深い理解が必要になる
-   個別で必要となるシステム連携 (社内システム・外部API・データベースなど) が複雑

のような課題があります。これらの課題を解決することは、単なるSaaSプロダクトの提供のみでは困難です。

そこで弊社では、**FDE職** を新設[\[1\]](#fn-b40e-1)し、お客様の業務に徹底的に向き合ったソリューションの提供を目指してきました。AI ShiftのFDEは、**お客様の業務に深く入り込み、技術でAI x DXを成功に導くこと**をミッションに以下のような業務を担っています。

-   お客様の業務分析と課題の特定
-   AIの導入計画や技術設計
-   AI Worker Platformや外部システムとの連携実装
-   導入後の運用支援と効果測定
-   プロダクトへのフィードバックの提供

最近では、お客様に提供する価値を最大化するために、AI Worker Platformを利用するだけでなく、FDEが個別に実装を行う機会も増えています。AI ShiftのFDEは生成AIをフル活用して開発プロセスのほぼ全ての作業を自動化し、お客様の課題に向き合うことに集中しています。

## 評価と改善のための実行履歴を集める

AIチームのミッションの一つは、FDEが多様なAIエージェントやアプリケーションを開発していく中で、どのようにAIエージェントの出力品質を守り、お客様へ費用対効果を示していくことです。本記事では、その中でも評価と改善の前提となる「**実行履歴を集める**」部分を扱います。

AIエージェントを導入した後に評価・改善するためには、AIエージェントがどう動いたかに関する実行履歴が必要になります。[Langfuse](https://langfuse.com/)や[Arize Phoenix](https://arize.com/docs/phoenix/documentation/jp)などの多くのLLMエンジニアリングプラットフォームでは、[OpenTelemetry](https://opentelemetry.io/ja/)という**オブザーバビリティ (可観測性)** を実現するためのフレームワークを用いて、**テレメトリー**と呼ばれるデータを収集しています。主要な用語は以下の通りです。

-   **テレメトリー** (Telemetry): システムやその動作から送出されるデータ。後述するトレースの他に、可用性やパフォーマンスの測定値である**メトリクス**や、タイムスタンプ付きのテキストレコードである**ログ**で構成される。
-   **トレース** (Trace): 1リクエストの処理全体を木構造で記録したもの。
-   **スパン** (Span): トレースの中の1つの作業や操作の単位。

テレメトリーを収集するためには、対象となるアプリケーションに対しテレメトリーデータを出力させるためのコードを組み込む「**計装**」を行う必要があります。

## 楽に・確実に実行履歴を集めるために

AIエージェントの評価・改善を行うためには、実行履歴が収集されていることが必要不可欠です。早期に実行履歴が収集されていれば、評価のための要件整理をスムーズに行うことができることも期待されます。

その一方、顧客課題の解決に集中すべきFDEにとっては、**計装の優先順位は下がることが多い**です。計装がなくても作成したアプリケーションは正常に動作するため緊急度が低いことに加え、計装の入れ方についても都度判断が必要になり負担が大きいためです。

このような背景から

1.  構築したアプリケーションでの実行履歴の収集漏れをなくす
2.  収集方法を標準化する
3.  FDEの開発体験を向上させ、顧客課題の解決に集中できるようにする

ために、実行履歴を収集する方法を仕組み化する必要があると判断しました。

今回構築したシステムの全体像は以下の通りです。

![トレーシング基盤](https://static.zenn.studio/user-upload/4c4ebb1f17a5-20261029.png)  
_トレーシング基盤 (再掲)_

LLMを呼び出すときには**LLM Gateway**を使ってもらい、**インフラレベルでテレメトリーを収集する**形にしました。また、LLM Gatewayだけでは収集できない業務上の意味が含まれるデータに関しては**SDKとSkillによる手動計装**を行うようにしています。収集したテレメトリーはOpenTelemetry Collectorに集約され、その後、LLM呼び出しに関連するテレメトリーのみがLLMエンジニアリングプラットフォームであるLangfuseに送信されます。

## LLM Gatewayによるテレメトリーの自動送出

LLMを呼び出すときには**LLM Gateway**を使ってもらう形にしました。このLLM Gatewayで入出力・モデル名・トークン数などを記録し、テレメトリーをOpenTelemetry Collectorに自動送出します。その後、LLM呼び出しに関連するテレメトリーだけをLangfuseに送出します。

このように、LLM Gatewayでインフラレベルでの収集を行うことによって、計装するかどうかの判断をFDEに委ねることなく、**自動的にテレメトリーデータを収集する**ことが可能になります。

今回はLLM Gatewayとして[**Agent Router**](https://www.agent-router.org/) (旧Envoy AI Gateway) を使用します。Agent RouterではOpenTelemetryによるトレーシングをサポートしており、環境変数を指定することによって使用することができます。Docker Composeでの設定例は以下の通りです。

docker-compose.yaml

```
services:
  aigw:
    image: docker.io/envoyproxy/ai-gateway-cli:v1.1.0
    command: run
    ports:
      - 127.0.0.1:1985:1975
    environment:
      OPENAI_API_KEY: ${OPENAI_API_KEY:-}
      OTEL_SERVICE_NAME: aigw
      OTEL_TRACES_EXPORTER: otlp
      OTEL_METRICS_EXPORTER: none
      OTEL_LOGS_EXPORTER: none
      OTEL_EXPORTER_OTLP_ENDPOINT: http://otel-collector:4318
      OTEL_EXPORTER_OTLP_PROTOCOL: http/protobuf
      AI_GATEWAY_TRACING_SEMCONV: openinference
    depends_on:
      - otel-collector
```

### LLM Gatewayでの計装の課題

LLM Gatewayによるテレメトリー収集は便利である一方、**アプリケーションでの業務上の意味付けが必要なデータが収集できない**という課題があります。具体的には以下のようなデータを収集することができません。

-   アプリケーション内での処理の繋がりを示すヘッダー (`traceparent`)
-   検索・ツール・順位付けなどのLLMの使用用途を表すデータ
-   ユーザー・セッションを表すメタデータやタグ

1つ目に関しては、アプリケーション側がコンテキスト伝播をしない影響でLLM Gatewayは毎回新しいトレースを生成し直すので、1回のLLM呼び出しごとに深さ1の独立したトレースが生成されてしまう問題があります。複雑なユースケースではデータ分析や評価が困難になります。

業務上での意味付けが必要なデータに関しては、原理的にLLM Gatewayでの収集が難しいため、SDKとSkillによる手動計装も併用することにしました。

## Tracing SDKとSkillによる手動計装

LLM Gatewayが作るトレースに対して、業務上での意味付けを行うことを目的として、**専用のTracing SDK**を開発しました。このSDKのスコープは以下の通りです。

-   LLM Gatewayとの連携
-   業務上の意味を考慮したトレースの構造化と標準化
-   LLMの使用用途を表すデータの付与と伝播
-   ユーザー・セッション識別子などのメタデータ・タグの付与と伝播

LLM呼び出し自体の計装はLLM Gatewayが担うためスコープ外としています。このSDKを通して計装してもらうことにより、分析や評価に使いやすい高品質なデータを収集することが可能になります。

Python・TypeScriptでのSDK使用例は以下の通りになります。

example.py

```
+from ais_tracing import tracer

@app.post("/review")
async def review(body: dict) -> dict:
+   with tracer.trace(
+       "review",
+       input={"question": body["question"]},
+       user_id=body["user_id"],
+       session_id=body["session_id"],
+   ) as root:
        answer = await ask_gateway(body["question"], docs)
+       root.update(output={"answer": answer})
        return {"answer": answer, "observation_id": root.observation_id}
```

example.ts

```
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
+import { tracer } from '@ais/tracing'

const app = new Hono()

app.post('/review', async (c) => {
  const { question, sessionId } = await c.req.json()

+ return tracer.trace(
+   'review',
+   { input: { question }, userId: c.get('userId'), sessionId },
+   async (root) => {
      const gw = await fetch(`${process.env.GATEWAY_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-4o-mini', messages: buildMessages(question, docs) }),
      })
      const answer = (await gw.json()).choices[0].message.content
+     root.update({ output: { answer } })
      return c.json({ answer, observationId: root.observationId })
    },
  )
})

serve({ fetch: app.fetch, port: 8080 })
```

さらに、FDEの開発負荷を下げるため、Tracing SDKによる計装を行うための**AIエージェント用のSkill**を作成しました。このSkillを使用することで、コーディングAIに計装を任せることができ、実装負荷が大きく下がります。

このように仕組み化を行うことにより

1.  **LLM Gatewayによって**収集漏れがなくなる
2.  **SDKとSkillによって**計装が標準化される
3.  **SDKとSkillによって**FDEの開発体験が向上する

ことになり、一連の目的が達成されます。

## 使用例

この仕組みを使うことによって、実際にどのようなデータが得られるかを紹介します。以下の画像は実際のLangfuseの画面になります。

デモとしてFAQの検索を行なって回答するAIエージェントを作成しました。入力クエリはLLMによる簡易的なガードレールを入れ、出力に対してはLLM-as-a-Judgeによる評価を入れています。

![Langfuseの画面](https://static.zenn.studio/user-upload/9f955a06563f-20261027.png)  
_Langfuseの画面_

LLMの呼び出しが綺麗に構造化された形で収集できていることが分かります。また、SDKでメタデータなどの付与を行なったことにより、ユーザー・セッションの情報や、LLMが何の目的で呼び出されたか (ガードレール・評価など) も可視化されています。

![Langfuseの画面](https://static.zenn.studio/user-upload/cbb90d1a5150-20261028.png)  
_Langfuseの画面 (詳細)_

このように整理された形でデータを収集することにより、その後のエージェントの評価やデータ分析に活かしやすくなります。万が一、SDKによる計装を入れ忘れたとしても、LLMの呼び出しだけはLLM Gatewayで記録されているので、最低限のデータ分析や評価の要件定義は行うことができます。

## 終わりに

本記事では、AI Workerを導入するお客様向けに、多様なAIエージェントやアプリケーションを開発するFDEが、実行履歴を残して活用していくために作成した仕組みについてご紹介しました。

コーディングAIが普及して開発が高速化・多様化した現代において、実行履歴の収集を含むLLMOps・AgentOpsを実践していくことがますます困難になっていると感じています。直近ではLoglassさんも近い発表をされており[\[2\]](#fn-b40e-2)、弊社のみならず共通の課題であると考えている次第です。

エージェントの評価や実行履歴の収集に困った際に参考にしていただければ幸いです！  
ご覧いただきありがとうございました👻

脚注

1.  [https://www.ai-shift.co.jp/techblog/6585](https://www.ai-shift.co.jp/techblog/6585) [↩︎](#fnref-b40e-1)
    
2.  [https://speakerdeck.com/kanfab1/20260914-ai-ejento-jidai-no-platform-engineering-llm-kiban-to-purodakuto-no-sekimu-kyoukaisen](https://speakerdeck.com/kanfab1/20260914-ai-ejento-jidai-no-platform-engineering-llm-kiban-to-purodakuto-no-sekimu-kyoukaisen) [↩︎](#fnref-b40e-2)
    

[![AI Shift Tech Blog](https://static.zenn.studio/user-upload/avatar/8a4406ce0e.jpeg)](https://developers.cyberagent.co.jp/p/aishift)

株式会社AI Shift (サイバーエージェント100％子会社) のTech Blogです。