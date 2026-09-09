---
title: "GPT Image 2.5 Flare and Sunburst now available on AI Gateway"
source: "https://vercel.com/changelog/gpt-image-2-5-flare-and-sunburst-now-available-on-ai-gateway"
publishedDate: "2026-09-08"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[GPT Image 2.5 Flare](https://vercel.com/ai-gateway/models/gpt-image-2.5-flare) and [GPT Image 2.5 Sunburst](https://vercel.com/ai-gateway/models/gpt-image-2.5-sunburst) from OpenAI are now available on AI Gateway as `openai/gpt-image-2.5-flare` and `openai/gpt-image-2.5-sunburst`.

Both models generate and edit images with more natural lighting and textures, follow complex visual instructions, and handle detailed layouts and transparent backgrounds. They accept reference images for targeted edits while preserving surrounding elements. Flare is optimized for faster generation and iteration. Sunburst takes longer to generate and offers tighter control for detailed creative work.

Use `openai/gpt-image-2.5-flare` as the model name for faster generation:

```
import { generateImage } from 'ai';const result = await generateImage({  model: 'openai/gpt-image-2.5-flare',  prompt: 'A product photo of a glass perfume bottle on pale stone in soft morning light.',});
```

Change the model name to `openai/gpt-image-2.5-sunburst` when the result needs more precise control over composition and detail.

For targeted editing, pass an image alongside the instruction. This example uses Sunburst:

```
import { readFileSync } from 'node:fs';import { generateImage } from 'ai';const result = await generateImage({  model: 'openai/gpt-image-2.5-sunburst',  prompt: {    text: 'Change the bottle cap to gold and keep everything else unchanged.',    images: [readFileSync('./product.png')],  },});
```

Try [Flare](https://vercel.com/ai-gateway/models/gpt-image-2.5-flare) or [Sunburst](https://vercel.com/ai-gateway/models/gpt-image-2.5-sunburst) in the model playground.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all image models](https://vercel.com/ai-gateway/models?type=image) available on AI Gateway.