---
title: "Qwen 3.7 Max now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/qwen-3-7-max-now-available-on-vercel-ai-gateway"
publishedDate: "2026-05-21"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

May 21, 2026

Qwen 3.7 Max from Alibaba is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway). The model is designed as an agent foundation, with capabilities spanning coding, office workflow automation, and long-horizon autonomous execution.

Qwen 3.7 Max shows improvements in frontend prototyping and complex multi-file engineering. The model supports office and productivity tasks through multi-agent orchestration and sustains coherent reasoning across long-horizon tool-calling sessions.

To use Qwen 3.7 Max, set model to `alibaba/qwen-3.7-max` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'alibaba/qwen3.7-max',  prompt: `Refactor this service into smaller modules and update callers across the repo.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/qwen-3.7-max).