---
title: "GPT 5.3 Chat is now on AI Gateway"
source: "https://vercel.com/changelog/gpt-5-3-chat-is-now-on-ai-gateway"
publishedDate: "2026-03-03"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Mar 3, 2026

GPT-5.3 Chat (GPT 5.3 Instant) is now available on AI Gateway.

This update focuses on tone, relevance, and conversational flow for more accurate answers, better-contextualized web results, and fewer unnecessary refusals and caveats. It also reduces hallucination rates and produces smoother and more direct responses.

To use this model, set model to `openai/gpt-5.3-chat` in the AI SDK.

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5.3-chat',  prompt: 'Best restaurants in SF for a birthday dinner.',});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/capabilities/observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gpt-5.3-chat).