---
title: "Regional execution for ultra-low latency rendering at the edge"
source: "https://vercel.com/blog/regional-execution-for-ultra-low-latency-rendering-at-the-edge"
publishedDate: "2022-10-20"
category: "frontend"
feedName: "Vercel"
author: "Edward Thomson"
---

4 min read

Oct 20, 2022

As we work to make a faster Web, increasing speed typically looks like moving more towards the edge—but sometimes requests are served fastest when those computing resources are close to a data source.

Today, we’re introducing [regional execution of Edge Functions](https://vercel.com/docs/concepts/edge-network/regions) to address this. Regional execution of Edge Functions allow you to specify the region your [Edge Function](https://vercel.com/features/edge-functions) executes in. This capability allows you to run your functions near your data to avoid high-latency waterfalls while taking advantage of the fast cold start times of Edge Functions and ensuring your users have the best experience possible.

## [Link to heading](#avoiding-waterfalls-with-regional-execution-of-edge-functions)**Avoiding waterfalls with regional execution of Edge Functions**

  
Vercel CTO Malte Ubl recently shared how to achieve ultra-low latency rendering at the edge at this year’s P99 Conference, a virtual event discussing Internet latency and performance. He outlined historic approaches to rendering sites and new challenges faced by bringing rendering to the edge.

One important consideration Malte discussed was to avoid “waterfalls” in your rendering. A waterfall occurs when a rendering function needs to make multiple queries from a database. When that database is far away from the function, the latency from each request adds up. This results in a slow page for the user. While it may sound counterintuitive, it might be faster to move the function closer to the database rather than closer to the user when using Edge Functions.

## [Link to heading](#moving-to-the-cloud)**Moving to the cloud**

When the Web was first born in 1994, building the Web included running it on a server—not just writing code. Developers were responsible for taking care of upgrades, restarting the server when it crashed, and swapping out bad hard drives. Thankfully, we’ve since moved more of our infrastructure to the cloud. Developers first did this with virtual machines, which meant that we didn’t have to manage our own hardware anymore. They then adopted serverless functions, which freed them up to write functions without worrying about the underlying operating system and web server.

However, moving to the cloud wasn’t just an improvement for developers. It was a huge step forward for users, too. By moving sites out of small offices and into data centers with unparalleled network connectivity, users got much faster websites. 

Now it’s time for the next step forward: moving computing out of the data center entirely and onto the edge.

![With edge computing, there’s a copy of the content close to everyone. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7wzOYfxnZiHwKhx7Nr1q7e%2F7ec6f42631cd5ce8c2cf1f3de61b5918%2F1080_X_500_-_Moving_to_the_cloud.png&w=1920&q=75)![With edge computing, there’s a copy of the content close to everyone. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5mXMRQih5gJ3swdhErrEqU%2Fc3b1f98371f7039d58eba3eae31c238a%2F1080_X_500_-_Moving_to_the_cloud.png&w=1920&q=75)

With edge computing, there’s a copy of the content close to everyone.

## [Link to heading](#the-edge)**The edge**

With edge computing, content is no longer centralized in one or two data centers. Instead, it’s replicated to Vercel regions across the globe so that there’s a copy of the content close to everyone. Users only need to connect to their nearby Vercel region to view the site. This provides much lower latency than traditional computing.

Edge computing provides more advantages than just geography. To run at the edge, instead of in a traditional data center, Edge Functions run in a compact environment called the [Edge Runtime](https://vercel.com/blog/introducing-the-edge-runtime). Edge Runtime specializes in executing JavaScript, TypeScript, or Wasm. This limited environment is generally less expensive and provides faster cold start times than serverless functions.

## [Link to heading](#data-fetching)**Data fetching**

Moving functions closer to the user results in lower latency when you’re rendering something self-contained, like [social card images](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images). But if your function needs to query a data source in a single data center, it can actually add additional latency.

Imagine that you’ve written an Edge Function that queries a database in the US East region iad1, and this function does 3 database lookups. Now imagine that a user in Australia hits this function. If this Edge Function is deployed globally, that user will connect to their closest data center in Sydney, and the function will send 3 queries to the database—over a full second of database queries. While it would be best for the database to be distributed globally, the reality is that many databases aren’t, and won’t be for the foreseeable future.

Imagine instead that you configured your Edge Function to run in US East since it’s closest to your database. Now a request from that user's browser has to travel from Sydney to US East. Once it does, the function running in that region can talk to the database in a few milliseconds instead of hundreds. Even though you’re running the same queries against the same database, you’re only making one request from Sydney to the US, instead of three.

![Regional Edge Functions provide users with the lowest latency.
](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6MkyoIFMv5yy7y8VupuzwI%2Ffb4628c822ba3def8f4e65b91f696de2%2F1080_X_500_-_Data_fetching.png&w=1920&q=75)![Regional Edge Functions provide users with the lowest latency.
](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1MLFGmRSZ6qzUPnneIDREY%2F4cf8bbe9baa858b3a6a2e07658559c4e%2F1080_X_500_-_Data_fetching.png&w=1920&q=75)

Regional Edge Functions provide users with the lowest latency.

Regional Edge Functions allow you to choose between running your Edge Function globally or nearest to your user—providing users with the lowest latency and the best experience on your site.

## [Link to heading](#setting-your-region)**Setting your region**

To configure the region that your Edge Function runs in, you can edit your function’s configuration:

```
export const config = {  runtime: 'experimental-edge',  regions: ['syd1']};
```

Configuring regions for your Edge Functions requires [Next.js v12.3.2](https://nextjs.org/docs) or newer. If you don’t configure this, your Edge Function will continue to default to running globally.

## [Link to heading](#getting-started-with-edge-functions)**Getting started with Edge Functions**

To learn more about regional Edge Functions with Vercel, [check out the documentation](https://vercel.com/docs/concepts/edge-network/regions) or [explore a few examples](https://vercel.com/docs/concepts/edge-network/regions).