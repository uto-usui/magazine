---
title: "Ling 3.1 Flash is now available on AI Gateway"
source: "https://vercel.com/changelog/ling-3-1-flash-is-now-available-on-ai-gateway"
publishedDate: "2026-09-30"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Ling 3.1 Flash](https://vercel.com/ai-gateway/models/ling-3.1-flash) from InclusionAI is now available on AI Gateway. The model is free to use through October 13, 2026.

Ling 3.1 Flash is a hybrid reasoning language model with 560B total parameters and 25B active per token. It has a 262K-token context window on AI Gateway.

The model is designed for coding, multi-step analysis, and agents that use tools, including workflows involving long documents, code, and extended task histories.

To try Ling 3.1 Flash, use `inclusionai/ling-3.1-flash` or `inclusionai/ling-3.1-flash-free` as the model name:

The standard model ID is free during the promotion and begins billing when it ends. The `-free` model ID stops serving instead of billing when the free promotion ends.

To use Ling 3.1 Flash in a coding agent, follow the [AI Gateway coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) and select `inclusionai/ling-3.1-flash` as the model.

Try Ling 3.1 Flash in the [AI Gateway model playground](https://vercel.com/ai-gateway/models/ling-3.1-flash), or explore the [model catalog](https://vercel.com/ai-gateway/models).

AI Gateway provides one API for calling models, tracking usage and cost, and configuring routing, retries, and failover. You can use an [AI Gateway API key](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys) or [bring your own provider key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok).