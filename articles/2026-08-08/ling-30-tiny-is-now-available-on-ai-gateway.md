---
title: "Ling 3.0 Tiny is now available on AI Gateway"
source: "https://vercel.com/changelog/ling-3-0-tiny-is-now-available-on-ai-gateway"
publishedDate: "2026-08-06"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Ling 3.0 Tiny](https://vercel.com/ai-gateway/models/ling-3.0-tiny-free) from ANT Group is now on AI Gateway, free to use till 8:00am PT on 8/14. Ling 3.0 Tiny takes the free slot from [Ling 3.0 Flash](https://vercel.com/ai-gateway/models/ling-3.0-flash).

Ling 3.0 Tiny is a MOE model with 7.9B total parameters and about 1.3B active per token, a 256K token context window, and up to 32K output tokens. The model is built for responsive agents, instruction following, and multi-turn conversation, with native function calling and prompt caching.

To use Ling 3.0 Tiny, set `model` to `inclusionai/ling-3.0-tiny-free` in the [AI SDK](https://ai-sdk.dev/). On August 14th, the new model name will be `inclusionai/ling-3.0-tiny`.

```
import { streamText } from 'ai';const result = streamText({  model: 'inclusionai/ling-3.0-tiny-free',  prompt: 'Summarize this thread and draft a reply.',});
```

Try Ling 3.0 Tiny in the [model playground](https://vercel.com/ai-gateway/models/ling-3.0-tiny-free).

To use it in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run `vercel ai-gateway coding-agents setup` and select `inclusionai/ling-3.0-tiny-free` inside the agent.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.