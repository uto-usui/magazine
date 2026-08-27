---
title: "Qwen 3.8 Flash now available on AI Gateway"
source: "https://vercel.com/changelog/qwen-3-8-flash-now-available-on-ai-gateway"
publishedDate: "2026-08-26"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Qwen 3.8 Flash](https://vercel.com/ai-gateway/models/qwen3.8-flash) from Alibaba is now available on AI Gateway. It takes text and images as input, serves a context window of 1 million tokens, and can return up to 65k tokens in a response. Alibaba recommends it for coding, tool use, and multi-step agent workflows.

To use Qwen3.8-Flash, set `model` to `alibaba/qwen3.8-flash` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'alibaba/qwen3.8-flash',  prompt: 'Add pagination to the results endpoint.',});
```

To use it in a coding agent, see the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents), then run `vercel ai-gateway coding-agents setup` to connect agents like Claude Code, Codex, OpenCode, Cursor, Pi, and more and select `alibaba/qwen3.8-flash` inside the agent.

Try Qwen3.8-Flash in the [model playground](https://vercel.com/ai-gateway/models/qwen3.8-flash).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.