---
title: "DeepSeek models now available via Azure on AI Gateway"
source: "https://vercel.com/changelog/deepseek-models-now-available-via-azure-on-ai-gateway"
publishedDate: "2026-06-11"
category: "frontend"
feedName: "Vercel"
author: "Aayush Kapoor"
---

1 min read

Jun 11, 2026

Azure is now a provider for DeepSeek V4 Pro and V4 Flash on [AI Gateway](https://vercel.com/ai-gateway).

Requests to either model can route through Azure alongside the existing providers for another failover path. No code changes are required: default routing considers Azure automatically, and if a provider fails the gateway falls back through the remaining list.

If you want requests to try Azure first, use `order` in the gateway provider options to prefer Azure while keeping the other providers as fallback for `deepseek/deepseek-v4-pro` or `deepseek/deepseek-v4-flash` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'deepseek/deepseek-v4-pro',  prompt: 'Refactor this function to use async/await.',  providerOptions: {    gateway: {      order: ['azure'],    },  },});
```

If you have existing Azure credentials, you can bring your own key and AI Gateway will use it for requests routed to Azure. See [API key authentication and BYOK](https://vercel.com/docs/ai-gateway/authentication-and-byok) for setup.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), and more. AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) (BYOK) requests.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/deepseek-v4-pro).