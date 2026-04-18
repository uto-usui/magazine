---
title: "GLM 5V Turbo on AI Gateway"
source: "https://vercel.com/changelog/glm-5v-turbo-on-ai-gateway"
publishedDate: "2026-04-01"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 1, 2026

GLM 5V Turbo from Z.ai is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

GLM 5V Turbo is a multimodal coding model that turns screenshots and designs into code, debugs visually, and operates GUIs autonomously. It's strong at design-to-code generation, visual code generation, and navigating real GUI environments, at a smaller parameter size than comparable models.

To use GLM 5V Turbo, set model to `zai/glm-5v-turbo` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'zai/glm-5v-turbo',  prompt:    `Recreate this screenshot as a responsive React component     with Tailwind CSS and match the layout exactly.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/glm-5v-turbo).