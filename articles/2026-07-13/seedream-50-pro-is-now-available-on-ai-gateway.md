---
title: "Seedream 5.0 Pro is now available on AI Gateway"
source: "https://vercel.com/changelog/seedream-5-0-pro-is-now-available-on-ai-gateway"
publishedDate: "2026-07-11"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

Seedream 5.0 Pro is now available on [AI Gateway](https://vercel.com/ai-gateway).

Seedream 5.0 Pro is an image generation and editing model. It generates images from text, rendering text without spelling errors and following typographic rules, and produces dense infographics with charts, timelines, and layouts alongside realistic imagery.

To use Seedream 5.0 Pro, set `model` to `bytedance/seedream-5.0-pro` in the [AI SDK](https://ai-sdk.dev/):

```
import { generateImage } from 'ai';const result = await generateImage({  model: 'bytedance/seedream-5.0-pro',  prompt: 'Design an 8-bit diagram outlining the 2026 world cup stadium locations in black and white.',});
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6ATTTTMUiAcWlWqNmC7hdE%2F13491c7acf4fd15667e0be47baf456d7%2Fworldcup-2026-poster-final.png&w=1080&q=75)

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try Seedream 5.0 Pro in the [model playground](https://vercel.com/ai-gateway/models/seedream-5.0-pro).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)