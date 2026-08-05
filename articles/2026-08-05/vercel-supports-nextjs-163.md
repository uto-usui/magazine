---
title: "Vercel supports Next.js 16.3"
source: "https://vercel.com/blog/vercel-supports-next-js-16-3"
publishedDate: "2026-08-04"
category: "frontend"
feedName: "Vercel"
author: "Luba Kravchenko"
---

Yesterday the Next.js team announced the release of [Next.js 16.3](https://nextjs.org/blog/next-16-3), with leaner prefetching, immutable static assets, and instant navigations. As part of this release, we worked with the Next.js team to fully support 16.3 on Vercel, including better performance and additional observability. Applications that have upgraded have seen:

-   **Fewer prefetch requests**: Apps upgrading from 16.2 to 16.3 saw 45% fewer prefetch requests on average, with some seeing reductions over 70%.
    
-   **Lower static asset costs**: With immutable static assets, upgraded apps saw 17% fewer CDN requests and 24% fewer bytes transferred for static content, and up to 60% global TTFB reductions for frequently deployed projects.
    
-   **Faster routing at scale**: Routing metadata improvements in the critical serving path deliver ~2x faster p99 route resolution for large sites.
    

## [Copy link to heading](#platform-improvements)Platform improvements

Next.js 16.3 ships leaner prefetching and enables immutable static assets by default. Supporting both meant changing the platform too, in how it caches static assets, resolves routes, and surfaces what happened in production.

### [Copy link to heading](#immutable-static-assets)Immutable static assets

Vercel now supports reusing [immutable static assets](https://vercel.com/changelog/optimized-cdn-caching-and-deploying-of-immutable-static-assets) across deployments for Next.js. Immutable static assets can't suffer from version skew, even for projects without [Skew Protection](https://vercel.com/docs/skew-protection) enabled, and the browser cache survives redeploys. Because Next.js uses query-parameter-based Skew Protection, this change cut CDN requests by 17% and bytes transferred by 24% for static content. Deployments also complete up to 30% faster on average, since unchanged assets skip re-upload. In Next.js 16.3, immutable static assets are enabled by default.

Next.js 16.3 outputs immutable content-addressed static assets under the public path `/_next/static/immutable/*`. The Vercel CDN uses this prefix to differentiate immutable static assets from other static assets.

If you're a framework author and want to implement this in your own toolchain, see the immutable static files section of the [Build Output API docs](https://vercel.com/docs/build-output-api/configuration).

### [Copy link to heading](#faster-routing-at-scale)Faster routing at scale

Next.js 16 introduced an optimization where common parts of an application are prefetched once and reused across navigations, rather than fetched again for every link. To make that reuse work, each shared segment has to be fetchable on its own, so Next.js generates many more paths for the same application.

Those extra paths add up on the platform side. Frameworks like Next.js deploy to Vercel through the Build Output API, and for each path the framework generates a metadata file that describes how to serve it, such as its [prerender configuration](https://vercel.com/docs/build-output-api/primitives#prerender-functions). The Vercel CDN reads that metadata in the path of every request, so each lookup has to finish in milliseconds or less, and it caches the metadata to stay under that budget. Globally, that's 5 million lookups per second. As Next.js 16 applications shipped more paths, the cache held more entries, hit rates dropped, and we saw p99 TTFB increase for larger applications.

To fix this, we improved the layer that serves route metadata, making it ~2x faster with ~10x fewer cache misses. Instead of storing each segment's metadata as its own cache entry, we now combine entries into JSONL-formatted shards, and we optimized in-process and remote caching around those shards. Fewer, larger entries mean better hit rates, and the JSONL format still lets the CDN find the right entry inside a shard quickly.

This improvement is implemented in the platform and already live for every deployment, so other frameworks that deploy through the Build Output API automatically benefit from it as well.

### [Copy link to heading](#improved-observability)Improved observability

Next.js 16.3 includes [improvements to prefetching](https://nextjs.org/blog/next-16-3#fewer-prefetch-requests) that resulted in a 45% reduction in prefetch requests. You can now query whether a request was a prefetch in [Vercel Observability](https://vercel.com/docs/observability) and [Runtime Logs](https://vercel.com/docs/observability/runtime-logs), or in the query builder with [Observability Plus](https://vercel.com/docs/observability/observability-plus).

We have also heard from users who want more visibility into [Incremental Static Regeneration (ISR)](https://vercel.com/docs/incremental-static-regeneration) revalidations. The [ISR observability page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fisr&title=ISR+Observability) now prominently displays time-based and on-demand revalidations, we expose [cache reasons](https://vercel.com/changelog/runtime-logs-now-show-cache-reasons) and [ISR write utilization](https://vercel.com/changelog/write-utilization-now-available-in-isr-observability), and we published a [guide on how to reduce ISR revalidations](https://vercel.com/kb/guide/how-to-reduce-isr-revalidation-costs).

Today, we are also launching observability for [Partial Prerendering](https://vercel.com/docs/partial-prerendering) (PPR). PPR serves the static parts of a page immediately and then streams dynamic content, such as personalization or experimentation. Under the hood, it combines ISR and [Vercel Functions](https://vercel.com/docs/functions) into one system so applications benefit from both at the same time. Next.js 16 applications that use [Cache Components](https://nextjs.org/docs/app/getting-started/cache-components) get PPR automatically when deployed to Vercel.

In the Vercel dashboard, the [PPR Observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability&title=Observability) page shows which requests are serving static content, dynamic content, or a combination of the two. Use it to confirm static shells are working, catch routes that have regressed to fully dynamic, and see when your functions run.

If you need to dig in, click through to the ISR or Functions observability pages for details about cache revalidations or function executions.

## [Copy link to heading](#upgrade-today)Upgrade today

Next.js 16.3 is available today. Upgrade to take advantage of the new features:

`pnpm add next@16.3.0`

Read the [Next.js 16.3 announcement](https://nextjs.org/blog/next-16-3) for the full release notes or learn more about [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).