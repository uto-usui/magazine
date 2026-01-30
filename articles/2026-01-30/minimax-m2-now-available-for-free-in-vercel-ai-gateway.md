---
title: "MiniMax M2 now available for free in Vercel AI Gateway"
source: "https://vercel.com/changelog/minimax-m2-now-available-in-vercel-ai-gateway"
publishedDate: "2025-10-28"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

1 min read

Oct 28, 2025

You can now access MiniMax's latest open source model, MiniMax M2 using Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required. The model is free to use until Nov 7th, 2025. Focused on agentic use, Minimax M2 is very efficient to serve, with only 10B active parameters per forward pass.

AI Gateway lets you call the model with a consistent unified API and just a single string update, track usage and cost, and configure performance optimizations, retries, and failover for higher than provider-average uptime.

To use it with the [AI SDK](https://ai-sdk.dev/), set the model to `minimax/minimax-m2:`

```
import { streamText } from 'ai'const result = streamText({  model: "minimax/minimax-m2",  prompt: "What is the future of open source LLM models?"})
```

Includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway#configuring-your-own-provider-keys-byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway) or try it in our [model playground](https://vercel.com/ai-gateway/models/minimax-m2).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)