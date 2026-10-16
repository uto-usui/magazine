---
title: "Nemotron 3.5 Lightning now available on AI Gateway for free"
source: "https://vercel.com/changelog/nemotron-3-5-lightning-now-available-on-ai-gateway-for-free"
publishedDate: "2026-10-14"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Nemotron 3.5 Lightning](https://vercel.com/ai-gateway/models/nemotron-3.5-lightning-free) from [NVIDIA](https://vercel.com/ai-gateway/models/providers/nvidia) is now available for free on [AI Gateway](https://vercel.com/ai-gateway) as `nvidia/nemotron-3.5-lightning-free`, served by NVIDIA.

Nemotron 3.5 Lightning is an open-weight reasoning and chat model for long-running agents, sub-agent work, chatbots, and RAG systems. The model has 30B parameters with 3B active per token, in a hybrid Mixture-of-Experts design that interleaves Mamba-2 and MoE layers with a few attention layers. It has a 1M token context window and supports tool calling and structured outputs.

Note: The provider may retain prompts for model improvement.

Call Nemotron 3.5 Lightning through the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), the [Chat Completions](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [Responses](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), and [Messages](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) APIs, or a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway.

Use `nvidia/nemotron-3.5-lightning-free` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Then select `nvidia/nemotron-3.5-lightning-free` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.