---
title: "Kimi K2.7 Code now available on AI Gateway"
source: "https://vercel.com/changelog/kimi-k2-7-code-now-available-on-ai-gateway"
publishedDate: "2026-06-12"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

1 min read

Jun 12, 2026

Kimi K2.7 Code from Moonshot AI is now available on [AI Gateway](https://vercel.com/ai-gateway).

K2.7 Code is a coding model built for long-horizon programming tasks, generalizing across scenarios including frontend development, DevOps, and performance optimization. The model has a native multimodal architecture that supports text and vision input, and always runs in thinking mode.

To use K2.7 Code, set model to `moonshotai/kimi-k2.7-code` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k2.7-code',  prompt: 'Refactor this service to remove the N+1 queries.',});
```

Pass an image alongside a prompt to use the model's multimodal input:

```
import { streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k2.7-code',  messages: [    {      role: 'user',      content: [        { type: 'text', text: 'Describe the image in detail.' },        {          type: 'image',          image:            'https://exampleimage.com',        },      ],    },  ],});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), and more. AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) (BYOK) requests.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/kimi-k2.7-code).