---
title: "Gemini 3 Flash is now available on the Vercel AI Gateway"
source: "https://vercel.com/changelog/gemini-3-flash-is-now-available-on-the-vercel-ai-gateway"
publishedDate: "2025-12-17"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Dec 17, 2025

You can now access Google's latest Gemini model, Gemini 3 Flash, with Vercel's [AI Gateway](https://vercel.com/ai-gateway) and no other provider accounts required.

It is Google's most intelligent model that is optimized for speed, with Gemini 3's pro-grade reasoning alongside flash-level latency, efficiency, and cost. Gemini 3 Flash significantly outperforms the previous Gemini 2.5 models, beating Gemini 2.5 Pro across most benchmarks, while using 30% less tokens and is 3x faster at a fraction of the cost.

To use the Gemini 3 Flash with the [AI SDK](https://ai-sdk.dev/), set the model to `google/gemini-3-flash`:

```
import { streamText } from 'ai';const result = streamText({  model: 'google/gemini-3-flash',  prompt:    `Produce a step-by-step analysis that solves a novel     problem, exposes intermediate logic, and delivers a final answer     using minimal tokens and maximal inference density.`  providerOptions: {    google: {      thinkingLevel: 'high',      includeThoughts: true    },  },});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gemini-3-flash).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)