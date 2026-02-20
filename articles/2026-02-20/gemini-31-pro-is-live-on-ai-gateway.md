---
title: "Gemini 3.1 Pro is live on AI Gateway"
source: "https://vercel.com/changelog/gemini-3-1-pro-is-live-on-ai-gateway"
publishedDate: "2026-02-19"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Feb 19, 2026

Gemini 3.1 Pro Preview from Google is now available on AI Gateway.

This model release brings quality improvements across software engineering and agentic workflows, with enhanced usability for real-world tasks in finance and spreadsheet applications. Gemini 3.1 Pro Preview introduces more efficient thinking across use cases, reducing token consumption while maintaining performance.

To use this model, set model to `google/gemini-3.1-pro-preview` in the AI SDK. This model supports the `medium` thinking level for finer control over the trade-offs between cost, performance, and speed.

```
import { streamText } from 'ai';const result = streamText({  model: 'google/gemini-3.1-pro-preview',  prompt:    `Review this pull request for security vulnerabilities,     suggest fixes, and update the test suite to cover edge cases.`,  providerOptions: {    google: {      thinking_level: 'medium',    },  },});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gemini-3.1-pro-preview).