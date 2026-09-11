---
title: "DeepSeek V4.1 Flash now available on AI Gateway"
source: "https://vercel.com/changelog/deepseek-v4-1-flash-now-available-on-ai-gateway"
publishedDate: "2026-09-09"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[DeepSeek V4.1 Flash](https://vercel.com/ai-gateway/models/deepseek-v4.1-flash) is now available on AI Gateway with native image understanding.

V4.1 Flash has vision support and accepts text and images in the same request, so you can ask questions about screenshots, read charts, and extract information from visual content.

The model has a 1 million token context window and supports responses up to 384,000 tokens, along with reasoning, tool use, and prompt caching. Its new architecture processes input and generates output with separate components, reducing the active computation needed for each stage.

Use `deepseek/deepseek-v4.1-flash` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Then select `deepseek/deepseek-v4.1-flash` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try DeepSeek V4.1 Flash in the [model playground](https://vercel.com/ai-gateway/models/deepseek-v4.1-flash).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.