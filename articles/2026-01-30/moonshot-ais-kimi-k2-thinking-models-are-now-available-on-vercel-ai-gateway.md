---
title: "Moonshot AI's Kimi K2 Thinking models are now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/moonshot-ai-kimi-k2-thinking-and-kimi-k2-thinking-turbo-are-now-available"
publishedDate: "2025-11-06"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

1 min read

Nov 6, 2025

You can now access Moonshot AI's latest and most powerful thinking models, Kimi K2 Thinking and Kimi K2 Thinking Turbo, using Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required.

Kimi K2 Thinking is oss and excels at deep reasoning, handling up to 200–300 sequential tool calls, and achieves top results on benchmarks for reasoning and coding. Kimi K2 Thinking Turbo is a high speed version of Kimi K2 Thinking and is best suited for scenarios requiring both deep reasoning and low latency.

AI Gateway lets you call the model with a consistent unified API and just a single string update, track usage and cost, and configure performance optimizations, retries, and failover for higher-than-provider-average uptime.

To use it with the [AI SDK](https://ai-sdk.dev/), set the model to `moonshotai/kimi-k2-thinking` or `moonshotai/kimi-k2-thinking-turbo`:

```
import { streamText } from 'ai'const result = streamText({  model: "moonshotai/kimi-k2-thinking",  prompt: "Please help me generate a technology and economic news report"})
```

Includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway#configuring-your-own-provider-keys-byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway) or try it in our [model playground](https://vercel.com/ai-gateway/models/kimi-k2-thinking).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)