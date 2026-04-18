---
title: "MiniMax M2.7 is live on AI Gateway"
source: "https://vercel.com/changelog/minimax-m2.7-on-ai-gateway"
publishedDate: "2026-03-18"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Mar 18, 2026

MiniMax M2.7 is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway) in two variants: standard and high-speed. M2.7 is a major step up from previous M2-series models in software engineering, agentic workflows, and professional office tasks.

The model natively supports multi-agent collaboration, complex skill orchestration, and dynamic tool search for building agentic workflows. M2.7 also improves on production debugging and end-to-end project delivery.

The high-speed variant delivers the same performance for 2x the cost of standard at ~100 tokens per second for latency-sensitive use cases.

To use M2.7, set model to `minimax/minimax-m2.7` or `minimax/minimax-m2.7-highspeed` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'minimax/minimax-m2.7-highspeed',  prompt:    `Analyze the production alert logs from the last hour,     correlate them with recent deployments, identify the     root cause, and submit a fix with a non-blocking     migration to restore service.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/minimax-m2.7-highspeed).