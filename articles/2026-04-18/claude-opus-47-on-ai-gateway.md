---
title: "Claude Opus 4.7 on AI Gateway"
source: "https://vercel.com/changelog/opus-4.7-on-ai-gateway"
publishedDate: "2026-04-16"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

2 min read

Apr 16, 2026

Claude Opus 4.7 from Anthropic is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

Opus 4.7 is optimized for long-running, asynchronous agents and handles complex, multi-step tasks with reliable agentic execution. The model shows gains on knowledge-worker tasks, particularly where it needs to visually verify its own outputs.

Opus 4.7 is also stronger at programmatic tool-calling with image-processing libraries to analyze charts and figures, including pixel-level data transcription. It has high-resolution image support, which is useful for computer use, screenshot understanding, and document analysis workflows. Opus 4.7 now has improved memory, with agents that maintain structured memory store across turns seeing more reliable recall and fewer dropped facts without additional prompting.

To use Claude Opus 4.7 set model to `anthropic/claude-opus-4.7` in the [AI SDK](https://ai-sdk.dev/). You can also try a new effort level: `'xhigh'.`

```
import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-opus-4.7',  prompt: 'Explain the halting problem in one paragraph.',  providerOptions: {    anthropic: {      thinking: { type: 'adaptive' },      effort: 'xhigh',    },  },});
```

Opus 4.7 also introduces the task budgets feature. Task budgets let you set a total token budget for an agentic turn via `taskBudget`. The model sees a countdown of remaining tokens, which it uses to prioritize work, plan ahead, and wind down gracefully as the budget is consumed. Thinking content is also now omitted by default for Opus 4.7. To receive thinking content, set `display` to `'summarized'`:

```
import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-opus-4.7',  prompt: 'Research how this codebase handles authentication and suggest improvements.',  providerOptions: {    anthropic: {      thinking: { type: 'adaptive', display: 'summarized' },      effort: 'high',      taskBudget: { type: 'tokens', total: 50000 },    },  },});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try the model in our [model playground](https://vercel.com/ai-gateway/models/claude-opus-4.7).