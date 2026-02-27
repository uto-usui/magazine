---
title: "Nano Banana 2 is live on AI Gateway"
source: "https://vercel.com/changelog/nano-banana-2-is-live-on-ai-gateway"
publishedDate: "2026-02-26"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Feb 26, 2026

Gemini 3.1 Flash Image Preview (Nano Banana 2) is now available on AI Gateway.

This release improves visual quality while maintaining the generation speed and cost of flash-tier models.

Nano Banana 2 can use Google Image Search to ground outputs in real-world imagery. This helps with rendering lesser-known landmarks and objects by retrieving live visual data. This model also introduces configurable thinking levels (Minimal and High) to let the model reason through complex prompts before rendering. New resolutions and new aspect ratios (512p, 1:4 and 1:8) are available alongside the existing options to expand to support more types of creative assets.

To use this model, set model to `google/gemini-3.1-flash-image-preview` in the AI SDK. Nano Banana 2 is a multimodal model. Use \`streamText\` or \`generateText\` to generate images alongside text responses. This example shows how the model can use web search to find live data.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7m9l7bAOxwyg9Pk3wdYX8Z%2Ff27a86d0e7a19a7e9d5a2114849445eb%2Fimage-1772125504172-0.png&w=1920&q=75)

```
import { streamText } from 'ai';const result = streamText({  model: 'google/gemini-3.1-flash-image-preview',  providerOptions: {    google: { responseModalities: ['TEXT', 'IMAGE'] },  },  prompt: 'Generate an image of the 2026 Super Bowl at golden hour',});
```

You can also change the thinking level: in this example, thinking is set to `high` for a more thorough response.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F57H1kPnYwsUyctddAloAH1%2Fe2cf1af23ee131435bbd7fca46b639f8%2Fimage-1772126224603-0.png&w=1920&q=75)

```
import { streamText } from 'ai';const result = streamText({  model: 'google/gemini-3.1-flash-image-preview',  providerOptions: {    google: {      responseModalities: ['TEXT', 'IMAGE'],      thinkingConfig: {        includeThoughts: true,        thinkingLevel: 'high',      },    },  },  prompt:   `An exploded view diagram of a modern GPU, showing the die, HBM stacks, interposer,    and cooling solution as separate floating layers with labeled callouts.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gemini-3.1-flash-image-preview).