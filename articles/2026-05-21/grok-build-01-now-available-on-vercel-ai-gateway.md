---
title: "Grok Build 0.1 now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/grok-build-0-1-now-available-on-vercel-ai-gateway"
publishedDate: "2026-05-20"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

May 20, 2026

Grok Build 0.1 is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

This is a beta coding model trained for agentic coding, currently in early access, and powers the Grok Build CLI app. Reasoning effort is not configurable, and there is no non-reasoning mode.

To use Grok Build 0.1, set model to `xai/grok-build-0.1` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'xai/grok-build-0.1',  prompt: 'Refactor this module to use async/await and add tests.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/grok-build-0.1).