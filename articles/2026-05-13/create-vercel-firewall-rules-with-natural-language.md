---
title: "Create Vercel Firewall rules with natural language"
source: "https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language"
publishedDate: "2026-05-12"
category: "frontend"
feedName: "Vercel"
author: "Yash Kothari"
---

1 min read

May 12, 2026

[Vercel Firewall](https://vercel.com/docs/vercel-firewall) now lets you create WAF custom rules using natural language. Describe the behavior you need and the dashboard will generate the rule.

Visit the [firewall custom rules page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Fconfigure%2Frule%2Fnew) to try creating a rate-limiting rule:

Create a WAF custom rule that rate limits all API requests to 50 per minute per IP. If a single IP exceeds the limit, block subsequent requests for 5 minutes.

[WAF custom rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules) let you control traffic to your site by logging, blocking, challenging, rate limiting, or redirecting requests based on conditions like IP address, path, country, user agent, and more.

For example, you can:

-   Log all requests to `/api/webhook` with a missing authorization header
    
-   Block all requests to `/wp-admin`
    
-   Challenge all traffic to `/checkout` that doesn't come from the US
    

[Generate your first rule](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Fconfigure%2Frule%2Fnew) or learn more in the [documentation](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules#create-a-rule-with-natural-language).