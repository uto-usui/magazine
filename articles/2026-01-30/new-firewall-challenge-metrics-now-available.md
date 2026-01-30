---
title: "New firewall challenge metrics now available"
source: "https://vercel.com/changelog/new-firewall-challenge-metrics-now-available"
publishedDate: "2025-06-03"
category: "frontend"
feedName: "Vercel"
author: "Adrien Thebo"
---

1 min read

Jun 3, 2025

You can now monitor and query [Vercel Firewall challenge](https://vercel.com/docs/vercel-firewall/firewall-concepts#challenge) outcomes using two new metrics:

-   **`challenge-solved`** – Visitor solved the challenge and was granted access (indicates a real user)
    
-   **`challenge-failed`** – Visitor submitted an invalid challenge solution (the request was blocked)
    

These metrics help evaluate rule effectiveness and reduce friction when users are unnecessarily challenged (high success rates).

Now available in the Firewall [dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall&title=Go%20to%20Firewall) and in the Observability Plus' [query builder](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability?builder=true&title=Go%20to%20Observability%20Plus%20Query%20Builder) with no additional setup required.

Learn more about [custom rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules) and [managed rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets).