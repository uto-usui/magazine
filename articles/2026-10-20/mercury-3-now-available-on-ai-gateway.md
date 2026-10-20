---
title: "Mercury 3 now available on AI Gateway"
source: "https://vercel.com/changelog/mercury-3-now-available-on-ai-gateway"
publishedDate: "2026-10-19"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Mercury 3 from Inception](https://vercel.com/ai-gateway/models/mercury-3) is now available on AI Gateway with 50% off launch pricing. Inception reports strong results across a range of benchmarks, with generation speeds above 1,000 tokens per second.

Mercury 3 uses diffusion to generate text through parallel refinement. It brings improved reasoning to latency-sensitive workloads such as browser agents, real-time search, interactive education, and customer support. A 1M-token context window gives those applications room for long documents and extended conversation histories.

Set `AI_GATEWAY_API_KEY` in your environment. Use `inception/mercury-3` as the model name:

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Then select `inception/mercury-3` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try Mercury 3 in the [model playground](https://vercel.com/ai-gateway/models/mercury-3).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.