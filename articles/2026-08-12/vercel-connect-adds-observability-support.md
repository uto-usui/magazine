---
title: "Vercel Connect adds observability support"
source: "https://vercel.com/changelog/vercel-connect-adds-observability-support"
publishedDate: "2026-08-11"
category: "frontend"
feedName: "Vercel"
author: "Yasoob Rasheed"
---

Vercel Connect now gives teams line-level visibility into the token lifecycle. See who created a token, what app or project used it, when, and whether it is still active.

Every connector's detail page includes a new **Observability** tab:

-   **Runtime events**: Every token request, authorization, refresh, revocation, and trigger delivery, filterable by type.
    
-   **Correlation IDs**: Stable `tokenId` and `authorizationId` values link each token's events, so you can match Connect events to your own systems.
    
-   **Activity**: The **Activity filter** button opens the Activity page pre-filtered to the connector's configuration events, so you can see when and how it changed.
    

Connect observability is available on all plans. Events are retained for 12 hours on Hobby, 3 days on Pro, and 30 days on Enterprise. To retain events longer, forward them to a custom webhook endpoint by adding a Drain on Pro and Enterprise plans. Enterprise teams also get role-based access control and audit logs.

Get started in the [Observability tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect%2F%5Bconnector%5D%2Fobservability&title=Connector%20observability) on a connector, or read the [documentation](https://vercel.com/docs/connect).

**Vercel Connect is in beta and available on all plans.** Features and behavior, including available connectors and trigger forwarding, may change before general availability. Usage is subject to the [Beta Agreement](https://vercel.com/docs/release-phases/public-beta-agreement) and [Vercel Connect terms](https://vercel.com/docs/connect/legal).