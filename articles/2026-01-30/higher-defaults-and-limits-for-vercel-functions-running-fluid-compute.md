---
title: "Higher defaults and limits for Vercel Functions running Fluid compute"
source: "https://vercel.com/changelog/higher-defaults-and-limits-for-vercel-functions-running-fluid-compute"
publishedDate: "2025-06-25"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Jun 25, 2025

The default limits for Vercel Functions using [Fluid compute](https://vercel.com/fluid) have increased, with longer execution times, more memory, and more CPU.

The default execution time, for all projects on all plans, is now 300 seconds (5 minutes):

Plan

Default

Maximum

Hobby

300s (previously 60s)

300s (previously 60s)

Pro

300s (previously 90s)

800s

Enterprise

300s (previously 90s)

800s

Memory and CPU instance sizes have also been updated:

-   **Standard** (default) is now 1 vCPU / 2 GB (previously 1 vCPU / 1.7 GB)
    
-   **Performance** is now 2 vCPU / 4 GB (previously 1.7 vCPU / 3 GB)
    

The Basic CPU instance has been removed. Hobby projects now use Standard CPU.

These increased instances are enabled by [Active CPU pricing](https://vercel.com/changelog/lower-pricing-with-active-cpu-pricing-for-fluid-compute), which charges based on actual compute time. Periods of memory-only usage are billed at a significantly lower rate, making longer executions more cost-efficient.

You can view logs to determine if your functions are hitting execution limits and adjust the max duration or upgrade your plan as needed.

Learn more about [Vercel Function limits](https://vercel.com/docs/functions/limitations).