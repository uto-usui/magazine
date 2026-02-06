---
title: "Use Claude Opus 4.6 on AI Gateway"
source: "https://vercel.com/changelog/claude-opus-4.6-on-ai-gateway"
publishedDate: "2026-02-05"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman "
---

1 min read

Feb 5, 2026

Anthropic's latest flagship model, Claude Opus 4.6, is now available on AI Gateway. Built to power agents that handle real-world work, Opus 4.6 excels across the entire development lifecycle. Opus 4.6 is also the first Opus model to support the extended 1M token context window.

The model introduces adaptive thinking, a new parameter that lets the model decide when and how much to reason. This approach enables more efficient responses while maintaining quality across programming, analysis, and creative tasks, delivering equal/better performance than extended thinking. Opus 4.6 can interleave thinking and tool calls within a single response.

To use the model, set `model` to `anthropic/claude-opus-4.6`. The following example also uses adaptive thinking and the `effort` parameter.

```
import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-opus-4.6',  prompt:    `Trace this race condition through the event loop, identify all     affected code paths, and implement a fix with proper test coverage.`,  providerOptions: {    anthropic: {      thinking: { type: 'adaptive' },      effort: 'max',    },  },});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/claude-sonnet-4.5).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)