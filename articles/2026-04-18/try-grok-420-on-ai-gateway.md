---
title: "Try Grok 4.20 on AI Gateway"
source: "https://vercel.com/changelog/grok-4-20-on-ai-gateway"
publishedDate: "2026-03-11"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Mar 11, 2026

Grok 4.20 is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway) in three variants: Reasoning, Non-Reasoning, and Multi-Agent. As xAI's newest flagship model, Grok 4.20 delivers industry-leading speed and agentic tool calling capabilities. It offers a low hallucination rate and strict prompt adherence, producing precise responses.

-   **Grok 4.20 Non-Reasoning**: Non-reasoning variant optimized for speed and direct responses
    
-   **Grok 4.20 Reasoning**: Extended thinking for complex problem-solving tasks
    
-   **Grok 4.20 Multi-Agent**: Purpose-built for multi-agent orchestration and collaboration
    

To use Grok 4.20, set model to `xai/grok-4.20-non-reasoning-beta`, `xai/grok-4.20-reasoning-beta` or `xai/grok-4.20-multi-agent-beta` in the [AI SDK](https://ai-sdk.dev/).

```
import { streamText } from 'ai';const result = streamText({  model: 'xai/grok-4.20-reasoning-beta',  prompt:    `Analyze this dataset for anomalies, cross-reference     against our historical baselines, and generate     a summary report with recommended actions.`,});
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/grok-4.20-reasoning-beta).