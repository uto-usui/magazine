---
title: "How Vercel helped Desenio future-proof their business"
source: "https://vercel.com/blog/how-vercel-helped-desenio-future-proof-their-business"
publishedDate: "2024-05-09"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

3 min read

May 9, 2024

The merger of two of the world's largest affordable art providers, Desenio and The Poster Store, gave their developers the chance to modernize their application architecture, improve their entire process, and dismantle the monolithic approach that made for long deployment times and slow iteration. Thanks to Vercel, they went from duplicate pipelines to a unified workflow—**resulting in faster builds, a 37% lower bounce rate, 48% longer sessions, and a 34% improvement in site conversions.** 

> With Vercel, we know what we’re pushing into production is close to perfect. That’s incredibly important because as an ecommerce platform, our website is everything.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/MMSJ2Y62HLYq2TgAKNMJd/95c9815f3c9063cd113717b02d729a30/images.jpeg)
> 
> **Dash Donnergren,** Frontend Developer

While the acquisition of The Poster Store helped amplify Desenio’s global reach, it also introduced challenges that exacerbated the pitfalls of their existing setup. 

If they wanted to make even the smallest change, it would take about 20 minutes to reflect on all the edge servers and an additional two hours for customers to see the changes live. It was also difficult to test their code, with five different languages on the site and the ability to preview just one or two at a time. All of this made for a huge deterrent for innovation. 

When Desenio acquired The Poster Store, they suddenly realized that with two pipelines and two backends, their workload essentially doubled. Their current solution was simply not going to work if they wanted to scale their business. 

While they were resistant to adding third-party software, they decided to make an exception for Vercel. “We saw the benefits over the cost, and felt that at the time we wouldn't have the technical know-how, time, or the resources to develop a networking backend that works just as well as Vercel,” said Donnergren.

## [Link to heading](#the-vercel-toolkit-that-made-it-possible)**The Vercel toolkit that made it possible**

Here are a few of the features that have helped the Desenio team future-proof their website and go from an idea to a product faster. 

-   [**Preview Deployments**](https://vercel.com/features/previews)**:** Previews let Desenio’s engineers iterate quickly, collaborate with stakeholders, and keep a log of their ideas. 
    
-   [**ISR**](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)**:** As an ecommerce site in many different markets, Desenio has an enormous amount of pages. If they were to deploy statically, it would take hours. By leveraging Incremental Static Regeneration (ISR), builds take just a few minutes.
    
-   [**Next.js Redirects**](https://nextjs.org/docs/api-reference/next.config.js/redirects)**:** The Poster Store had a lot of old URLs around Google before the acquisition, but Next.js made it simple to manage redirects because they live right next to the rest of Desenio’s codebase.
    

With more time to iterate and innovate, Desenio’s team has the flexibility to look inward and reimagine their site—what can they improve upon, whether it’s rethinking their cart feature or presenting products in a different way. This has helped them increase their accessibility scores and make the site available for more people across the globe. 

**_“Vercel is sort of like the peanut butter to a jam sandwich. You can choose to have it without the jam and have a peanut butter sandwich, but you can also choose to have it with something unorthodox like ketchup. It doesn't force you into a specific pattern of solving a problem. It gives us the power to create the solution that works best for us.”_**

With a toolbelt of new tools, skyrocketing metrics, and the confidence to experiment and iterate, Desenio (now The Desenio Group) was able to launch 30 new markets in just one month. Suddenly that goal of being the largest global distributor of wall art looks well within reach.

Ready to future-proof your business and frontend stack? [Get in touch](https://vercel.com/contact/sales).