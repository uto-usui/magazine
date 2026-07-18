---
title: "Optimized CDN caching and deploying of immutable static assets"
source: "https://vercel.com/changelog/optimized-cdn-caching-and-deploying-of-immutable-static-assets"
publishedDate: "2026-07-17"
category: "frontend"
feedName: "Vercel"
author: "Luba Kravchenko"
---

Vercel now reuses static files across deployments for frameworks that output content-addressed assets. It's zero-config: Vercel uses [Framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) to manage these immutable files alongside your code changes, handling the hard parts like hash collisions, file lifecycles, and efficient routing.

This brings several benefits:

-   **Lower costs and improved cache hit rates** — For frameworks using query-parameter-based [Skew Protection](https://vercel.com/docs/skew-protection) (such as Next.js), we saw 17% fewer CDN requests and 24% fewer bytes transferred for static content.
    
-   **Faster Deployments** — Deployments complete up to 30% faster on average.
    
-   **Faster Time to First Byte** — Immutable assets can remain cached across deployments, giving frequently deployed projects a 60%+ global TTFB reduction.
    

Vercel's supported frameworks will automatically take advantage of this optimization, even for projects without [Skew Protection](https://vercel.com/docs/skew-protection) enabled. Next.js 16.3 preview and later already have it enabled out of the box, and support for additional frameworks (including Nitro) is coming soon. No configuration is required: upgrading to a supported framework version is all you need to do.

If you're a framework author and want to implement this in your own toolchain, see the immutable static files section of the [Build Output API docs](https://vercel.com/docs/build-output-api/primitives#immutable-static-files).