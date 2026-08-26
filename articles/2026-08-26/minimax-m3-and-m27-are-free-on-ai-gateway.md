---
title: "MiniMax M3 and M2.7 are free on AI Gateway"
source: "https://vercel.com/changelog/minimax-m3-and-m2-7-are-free-on-ai-gateway"
publishedDate: "2026-08-25"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[MiniMax M3](https://vercel.com/ai-gateway/models/minimax-m3-free) and [M2.7](https://vercel.com/ai-gateway/models/minimax-m2.7-free) are free on AI Gateway via GMI Cloud through Sunday, September 6.

Use the -free model IDs (`minimax/minimax-m3-free` or `minimax/minimax-m2.7-free`), which route to GMI Cloud. When the free period ends, the IDs will error:

```
import { streamText } from 'ai';const result = streamText({  model: 'minimax/minimax-m3-free',  prompt: 'Summarize the incident report.',});
```

Or keep the model ID (`minimax/minimax-m3`) and put GMI Cloud as the preferred provider with order:

```
const result = streamText({  model: 'minimax/minimax-m3',  prompt: 'Summarize the incident report.',  providerOptions: {    gateway: {      order: ['gmicloud'],    },  },});
```

This will fall back to another provider when it cannot serve. Both options work across every AI Gateway API.

To use the MiniMax models in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), see the coding agents guide, then run `vercel ai-gateway coding-agents setup` to connect agents like Claude Code, Codex, OpenCode, Cursor, Pi, and more, and select `minimax/minimax-m3-free` inside the agent.