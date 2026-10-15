---
title: "Muse Wonder now available on AI Gateway"
source: "https://vercel.com/changelog/muse-wonder-now-available-on-ai-gateway"
publishedDate: "2026-10-12"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Muse Wonder from Meta](https://vercel.com/ai-gateway/models/muse-wonder-1.0) is now available on AI Gateway. The model is designed for coding, long-running agents, and computer use. It can plan multi-step tasks, delegate work to sub-agents, and recover from errors as work progresses.

Muse Wonder has a 1M-token context window and supports text, image, and PDF input, tool calling, and structured output. Agents can work with code, screenshots, and documents in the same workflow.

You can access the model through AI Gateway with one API key, without creating a separate Meta account.

Set `AI_GATEWAY_API_KEY` in your environment, then use `meta/muse-wonder-1.0` as the model name:

For coding agents, run `npx vercel ai-gateway setup` and select `meta/muse-wonder-1.0` in your agent's model settings.

Try Muse Wonder in the [model playground](https://vercel.com/ai-gateway/models/muse-wonder-1.0), or explore the [model catalog](https://vercel.com/ai-gateway/models).

AI Gateway provides one API for calling models, tracking usage and cost, and configuring routing, retries, and failover. You can use an [AI Gateway API key](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys) or [bring your own provider key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok).