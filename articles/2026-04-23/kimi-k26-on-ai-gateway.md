---
title: "Kimi K2.6 on AI Gateway"
source: "https://vercel.com/changelog/kimi-k2.6-on-ai-gateway"
publishedDate: "2026-04-20"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 20, 2026

Kimi K2.6 from Moonshot AI is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

The model focuses on long-horizon coding tasks, with generalization across languages such as Rust, Go, and Python and across front-end, devops, and performance optimization work. K2.6 can turn simple prompts into complete front-end interfaces with structured layouts.

For autonomous, proactive agents that run continuously across multiple applications, K2.6 improves on API interpretation, long-running stability, and safety awareness during extended research tasks.

To use Kimi K2.6, set model to `moonshotai/kimi-k2.6` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k2.6',  prompt:    `Build a landing page for a developer tools product,     including a hero section with scroll-triggered     animations and generated imagery.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/kimi-k2.6).