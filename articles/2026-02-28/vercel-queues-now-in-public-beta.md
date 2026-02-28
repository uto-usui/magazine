---
title: "Vercel Queues now in public beta"
source: "https://vercel.com/changelog/vercel-queues-now-in-public-beta"
publishedDate: "2026-02-27"
category: "frontend"
feedName: "Vercel"
author: "Joe Haddad"
---

1 min read

Feb 27, 2026

[Vercel Queues](https://vercel.com/docs/queues) is a durable event streaming system built with [Fluid compute](https://vercel.com/docs/fluid-compute), and is now available in public beta for all teams. Vercel Queues also powers [Workflow](https://vercel.com/docs/workflow): use Queues for direct message publishing and consumption, Workflow for ergonomic multi step orchestration.

Functions need a reliable way to defer expensive work and guarantee that tasks complete even when functions crash or new deployments roll out. Queues makes it simple to process messages asynchronously with automatic retries and delivery guarantees, providing at-least-once delivery semantics.

How it works:

-   Messages are sent to a durable topic
    
-   The queue fans messages out to subscribed consumer groups.
    
-   Each consumer group processes messages independently.
    
-   The queue redelivers messages to consumer groups until successfully processed or expired.
    

**Publish messages from any route handler:**

app/api/orders/route.ts

```
import { send } from '@vercel/queue';export async function POST(request: Request) {  const order = await request.json();  const { messageId } = await send('orders', order);  return Response.json({ messageId });}
```

**Create a consumer:**

app/api/queues/fulfill-order/route.ts

```
import { handleCallback } from '@vercel/queue';export const POST = handleCallback(async (order, metadata) => {  console.log('Fulfilling order', metadata.messageId, order);  // await doAnythingAsync(order);});
```

**Configure the consumer group:**

vercel.json

```
{  "functions": {    "app/api/queues/fulfill-order/route.ts": {      "experimentalTriggers": [{ "type": "queue/v2beta", "topic": "orders" }]    }  }}
```

Adding a trigger makes the route private: it has no public URL and only Vercel's queue infrastructure can invoke it.

Vercel Queues is billed per API operation, starting at $0.60 per 1M operations, and includes:

-   Multiple AZ synchronous replication
    
-   At-least-once delivery
    
-   Customizable visibility timeout
    
-   Delayed delivery
    
-   Idempotency keys
    
-   Concurrency control
    
-   Per-deployment topic partitioning
    

Functions invoked by Queues in push mode are charged at existing [Fluid compute rates](https://vercel.com/docs/functions/usage-and-pricing).

Get started with the [Queues documentation](https://vercel.com/docs/queues).