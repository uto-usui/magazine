---
title: "Regional inference now available on AI Gateway"
source: "https://vercel.com/changelog/regional-inference-now-available-on-ai-gateway"
publishedDate: "2026-07-27"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

AI Gateway now supports [regional inference](https://vercel.com/changelog/regional-inference-now-available-on-ai-gateway). Set `inferenceRegion` on a request to pin it to the US or EU. Every model provider that supports the selected region handles it the same way. Inference runs there, and any data the provider keeps is stored there.

AI Gateway supports two pinned regions, plus global routing:

Region

Where inference runs

`us`

A US data center

`eu`

An EU data center

`global`

Any region

If no model provider can serve it, the request fails rather than running somewhere else. Every response reports the region that served it, so you can confirm where each request ran.

Here's a request pinned to the US with the AI SDK:

```
import { streamText } from 'ai';const result = streamText({  model: 'moonshotai/kimi-k3',  prompt: 'Summarize this internal document.',  providerOptions: {    gateway: {      inferenceRegion: { scope: 'zone', geoRegion: 'us' },    },  },});
```

Until now, teams with data residency or compliance requirements had to configure regional routing separately for every provider, with no reliable way to confirm where a request actually ran. Regional inference replaces that with a single field that behaves the same everywhere and a response that tells you where each request was served.

Filter the [model list](https://vercel.com/ai-gateway/models) for models available in the US or EU, or read the `regions` array from `/v1/models`. Without `inferenceRegion`, requests route globally with no residency guarantee, so residency is opt-in.

Pinning a region can cost more. The provider sets the regional rate, often around 10% above standard, and AI Gateway passes it through with no markup. For per-provider overrides, response verification, pricing, and BYOK behavior, read the [regional inference documentation](https://vercel.com/docs/ai-gateway/security-and-compliance/regional-inference).