---
title: "Grok 4.1 Fast models now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/grok-4-1-fast-models-now-available-on-vercel-ai-gateway"
publishedDate: "2025-11-20"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Nov 20, 2025

You can now access xAI's latest models, Grok 4.1 Fast Reasoning and Grok 4.1 Fast Non-Reasoning, via Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required. These models have a 2M context window and are designed for agentic tool calling.

Grok 4.1 Fast Reasoning is best suited for structured reasoning and agentic operations that require high accuracy, whereas Grok 4.1 Fast Non-Reasoning is tailored to speed.

To use the Grok 4.1 Fast models in AI Gateway with the [AI SDK](https://ai-sdk.dev/), set `model` to `xai/grok-4.1-fast-reasoning` or `xai/grok-4.1-fast-non-reasoning`.

```
import { streamText } from 'ai';const result = streamText({  model: 'xai/grok-4.1-fast-reasoning',  prompt:  `Take the uploaded report and extract the most relevant financial trends.   Note any outliers and provide a detailed  analysis with citations.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/grok-4.1-fast-non-reasoning).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)