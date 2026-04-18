---
title: "Zero Data Retention on AI Gateway"
source: "https://vercel.com/blog/zdr-on-ai-gateway"
publishedDate: "2026-04-08"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

3 min read

Apr 8, 2026

Building with multiple AI models means wrestling with fragmented data policies. With many different model providers, it's not just fragmented, it's just too much time spent on the wrong things.

You have to read through different terms of service, track which providers comply with your security requirements, and hope developers remember to configure opt-outs correctly on every request. What should be a straightforward policy becomes a manual, error-prone process because many providers do not offer Zero Data Retention (ZDR) by default.

[AI Gateway](https://vercel.com/docs/ai-gateway) changes this by handling the negotiation and enforcement for you. Instead of managing policies provider by provider, you get the freedom to just build. AI Gateway ensures your data requirements are met automatically by only routing to providers where we have negotiated Zero Data Retention agreements. Models from OpenAI, Anthropic, Google, and more have ZDR providers available.

Today, we are expanding AI Gateway's compliance capabilities with team-wide Zero Data Retention (ZDR), letting you enforce strict data policies across your entire team without touching any code. Gateway compliance features now include team-wide ZDR from the dashboard, per-request ZDR for specific sensitive workflows, and explicit controls to disallow prompt training.

Toggle on in the [AI Gateway Dashboard Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings\&title=AI+Gateway+Settings), and all subsequent requests via AI Gateway will only route through ZDR-compliant providers.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1JLd8aVrsB0x0HfKGORORR%2F559c6909e9fb13e47bcdad5da4722560%2FCleanShot_2026-04-03_at_15.52.16_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1SUCtbgN0SmLnPytyUVvk1%2Fc3fb8d842e918c343a233a9d90f39f19%2FCleanShot_2026-04-03_at_15.52.03_2x.png&w=1920&q=75)

### [Link to heading](#team-wide-zero-data-retention)Team-wide Zero Data Retention

Team-wide ZDR is available for Pro and Enterprise teams. It applies to every request your team makes, requiring no code changes. This is ideal for teams that want controls with complete assurance that no one can modify or misapply restrictions.

### [Link to heading](#request-level-controls)Request-level controls

Per-request ZDR lets you enforce data deletion on specific requests when only certain workflows handle sensitive data. This is useful when your app has proprietary information in certain queries but other requests are not as protected. You can enable request-level ZDR in all API formats supported by AI Gateway in the [provider options](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options).

```
import type { GatewayProviderOptions } from '@ai-sdk/gateway';import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-sonnet-4.6',  prompt: 'Analyze this sensitive business data and provide insights.',  providerOptions: {    gateway: {      zeroDataRetention: true,    } satisfies GatewayProviderOptions,  },});
```

Team-wide and per-request settings work together. If either is enabled, ZDR is enforced.

### [Link to heading](#disallow-prompt-training)Disallow Prompt Training

Disallow Prompt Training prevents providers from using your prompt data to train their models. This is a good default for any team sending proprietary code, internal documents, or business strategy through an LLM. This filter is available on the request-level.

ZDR is a superset of this control. If you enable ZDR, training opt-out is already covered.

```
import type { GatewayProviderOptions } from '@ai-sdk/gateway';import { streamText } from 'ai';const result = streamText({  model: 'anthropic/claude-sonnet-4.6',  prompt: 'Analyze this proprietary business strategy.',  providerOptions: {    gateway: {      disallowPromptTraining: true,    } satisfies GatewayProviderOptions,  },});
```

Each response includes metadata showing which providers were considered and which were filtered out. This gives you an audit trail of how your data policies were enforced.

```
{  "gateway": {    "routing": {      "planningReasoning": "ZDR requested: 5 attempts → 2 ZDR attempts. ZDR execution order: anthropic(system) → bedrock(system)"    }  }}
```

All of these filters work with the [AI SDK](https://vercel.com/docs/ai-sdk), [Chat Completions API](https://vercel.com/docs/ai-gateway/sdks-and-apis), [Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages API](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-compat), and [OpenResponses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses).

Protecting data no longer requires custom logic in every route. By moving these rules to the gateway, compliance becomes infrastructure instead of application busywork. You get your control back, and your team gets to keep shipping.

For pricing details, see [Zero Data Retention pricing](https://vercel.com/docs/ai-gateway/capabilities/zdr#pricing). View the models and providers that support Zero Data Retention and Disallow Prompt Training on the [model subpages](https://vercel.com/ai-gateway/models). Enable Zero Data Retention in your [dashboard settings](https://vercel.com/d?title=AI+Gateway+Settings&to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings%5C) today, or read the [documentation](https://vercel.com/docs/ai-gateway) for full setup details.