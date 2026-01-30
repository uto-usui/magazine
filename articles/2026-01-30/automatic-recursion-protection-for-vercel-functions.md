---
title: "Automatic recursion protection for Vercel Functions"
source: "https://vercel.com/changelog/automatic-recursion-protection-for-vercel-serverless-functions"
publishedDate: "2023-05-11"
category: "frontend"
feedName: "Vercel"
author: "Javi Velasco"
---

1 min read

May 11, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3ELdOCiGssWSYFMgQPwjpC%2F1144f7b04f83f5cc7dbba5b34b9cff76%2FRecursion_Protection_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2GBb965clx7buqAE7zCVk8%2Fafa49e966c148855b60a3b4df20bfcfd%2FRecursion_Protection_-_Dark__1_.png&w=1920&q=75)

Vercel now has automatic recursion protection for Vercel Functions.

This provides safety against your code inadvertently triggering itself repeatedly, incurring unintentional usage. Recursion protection supports using the `http` module or `fetch` in the Node.js runtime for Serverless Functions, both for user-defined code and dependencies. Requests using the bare `Socket` constructor are not protected against recursion.

Recursion protection is available free on all plans. It does not require any code changes in your application, but does require a new deployment. Outbound requests now include the `x-vercel-id` header of the request that originated the new fetch.

We’re continuing to invest in platform improvements to help developers [understand and monitor usage](https://vercel.com/changelog/usage-notification-settings-is-now-generally-available) and avoid unintended usage on the Vercel platform.