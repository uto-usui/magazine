---
title: "Grok Imagine Video 1.5 Lite on AI Gateway"
source: "https://vercel.com/changelog/grok-imagine-video-1-5-lite-on-ai-gateway"
publishedDate: "2026-10-08"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Grok Imagine Video 1.5 Lite](https://vercel.com/ai-gateway/models/grok-imagine-video-1.5-lite) from xAI is now available on AI Gateway. This lightweight model turns text prompts and images into video with native audio.

The model produces clips from 1 to 15 seconds long in 480p, 720p, and 1080p. Seven aspect ratios cover widescreen, square, and portrait formats, so you can create horizontal scenes or vertical videos from the same generation workflow.

To start generating videos, set the model to `spacexai/grok-imagine-video-1.5-lite` in the [AI SDK](https://ai-sdk.dev/docs/ai-sdk-core/video-generation) or in the [AI CLI](https://github.com/vercel-labs/ai-cli). Chain an image model with Grok Imagine Video 1.5 Lite to create a still and animate it in one flow.

You can also try Grok Imagine Video 1.5 Lite directly in the [AI Gateway Playground](https://vercel.com/ai-gateway/models/grok-imagine-video-1.5-lite#playground).

AI Gateway provides one API for calling models, tracking usage and cost, and configuring routing, retries, and failover. You can use an [AI Gateway API key](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys) or [bring your own provider key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok).