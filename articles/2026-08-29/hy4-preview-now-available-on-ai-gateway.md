---
title: "Hy4 Preview now available on AI Gateway"
source: "https://vercel.com/changelog/hy4-preview-now-available-on-ai-gateway"
publishedDate: "2026-08-28"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Hy4 Preview from Tencent](https://vercel.com/ai-gateway/models/hy4-preview) is now available on AI Gateway.

Hy4 Preview is an open-source Mixture-of-Experts model with 770B total parameters and 49B active per token, aimed at long-horizon coding, document analysis, game development, and scientific reasoning. It serves a context window of 1M tokens.

To use Hy4 Preview, set `model` to `tencent/hy4-preview` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'tencent/hy4-preview',  prompt: 'Add pagination to the results endpoint.',});
```

To use it in a coding agent, see the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents), then run `vercel ai-gateway coding-agents setup` to connect agents like Claude Code, Codex, OpenCode, Cursor, Pi, and more and select `tencent/hy4-preview` inside the agent.

Try Hy4 Preview in the [model playground](https://vercel.com/ai-gateway/models/hy4-preview).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.