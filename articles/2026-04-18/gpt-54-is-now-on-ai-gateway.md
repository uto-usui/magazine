---
title: "GPT 5.4 is now on AI Gateway"
source: "https://vercel.com/changelog/gpt-5-4-is-now-on-ai-gateway"
publishedDate: "2026-03-05"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Mar 5, 2026

GPT-5.4 and GPT-5.4 Pro are now available on AI Gateway.

This model brings the agentic and reasoning leaps from GPT-5.3-Codex to all domains. This includes knowledge work like reports, spreadsheets, presentations, and analysis in addition to coding. It handles complex multi-step workflows more reliably, including tasks that involve tools, research, and pulling from multiple sources. GPT-5.4 is faster and also more token-efficient than previous iterations (GPT-5.2). GPT-5.4 Pro is for developers who need maximum performance on the most complex tasks.

To use this model, set model to `openai/gpt-5.4` or `openai/gpt-5.4-pro` in the AI SDK.

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5.4',  prompt:    `Refactor our API layer to use the new auth SDK, update the     affected tests and docs, then generate a migration guide     for the rest of the team.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gpt-5.4).