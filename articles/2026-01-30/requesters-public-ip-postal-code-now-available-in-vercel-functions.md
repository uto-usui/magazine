---
title: "Requester's public IP postal code now available in Vercel Functions"
source: "https://vercel.com/changelog/requesters-public-ip-postal-code-now-available-in-vercel-functions"
publishedDate: "2025-01-09"
category: "frontend"
feedName: "Vercel"
author: "Shohei Maeda"
---

1 min read

Jan 9, 2025

The `x-vercel-ip-postal-code` header is now part of [Vercel’s geolocation capabilities](https://vercel.com/docs/edge-network/headers/request-headers), providing the postal code associated with the requester’s public IP address. This complements existing headers like `x-vercel-ip-country`, `x-vercel-ip-city`, and `x-vercel-ip-country-region`.

This information should be used as a general reference rather than a precise locator. Due to inherent limitations and variability in IP-based geolocation, the accuracy may vary. We recommend complementing it with other data sources, such as the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), for critical applications.

The `x-vercel-ip-postal-code` header is accessible in Vercel Functions, including [Edge Middleware](https://vercel.com/docs/functions/edge-middleware). Here's a TypeScript example:

```
export function GET(request: Request) {  const postalCode = request.headers.get('x-vercel-ip-postal-code');  return new Response(`Postal Code: ${postalCode}`);}
```

Postal codes are also available via the `@vercel/functions` package:

```
import { geolocation } from '@vercel/functions';export function GET(request: Request) {  const geo = geolocation(request);  return new Response(`Postal Code: ${geo.postalCode}`);}
```

For more information on headers and geolocation, see [Vercel’s request header documentation.](https://vercel.com/docs/edge-network/headers/request-headers)