---
title: "Vercel CDN no longer caches responses with Vary: Cookie"
source: "https://vercel.com/changelog/vary-cookie-responses-no-longer-cached"
publishedDate: "2026-09-30"
category: "frontend"
feedName: "Vercel"
author: "Shina Patel"
---

Vercel CDN no longer caches origin responses when `Vary` includes `Cookie`.

`Vary` tells a cache which request headers may change the response. Because cookies often contain visitor-specific values, varying by `Cookie` can create many cache entries that are rarely reused. The response is still served normally but isn't stored for future requests.

You can identify these responses by checking the `x-vercel-cache` header and [Runtime Logs](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs&title=Runtime+Logs). The header is set to `MISS`, and Logs show `vary_key_denied:cookie` as the cache reason.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6t7gpxEUwGf0wgEolQ8KFF%2Fdcf814e8cbdacead97acc1144bb81587%2Fvary-cookie-cache-card.png&w=1920&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6tQIlsttu79DkUNftPZak%2F8ddc86f227c9b491477e6b9a5b0e4bf5%2Fvary-cookie-cache-card-dark.png&w=1920&q=95)

If Logs show `vary_key_denied:cookie` for a route you expect to be cached, check the `Vary` header returned by your origin:

-   If the response is the same regardless of cookies, remove `Cookie` from `Vary`. Vercel CDN can then cache it if it meets the other caching requirements.
    
-   If the response depends on cookies, keep `Cookie` in `Vary` and use `Cache-Control: private` to prevent personalized responses from being stored in the shared CDN cache.
    

Caching behavior for other supported `Vary` headers is unchanged.

Learn more about [high-cardinality headers](https://vercel.com/docs/caching/cdn-cache#high-cardinality-headers) and the [`vary_key_denied` cache reason](https://vercel.com/docs/caching/cache-status#vary-key-denied).