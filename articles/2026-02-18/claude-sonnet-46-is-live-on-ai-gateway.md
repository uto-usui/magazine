---
title: "Claude Sonnet 4.6 is live on AI Gateway"
source: "https://vercel.com/changelog/claude-sonnet-4-6-is-live-on-ai-gateway"
publishedDate: "2026-02-17"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Feb 17, 2026

Claude Sonnet 4.6 from Anthropic is now available on AI Gateway with the 1M token context window.

Sonnet 4.6 approaches Opus-level intelligence with strong improvements in agentic coding, code review, frontend UI quality, and computer use accuracy. The model proactively executes tasks, delegates to subagents, and parallelizes tool calls, with MCP support for scaled tool use. As a hybrid reasoning model, Sonnet 4.6 delivers both near-instant responses and extended thinking within the same model.

To use this model, set model to `anthropic/claude-sonnet-4.6` in the AI SDK. This model supports `effort` and thinking type `adaptive`:

```
import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-sonnet-4.6',  prompt:    `Build a dashboard component from this spec with     responsive layout, dark mode support, and accessibility.`,  providerOptions: {    anthropic: {      effort: 'medium',      thinking: { type: 'adaptive' },    },  },});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/claude-sonnet-4.6).