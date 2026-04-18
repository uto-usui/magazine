---
title: "Gemini 3.1 Flash Lite is now on AI Gateway"
source: "https://vercel.com/changelog/gemini-3-1-flash-lite-is-now-on-ai-gateway"
publishedDate: "2026-03-03"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Mar 3, 2026

Gemini 3.1 Flash Lite from Google is now available on AI Gateway.

This model outperforms 2.5 Flash Lite on overall quality, with notable improvements in translation, data extraction, and code completion. Gemini 3.1 Flash Lite is best suited for high-volume agentic tasks, data extraction, and applications where budget and latency are the primary evaluation constraints.

To use this model, set `model` to `google/gemini-3.1-flash-lite-preview` in the AI SDK. This model supports four thinking levels, `minimal`, `low`, `medium`, and `high`.

```
import { streamText } from 'ai';const result = streamText({  model: 'google/gemini-3.1-flash-lite-preview',  prompt:    `Translate this customer support article from English to Japanese,     preserving formatting and technical terms.`,  providerOptions: {    google: {      thinkingConfig: {        thinkingLevel: 'medium',        includeThoughts: true,      },    },  },});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gemini-3.1-flash-lite-preview).