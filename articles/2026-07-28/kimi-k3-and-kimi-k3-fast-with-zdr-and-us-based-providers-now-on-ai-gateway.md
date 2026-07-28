---
title: "Kimi K3 and Kimi K3 Fast with ZDR and US-based providers now on AI Gateway"
source: "https://vercel.com/changelog/kimi-k3-and-kimi-k3-fast-on-ai-gateway"
publishedDate: "2026-07-27"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Kimi K3 from Moonshot AI](https://vercel.com/ai-gateway/models/kimi-k3) and its faster serving path, [Kimi K3 Fast](https://vercel.com/ai-gateway/models/kimi-k3-fast), are now available from US-based providers on AI Gateway, including Baseten and Fireworks. [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) (ZDR) is also supported for both models.

Running Kimi K3 on US-based providers lets teams with data residency and compliance requirements use the model on US infrastructure. Because AI Gateway serves the models from multiple providers, it automatically routes across them for failover, higher uptime, and more available throughput than any single provider offers. You call the same `moonshotai/kimi-k3` model ID, and the gateway handles provider selection and fallback.

Kimi K3 Fast trades a higher per-token cost for lower latency. Request it with the `speed` option on the base model, which stays on `moonshotai/kimi-k3` and falls back to standard speed when the fast tier is unavailable. Alternatively, use `moonshotai/kimi-k3-fast`. The fast variant costs ~50% more than the base model.

To use Kimi K3, set `model` to `moonshotai/kimi-k3` in the [AI SDK](https://ai-sdk.dev/):

```
import { streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k3',  prompt: 'Find and fix the failing test in this repo.',  providerOptions: {    gateway: {      speed: 'fast',    },  },});
```

## [Copy link to heading](#us-inference)US inference

To route Kimi K3 requests to use only US data centers for inference, set `inferenceRegion`. Regional pricing is ~10% more than the regular variant.

```
import { streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k3',  prompt,  providerOptions: {    gateway: {      inferenceRegion: { scope: 'zone', geoRegion: 'us' },    },  },});
```

## [Copy link to heading](#zero-data-retention)Zero Data Retention

Zero Data Retention for Kimi K3 is also available. Turn on Zero Data Retention for every request from the [AI Gateway dashboard settings](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr), or set it per request with `zeroDataRetention`:

```
import { streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k3',  prompt: 'Summarize this internal document.',  providerOptions: {    gateway: {      zeroDataRetention: true,    },  },});
```

## [Copy link to heading](#providers-and-endpoints)Providers and endpoints

To see every provider serving Kimi K3, along with per-provider pricing, supported parameters, uptime, throughput, and latency, call the model endpoints API:

```
curl https://ai-gateway.vercel.sh/v1/models/moonshotai/kimi-3/endpoints \  -H "Authorization: Bearer $AI_GATEWAY_API_KEY"
```

Model prices vary by provider and variant type.

## [Copy link to heading](#use-kimi-k3-in-your-coding-agent)Use Kimi K3 in your coding agent

Run `vercel ai-gateway coding-agents setup` and select Kimi K3. This will detect the agents on your machine, provision an AI Gateway key, and write their config. See how to set it up via the [Vercel CLI](https://vercel.com/docs/cli/ai-gateway#coding-agents).

Try Kimi K3 in the [model playground](https://vercel.com/ai-gateway/models/kimi-k3).

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard tracks the most popular models over time, ranking them by the total volume of tokens processed across all Gateway traffic.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)