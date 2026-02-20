---
title: "Grok Imagine Video on AI Gateway"
source: "https://vercel.com/changelog/grok-imagine-video-on-ai-gateway"
publishedDate: "2026-02-19"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman "
---

2 min read

Feb 19, 2026

Generate high-quality videos with natural motion and audio using xAI's Grok Imagine Video, now in AI Gateway. Try it out now via the [v0 Grok Creative Studio](https://v0-grokstudio.vercel.app/), AI SDK 6 or by selecting the model in the [AI Gateway playground](https://vercel.com/ai-gateway/models/grok-imagine-video).

Grok Imagine is known for realistic motion and strong instruction following:

-   **Fast Generation**: Generates clips in seconds rather than minutes
    
-   **Instruction Following**: Understands complex prompts and follow-up instructions to tweak scenes
    
-   **Video Editing**: Transform existing videos by changing style, swapping objects, or altering scenes
    
-   **Audio & Dialogue**: Native audio generation with natural, expressive voices and accurate lip-sync
    

## [Link to heading](#three-ways-to-get-started)Three ways to get started

Video generation is in beta and currently available for Pro and Enterprise plans and paid AI Gateway users.

-   [**v0 Grok Creative Studio**](https://v0-grokstudio.vercel.app/): The v0 team created a template that is powered by AI Gateway to create and showcase Grok Video and Image generations.
    
-   **AI SDK 6**: Generate videos programmatically AI SDK 6's `generateVideo`.
    

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'xai/grok-imagine-video',  prompt: 'A golden retriever catching a frisbee mid-air at the beach',});
```

-   **Gateway Playground**: Experiment with video models with no code in the configurable [AI Gateway playground](https://vercel.com/ai-gateway/models/grok-imagine-video) that's embedded in each model page. Compare providers, tweak prompts, and download results without writing code. To access, click any video gen model in the [model list](https://vercel.com/ai-gateway/models?capabilities=video-generation&providers=xai).
    

## [Link to heading](#available-model)Available Model

Model

Description

`xai/grok-imagine-video`

Text-to-video, image-to-video, and video editing

## [Link to heading](#simple:-text-to-video)Simple: Text-to-Video

Generate a video from a text description.

In this example, `xai/grok-imagine-video` is used to generate a video of 2 swans. Note that you can also specify the duration of the output.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'xai/grok-imagine-video',  prompt:   `Two elegant white swans gliding on a misty lake at dawn, soft golden light,    reflections on still water, romantic atmosphere, cinematic`,  aspectRatio: '16:9',  resolution: '1280x720',  duration: 3,});
```

## [Link to heading](#advanced:-reference-to-video)Advanced: Reference-to-Video

Transform an existing video into a new style:

In this example, using a previous generation from Grok Imagine Video, the output was transformed into an animated watercolor style.

The source video is used and edited, which is useful for style transfer, object swapping, and scene transformations.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'xai/grok-imagine-video',  prompt:   'Transform into anime style, soft hand-painted look, warm dreamy atmosphere',  providerOptions: {    xai: {      videoUrl: sourceVideo,    },  },});
```

## [Link to heading](#learn-more)Learn More

For more examples and detailed configuration options for Grok Imagine Video, check out the [Video Generation Documentation](https://vercel.com/docs/ai-gateway/capabilities/video-generation). You can also find simple getting started scripts with the [Video Generation Quick Start](https://vercel.com/docs/ai-gateway/getting-started/video).