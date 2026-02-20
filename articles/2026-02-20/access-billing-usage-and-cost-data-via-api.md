---
title: "Access billing usage and cost data via API"
source: "https://vercel.com/changelog/access-billing-usage-cost-data-api"
publishedDate: "2026-02-19"
category: "frontend"
feedName: "Vercel"
author: "Shar Dara"
---

1 min read

Feb 19, 2026

Vercel now supports programmatic access to billing usage and cost data through the API and CLI. The new `/billing/charges` endpoint returns data in the [FOCUS v1.3 open-standard format](https://focus.finops.org/), allowing teams to ingest cost data into FinOps tools without custom transformation logic.

The endpoint supports 1-day granularity with a maximum date range of one year. Responses are streamed as newline-delimited JSON (JSONL) to handle large datasets efficiently.

**SDK usage**

```
import { Vercel } from "@vercel/sdk";const vercel = new Vercel({  bearerToken: "<YOUR_BEARER_TOKEN_HERE>",});async function run() {  const result = await vercel.billing.listBillingCharges({    from: "2025-01-01T00:00:00.000Z",    to: "2025-01-31T00:00:00.000Z",    teamId: "team_1a2b3c4d5e6f7g8h9i0j1k2l",    slug: "my-team-url-slug",  });  for await (const event of result) {    // Handle the event    console.log(event);  }}run();
```

`**curl**` **usage**

```
curl -N --request GET \  --url 'https://api.vercel.com/v1/billing/charges?teamId=<team>' \  --header 'Authorization: Bearer <token>' \  --header 'Accept-Encoding: gzip' \  --compressed
```

**CLI usage**

For quick introspection, the `vercel usage` command displays billing usage for the current period or a custom date range. This includes credit-use and costs for each service.

**View usage for the current billing period**

```
vercel usage
```

**View usage for a custom date range**

```
vercel usage --from 2025-01-01 --to 2025-01-31
```

Vantage has also released a native integration that connects Vercel teams to Vantage accounts. This automatically syncs usage and cost data alongside other tools, simplifying cost observability. Read the [Vantage announcement blog](https://www.vantage.sh/blog/vercel-cost-management) for details.

Learn more in the [API documentation](https://docs.vercel.com/docs/rest-api/reference/endpoints/billing/list-focus-billing-charges) and [CLI reference](https://vercel.com/docs/cli/usage).