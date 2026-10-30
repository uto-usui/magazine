---
title: "IP geolocation now covers more visitors at higher resolution"
source: "https://vercel.com/changelog/improved-ip-geolocation-data"
publishedDate: "2026-10-29"
category: "frontend"
feedName: "Vercel"
author: "Adrien Thebo"
---

[IP geolocation](https://vercel.com/docs/headers/request-headers) on Vercel now resolves visitor locations with finer network granularity, delivering city-level data for nearly all requests and postal-code data for 90% of traffic.

Geolocation data is now refreshed more often, so locations keep up as IP ranges are reassigned and routing changes. This is enabled for all projects with no code or configuration changes required. Existing geolocation headers along with the [`geolocation()` helper](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package#geolocation) in `@vercel/functions`, return the same fields for [Vercel Functions](https://vercel.com/docs/functions) and [Routing Middleware](https://vercel.com/docs/routing-middleware).

If you use geolocation for access controls, localization, or compliance, some visitors will now resolve to a different city or country, most often traffic from VPNs, hosting providers, and leased IP ranges:

-   **Physical termination location:**
    
    Subnets announced from a hosting provider in a different country than their regional internet registry (RIR) record now resolve to the data center where the traffic actually terminates.
    
-   **Testing geo-dependent routes:**
    
    Verify access rules against an IP's active network location rather than its static registry allocation.
    

Read the [request headers documentation](https://vercel.com/docs/headers/request-headers) for all available geolocation headers and fields.