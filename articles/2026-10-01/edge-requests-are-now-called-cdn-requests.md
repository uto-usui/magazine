---
title: "Edge Requests are now called CDN Requests"
source: "https://vercel.com/changelog/edge-requests-are-now-called-cdn-requests"
publishedDate: "2026-09-30"
category: "frontend"
feedName: "Vercel"
author: "Steren"
---

CDN Requests is now the name for the usage metric previously called Edge Requests. This is a naming change only: pricing, limits, and how usage is measured are all unchanged.

The new name appears on the usage dashboard, the Observability Events chart, usage notifications, and invoice line items. It reflects that these are requests served by Vercel's CDN. Metric IDs and product aliases are unchanged, so saved queries keep working. In the billing charges API, `ServiceName` now returns the new name. Integrations that match charges on `ServiceName` should switch to the new `SkuId` field, which stays stable across renames.

See the [CDN pricing and usage documentation](https://vercel.com/docs/manage-cdn-usage) for details.