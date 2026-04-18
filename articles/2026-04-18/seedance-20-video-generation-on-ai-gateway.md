---
title: "Seedance 2.0 Video Generation on AI Gateway"
source: "https://vercel.com/changelog/seedance-2.0-video-now-available-on-ai-gateway"
publishedDate: "2026-04-15"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

2 min read

Apr 15, 2026

You can now access Bytedance's latest state-of-the-art video generation model, Seedance 2.0, via [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required.

Seedance 2.0 is available on AI Gateway in two variants: Standard and Fast. Both share the same capabilities. Standard produces the highest quality output, while Fast prioritizes generation speed and lower cost.

Seedance 2.0 is strong at maintaining motion stability and fine detail across frames, producing consistent output even in complex scenes with facial expressions and physical interactions. The model also generates synchronized audio natively, with support for speech in multiple languages and dialects.

Beyond text-to-video and image-to-video, Seedance 2.0 adds multimodal reference-to-video, letting you combine image, video, and audio inputs as reference material in a single generation. It also supports video editing and video extension, along with professional camera movements, multi-shot composition, and in-video text rendering.

To use this model, set model to `bytedance/seedance-2.0` or `bytedance/seedance-2.0-fast` in the [AI SDK](https://ai-sdk.dev/) or try it out in the [AI Gateway Playground](https://vercel.com/ai-gateway/models/seedance-2.0).

**Text to Video**

Generate video from a text prompt. Describe the scene, camera movement, and audio for the model to produce.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'bytedance/seedance-2.0',  prompt:   `Black triangle sticker peels off laptop and zips across the office. It smashes    through the window and into the San Francisco sky.`,  aspectRatio: '16:9',  resolution: '720p',  duration: 5,});
```

**Image to Video**

Generate video from a starting image. The model animates the image based on the text prompt while preserving the visual content of the source frame.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'bytedance/seedance-2.0',  prompt: {    image: catImageUrl,    text: 'The cat is celebrating a birthday with another cat.',  },  duration: 10,  providerOptions: {    bytedance: { generateAudio: true },  },});
```

**Reference to Video**

Generate video using image, video, or audio references as source material. You can combine multiple reference types in a single generation to control visual style, motion, and sound.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'bytedance/seedance-2.0',  prompt: 'Replace the cat in [Video 1] with the lion from [Image 1].',  duration: 10,  providerOptions: {    bytedance: {      referenceImages: [Image 1],      referenceVideos: [Video 1],      generateAudio: true,    },  },});
```

AI Gateway does not charge any markup on video generation: Seedance 2.0 and 2.0 Fast are at the same price as going direct to the Bytedance provider.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/seedance-2.0).