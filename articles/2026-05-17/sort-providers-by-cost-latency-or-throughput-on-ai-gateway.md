---
title: "Sort providers by cost, latency, or throughput on AI Gateway"
source: "https://vercel.com/changelog/sort-providers-by-cost-latency-or-throughput-on-ai-gateway"
publishedDate: "2026-05-15"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

2 min read

May 15, 2026

You can now sort the providers behind a model by cost, time to first token (TTFT), or throughput (TPS) in [AI Gateway](https://vercel.com/ai-gateway).

The default provider order blends provider reliability, quality of model output, cost, and speed of response. You can now use `sort` for explicit control over ranking criteria.

For models with many providers and noticeable cost or speed variation, you can use `sort` to optimize on your dimension of choice. Ranking is computed at request time, so newly added providers, price changes, and shifts in observed latency or throughput flow through automatically without any code changes.

Set `sort` on `providerOptions.gateway` to one of the three values:  

**Value**

**Description**

**Direction**

**When to use**

`'cost'`

Sort by the provider's listed input price per million tokens

Lowest price first

High-volume, cost-sensitive work

`'ttft'`

Sort by median time to first token, in ms

Lowest latency first

Latency-sensitive workloads where response speed matters

`'tps'`

Sort by median tokens per second throughput

Highest first

Long-output generation where total response time matters most

### [Link to heading](#basic-usage)**Basic usage**

Use `sort` to ensure optimizing for your metric of choice.

In this example, AI Gateway has over five providers for [GPT OSS 120B](https://vercel.com/ai-gateway/models/gpt-oss-120b) with different prices, so sorting by cost is a useful option for requests that want to route through the lowest price provider.

Providers are tried in sort order. Fallback to the next provider only happens when the higher-ranked one is unavailable.

sort-cost

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-oss-120b',  prompt: 'Summarize this internal document.',  providerOptions: {    gateway: {      sort: 'cost', // Use the lowest cost provider first    },  },});
```

Sort example by cost for GPT OSS 120B

### [Link to heading](#combine-with-other-routing-controls)**Combine with other routing controls**

`sort` is compatible with other gateway routing options like Zero Data Retention (ZDR).

The example below uses `deepseek/deepseek-v4-pro` for an interactive request where latency and data retention matter: AI Gateway filters to only providers for [Deepseek V4 Pro](https://vercel.com/ai-gateway/models/deepseek-v4-pro) that have zero data retention, and then sorts the remaining providers by time to first token (TTFT).

sort-zdr

```
import { streamText } from 'ai';const result = streamText({  model: 'deepseek/deepseek-v4-pro',  prompt,  providerOptions: {    gateway: {      zeroDataRetention: true,      sort: 'ttft', // Among ZDR-compliant providers in this set, try the lowest latency first    },  },});
```

Sample ZDR filtering and TTFT sorting for DeepSeek V4 Pro

`sort` also composes with `order`: providers listed in `order` are promoted to the front, and the remaining providers follow the requested sort criterion.

### [Link to heading](#inspecting-routing-decisions)**Inspecting routing decisions**

See exactly why each request landed where it did. Every response includes a `sort` block in the routing metadata showing which providers were considered, the metric values used to rank them, the order they were attempted, and any that were deprioritized due to degraded health.

sample-sort-metadata

```
{  "gateway": {    "routing": {      "sort": {        "option": "cost",        "executionOrder": ["novita", "groq", "fireworks", "baseten", "cerebras"],        "metrics": {          "novita": 0.10,          "groq": 0.15,          "cerebras": 0.20,          "fireworks": 0.22,          "baseten": 0.25        },        "deprioritizedProviders": ["cerebras"]      }    }  }}
```

Sample execution order for GPT OSS 120B

For more information on sorting via AI Gateway, read the [documentation](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering#provider-sorting).