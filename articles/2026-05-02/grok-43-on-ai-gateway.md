---
title: "Grok 4.3 on AI Gateway"
source: "https://vercel.com/changelog/grok-4-3-on-ai-gateway"
publishedDate: "2026-04-30"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 30, 2026

Grok 4.3 is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway). The model has a 1M token context window and improvements in accuracy, tool calling, and instruction following.

To use Grok 4.3, set model to `xai/grok-4.3` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'xai/grok-4.3',  prompt: 'Analyze this dataset and summarize the key trends.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/grok-4.3).