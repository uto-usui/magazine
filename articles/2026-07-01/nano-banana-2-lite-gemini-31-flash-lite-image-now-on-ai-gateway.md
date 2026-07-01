---
title: "Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image) now on AI Gateway"
source: "https://vercel.com/changelog/nano-banana-2-lite-gemini-3-1-flash-lite-image-ai-gateway"
publishedDate: "2026-06-30"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

Nano Banana 2 Lite from Google is now available on [AI Gateway](https://vercel.com/ai-gateway). This Flash-Lite-tier image model is built for fast, low-cost generation. It generates images alongside text in <4s and can edit existing images across multiple turns.

The cost is also lower than previous Nano Banana models. Nano Banana 2 Lite generates 1K images at $0.034 each, about half the cost of Nano Banana 2 and roughly a quarter of the cost of Nano Banana Pro at the same resolution.

This model is multimodal. Use `streamText` or `generateText` to generate images alongside text responses.

To use Nano Banana 2 Lite, set `model` to `google/gemini-3.1-flash-lite-image` in the [AI SDK](https://ai-sdk.dev/):

```
import { generateText } from 'ai';const result = await generateText({  model: 'google/gemini-3.1-flash-lite-image',  providerOptions: {    google: { responseModalities: ['TEXT', 'IMAGE'] },  },  prompt: 'Vercel shipping container boat in 8-bit.',});
```

Here is the example output from the above prompt:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3bCPfcqHa8HY5uzJrwCECf%2F793ceb12f214c579ed630946427478d1%2FHMFAA5_bIAAwopT.jpeg&w=1920&q=75)

You can also try Nano Banana 2 Lite in the [model playground](https://vercel.com/ai-gateway/models/sonnet-5).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)