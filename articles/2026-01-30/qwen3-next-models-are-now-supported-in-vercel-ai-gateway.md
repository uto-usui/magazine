---
title: "Qwen3-Next models are now supported in Vercel AI Gateway"
source: "https://vercel.com/changelog/qwen3-next-models-are-now-supported-in-vercel-ai-gateway"
publishedDate: "2025-09-12"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Sep 12, 2025

You can now access [Qwen3 Next](https://github.com/QwenLM/Qwen3), two ultra-efficient models from [QwenLM](https://qwenlm.github.io/), designed to activate only 3B parameters, using Vercel's [AI Gateway](https://vercel.com/docs/ai-gateway) with no other provider accounts required.

AI Gateway lets you call the model with a consistent unified API and just a single string update, track usage and cost, and configure performance optimizations, retries, and failover for higher than provider-average uptime.

To use it with the [AI SDK v5](https://v5.ai-sdk.dev/docs/introduction), start by installing the package:

```
pnpm i ai
```

Then set the model to `alibaba/qwen3-next-80b-a3b-thinking`:

```
import { streamText } from 'ai'const result = streamText({  model: "alibaba/qwen3-next-80b-a3b-thinking",  prompt: "What's your best argument for the health benefits of burritos?"})
```

Includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway#configuring-your-own-provider-keys-byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway) and access the model [here](https://vercel.com/ai-gateway/models/qwen3-next-80b-a3b-thinking).