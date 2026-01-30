---
title: "New Domains Registrar API for domain search, pricing, purchase, and management"
source: "https://vercel.com/changelog/new-domains-registrar-api-for-domain-search-pricing-purchase-and-management"
publishedDate: "2025-10-08"
category: "frontend"
feedName: "Vercel"
author: "Elliot Dauber"
---

1 min read

Oct 8, 2025

You can now programmatically search, price, buy, renew, and transfer domains with Vercel’s new [Domains Registrar API](https://vercel.com/docs/domains/registrar-api), complementing the new in-product [Domains experience](https://vercel.com/changelog/vercel-domains-at-cost-pricing-and-the-fastest-on-the-web).

The API provides endpoints for:

-   **Catalog & pricing:** list supported TLDs; get TLD and per-domain pricing.
    
-   **Availability:** check single or bulk availability.
    
-   **Orders & purchases:** buy domains (including bulk) and fetch order status by ID.
    
-   **Transfers:** retrieve auth codes, transfer in, and track transfer status.
    
-   **Management:** renew, toggle auto-renewal, update nameservers, and fetch TLD-specific contact schemas.
    

The [Legacy Domains API](https://vercel.com/docs/domains/registrar-api#deprecations-and-migration) is now deprecated. If you use the Vercel CLI for domain purchases, pricing, or availability, upgrade to **v48.2.8**. Sunset date: **2025-11-09**.

Explore the [API docs](https://vercel.com/docs/domains/registrar-api).