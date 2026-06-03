---
title: "Qwen 3.7 Plus now available on AI Gateway"
source: "https://vercel.com/changelog/qwen-3-7-plus-now-available-on-ai-gateway"
publishedDate: "2026-06-01"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jun 1, 2026

Qwen 3.7 Plus from Alibaba is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway). Both Qwen 3.7 Plus and 3.7 Max are free for paid AI Gateway users till 6/4/26 12:00pm PT.

The model unifies vision and language into a single agent foundation, with capabilities spanning GUI and CLI operation, coding and productivity workflows with full-modality input, and visual agent tasks including perception and reasoning. It is designed to generalize across diverse agent harnesses.

To use Qwen 3.7 Plus, set model to `alibaba/qwen-3.7-plus` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'alibaba/qwen3.7-plus',  prompt: `Click through the checkout flow and flag any UI bugs you find.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [dynamic provider sorting by latency and cost](https://vercel.com/changelog/sort-providers-by-cost-latency-or-throughput-on-ai-gateway), and more. AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) (BYOK) requests.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/qwen3.7-plus).