---
title: "Gemini 4 Argon now available on AI Gateway"
source: "https://vercel.com/changelog/gemini-4-argon-now-available-on-ai-gateway"
publishedDate: "2026-10-13"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Gemini 4 Argon](https://vercel.com/ai-gateway/models/gemini-4-argon) from [Google](https://vercel.com/ai-gateway/models/providers/google) is now available on [AI Gateway](https://vercel.com/ai-gateway).

Gemini 4 Argon is built for coding, agentic work, and complex reasoning. It has a 1M token context window, accepts text, image, PDF, and video input, and supports tool calling.

On coding tasks, Gemini 4 Argon builds features, fixes bugs, and researches unfamiliar codebases, carrying longer tasks through multiple steps. The model also reads dense diagrams, spreadsheets, layout-heavy documents, and video, which suits tasks like a financial analysis spread across several spreadsheet tabs. Beyond code, it handles work in finance, health, and law, and hard problems in math and science. Gemini 4 Argon uses thinking levels (`low`, `medium`, and `high`) instead of thinking budgets.

Call Gemini 4 Argon through the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), the [Chat Completions](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [Responses](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), and [Anthropic Messages](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) APIs, or a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway. Set the thinking level with `reasoning` in the AI SDK or `reasoning_effort` in Chat Completions, and see [reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning) for the other controls.

Use `google/gemini-4-argon` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Then select `google/gemini-4-argon` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try Gemini 4 Argon in the [model playground](https://vercel.com/ai-gateway/models/gemini-4-argon).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.