---
title: "Fluid compute now supports ISR background and on-demand revalidation"
source: "https://vercel.com/changelog/fluid-compute-now-supports-isr-background-and-on-demand-revalidation"
publishedDate: "2025-05-30"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

May 30, 2025

[Fluid compute](https://vercel.com/docs/functions/fluid-compute) now supports both background and on-demand [Incremental Static Regeneration (ISR)](https://vercel.com/docs/incremental-static-regeneration) across all Vercel projects.

This means ISR functions now benefit from Fluid's [performance and concurrency efficiency](https://vercel.com/docs/functions/fluid-compute#optimized-concurrency) with no config changes needed. If you’ve redeployed recently, you’re already using it.

Fluid compute reuses existing resources before creating new ones, reducing costs by up to 85% for high-concurrency workloads. It delivers server-like efficiency with serverless flexibility with:

-   Optimized concurrency
    
-   Scale from zero to infinity
    
-   Minimal cold starts
    
-   Usage-based pricing
    
-   Full Node.js and Python support
    
-   No infrastructure management
    
-   Background tasks with `waitUntil`
    

[Enable Fluid](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions%23fluid-compute&title=Go+to+Function+Settings) for your existing projects, and learn more in our [blog](https://vercel.com/blog/introducing-fluid-compute) and [documentation](https://vercel.com/docs/functions/fluid-compute).