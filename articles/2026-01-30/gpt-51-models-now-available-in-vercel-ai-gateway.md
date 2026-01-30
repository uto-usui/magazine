---
title: "GPT 5.1 models now available in Vercel AI Gateway"
source: "https://vercel.com/changelog/gpt-5-1-models-now-available-in-vercel-ai-gateway"
publishedDate: "2025-11-13"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

1 min read

Nov 13, 2025

You can now access OpenAI's latest models, GPT-5.1 Instant and GPT-5.1 Thinking, using Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required.

-   GPT-5.1 Instant offers improved instruction following, adaptive reasoning, and warmer, more conversational responses.
    
-   GPT-5.1 Thinking builds on GPT-5 Thinking with dynamic performance tuning that prioritizes speed for simple tasks and deeper reasoning for complex ones.
    

To use these models with the [AI SDK](https://ai-sdk.dev/), set the model to `openai/gpt-5.1-instant` or `openai/gpt-5.1-thinking`:

```
import { streamText } from 'ai'const result = streamText({  model: "openai/gpt-5.1-instant",  prompt: "What are the benefits to adaptive reasoning?" })
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gpt-5.1-instant).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)