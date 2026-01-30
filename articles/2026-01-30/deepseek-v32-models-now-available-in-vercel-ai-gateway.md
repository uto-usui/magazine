---
title: "DeepSeek V3.2 models now available in Vercel AI Gateway"
source: "https://vercel.com/changelog/deepseek-v3-2-now-in-vercel-ai-gateway"
publishedDate: "2025-12-01"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Dec 1, 2025

You can now access DeepSeek's latest models, DeepSeek V3.2 and DeepSeek V3.2 Speciale, via Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required.

DeepSeek V3.2 supports combined thinking and tool use, handling agent-style operations (tool calls) in both reasoning and non-reasoning modes. DeepSeek V3.2 Speciale is optimized for maximal reasoning performance, and is suited for complex task use cases but requires higher token usage and does not support tool use.

To use the DeepSeek V3.2 models, set `model` to the following in the [AI SDK](https://ai-sdk.dev/):

-   Non-thinking: `deepseek/deepseek-v3.2`
    
-   Thinking: `deepseek/deepseek-v3.2-thinking`
    
-   Speciale: `deepseek/deepseek-v3.2-speciale`
    

```
import { streamText } from 'ai';const result = streamText({  model: 'deepseek/deepseek-v3.2-speciale',  prompt:  `Design a self-contained, step-by-step solution to a novel math–algorithm   hybrid problem: prove correctness, derive complexity, and construct   an optimal implementation for the general case.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Read the [docs](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards), or use DeepSeek V3.2 models directly in our [model playground](https://vercel.com/ai-gateway/models/deepseek-v3.2-speciale).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)