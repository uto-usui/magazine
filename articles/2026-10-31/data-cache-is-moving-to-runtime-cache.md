---
title: "Data Cache is moving to Runtime Cache"
source: "https://vercel.com/changelog/data-cache-is-moving-to-runtime-cache"
publishedDate: "2026-10-30"
category: "frontend"
feedName: "Vercel"
author: "Kelly Davis"
---

Data Cache is exiting beta and moving to [Runtime Cache](https://vercel.com/docs/caching/runtime-cache). Next.js `fetch` caching and `unstable_cache` will switch over on every version without code changes. On Pro, each project and environment gets its own Runtime Cache storage allocation, with 8x the space of Data Cache’s previous team-wide pool. Enterprise projects get 10x their previous Data Cache storage.

Once your team migrates, Data Cache reads and writes that were previously unbilled are charged at [Runtime Cache pricing](https://vercel.com/docs/pricing/regional-pricing). Rates start at $0.40 per million read units and $4.00 per million write units, and vary by region.

Hobby teams get 1 million read units and 200,000 write units free each month across all projects. On Pro, usage draws from your $20 infrastructure credit each month, and anything beyond it is billed at regional rates. For Enterprise pricing, contact your account team.

### [Copy link to heading](#migration)Migration

Teams created on or after October 30, 2026 use Runtime Cache by default.

If your team already uses Data Cache:

-   **Hobby:** We’ll migrate your team on November 29, 2026.
    
-   **Pro:** We’ll notify you of your migration date and when billing changes take effect.
    
-   **Enterprise:** Your account team will contact you with migration details.
    

Before you migrate, review your project's [Data Cache usage in Observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fruntime-cache&title=Runtime+Cache). To cut unnecessary reads and writes, follow the [optimization guide](https://vercel.com/kb/guide/optimize-runtime-cache-reads-on-vercel) or copy the [agent prompt](https://vercel.com/docs/caching/runtime-cache/data-cache#optimize-your-data-cache-usage) into your coding agent. In the Runtime Cache dashboard, you can also select Optimize with Vercel Agent.

Starting October 30, existing Hobby and Pro teams can opt in early from your [team's CDN settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fsettings%2Fcdn&title=CDN+Settings). Runtime Cache pricing applies as soon as you opt in.

You can also disable `fetch` and `unstable_cache` caching in CDN settings, which sends more requests to your data sources but doesn’t stop your migration.

Read about the architecture and recent improvements in the [blog post](https://vercel.com/blog/simplifying-runtime-caching-on-vercel).