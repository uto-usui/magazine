---
title: "Invalidate the CDN cache by tag"
source: "https://vercel.com/changelog/invalidate-the-cdn-cache-by-tag"
publishedDate: "2025-10-03"
category: "frontend"
feedName: "Vercel"
author: "Luba Kravchenko"
---

1 min read

Oct 3, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fyovas22LP80ijzybBwsvi%2F5b82e3635185ec9fa9ce1e5f4d97ac2d%2Fpurge-by-tag-light-mode.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4gEKOqktDrQK3egSJAx3Js%2Fbda7755bd23fdc158f675052cf5bb507%2Fpurge-by-tag-dark-mode.png&w=1920&q=75)

You can now invalidate CDN cache contents by tag.

This marks all cached content associated with the tag as stale. The next request serves stale content instantly while revalidation happens in the background, with no latency impact for users.

There are several ways to invalidate content:

In addition to invalidating by tag if the origin content changes, you can also delete by tag if the origin content is gone. However, deleting the cache can increase latency while new content is generated or cause downtime if your origin is unresponsive, so use with caution.

**Available on all plans.** Learn more about [cache invalidation](https://vercel.com/docs/edge-cache/purge#manually-purging-vercel-cache).