---
title: "Edge Middleware and Edge Functions are now powered by Vercel Functions"
source: "https://vercel.com/changelog/edge-middleware-and-edge-functions-are-now-powered-by-vercel-functions"
publishedDate: "2025-06-25"
category: "frontend"
feedName: "Vercel"
author: "Gal Schlezinger"
---

1 min read

Jun 25, 2025

Functions using the Edge runtime now run on the unified Vercel Functions infrastructure.

This applies to both before and after the cache:

-   Edge Middleware is now Vercel Routing Middleware, a new infrastructure primitive that runs full Vercel Functions with [Fluid compute](https://vercel.com/fluid) before the cache
    
-   Edge Functions are now Vercel Functions using the Edge Runtime after the cache
    

Edge Middleware and Edge Functions are deprecated. They have been replaced by Vercel Routing Middleware and Vercel Functions, respectively. Both support the Edge runtime, Node.js, and more.

With these changes, all functions including those running the Edge runtime are:

-   **Fluid compute-ready**: Runs on [Fluid compute](https://vercel.com/docs/functions/fluid-compute) for better performance and cost efficiency
    
-   **Multi-runtime**: Supports Node.js and Edge runtimes
    
-   **Framework-driven**: Deployed automatically from supported framework code
    
-   **Consistent pricing**: Uses unified Vercel Functions pricing [based on Active CPU time](https://vercel.com/changelog/lower-pricing-with-active-cpu-pricing-for-fluid-compute) across all compute types
    

Vercel Routing Middleware is now generally available to all users.

Learn more about [Routing Middleware](https://vercel.com/docs/routing-middleware).