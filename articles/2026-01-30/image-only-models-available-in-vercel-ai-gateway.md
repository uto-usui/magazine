---
title: "Image-only models available in Vercel AI Gateway"
source: "https://vercel.com/changelog/image-only-models-available-in-vercel-ai-gateway"
publishedDate: "2025-11-28"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Nov 28, 2025

You can now access image-only models via Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required. In addition to multimodal models with image generation capabilities that are currently available in AI Gateway (e.g., [GPT-5.1](https://vercel.com/ai-gateway/models/gpt-5.1-thinking), [Nano Banana Pro](https://vercel.com/ai-gateway/models/gemini-3-pro-image), etc.), these image-only models are exclusively for image generation. The models include:  
Black Forest Labs:

-   FLUX.2 Flex: `bfl/flux-2-flex`
    
-   FLUX.2 Pro: `bfl/flux-2-pro`
    
-   FLUX.1 Kontext Max: `bfl/flux-kontext-max`
    
-   FLUX.1 Kontext Pro: `bfl/flux-kontext-pro`
    
-   FLUX 1.1 Pro Ultra: `bfl/flux-pro-1.1-ultra`
    
-   FLUX 1.1 Pro: `bfl/flux-pro-1.1`
    
-   FLUX.1 Fill Pro: `bfl/flux-pro-1.0-fill`
    

Google:

-   Imagen 4.0 Generate 001: `google/imagen-4.0-generate`
    
-   Imagen 4.0 Fast Generate 001: `google/imagen-4.0-fast-generate`
    
-   Imagen 4.0 Ultra Generate 001: `google/imagen-4.0-ultra-generate`
    

To use these models, set `model` to the corresponding slug from above in the [AI SDK](https://ai-sdk.dev/). These models support `generateImage`.

```
import { experimental_generateImage as generateImage } from 'ai';const result = await generateImage({  model: 'bfl/flux-2-flex',  prompt:    'A snow leopard poised on a neon-lit rooftop at midnight rendered in vivid pop-art style.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Read the [docs](https://vercel.com/docs/ai-gateway/image-generation) on image generation, view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards), or try these models directly in the [model playground](https://vercel.com/ai-gateway/models?type=image).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)