---
title: "Seedance 2.5 now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/seedance-2-5-now-available-on-vercel-ai-gateway"
publishedDate: "2026-08-06"
category: "frontend"
feedName: "Vercel"
author: "Josh Lipman"
---

[Seedance 2.5](https://vercel.com/ai-gateway/models/seedance-2.5) from ByteDance is now available on AI Gateway. It generates up to 30 seconds in a single clip, holding camera movement and continuity without stitching shots together in post. Short clips can also be extended with character, scene, and camera movement carried over.

Seedance 2.5 supports text, video, image, and audio as inputs in the same request, following a subject's appearance from one asset and the motion or camera work from another. On a finished video it edits locally, swapping backgrounds, products, or characters while the frame, camera, and pacing stay put, which is how one cut becomes several versions. Prompts work in more than ten languages.

## [Copy link to heading](#generating-a-video)Generating a video

Set `model` to `bytedance/seedance-2.5` and call `generateVideo` from the [AI SDK](https://ai-sdk.dev/):

```
import { experimental_generateVideo as generateVideo } from 'ai';import fs from 'node:fs';const { videos } = await generateVideo({  model: 'bytedance/seedance-2.5',  prompt: 'A chicken flying into the sunset in the style of 90s anime',  resolution: '1920x1080',  duration: 30,});fs.writeFileSync('output.mp4', videos[0].uint8Array);
```

## [Copy link to heading](#image-references)Image references

Pass in image URLs under `referenceImages` and point at them in the prompt with `[Image 1]`, `[Image 2]`.

```
const { videos } = await generateVideo({  model: 'bytedance/seedance-2.5',  prompt: 'A boy from [Image 1] walking a corgi from [Image 2] through the park at sunset',  resolution: '1920x1080',  duration: 10,  generateAudio: true,  inputReferences: [    { data: boyUrl, mediaType: 'image/jpeg' },    { data: corgiUrl, mediaType: 'image/jpeg' },  ],});
```

## [Copy link to heading](#video-editing-and-references)Video editing and references

`referenceVideos` is numbered separately from the images, so `[Video 1]` and `[Image 1]` can appear in the same prompt: motion from one asset, appearance from another.

```
const { videos } = await generateVideo({  model: 'bytedance/seedance-2.5',  prompt: 'Follow the camera movement and pacing of [Video 1], with the product from [Image 1]',  resolution: '1920x1080',  duration: 15,  inputReferences: [    { data: clipUrl, mediaType: 'video/mp4' },    { data: productUrl, mediaType: 'image/jpeg' },  ],});
```

A reference feeds a new generation, contributing motion, camera work, or pacing to something the model builds from scratch. Editing changes a finished video in place. Mixing the two roles in one prompt gives less stable results, so be explicit about what each source asset is for.

For more details, and to try Seedance 2.5 playground and API reference, go to the [model page](https://vercel.com/ai-gateway/models/seedance-2.5). For more video models on AI Gateway, [view all video models](https://vercel.com/ai-gateway/models?type=video).