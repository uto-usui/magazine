---
title: "Improved resiliency for Vercel Functions with inter-region failover support"
source: "https://vercel.com/changelog/improved-resiliency-for-vercel-functions-with-failover-support"
publishedDate: "2024-01-26"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

1 min read

Jan 26, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7KJVL3Zr1C7oIbvhtTrqes%2F8712df367f1908ffe13ba9b9550d6adc%2FCron_-_Light__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fnujhr0ihxvIErtiE02V0u%2F3569767656e63f8341d73d93e02f823d%2FCron_-_Dark__1_.png&w=1920&q=75)

Vercel Functions can now [automatically failover to the next healthy region](https://vercel.com/docs/functions/configuring-functions/region#automatic-failover).

Vercel's Edge Network is resilient to regional outages by automatically rerouting traffic to static assets. Vercel Functions also have multiple availability zone redundancy by default. We are now enhancing this further with support for multi-region redundancy for Functions.

In the instance of a regional outage, traffic directed towards your Vercel Function using the Node.js runtime will be automatically re-routed to the next healthy region, ensuring continuous service delivery and uptime without manual intervention.

Failover regions are also supported through [Vercel Secure Compute](https://vercel.com/docs/security/secure-compute), which allows you to create private connections between your databases and other private infrastructure.

You can configure which regions to failover to in your `vercel.json` file. For example, you might want to fallback to many different regions, or specific regions in a country.

vercel.json

```
{  "functionFailoverRegions": ["iad1", "cle1"]}
```

Defining your fallback regions in your configuration file.

Enterprise teams can enable this feature in their project settings. If you are not on Enterprise, [get in touch](https://vercel.com/contact/sales) to upgrade and enable function failover.