---
title: "Reflection AI's Beam now available on AI Gateway for free"
source: "https://vercel.com/changelog/reflection-ai-beam-now-available-on-ai-gateway-for-free"
publishedDate: "2026-10-16"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Beam from Reflection AI](https://vercel.com/ai-gateway/models/beam), previously available in stealth as `stealth/cat-jam`, is now available on [AI Gateway](https://vercel.com/ai-gateway). Beam is free to use for a limited time during the launch period when serviced by Reflection AI.

Beam is an low latency US open-weight reasoning model for coding and agentic tasks, with [weights released under Apache 2.0](https://reflection.ai/blog/beam-is-available). Beam supports [tool calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling) and [structured outputs](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs), with a 1M-token context window for code, documents, and conversation history. Reasoning effort is adjustable. Beam is designed for speed, activating only 23B of its 501B parameters per token and avoiding tokens a task doesn't need, so it tends to reach answers sooner than larger open models.

There are 2 ways to access Beam for free:

-   Using the standard model name (`reflection/beam` with provider `reflection`). When the free period ends, the model slug will automatically transfer over to pricing with no downtime.
    
-   Using the `-free` suffix to the standard name (`reflection/beam-free`). The model will stop serving when the free offer ends.
    

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Then select `reflection/beam` or `reflection/beam-free` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try Beam in the [model playground](https://vercel.com/ai-gateway/models/beam).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.