---
title: "Team-wide Zero Data Retention and prompt training controls now on AI Gateway"
source: "https://vercel.com/changelog/zero-data-retention-no-prompt-training-on-ai-gateway"
publishedDate: "2026-04-06"
category: "frontend"
feedName: "Vercel"
author: "Matt Lenhard"
---

1 min read

Apr 6, 2026

AI Gateway now supports Zero Data Retention (ZDR) at the team level, removing the need to configure opt-outs or reach agreements with each provider individually. It routes requests only to providers where ZDR agreements are in place, with support for Anthropic, OpenAI, Google, and many more models.

### [Link to heading](#team-wide-zdr)**Team-wide ZDR**

Enable team-wide ZDR from the [AI Gateway Dashboard Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings&title=AI+Gateway+Settings) to enforce Zero Data Retention on every request your team makes, with no code changes required.

### [Link to heading](#request-level-zdr-&-no-prompt-training)**Request-level ZDR & No Prompt Training**

You can also configure ZDR and/or No Prompt Training on the request level by setting `zeroDataRetention: true` or `disallowPromptTraining: true` per request. Enabling Zero Data Retention automatically includes training opt-out, so there's no need to configure both separately.

```
import type { GatewayProviderOptions } from '@ai-sdk/gateway';import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-sonnet-4.6',  prompt: 'Summarize this internal document.',  providerOptions: {    gateway: {      disallowPromptTraining: true,      zeroDataRetention: true,    } satisfies GatewayProviderOptions,  },});
```

**Pricing**

**Option**

**Cost**

**Availability**

Team-wide ZDR

$0.10 per 1,000 requests

Pro and Enterprise

Per-request ZDR

Free

Pro and Enterprise

Disallow Prompt Training (per-request)

Free

All users

Each response includes metadata showing which providers were considered and which were filtered out, giving you an audit trail of policy enforcement.

These controls work with the AI SDK, Chat Completions API, Responses API, Anthropic Messages API, and OpenResponses API.

Read the [Zero Data Retention documentation](https://vercel.com/docs/ai-gateway/capabilities/zdr) and [No Prompt Training documentation](https://vercel.com/docs/ai-gateway/capabilities/disallow-prompt-training) for more details.