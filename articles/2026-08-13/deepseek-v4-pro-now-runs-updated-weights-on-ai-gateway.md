---
title: "DeepSeek V4 Pro now runs updated weights on AI Gateway"
source: "https://vercel.com/changelog/deepseek-v4-pro-now-runs-updated-weights-on-ai-gateway"
publishedDate: "2026-08-12"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

DeepSeek V4 Pro now runs on updated weights on AI Gateway. They are used by default when you call `deepseek/deepseek-v4-pro`, so existing requests pick them up with no change to the model ID or your code.

To use the updated DeepSeek V4 Pro, set model to `deepseek/deepseek-v4-pro-0813` in the [AI SDK](https://ai-sdk.dev/). AI Gateway will route to providers with the new weights:

```
import { streamText } from 'ai';const result = streamText({  model: 'deepseek/deepseek-v4-pro-0831',  prompt: 'Fix the failing tests in this repo and open a PR.',});
```

To run V4 Pro in a coding agent, use `vercel ai-gateway coding-agents setup` to connect your agents to AI Gateway, then select `deepseek/deepseek-v4-pro-0813` in the agent's model configuration. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents).

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests. Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/deepseek-v4-flash).