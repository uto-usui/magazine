---
title: "GPT 5.5 on AI Gateway"
source: "https://vercel.com/changelog/gpt-5.5-on-ai-gateway"
publishedDate: "2026-04-24"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 24, 2026

GPT-5.5 is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

There are 2 variants: GPT-5.5 and GPT-5.5 Pro. Both models are tuned for long-running agentic work across coding, computer use, knowledge work, and scientific research, and are more token-efficient than the previous generation.

GPT-5.5 is stronger at agentic coding and long-horizon work where the model needs to hold context across a large system and carry changes through the surrounding codebase. Paired with computer-use skills, it can operate real software and turn raw material into documents, spreadsheets, or slide presentations.

GPT-5.5 Pro is built for demanding, multi-step work where response quality matters more than latency. Early testing shows gains in business, legal, education, data science, and technical research workflows that involve critiquing work over multiple passes and stress-testing arguments.

To use GPT-5.5, set model to `openai/gpt-5.5` or `openai/gpt-5.5-pro` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5.5', // or 'openai/gpt-5.5-pro'  prompt:    `Migrate our user settings page from REST to the new     GraphQL schema, update the affected components and tests,     and open a PR with a summary of the changes.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gpt-5.5).