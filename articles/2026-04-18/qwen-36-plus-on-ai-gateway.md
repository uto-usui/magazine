---
title: "Qwen 3.6 Plus on AI Gateway"
source: "https://vercel.com/changelog/qwen-3.6-plus-on-ai-gateway"
publishedDate: "2026-04-02"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 2, 2026

Qwen 3.6 Plus from Alibaba is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

Compared to Qwen 3.5 Plus, this model adds stronger agentic coding capabilities, from frontend development to repository-level problem solving, along with improved multimodal perception and reasoning. It features a 1M context window and improved performance on tool-calling, long-horizon planning, and multilingual tasks.

To use Qwen 3.6 Plus, set model to `qwen/qwen3.6-plus` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'alibaba/qwen3.6-plus',  prompt:    `Refactor this module to separate concerns, update     the imports across the repo, and verify nothing breaks     with the existing test suite.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/qwen3.6-plus).