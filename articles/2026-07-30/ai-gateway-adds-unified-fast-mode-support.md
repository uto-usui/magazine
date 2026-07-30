---
title: "AI Gateway adds unified fast mode support"
source: "https://vercel.com/changelog/ai-gateway-adds-unified-fast-mode-support"
publishedDate: "2026-07-29"
category: "frontend"
feedName: "Vercel"
author: "Josh Lipman"
---

AI Gateway has a unified fast mode abstraction, now in beta.

You can now request [fast mode](https://vercel.com/docs/ai-gateway/models-and-providers/fast-mode) the same way for every model on AI Gateway. Set speed to `fast`, and the gateway serves the fast tier when it's available and falls back to standard speed when it isn't.

Fast mode trades a higher per-token cost for lower latency or higher throughput. You get it wherever it is available, without pinning a provider or wiring anything up yourself.

## [Copy link to heading](#requesting-fast-mode)Requesting fast mode

Set `speed` to `fast` under `providerOptions.gateway` to upgrade the model to its fast serving path when one is routable:

```
import { generateText } from 'ai';const { text, providerMetadata } = await generateText({  model: 'anthropic/claude-opus-5',  prompt: 'Explain quantum computing in two sentences.',  providerOptions: {    gateway: {      speed: 'fast',    },  },});console.log('Served speed:', providerMetadata?.gateway?.routing?.speed);
```

You can also address a fast variant directly with its fast slug, such as `anthropic/claude-opus-5-fast`, which is the same as setting `speed: 'fast'` on the base model.

Use the `speed` option when you want to stay on the base model ID and fall back to standard speed. Use a fast slug when you want to name the fast variant directly, for example in a `gateway.models` fallback list. The `speed` option works across every AI Gateway API format.

Fast mode is available for a growing set of models. Find them in the [models list](https://vercel.com/ai-gateway/models?features=fast) with a lightning bolt next to the slug. Requesting fast mode on a model with no fast tier has no effect, and the request runs at standard speed. Fast variants of models are usually more expensive than the base model: check [pricing](https://vercel.com/ai-gateway/models?features=fast) for more details.

## [Copy link to heading](#using-fast-mode-in-coding-agents)Using fast mode in coding agents

In Claude Code, toggle fast mode with `/fast` for Anthropic Opus models after [setup](https://vercel.com/docs/ai-gateway/coding-agents/claude-code#enabling-fast-mode). For other agents, select a fast slug in your model configuration, such as `anthropic/claude-opus-5-fast`.

For more information about fast mode, read the [documentation](https://vercel.com/docs/ai-gateway/models-and-providers/fast-mode).