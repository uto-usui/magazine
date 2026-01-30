---
title: "Block, rate limit, and challenge traffic with the Vercel Firewall"
source: "https://vercel.com/changelog/block-rate-limit-and-challenge-traffic-with-the-vercel-firewall"
publishedDate: "2024-05-23"
category: "frontend"
feedName: "Vercel"
author: "Andrew Barba"
---

1 min read

May 23, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3mtpYq8mswgOP3Bc9r3Q7R%2F05743d84d1c6736d9a8813bb439af5e0%2FFirewall_Changelog_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6oRo1P8uhQ4du2epCsyFyx%2F9af504cec479553e7e9472cbfb08d01a%2FFirewall_Changelog_-_Dark.png&w=1920&q=75)

The [Vercel Firewall](https://vercel.com/docs/security/vercel-firewall) now allows you to create custom rules to log, block, challenge, or rate limit (beta) traffic. The Firewall is available on all plans for free.

You can define custom rules to handle incoming traffic:

-   Rules can be based on 15+ fields including request path, user agent, IP address, JA4 fingerprint, geolocation, HTTP headers, and even target path.
    
-   Firewall configuration changes propagate within 300ms globally. If you make a mistake, you can instantly rollback to previous rules.
    

You can now see requests automatically protected by the Firewall, as well as managed custom rules for the WAF. You can also access managed rulesets, included our first ruleset available for Enterprise to mitigate the OWASP core risks.

[Learn more](https://vercel.com/docs/security/vercel-waf) about the WAF and available configuration options. [Contact us](https://vercel.com/contact/sales) if you want to try our private beta for rate limiting.