---
title: "Grok Imagine Video 1.5 on AI Gateway"
source: "https://vercel.com/changelog/grok-imagine-video-1-5-on-ai-gateway"
publishedDate: "2026-06-03"
category: "frontend"
feedName: "Vercel"
author: "Sam Chitgopekar"
---

1 min read

Jun 3, 2026

Grok Imagine Video 1.5 from xAI is now available on AI Gateway. The model generates video from an input image with synchronized audio in a single pass.

This release improves audio quality, prompt following, and photorealism. Face accuracy and character consistency are stronger across longer sequences, with better lighting and physical realism in the output. Reference image support has been expanded to give more control over visual style and subject.

To use this model, set model to `xai/grok-imagine-video-1.5-preview` in the AI SDK. Chain an image model with Grok Imagine Video 1.5 to generate a still and animate it in one flow:

```
import { generateImage, experimental_generateVideo as generateVideo } from 'ai';const { images } = await generateImage({  model: 'xai/grok-imagine-image',  prompt: 'A white rabbit sprinting down a NYC sidewalk at midday.',  aspectRatio: '16:9',});const image = images[0];const imageDataUrl = `data:${image.mediaType};base64,${Buffer.from(image.uint8Array).toString('base64')}`;const { videos } = await generateVideo({  model: 'xai/grok-imagine-video-1.5-preview',  prompt: {    image: imageDataUrl,    text: 'The rabbit darts past taxis as pigeons scatter.',  },  aspectRatio: '16:9',  providerOptions: {    xai: { resolution: '720p' },  },});
```

You can also try this Grok Imagine Video 1.5 directly in the [AI Gateway Playground](https://vercel.com/ai-gateway/models/grok-imagine-video-1.5-preview).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [dynamic provider sorting by latency and cost](https://vercel.com/changelog/sort-providers-by-cost-latency-or-throughput-on-ai-gateway), and more. AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) (BYOK) requests. Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway) and view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards).