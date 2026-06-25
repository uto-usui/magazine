---
title: "GLM 5.2 Fast via Wafer now available on AI Gateway"
source: "https://vercel.com/changelog/glm-5-2-fast-via-wafer-now-available-on-ai-gateway"
publishedDate: "2026-06-24"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

GLM 5.2 Fast via Wafer is now available on [AI Gateway](https://vercel.com/ai-gateway).

Based on our own benchmarking across small-context, large-context, and tool-call scenarios, Wafer delivers a 2x higher throughput than other providers serving GLM-5.2 on serverless, leading on decode and end-to-end speed for sustained generation in the small- and large-context cases.

In our testing, GLM 5.2 Fast on Wafer measured:

-   Small context: 170+ tok/s
    
-   Large context: 200+ tok/s
    

To use GLM 5.2 Fast, set `model` to `zai/glm-5.2-fast` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'zai/glm-5.2-fast',  prompt: 'Add error recovery to the data ingestion pipeline.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try GLM 5.2 Fast in the [model playground](https://vercel.com/ai-gateway/models/glm-5.2-fast).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)