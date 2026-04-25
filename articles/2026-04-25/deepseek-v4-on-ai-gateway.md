---
title: "Deepseek V4 on AI Gateway"
source: "https://vercel.com/changelog/deepseek-v4-on-ai-gateway"
publishedDate: "2026-04-23"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 23, 2026

DeepSeek V4 is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

There are 2 model variants: DeepSeek V4 Pro and DeepSeek V4 Flash. A 1M token context window is the default across both models.

DeepSeek V4 Pro focuses on agentic coding, formal mathematical reasoning, and long-horizon workflows. It handles feature development, bug fixing, and refactoring across stacks, with tool use that works across harnesses like MCP workflows and agent frameworks. It also writes clear, well-structured long-form documents.

DeepSeek V4 Flash performs close to V4 Pro on reasoning and holds up on simpler agent tasks, with a smaller parameter size for faster responses and lower API cost. It's a good fit for high-volume workloads and latency-sensitive use cases.

To use DeepSeek V4, set model to `deepseek/deepseek-v4-pro` or `deepseek/deepseek-v4-flash` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'deepseek/deepseek-v4-pro', // or 'deepseek/deepseek-v4-flash'  prompt:    `Audit this repository for unsafe concurrent access patterns,     propose a refactor that introduces proper synchronization,     and open the changes as a PR with a migration plan.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/deepseek-v4-pro).