---
title: "Incremental Static Regeneration (ISR) is now faster and more cost-efficient"
source: "https://vercel.com/changelog/incremental-static-regeneration-is-now-faster-and-cheaper"
publishedDate: "2025-01-30"
category: "frontend"
feedName: "Vercel"
author: "Luba Kravchenko"
---

1 min read

Jan 30, 2025

[Incremental Static Regeneration (ISR)](https://vercel.com/blog/isr-a-flexible-way-to-cache-dynamic-content) enables you to update content in the background without needing to redeploying your application. You can scale CMS or content-backed applications to millions of pages without having slow builds.

We've optimized our infrastructure to make ISR faster and more cost-efficient:

-   **Smaller writes**: ISR cache writes are now compressed by default, using fewer ISR write and read units (8KB chunks) per update and lowering Fast Origin Transfer (FOT) costs. Both reads and writes are now compressed.
    
-   **Region-aware caching**: The ISR cache is now available in all regions and automatically aligns with your functions' region. If your project spans multiple regions, the most cost-effective location is chosen automatically. This improves performance, especially for traffic outside North America, and regional pricing applies.
    

Redeploy your project to apply these updates or learn more about [ISR](https://vercel.com/docs/incremental-static-regeneration).

_Update: The rollout of this change completed on February 5th, 2025 around 8am PST._