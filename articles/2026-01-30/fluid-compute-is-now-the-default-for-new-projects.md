---
title: "Fluid compute is now the default for new projects"
source: "https://vercel.com/changelog/fluid-compute-is-now-the-default-for-new-projects"
publishedDate: "2025-04-23"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Apr 23, 2025

New Vercel projects now run on [Fluid compute](https://vercel.com/blog/introducing-fluid-compute) by default.

This update follows [Fluid’s general availability](https://vercel.com/changelog/vercel-functions-can-now-run-on-fluid-compute), its adoption across large-scale production apps, and all [v0.dev](https://v0.dev/) deployments [shipping with Fluid enabled](https://x.com/v0/status/1910732097792467373) by default.

Fluid compute reuses existing instances before spawning new ones, cutting costs by up to 85% for high-concurrency workloads. It combines the efficiency of servers with the flexibility of serverless:

-   Concurrent requests per function
    
-   Scale from zero to infinity
    
-   Minimal cold starts
    
-   Usage-based, pay as you go
    
-   Full Node.js and Python support
    
-   No infrastructure to manage
    
-   Background tasks with `waitUntil`
    

[Enable Fluid](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions%23fluid-compute&title=Go+to+Function+Settings) for your existing projects, and learn more in our [blog](https://vercel.com/blog/introducing-fluid-compute) and [documentation](https://vercel.com/docs/functions/fluid-compute).