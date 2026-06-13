---
title: "Claude Fable 5 now available on AI Gateway"
source: "https://vercel.com/changelog/claude-fable-5-now-available-on-ai-gateway"
publishedDate: "2026-06-09"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

2 min read

Jun 9, 2026

Claude Fable 5 from Anthropic is now available on [AI Gateway](https://vercel.com/ai-gateway). A Mythos-class model, Fable 5 is a notable step up over prior Claude models on long-running, ambiguous, multi-step tasks, executing end-to-end on work that previously required frequent human check-ins.

The model sustains productive output across multi-day runs and dependably dispatches parallel sub-agents, and lower effort settings often match what prior Claude models produced at their highest effort. Code review, bug-finding, and repository investigation are stronger, and first-shot correctness on complex problems is noticeably higher.

Fable 5 ships with blocking classifiers in place that refuse offensive cybersecurity, biology, and summarized-thinking extraction, because the model's capabilities in those areas introduce real misuse risk. Anthropic also does not support Zero Data Retention because some misuse patterns only become visible across cumulative requests. Prompts and completions are retained for 30 days and are not used to train Claude.

To use Fable 5, set model to `anthropic/claude-fable-5` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-fable-5',  prompt: 'Investigate why p99 latency regressed and propose a fix.',  providerOptions: {    anthropic: {      thinking: { type: 'adaptive' },      effort: 'high',    },  },});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [dynamic provider sorting by latency and cost](https://vercel.com/changelog/sort-providers-by-cost-latency-or-throughput-on-ai-gateway), and more. AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) (BYOK) requests.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/claude-fable-5).