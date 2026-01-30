---
title: "FLUX.2 Pro image model is now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/flux-2-pro-image-model-is-now-available-on-vercel-ai-gateway"
publishedDate: "2025-11-25"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Nov 25, 2025

You can now access the newest image model FLUX.2 Pro from Black Forest Labs via Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required.

FLUX.2 Pro is a newly trained base model designed for advanced visual intelligence, offering higher-resolution outputs (up to 4MP), improved knowledge of the real world, and precise control over lighting and spatial composition. It introduces multi-reference input, enhanced character and product consistency, exact color matching, and expanded control options compared to the FLUX.1 models.

FLUX.2 Pro differs fundamentally from the other models with image generation capability currently available in AI Gateway. This model is a pure image-focused rectified-flow transformer model, in contrast with the multimodal LLMs already integrated. To use this model, set `model` to `bfl/flux-2-pro` in the [AI SDK](https://ai-sdk.dev/). This model supports `generateImage`.

```
import { experimental_generateImage as generateImage } from 'ai';const result = await generateImage({  model: 'bfl/flux-2-pro',  prompt:    `Render a turquoise throated puffleg hummingbird     resting on a branch covered with dew at sunrise.`,  size: '1024x1024',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Read the [docs](https://vercel.com/docs/ai-gateway/image-generation) for more detailed examples on how to use FLUX.2 Pro with the AI SDK and OpenAI-compatible API, view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards), or try these models directly in the [model playground](https://vercel.com/ai-gateway/models/flux-2-pro).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)