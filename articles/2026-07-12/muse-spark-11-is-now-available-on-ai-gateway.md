---
title: "Muse Spark 1.1 is now available on AI Gateway"
source: "https://vercel.com/changelog/muse-spark-1-1-is-now-available-on-ai-gateway"
publishedDate: "2026-07-09"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

Muse Spark 1.1 from Meta is now available on [AI Gateway](https://vercel.com/ai-gateway).

It is a multimodal reasoning model with a 1M token context window built for agentic tasks, accepting text, image, video, PDF, and audio inputs.

Muse Spark 1.1 plans and orchestrates work across tools and services, operating as a main agent or as a subagent, and it works with new tools, MCP servers, and custom skills without examples. The model supports parallel tool calling, structured output, and built-in search with citations.

To use Muse Spark 1.1, set `model` to `meta/muse-spark-1.1` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'meta/muse-spark-1.1',  prompt: 'Read this product spec PDF and implement the API it describes.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try Muse Spark 1.1 in the [model playground](https://vercel.com/ai-gateway/models/muse-spark-1.1).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)