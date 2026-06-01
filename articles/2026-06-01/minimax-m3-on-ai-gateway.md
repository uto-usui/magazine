---
title: "MiniMax M3 on AI Gateway"
source: "https://vercel.com/changelog/minimax-m3-on-ai-gateway"
publishedDate: "2026-05-31"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

May 31, 2026

MiniMax M3 is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

M3 is MiniMax's first model with a 1M-token context window and native multimodality, built around MiniMax Sparse Attention (MSA).

M3 improves on software engineering, terminal-based tool use, and agentic web browsing, and is tuned for multi-turn collaboration.

To use MiniMax M3, set model to `minimax/minimax-m3` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'minimax/minimax-m3',  prompt: 'Reproduce the bug in this GitHub issue and submit a fix.',});
```

Pass an image alongside a prompt to use M3's multimodal input:

```
import { streamText } from 'ai';const result = streamText({  model: 'minimax/minimax-m3',  messages: [    {      role: 'user',      content: [        {          type: 'text',          text: 'This is a screenshot of a failing test. Identify the root cause and write the patch.',        },        {          type: 'image',          image: 'https://example.com/failing-test.png',        },      ],    },  ],});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [dynamic provider sorting by latency & cost](https://vercel.com/changelog/sort-providers-by-cost-latency-or-throughput-on-ai-gateway), and more. AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) (BYOK) requests.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/minimax-m3).