---
title: "Cat Jam is now available in stealth for free on AI Gateway"
source: "https://vercel.com/changelog/cat-jam-is-now-available-in-stealth-for-free-on-ai-gateway"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Cat Jam](https://vercel.com/ai-gateway/models/cat-jam) is now available on [AI Gateway](https://vercel.com/ai-gateway) as a stealth model, free to use during the stealth period.

Cat Jam is a reasoning model for coding and agentic tasks, with low-latency inference. It supports [function calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling), so agents can connect it to your own tools, and [structured outputs](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs) that follow a JSON schema you supply. Responses include the model's reasoning text alongside the answer. Cat Jam takes text input only. Cat Jam supports `low`, `medium`, `high`, `xhigh`, and `max` reasoning efforts.

[Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) (ZDR) is not available for this model. Prompts may be retained for safety reasons.

Cat Jam works with the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), the OpenAI-compatible [Chat Completions](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions) and [Responses](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses) APIs, the [Anthropic-compatible Messages API](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), and [coding agents](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway. Use `stealth``/cat-jam` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Then select `stealth/cat-jam` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try Cat Jam in the [model playground](https://vercel.com/ai-gateway/models/cat-jam).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.