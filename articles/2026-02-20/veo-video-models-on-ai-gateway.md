---
title: "Veo video models on AI Gateway"
source: "https://vercel.com/changelog/veo-video-models-on-ai-gateway"
publishedDate: "2026-02-19"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman "
---

2 min read

Feb 19, 2026

Generate photorealistic videos with synchronized audio using Google's Veo models, now available through AI Gateway. Try them out now via AI SDK 6 or by selecting the models in the AI Gateway playground.

Veo models are known for their cinematic quality and audio generation:

-   **Native Audio Generation:** Automatically generate realistic sound effects, ambient audio, and even dialogue that matches your video
    
-   **Up to 4K Resolution:** Generate videos at 720p, 1080p, or 4K
    
-   **Photorealistic Quality:** Realism for nature, wildlife, and cinematic scenes
    
-   **Image-to-Video:** Animate still photos with natural motion
    
-   **Fast Mode:** Quicker generation when you need rapid iterations
    

## [Link to heading](#two-ways-to-get-started)Two ways to get started

Video generation is in beta and currently available for Pro and Enterprise plans and paid AI Gateway users.

-   **AI SDK 6**: Generate videos programmatically AI SDK 6's `generateVideo`.
    

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'google/veo-3.1-generate-001',  prompt: 'Woman sipping coffee by a rain-streaked window, cozy morning light.',});
```

-   **Gateway Playground**: Experiment with video models with no code in the configurable [AI Gateway playground](https://vercel.com/ai-gateway/models/veo-3.1-generate-001) that's embedded in each model page. Compare providers, tweak prompts, and download results without writing code. To access, click any video gen model in the [model list](https://vercel.com/ai-gateway/models?capabilities=video-generation&providers=vertex).
    

## [Link to heading](#available-models)Available Models

Model

Description

`google/veo-3.1-generate-001`

Latest generation, highest quality

`google/veo-3.1-fast-generate-001`

Fast mode for quicker iterations

`google/veo-3.0-generate-001`

Full quality generation

`google/veo-3.0-fast-generate-001`

Fast mode generation

## [Link to heading](#simple:-text-to-video-with-audio)Simple: Text-to-Video with Audio

Describe a scene and get a video.

Generate a cinematic wildlife video with natural sound: here `google/veo-3.1-generate-001` is used with `generateAudio: true`.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'google/veo-3.1-generate-001',  prompt:   `Close-up of a great horned owl    turning its head slowly in a moonlit forest.`,  aspectRatio: '16:9',  providerOptions: {    vertex: { generateAudio: true },  },});
```

## [Link to heading](#advanced:-image-to-video-with-dialog)Advanced: Image-to-Video with Dialog

A common workflow to ensure quality is generating a custom image with Gemini 3 Pro Image (Nano Banana Pro), then bringing it to life with Veo, complete with motion and spoken dialog.

Starting image from Nano Banana Pro:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6nkpj5OtIvVVR8AqPOvaYc%2F2180883c100ed41480bc47b266c22733%2Fpodcast-host.png&w=1920&q=75)

Use prompts with image input with the Veo models for more control over the output. This example uses `google/veo-3.1-generate-001`, which supports image to video.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'google/veo-3.1-generate-001',  prompt: {    image: imageUrl,    text:     `The podcast host says "Welcome back to the show! Today we are diving      into something really exciting." with a friendly smile, rain falling on      window, cozy atmosphere.`,  },  aspectRatio: '16:9',  duration: 4,  providerOptions: {    vertex: { generateAudio: true },  },});
```

## [Link to heading](#learn-more)Learn More

For more examples and detailed configuration options for Veo models, check out the [Video Generation Documentation](https://vercel.com/docs/ai-gateway/capabilities/video-generation). You can also find simple getting started scripts with the [Video Generation Quick Start](https://vercel.com/docs/ai-gateway/getting-started/video).