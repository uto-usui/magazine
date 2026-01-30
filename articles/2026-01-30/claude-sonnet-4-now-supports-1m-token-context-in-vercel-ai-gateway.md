---
title: "Claude Sonnet 4 now supports 1M token context in Vercel AI Gateway"
source: "https://vercel.com/changelog/claude-sonnet-4-now-supports-1m-token-context-in-vercel-ai-gateway"
publishedDate: "2025-08-12"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Aug 12, 2025

You can now leverage [Claude Sonnet 4's updated 1 million-token context window](https://www.anthropic.com/news/1m-context) with Vercel's [AI Gateway](https://vercel.com/docs/ai-gateway) with no other provider accounts required. This release from Anthropic enables significantly larger inputs such as full codebases (~75,000+ lines) or large document sets.

AI Gateway lets you call the model with a consistent unified API and just a single string update, track usage and cost, and configure performance optimizations, retries, and failover for higher than provider-average uptime.

To use it with the [AI SDK v5](https://v5.ai-sdk.dev/docs/introduction), start by installing the package:

```
pnpm i ai
```

Then set the model to `anthropic/claude-4-sonnet`:

```
import { streamText } from 'ai';import { largePrompt } from './largePrompt.ts';const result = streamText({  headers: {    'anthropic-beta': 'context-1m-2025-08-07',  },  model: 'anthropic/claude-4-sonnet',  prompt: `You have a big brain. Summarize into 3 sentences: ${largePrompt}`,  providerOptions: {    gateway: { only: ['anthropic'] },  },});
```

Includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway#configuring-your-own-provider-keys-byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

To deliver high performance and reliability to Claude Sonnet 4, AI Gateway leverages multiple model providers under the hood, including Anthropic and Bedrock.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway) and view the [new AI Gateway model leaderboard](https://vercel.com/ai-gateway).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)