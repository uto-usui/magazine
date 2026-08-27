---
title: "Muse Image now available on AI Gateway"
source: "https://vercel.com/changelog/muse-image-now-available-on-ai-gateway"
publishedDate: "2026-08-26"
category: "frontend"
feedName: "Vercel"
author: "Josh Lipman"
---

[Muse Image](https://vercel.com/ai-gateway/models/muse-image-1.0) from Meta Superintelligence Labs is now available on AI Gateway. It is their first image model and a separate family from Muse Spark, returning images rather than text. Send a prompt and get an image back, or send an image with an instruction and get it changed. One model does both, so you don't switch models to move from generating to editing.

To use Muse Image, set `model` to `meta/muse-image-1.0` and call `generateImage` from the [AI SDK](https://ai-sdk.dev/):

```
import { generateImage } from 'ai';const { images } = await generateImage({  model: 'meta/muse-image-1.0',  prompt: 'A conference poster for a talk on database indexes.',});
```

To steer the result toward art you already have, pass reference images in `prompt.images` alongside the text, and the model blends them into what it draws.

## [Copy link to heading](#editing)Editing

Pass the image you want changed in `prompt.images` with an instruction, and the model changes what you asked for and leaves the rest:

```
import { readFileSync } from 'node:fs';import { generateImage } from 'ai';const { images } = await generateImage({  model: 'meta/muse-image-1.0',  prompt: {    text: 'Move the date to the bottom right and make it larger.',    images: [readFileSync('./poster.png')],  },});
```

Try Muse Image in the [model playground](https://vercel.com/ai-gateway/models/muse-image-1.0).

AI Gateway provides a unified API for calling models, tracking usage and cost, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all image models](https://vercel.com/ai-gateway/models?type=image) available on AI Gateway.