---
title: "You can now invalidate the CDN cache by providing a source image"
source: "https://vercel.com/changelog/you-can-now-invalidate-the-cdn-cache-by-providing-a-source-image"
publishedDate: "2025-11-20"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Nov 20, 2025

![Purge CDN Cache by Source Image Screenshot](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3AaqQdN1FP86LLh5usTSCN%2Fbfb934fc47a31db0ef8ab049b1264134%2Fpurge-by-src-image-light.png&w=1920&q=75)![Purge CDN Cache by Source Image Screenshot](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7wPcQsq6utipkx3XehX26l%2Ffacd32f12c94d19f9721d0f26ee17259%2Fpurge-by-src-image-dark.png&w=1920&q=75)

Vercel [Image Optimization](https://vercel.com/docs/image-optimization) dynamically transforms source images to reduce file size while maintaining high quality on the visitor's browser.

You can now invalidate the CDN cache by providing a source image.

This feature marks all transformed images derived from that source image as stale. The next request serves stale content instantly while revalidation happens in the background, with no latency impact for users.

There are several ways to invalidate a source image:

In addition to invalidating by source image, you can also delete by source image if the origin is gone. Deleting the cache can increase latency while new content is generated, or cause downtime if your origin is unresponsive. We recommend you use with caution.

This is available on all plans using the [new image optimization price](https://vercel.com/changelog/faster-transformations-and-reduced-pricing-for-image-optimization).

Learn more about [cache invalidation](https://vercel.com/docs/edge-cache/purge#manually-purging-vercel-cache).