---
title: "Gemini 3.6 Flash and Gemini 3.5 Flash-Lite are now available on AI Gateway"
source: "https://vercel.com/changelog/gemini-3-6-flash-3-5-flash-lite-on-ai-gateway"
publishedDate: "2026-07-21"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Gemini 3.6 Flash](https://vercel.com/ai-gateway/models/gemini-3.6-flash) and [Gemini 3.5 Flash-Lite](https://vercel.com/ai-gateway/models/gemini-3.5-flash-lite) are now available on AI Gateway.

Gemini 3.6 Flash improves quality across coding, agentic tasks, and web development while consuming fewer tokens and making fewer model calls. It produces cleaner web and app development output.

Gemini 3.5 Flash Lite upgrades the agentic capabilities of the Flash-Lite tier, making it a good fit for subagents that handle scoped parts of a larger task.

To use them, set `model` to `google/gemini-3.6-flash` or `google/gemini-3.5-flash-lite` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'google/gemini-3.6-flash',  prompt: 'Build a settings page with profile and notification sections.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try Gemini 3.6 Flash in the [model playground](https://vercel.com/ai-gateway/models/gemini-3.6-flash).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)