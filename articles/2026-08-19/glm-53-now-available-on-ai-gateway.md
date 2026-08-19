---
title: "GLM 5.3 now available on AI Gateway"
source: "https://vercel.com/changelog/glm-5-3-now-available-on-ai-gateway"
publishedDate: "2026-08-18"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

[GLM 5.3 from Z.ai](https://vercel.com/ai-gateway/models/glm-5.3) is now available on AI Gateway.

GLM 5.3 has improvements vs. GLM 5.2 at complex software engineering and at agent tasks that run across many steps, and it reaches those results while producing fewer output tokens than GLM 5.2 did at the same effort level.

Z.ai also reports stronger vulnerability discovery, including reasoning across the successive stages of an exploitation chain. [DeepsecBench](https://vercel.com/ai-gateway/leaderboards/deepsecbench) measures that work directly, scoring how reliably a model finds security vulnerabilities in application code and what a run costs, and it covers GLM-5.3 at both high and max effort.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4xOj7nEdOEtxaOlJ7YhyAE%2F6764810ea19ff6cb705ddf51ffbdaffc%2Fdeepsec-cyberbench-score-vs-cost__8_.png&w=1920&q=75)

GLM 5.3 takes text input, with a 1M token context window and a maximum output of 128K tokens, both unchanged from GLM 5.2. It supports function calling, structured output, streaming, and context caching.

To use the model, the slug is `zai/glm-5.3`:

```
import { streamText } from 'ai';const result = streamText({  model: 'zai/glm-5.3',  prompt: 'Add error recovery to the data ingestion pipeline.',});
```

To use it in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run `vercel ai-gateway coding-agents setup` to connect agents like Claude Code, Codex, OpenCode, Cursor, Pi, and more, then select `zai/glm-5.3` inside the agent.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)