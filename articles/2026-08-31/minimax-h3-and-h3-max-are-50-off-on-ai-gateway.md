---
title: "MiniMax H3 and H3 Max are 50% off on AI Gateway"
source: "https://vercel.com/changelog/minimax-h3-and-h3-max-are-50-off-on-ai-gateway"
publishedDate: "2026-08-30"
category: "frontend"
feedName: "Vercel"
author: "Josh Lipman"
---

[MiniMax H3](https://vercel.com/ai-gateway/models/minimax-h3) and [H3 Max](https://vercel.com/ai-gateway/models/minimax-h3-max) are 50% off on AI Gateway from August 30 through September 13, in partnership with MiniMax.

The discount covers requests billed through AI Gateway, at every duration and in every aspect ratio the model supports.

-   H3 generates 2K video from a text prompt, a starting image, a pair of first and last frames, or reference images, video, and audio.
    
-   H3 Max trades resolution for speed: it renders faster at 480p and 768p, and it takes a text prompt or a starting image.
    

The model IDs (`minimax/minimax-h3` and `minimax/minimax-h3-max`) are unchanged, so requests you already send pick up the discounted rate with no code change:

```
import { experimental_generateVideo as generateVideo } from 'ai';const { videos } = await generateVideo({  model: 'minimax/minimax-h3-max',  prompt: 'San Francisco sunrise on a weekend morning.',  duration: 5,  poll: { timeoutMs: 600000 },});
```

Renders take minutes, so `poll` runs the generation as a background job and makes short status requests until it lands, rather than holding one long request open. See [asynchronous generation](https://vercel.com/docs/ai-gateway/modalities/video-generation#asynchronous-generation) for the webhook and start-and-status routes.

## [Copy link to heading](#get-started)Get started

[Create an API key](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway&title=AI+Gateway) in the AI Gateway section of your dashboard, or generate a clip in the browser first from the [model playground](https://vercel.com/ai-gateway/models/minimax-h3).

Current rates for every model are on the [pricing page](https://vercel.com/docs/ai-gateway/pricing). You can view [all video models](https://vercel.com/ai-gateway/models?type=video) available on AI Gateway.