---
title: "Qwen 3.8 Max now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/qwen-3-8-max-now-available-on-vercel-ai-gateway"
publishedDate: "2026-08-02"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

[Qwen 3.8 Max](https://vercel.com/ai-gateway/models/qwen3.8-max) is now available on AI Gateway.

Qwen 3.8 Max handles text-only and vision-language work in one model, with 2.4 trillion parameters and a context window of up to 1 million tokens. The model is suited for software engineering and office productivity, along with visual work like turning screenshots or design files into working pages, captioning video, and answering questions grounded in an image.

To use Qwen 3.8 Max, set `model` to `alibaba/qwen3.8-max`.

```
import { streamText } from 'ai';const result = streamText({  model: 'alibaba/qwen3.8-max',  prompt: 'Add pagination to the results endpoint.',});
```

Try Qwen 3.8 Max in the [model playground](https://vercel.com/ai-gateway/models/qwen3.8-max).

To use it in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run `vercel ai-gateway coding-agents setup` to connect Claude Code, Codex, OpenCode, or Pi, then select `alibaba/qwen3.8-max` inside the agent.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)