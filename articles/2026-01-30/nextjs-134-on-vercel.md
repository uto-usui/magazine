---
title: "Next.js 13.4 on Vercel"
source: "https://vercel.com/changelog/next-js-13-4"
publishedDate: "2023-05-04"
category: "frontend"
feedName: "Vercel"
author: "Tim Neutkens"
---

2 min read

May 4, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F19XHHTHLXc9pfykHX5OHiL%2F21bc381d4942c84e120229413e708fbd%2Fimage__4_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F10huHkWNLP0SWVPz2EcH2i%2Ff2d7b1b79c2a89b1541f8b71fe885a5e%2Fimage__5_.png&w=1920&q=75)

The Next.js App Router, now stable in Next.js 13.4 is supported out-of-the-box on Vercel, with pre-configured, global, framework-defined infrastructure.

Build data-driven, personalized experiences for your visitors with Next.js, and automatically deploy to Vercel with optimized, global performance.

-   **Nested** [**Routes**](https://nextjs.org/docs/app/building-your-application/routing) **and** **Layouts:** Easily share UI between routes while preserving state and avoiding expensive re-renders. On Vercel, your layouts and pages can be configured to deploy as Edge Functions, delivering substantial SEO and performance improvements.
    
-   [**Streaming**](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)**:** The Next.js App router natively supports streaming responses. Display [instant loading states](https://next-on-the-edge.vercel.app/) and stream in units of UI as they are rendered. Streaming is possible for Node and Edge runtimes—with no code changes—with Vercel Functions.
    
-   [**React Server Components**](https://nextjs.org/docs/getting-started/react-essentials#server-components)**:** Server Components allow you to define data fetching at the component level, and easily express your caching and revalidation strategies. On Vercel, this is supported natively with Vercel Functions and Vercel Data Cache, a new caching architecture that can store both static content _and_ data fetches_._
    
-   **Support for** [**Data Fetching**](https://nextjs.org/docs/pages/building-your-application/data-fetching)**:** With granular caching, Next.js allows you to choose from static or dynamic data at the fetch level. On Vercel, the [Data Cache](https://vercel.com/changelog/introducing-vercel-data-cache) is automatically shared across deployments, speeding up build times and improving performance.
    
-   **Built-in** [**SEO**](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#seo-1) **Support:** With the Metadata API, easily customize your page for sharing on the web, compatible with streaming.
    

Additionally in Next.js 13.4 you will find:

-   [**Turbopack**](https://turbo.build/pack) **(Beta):** Your local dev server, faster and with improved stability.
    
-   [**Server Actions**](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) **(Alpha):** Mutate data on the server with zero client JavaScript.
    

[Check out our documentation](https://nextjs.org/docs/getting-started) to learn more.