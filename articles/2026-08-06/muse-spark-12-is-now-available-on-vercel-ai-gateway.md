---
title: "Muse Spark 1.2 is now available on Vercel AI Gateway"
source: "https://vercel.com/changelog/muse-spark-1-2-is-now-available-on-vercel-ai-gateway"
publishedDate: "2026-08-05"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

[Muse Spark 1.2](https://vercel.com/ai-gateway/models/muse-spark-1.2) from Meta is now available on AI Gateway. It is a coding-focused update to the previous Muse Spark model. While keeping its general capabilities, 1.2 ships with improvements in code generation, complex debugging, codebase understanding, and end-to-end developer workflows.

The model is built for long-horizon work like generating whole repositories, building out large projects end to end, and sustaining iterative loops where it writes, compiles, profiles, and improves code over many rounds.

To use Muse Spark 1.2, set `model` to `meta/muse-spark-1.2` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'meta/muse-spark-1.2',  prompt: 'Migrate this service off the deprecated API.',});
```

To use Muse Spark in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run `vercel ai-gateway coding-agents setup` to connect Claude Code, Codex, OpenCode, or Pi, then select `meta/muse-spark-1.2` inside the agent.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try Muse Spark 1.2 in the [model playground](https://vercel.com/ai-gateway/models/muse-spark-1.2).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)