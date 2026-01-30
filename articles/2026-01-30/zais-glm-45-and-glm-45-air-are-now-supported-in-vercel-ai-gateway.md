---
title: "Z.ai's GLM-4.5 and GLM-4.5 Air are now supported in Vercel AI Gateway"
source: "https://vercel.com/changelog/z-ais-glm-4-5-and-glm-4-5-air-are-now-supported-in-vercel-ai-gateway"
publishedDate: "2025-07-29"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jul 29, 2025

You can now access [GLM-4.5 and GLM-4.5 Air](https://z.ai/blog/glm-4.5), new flagship models from [Z.ai](https://z.ai/) designed to unify frontier reasoning, coding, and agentic capabilities, using Vercel's [AI Gateway](https://vercel.com/docs/ai-gateway) with no other provider accounts required.

AI Gateway lets you call the model with a consistent unified API and just a single string update, track usage and cost, and configure performance optimizations, retries, and failover for higher than provider-average uptime.

To use it with the [AI SDK v5](https://v5.ai-sdk.dev/docs/introduction), start by installing the package:

```
pnpm i ai
```

Then set the model to either `zai/glm-4.5` or `zai/glm-4.5-air`:

```
import { streamText } from 'ai'const result = streamText({  model: "zai/glm-4.5", // or "zai/glm-4.5-air"  prompt: "What is specifically notable about the style of Sonoran food?",  providerOptions: {    zai: {      thinking: {        type: 'disabled',      },    },  }})
```

Includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway#configuring-your-own-provider-keys-byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway).