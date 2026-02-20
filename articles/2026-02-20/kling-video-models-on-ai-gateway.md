---
title: "Kling video models on AI Gateway"
source: "https://vercel.com/changelog/kling-video-models-on-ai-gateway"
publishedDate: "2026-02-19"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman "
---

3 min read

Feb 19, 2026

Kling video models are now available in AI Gateway, including the newest Kling 3.0 models. Generate cinematic videos from text, images, or motion references with Kling's state-of-the-art video models, now available through AI Gateway and AI SDK.

Kling models are known for their image to video models and multishot capabilities:

-   **Image-to-Video Capabilities**: Strong at animating still images into video clips
    
-   **Realistic Motion and Physics**: Known for coherent motion, facial expressions, and physical interactions
    
-   **High Resolution Output**: Supports up to 1080p generation (pro mode)
    
-   **Multishot Narratives**: Kling 3.0 can generate multi-scene videos from a single narrative prompt
    
-   **Audio Generation**: Create synchronized sound effects and ambient audio alongside your video
    
-   **First & Last Frame Control**: Specify both start and end frames for precise scene transitions
    

## [Link to heading](#two-ways-to-get-started)Two ways to get started

Video generation is in beta and currently available for Pro and Enterprise plans and paid AI Gateway users.

-   **AI SDK 6**: Generate videos programmatically AI SDK 6's `generateVideo`.
    

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'klingai/kling-v2.6-t2v',  prompt: 'A chef plates a dessert with caramel drizzle. Kitchen ambiance.',});
```

-   **Gateway Playground**: Experiment with video models with no code in the configurable [AI Gateway playground](https://vercel.com/ai-gateway/models/kling-v3.0-t2v) that's embedded in each model page. Compare providers, tweak prompts, and download results without writing code. To access, click any video gen model in the [model list](https://vercel.com/ai-gateway/models?capabilities=video-generation&providers=klingai).
    

## [Link to heading](#available-models)Available Models

Model

Type

Description

`klingai/kling-v3.0-t2v`

Text-to-Video

Latest generation, highest quality with multishot support

`klingai/kling-v3.0-i2v`

Image-to-Video, First-and-Last-Frame

Animate images with v3 quality and multiple frames

`klingai/kling-v2.6-t2v`

Text-to-Video

Audio generation support

`klingai/kling-v2.6-i2v`

Image-to-Video, First-and-Last-Frame

Use images as reference

`klingai/kling-v2.5-turbo-t2v`

Text-to-Video

Faster generation

`klingai/kling-v2.5-turbo-i2v`

Image-to-Video, First-and-Last-Frame

Faster generation

## [Link to heading](#simple:-text-to-video-with-audio)Simple: Text-to-Video with Audio

Generate a video from a text description.

In this example, model `klingai/kling-v3.0-t2v` is used to generate a video of a cherry blossom tree with no inputs other than a simple text prompt.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'klingai/kling-v3.0-t2v',  prompt:   `Cherry blossom petals falling in slow motion through golden sunlight,    Japanese garden with a stone lantern, peaceful atmosphere, cinematic`,  aspectRatio: '16:9',  duration: 5,  providerOptions: {    klingai: {      mode: 'pro',    },  },});
```

## [Link to heading](#advanced:-multishot-video)Advanced: Multishot Video

Generate a narrative video with multiple scenes with only a single prompt. Using Kling 3.0's multishot feature, the model intelligently cuts between shots to tell a complete story:

The prompt is written as a narrative with multiple distinct scenes for the best results. `shotType: 'intelligence'` lets the model decide optimal shot composition and `sound: 'on'` generates synchronized audio for the entire video. Note that the prompt here is in the `providerOptions` since this functionality is specific to Kling. The Kling 3.0 models support this functionality: here `klingai/kling-v3.0-t2v` is used.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'klingai/kling-v3.0-t2v',  prompt: '',  aspectRatio: '16:9',  duration: 10,  providerOptions: {    klingai: {      mode: 'pro',      multiShot: true,      shotType: 'intelligence',      prompt:       `Elephants walk across a golden savanna under gathering storm clouds.        Lightning cracks in the distance. Rain begins to fall heavily.        The herd finds shelter under acacia trees.        The storm clears revealing a double rainbow.`,      sound: 'on',    },  },});
```

## [Link to heading](#advanced:-first-&-last-frame-control)Advanced: First & Last Frame Control

Control exactly how your video starts and ends by providing both a first frame and last frame image. This is perfect for time-lapse effects or precise scene transitions:

These 2 images were provided as start and end frames.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7rNmMOnFcjbH73BbQMsncd%2Fb990d46d3751c94bc426675f6e2dad07%2FGroup_1__2_.png&w=1920&q=75)

Using AI SDK 6, you can set `image` and `lastFrameImage` with your start and end frames. In this example, `klingai/kling-v3.0-i2v` is used for the model.

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'klingai/kling-v3.0-i2v',  prompt: {    image: startImage,    text: `Time-lapse of a pink peony flower blooming.     The tight bud slowly unfurls, petals gently separating and opening outward.     Smooth organic movement. Soft natural lighting.`,  },  duration: 10,  providerOptions: {    klingai: {      lastFrameImage: endImage,      mode: 'pro',    },  },});
```

## [Link to heading](#learn-more)Learn More

For more examples and detailed configuration options for Kling models, check out the [Video Generation Documentation](https://vercel.com/docs/ai-gateway/capabilities/video-generation). You can also find simple getting started scripts with the [Video Generation Quick Start](https://vercel.com/docs/ai-gateway/getting-started/video).