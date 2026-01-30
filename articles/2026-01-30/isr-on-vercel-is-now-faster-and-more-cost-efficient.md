---
title: "ISR on Vercel is now faster and more cost-efficient"
source: "https://vercel.com/blog/isr-on-vercel-is-now-faster-and-more-cost-efficient"
publishedDate: "2025-01-30"
category: "frontend"
feedName: "Vercel"
author: "Luba Kravchenko"
---

3 min read

Jan 30, 2025

Now, we’ve optimized how ISR cache updates work, leading to:

-   Faster revalidations with lower Time to First Byte (TTFB)
    
-   More efficient cache updates, reducing compute overhead
    
-   Greater cost efficiency, with up to 65% savings on ISR reads and writes
    

These improvements require no configuration changes—just redeploy to get the benefits.

## [Link to heading](#what’s-new:-faster,-more-efficient-isr)What’s new: Faster, more efficient ISR

Vercel has been continuously improving our support for ISR since it was first introduced. Our latest updates focus on speed and cost efficiency, with two major improvements:

### [Link to heading](#faster:-regionalized-caching)Faster: Regionalized caching

ISR cache entries are now stored in the same region as your functions, meaning:

-   Lower latency for cache retrieval
    
-   Faster revalidations when regenerating content
    
-   Better performance for global users, especially those outside North America
    

Regionalized ISR improves TTFB latency by up to 80% when an ISR cache read occurs within the same geographic area. These improvements are especially visible for those outside the United States.

### [Link to heading](#more-cost-efficient:-automatic-compression)More cost-efficient: Automatic compression

We’ve enabled **automatic compression** for ISR cache entries, reducing:

-   ISR write units
    
-   ISR read units
    
-   Fast Origin Transfer (FOT) costs
    

This can reduce ISR spend by up to 65%, making ISR more efficient and affordable for high-traffic applications.

## [Link to heading](#why-isr:-balancing-speed-and-freshness)Why ISR: Balancing speed and freshness

ISR was designed to adapt the benefits of Static Site Generation (SSG) to a dynamic web. SSG is great for site performance. By pre-building pages at deploy time, static sites load instantly and scale effortlessly. But for large sites—especially ecommerce stores, media platforms, and marketplaces—SSG creates bottlenecks:

-   Slow builds: Rebuilding thousands of pages every time content updates is inefficient.
    
-   Outdated content: Static sites serve stale pages until the next deploy.
    
-   Complex cache management: Manually configuring cache headers adds operational overhead.
    

ISR solves this by enabling on-demand content updates, preserving the speed of static pages without requiring full rebuilds.

### [Link to heading](#how-isr-works)How ISR works

Instead of regenerating every page at build time, ISR updates pages only when needed. Here’s what happens behind the scenes:

1.  A user requests a page. If it's cached, Vercel serves it instantly—no extra compute needed.
    
2.  If the cache is stale, Vercel triggers a background regeneration while continuing to serve the cached version.
    
3.  Once the new version is ready, it replaces the old cache, ensuring fresh content for future visitors.
    

On Vercel, this all happens through [framework-defined Infrastructure (FDI)](https://vercel.com/blog/framework-defined-infrastructure). If the [frontend framework you are using supports ISR](https://vercel.com/docs/frameworks/more-frameworks#frameworks-infrastructure-support-matrix), then there’s no additional infrastructure configuration required beyond the caching behavior specified in your framework code. You can get the performance benefits of serving cached static content while updating dynamic data in the background, all without needing to specify complex cache control headers.

This reduces build times, eliminates downtime, and automates content freshness. Whether it’s a breaking news article, an out-of-stock product, or a trending blog post, ISR ensures users always get the latest version without slowing down your site.

Common use cases for ISR include:

-   Ecommerce: Keep product listings, stock levels, and pricing up to date.
    
-   Media and publishing: Update articles in real-time without full redeploys.
    
-   Marketplaces and directories: Refresh listings dynamically while keeping page loads fast.
    
-   Dashboards and analytics: Serve near-real-time data efficiently.
    

## [Link to heading](#what’s-next)What’s next

We’re continuing to make ISR easier to use, more performant, and cost effective for our customers. We’re also working on addressing feedback from the community on how to improve ISR and improve the developer experience with hybrid rendering strategies, with advancements such as [Partial Prerendering (PPR)](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model).

The improvements described above are enabled automatically for all Vercel customers. To learn more about ISR, you can visit the [Vercel documentation](https://vercel.com/docs/incremental-static-regeneration), [Next.js documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration), or [learn how to use ISR in real-world use cases](https://vercel.com/blog/isr-a-flexible-way-to-cache-dynamic-content).

These latest ISR improvements are live now for all Vercel users, just redeploy to take advantage of these improvements.