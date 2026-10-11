---
title: "Glyph Cluster is now available in stealth for free on AI Gateway"
source: "https://vercel.com/changelog/glyph-cluster-is-now-available-in-stealth-for-free-on-ai-gateway"
publishedDate: "2026-10-07"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

Early access to [Glyph Cluster](https://vercel.com/ai-gateway/models/glyph-cluster) is now available on [AI Gateway](https://vercel.com/ai-gateway) for teams on a [Pro or Enterprise plan](https://vercel.com/docs/plans) with purchased AI Gateway credits. Usage is free during the stealth period.

Glyph Cluster is a reasoning model for coding and long-context analysis, with a 256K-token context window. Use it to review code, debug failures, plan implementation changes, solve quantitative problems, or compare information across long inputs.

It accepts text only and supports streaming and [function calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling) with tools you define. Image and file inputs and structured outputs are not supported.

This model doesn't support [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr). Prompts and responses may be retained and used for training and model improvement.

Use `stealth/glyph-cluster` as the model ID in the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), [Chat Completions](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), or [Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), or select it in a connected [coding agent](https://vercel.com/docs/ai-gateway/coding-agents). Set `AI_GATEWAY_API_KEY` for the API examples below.

Try Glyph Cluster in the [model playground](https://vercel.com/ai-gateway/models/glyph-cluster).