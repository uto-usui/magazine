---
title: "Grok 4.6 now available on AI Gateway"
source: "https://vercel.com/changelog/grok-4-6-now-available-on-ai-gateway"
publishedDate: "2026-08-12"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

[Grok 4.6](https://vercel.com/ai-gateway/models/grok-4.6) from SpaceXAI is now available on [AI Gateway](https://vercel.com/ai-gateway).

The model has a 500K token context window and accepts text and image inputs. Grok 4.6 supports low, medium, high, and xhigh reasoning levels and defaults to high.

To use Grok 4.6, set `model` to `xai/grok-4.6` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'xai/grok-4.6',  reasoning: 'xhigh',  prompt: 'Analyze this dataset and summarize the key trends.',});
```

To use it in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run `vercel ai-gateway coding-agents setup` to connect Claude Code, Codex, OpenCode, or Pi, then select `xai/grok-4.6` inside the agent.

To try Grok 4.5 with no code, try the model in the [model playground](https://vercel.com/ai-gateway/models/grok-4.6).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)