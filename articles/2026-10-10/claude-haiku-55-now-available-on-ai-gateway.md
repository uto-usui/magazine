---
title: "Claude Haiku 5.5 now available on AI Gateway"
source: "https://vercel.com/changelog/claude-haiku-5-5-now-available-on-ai-gateway"
publishedDate: "2026-10-07"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Claude Haiku 5.5](https://vercel.com/ai-gateway/models/claude-haiku-5.5) from [Anthropic](https://vercel.com/ai-gateway/models/providers/anthropic) is now available on [AI Gateway](https://vercel.com/ai-gateway).

It is built for high-volume, cost-sensitive tasks such as summaries, context compaction, database queries, and classification, and works as a subagent alongside larger Claude models on coding work. It is also the fastest Claude model at standard speed, which suits live customer support and browser use. Test it as a direct upgrade wherever you use [Claude Haiku 4.5](https://vercel.com/ai-gateway/models/claude-haiku-4.5) today.

Haiku 5.5 is the first Haiku model with effort levels. It uses adaptive thinking and supports `low`, `medium`, `high`, `xhigh`, and `max` effort, which set how much the model thinks and how many tokens it uses. You can turn thinking off at `low`, `medium`, and `high`. At `xhigh` and `max`, thinking must stay on.

Haiku 5.5 supports [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) on AI Gateway. It ships with biology and cybersecurity safeguards, so it may decline some requests in those areas.

Call it through the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), the [Chat Completions](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [Responses](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), and [Anthropic Messages](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) APIs, or a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway. Set effort with `reasoning` in the AI SDK or `reasoning_effort` in Chat Completions.

Use `anthropic/claude-haiku-5.5` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Then select `anthropic/claude-haiku-5.5` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try Claude Haiku 5.5 in the [model playground](https://vercel.com/ai-gateway/models/claude-haiku-5.5).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.