---
title: "Vercel WAF now supports persistent actions"
source: "https://vercel.com/changelog/vercel-waf-now-supports-persistent-actions"
publishedDate: "2024-10-02"
category: "frontend"
feedName: "Vercel"
author: "Andrew Barba"
---

1 min read

Oct 2, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6HgNMgne0dNryd7HHojkEr%2Fe98c03b72dd121a8dedf8944254857ac%2FPersistent_Actions_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F28iG1ueGBg0GZFjnmfYS5w%2F4580eaa4d77461318a3d16e7b7b6cd3f%2FPersistent_Actions_-_Dark.png&w=1920&q=75)

Vercel [Web Application Firewall (WAF)](https://vercel.com/docs/security/vercel-waf) now supports persistent actions to block repeat offenders who trigger firewall rules.

These persistent actions enforce specific responses—such as blocking—against clients for a defined period, ranging from 1-60 minutes. While active, these actions prevent unnecessary processing by blocking requests earlier in their lifecycle, reducing edge request load.

You can apply persistence to existing rules for actions like deny, challenge, and rate-limiting, adding an extra layer of control to your firewall logic.

Learn more about [persistent actions](https://vercel.com/docs/security/vercel-waf/custom-rules#persistent-actions).