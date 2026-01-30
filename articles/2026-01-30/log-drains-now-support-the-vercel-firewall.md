---
title: "Log Drains now support the Vercel Firewall"
source: "https://vercel.com/changelog/log-drains-now-support-the-vercel-firewall"
publishedDate: "2024-07-15"
category: "frontend"
feedName: "Vercel"
author: "Andrew Barba"
---

1 min read

Jul 15, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4RmY3hZnvEq3m8njQpzkHh%2Fd89f86f989d246145ac599c52b00c9c2%2FFirewall_Log_Drains_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5o5Xfl0GdqzBNAaXd4XOFG%2F627012441bccc004183de527b18a5c65%2FFirewall_Log_Drains_-_Dark.jpg&w=1920&q=75)

You can now drain [Vercel Firewall](https://vercel.com/docs/security/vercel-firewall) actions to external providers through Log Drains.

Requests denied by the Vercel Firewall will be drained with the `firewall` source. This includes the following events:

-   Requests blocked by a Custom Rule
    
-   Requests blocked by Challenge Mode
    
-   Requests blocked Managed Rules (e.g. [OWASP CRS](https://vercel.com/docs/security/vercel-waf/managed-rulesets#configure-owasp-core-ruleset))
    
-   Requests blocked by an IP Rule
    

If a rule is set to `log` or to `bypass`, requests will not be sent to Log Drains. Firewall actions are also surfaced inside of [Monitoring](https://vercel.com/docs/observability/monitoring).

Learn more about the [Log Drains](https://vercel.com/docs/observability/log-drains).