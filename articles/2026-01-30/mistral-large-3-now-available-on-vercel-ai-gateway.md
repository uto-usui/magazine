---
title: "Mistral Large 3 now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/mistral-large-3-now-available-on-vercel-ai-gateway"
publishedDate: "2025-12-02"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Dec 2, 2025

You can now access Mistral's latest model Mistral Large 3 via Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required. Mistral Large 3 is Mistral's most capable model to date. It has a sparse mixture-of-experts architecture with 41B active parameters (675B total), and is Mistral’s first mixture-of-experts model since the Mixtral series.

To use Mistral Large 3, set `model` to `mistral/mistral-large-3` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'mistral/mistral-large-3',  prompt: 'What are the most important things to consider when using OSS models?',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Read the [docs](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards), or use the model directly in our [model playground](https://vercel.com/ai-gateway/models/mistral-large-3).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)