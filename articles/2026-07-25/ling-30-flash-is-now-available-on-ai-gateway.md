---
title: "Ling 3.0 Flash is now available on AI Gateway"
source: "https://vercel.com/changelog/ling-3-0-flash-is-now-available-on-ai-gateway"
publishedDate: "2026-07-23"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Ling 3.0 Flash](https://vercel.com/ai-gateway/models/ling-3.0-flash-free) from Ant Group is now available on AI Gateway.

The model is free to use for the next three weeks, through August 3rd.

Ling 3.0 Flash is a Mixture-of-Experts model with 124B total parameters and about 5.1B active per token. It has a 256K token context window and runs in thinking and non-thinking modes.

Ling 3.0 Flash is built for token-efficient agentic inference at production scale, doing more work within tighter token, latency, and cost budgets across multi-step agent runs. The model targets high-frequency agentic workflows, coding agents, document work, and long-context multi-turn interactions.

To use Ling 3.0 Flash, set model to `inclusionai/ling-3.0-flash-free` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'inclusionai/ling-3.0-flash-free',  prompt: 'Triage the open issues in this repo and group them by theme.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try Ling 3.0 Flash in the [model playground](https://vercel.com/ai-gateway/models/ling-3.0-flash-free).