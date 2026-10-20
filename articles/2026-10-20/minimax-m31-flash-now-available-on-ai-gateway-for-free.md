---
title: "MiniMax M3.1 Flash now available on AI Gateway for free"
source: "https://vercel.com/changelog/minimax-m3-1-flash-now-available-on-ai-gateway-for-free"
publishedDate: "2026-10-19"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[MiniMax M3.1 Flash](https://vercel.com/ai-gateway/models/minimax-m3.1-flash) from [MiniMax](https://vercel.com/ai-gateway/models/providers/minimax) is now available on [AI Gateway](https://vercel.com/ai-gateway) for free until Oct 22.

MiniMax M3.1 Flash is an open-weight multimodal model for coding and agentic work, with a 1M-token context window for long documents and multi-step agent sessions.

Compared with earlier MiniMax models, M3.1 Flash improves on complex agentic tasks, coding, and cybersecurity. On the agent side, that covers multi-step business processes and computer use that carries a task from one application to the next. For coding, MiniMax reports its best results on application development, particularly frontend interactions, targeted bug fixes, and component tests.

The free rate applies only when MiniMax serves the request. To make sure it does, sort the provider with `order` in the gateway [provider options](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options). After the offer ends, pinned requests bill at MiniMax's standard rate.

Call it through the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), the [Chat Completions](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [Responses](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), and [Anthropic Messages](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) APIs, or a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway. Use `minimax/minimax-m3.1-flash` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Then select `minimax/minimax-m3.1-flash` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try MiniMax M3.1 Flash in the [model playground](https://vercel.com/ai-gateway/models/minimax-m3.1-flash).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.