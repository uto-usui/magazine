---
title: "GPT 5.6 Sol, Luna, and Terra now available on AI Gateway"
source: "https://vercel.com/changelog/gpt-5-6-now-available-on-ai-gateway"
publishedDate: "2026-07-09"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

GPT 5.6 is now available on [AI Gateway](https://vercel.com/ai-gateway) in three models: Sol, Terra, and Luna.

GPT 5.6 from OpenAI is now available on AI Gateway in a limited preview, across three models: Sol, Terra, and Luna. All three are stronger at agentic work across coding, biology, and cybersecurity, and are more token-efficient than the previous generation.

-   **Sol** (`openai/gpt-5.6-sol`): the flagship, and the most capable of the three.
    
-   **Terra** (`openai/gpt-5.6-terra`): a balanced model for everyday work, with performance comparable to the previous generation at half the cost.
    
-   **Luna** (`openai/gpt-5.6-luna`): a fast, affordable model with strong capability at the lowest cost in the series.
    

To use GPT 5.6, set `model` to one of the above slugs in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5.6-sol',  prompt: 'Investigate the failing tests and open a PR with a fix.',});
```

You can also set [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules) to switch to GPT 5.6 from other gateway models without touching your code.

```
vercel ai-gateway rules add \  --type rewrite \  --source openai/gpt-5.5 \  --destination openai/gpt-5.6-sol
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try GPT 5.6 in the [model playground](https://vercel.com/ai-gateway/models/gpt-5.6-sol).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)