---
title: "GPT Image 2 on AI Gateway"
source: "https://vercel.com/changelog/gpt-image-2-on-ai-gateway"
publishedDate: "2026-04-21"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 21, 2026

GPT Image 2 is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

OpenAI's newest image model supports detailed instruction following, accurate placement and relationships between objects, and rendering of dense text across multiple aspect ratios.

The model can render fine-grained elements including small text, iconography, UI elements, dense compositions, and subtle stylistic constraints, at up to 2K resolution. Non-English text is also supported and reads coherently.

GPT Image 2 can produce photos, cinematic stills, pixel art, manga, and other distinct visual styles, with consistency in texture, lighting, composition, and detail. This suits workflows like game prototyping, storyboarding, marketing creative, and medium-specific asset generation.

To use GPT Image 2, set model to `openai/gpt-image-2` in the [AI SDK](https://ai-sdk.dev/), or try it directly in our [m](https://vercel.com/ai-gateway/models/gpt-image-2)[odel playground](https://vercel.com/ai-gateway/models/gpt-image-2).

```
import { generateImage } from 'ai';const result = await generateImage({  model: 'openai/gpt-image-2',  prompt: 'Poster of Vercel AI products, Bauhaus style.',});
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F68Q2JSnbSFhIAJNUdzGv50%2Fa10fc1069c11d393fbe51fbd3abda035%2Fimage__27_.png&w=1080&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4TKc4nyf4YBGEvmoSiPT1m%2Fb834a9357ad717153d5300e89eab2326%2Fimage__27_.png&w=1080&q=75)

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gpt-image-2).