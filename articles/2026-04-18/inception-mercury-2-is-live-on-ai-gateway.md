---
title: "Inception Mercury 2 is live on AI Gateway"
source: "https://vercel.com/changelog/mercury-2-on-ai-gateway"
publishedDate: "2026-03-04"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Mar 4, 2026

Mercury 2 from Inception is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

Mercury 2 from Inception is now available on AI Gateway. Mercury 2 delivers reasoning-grade quality at real-time latency, making it ideal for agentic loops, coding assistants, voice interfaces, and RAG pipelines where compounding latency is the bottleneck.

To use Mercury 2, set model to `inception/mercury-2` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'inception/mercury-2',  prompt:    `For each incoming support ticket, classify urgency,     retrieve relevant docs, draft a response, and escalate     if unresolved.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/mercury-2).