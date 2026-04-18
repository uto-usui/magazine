---
title: "Gemma 4 on AI Gateway"
source: "https://vercel.com/changelog/gemma-4-on-ai-gateway"
publishedDate: "2026-04-02"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 2, 2026

Gemma 4 26B (MoE) and 31B (Dense) from Google are now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

Built on the same architecture as Gemini 3, both open models support function-calling, agentic workflows, structured JSON output, and system instructions. Both support up to 256K context, 140+ languages, and native vision.

-   26B (MoE): Activates only 3.8B of its 26B total parameters during inference, optimized for lower latency and faster tokens-per-second.
    
-   31B (Dense): All parameters are active during inference, targeting higher output quality. Better suited as a foundation for fine-tuning.
    

To use Gemma 4, set model to `google/gemma-4-31b-it` or `google/gemma-4-26b-a4b-it` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'google/gemma-4-26b-a4b-it',  // or 'google/gemma-4-31b-it'  prompt:    `Break down this codebase into modules, identify circular     dependencies, and generate a refactoring plan with     implementation steps.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gemma-4-31b-it).