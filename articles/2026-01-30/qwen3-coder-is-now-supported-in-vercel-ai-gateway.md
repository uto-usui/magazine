---
title: "Qwen3-Coder is now supported in Vercel AI Gateway"
source: "https://vercel.com/changelog/qwen3-coder-is-now-supported-in-vercel-ai-gateway"
publishedDate: "2025-07-25"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jul 25, 2025

You can now access [Qwen3 Coder](https://github.com/QwenLM/Qwen3-Coder), a model from [QwenLM](https://qwenlm.github.io/), an Alibaba Cloud company, designed to handle complex, multi-step coding workflows, using Vercel's [AI Gateway](https://vercel.com/docs/ai-gateway) with no other provider accounts required.

AI Gateway lets you call the model with a consistent unified API and just a single string update, track usage and cost, and configure performance optimizations, retries, and failover for higher than provider-average uptime.

To use it with the [AI SDK v5](https://v5.ai-sdk.dev/docs/introduction), start by installing the package:

```
pnpm i ai
```

Then set the model to `alibaba/qwen3-coder`:

```
import { streamText } from 'ai'const result = streamText({  model: "alibaba/qwen3-coder",  prompt: "What's your best argument for the health benefits of burritos?"})
```

Includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway#configuring-your-own-provider-keys-byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

To deliver high performance and reliability to Qwen3 Coder, AI Gateway leverages multiple model providers under the hood, including Cerebras, DeepInfra, and Parasail.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway).