---
title: "Pro customers can now configure up to 3 regions for Vercel Functions"
source: "https://vercel.com/changelog/pro-customers-can-now-configure-up-to-3-regions-for-vercel-functions"
publishedDate: "2024-11-20"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Nov 20, 2024

[Pro customers](https://vercel.com/docs/accounts/plans#pro) can now set up to three regions for their Vercel Functions, enabling compute to run closer to distributed data sources for faster responses and improved performance. When multiple Vercel Function regions are configured, user requests that require compute will be routed to the closest specified region.

Previously, functions for Pro customers were restricted to a single region. Increasing to three regions enables:

-   Global low-latency
    
-   Maintaining high compute density leading to higher cache hit rates and lower cold starts
    
-   Compatibility with standard database replication like Postgres read replicas
    

This also adds an extra layer of redundancy, complementing the built-in [multi-Availability Zone](https://vercel.com/blog/effortless-high-availability-for-dynamic-frontends) redundancy of Vercel Functions.

To configure additional [regions](https://vercel.com/docs/projects/project-configuration#regions), add a `regions` property to your `vercel.json`.

```
{  "regions": ["sfo1", "lhr1", "sin1"]}
```

vercel.json file with three regions configured

Redeploy your project for the changes to take effect. Learn more about [configuring regions](https://vercel.com/docs/functions/configuring-functions/region#project-configuration).