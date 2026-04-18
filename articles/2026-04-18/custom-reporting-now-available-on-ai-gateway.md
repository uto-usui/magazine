---
title: "Custom reporting now available on AI Gateway"
source: "https://vercel.com/changelog/custom-reporting-ai-gateway"
publishedDate: "2025-03-25"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Mar 25, 2025

Custom Reporting for [AI Gateway](https://vercel.com/ai-gateway) is now available in beta for Pro and Enterprise users. Slice your AI spend by any dimension: model, provider, user, custom tags, or credential type. A single place for all your AI cost and usage data, including BYOK.

All your inference already runs through AI Gateway, which means cost, token, and request data across every model, provider, and credential type is already there. The Custom Reporting API makes it queryable, so you're not logging into separate provider consoles or maintaining a third-party proxy for cost tracking.

**How it works**

Tag your requests with \`user\` and \`tags\` to attribute costs by customer, feature, team, or environment:

```
import { generateText } from 'ai';const { text } = await generateText({  model: 'anthropic/claude-sonnet-4.6',  prompt: userMessage,  providerOptions: {    gateway: {      user: customer.id,      tags: [customer.plan, 'code-review', 'production'],    },  },});
```

Tagging works with the AI SDK, Chat Completions API, Responses API, OpenResponses API, and Anthropic Messages API.

Then query the reporting endpoint:

```
GET https://ai-gateway.vercel.sh/v1/report?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
```

Group by time, tag, user, model, provider, and all the other AI parameters.

**Example**

Use the custom reporting endpoint to get all your customer costs by use case.

```
curl -H "Authorization: Bearer YOUR_API_KEY" \  "https://ai-gateway.vercel.sh/v1/report?start_date=2026-03-01&end_date=2026-03-31&group_by=tag"
```

```
{  "results": [    {      "tag": "enterprise",      "total_cost": 8400.00,      "market_cost": 9600.00,      "input_tokens": 52000000,      "output_tokens": 12800000,      "cached_input_tokens": 19500000,      "cache_creation_input_tokens": 4600000,      "reasoning_tokens": 0,      "request_count": 142000    },    {      "tag": "code-review",      "total_cost": 5100.00,      "market_cost": 5900.00,      "input_tokens": 33000000,      "output_tokens": 8200000,      "cached_input_tokens": 12400000,      "cache_creation_input_tokens": 2800000,      "reasoning_tokens": 0,      "request_count": 89000    },    {      "tag": "production",      "total_cost": 3200.00,      "market_cost": 3800.00,      "input_tokens": 21000000,      "output_tokens": 5400000,      "cached_input_tokens": 8200000,      "cache_creation_input_tokens": 1900000,      "reasoning_tokens": 0,      "request_count": 58000    }  ]}
```

**Pricing**

**Charge type**

**Cost**

Tag/User ID

$0.075 per 1,000 unique tag or user ID values written per request

Query

$5 per 1,000 queries to the reporting endpoint

To learn more, read the AI Gateway [custom reporting docs](https://vercel.com/docs/ai-gateway/capabilities/advanced-reporting).