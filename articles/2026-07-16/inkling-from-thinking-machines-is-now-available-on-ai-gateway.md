---
title: "Inkling from Thinking Machines is now available on AI Gateway"
source: "https://vercel.com/changelog/inkling-from-thinking-machines-is-now-available-on-ai-gateway"
publishedDate: "2026-07-15"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Inkling from Thinking Machines](https://vercel.com/ai-gateway/models/inkling) is now available on AI Gateway.

Inkling is a broad generalist model, trained across agentic, reasoning, coding, instruction-following, factuality, vision, and audio tasks rather than optimized for a single domain. The model also supports controllable thinking effort.

To use Inkling, set `model` to `thinkingmachines/inkling` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'thinkingmachines/inkling',  prompt: 'Summarize this report and list the key risks.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try Inkling in the [model playground](https://vercel.com/ai-gateway/models/inkling).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)