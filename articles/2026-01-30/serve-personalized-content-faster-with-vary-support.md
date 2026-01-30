---
title: "Serve personalized content faster with Vary support"
source: "https://vercel.com/changelog/serve-personalized-content-faster-with-vary-support"
publishedDate: "2025-05-02"
category: "frontend"
feedName: "Vercel"
author: "Luba Kravchenko"
---

1 min read

May 2, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1jU2qmIAkyH9cdgr7lQlv8%2F7efe90ed63620439057921237cd77902%2FVary_Header_-_Light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6l9o0vR1Sd1oh98EpqQSGa%2F32736c1186603712406ca4bc8c3ea4ff%2FVary_Header_-_Light-1.jpg&w=1920&q=75)

Vercel now fully supports the HTTP `Vary` header, making it easier to cache personalized content across all plans with no configuration required.

The `Vary` header tells caches which request headers to include when generating cache keys. This allows Vercel’s application delivery network to store and serve different versions of a page based on headers like `X-Vercel-IP-Country` or `Accept-Language`, so users get fast, localized content without recomputation.

```
Vary: X-Vercel-IP-CountryCache-Control: s-maxage=60
```

By returning the above headers your site caches and serves country-specific content.

A visitor from the United States receives the US-specific cached version, and visitors from other countries receive the version for their locale, with no recomputation required.

Learn more about caching personalized content in [Vercel's application network documentation](https://vercel.com/docs/edge-network/caching).