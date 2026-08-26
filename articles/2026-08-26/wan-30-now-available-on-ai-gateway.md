---
title: "Wan 3.0 now available on AI Gateway"
source: "https://vercel.com/changelog/wan-3-0-now-available-on-ai-gateway"
publishedDate: "2026-08-25"
category: "frontend"
feedName: "Vercel"
author: "Josh Lipman"
---

[Wan 3.0 from Alibaba](https://vercel.com/ai-gateway/models/wan-v3.0-video) is now available on AI Gateway as `alibaba/wan-v3.0-video`.

One model covers text to video, image to video, first and last frame conditioning, and reference-based generation, and it takes image, video, and audio as references. Clips run up to 30 seconds at 30fps, in 480p, 720p, or 1080p, and the output carries audio by default.

That consolidates what took several models before. Wan 2.7 shipped as separate `-t2v` and `-r2v` IDs, each capped at 15 seconds and 24fps.

## [Copy link to heading](#generating-a-video)Generating a video

Try the new [asynchronous generation](https://vercel.com/docs/ai-gateway/modalities/video-generation#asynchronous-generation) on AI Gateway, which runs the job in the background instead of holding a request open.

Pass a `webhook` and the gateway posts one event to your endpoint when the generation lands:

```
const { videos } = await generateVideo({  model: 'alibaba/wan-v3.0-video',  prompt: 'A paper lantern drifting over a harbor at night',  webhook: async () => ({ url: callbackUrl, received: waitForDelivery(token) }),});
```

The docs cover all methods of asynchronous video, including [how to verify a delivery](https://vercel.com/docs/ai-gateway/modalities/video-generation#verifying-the-delivery).

## [Copy link to heading](#references)References

Pass references under `inputReferences`, each with its URL and media type, and describe the scene in the prompt. The limits differ by kind. Audio references have to be hosted URLs, where images also accept base64. First and last frame conditioning takes one image each and cannot be combined with references.

You can also try Wan 3.0 with no code in the [model playground](https://vercel.com/ai-gateway/models/wan-v3.0-video). To see more, [browse all video models](https://vercel.com/ai-gateway/models?type=video).