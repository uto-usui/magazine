---
title: "Introducing the Vercel Data Cache: Optimized caching for React Server Components"
source: "https://vercel.com/changelog/introducing-vercel-data-cache"
publishedDate: "2023-05-04"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

1 min read

May 4, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3GHxXaM6oG5aXs5YWogFVN%2Fa5c44dd6f0bf222a902284b5e3ec4292%2Fdata_cache_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FUHAUSmw7RtiPpCoxBrNnD%2F2ea5971d2ec36b56c461a782a1312b87%2Fdata_cache_-_Dark.png&w=1920&q=75)

Vercel Data Cache is now available to give you framework-defined caching and propagation infrastructure to handle responses from [React Server Components](https://nextjs.org/docs/getting-started/react-essentials#server-components).

Data Cache is a globally distributed, ephemeral cache accessible from both serverless and edge runtimes, allowing you to cache data granularly in the region in which your function executes, with different treatments depending on the type of response:

-   Dynamic data is re-fetched with every execution
    
-   Static data is cached and revalidated either by time-based or on-demand revalidation
    

This feature is currently supported for the [Next.js App Router](https://nextjs.org/docs/getting-started/installation) and is available for users on [all plans](https://vercel.com/docs/infrastructure/data-cache/limits-and-pricing).

[Check out our documentation](https://vercel.com/docs/infrastructure/data-cache) and [usage limits](https://vercel.com/docs/infrastructure/data-cache/limits-and-pricing) to learn more.