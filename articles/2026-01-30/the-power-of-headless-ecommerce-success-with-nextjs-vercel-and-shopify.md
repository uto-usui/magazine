---
title: "The power of headless: Ecommerce success with Next.js, Vercel, and Shopify"
source: "https://vercel.com/blog/commerceui-headless-shopify-nextjs"
publishedDate: "2023-11-28"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

4 min read

Nov 28, 2023

How Commerce-UI helps designer ecommerce brands deliver a world-class experience to their online users.

Translating designer brand experiences to the digital world requires putting complete control in the hands of the developer. A lack of ability to fine-tune performance optimizations and application decisions often limits UI possibilities.

As brands scale, they quickly encounter the constraints of traditional templated ecommerce solutions. Despite the robust features offered by platforms like Shopify, they can find themselves hitting a "platform ceiling" where customization and performance tuning are limited.

[Commerce-UI](https://commerce-ui.com/), the boutique agency behind brands like [Magda Butrym](https://www.magdabutrym.com/) and [Lift Foils](https://liftfoils.com/), gives their clients the best of both worlds through a solution that has since become industry-standard: headless.

> One way of doing things means simplicity—it’s foolproof, and things are well integrated with each other. It’s a huge part of Shopify's success. But let’s not forget the fact that closed architecture also means less flexibility. It's natural that if you limit options, you accidentally lose some good options in the process. Headless, on the other hand, is “open architecture”. Endless options.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2diRm6QTVhnqLBd9KewMoM/96113bd5409465b619ffba38b194b5b1/Group_1.png)
> 
> **Commerce-UI**

This approach, which separates the frontend presentation layer from the backend commerce functionality, gives Commerce-UI the freedom to innovate without constraints. By pairing Shopify's powerful commerce engine with the flexibility of Next.js for the frontend and deploying on the Vercel platform, they've unlocked a new level of control and performance.

## [Link to heading](#designing-elegance-into-every-brand)Designing elegance into every brand

Design plays a crucial role in Commerce-UI's workflow, and the company often collaborates with top-notch designers handpicked for each project. The engineering and design teams work closely throughout the entire project lifecycle, from the proof-of-concept through to development, refinement, and release. They embrace elements of the brand's in-person experience—like bringing the showroom style of Magda Butrym to the page.

![Part of the Magda Butrym showroom.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3TULuFRxIsh0iDhh3hkJlB%2F685a7c028b5d907e97deed681b33f47e%2FF15QIUDaAAA-eBb.jpeg&w=1920&q=75)

Part of the Magda Butrym showroom.

The headless approach enabled Magda Butrym to create a unique online shopping experience that truly represents their brand, including:

-   **Custom URL structures:** With many platforms, your backend inventory system dictates your public storefront branding. With Next.js on Vercel, you can make any URLs work, including customized, localized routes.
    
-   **Internationalization:** One of Commerce-UI’s biggest success stories is the global brand [Lift Foils](https://liftfoils.com/), which needed a solution for expanding into new regions quickly after it went viral and **doubled site traffic overnight**. Using [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware), Commerce-UI was able to help Lift Foils create dedicated pages for each region, which were then localized and personalized. This allowed Lift Foils to provide a fast and seamless experience for their customers everywhere, even during traffic spikes of 200%.
    
-   **A tailored CMS experience:** Via a headless CMS, Commerce-UI can curate specific CMS editorial capabilities specific to client needs—which wouldn't be possible without the open platform headless provides.
    

> Headless allowed us to build all the things that weren't possible in Liquid four years ago, without much effort. But more importantly, it makes us calm that it will handle new things in the future. With a native approach, you never know when you hit the platform ceiling.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2diRm6QTVhnqLBd9KewMoM/96113bd5409465b619ffba38b194b5b1/Group_1.png)
> 
> **Commerce-UI**

## [Link to heading](#leaning-into-headless-flexibility-for-performance-optimizations)Leaning into headless flexibility for performance optimizations

Fundamentally, it's the freedom that developers get over optimization decisions that makes the headless approach a no-brainer. When given full control over caching and rendering decisions, developers can build incredible design experiences that load quickly and maintain snappy transitions.

With its out-of-the-box support for server-side rendering, static website generation, and API routes, Next.js enables Commerce-UI to build highly dynamic, performance-optimized websites that still deliver a static-like user experience.

Next.js allows for:

-   [Advanced performance optimization](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating), as opposed to Shopify's, which does not have direct control over the server environment and cache layer.
    
-   Ease in spinning up an API route or [route handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), which makes building **custom integrations** easy, instead of having to create a new Shopify App.
    
-   Optimizing the [loading of third-party widgets](https://nextjs.org/docs/app/api-reference/components/script). This is a common oversight in platforms like Shopify, where the limited collection of ready-made UI widgets often isn't suitable for design-centric projects.
    

## [Link to heading](#iteration-velocity-at-scale)Iteration velocity at scale

The powerful combination of Next.js, Vercel, and Shopify means that Commerce-UI clients can innovate at a moment's notice. With features like [Vercel’s Draft Mode](https://vercel.com/docs/workflow-collaboration/draft-mode) and [Incremental Static Regeneration](https://vercel.com/docs/concepts/incremental-static-regeneration/overview) (ISR), Commerce-UI’s team and their users can easily create or update content without having to redeploy their site.

Automatic [Preview Deployments](https://vercel.com/docs/deployments/preview-deployments) offer a single source of truth by generating a live preview site that stays up-to-date with every little change. Each Git branch receives a true-to-production URL that anyone on the team can visit, allowing Commerce-UI and external designers to iterate faster by reviewing changes in realtime—and keep clients in the loop.

[Figma-like comments](https://vercel.com/docs/workflow-collaboration/comments) directly on those preview deploys allow team members to point to exactly what needs to happen—without trading endless screenshots. GitHub and Slack integrations with comments ensure feedback is easily accessible and actionable.

## [Link to heading](#seamless-beauty-and-performance)Seamless beauty and performance

In the realm of ecommerce, delivering dynamic, personalized experiences to consumers is paramount. To do this, companies like Commerce-UI must handle vast amounts of dynamic data while ensuring static-like speeds for their users. Vercel's automatic infrastructure offers a robust solution to this challenge.

Vercel's [Framework-defined infrastructure (FdI)](https://vercel.com/blog/framework-defined-infrastructure) automatically delivers Commerce-UI's apps to the world with each Next.js build. This allows the team to focus on creating personalized ecommerce experiences without worrying about the underlying infrastructure.

Vercel's [Edge Network](https://vercel.com/docs/edge-network/caching) caches content at the edge, serving data to users as quickly as possible. Static file caching is automatic for all deployments, requiring no manual configuration. However, Commerce-UI can _also_ [cache dynamic content](https://vercel.com/docs/incremental-static-regeneration), including server-side rendered content, allowing them to serve websites with thousands of product subpages with no noticeable performance issues.

Vercel has also introduced the [Vercel Data Cache](https://vercel.com/changelog/introducing-vercel-data-cache), a globally distributed, ephemeral cache accessible from both serverless and edge runtimes. This allows for caching data granularly in the region in which your function executes, with different treatments depending on the type of response.

The result of these caching mechanisms is that Commerce-UI can handle dynamic data—such as personalized user recommendations, real-time inventory updates, and more—at static-like speeds.

**This ensures a smooth, fast, and personalized shopping experience for each user, no matter where they are in the world or how much traffic the site is experiencing.**

Vercel provides [enhanced reporting and insights](https://vercel.com/docs/observability/monitoring), which helps Commerce-UI optimize cost, monitor real behavior of real users, and perfect their apps accordingly. The platform's scalability eliminates concerns about traffic surges or [stability during pivotal moments](https://vercel.com/customers/washington-post-next.js-vercel-engineering-at-the-speed-of-breaking-news).

With Vercel, there's no need for a separate dev-ops team, as these tasks seamlessly integrate into the developers' day-to-day work. Commerce-UI's projects are accessible worldwide without any bottlenecks.

[

**Want to know if Vercel could help you build a better web app?**

Our team of experts can analyze your team's use case and determine the best solution for you.

Talk with Us



](https://vercel.com/contact/sales)