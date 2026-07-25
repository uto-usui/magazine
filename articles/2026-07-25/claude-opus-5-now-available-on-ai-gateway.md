---
title: "Claude Opus 5 now available on AI Gateway"
source: "https://vercel.com/changelog/claude-opus-5-now-available-on-ai-gateway"
publishedDate: "2026-07-24"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Claude Opus 5](https://vercel.com/ai-gateway/models/claude-opus-5) from Anthropic is now available on AI Gateway.

Opus 5 improves on previous Opus models for long-horizon agentic coding, handling multi-file features, larger refactors, and end-to-end feature work, and completing full tasks rather than leaving stubs or placeholders.

Opus 5 is effective at low and medium effort, which produce quality at a fraction of the tokens and latency of higher settings. Vision is stronger on charts, documents, diagrams, and UI replication, and Opus 5 makes effective use of tools to analyze, crop, and verify visual work. It also coordinates teams of subagents well, which suits multi-agent workflows.

Reasoning is on by default. In AI SDK 7, set the reasoning effort with the top-level `reasoning` option, from `minimal` up to `xhigh`, or `none`:

```
import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-opus-5',  prompt: 'Implement the multi-file refactor described in this issue.',  reasoning: 'medium',});
```

Like Fable 5, Opus 5 ships with elevated cybersecurity safeguards, so benign security work can occasionally trigger a safety classifier and get blocked. To add a backstop, use AI Gateway's model fallbacks. List backup models in a `models` array under `providerOptions.gateway`, and the gateway tries them in order when the primary model fails. The same option works across every AI Gateway API format.

```
import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-opus-5',  prompt: 'Audit this script for vulnerabilities.',  providerOptions: {    gateway: {      models: ['anthropic/claude-opus-4.8', 'anthropic/claude-sonnet-5'],    },  },});
```

Opus 5 is compatible with [Zero Data Retention](https://vercel.com/docs/ai-gateway/zdr).

## [Copy link to heading](#fast-mode)Fast mode

To enable fast mode, pass `speed: 'fast'` in the `anthropic` provider options in AI SDK:

```
import { streamText } from "ai";const { text } = await streamText({  model: 'anthropic/claude-opus-5',  prompt,  providerOptions: {    anthropic: {      speed: 'fast',    },  },});
```

## [Copy link to heading](#providers-and-endpoints)Providers and endpoints

Opus 5 can be served by more than one provider. To see every provider serving it, along with per-provider pricing, supported parameters, uptime, throughput, and latency, call the model endpoints API:

```
curl https://ai-gateway.vercel.sh/v1/models/anthropic/claude-opus-5/endpoints \  -H "Authorization: Bearer $AI_GATEWAY_API_KEY"
```

## [Copy link to heading](#use-opus-5-in-your-coding-agent)Use Opus 5 in your coding agent

Route your coding agent through AI Gateway to run Opus 5 with unified spend tracking, model fallbacks, and access to every model.

Run `vercel ai-gateway coding-agents setup` to detect the agents on your machine, provision a key, and write their config. See how to [set it up in Claude Code](https://vercel.com/docs/ai-gateway/coding-agents/claude-code).