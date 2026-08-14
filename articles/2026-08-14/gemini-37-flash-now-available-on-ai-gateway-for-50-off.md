---
title: "Gemini 3.7 Flash now available on AI Gateway for 50% off"
source: "https://vercel.com/changelog/gemini-3-7-flash-now-available-on-ai-gateway-for-50-off"
publishedDate: "2026-08-13"
category: "frontend"
feedName: "Vercel"
author: "Joe McKenney"
---

[Gemini 3.7 Flash](https://vercel.com/ai-gateway/models/gemini-3.7-flash) from Google is now available on [AI Gateway](https://vercel.com/ai-gateway) for 50% off till December 31st, 2026.

Gemini 3.7 Flash improves on prior Flash models at software engineering and agentic work. It resolves issues more reliably and spends less time stuck in failed agent loops, which matters on long tool-calling sequences where one derailment costs the rest of the run. It also generates desktop and web application code directly from design mocks, with closer adherence to the source design.

To use Gemini 3.7 Flash, set `model` to `google/gemini-3.7-flash` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'google/gemini-3.7-flash',  prompt: 'Build a settings page from this design mock.',});
```

To use it in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run `vercel ai-gateway coding-agents setup` to connect Claude Code, Codex, OpenCode, or Pi, then select `google/gemini-3.7-flash` inside the agent.

To try Gemini 3.7 Flash with no code, try the model in the [model playground](https://vercel.com/ai-gateway/models/gemini-3.7-flash).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)