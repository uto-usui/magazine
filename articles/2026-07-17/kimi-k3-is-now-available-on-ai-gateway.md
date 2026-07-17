---
title: "Kimi K3 is now available on AI Gateway"
source: "https://vercel.com/changelog/kimi-k3-is-now-available-on-ai-gateway"
publishedDate: "2026-07-16"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Kimi K3 from Moonshot AI](https://vercel.com/ai-gateway/models/kimi-k3) is now available on AI Gateway.

K3 is an open-source model with a 1M-token context window and native visual understanding, accepting text, image, and video inputs.

Built for long-horizon software engineering, knowledge work, and deep reasoning, K3 is especially strong where code meets visual and spatial reasoning, which suits frontend, game development, and CAD workflows. Thinking mode is always on.

To use Kimi K3, set `model` to `moonshotai/kimi-k3` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k3',  prompt: 'Trace this rendering bug across the codebase and open a PR with a fix.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try Kimi K3 in the [model playground](https://vercel.com/ai-gateway/models/kimi-k3).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)