---
title: "How Consensys rebuilt MetaMask.io with Vercel and Next.js"
source: "https://vercel.com/blog/how-consensys-rebuilt-metamask-io-with-vercel-and-next-js"
publishedDate: "2025-05-14"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

2 min read

May 14, 2025

Faster workflows, dynamic content, and fewer bottlenecks: Learn more about MetaMask's move to Vercel

Since 2014, Consensys has shaped the web3 movement with tools like and [Linea](https://linea.build/), [Infura](https://www.infura.io/), and [MetaMask](https://metamask.io/)—the most widely used [self-custodial wallet](https://metamask.io/) on the web, with millions of users across the globe.

As the blockchain ecosystem quickly matured, the need for a site that could move as fast as the teams building it became clear. To meet that demand, Consensys migrated MetaMask.io to Next.js and Vercel, creating an architecture built for scale, speed, and continuous iteration.

## [Link to heading](#moving-towards-migration)**Moving towards migration**

Before migrating, MetaMask.io was built with Static Site Generation (SSG) and hosted on GitHub Pages. While this approach served its purpose early on, as the product grew, it began to face limitations. Deployments slowed, dynamic content like API events were difficult to support, and the CMS struggled to keep up with the pace of internal development. Even small updates often needed manual workarounds.

Consensys had already proven Vercel’s value with other MetaMask initiatives like [MetaMask Learn](https://learn.metamask.io/). Expanding the use of [Next.js with Server-Side Rendering](https://vercel.com/docs/frameworks/nextjs) (SSR) and standardizing on Vercel was a clear next step.

## [Link to heading](#rebuilding-metamask)**Rebuilding MetaMask**

The migration was focused on improving operational reliability, ensuring the site could scale safely through product launches and rapid growth.

Consensys migrated MetaMask.io to a modern stack built for scale, speed, and iteration:

-   [Next.js](https://vercel.com/frameworks/nextjs) powered the frontend with dynamic rendering, giving the team full control over performance and content delivery
    
-   [Contentful](https://vercel.com/integrations/contentful) provided a modern CMS that made managing and updating content faster for non-developers without sacrificing flexibility
    
-   [Vercel](https://vercel.com/enterprise) handled CI/CD, hosting, global delivery, and observability allowing the team to deploy, scale, and monitor the site globally with minimal overhead
    

With the migration, the team raised the bar for performance, reliability, and SEO. They conducted a canary rollout, beginning with 1% of traffic test to verify system stability, they scaled to 100% in four hours, without needing a single rollback.

## [Link to heading](#the-new-architecture-in-practice)**The new architecture in practice**

Today, MetaMask.io runs on Vercel’s global [edge network](https://vercel.com/products/rendering) to deliver static assets quickly, while [Vercel Functions](https://vercel.com/docs/functions) handle dynamic endpoints. With features like [Incremental Static Regeneration](https://vercel.com/docs/incremental-static-regeneration) (ISR) and smart caching, the team can provide richer, dynamic content and live data, like token prices, to end user which was not possible in the earlier SSG site.

Additionally, cross-functional teams, from engineering to design to content, can collaborate in real time. Preview URLs with inline commenting and concurrent builds allow for fast iteration and reduced friction in QA.

> We’ve seen real improvements—not just in Core Web Vitals, but in how fast teams can ship. The dev experience is smoother, our infra is more resilient, and site performance has improved.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/19G9ctdjgRDd6kRj2s4XZA/71f21cdc5de376763f4ef12220271a77/image.png)
> 
> **Nazan Kurt,** Product and Engineering Manager for Web at Consensys

## [Link to heading](#results-that-matter)**Results that matter**

The performance lift was immediate. Uptime improved, deployments accelerated, and the team unlocked better SEO outcomes. Speed Insights confirmed the gains, and the internal response has been clear: teams across product, marketing, and design now move faster and contribute more effectively.

Going forward, Consensys is confident in a setup that scales with their vision. With Vercel, their teams are free to focus on what’s next, not infrastructure.

[

**Vercel works hard to serve the best-performing sites on the web.**

Our experts can help you learn how your site can rank among them.

Contact Us



](https://vercel.com/contact/sales)