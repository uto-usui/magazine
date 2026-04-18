---
title: "Vercel CDN now respects Cache-Control headers from external origins by default"
source: "https://vercel.com/changelog/vercels-cdn-now-respects-cache-control-headers-from-external-origins-by-default"
publishedDate: "2026-03-30"
category: "frontend"
feedName: "Vercel"
author: "Agustin Falco"
---

1 min read

Mar 30, 2026

New Vercel projects will honor `cache-control` [headers](https://vercel.com/docs/caching/cache-control-headers#behavior) by default when proxying requests to external origins, starting April 6th.

Previously, responses served through rewrites to external origins were uncached by default, and enabling caching required the `x-vercel-enable-rewrite-caching` header in `vercel.json`. Now, Vercel's CDN automatically respects your origin's caching headers.

**What's changing:**

-   For new projects, Vercel will cache responses from external origins according to upstream `Cache-Control`, `CDN-Cache-Control` and `Vercel-CDN-Cache-Control` headers by default.
    
-   You can use [Cache Tags](https://vercel.com/docs/caching/cdn-cache/purge#cache-tags) (`Vercel-Cache-Tag` header) from your origins to purge cached content.
    
-   Existing projects can opt in to the new caching behavior from the [project dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fadvanced).
    
-   You can opt out of caching for specific request paths by setting the `x-vercel-enable-rewrite-caching` header to `0`.
    

Review your upstream cache headers before April 6th when creating a new project that proxies to external origins without caching, ensuring they reflect your intended caching strategy.

Learn more about [Rewrites to External Origins](https://vercel.com/docs/routing/rewrites#rewrites-to-external-origins) and configure routing in the [CDN tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fcdn%2Frouting) of your project settings.