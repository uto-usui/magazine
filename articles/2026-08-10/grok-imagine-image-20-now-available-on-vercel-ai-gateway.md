---
title: "Grok Imagine Image 2.0 now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/grok-imagine-image-2-0-preview-now-available-on-vercel-ai-gateway"
publishedDate: "2026-08-08"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

[Grok Imagine Image 2.0 Preview from xAI](https://vercel.com/ai-gateway/models/grok-imagine-image-2.0-preview) is now available on AI Gateway.

The model follows detailed instructions closely and plans typography and layout together, so dense, multi-part visuals like infographics, posters, and title screens hold their structure and small text stays legible. Grok Imagine Image 2.0 Preview also supports image editing, keeping subjects and details consistent across repeated generations.

Try the model out now in [imagine.vercel.sh](https://imagine.vercel.sh/), running on AI Gateway.

To use Grok Imagine Image 2.0 Preview, set `model` to `xai/grok-imagine-image-2.0-preview` and call `generateImage` from the [AI SDK](https://ai-sdk.dev/).

```
import { generateImage } from 'ai';const { images } = await generateImage({  model: 'xai/grok-imagine-image-2.0-preview',  prompt: 'An infographic tracing letterforms from movable type to digital fonts.',});
```

Set `resolution` to `1k` or `2k` under `providerOptions.xai` to pick an output tier, and `n` for more than one image per call.

For image editing, pass an image in `prompt.images` alongside the instruction, and the model changes what you asked for and leaves the rest:

```
import { readFileSync } from 'node:fs';import { generateImage } from 'ai';const { images } = await generateImage({  model: 'xai/grok-imagine-image-2.0-preview',  prompt: {    text: 'Change the title to a monospace font.',    images: [readFileSync('./letterforms.png')],  },});
```

To view all image models supported on AI Gateway, see the full list [here](https://vercel.com/ai-gateway/models?type=image).