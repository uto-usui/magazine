---
title: "Qwen 3.5 Plus is on AI Gateway"
source: "https://vercel.com/changelog/qwen-3-5-plus-is-on-ai-gateway"
publishedDate: "2026-02-16"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Feb 16, 2026

Qwen 3.5 Plus is now available on AI Gateway.

The model comes with a 1M context window and built-in adaptive tool use. Qwen 3.5 Plus excels at agentic workflows, thinking, searching, and using tools across multimodal contexts, making it well-suited for web development, frontend tasks, and turning instructions into working code. Compared to Qwen 3 VL, it delivers stronger performance in scientific problem solving and visual reasoning tasks.

To use this model, set model to `alibaba/qwen3.5-plus` in the AI SDK:

```
import { streamText } from 'ai';const result = streamText({  model: 'alibaba/qwen3.5-plus',  prompt:    `Analyze this UI mockup, extract the design system,     and generate a production-ready React component     with responsive breakpoints and theme support.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/qwen3.5-plus).