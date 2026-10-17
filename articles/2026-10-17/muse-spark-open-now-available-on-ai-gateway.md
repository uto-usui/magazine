---
title: "Muse Spark Open now available on AI Gateway"
source: "https://vercel.com/changelog/muse-spark-open-now-available-on-ai-gateway"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Muse Spark Open from Meta](https://vercel.com/ai-gateway/models/muse-spark-open) is now available on AI Gateway. The open-weight reasoning model is designed for coding and agentic workflows, including multi-file refactoring, debugging, and understanding large codebases.

Muse Spark Open supports text and image input with a 1M-token context window, allowing agents to work with code and screenshots in the same request. It is available with [ZDR](https://vercel.com/docs/ai-gateway/zdr) and no training, without creating separate provider accounts.

Use `meta/muse-spark-open` as the model name across all API formats and coding agents. The model is available across the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), the OpenAI-compatible [Chat Completions](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions) and [Responses](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses) APIs, the [Anthropic-compatible Messages API](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), and [coding agents](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway.

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
# Upgrade to the latest version of the Vercel CLIpnpm i -g vercel@latest# Run coding agents setup commandvercel ai-gateway coding-agents setup
```

Then select `meta/muse-spark-open` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try Muse Spark Open in the [model playground](https://vercel.com/ai-gateway/models/muse-spark-open).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.