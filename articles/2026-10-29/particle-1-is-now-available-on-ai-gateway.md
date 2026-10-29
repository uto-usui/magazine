---
title: "Particle-1 is now available on AI Gateway"
source: "https://vercel.com/changelog/particle-1-is-now-available-on-ai-gateway"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Particle-1](https://vercel.com/ai-gateway/models/particle-1) from Particle AI is now available on [AI Gateway](https://vercel.com/docs/ai-gateway). It is post-trained on DeepSeek V4.1 Flash, with a focus on completing software engineering tasks using fewer tokens. Particle describes the gains as shorter reasoning, fewer rounds of trial and repair, and more focused exploration.

Use it for debugging, planning code changes, and breaking down multi-step engineering problems. Particle-1 has a 1M-token context window for working with code and extended task histories.

Set `AI_GATEWAY_API_KEY` in your environment. Use `particle/particle-1` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest version of Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Then select `particle/particle-1` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try Particle-1 in the [model playground](https://vercel.com/ai-gateway/models/particle-1).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.