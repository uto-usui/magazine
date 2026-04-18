---
title: "Use GPT 5.4 Mini and Nano on AI Gateway"
source: "https://vercel.com/changelog/use-gpt-5-4-mini-and-nano-on-ai-gateway"
publishedDate: "2026-03-17"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Mar 17, 2026

GPT-5.4 Mini and GPT-5.4 Nano from OpenAI are now available on [Vercel AI Gateway](https://vercel.com/ai-gateway). Both models deliver state-of-the-art performance for their size class in coding and computer use, and are built for sub-agent workflows where multiple smaller models coordinate on parts of a larger task.

The models also support the verbosity and reasoning level parameters, giving you control over response detail and how much the model reasons before answering.

**GPT-5.4 Mini**

GPT-5.4 Mini handles code generation, tool orchestration, and multi-step browser interactions more reliably than previous mini-tier models. It's a strong default for agentic tasks that need to balance capability and cost. To use this model, set model to `openai/gpt-5.4-mini` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5.4-mini',  prompt:    `Scaffold a new Next.js API route that connects to our     Postgres database, validates the incoming webhook payload,     and writes the event to the audit_logs table.`,});
```

**GPT-5.4 Nano**

GPT-5.4 Nano performs close to GPT-5.4 Mini in evaluations at a lower price point. The model is well-suited for high-volume use cases like sub-agent workflows where cost scales with the number of parallel calls. To use this model, set model to `openai/gpt-5.4-nano` in the AI SDK.

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5.4-nano',  prompt:    `Check each file in the PR diff for unused imports,     flag any that can be removed, and return the results     as a JSON array with file path and line number.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gpt-5.4-mini).