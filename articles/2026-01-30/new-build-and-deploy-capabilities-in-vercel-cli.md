---
title: "New build and deploy capabilities in Vercel CLI"
source: "https://vercel.com/changelog/new-build-and-deploy-capabilities-in-vercel-cli"
publishedDate: "2022-07-21"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

1 min read

Jul 21, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1z6pz2i5XOb1OpoVoCIiCc%2Fd888dadde5efbd46d4e099954d4733aa%2FBuild_Output_API_OG_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5tpzQB31WJ1b8Tme00AmvE%2F033b0433596a81b9d39343ad88a2f748%2FBuild_Output_API_OG_Dark.png&w=1920&q=75)

Vercel’s [Build Output API](https://vercel.com/docs/build-output-api/v3) is now generally available. This API allows any framework, including your own custom-built solution, to take advantage of Vercel’s infrastructure building blocks including Edge Middleware, Edge Functions, Incremental Static Regeneration, Image Optimization, and more.

This specification also allows us to introduce two new commands to Vercel CLI:

-   `vercel build`: Build a project locally or in your own CI environment
    
-   `vercel deploy --prebuilt`: Deploy a build output directly to Vercel without sending source code through Vercel's build system
    

Read more about the [Build Output API announcement](https://vercel.com/blog/build-output-api) on the blog. For framework authors, explore the [Build Output API examples](https://github.com/vercel/examples/tree/main/build-output-api).