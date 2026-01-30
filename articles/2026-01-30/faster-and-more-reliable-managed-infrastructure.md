---
title: "Faster and more reliable Managed Infrastructure"
source: "https://vercel.com/changelog/faster-and-more-reliable-managed-infrastructure"
publishedDate: "2023-11-29"
category: "frontend"
feedName: "Vercel"
author: "Brooke Mosby"
---

1 min read

Nov 29, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5rwly7DW6LaZINmHFFXmrJ%2F5ec5debdfe653e713f720f8cf8115b09%2FInfra_Improvements_-_LIGHT__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F224gHeJS74Kg1rLFohZjOo%2Feb2140d5d3a7bf8cfbf2a8a598261a56%2FInfra_Improvements_-_DARK__1_.png&w=1920&q=75)

We've upgraded our [Managed Infrastructure](https://vercel.com/docs/infrastructure) resulting in up to **45% faster routing at p99** and reliability improvements for all plans.

When a request is made to a Vercel-managed site, traffic is routed to the nearest Edge Network region with our [Anycast routing](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure). Vercel processes the request, identifies the deployment to serve, and instantly retrieves related metadata about the requested deployment.

Now with optimized metadata retrieval and routing, this performance enhancement benefits all workloads. Responses to static resources are then fetched from storage, or dynamic content is generated through Vercel Functions, based on the routing details from the deployment metadata.

These infrastructure improvements benefit all existing and new deployments. [Deploy now](https://vercel.com/templates) or learn more about [Vercel's Managed Infrastructure](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure).