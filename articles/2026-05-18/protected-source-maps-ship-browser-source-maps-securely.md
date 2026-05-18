---
title: "Protected Source Maps: Ship browser source maps securely"
source: "https://vercel.com/changelog/protected-source-maps-ship-browser-source-maps-securely"
publishedDate: "2026-05-14"
category: "frontend"
feedName: "Vercel"
author: "Andrew Gadzik"
---

1 min read

May 14, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5dgDFf5P6bC6SgevhDJ3gD%2F45b5c4acee03740758fa88b8e4785bd1%2FProtected_Source_Maps_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5Pr2jWEUCpWeFTdo505Emr%2F43ba08030e9015dd719c0e5de79d19d0%2FProtected_Source_Maps_-_Dark.png&w=1920&q=75)

You can now restrict access to production source maps with [Protected Source Maps](https://vercel.com/docs/deployment-protection/protected-source-maps), which puts browser `.map` files behind [Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication). Your team can fetch them; everyone else gets a 404.

Source maps are how you debug minified production code. They give you readable stack traces and your original source code, with the real filenames and line numbers intact.

New projects have Protected Source Maps enabled by default. Existing projects can opt in from Settings → Deployment Protection, with no redeploy needed.

Learn more in the [documentation](https://vercel.com/docs/deployment-protection/protected-source-maps).