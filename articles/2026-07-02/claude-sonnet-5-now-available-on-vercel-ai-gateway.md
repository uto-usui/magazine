---
title: "Claude Sonnet 5 now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/claude-sonnet-5-ai-gateway"
publishedDate: "2026-06-30"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

Claude Sonnet 5 from Anthropic is now available on [AI Gateway](https://vercel.com/ai-gateway). Sonnet 5 improves on Sonnet 4.6 across coding and agentic work, reaching outcomes on many tasks that previously needed an Opus model, at Sonnet pricing.

The model is more agentic and follows instructions more closely. Document parsing and long-context memory use are also stronger. Sonnet 5 also uses an updated tokenizer, like the recent Opus models, which can map the same input to more tokens.

Launch pricing of $2 per million input tokens and $10 per million output tokens runs through August 31, 2026. Standard list price will be $3/M input tokens, $15/M output tokens.

To use Sonnet 5, set `model` to `anthropic/claude-sonnet-5` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-sonnet-5',  prompt: 'Refactor this module and add tests for the edge cases.',  providerOptions: {    anthropic: {      thinking: { type: 'adaptive' },      effort: 'medium',    },  },});
```

You can also try Sonnet 5 in the [model playground](https://vercel.com/ai-gateway/models/sonnet-5).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)