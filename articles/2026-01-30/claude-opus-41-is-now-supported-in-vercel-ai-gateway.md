---
title: "Claude Opus 4.1 is now supported in Vercel AI Gateway"
source: "https://vercel.com/changelog/claude-4-1-opus-is-now-supported-in-vercel-ai-gateway"
publishedDate: "2025-08-05"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Aug 5, 2025

You can now access [Claude Opus 4.1](https://www.anthropic.com/news/claude-opus-4-1), a new model released today, using Vercel's [AI Gateway](https://vercel.com/docs/ai-gateway) with no other provider accounts required. This release from Anthropic improves agentic task execution, real-world coding, and reasoning over the previous Opus 4 model.

AI Gateway lets you call the model with a consistent unified API and just a single string update, track usage and cost, and configure performance optimizations, retries, and failover for higher than provider-average uptime.

To use it with the [AI SDK v5](https://v5.ai-sdk.dev/docs/introduction), start by installing the package:

```
pnpm i ai
```

Then set the model to `anthropic/claude-4.1-opus`:

```
import { streamText } from 'ai'const result = streamText({  model: "anthropic/claude-4.1-opus",  prompt: "what's the history of Taqueria La Cumbre in San Francisco?" })
```

Includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway#configuring-your-own-provider-keys-byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

To deliver high performance and reliability to Claude Opus 4.1, AI Gateway leverages multiple model providers under the hood, including Anthropic and Bedrock.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway) and view the [new AI Gateway model leaderboard](https://vercel.com/ai-gateway).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)