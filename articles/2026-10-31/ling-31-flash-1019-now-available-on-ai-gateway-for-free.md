---
title: "Ling 3.1 Flash 1019 now available on AI Gateway for free"
source: "https://vercel.com/changelog/ling-3-1-flash-1019-now-available-on-ai-gateway-for-free"
publishedDate: "2026-10-30"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Ling 3.1 Flash 1019 from InclusionAI](https://vercel.com/ai-gateway/models/ling-3.1-flash-1019) is now available on [AI Gateway](https://vercel.com/docs/ai-gateway), free until November 3, 2026.

The updated model is designed for coding, multi-step reasoning, and agents that use tools. Its 1M-token context window supports workflows involving long documents, code, and extended task histories.

Use `inclusionai/ling-3.1-flash-1019` as the model name:

Free requests still appear in your spend dashboard with a full request trace, they just cost nothing. On November 3, requests will begin charging at the published rate.

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Then select `inclusionai/ling-3.1-flash-1019` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

You can also try Ling 3.1 Flash 1019 in the [model playground](https://vercel.com/ai-gateway/models/ling-3.1-flash-1019).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.