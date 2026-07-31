---
title: "MiniMax H3 now available on AI Gateway"
source: "https://vercel.com/changelog/minimax-h3-now-available-on-vercel-ai-gateway"
publishedDate: "2026-07-30"
category: "frontend"
feedName: "Vercel"
author: "Josh Lipman"
---

[MiniMax H3](https://vercel.com/ai-gateway/models/minimax-h3) is now available on AI Gateway.

H3 generates 2K video from a text prompt, a starting image, a pair of first and last frames, or reference material.

Alongside text-to-video and first-frame image-to-video, the model supports first-to-last keyframe transitions and multimodal reference-to-video, conditioning a generation on reference images, video, or audio in a single request. Reference and keyframe modes are mutually exclusive. Output is mp4 at 2K resolution, from 5 to 15 seconds, in aspect ratios including 21:9, 16:9, 4:3, 1:1, 3:4, and 9:16, or adaptive to a supplied image.

To use MiniMax H3, set `model` to `minimax/minimax-h3` in the AI SDK:

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'minimax/minimax-h3',  prompt: 'A white kitten chases a butterfly across a sunlit garden.',  aspectRatio: '16:9',  duration: 5,  providerOptions: {    minimax: {      pollTimeoutMs: 600000,    },  },});
```

Text to video with MiniMax H3

Pass a starting image with the prompt, and the model animates it following the image's aspect ratio.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'minimax/minimax-h3',  prompt: {    image: firstFrameUrl,    text: 'The camera slowly pulls back to reveal the full landscape.',  },  duration: 5,});
```

Use an image as a starting frame for this model.

Supply reference images, video, or audio as source material, and refer to each by its order in the prompt for reference to video output.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'minimax/minimax-h3',  prompt: 'Keep the subject from Image 1 consistent while they walk through a sunlit garden.',  duration: 5,  inputReferences: [imageUrl],});
```

Reference images and videos for MiniMax H3 to guide output.

[View all video models](https://vercel.com/ai-gateway/models?modality=video) on AI Gateway. Try MiniMax H3 in the [model playground](https://vercel.com/ai-gateway/models/minimax-h3).