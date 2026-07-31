---
title: "Inkling Small from Thinking Machines is now available on AI Gateway"
source: "https://vercel.com/changelog/inkling-small-now-available-on-ai-gateway"
publishedDate: "2026-07-30"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Inkling Small](https://vercel.com/ai-gateway/models/inkling-small) from Thinking Machines is now available on AI Gateway.

Inkling Small reaches performance comparable to the larger Inkling model at about a quarter of the size, using much less compute per task. It is a broad generalist with native reasoning over audio and images, and it holds up well on reasoning, agentic coding, and tool use. Controllable thinking effort lets you trade quality against cost and latency, from minimal to maximum reasoning.

For visual tasks, it can crop, zoom, and inspect images programmatically, which helps on documents and charts where the relevant detail is small.

To use Inkling, set `model` to `thinkingmachines/inkling-small` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'thinkingmachines/inkling-small',  prompt: 'Summarize this report and list the key risks.',});
```

Inkling-Small is compatible with [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr). Turn it on team-wide from the dashboard, or per request with `zeroDataRetention: true`, and AI Gateway routes only to providers that delete prompts and responses after each request.

Inkling-Small is also a cost-efficient choice for coding and tool-use workflows. Run `vercel ai-gateway coding-agents setup` to connect your coding agents to AI Gateway, then select `thinkingmachines/inkling-small` in the agent's model configuration. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents).

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests. Try Inkling Small in the [model playground](https://vercel.com/ai-gateway/models/inkling-small).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)