---
title: "Public Web Analytics API now available"
source: "https://vercel.com/changelog/web-analytics-api"
publishedDate: "2026-05-18"
category: "frontend"
feedName: "Vercel"
author: "Damien Simonin Feugas"
---

The [Web Analytics API](https://vercel.com/docs/analytics) is now publicly available, with programmatic access to page views, visitors, and custom events for your Vercel projects.

The API reads from the same aggregated data model that powers the Web Analytics dashboard, so numbers from the API will match what your team sees in the UI. You can use it to build your own custom reports or to embed live traffic metrics in a customer-facing admin panel.

Two resources are exposed:

-   `visits` for automatically tracked page views and visitors
    
-   `events` for custom events sent with `track()`
    

Count endpoints return a single total; aggregate endpoints return rows grouped by time, route, country, referrer, device, feature flag, or custom event data. Filters use OData syntax, with `by` to group results.

For example, to count visitors of a specific page, call `visits/count` with a `requestPath` filter:

```
curl --get "https://api.vercel.com/v1/query/web-analytics/visits/count" \  -H "Authorization: Bearer $VERCEL_TOKEN" \  --data-urlencode "teamId=team_1234567890" \  --data-urlencode "projectId=prj_1234567890" \  --data-urlencode "filter=requestPath eq '/blog/my-post'"
```

For raw, unaggregated event streams, forward analytics data to your own infrastructure with [Drains](https://vercel.com/docs/drains).

Read the [Web Analytics API guide](https://vercel.com/docs/analytics/web-analytics-api) for authentication setup, full filter syntax, and response schemas.