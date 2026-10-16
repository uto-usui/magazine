---
title: "MAI-Image-2.6 and MAI-Image-2.6-Flash now available on AI Gateway"
source: "https://vercel.com/changelog/mai-image-2-6-and-mai-image-2-6-flash-now-available-on-ai-gateway"
publishedDate: "2026-10-13"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[MAI-Image-2.6](https://vercel.com/ai-gateway/models/mai-image-2.6) and [MAI-Image-2.6-Flash](https://vercel.com/ai-gateway/models/mai-image-2.6-flash) from Microsoft are now available on [AI Gateway](https://vercel.com/ai-gateway). Generate images from text or edit existing images through the [AI SDK](https://vercel.com/docs/ai-gateway/modalities/image-generation/ai-sdk) or the [AI CLI](https://github.com/vercel-labs/ai-cli), with one API key and no provider account.

Both models support photorealistic imagery, text rendering, and targeted edits to products, portraits, and layouts. You can provide up to five reference images to guide edits or combine subjects, with output sizes up to 1536 × 1536.

-   **MAI-Image-2.6** (`microsoft/mai-image-2.6`) for final assets, when image quality matters more than speed.
    
-   **MAI-Image-2.6-Flash** (`microsoft/mai-image-2.6-flash`) for faster generation at a lower cost, when you need many iterations, such as exploring prompts or generating variations.
    

Use `microsoft/mai-image-2.6` or `microsoft/mai-image-2.6-flash` as the model ID. To generate an image, call `generateImage` with a text prompt:

Edit images by passing it as input with an instruction:

Try MAI Image 2.6 and MAI Image 2.6 Flash in the [model playground](https://vercel.com/ai-gateway/models/mai-image-2.6), or see the [image generation guide](https://vercel.com/docs/ai-gateway/modalities/image-generation/ai-sdk).