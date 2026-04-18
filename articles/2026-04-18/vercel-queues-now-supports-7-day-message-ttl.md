---
title: "Vercel Queues now supports 7-day message TTL"
source: "https://vercel.com/changelog/queues-now-supports-7-day-ttl"
publishedDate: "2026-04-01"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

1 min read

Apr 1, 2026

Vercel Queues now supports a maximum message TTL and delivery delay of 7 days, up from 24 hours. The default message TTL of 24 hours and delivery delay of 0 seconds remain unchanged.

These expanded limits enable longer retention windows and support background work patterns for delayed tasks, scheduled workflows, and long-running jobs.

**Send message example**

```
import { send } from "@vercel/queue";export async function POST(request: Request) {  await send("my-queue", {    userId: "user_123",    action: "send_followup"  }, {    delaySeconds: 5 * 24 * 60 * 60,    retentionSeconds: 7 * 24 * 60 * 60  });  return new Response("Task enqueued");}
```

Explore the [documentation](https://vercel.com/docs/queues).