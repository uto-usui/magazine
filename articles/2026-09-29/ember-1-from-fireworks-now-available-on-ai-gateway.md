---
title: "Ember-1 from Fireworks now available on AI Gateway"
source: "https://vercel.com/changelog/ember-1-from-fireworks-now-available-on-ai-gateway"
publishedDate: "2026-09-27"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Ember-1](https://vercel.com/ai-gateway/models/ember-1) from Fireworks is now available on [AI Gateway](https://vercel.com/ai-gateway).

Ember-1 is a research preview reasoning model built on [Kimi K3](https://vercel.com/ai-gateway/models/kimi-k3) for coding and agentic workflows.

Fireworks reports approximately 40% fewer generated tokens than Kimi K3 at comparable quality across its evaluations. For coding agents that make repeated model calls, shorter reasoning traces can reduce output costs and the amount of context carried into later steps.

Ember-1 supports a 1M-token context window, text and image input, tool calling, and [implicit prompt caching](https://vercel.com/docs/ai-gateway/models-and-providers/automatic-caching). The Fireworks endpoint supports [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) and [No Prompt Training](https://vercel.com/docs/ai-gateway/security-and-compliance/disallow-prompt-training).

This model is available as a research preview with an initial two-week window.

To get started, use `fireworks/ember-1` for the model name across APIs and coding agents:

To use Ember-1 in your [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run the setup command with the [Vercel CLI](https://vercel.com/docs/cli/ai-gateway):

```
npm i -g vercel@latestvercel ai-gateway setup
```

The command detects installed agents, provisions or reuses an AI Gateway API key, and configures their connection to the gateway. Then select `fireworks/ember-1` in your agent's model configuration.

AI Gateway provides a unified API for calling models, with built-in [usage and cost tracking](https://vercel.com/docs/ai-gateway/observability-and-spend), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), and [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules).

Try Ember-1 in the [model playground](https://vercel.com/ai-gateway/models/ember-1).