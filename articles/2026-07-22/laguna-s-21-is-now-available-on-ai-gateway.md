---
title: "Laguna S 2.1 is now available on AI Gateway"
source: "https://vercel.com/changelog/laguna-s-2-1-is-now-available-on-ai-gateway"
publishedDate: "2026-07-21"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Laguna S 2.1 from Poolside](https://vercel.com/ai-gateway/models/laguna-s-2.1) is now available on AI Gateway. There are 2 versions of the model available:

-   Free version (256K context window): `poolside/laguna-s-2.1-free`
    
-   Paid version (1M context window): `poolside/laguna-s-2.1`
    

Laguna S 2.1 is an open-weight Mixture-of-Experts model that supports a context window of up to 1M tokens and runs in thinking and no-thinking modes.

The model specializes in agentic coding and long-running tasks, including writing and debugging code, running tests, building browser-based tooling, and working on MLOps pipelines and AI research. In thinking mode, Laguna S 2.1 reports 70.2% on Terminal-Bench 2.1, 78.5% on SWE-bench Multilingual, and 59.4% on SWE-Bench Pro.

To use Laguna S 2.1, set `model` to `poolside/laguna-s-2.1-free` or `poolside/laguna-s-2.1` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'poolside/laguna-s-2.1',  prompt: 'Fix the flaky test in the payments suite.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try Laguna S 2.1 in the [model playground](https://vercel.com/ai-gateway/models/laguna-s-2.1-free).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)