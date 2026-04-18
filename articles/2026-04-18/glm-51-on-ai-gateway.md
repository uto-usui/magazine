---
title: "GLM 5.1 on AI Gateway"
source: "https://vercel.com/changelog/glm-5.1-on-ai-gateway"
publishedDate: "2026-04-07"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 7, 2026

GLM 5.1 from Z.ai is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

Designed for long-horizon autonomous tasks, GLM-5.1 can work continuously on a single task for extended periods, handling planning, execution, testing, and iterative refinement in a closed loop. Rather than one-shot code generation, it runs an autonomous cycle of benchmarking, identifying bottlenecks, and optimizing across many iterations, with particular strength in sustained multi-step engineering workflows.

Beyond agentic coding, GLM-5.1 improves on general conversation, creative writing, front-end prototyping, and office productivity tasks like generating PowerPoint, Word, and Excel documents.

To use GLM 5.1, set model to `zai/glm-5.1` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'zai/glm-5.1',  prompt:    `Refactor the data ingestion pipeline to support streaming,     add error recovery, and benchmark throughput against the     current implementation.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/glm-5.1).