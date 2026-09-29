---
title: "Claude Sonnet 5.5 now available on AI Gateway"
source: "https://vercel.com/changelog/claude-sonnet-5-5-now-available-on-ai-gateway"
publishedDate: "2026-09-28"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Claude Sonnet 5.5](https://vercel.com/ai-gateway/models/claude-sonnet-5.5) from [Anthropic](https://vercel.com/ai-gateway/models/providers/anthropic) is now available on [AI Gateway](https://vercel.com/ai-gateway) as `anthropic/claude-sonnet-5.5`.

Sonnet 5.5 improves on [Claude Sonnet 5](https://vercel.com/ai-gateway/models/claude-sonnet-5) for well-scoped everyday work, from building features and fixing bugs to creating documents, slides, and spreadsheets.

On coding tasks, Sonnet 5.5 carries changes through multiple steps and checks its work before reporting completion. It produces more polished documents, slides, and spreadsheets with fewer follow-up edits, and writes clearer explanations and reports. It also improves at using desktop apps and reading charts and technical drawings.

Sonnet 5.5 supports [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) on AI Gateway.

Use Sonnet 5.5 with the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), [OpenAI-compatible Chat Completions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), or [Anthropic Messages API](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api). You can also select it in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway.

For coding agents, run `npx vercel ai-gateway setup` and select `anthropic/claude-sonnet-5.5` in your agent's model settings.

Try Sonnet 5.5 in the [AI Gateway model playground](https://vercel.com/ai-gateway/models/claude-sonnet-5.5), or explore the [model catalog](https://vercel.com/ai-gateway/models).

AI Gateway provides one API for calling models, tracking usage and cost, and configuring routing, retries, and failover. You can use an [AI Gateway API key](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys) or [bring your own provider key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok).