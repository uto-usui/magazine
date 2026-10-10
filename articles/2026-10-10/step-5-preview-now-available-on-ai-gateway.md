---
title: "Step 5 Preview now available on AI Gateway"
source: "https://vercel.com/changelog/step-5-preview-now-available-on-ai-gateway"
publishedDate: "2026-10-08"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Step 5 Preview](https://vercel.com/ai-gateway/models/step-5-preview), StepFun's flagship model, is now available on [AI Gateway](https://vercel.com/ai-gateway). It's built for agentic coding, professional knowledge work, and financial analysis, from building apps and debugging code to research and analytical reports.

Step 5 Preview supports text and image input with a 1M-token context window, allowing you to work with large codebases, a stack of documents, or screenshots and charts in a single request.

Use `stepfun/step-5-preview` as the model name:

For other coding agents such as Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Then select `stepfun/step-5-preview` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try Step 5 Preview in the [model playground](https://vercel.com/ai-gateway/models/step-5-preview).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.