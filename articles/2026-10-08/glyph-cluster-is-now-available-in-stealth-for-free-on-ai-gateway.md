---
title: "Glyph Cluster is now available in stealth for free on AI Gateway"
source: "https://vercel.com/changelog/glyph-cluster-is-now-available-in-stealth-for-free-on-ai-gateway"
publishedDate: "2026-10-07"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[Glyph Cluster](https://vercel.com/ai-gateway/models/glyph-cluster) is now available on [AI Gateway](https://vercel.com/ai-gateway) as a stealth model for teams on [Pro and Enterprise plans](https://vercel.com/docs/plans) with purchased AI Gateway credits. It is free to use during the stealth period.

Glyph Cluster is a reasoning model for coding and long-context analysis, and handles multi-step work such as planning, synthesis, quantitative reasoning, and comparing material across large inputs.

For coding, Glyph Cluster can review code, explain failures, debug issues, propose changes, and reason through implementation options. It supports [function calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling), so agents can connect its reasoning to your own tools and systems, and it streams responses as they are generated.

Glyph Cluster takes text input only, with no image or file input. Tool use is limited to function tools you define, and structured outputs are not supported.

ZDR is not available for this model, and prompts and responses sent through it may be used for training and model improvement.

Call it through the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) or the OpenAI-compatible [Chat Completions](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions) and [Responses](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses) APIs, or select it in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway.

Use `stealth/glyph-cluster` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Then select `stealth/glyph-cluster` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try Glyph Cluster in the [model playground](https://vercel.com/ai-gateway/models/glyph-cluster).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.