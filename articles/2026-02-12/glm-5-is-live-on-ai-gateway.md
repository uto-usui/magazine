---
title: "GLM-5 is live on AI Gateway"
source: "https://vercel.com/changelog/glm-5-is-live-on-ai-gateway"
publishedDate: "2026-02-11"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Feb 11, 2026

You can now access GLM-5 via [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required.

GLM-5 from Z.AI is now available on AI Gateway. Compared to GLM-4.7, GLM-5 adds multiple thinking modes, improved long-range planning and memory, and better handling of complex multi-step agent tasks. It's particularly strong at agentic coding, autonomous tool use, and extracting structured data from documents like contracts and financial reports.

To use this model, set model to `zai/glm-5` in the AI SDK:

```
import { streamText } from 'ai';const result = streamText({  model: 'zai/glm-5',  prompt:    `Generate a complete REST API with authentication,     database models, and test coverage for a task management app.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/glm-5).