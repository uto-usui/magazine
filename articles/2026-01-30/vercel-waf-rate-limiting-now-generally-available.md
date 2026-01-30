---
title: "Vercel WAF rate limiting now generally available"
source: "https://vercel.com/changelog/vercel-waf-rate-limiting-now-generally-available"
publishedDate: "2024-10-02"
category: "frontend"
feedName: "Vercel"
author: "Dany Volk"
---

1 min read

Oct 2, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7yK3Aq9MNDQEKdSu4ujcW%2Fc65f468c1c82d3fbc677cf12e940e982%2FRate_Limit_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5gNtBofYE2gdWJqEBzFDKF%2Fc31c390d2eea17ebbdec6d0230cecf40%2FRate_Limit_-_Dark.png&w=1920&q=75)

Vercel Web Application Firewall (WAF) rate limiting is now generally available, giving you precise control over request volumes to your applications.

With over 15 parameters, including target path, headers, method, and cookies, you can define the business logic for rate limiting. Then, apply a rate-limiting algorithm tied to IP, JA4 digest, headers, or user agent to control the frequency of matching traffic within your set limits.

When paired with [persistent actions](https://vercel.com/changelog/vercel-waf-now-supports-persistent-actions), rate limiting can help reduce resource abuse across Edge Requests, Middleware, Data Transfer, and Function execution.

Rate limiting with a fixed-window algorithm is available today for Pro customers, with an additional token-bucket algorithm available to Enterprise customers. [Pricing for rate limiting](https://vercel.com/docs/security/vercel-waf/rate-limiting#pricing) is regional starting at $.50 per 1 million allowed requests.

Add rate limiting [using a template](https://vercel.com/templates/vercel-firewall/rate-limit-api-requests-firewall-rule) or read the [rate limiting documentation](https://vercel.com/docs/security/vercel-waf/rate-limiting) to learn more.