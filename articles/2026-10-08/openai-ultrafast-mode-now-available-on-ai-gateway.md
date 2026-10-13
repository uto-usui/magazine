---
title: "OpenAI Ultrafast mode now available on AI Gateway"
source: "https://vercel.com/changelog/openai-ultrafast-mode-now-available-on-ai-gateway"
publishedDate: "2026-10-05"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[AI Gateway](https://vercel.com/ai-gateway) now supports OpenAI's Ultrafast service tier for GPT-6 Astra, providing faster output for interactive applications and rapid coding iterations.

To use Ultrafast, request it for `openai/gpt-6-astra` through AI SDK, the Chat Completions API, or Responses API:

For workflows with frequent tool calls, OpenAI recommends the Responses API over a persistent WebSocket connection to reduce overhead between turns. See the [Ultrafast service-tier examples](https://vercel.com/docs/ai-gateway/models-and-providers/service-tiers#ultrafast) for persistent connections, including AI SDK over WebSocket.

Ultrafast supports US and global processing. Requests pinned to unsupported regions, such as the EU, run at the standard (`default`) tier. Standard processing remains the default when no service tier is specified.

Requests served at Ultrafast are billed at 6× the standard per-token rate, while requests that fall back to another tier are billed at the rate for the tier actually served. Check the [GPT-6 Astra model page](https://vercel.com/ai-gateway/models/gpt-6-astra) for current rates and learn more about the [GPT-6 model family](https://vercel.com/i/what-is-gpt-6).