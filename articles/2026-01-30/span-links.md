---
title: "異なる処理に関係性を持たせる、 Span Links を使った分散トレースの実装"
source: "https://tech.layerx.co.jp/entry/ai-agent-span-links"
publishedDate: "2025-12-18"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "joe_yuzupi"
---

こんにちは、LayerX Ai Workforce 事業部でテクニカルプロジェクトマネージャーをしている [joe](https://x.com/joe_yuzupi) です。

この記事は [LayerX Tech Advent Calendar 2025](https://tech.layerx.co.jp/entry/tech-advent-calendar-2025)、18日目の記事です。

今回は異なる処理に関係性を持たせる、Span Links を使った分散トレースの実装について紹介します。

## 前提条件

本記事では OpenTelemetry の Span Links について紹介をしますが、各用語に対しての説明を省略していることをご了承ください。

なるべく複雑な知識を要しない形での紹介ができるようにしておりますが、不安だという場合は以下のOpenTelemetry の公式ドキュメントにあるトレーシングの項目を参照してから本記事を読み進めることをおすすめします。 [https://opentelemetry.io/docs/specs/otel/overview/#tracing-signal](https://opentelemetry.io/docs/specs/otel/overview/#tracing-signal)

通常、分散トレースは親子関係を築いてトレーシングとしての形を表現しますが、基本的に同期的な処理を前提にしています。

しかし、実際のアプリケーションの世界では同期的な処理だけでなく非同期的な処理も多く存在します。 ここで紹介する非同期的な処理とは API がとあるタスク実行のリクエストを受け取ってキューなどを間に挟んで裏側で別のタスク実行ワーカーがその実際の処理を行うようなケースを想定しています。

その際に、単純な親子関係を築いたトレーシングを実装してしまうと、本来ユーザーには即時レスポンスをして裏側で別のワーカーが処理をしてくれるような構成の場合でも単一の処理のように見えてしまい、一連の処理としての関係性は見えるものの、本来それらは別の処理として見たいものになります。

「親子関係は作りたくない、でも関連性は追いたい」——そんなわがままを叶えてくれるのが Span Links です。

Span Links は親子関係は維持しないが、トレース同士の関係性を持たせるためのリンクを作成することができます。

[opentelemetry.io](https://opentelemetry.io/docs/concepts/signals/traces/#span-links)

## Span Links の実装

ここでは「API がジョブ投入（enqueue）し、別プロセスのワーカーが実処理（consume）する」構成を例に、Span Links を使って関連付ける実装パターンを紹介します。

sequenceDiagram
    autonumber
    participant Client
    participant API as API Server
    participant Queue as Message Queue<br/>(Redis/RabbitMQ)
    participant Worker as Worker Process

    Note over API,Worker: 異なるプロセス・異なるトレース

    rect rgb(200, 220, 255)
        Note right of Client: Trace A
        Client->>+API: POST /jobs
        activate API
        Note over API: Span A 開始<br/>trace\_id: abc123<br/>span\_id: span\_001

        API->>API: リクエスト検証

        API->>Queue: enqueue(job\_payload)<br/>+ trace\_context 埋め込み
        Note over Queue: job\_payload:<br/>{data: ...,<br/>trace\_id: "abc123",<br/>span\_id: "span\_001"}

        API-->>-Client: 202 Accepted<br/>{job\_id: "job\_123"}
        Note over API: Span A 終了
        deactivate API
    end

    Note over Queue: 非同期<br/>（時間差あり）

    rect rgb(255, 220, 200)
        Note right of Queue: Trace B（新規トレース）
        Queue->>+Worker: dequeue(job\_payload)
        activate Worker
        Note over Worker: Span B 開始<br/>trace\_id: xyz789<br/>span\_id: span\_002<br/>──────────────<br/>Span Link 作成<br/>→ trace\_id: abc123<br/>→ span\_id: span\_001

        Worker->>Worker: ジョブ実処理
        Worker->>Worker: 結果保存

        Note over Worker: Span B 終了
        deactivate Worker
    end

    Note over API,Worker: Span Link により<br/>Trace A と Trace B が関連付けられる

### 方針（どの Span を Link するか）

-   **API 側**: 「ジョブ投入」を表す Span（例: `job.enqueue`）を作る
-   **ワーカー側**: 新しいトレースとして `job.execute` を開始しつつ、API 側の SpanContext を **Link** として付与する

これにより、親子関係で 1 本のトレースに無理やり繋げずに、**「別トレースだが関係がある」**ことを追えるようになります。

### キューに載せる情報

Span Links を貼るには、相手側 Span の **SpanContext（trace\_id / span\_id など）** が必要です。 多くのケースでは、キューのメタデータ（メッセージ属性・ヘッダー）に以下を載せます。

-   **traceparent / tracestate**: 標準のコンテキスト伝搬（OpenTelemetry の propagator で inject/extract できる）
-   **producer の SpanContext**: Link 用（最小でも trace\_id / span\_id）

### Python の例

ワーカー側は「親なしで開始し、links に producer の SpanContext を渡す」ことがポイントです。 ここでは **W3C tracecontext（traceparent / tracestate）** をメッセージヘッダーに載せて伝搬し、ワーカー側で extract した SpanContext を Link に使います。

from dataclasses import dataclass, field
from typing import Dict, Any

from opentelemetry import propagate, trace
from opentelemetry.context import Context
from opentelemetry.trace import Link

@dataclass
class Message:
    body: Any
    headers: Dict\[str, str\] = field(default\_factory=dict)


tracer = trace.get\_tracer(\_\_name\_\_)

def enqueue\_job(job: dict) -> Message:
    
    with tracer.start\_as\_current\_span("job.enqueue"):
        msg = Message(body=job)
        propagate.inject(carrier=msg.headers)  
        return msg

def execute\_job(msg: Message) -> None:
    
    
    remote\_ctx = propagate.extract(carrier=msg.headers)
    producer\_sc = trace.get\_current\_span(remote\_ctx).get\_span\_context()

    
    
    with tracer.start\_as\_current\_span(
        "job.execute",
        context=Context(),  
        links=\[Link(producer\_sc)\],
    ):
        do\_work(msg.body)

def do\_work(job: dict) -> None:
    
    pass

## Ai Workforce での Span Links の活用

Ai Workforce では以下のようなアーキテクチャでAI Agentを実現しています。

12月16日に行われた[AI Engineering Summit Tokyo 2025](https://ai-engineering-summit-tokyo.findy-tools.io/2025)でもAI活用パネル展示にてアーキテクチャを展示させて頂き、そちらに提出した時のものになります。

graph LR
    subgraph frontend\["Frontend"\]
        NextJS\[Next.js<br/>Agentic Workflows UI<br/>チャットUI\]
    end
  subgraph azure\["Microsoft Azure"\]
   subgraph backend\_server\["Backend - API Server & Assistant Agent"\]
        subgraph backend\_api\["API"\]
            API\[API Server<br/>FastAPI<br/>REST API + SSE\]
        end

        subgraph backend\_assistant\["Assistant Agent"\]
            Assistant\[Assistant<br/>LLM処理 / ツール実行/ SSEイベント配信<br/>チャット応答生成\]
        end
     end
    
     subgraph infrastructure\["Infrastructure"\]
         direction LR
        DB\[(PostgreSQL<br/>データ永続化)\]
         LLM\[Azure OpenAI<br/>LLMサービス\]
         Blob\[Azure Blob Storage<br/>ファイル保存\]
         AISearch\[Azure AI Search<br/>検索サービス\]
     end
     
     subgraph redis\["Redis Streams"\]
      Redis\[(Redis Streams<br/>イベントバス)\]
   end
   
     subgraph backend\_orchestrator\["Backend - Orchestrator"\]
         Orchestrator\[Orchestrator<br/>ワークフロー実行エンジン<br/>タスク管理 / 状態管理\]
     end
  end
    
    
    NextJS <-->|"REST API / SSE"| API
    API <-->|"イベント発行/消費"| Redis<-->|"イベント発行/消費"| Assistant
    Redis <-->|"イベント発行/消費"| Orchestrator
    Orchestrator -->|"データ保存/取得"| DB
    Orchestrator -->|"データ検索"| AISearch
    Orchestrator -->|"データ保存/取得"| Blob
    Assistant -->|"ストリーミング"| LLM
    backend\_server -->|"データ保存/取得"| DB

    style NextJS fill:#90caf9,stroke:#1976d2,stroke-width:2px
    style API fill:#f48fb1,stroke:#c2185b,stroke-width:2px
    style Assistant fill:#ffe8d6,stroke:#ffb88c,stroke-width:2px
    style Redis fill:#ef5350,stroke:#c62828,stroke-width:2px
    style Orchestrator fill:#ba68c8,stroke:#7b1fa2,stroke-width:2px
    style DB fill:#81c784,stroke:#388e3c,stroke-width:1px
    style LLM fill:#81c784,stroke:#388e3c,stroke-width:1px
    style Blob fill:#81c784,stroke:#388e3c,stroke-width:1px
    style AISearch fill:#81c784,stroke:#388e3c,stroke-width:1px
    style azure stroke:#00BFFF,stroke-width:3px

今回ポイントとなるのは主に Assistant と Orchestrator です。

Assistant はユーザーとの対話、ワークフロー開始の仲介、LLM呼び出しの役割を担う、AI Agent の役割を持っています。

Orchestrator は Assistant から受け取ったワークフローの実行を行い、データの永続化、検索、ファイル保存などの役割を担っています。

これらは Redis Streams を介してやりとりを行っており、必要に応じて双方向でやりとりをしながら一連のワークフロー実行を行っています。

実装当初は、通常の分散トレースで実装していてトレースの流れとして見えていましたが、処理の流れが大きくなると１つのトレースが大きくなり、どこでどのような処理が行われているかがわかりにくくなってきました。

そこで、トレースとしては別のものとして扱いたいが、それらの関連性を持たせたいので Span Links を使って解決を試みました。

Ai Workforce ではオブザーバビリティの基盤として Datadog を利用しているため、Datadog のトレーシングとしてどうなっているかを見てみます。

今回はチャットからリクエストを受け取ってそのメッセージをワークフローの開始までを Trace A、ワークフローの実行を Trace B として実装しています。

#### Trace A 側のトレース

![](https://cdn-ak.f.st-hatena.com/images/fotolife/j/joe_yuzupi/20251214/20251214145456.png)

Trace A 側のトレースを見ると、Span Links が紐づけられていることが分かります。Foward という文字が見える通り、このトレースは Span Links においては呼び出し元となっています。

リンクになっており、紐づけられたトレースに遷移できるようになります。では次にTrace B 側のトレースを見て見ましょう。

#### Trace B 側のトレース

![](https://cdn-ak.f.st-hatena.com/images/fotolife/j/joe_yuzupi/20251214/20251214144843.png)

Trace B 側のトレースもみると、Span Links が紐づけられていることが分かります。Backward という文字が見える通り、このトレースは Span Links においては呼び出し先となっています。

また、Trace B 側のトレースからも、Trace A 側のトレースのSpanに遷移することもできるので双方向に参照できるような形になっています。

呼び出し元のTrace AのSpan側に遷移することもでき、どこのSpanから呼び出されたかを確認することができます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/j/joe_yuzupi/20251214/20251214143637.png)

### (余談)ワークフロー実行に失敗した際のトレースID

これは Span Links の実装自体には関係のない箇所ですが、ワークフローの実行に失敗した際に、以下の添付画像のように `ワークフローの処理中にエラーが発生しました。ID: <ID>` というメッセージが表示されるようになっています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/j/joe_yuzupi/20251214/20251214115012.png)

その ID をトレースから参照できるようにしており、サンプリング対象になっていることが前提条件になりますが、ID を起点として問題のあったワークフロー実行に関連のあったトレースを検索できるようにしています。

ちょっとした工夫でトレースの情報利便性が非常に上がるのでおすすめです。

### 注意点

AI Agent アプリケーションでは今回紹介したような連続する非同期的な処理が多くあるので、Span Links を使って関連付けることでの利便性は非常に高まると思います。

しかし、Span Linksを使った関連性が増えるということは逆説的には複雑性が増えることになります。そのため、Span Links を使った関連付けは必要な場合にのみ使うようにすることが重要だと考えています。

ただ、オブザーバビリティツールにはMCPサーバーなどの提供がされてきているため、Claude Code などのCoding Agentで分析をさせることでそれらの複雑性に対しての分析の負荷は減っているかもしれません。

OpenTelemetryの公式ドキュメントにも Best Practices が紹介されているのでそれらを確認してからSpan Links を使うかどうかを判断するということもオススメします。

[https://opentelemetry.io/docs/languages/dotnet/traces/links-creation/#best-practices](https://opentelemetry.io/docs/languages/dotnet/traces/links-creation/#best-practices)

## 終わりに

今回は Span Links の紹介と Ai Workforce の AI Agent を例にとって Span Links を使って関連付ける実装パターンを紹介しました。

Span Links はトレーシングの中でも重要な機能の一つであり、特に非同期的な処理が多いAI Agent アプリケーションでは非常に便利な機能です。 もし、Span Links を使った関連付けが必要な場合はぜひ試してみてください。

この記事は[LayerX Tech Advent Calendar 2025](https://tech.layerx.co.jp/entry/tech-advent-calendar-2025)の記事です。[LayerXテック公式X](https://x.com/layerx_tech)を是非フォローして見逃さないようにお願いします！！

最後に、Opendoor 今回のこと以外で AI Agent オブザーバビリティについて話したいことがあるなどあれば是非こちらからご連絡頂けると嬉しいです！

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/opendoor/293cdd370bae8094b50be2594fc11d76/)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/j/joe_yuzupi/20251217/20251217093844.png)