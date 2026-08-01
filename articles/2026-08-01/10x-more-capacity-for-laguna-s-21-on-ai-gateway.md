---
title: "10x more capacity for Laguna S 2.1 on AI Gateway"
source: "https://vercel.com/changelog/10x-more-capacity-for-laguna-s-2-1-on-ai-gateway"
publishedDate: "2026-07-31"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Laguna S 2.1](https://vercel.com/ai-gateway/models/laguna-s-2.1) from Poolside now has 10x more capacity on AI Gateway. The increase applies to the paid version, `poolside/laguna-s-2.1`, and the free version, `poolside/laguna-s-2.1-free`, so you can send far more requests, good for high-volume agentic coding and long-running tasks.

To use Laguna S 2.1, set `model` to `poolside/laguna-s-2.1-free` or `poolside/laguna-s-2.1` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'poolside/laguna-s-2.1',  prompt: 'Fix the flaky test in the payments suite.',});
```

To run it in a coding agent, use `vercel ai-gateway coding-agents setup` to connect your agents to AI Gateway, then select `poolside/laguna-s-2.1` or `poolside/laguna-s-2.1-free` in the agent's model configuration. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents).

AI Gateway gives you one API to hundreds of models, with usage tracking, retries, failover, and higher-than-provider uptime built in. It reflects provider pricing with no markup and no platform fee, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) requests.

Try Laguna S 2.1 in the [model playground](https://vercel.com/ai-gateway/models/laguna-s-2.1-free).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)