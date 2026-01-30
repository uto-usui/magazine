---
title: "Request collapsing for ISR cache misses"
source: "https://vercel.com/changelog/request-collapsing-for-isr-cache-misses"
publishedDate: "2025-09-25"
category: "frontend"
feedName: "Vercel"
author: "Sachin Raja"
---

1 min read

Sep 25, 2025

The Vercel CDN now prevents cache stampedes through [request collapsing](https://vercel.com/docs/request-collapsing) on an expired [Incremental Static Regeneration (ISR)](https://vercel.com/docs/incremental-static-regeneration) page into a single function invocation per region. Without collapsing, simultaneous requests each trigger regeneration, wasting compute and overloading backends. With collapsing, one request regenerates the page while others wait and return the cached result.

This improves reliability, reduces backend load, and saves significant compute at scale.

The feature is applied automatically for cacheable routes. Cacheability is inferred from framework metadata, so no configuration is required.

Implementation details are available in the [Preventing the stampede: Request collapsing in the Vercel CDN blog post](https://vercel.com/blog/cdn-request-collapsing).