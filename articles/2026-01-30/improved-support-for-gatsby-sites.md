---
title: "Improved support for Gatsby sites"
source: "https://vercel.com/changelog/improved-support-for-gatsby-sites"
publishedDate: "2023-01-23"
category: "frontend"
feedName: "Vercel"
author: "Ethan Arrowood"
---

1 min read

Jan 23, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6vXypwFtzwDquUuyf3FhgJ%2F1b7c6734326c6a4445b02d56ba84d405%2FGatsby_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FDnFDZpjtBcbO2EKSOnX7e%2F14c896c891001850cc2df5b00bbc2cde%2FGatsby_Dark.png&w=1920&q=75)

Gatsby sites on Vercel can now take advantage of powerful new features, including:

-   **Server-Side Rendering (SSR):** Render dynamic content, on-demand.
    
-   **Deferred Static Generation (DSG):** Generate static pages in the background on new requests, using the same infrastructure as [Incremental Static Regeneration](https://vercel.com/docs/build-output-api/v3#vercel-primitives/prerender-functions).
    
-   **Native API Routes:** Create functions inside the `api` directory to instantly scaffold new API Routes.
    

Gatsby `v4+` sites deployed to Vercel will automatically detect Gatsby usage and install the new `@vercel/gatsby-plugin-vercel-builder` plugin. Gatsby `v5` sites require [Node.js 18](https://vercel.com/changelog/node-js-18-lts-is-now-available), the current default version used for new Projects.

Get started using Gatsby with our [updated template](https://vercel.com/templates/gatsby/gatsbyjs-boilerplate).