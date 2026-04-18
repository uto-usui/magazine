---
title: "Unified reporting for all AI Gateway usage"
source: "https://vercel.com/blog/unified-reporting-for-your-ai-spend"
publishedDate: "2026-03-25"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

3 min read

Mar 25, 2026

If you're shipping AI features, you already have usage data. The problem is that it's split across providers, keys, and dashboards, so it's hard to answer basic questions before the bill shows up.

You've probably felt the drift into after-the-fact reconciliation. Provider consoles only show their own slice, so you end up exporting CSVs, rebuilding views in spreadsheets, and still missing the context that matters, like your tags, feature boundaries, and internal user IDs. When BYOK enters the picture, it gets worse because spend and usage scatter across whatever keys your users bring.

The Custom Reporting API for [AI Gateway](https://vercel.com/ai-gateway) is now available in beta for teams on the Pro and Enterprise plans. It gives you programmatic access to cost, token usage, and request volume across your AI Gateway traffic, including BYOK requests.

You can break down spend by model, provider, user ID, custom tag, or credential type. That makes it possible to track costs and usage per feature, per end customer, and per pricing tier from a single endpoint. You can also query it live via Claude Code.

### [Link to heading](#how-a-platform-saved-$80k)How a platform saved $80K

One AI platform aggregating models for 200K+ users previously relied on a separate proxy layer to track costs across providers. During the Custom Reporting private beta, they consolidated cost tracking and request management into a single system, replacing their third-party proxy entirely and saving over $80K.

With Advanced Reporting, they now use custom tags and user IDs to track customers' usage and costs across models, gaining programmatic access to spend data in the same place their inference already runs.

### [Link to heading](#implement-the-reporting-api)Implement the reporting API

Tag requests with `user` and `tags` so you can attribute cost in terms your product and finance teams recognize. If you run a customer-facing AI feature, you can tag each request with the customer ID, their plan, and the feature they are using.

```
import { generateText } from 'ai';const { text } = await generateText({  model: 'anthropic/claude-sonnet-4.6',  prompt: userMessage,  providerOptions: {    gateway: {      user: customer.id,      tags: [customer.plan, 'code-review', 'production'],    },  },});
```

Tagging works with the AI SDK, Chat Completions API, Responses API, OpenResponses API, and Anthropic Messages API. No matter which interface or language you use, the data lands in the same reporting endpoint.

```
completion = client.chat.completions.create(    model='anthropic/claude-sonnet-4.6',    messages=[{'role': 'user', 'content': 'Explain this error log.'}],    extra_body={        'providerOptions': {            'gateway': {                'user': 'ops-team-jane',                'tags': ['debugging', 'internal-tools'],            },        },    },)
```

Query the custom reporting endpoint to get answers:

```
GET https://ai-gateway.vercel.sh/v1/report?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
```

This is where reporting stops being an exercise in reconciliation and starts being something you can run as part of how you operate. You can measure the cost of a single feature across all Enterprise teams, see which free-tier users are nearing the point where they should upgrade, and calculate per-request unit economics before you change pricing.

Everything below works across both BYOK and system credentials. Whether your users bring their own API keys or you pay through AI Gateway credits, the reporting API captures it in one place.

With the results, you can track per-customer and per-feature costs to understand where spend is actually going, monitor internal usage across models and providers to catch spikes before they appear on the bill, and use the data to set budgets, calculate margins, and make pricing decisions based on real unit economics.

```
{  "results": [    {      "day": "2026-01-15",      "user": "customer_42",      "total_cost": 1240.00,      "market_cost": 1418.00,      "input_tokens": 4200000,      "output_tokens": 980000,      "cached_input_tokens": 1600000,      "cache_creation_input_tokens": 380000,      "reasoning_tokens": 520000,      "request_count": 8400    },    {      "day": "2026-01-15",      "user": "customer_87",      "total_cost": 185.00,      "market_cost": 211.50,      "input_tokens": 620000,      "output_tokens": 145000,      "cached_input_tokens": 210000,      "cache_creation_input_tokens": 48000,      "reasoning_tokens": 0,      "request_count": 1250    }  ]}
```

Once your traffic runs through a single reporting endpoint, you can treat AI spend like any other production metric. Tag requests the way your product works, query the reporting endpoint on a schedule, and use the results to set budgets, price features, and catch changes in usage before they turn into surprises.

Read the [AI Gateway documentation](https://vercel.com/docs/ai-gateway/capabilities/custom-reporting) and view [supported models and providers](https://vercel.com/ai-gateway/models).