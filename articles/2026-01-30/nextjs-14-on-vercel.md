---
title: "Next.js 14 on Vercel"
source: "https://vercel.com/changelog/next-js-14"
publishedDate: "2023-10-26"
category: "frontend"
feedName: "Vercel"
author: "Tim Neutkens"
---

2 min read

Oct 26, 2023

Next.js 14 is fully supported on Vercel. Build data-driven, personalized experiences for your visitors with Next.js, and automatically deploy to Vercel with optimizations, including:

-   [**Streaming**](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)**:** The Next.js App Router natively supports streaming responses. Display instant loading states and stream in units of UI as they are rendered. Streaming is possible for Node.js and Edge runtimes—with no code changes—with Vercel Functions.
    
-   [**React Server Components**](https://nextjs.org/docs/app/building-your-application/rendering/server-components)**:** Server Components allow you to define data fetching at the component level, and easily express your caching and revalidation strategies. On Vercel, this is supported natively with Vercel Functions and the [Vercel Data Cache](https://vercel.com/docs/infrastructure/data-cache), a new caching architecture that can store both static content _and_ data fetches_._
    
-   [**React Server Actions:**](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations) Server Actions enable you to skip manually writing APIs and instead call JavaScript functions directly for data mutations. On Vercel, Server Actions use Vercel Functions.
    
-   [**Partial Prerendering (Experimental)**](https://vercel.com/templates/next.js/partial-prerendering-nextjs)**:** A new compiler optimization for dynamic content with a fast initial static response based on a decade of research and development into server-side rendering (SSR), static-site generation (SSG), and incremental static revalidation (ISR).
    

Additionally in Next.js 14 you will find:

-   **Turbopack:** 5,000 tests passing for App & Pages Router with 53.3% faster local server startup and 94.7% faster code updates with Fast Refresh.
    
-   **Forms and mutations:** The user experience is improved when the user has a slow network connection, or when submitting a form from a lower powered device.
    
-   **Metadata:** Blocking and non-blocking metadata are now decoupled. Only a small subset of metadata options are blocking, and we ensured non-blocking metadata will not prevent a partially prerendered page from serving the static shell.
    
-   **Logging:** More verbose logging around fetch caching can be enabled.
    
-   **`create-next-app:`** There is now an 80% smaller function size for a basic `create-next-app` application.
    
-   **Memory management:** Enhanced memory management is available when using `edge` runtime in development.
    

[Check out our documentation](https://nextjs.org/docs/getting-started/installation) to learn more.