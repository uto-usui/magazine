---
title: "Gemini 3.5 Flash on AI Gateway"
source: "https://vercel.com/changelog/gemini-3-5-flash-on-ai-gateway"
publishedDate: "2026-05-19"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

May 19, 2026

Gemini 3.5 Flash is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway).

This model has improved coding proficiency and parallel agentic execution loops versus previous Flash versions. It also brings improvements to core reasoning, instruction following, and multi-turn coherence, with stronger performance on complex tasks and higher-quality reasoning traces in thinking mode.

3.5 Flash defaults to the `medium` thinking level, balancing response quality with faster, more cost-efficient generation.

To use Gemini 3.5 Flash, set model to `google/gemini-3.5-flash` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'google/gemini-3.5-flash',  prompt: 'Refactor this service to run API calls in parallel.',  providerOptions: {    google: { // use vertex or google      thinkingConfig: {        thinkingLevel: 'high',        includeThoughts: true,    },  },});
```

Note that `temperature`, `topP`, `topK`, and `thinking_budget` are not supported by this model.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting), [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gpt-5.5).