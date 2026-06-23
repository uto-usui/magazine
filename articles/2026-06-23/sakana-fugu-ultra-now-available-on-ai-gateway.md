---
title: "Sakana Fugu Ultra now available on AI Gateway"
source: "https://vercel.com/changelog/sakana-fugu-ultra-now-available-on-ai-gateway"
publishedDate: "2026-06-22"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

Sakana Fugu Ultra from Sakana AI is now available on [AI Gateway](https://vercel.com/ai-gateway).

Fugu Ultra is built on a pool of publicly accessible frontier models, rather than running as a single model. It coordinates several models, routing work to 1-3 agents depending on the problem and combining their results into a single answer.

Based on reasoning and scientific benchmarks, Fugu Ultra has capabilities similar to those of Claude Mythos Preview and Fable 5.

To use Fugu Ultra, set `model` to `sakana/fugu-ultra` in [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'sakana/fugu-ultra',  prompt: 'Review this pull request and flag correctness bugs.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try Sakana Fugu Ultra in the [model playground](https://vercel.com/ai-gateway/models/fugu-ultra).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)