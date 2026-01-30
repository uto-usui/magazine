---
title: "Fast Data Transfer for rewrites between your team's projects is now free"
source: "https://vercel.com/changelog/fast-data-transfer-for-rewrites-between-a-teams-projects-is-now-free"
publishedDate: "2025-02-27"
category: "frontend"
feedName: "Vercel"
author: "Mark Knichel"
---

1 min read

Feb 27, 2025

External [rewrites](https://vercel.com/docs/edge-network/rewrites) between projects within the same team now use Fast Data Transfer only for the destination request. This change makes Fast Data Transfer for the original request free.

Commonly used as a [reverse proxy](https://vercel.com/guides/vercel-reverse-proxy-rewrites-external) or for [microfrontend architectures](https://vercel.com/blog/how-vercel-adopted-microfrontends), rewrites can be configured in `vercel.json`, middleware, or `next.config.ts` to route requests between the same or separate Vercel projects without changing the URL shown to the user.

Usage for external rewrites to the same team:

-   [Fast Data Transfer](https://vercel.com/docs/pricing/networking#fast-data-transfer) for the original and destination request have been optimized and consolidated into a single stream, reducing overall transfer.
    
-   Each external rewrite triggers a full request lifecycle, including routing and Web Application Firewall checks, ensuring security policies are enforced per project, and counts as a separate [Edge Request](https://vercel.com/docs/edge-network/overview).
    

Learn about [rewrites](https://vercel.com/docs/edge-network/rewrites) and monitor your Fast Data Transfer [usage](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fusage&title=Go+to+Fast+Data+Transfer+Usage) and [observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability%2Ffast-data-transfer&title=Go+to+Fast+Data+Transfer+Observability).