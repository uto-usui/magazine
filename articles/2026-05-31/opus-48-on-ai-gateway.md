---
title: "Opus 4.8 on AI Gateway"
source: "https://vercel.com/changelog/opus-4-8-on-ai-gateway"
publishedDate: "2026-05-28"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

May 28, 2026

Claude Opus 4.8 is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

Claude Opus 4.8 is built for long-horizon agentic execution and handles complex, multi-step coding tasks like refactors that previously required human correction mid-task. The model also produces clearer, less hedgy prose for knowledge work like drafting documents, analyzing data, and building presentations.

To use Opus 4.8, set model to `anthropic/claude-opus-4.8` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-opus-4.8',  prompt: 'Find and fix the root cause of these intermittent test failures.',  providerOptions: {    anthropic: {      thinking: { type: 'adaptive' },      effort: 'high',    },  },});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [dynamic provider sorting by latency & cost](https://vercel.com/changelog/sort-providers-by-cost-latency-or-throughput-on-ai-gateway), and more. AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) (BYOK) requests.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/opus-4.8).