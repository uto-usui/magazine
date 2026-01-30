---
title: "Proxied responses now cacheable via CDN-Cache-Control headers"
source: "https://vercel.com/changelog/proxied-responses-now-cacheable-via-cdn-cache-control-headers"
publishedDate: "2025-05-13"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

1 min read

May 13, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4Y0IrJbE1B0mkNyNj77Js8%2F0f674ebe4066e12b743d28e74b8d5f55%2FCDN_Headers_-_Light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F143O7SFSVKQdYNznO4NyOk%2F5e85f8e83c6d16b59b50f97552b3b144%2FCDN_Headers_-_Dark.jpg&w=1920&q=75)

Vercel’s CDN, which can proxy requests to external backends, now caches proxied responses using the `CDN-Cache-Control` and `Vercel-CDN-Cache-Control` headers. This aligns caching behavior for external backends with how Vercel Functions are already cached.

This is available starting today, on all plans, at no additional cost.

Per the Targeted HTTP Cache Control spec ([RFC 9213](https://httpwg.org/specs/rfc9213.html)), these headers support standard directives like `max-age` and `stale-while-revalidate`, enabling fine-grained control over CDN caching without affecting browser caches.

You can return the headers directly from your backend, or define them in `vercel.json` under the `headers` key if your backend can't be modified.

No configuration changes or redeployments required. Return the header (or set it in `vercel.json`) to improve performance, reduce origin load, and ensure fresh content.

Learn more about [CDN-Cache-Control headers](https://vercel.com/docs/rewrites#caching-external-rewrites).