---
title: "FLUX 3 Image now available on AI Gateway"
source: "https://vercel.com/changelog/flux-3-image-now-available-on-ai-gateway"
publishedDate: "2026-10-05"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[FLUX 3 Image](https://vercel.com/ai-gateway/models/flux-3-image) from Black Forest Labs is now available on AI Gateway. Generate images from text or edit existing images using the same model, with one API key and no Black Forest Labs account required.

FLUX 3 Image supports up to ten reference images for editing, combining subjects, or changing the composition. It supports five resolution tiers from 768 × 768 to 4K, with square, portrait, and landscape aspect ratios.

Set `AI_GATEWAY_API_KEY`, then use `bfl/flux-3-image` as the model ID in AI SDK 7 or later. To generate an image, call `generateImage` with a text prompt:

```
import { generateImage } from 'ai';const { image } = await generateImage({  model: 'bfl/flux-3-image',  prompt: 'A blue ceramic vase with wildflowers on a sunlit wooden table.',  aspectRatio: '1:1',  providerOptions: {    blackForestLabs: { resolution: '1k' },  },});
```

Generate a square, 1K-resolution image with FLUX 3 Image and the AI SDK.

To edit an image, pass it in `prompt.images` with an instruction. This example edits the image generated above:

```
const { image: editedImage } = await generateImage({  model: 'bfl/flux-3-image',  prompt: {    text: 'Change the vase to terracotta and keep the flowers and setting.',    images: [image.uint8Array],  },  aspectRatio: '1:1',  providerOptions: {    blackForestLabs: { resolution: '1k' },  },});
```

Edit the generated image while preserving the flowers and setting.

You can also use FLUX 3 Image from the terminal using the same AI Gateway API key and model ID with AI CLI.

Try FLUX 3 Image in the [model playground](https://vercel.com/ai-gateway/models/flux-3-image), or see the [image generation guide](https://vercel.com/docs/ai-gateway/modalities/image-generation/ai-sdk).