---
title: "Recraft V4 on AI Gateway"
source: "https://vercel.com/changelog/recraft-v4-on-ai-gateway"
publishedDate: "2026-02-17"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

1 min read

Feb 17, 2026

Recraft V4 is now available on AI Gateway.

A text-to-image model built for professional design and marketing use cases, V4 was developed with input from working designers. The model has improvements with photorealism, with realistic skin, natural textures, and fewer synthetic artifacts. It also produces images with clean lighting and varied composition. For illustration, the model can generate original characters with less predictable color palettes.

There are 2 versions:

-   **V4**: Faster and more cost-efficient, suited for everyday work and iteration
    
-   **V4 Pro**: Generates higher-resolution images for print-ready assets and large-scale use
    

To use this model, set model to `recraft/recraft-v4-pro` or `recraft/recraft-v4` in the AI SDK:

```
import { generateImage } from 'ai';const result = await generateImage({  model: 'recraft/recraft-v4',  prompt:    `Product photo of a ceramic coffee mug on a wooden table,     morning light, shallow depth of field.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/recraft-v4).