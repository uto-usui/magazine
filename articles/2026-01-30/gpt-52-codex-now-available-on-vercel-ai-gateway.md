---
title: "GPT 5.2 Codex now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/gpt-5-2-codex-now-available-on-vercel-ai-gateway"
publishedDate: "2026-01-14"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jan 14, 2026

You can now access GPT 5.2 Codex with Vercel's [AI Gateway](https://vercel.com/ai-gateway) and no other provider accounts required. GPT 5.2 Codex combines GPT 5.2's strength in professional knowledge work with GPT 5.1 Codex Max's agentic coding capabilities.

GPT 5.2 Codex is better at working on long running coding tasks compared to predecessors and can handle more complex tasks like large refactors and migrations more reliably. The model has stronger vision performance for more accurate processing of screenshots and charts that are shared while coding. GPT 5.2 Codex also surpasses GPT 5.1 Codex Max in cyber capabilities and outperformed the previous model in OpenAI's Professional Capture-the-Flag (CTF) cybersecurity eval.

To use the GPT 5.2 Codex, with the [AI SDK](https://ai-sdk.dev/), set the model to `openai/gpt-5.2-codex`:

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5.2-codex',  prompt:    `Take the attached prototypes, diagram, and reference screenshots     to build a production app for customer analytics dashboards.`});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gpt-5.2-codex).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)