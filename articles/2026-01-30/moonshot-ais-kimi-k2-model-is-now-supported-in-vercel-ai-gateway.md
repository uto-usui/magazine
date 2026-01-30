---
title: "Moonshot AI's Kimi K2 model is now supported in Vercel AI Gateway"
source: "https://vercel.com/changelog/moonshot-ai-kimi-k2-model-is-now-supported-in-vercel-ai-gateway"
publishedDate: "2025-07-15"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jul 15, 2025

You can now access [Kimi K2](https://github.com/MoonshotAI/Kimi-K2), a new mixture-of-experts (MoE) language model from [Moonshot AI](https://www.moonshot.ai/), using Vercel's [AI Gateway](https://vercel.com/docs/ai-gateway) with no other provider accounts required.

AI Gateway lets you call the model with a consistent unified API and just a single string update, track usage and cost, and configure performance optimizations, retries, and failover for higher than provider-average uptime.

To use it with the [AI SDK v5](https://v5.ai-sdk.dev/docs/introduction), start by installing the package:

```
pnpm i ai
```

Then set the model to `moonshotai/kimi-k2`:

```
import { streamText } from 'ai'const result = streamText({  model: 'moonshotai/kimi-k2',  prompt: 'What is the history of the San Francisco Mission-style burrito?'})
```

Includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway#configuring-your-own-provider-keys-byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

To deliver high performance and reliability to Kimi K2, AI Gateway leverages multiple model providers under the hood, including direct to Moonshot AI, Groq, DeepInfra, Fireworks AI, and Parasail.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway).