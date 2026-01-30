---
title: "Nano Banana Pro (Gemini 3 Pro Image) now available in the AI Gateway"
source: "https://vercel.com/changelog/nano-banana-pro-gemini-3-pro-image-now-available-in-the-ai-gateway"
publishedDate: "2025-11-20"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Nov 20, 2025

You can now access Google's cutting edge image model, Nano Banana Pro (Gemini 3 Pro Image), via Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required.

Nano Banana Pro (Gemini 3 Pro Image) is designed to work for more advanced use cases than Nano Banana. This model introduces improvements specifically for professional and creative workflows, like the generation of diagrams with accurate labeling and integration of web search information for images with up-to-date information. Nano Banana Pro also supports higher resolution generation and higher multi-image input limits for better compositing.

To use Nano Banana Pro in AI Gateway with the [AI SDK](https://ai-sdk.dev/), set `model` to `google/gemini-3-pro-image`. Note that this is a multi-modal model and therefore uses `generateText` for the actual image generation.

```
import { generateText } from 'ai';const result = await generateText({  model: 'google/gemini-3-pro-image',  prompt:    `Generate a labeled data pipeline diagram,     from data ingestion through transformation,     storage, and analytics layers.`,});if (result.text) {  process.stdout.write(`\nAssistant: ${result.text}`);}for (const file of result.files) {  if (file.mediaType.startsWith('image/')) {    await presentImages([file]);  }}
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Read the [AI Gateway docs](https://vercel.com/docs/ai-gateway/image-generation) for examples on how to use Nano Banana Pro to generate images, view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try to generate images in our [model playground](https://vercel.com/ai-gateway/models/gemini-3-pro-image).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)