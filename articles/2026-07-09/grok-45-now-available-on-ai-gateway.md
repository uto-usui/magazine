---
title: "Grok 4.5 now available on AI Gateway"
source: "https://vercel.com/changelog/grok-4-5-now-available-on-ai-gateway"
publishedDate: "2026-07-08"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

Grok 4.5 from SpaceXAI is now available on [AI Gateway](https://vercel.com/ai-gateway).

Built for coding, knowledge work, and STEM, the model accepts text and image inputs.

Grok 4.5 supports low, medium, and high reasoning levels and defaults to high. Set the level with `reasoning` to balance speed against depth.

To use Grok 4.5, set `model` to `xai/grok-4.5` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'xai/grok-4.5',  reasoning: 'high',  prompt: 'Analyze this dataset and summarize the key trends.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try Grok 4.5 in the [model playground](https://vercel.com/ai-gateway/models/grok-4.5).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)