---
title: "Mistral Large 4 updated weights and lower pricing on AI Gateway"
source: "https://vercel.com/changelog/mistral-large-4-updated-weights-and-lower-pricing-on-ai-gateway"
publishedDate: "2026-10-29"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Mistral Large 4 from Mistral](https://vercel.com/ai-gateway/models/mistral-large-4) now uses updated weights on [AI Gateway](https://vercel.com/docs/ai-gateway), with lower pricing for input, cached input, and output tokens.

According to [Mistral’s release announcement](https://mistral.ai/news/mistral-large-4-oss/), the updated weights improve agentic coding and defensive cybersecurity, with greater token efficiency on coding tasks. The release also improves spreadsheet creation and editing, web research, and resistance to prompt injection.

If you were already using `mistral/mistral-large-4` via AI Gateway, there is no need to change your model to start using the updated version. The existing model ID string uses the new model with updated weights and pricing.

To use Mistral Large 4 in fx, Pi, Claude Code, Codex, Cursor, or other harnesses, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Then select `mistral/mistral-large-4` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

You can also try Mistral Large 4 in the [model playground](https://vercel.com/ai-gateway/models/mistral-large-4).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.