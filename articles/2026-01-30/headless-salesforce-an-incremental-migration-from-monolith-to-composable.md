---
title: "Headless Salesforce: An incremental migration from monolith to composable"
source: "https://vercel.com/blog/salesforce-incremental-migration"
publishedDate: "2025-01-07"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

5 min read

Jan 7, 2025

Keep your commerce backend and de-risk your migration.

For ecommerce teams running Salesforce Commerce Cloud, the platform's monolithic design can feel like a double-edged sword. While its out-of-the-box capabilities promise rapid deployments, they often hinder frontend flexibility and innovation. But what if you could unlock a new level of performance—without risking your core business?

That’s exactly what a global sportswear brand achieved. Their headless Salesforce migration strategy halved their load times, cut cart abandonment by 28%, and increased mobile conversion rates by 15%. All without a disruptive, big-bang migration.

Here’s how they did it and how you can too.

> We now have visibility into our performance we never had before. When issues arise, we can pinpoint and fix them faster. That said, during BFCM, we're so bored because nothing's happening—we're just watching the sales go up.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3Wg1IsPQwJrCLeqp8TEk9/c1305f7b6ed46dbb15dd9d565ef2e345/image.png)
> 
> **Lead Developer,** Sportswear Retailer

## [Link to heading](#the-case-for-migration)The case for migration

Ecommerce teams often outgrow Salesforce Commerce Cloud's monolithic architecture for a few reasons:

-   **Architectural constraints:** Teams are forced to implement personalization client-side, leading to duplicate downloads and slower page loads
    
-   **Limited tooling choices:** Integrating best-in-class solutions often requires clunky workarounds, leaving engineers feeling constrained in technical choices to build better features and experiences
    
-   **Scalability struggles:** During peak traffic events, issues like bloated tag managers, inefficient data pipelines, and unoptimized assets make Salesforce sites prone to slowdowns or worse—downtime
    

These limitations affect more than just performance and sales. They hurt developer experience by requiring specialized skills and tribal knowledge, which limits your ability to hire and retain talent.

This prevents you from setting a strong foundation for the future, and it contributes to poor user experiences that frustrate customers and drive them away.

## [Link to heading](#migration-strategy:-moving-forward-without-the-risks)Migration strategy: Moving forward without the risks

Replacing an ecommerce platform wholesale is daunting, especially when it handles millions or billions in annual revenue. Instead, teams can take an incremental approach, focusing on these key areas:

-   **Choosing the right frontend framework:** While Salesforce offers PWA Kit as a frontend solution, [Next.js](https://nextjs.org/) provides a more robust and flexible approach for large-scale ecommerce sites and benefits from an active open-source community. Next.js includes server-side rendering, image optimization, built-in routing, and vast community libraries of pre-built components. This accelerates development and allows for seamless integration with various backend systems, including Salesforce Commerce Cloud.
    
-   **Planning for incremental traffic management:** Edge Middleware—built into Next.js and supported by the Vercel platform—allows for intelligent and gradual traffic rerouting between your new Vercel-hosted application and your existing application.
    
-   **Ensuring business continuity:** Preserve existing data and integrations while progressively introducing a new headless layer.
    

This strategy enables you to migrate one page or route at a time, minimizing risk during the transition. You get immediate access to modern frontend capabilities while maintaining your existing Salesforce backend infrastructure, allowing you to upgrade at your own pace.

## [Link to heading](#technical-strategies-for-a-smooth-migration)Technical strategies for a smooth migration

Transitioning your ecommerce platform can feel overwhelming, but these practical tips ensure a smooth transition while minimizing risks.

### [Link to heading](#start-with-the-frontend)**Start with the frontend**

Build a new presentation with Next.js while keeping Salesforce Commerce Cloud as the backend. This approach allows you to tackle performance issues incrementally without a full system overhaul.

Start small with a single page or route of your application. You can choose a less critical or lower-traffic page to ensure everything works correctly.

![The Next.js, Vercel, and headless Salesforce stack.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7n54ub7WxE8NrpxoauC7tH%2F4bc6b6f9aa402b5afd5e3b070006b654%2FSFCC_-_Light.png&w=1920&q=75)![The Next.js, Vercel, and headless Salesforce stack.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1q4Ob22day36T9EzgiiVuM%2F31838f387772544fbec0d82112e06d90%2FSFCC_-_Dark.png&w=1920&q=75)

The Next.js, Vercel, and headless Salesforce stack.

### [Link to heading](#use-edge-middleware-for-traffic-control)**Use Edge Middleware for traffic control**

Use [Edge Middleware](https://vercel.com/docs/functions/edge-middleware) to create a reverse proxy by defining rewrites directly in your Next.js configuration. This dynamically routes traffic between your existing app and your new Next.js app on Vercel. For further control, you can also add A/B testing or use percentage-based rollouts.

This approach enables you to incrementally migrate and test features progressively. Deploying your app to Vercel also enables [near-instant rollback capabilities](https://vercel.com/docs/deployments/instant-rollback) if something goes wrong.

### [Link to heading](#synchronize-user-sessions)**Synchronize user sessions**

Implement shared session strategies, such as encrypted cookies and centralized session storage, to ensure a consistent user experience across both platforms. This prevents users from experiencing issues like having to log in twice or losing shopping cart items.

Additionally, you can set up JWT-based authentication to pass user data securely between apps without database lookups. Edge validation ensures consistent user states across the platform while maintaining sub-100ms response times.

### [Link to heading](#preserve-seo-rankings)**Preserve SEO rankings**

To [avoid disrupting search engine visibility](https://vercel.com/resources/how-to-plan-a-successful-composable-commerce-migration#plan-for-seo), maintain existing URL structures and manage redirects carefully, using Edge Middleware to ensure minimal latency for users. Implement proper canonical tags and monitor Google Search Console as you move pages and compare old data to new data to ensure continuity.

### [Link to heading](#test-in-real-world-conditions)**Test in real-world conditions**

Use Salesforce Commerce Cloud's sandbox environments to create pre-production instances with representative data. This allows you to thoroughly test your Next.js frontend against realistic data sets without affecting your live store.

Vercel’s [preview deployments](https://vercel.com/docs/deployments/preview-deployments) create a unique URL, allowing you to test changes before they go live. You may also configure [custom environments](https://vercel.com/docs/deployments/custom-environments) on Vercel to mimic your organization’s workflow.

### [Link to heading](#mitigate-salesforce-api-challenges)Mitigate Salesforce API challenges

Next.js's composability provides granular control over [data fetching and caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching). By strategically caching API responses and leveraging [Incremental Static Regeneration (ISR)](https://vercel.com/blog/isr-a-flexible-way-to-cache-dynamic-content), you can significantly reduce the number of requests to Salesforce Commerce Cloud, minimize API rate limit issues, and improve overall performance.

## [Link to heading](#results:-performance-and-business-gains)Results: Performance and business gains

When we recently helped a global sportswear brand through this migration, they saw measurable improvements in site performance, developer productivity, and revenue.

They began with their homepage as an isolated test case, but when they saw great results, **they accelerated their entire migration timeline from five months to two month.**

### [Link to heading](#performance-metrics)Performance metrics

During high-traffic periods, the new architecture proved to be 10x faster than Salesforce Commerce Cloud alone in load testing. This improvement came from edge computing, server-side rendering, and optimized data management.

Core Web Vitals directly relate to [search ranking](https://vercel.com/blog/how-core-web-vitals-affect-seo) and [site usability](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud). All metrics saw sizable improvements:

-   Time to First Byte (TTFB): 2.0s → 0.8s
    
-   First Contentful Paint (FCP): 3.2s → 1.8s
    
-   Largest Contentful Paint (LCP): 4.0s → 2.4s
    
-   Interaction to Next Paint (INP): 350ms → 200ms
    
-   Cumulative Layout Shift (CLS): 0.1 (maintained)
    

### [Link to heading](#productivity-improvements)Productivity improvements

Development teams were able to release more frequently—and with more confidence—in a more enjoyable working environment.

-   Deployment times reduced from hours to minutes
    
-   Rollback times reduced to seconds
    
-   Feature deployment controlled via feature flags
    
-   40% improvement in development team retention
    

### [Link to heading](#business-impact)Business impact

Improving the infrastructure and user experience directly translated to better converts and revenue.

-   28% decrease in cart abandonment rates
    
-   15% increase in mobile conversion rates
    
-   $10M in incremental quarterly online sales
    
-   Zero downtime during Black Friday, even with 125,000+ concurrent users
    

Like most major platform transitions, this migration is an ongoing journey. The team plans several upcoming improvements, including a microservices-based checkout system, optimization of third-party scripts, and moving personalization to the edge.

The team remains confident in their direction, thanks to their enhanced capability to quickly spot, evaluate, and fix issues through better [monitoring](https://vercel.com/docs/observability) and [regular performance audits](https://vercel.com/blog/technical-audits) with our professional services team.

## [Link to heading](#the-key-takeaways)The key takeaways

Migrating away from Salesforce Commerce Cloud doesn’t have to mean starting over. By focusing on the frontend and leveraging tools that allow an at-your-own-pace approach, you can unlock a faster, more scalable platform—without the risks of full re-platforming. The key to success is to start small and partner with experts who have done this before.

Ready to see what a migration looks like for you? [Contact our team to start your migration today.](https://vercel.com/contact/sales)