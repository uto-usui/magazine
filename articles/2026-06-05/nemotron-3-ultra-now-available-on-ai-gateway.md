---
title: "Nemotron 3 Ultra now available on AI Gateway"
source: "https://vercel.com/changelog/nemotron-3-ultra-now-available-on-ai-gateway"
publishedDate: "2026-06-04"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jun 4, 2026

Nemotron 3 Ultra from Nvidia is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

Nemotron 3 Ultra is an open Mixture-of-Experts reasoning model built for orchestrating long-running agent workflows, with a 1M token context window. The model targets multi-turn agent workflows: planning, tool use, sub-agent delegation, and error recovery. Throughput reaches up to 350 tokens per second, with up to 30% lower cost on agentic tasks.

To use Nemotron 3 Ultra, set model to `nvidia/nemotron-3-ultra-550b-a55b` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'nvidia/nemotron-3-ultra-550b-a55b',  prompt: 'Plan and run a multi-step research task and synthesize a report.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [dynamic provider sorting by latency and cost](https://vercel.com/changelog/sort-providers-by-cost-latency-or-throughput-on-ai-gateway), and more. AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) (BYOK) requests.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/nemotron-3-ultra-550b-a55b).