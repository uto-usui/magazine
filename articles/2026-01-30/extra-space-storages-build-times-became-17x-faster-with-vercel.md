---
title: "Extra Space Storage's build times became 17x faster with Vercel"
source: "https://vercel.com/blog/extra-space-storages-build-times-became-17x-faster-with-vercel"
publishedDate: "2024-12-11"
category: "frontend"
feedName: "Vercel"
author: "Greta Workman"
---

3 min read

Dec 11, 2024

Next.js on Vercel cut deployment times and boosted Extra Space Storage's site reliability.

As the largest self-storage company in the U.S., [Extra Space Storage](https://www.extraspace.com/) manages over 3,800 stores nationwide. Delivering a consistent, high-quality digital experience to their customers is essential, and their engineering team recognized the need for faster iteration and more stability in their customer acquisition channels—public websites and kiosks.

However, their legacy architecture was creating bottlenecks, impacting time-to-market for new features, and slowing down development. By partnering with Vercel, Extra Space Storage was able to achieve their vision of improving their DevOps processes for their website and enable quicker customer feedback.

![Extra Space Storage's website and kiosks are hosted on Vercel, providing fast, reliable, scalable, and secure app delivery.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7yPdf7wetofgQsh21maSr6%2F59a907c67f8c8549e3678a5bee64794a%2FCleanShot_2024-09-18_at_22.44.06_2x.png&w=1920&q=75)

Extra Space Storage's website and kiosks are hosted on Vercel, providing fast, reliable, scalable, and secure app delivery.

### [Link to heading](#improving-build-times-and-stability-with-vercel)Improving build times and stability with Vercel

Before migrating to Vercel, Extra Space Storage faced challenges with the stability of their platform. The lack of reliable pre-production environments, and long developer build times all contributed to delays in delivering new features.

The search for a solution led them to explore Vercel, starting with smaller projects such as their kiosk platform and annual reports. These early successes built confidence in Vercel’s performance, and the team decided to move their flagship site to Vercel following the acquisition of Life Storage in 2023.

> Our success with the Life Storage site showed us how much we could gain from Vercel. Moving extraspace.com was a no-brainer.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3AbL7lNLt9U7HYfAhkh2b6/36600660feaebb3f233c64cecd195919/ess-logo.svg)
> 
> **Nate Green,**  Sr. Director of Software Engineering at Extra Storage Space

The migration was seamless. Extra Space Storage stood up the new site on Vercel and, when ready, controlled traffic through DNS routing. There was no need to revert back to their previous environment—the Vercel platform worked from the start.

### [Link to heading](#a-lean,-efficient-architecture-powered-by-next.js-and-vercel)A lean, efficient architecture powered by Next.js and Vercel

Now, Extra Space Storage’s frontend architecture is streamlined with Vercel. Their Next.js application is powered by Vercel's global [Edge Network](https://vercel.com/blog/life-of-a-vercel-request-navigating-the-edge-network), and they leverage features like [Incremental Static Regeneration (ISR)](https://vercel.com/blog/isr-a-flexible-way-to-cache-dynamic-content) for primary sales flow pages, ensuring optimal performance without constant server-side re-renders. [Edge Middleware](https://vercel.com/docs/functions/edge-middleware) handles routing and cookies for personalization, and they use Next.js’s powerful configuration options for redirects and rewrites.

[

**Understanding Vercel's infrastructure**

Learn how Vercel's framework-defined infrastructure automatically handles user traffic.

Read the blog



](https://vercel.com/blog/life-of-a-vercel-request-navigating-the-edge-network)

ISR has become a cornerstone of their architecture, allowing Extra Space Storage to serve pages quickly while refreshing stale content in the background. This strategy improves performance, particularly when redeploying production code.

> ISR was the most obvious feature that improved our performance, especially with production deployments.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3AbL7lNLt9U7HYfAhkh2b6/36600660feaebb3f233c64cecd195919/ess-logo.svg)
> 
> **Craig Kendall,** Senior Software Engineer at Extra Space Storage

Their checkout process behaves like a single-page application, optimizing for speed and user experience where SEO isn’t a priority, while other pages maintain strict SEO standards to ensure optimal performance and search visibility.

### [Link to heading](#accelerating-deployment,-reducing-overhead-and-downtime)Accelerating deployment, reducing overhead and downtime

Vercel’s impact on Extra Space Storage’s development workflow has been significant, with a 95% decrease in build times. With Vercel’s [per-branch environments](https://vercel.com/docs/deployments/preview-deployments), testing on branch deployments has become a seamless part of the workflow, allowing the team to test changes in isolation before merging.

These improvements allow Extra Space Storage to release more frequently and with confidence, improving agility and responsiveness to customer feedback.

> Testing is so much easier now. We no longer rely on shared environments, and the speed of deployments is incredible.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3AbL7lNLt9U7HYfAhkh2b6/36600660feaebb3f233c64cecd195919/ess-logo.svg)
> 
> **Nate Green,** Sr. Director of Software Engineering at Extra Space Storage

The migration to Vercel has also improved site reliability and stability. With Vercel handling caching and serverless functions, Extra Space Storage can focus on delivering features without the overhead of managing complex infrastructure.

Extra Space Storage’s site sees around 250,000 page views daily and drives $1.7 million in revenue per day. With Vercel, they’re able to scale to meet this demand without worrying about performance or stability.

### [Link to heading](#looking-ahead)Looking Ahead

Extra Space Storage’s migration to Vercel has improved their development workflow and set the stage for future innovation. While they’re still exploring the full range of Vercel’s capabilities, they are excited about the potential to leverage more advanced features as their application continues to grow.

For Extra Space Storage, the journey from a self-hosted architecture to Vercel has been transformative. The platform’s ease of use, rapid deployment times, and integrated features have unlocked new efficiencies for their engineering team, allowing them to deliver a better experience for both their developers and their customers.