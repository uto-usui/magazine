---
title: "OPTIONS Allowlist"
source: "https://vercel.com/changelog/options-allowlist"
publishedDate: "2024-05-21"
category: "frontend"
feedName: "Vercel"
author: "Kit Foster"
---

1 min read

May 21, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F40I2GtukqTOfZwkdcKchVO%2F877f91818a34d6533ef796c313b82a26%2Flight.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fi3c12kaoJsybnghZyTuzc%2F882068fd09ed16c44de4c71f5ec2e24e%2Fdark.png&w=1920&q=75)

The OPTIONS Allowlist improves the security of deployments on Vercel by limiting CORS preflight `OPTIONS` requests to specified paths.

Before the OPTIONS Allowlist, all `OPTIONS` requests to deployments bypassed Deployment Protection in compliance with [CORS specifications](https://developer.mozilla.org/docs/Web/HTTP/CORS).

The new OPTIONS Allowlist feature is available on all plans.

Learn more about the [OPTIONS Allowlist](https://vercel.com/docs/security/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist).