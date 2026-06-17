---
title: "GLM 5.2 now available on AI Gateway"
source: "https://vercel.com/changelog/glm-5-2-now-available-on-ai-gateway"
publishedDate: "2026-06-16"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

GLM 5.2 is now available on [AI Gateway](https://vercel.com/ai-gateway).

Built for long-horizon tasks, GLM 5.2 carries project-level engineering context across a single task, runs long-running tasks more reliably, and follows engineering standards more consistently.

The context window for this model has been upgraded to 1M tokens, up from 200K in GLM 5.1.

To use GLM 5.2, set model to `zai/glm-5.2` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'zai/glm-5.2',  prompt: 'Add error recovery to the data ingestion pipeline.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), and more. AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) (BYOK) requests.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/glm-5.2).