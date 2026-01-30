---
title: "How Plex 6x their impressions deploying Next.js on Vercel"
source: "https://vercel.com/blog/how-plex-6x-their-impressions-deploying-next-js-on-vercel"
publishedDate: "2023-01-26"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

2 min read

Jan 26, 2023

Plex is a TV platform with live and on-demand content that streams action, comedy, movies, news, and more 24/7.

#### 79 -> 90

improvement to their Real Experience Score

#### 5 Minutes

to hook up Vercel to GitHub Repository

[Talk to an Expert](https://vercel.com/contact/sales)

## Products Used

Web Analytics

Edge Middleware

Edge Cache

Environment Variables

Firewall

In 2021 they set out to create a new unified foundation to build their web experiences for years to come.

With the goal of prioritizing user experience, Plex leveraged Next.js native optimizations like [Server-side rendering](https://vercel.com/docs/concepts/next.js/overview#server-side-rendering-ssr) (SSR) pages, on-demand [Incremental Static Regeneration](https://vercel.com/docs/build-output-api/v3#features/on-demand-incremental-static-regeneration-isr) (ISR), and [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware), ultimately improving their Google search ranking and increasing traffic after the relaunch.

Their site, [watch.plex.tv](http://watch.plex.tv/), was originally deployed on Kubernetes auto-scaling clusters. While the performance met their business requirements, the developer experience led to wasted resources and headaches. By refactoring their site to Next.js on Vercel, Plex **decreased the number of lines in their codebase by roughly 40%, making it faster to develop new features.**

> Vercel had us immediately impressed. In less than 5 minutes, we had Vercel hooked into our GitHub repository with an integration that felt polished.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/qAB5W99IUrdjjjrOmK5HA/708ae1df12f46fb755ed62958cd2f20a/image.png)
> 
> **Eric Matthys,** Principal Software Engineer

And with the ability to serve content at the edge, Plex decreased page load times: amplifying their impressions and upgrading developer experience.

### [Link to heading](#improved-dx-leads-to-improved-seo)Improved DX leads to improved SEO

-   **Less configuring, more product.** Plex used to manage a dense build configuration with difficult migrations—but now they lean on Next.js’ graceful, non-breaking adoption patterns.
    
-   **Hybrid rendering with Next.js.** They use Static Generation for maximum performance _without_ sacrificing the benefits of Server-side Rendering. The Plex team found that SSR maximizes crawlability (like [hard 404 responses](https://developers.google.com/search/docs/advanced/crawling/http-network-errors#soft-404-errors)) so they use it as a tool to improve SEO.
    
-   **Personalize wherever possible.** [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware) allowed them to serve different content based on the geographical availability of titles. Additionally, they were able to run and track [A/B tests](https://vercel.com/templates/next.js/ab-testing-simple) for static pages without creating Cumulative Layout Shift or increasing page load times.
    
-   **Ship confidently with integrations.** [Vercel’s Checkly integration](https://vercel.com/integrations/checkly) enabled end-to-end tests when making any updates across the platform. The team also used the [Axiom integration](https://vercel.com/integrations/axiom) to monitor crawl requests immediately, removing the four-day delay that is observed through Google Search’s own crawl stats and giving quick feedback as changes are made.
    
-   **Faster data propagation with ISR.** Generating pages for millions of movies, shows, and cast members can be costly. Changes to metadata, catalog availability, or images need to be picked up quickly by the site and shown to site visitors. If a new movie becomes available to stream at a certain time, Plex needs users to see it immediately.
    

“We use on-demand ISR to balance these by increasing the revalidate time of our static pages while allowing our backend to revalidate these pages on demand as important changes happen. This reduces the time spent rebuilding pages that did not have any meaningful changes.” - Eric Matthys, Principal Software Engineer

By using Vercel to provide not only a great developer experience but also a great end user experience, the Plex team continues to deliver fast and climb the Google search ranking.

Want to see how your frontend team can improve your site's experience? [Get in touch](https://vercel.com/contact).