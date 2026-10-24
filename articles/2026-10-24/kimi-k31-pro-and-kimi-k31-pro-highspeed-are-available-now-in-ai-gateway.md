---
title: "Kimi K3.1 Pro and Kimi K3.1 Pro Highspeed are available now in AI Gateway"
source: "https://vercel.com/changelog/kimi-k3-1-pro-and-kimi-k3-1-pro-highspeed-are-available-now-in-ai-gateway"
publishedDate: "2026-10-23"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Kimi K3.1 Pro](https://vercel.com/ai-gateway/models/kimi-k3.1-pro) from [Moonshot AI](https://vercel.com/ai-gateway/models/providers/moonshotai) is now available on [AI Gateway](https://vercel.com/ai-gateway), along with [Kimi K3.1 Pro Highspeed](https://vercel.com/ai-gateway/models/kimi-k3.1-pro-highspeed), a faster version for interactive use.

K3.1 Pro is the first model in Moonshot's K3.1 series. It builds on [Kimi K3](https://vercel.com/ai-gateway/models/kimi-k3) with improvements in coding, 3D modeling, financial analysis, and agentic tasks, and keeps the 1M-token context window and image input.

For coding, K3.1 Pro handles work ranging from small fixes in an existing codebase to building a full project, including long agent runs with many steps. It builds front-end pages and interactive scenes with stronger typography and animation than earlier Kimi models. In finance, it can carry a task from start to finish, such as building a linked financial model with adjustable assumptions and scenarios, or writing research grounded in source documents. K3.1 Pro makes fewer factual errors than earlier Kimi models on difficult prompts.

Moonshot AI plans to release the model weights by November 4: support for more providers will follow.

Call either model through the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), the [Chat Completions](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [Responses](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), and [Anthropic Messages](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) APIs, or a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway. For Highspeed, use `moonshotai/kimi-k3.1-pro-highspeed` in place of the model name below.

Use `moonshotai/kimi-k3.1-pro` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Then select `moonshotai/kimi-k3.1-pro` or `moonshotai/kimi-k3.1-pro-highspeed` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try Kimi K3.1 Pro in the [model playground](https://vercel.com/ai-gateway/models/kimi-k3.1-pro).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.