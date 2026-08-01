---
title: "DeepSeek V4 Flash now runs updated weights on AI Gateway"
source: "https://vercel.com/changelog/deepseek-v4-flash-now-runs-updated-weights-on-ai-gateway"
publishedDate: "2026-07-31"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[DeepSeek V4 Flash](https://vercel.com/ai-gateway/models/deepseek-v4-flash) now runs on updated weights by default on AI Gateway, with notably stronger agentic capabilities. On Terminal-Bench, it scores 82.7, up 25.8 points from 56.9 in the April preview.

Requests to `deepseek/deepseek-v4-flash` pick up the new weights automatically, with no change to the model ID or your code.

For now, DeepSeek is the only provider serving the updated weights. Other providers, including ones with Zero Data Retention, are coming next week.

To use the updated DeepSeek V4 Flash, set model to `deepseek/deepseek-v4-flash` in the [AI SDK](https://ai-sdk.dev/). AI Gateway will route to providers with the new weights by default:

```
import { streamText } from 'ai';const result = streamText({  model: 'deepseek/deepseek-v4-flash',  prompt: 'Fix the failing tests in this repo and open a PR.',});
```

To run V4 Flash in a coding agent, use `vercel ai-gateway coding-agents setup` to connect your agents to AI Gateway, then select `deepseek/deepseek-v4-flash` in the agent's model configuration. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents).

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests. Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/deepseek-v4-flash).