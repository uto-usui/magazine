---
title: "DeepSeek V4.1 Flash 1017 now available on AI Gateway"
source: "https://vercel.com/changelog/deepseek-v4-1-flash-1017-now-available-on-ai-gateway"
publishedDate: "2026-10-17"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[DeepSeek V4.1 Flash 1017](https://vercel.com/ai-gateway/models/deepseek-v4.1-flash-1017) is now available on [AI Gateway](https://vercel.com/ai-gateway).

DeepSeek V4.1 Flash 1017 is a minor update to [DeepSeek V4.1 Flash](https://vercel.com/ai-gateway/models/deepseek-v4.1-flash) that improves reasoning, coding, agentic tasks, and image understanding.

The coding gains show up in terminal work and in building and editing whole repositories, and the agentic gains in multi-step automation. With images, the model reads charts and handles visual reasoning more accurately when it can call tools.

DeepSeek V4.1 Flash 1017 also finishes tasks faster and with shorter outputs than the previous snapshot, so agent runs tend to take less time and use fewer output tokens.

Use `deepseek/deepseek-v4.1-flash-1017` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Try DeepSeek V4.1 Flash 1017 in the [model playground](https://vercel.com/ai-gateway/models/deepseek-v4.1-flash-1017).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.