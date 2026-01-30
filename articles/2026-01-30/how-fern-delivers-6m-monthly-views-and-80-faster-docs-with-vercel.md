---
title: "How Fern delivers 6M+ monthly views and 80% faster docs with Vercel"
source: "https://vercel.com/blog/how-fern-delivers-6m-monthly-views-and-80-faster-docs-with-vercel"
publishedDate: "2025-05-15"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

3 min read

May 15, 2025

Learn how this documentation provider uses Vercel and Next.js to achieve efficient multi-tenancy, faster development cycles, and 50-80% faster load times.

[Fern](https://buildwithfern.com/) is improving how teams build and host documentation. As a [multi-tenant platform](https://vercel.com/solutions/multi-tenant-saas), Fern enables companies like Webflow and ElevenLabs to create, customize, and serve API documentation from a single Next.js application—scaling seamlessly across multiple customer domains. With 6 million+ page views per month and 1 million+ unique visitors, performance and reliability are key.

By running on Vercel’s infrastructure, Fern benefits from automatic caching, optimized content delivery, and instant scalability, all while maintaining a fast iteration cycle for development. Additionally, their migration to [Next.js App Router](https://nextjs.org/docs/app) has driven a 50-80% reduction in page load times, improving navigation speed and [Lighthouse scores](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) for customers worldwide.

![Example of developer documentation built with Fern and hosted on Vercel. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4t5A0Kp7RZ30bpQdWsSzQ0%2F0403c6b646220e8b6faae34987a05f99%2Fvercel-api-explorer.png&w=1920&q=75)

Example of developer documentation built with Fern and hosted on Vercel.

## [Link to heading](#building-a-multi-tenant-platform-on-vercel)**Building a multi-tenant platform on Vercel**

Fern’s architecture is built around a single Next.js app running on Vercel, handling multi-tenant routing across various customer domains. Instead of deploying separate instances for each customer, Fern uses [Vercel Middleware](https://vercel.com/docs/edge-middleware) to dynamically route traffic, keeping infrastructure simple and efficient.

![The architecture behind prod.ferndocs.com](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F9BFT53TISr0a0WJT1DEpm%2F6e77909aea2f87b9bc17893609c250d6%2Fvercel-fern-light.png&w=1920&q=75)![The architecture behind prod.ferndocs.com](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7HUPsTkTEv8dvGNaH7R483%2F65b68e522a8c848f6b446644eee30084%2Fvercel-fern-dark.png&w=1920&q=75)

The architecture behind prod.ferndocs.com

The team’s deployment strategy includes a main multi-tenant stack at `prod.ferndocs.com`, a performance-optimized version at `app.ferndocs.com` focused on CDN delivery, and a dedicated development environment at `dev.ferndocs.com`. With Vercel's [custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) support, they also give customers full control over their documentation URLs.

With Vercel's domain management tools, Fern supports both subdomains (docs.website.com) and subpaths (website.com/docs), enabling customers to bring their own domains with just a CNAME DNS record.

[

**How to build a multi-tenant app with custom domains using Next.js**

Create a full-stack application with multi-tenancy and custom domain support using Next.js App Router, Vercel Postgres, and the Vercel Domains API.

Read the guide



](https://vercel.com/guides/nextjs-multi-tenant-application)

## [Link to heading](#optimized-deployments-for-rapid-iteration)**Optimized deployments for rapid iteration**

Fern used to rely on AWS Fargate to run backend services, including a critical indexing script that handled reads and writes to their database and populated Algolia. But deployment through AWS CDK came with a 30-minute feedback loop, from merge to live deploy, which made iteration painfully slow.

By incrementally shifting this work to [Vercel Functions](https://vercel.com/docs/functions), Fern **cut deploy times down to five minutes** and gained the ability to test changes in preview environments before shipping to production.

Overall Vercel deployments have helped them:

-   **Deploy multiple times per day** to enabe tight feedback loops and continuous iteration
    
-   [**Manual Promote**](https://vercel.com/docs/deployments/promoting-a-deployment) allows the team to confidently push updates to production
    
-   [**Instant Rollbacks**](https://vercel.com/docs/deployments/promoting-a-deployment#instant-rollback) help avoid the impact of bugs or regressions
    

By leveraging Vercel’s monorepo support for their open-source [repo](https://github.com/fern-api/fern-platform/), Fern deploys updates across all customer sites in minutes, without managing infrastructure overhead.

## [Link to heading](#enterprise-grade-performance)**Enterprise-grade performance**

For businesses, fast-loading documentation is critical. Fern’s customers choose its platform not just for the UI, but for the speed and performance advantages it inherits from Vercel’s CDN.

Vercel delivers content globally to reduce latency, while automatic caching and [Incremental Static Regeneration](https://vercel.com/docs/incremental-static-regeneration) (ISR) ensure that documentation stays current without triggering full site rebuilds. Native video hosting adds another layer of polish to the developer experience, particularly for onboarding, by eliminating the need for third-party platforms and enabling faster, integrated playback.

## [Link to heading](#one-more-thing,-next.js-app-router)**One more thing, Next.js App Router**

Recently, Fern successfully migrated 65% of its platform from Pages Router to App Router in just 7 days, unlocking major performance gains:

-   **50-80% faster load times** for documentation pages
    
-   **3x faster time to first byte** (1.63s → 0.55s at p95)
    
-   **React Suspense & loading.tsx** for smoother navigation
    

To validate these improvements, Fern stress-tested their API documentation platform with with 6,000 simultaneous GET requests, ensuring fast, stable response times across all customer sites.

## [Link to heading](#a-platform-built-for-growth)**A platform built for growth**

With 63% month-over-month growth, Fern is rapidly scaling to serve customers worldwide. Their ability to iterate quickly, handle customer-specific configurations, and optimize for performance has made them the go-to documentation platform for enterprise companies who demand speed, customization, and availability.

> Every single day customers ask for more features. Vercel lets us focus on shipping user-facing functionality, abstracting away the infrastructure that would otherwise slow us down.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/73yEm0w9S9LBjEe0dGqlYG/1bc3ef05d6ae3381aa98f2eb902ed866/image.png)
> 
> **Danny Sheridan,** Co-founder and CEO

By leveraging Vercel’s infrastructure, Next.js App Router, and edge caching, Fern delivers a high-performance, multi-tenant documentation experience without the complexity of managing traditional infrastructure.

[

**Talk to a web app building expert**

Meet with a web app expert and see how your business can build better applications for your users.

Let's Talk



](https://vercel.com/contact)