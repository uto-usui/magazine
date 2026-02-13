---
title: "Use MiniMax M2.5 on AI Gateway"
source: "https://vercel.com/changelog/use-minimax-m2-5-on-ai-gateway"
publishedDate: "2026-02-12"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Feb 12, 2026

MiniMax M2.5 is now available on AI Gateway.

M2.5 plans before it builds, breaking down functions, structure, and UI design before writing code. It handles full-stack projects across Web, Android, iOS, Windows, and Mac, covering the entire development lifecycle from initial system design through code review. Compared to M2.1, it adapts better to unfamiliar codebases and uses fewer search rounds to solve problems.

To use this model, set model to `minimax/minimax-m2.5` in the AI SDK:

```
import { streamText } from 'ai';const result = streamText({  model: 'minimax/minimax-m2.5',  prompt:    `Design and implement a multi-tenant SaaS authentication system     with role-based access control, supporting OAuth providers     and API key management.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/minimax-m2.5).