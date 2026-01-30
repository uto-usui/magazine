---
title: "Temporal における実行境界を超えるコンテキスト伝搬の仕組み"
source: "https://tech.layerx.co.jp/entry/temporal-context-propagation"
publishedDate: "2025-12-14"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "shibu526"
---

この記事は、[LayerX Tech Advent Calendar 2025](https://tech.layerx.co.jp/entry/tech-advent-calendar-2025) の 14 日目の記事です。

こんにちは、LayerX バクラク事業部 Platform Engineering 部 Enabling グループに新卒入社した  [shibutani](https://x.com/s_k_526)  と申します。

弊社では AI エージェント基盤を中心として、ワークフローエンジンである[Temporal](https://temporal.io/)を活用しています。本記事では、Temporal において実行境界を超えてリクエストを通じて一貫したデータ（以後コンテキストと呼ぶ）を伝搬する方法について、Go SDK と TypeScript SDK の両方の実装方法を解説します。

## 背景：なぜコンテキスト伝搬が必要なのか

プロダクト開発においては、Observability の担保として、ログやテレメトリ送信の仕組みを整備する必要があります。その際にトレース ID やテナント ID など、リクエストのコンテキスト情報を扱わなければいけません。

Temporal は、**Client**（ワークフローを起動する側）、**Workflow**（ビジネスロジックを定義する処理）、**Activity**（実際のタスクを実行する処理）という 3 つの要素で構成されます。

このうち、Workflow と Activity は Worker と呼ばれる専用のプロセス上で動作しますが、Durable であるという特性上、同一のプロセスで実行されることは保証されません。 また、Client とこれら 2 つの構成要素はネットワーク的に分離しています。 これらのことから、通常使用される`context.Context`のような仕組みによって、コンテキストを伝搬することはできません。

そのため、各言語ごとにコンテキスト伝搬を行う仕組みを検討する必要があります。

## Go SDK におけるコンテキスト伝搬

Go SDK では、`ContextPropagator`というインターフェースで提供される機能によってコンテキスト伝搬を実現します。このインターフェースは、`context.Context`および`workflow.Context`のデータを、実行境界を超えて伝搬するための枠組みを提供しています。

## ContextPropagator インターフェース

公式が提供するインターフェースは以下の通りです：

type ContextPropagator interface {
    Inject(context.Context, HeaderWriter) error
    Extract(context.Context, HeaderReader) (context.Context, error)
    InjectFromWorkflow(Context, HeaderWriter) error
    ExtractToWorkflow(Context, HeaderReader) (Context, error)
}

各メソッドの役割を整理すると：

-   **Inject**: Client が Workflow を呼び出す際に呼ばれる。`context.Context`からリクエストヘッダーにデータを書き込む。
-   **ExtractToWorkflow**: Workflow 開始時に呼ばれる。リクエストヘッダーから`workflow.Context`へデータを抽出する。これによって Workflow 内でデータにアクセス可能になる。
-   **InjectFromWorkflow**: Workflow が Activity を呼び出す際に呼ばれる。`workflow.Context`からリクエストヘッダーにデータを書き込む。
-   **Extract**: Activity 開始時に呼ばれる。リクエストヘッダーから Activity で利用する`context.Context`へデータを抽出する。これによって Activity 内でデータにアクセス可能になる。

なお、`workflow.Context`は Workflow 内で利用可能な特殊な Context で、基本的には通常の`context.Context`と同じインターフェイスを提供しています。

## 実装例：テナント ID の伝搬

実際にテナント ID を伝搬するカスタムプロパゲーターを実装してみましょう。

### 1\. ContextPropagator の実装

まず、`ContextPropagator`インターフェースを実装します。

type contextKey string
const TenantIDKey contextKey = "tenant-id"

type TenantPropagator struct{}

func NewTenantPropagator() \*TenantPropagator { return &TenantPropagator{} }

func (p \*TenantPropagator) Inject(ctx context.Context, writer workflow.HeaderWriter) error {
    if tenantID, ok := ctx.Value(TenantIDKey).(string); ok {
        
        payload, err := converter.GetDefaultDataConverter().ToPayload(tenantID)
        if err != nil {
            return err
        }
        writer.Set(TenantIDKey, payload)
    }
    return nil
}

func (p \*TenantPropagator) ExtractToWorkflow(ctx workflow.Context, reader workflow.HeaderReader) (workflow.Context, error) {
    if payload, ok := reader.Get(TenantIDKey); ok {
        var tenantID string
        if err := converter.GetDefaultDataConverter().FromPayload(payload, &tenantID); err != nil {
            return ctx, err
        }
        ctx = workflow.WithValue(ctx, TenantIDKey, tenantID)
    }
    return ctx, nil
}

func (p \*TenantPropagator) InjectFromWorkflow(ctx workflow.Context, writer workflow.HeaderWriter) error {
    if tenantID, ok := ctx.Value(TenantIDKey).(string); ok {
        payload, err := converter.GetDefaultDataConverter().ToPayload(tenantID)
        if err != nil {
            return err
        }
        writer.Set(TenantIDKey, payload)
    }
    return nil
}

func (p \*TenantPropagator) Extract(ctx context.Context, reader workflow.HeaderReader) (context.Context, error) {
    if payload, ok := reader.Get(TenantIDKey); ok {
        var tenantID string
        if err := converter.GetDefaultDataConverter().FromPayload(payload, &tenantID); err != nil {
            return ctx, err
        }
        ctx = context.WithValue(ctx, TenantIDKey, tenantID)
    }
    return ctx, nil
}

### 2\. Client でのプロパゲーター設定

Temporal クライアントのインスタンス化時にプロパゲーターを登録します。

func main() {
    c, \_ := client.Dial(client.Options{
        HostPort: "localhost:7233",
        ContextPropagators: \[\]client.ContextPropagator{
            propagator.NewTenantPropagator(),
        },
    })
    defer c.Close()

    ctx := context.WithValue(context.Background(), "tenant-id", "tenant-12345")

    we, \_ := c.ExecuteWorkflow(ctx, client.StartWorkflowOptions{
        ID:        "echo-workflow",
        TaskQueue: "echo-task-queue",
    }, workflow.EchoWorkflow, "Hello")
}

### 3\. Workflow での利用

Workflow 内では、`workflow.Context`から伝搬されたデータを取得できます。

func EchoWorkflow(ctx workflow.Context, name string) (string, error) {
    if tenantID, ok := ctx.Value("tenant-id").(string); ok {
        logger.Info("🟠 \[Workflow\] TenantID received", "tenant\_id", tenantID)
    }

    workflow.ExecuteActivity(ctx, EchoActivity, name)
    return nil, nil
}

### 4\. Activity での利用

Activity 内では、通常の`context.Context`から伝搬されたデータを取得できます。

func EchoActivity(ctx context.Context, name string) (string, error) {
    if tenantID, ok := ctx.Value("tenant-id").(string); ok {
        logger.Info("🟡 \[Activity\] TenantID received", zap.String("tenant\_id", tenantID))
        return nil, nil
    }
    return nil, nil
}

### 実行結果

実際に実行すると、以下のようにテナント ID が Client → Workflow → Activity と伝搬されることが確認できます。

$ go run cmd/starter/main.go

# ログ
🟠 \[Workflow\] TenantID received: tenant-12345
🟡 \[Activity\] TenantID received: tenant-12345

## TypeScript SDK におけるコンテキスト伝搬

TypeScript SDK では、Go SDK のような公式のコンテキスト伝搬の仕組みは提供されていません。そこで、弊社では、以前のブログ記事「[TypeScript の AsyncLocalStorage を活用したリクエストスコープな情報管理](https://tech.layerx.co.jp/entry/2025/11/04/193215)」で紹介した AsyncLocalStorage と Temporal が提供する Interceptor を活用したコンテキスト伝搬の仕組みを構築しています。

## AsyncLocalStorage の準備

まず、コンテキスト情報を保持するための AsyncLocalStorage を準備します。

import { AsyncLocalStorage } from "node:async\_hooks";

interface WorkflowContext {
  tenantId?: string;
}

export const storage = new AsyncLocalStorage<WorkflowContext\>();

## Client Interceptor の実装

Client Interceptor では、AsyncLocalStorage に含まれるデータを Temporal のヘッダーに変換します。Temporal が提供する`PayloadConverter`を使用してデータをシリアライズします。

const propagatableHeaderPrefix = "propagate-";

export function createClientContextPropagatorInterceptor(): WorkflowClientInterceptor {
  return {
    start(input, next) {
      const context = storage.getStore();
      const headers = { ...input.headers };

      if (context?.tenantId) {
        headers\[\`${propagatableHeaderPrefix}tenantId\`\] =
          defaultPayloadConverter.toPayload(context.tenantId);
      }

      return next({ ...input, headers });
    },
  };
}

`defaultPayloadConverter`は Temporal が提供するデフォルトの PayloadConverter で、`Uint8Array`や JSON シリアライズ可能なオブジェクトをサポートしています。より複雑なデータ構造（例：Protobuf）を扱う場合は、カスタムの PayloadConverter を実装する必要があります。

## Workflow Interceptor の実装

Workflow Interceptor では、Workflow 実行時にヘッダーからデータを取り出し、Workflow 内で利用できるようにします。さらに、Activity を Schedule するタイミングで再度ヘッダーに挿入します。

const propagatableHeaderPrefix = "propagate-";

function createWorkflowContextPropagatorInterceptor(): WorkflowOutboundCallsInterceptor &
  WorkflowInboundCallsInterceptor {
  const wfCtx: Record<string, unknown\> = {};

  return {
    execute(input, next) {
      for (const \[key, payload\] of Object.entries(input.headers)) {
        if (payload && key.startsWith(propagatableHeaderPrefix)) {
          wfCtx\[key\] = defaultPayloadConverter.fromPayload(payload);
        }
      }
      return next(input);
    },

    scheduleActivity(input, next) {
      const headers = { ...input.headers };
      for (const \[key, value\] of Object.entries(wfCtx)) {
        if (value != null) {
          headers\[key\] = defaultPayloadConverter.toPayload(value);
        }
      }
      return next({ ...input, headers });
    },
  };
}

## Activity Interceptor の実装

Activity Interceptor では、ヘッダーから取り出したデータを AsyncLocalStorage にセットします。

const propagatableHeaderPrefix = "propagate-";

export function createActivityContextPropagatorInterceptor(): ActivityInboundCallsInterceptor {
  return {
    execute(input, next) {
      const context: WorkflowContext = {};

      for (const \[key, payload\] of Object.entries(input.headers)) {
        if (payload && key.startsWith(propagatableHeaderPrefix)) {
          const name = key.substring(propagatableHeaderPrefix.length);
          const value = defaultPayloadConverter.fromPayload(payload);
          if (name === "tenantId" && typeof value === "string") {
            context.tenantId = value;
          }
        }
      }

      return storage.run(context, () \=> next(input));
    },
  };
}

これにより、Activity 内で`storage.getStore()`を呼び出すことで、伝搬されたコンテキスト情報にアクセスできるようになります。

## 利用例

実際の利用コードは以下のようになります。

const client = new Client({
  interceptors: { workflow: \[createClientContextPropagatorInterceptor()\] },
});

await storage.run({ tenantId: "tenant-12345" }, async () \=> {
  
  const result = await client.workflow.execute(echoWorkflow, {
    taskQueue: "echo-task-queue",
    workflowId: "echo-workflow-123",
    args: \["Temporal User"\],
  });
  console.log(result); 
});

export async function echoWorkflow(name: string): Promise<string\> {
  const { echoActivity } = proxyActivities();
  return await echoActivity(name);
}

export async function echoActivity(name: string): Promise<string\> {
  
  const context = storage.getStore();
  if (context?.tenantId) {
    return \`Echo: ${name} (Tenant: ${context.tenantId})\`;
  }
  return \`Echo: ${name}\`;
}

## まとめ

本記事では、Temporal における実行境界を超えるコンテキスト伝搬について、Go SDK と TypeScript SDK の両方の実装方法を解説しました。

**Go SDK**では、公式が提供する`ContextPropagator`インターフェースを実装することで、標準的な枠組みでコンテキスト伝搬が実現可能です。

**TypeScript SDK**には、公式のサポートがないため、独自の仕組みが必要です。本記事では AsyncLocalStorage と Interceptor を組み合わせた方法を紹介しました。

Temporal を使った開発において、Observability を担保する上で役立つ実装パターンですので、ぜひ皆さんも試してみてください！