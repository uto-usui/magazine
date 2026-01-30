---
title: "Instantly redirect traffic using custom Vercel Firewall rules"
source: "https://vercel.com/changelog/instantly-redirect-traffic-using-custom-vercel-firewall-rules"
publishedDate: "2024-07-24"
category: "frontend"
feedName: "Vercel"
author: "Andrew Barba"
---

1 min read

Jul 24, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F28puINH169kOZBhmjZNc0%2Fdbcbbad5b63c547e3cfc79a57e24c53d%2FRedirect_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F26d9AMdPJhNAMcfwiLisZw%2F329a09c30bd2e944aa027c9c8e5fbfa4%2FRedirect_-_Dark.png&w=1920&q=75)

You can now redirect requests to a new page using [custom Firewall rules](https://vercel.com/docs/security/vercel-waf/custom-rules), adding to the existing challenge and block actions.

Publishing custom rules does not require a new deployment and will instantly propagate across the global Vercel Edge Network. Therefore, using custom rule redirects in moderation could provide a fast alternative to [Edge Network redirects](https://vercel.com/docs/edge-network/redirects), particularly in emergency situations.

Firewall redirects execute before Edge Network configuration redirects (e.g. [vercel.json or next.config.js)](https://vercel.com/docs/edge-network/redirects#configuration-redirects) are evaluated.

Custom rules are available for free on all plans.