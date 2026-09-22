---
title: "Grok 4.7 now available and 40% off on AI Gateway, fx, and eve"
source: "https://vercel.com/changelog/grok-4-7-now-available-and-40-off-on-ai-gateway-fx-eve"
publishedDate: "2026-09-21"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Grok 4.7](https://vercel.com/ai-gateway/models/grok-4.7) from SpaceXAI is now available on AI Gateway and 40% off through September 27. The discount applies automatically when you call `spacexai/grok-4.7`.

Grok 4.7 has a 500K token context window and supports low, medium, high, and xhigh reasoning levels, giving you control over the tradeoff between latency and depth.

Use `spacexai/grok-4.7` everywhere you call the model. The same ID works with the [AI SDK](https://ai-sdk.dev/), the [OpenAI-compatible Chat Completions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), and [coding agents](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway:

To use Grok 4.7 in a coding agent, install the latest Vercel CLI and run setup:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Then select `spacexai/grok-4.7` in [fx](https://fx.sh/), Cursor, Codex, Amp, OpenCode, or another supported agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for agent-specific instructions.

To create a new [eve](https://eve.dev/) agent with Grok 4.7 and `xhigh` reasoning, pass the same model ID to the initializer:

```
npx eve@latest init grok-agent \  --model spacexai/grok-4.7 \  --reasoning xhigh
```

Grok 4.7 supports [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) and [disallow prompt training](https://vercel.com/docs/ai-gateway/security-and-compliance/disallow-prompt-training). Requests appear in AI Gateway [logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs), custom reporting, and budgets alongside your other models.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try [Grok 4.7 in the model playground](https://vercel.com/ai-gateway/models/grok-4.7), or [view all language models](https://vercel.com/ai-gateway/models?type=text) or check out [more promotions](https://vercel.com/ai-gateway/models?promo=true) on AI Gateway.