---
title: "How Vercel helped this popular health database increase free trials by 284%"
source: "https://vercel.com/blog/examine"
publishedDate: "2023-07-25"
category: "frontend"
feedName: "Vercel"
author: "Kelsey Dillon"
---

2 min read

Jul 25, 2023

Examine’s team of developers improved page load times, build times, and dev workflow with the Frontend Cloud.

## Products Used

Preview Deployments

Next.js

ISR

Integrations

Comments

[Examine](https://examine.com/) is the Web’s largest database of nutrition and supplement research—empowering their users with scientific data to inform healthier lives. 

Prior to adopting Vercel’s Frontend Cloud, their five-person dev team was struggling with a pile of tech debt, brought on by their monolithic architecture setup.

Even the smallest of changes in the build process created frustration and bottlenecks for the Examine team. They struggled to find a balance between dynamic pages and caching. Plus, their release process was slow and laborious, with a shell script to deploy new updates on their servers, followed by a manual update to the database when changes were needed. This was a loss for both Examine’s users, who want their information quickly, and their developers, who never had time to create new features. 

“Everything was duct taped together,” explained Examine lead developer Jernon Magcalas.

## [Link to heading](#moving-to-vercel-for-measurable-results)Moving to Vercel for measurable results

Since switching to Vercel and [Next.js](https://vercel.com/solutions/nextjs), Examine’s build times went from 15-20 minutes down to just 1-2 minutes per build. By decoupling their frontend and backend, the team spends less time and fewer resources on infrastructure, while delivering better speed and performance to users nationwide.

After just a few months, free trial signups at Examine are up 284% thanks to an improved tech stack on Vercel.

> By using Next.js, we spend less effort in making the pages dynamic and use fewer resources by dynamically loading content. The prefetching is also great to make our pages much faster.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/7EbFTFGnqVUqgDOCTr4PpA/dbc9333355472a89619f13a586f877a1/image.png)
> 
> **Jernon Magcalas,** Lead Developer

The team credits this increase to:

-   **Page load times:** With Vercel’s [incremental static regeneration](https://vercel.com/docs/concepts/incremental-static-regeneration), [server-side rendering](https://vercel.com/docs/frameworks/nextjs#server-side-rendering-ssr), and static site generation, page load times have improved drastically—giving their end users a much improved experience. And going headless has even given Magcalas’s team the time and ability to plan for future projects, like developing a mobile app. 
    
-   **Developer workflow:** Examine’s developers experience streamlined collaboration by using Vercel [Preview Deployments](https://vercel.com/docs/concepts/deployments/preview-deployments). They can review, leave feedback, and deploy site improvements faster. They're also able to use integrations they know and love, like Sentry. 
    
-   **Build times:** Magcalas also noted that users are saying the site feels “more snappy.” And his team feels it, too—they’re developing faster than ever and build times have decreased by 90%.
    
-   **Project size:** What’s more, the previous version of Examine was 1,559,255 lines of code. The new site is 189,844 lines for both backend and frontend. “In other words: there’s a lot less configuration for us and a lot more speed for our users,” says Magcalas.
    

Magcalas is excited to see what the future will bring for Examine and the health industry: “I'm confident we're still just barely scraping the potential. I expect these numbers will continue improving as we put more energy into customer success and personalization.”

[

**Ready to redefine your digital experiences with Vercel?**

If you're curious about how Vercel can uplift your team's specific use case, our experts are ready for a conversation.

Let's Talk



](https://vercel.com/contact/sales)