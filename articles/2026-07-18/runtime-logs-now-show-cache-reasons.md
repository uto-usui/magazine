---
title: "Runtime logs now show cache reasons"
source: "https://vercel.com/changelog/runtime-logs-now-show-cache-reasons"
publishedDate: "2026-07-17"
category: "frontend"
feedName: "Vercel"
author: "Shina Patel"
---

Runtime logs now show a Cache Reason explaining why a request wasn't a fresh cache hit, for example a time-based or tag-based revalidation. Use cache reasons to debug misses and improve your hit rate.

Cache reasons appear for any response the CDN can cache, including ISR, Partial Prerendering, and functions that set a `Cache-Control` header with directives like `stale-while-revalidate`. Responses rendered dynamically on every request don't have a cache reason.

Open the Logs tab and select a request to see the reason alongside its cache status. Each status and reason links to its entry in the [Cache Status and Reasons](https://vercel.com/docs/caching/cache-status) reference.

![A STALE request with a Time-based revalidation reason in runtime logs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4hFlhWg3wzMwquJmxvc4x1%2F30da221c0f8b823bd1d7fd99fdfa5769%2Fimage__13_.png&w=1200&q=75)![A STALE request with a Time-based revalidation reason in runtime logs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FaNDlmWtFHJKWNxsiGEY59%2F703d006f8b48773f4c117691d10bfaac%2Fimage__14_.png&w=1200&q=75)

A STALE request with a Time-based revalidation reason in runtime logs.

### [Copy link to heading](#from-the-cli)From the CLI

Cache reason is available in `vercel logs`, `vercel metrics`, and Vercel plugin's [cdn-caching skill](https://www.skills.sh/vercel/vercel-plugin/cdn-caching):

```
# Inspect the cache reason for a request with vercel logs:vercel logs \  --request-id <request-id> \  --expand --json \  --project <project> \  --scope <team># Quantify how often each reason occurs across your traffic with vercel metrics:vercel metrics vercel.request.count \  --group-by cache_reason \  --since <time> \  --project <project> \  --scope <team># Debug caching at scale using the cdn-caching skill in the Vercel plugin:npx skills add https://github.com/vercel/vercel-plugin --skill cdn-caching
```

Learn more about [cache statuses and reasons](https://vercel.com/docs/caching/cache-status).