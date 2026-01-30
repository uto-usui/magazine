---
title: "Gemini 3 Pro now available in Vercel AI Gateway"
source: "https://vercel.com/changelog/gemini-3-pro-now-available-in-vercel-ai-gateway"
publishedDate: "2025-11-18"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Nov 18, 2025

You can now access Google's latest model, Gemini 3 Pro, via Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required.

Gemini 3 Pro excels at challenging tasks involving reasoning or agentic workflows. In particular, the model improves on Gemini 2.5 Pro's performance in multi-step function calling, planning, reasoning over complex images/long documents, and instruction following.

To use Gemini 3 Pro in AI Gateway with the [AI SDK](https://ai-sdk.dev/), set `model` to `google/gemini-3.0-pro-preview`. Gemini 3 Pro is a reasoning model, and you can specify the level of thinking. Include the `providerOptions` configuration with `includeThoughts` like the example below to enable reasoning text.

```
import { streamText } from 'ai';const result = streamText({  model: 'google/gemini-3-pro-preview',  prompt:  `Analyze the attached technical report and all included diagrams.   Identify the main objective, extract data into a table, summarize each   diagram, and list inconsistencies between text and visuals.   Cite all supporting page and figure references.`,  providerOptions: {    google: {      thinkingConfig: {        includeThoughts: true,      }    }  },});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/gemini-3-pro-preview).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)