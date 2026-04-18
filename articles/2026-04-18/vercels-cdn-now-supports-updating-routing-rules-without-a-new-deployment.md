---
title: "Vercel's CDN now supports updating routing rules without a new deployment"
source: "https://vercel.com/changelog/vercels-cdn-now-supports-updating-routing-rules-without-a-new-deployment"
publishedDate: "2026-03-05"
category: "frontend"
feedName: "Vercel"
author: "Mark Knichel"
---

1 min read

Mar 5, 2026

You can now create and update routing rules within a project, such as setting response headers or rewrites to an external API, without building a new deployment.

Project-level routing rules are available via the dashboard, API, CLI, and Vercel SDK and take effect instantly after you make and publish the change. Project-level routes run after bulk redirects and before your deployment config's routes.

With this addition, Vercel's CDN now supports three routing mechanisms:

-   Routes defined in your deployment configuration (via `vercel.json,` `vercel.ts`, or `next.config.js`)
    
-   Bulk redirects
    
-   Project-level routes
    

Project-level routes are available on all plans starting today. Read the [documentation](https://vercel.com/docs/routing) or go to the [CDN tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fcdn%2Frouting) in your project dashboard to get started.