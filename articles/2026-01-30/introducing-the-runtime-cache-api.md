---
title: "Introducing the Runtime Cache API"
source: "https://vercel.com/changelog/introducing-the-runtime-cache-api"
publishedDate: "2025-08-13"
category: "frontend"
feedName: "Vercel"
author: "Luba Kravchenko"
---

1 min read

Aug 13, 2025

You can now access Vercel's [Runtime Cache via API](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package#getcache).

The Runtime Cache is an ephemeral cache for storing and retrieving data across [Functions](https://vercel.com/docs/functions), [Routing Middleware](https://vercel.com/docs/routing-middleware), and [Builds](https://vercel.com/docs/builds) within the same region. It supports tag-based invalidation for precise and efficient cache control.

You can get started with the API like this:

```
import { getCache } from "@vercel/functions";export async function GET(request) {  const cache = getCache();  const cacheKey = 'blog';  const value = await cache.get(cacheKey);  if (value) {    return value;  }  const res = await fetch("https://api.vercel.app/blog");  const originValue = await res.json();  await cache.set(cacheKey, originValue, {    ttl: 3600,    tags: ['blogs'],  });  return originValue;}
```

You can monitor hit rates, invalidation patterns, and storage usage across your applications in the Observability dashboard's Runtime Cache tab.

Runtime Cache reads and writes are [billed regionally](https://vercel.com/docs/pricing/regional-pricing) based on the runtime region.

The Vercel Data Cache, used by `unstable_cache()` and `fetch()` caching in Next.js 13, remains in beta and is not billed during this period.

You can still view your Vercel Data Cache usage under the Runtime Cache tab via the toggle at the top of the page.

Learn more about [Runtime Cache in the docs](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package#getcache).