---
title: "GLM-4.7 available on Vercel AI Gateway"
source: "https://vercel.com/changelog/glm-4-7-available-on-vercel-ai-gateway"
publishedDate: "2025-12-22"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Dec 22, 2025

You can now access Z.ai's latest model, GLM-4.7, with Vercel's [AI Gateway](https://vercel.com/ai-gateway) and no other provider accounts required.

GLM-4.7 comes with major improvements in coding, tool usage, and multi-step reasoning, especially with complex agentic tasks. The model also has a more natural tone for a better conversational experience and can product a more refined aesthetic for front-end work.

To start building with GLM-4.7 via [AI SDK](https://ai-sdk.dev/), set the model to `zai/glm-4.7`:

```
import { streamText } from 'ai';const result = streamText({  model: 'zai/glm-4.7',  prompt:    `Create an interactive weather timeline app, fetch forecasts     via weather tool, normalize data, render animated charts,     cache results, and produce a production build.`});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/glm-4.7).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)