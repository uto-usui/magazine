---
title: "Moving from monolithic WordPress to composable gives Plenti total freedom"
source: "https://vercel.com/blog/from-monolith-to-composable-equipping-a-financial-services-ipo"
publishedDate: "2023-02-23"
category: "frontend"
feedName: "Vercel"
author: "Kelsey Dillon"
---

2 min read

Feb 23, 2023

[Plenti](https://www.plenti.com.au/) is a technology-led consumer lending and investment company that helps borrowers bring their big ideas to life. Established in Australia in 2014, Plenti has funded over $900m of loans to over 55,000 borrowers and has attracted over 22,000 registered investors. 

Consumers hold financial services providers to high standards, so a Vercel and Next.js frontend was instrumental in transforming their brand and giving their users a trustworthy experience. 

Because of this, migrating from their WordPress-based monolithic stack and launching a composable Next.js frontend on Vercel was Plenti’s top tech priority as they approached their rebrand and IPO. 

And they did this all with a one-developer team.  

## [Link to heading](#total-flexibility:-next.js-as-a-cornerstone-of-plenti’s-rebrand)Total flexibility: Next.js as a cornerstone of Plenti’s rebrand

Previously called RateSetter Australia, the Plenti team knew they needed to update their tech stack when they set off to IPO and rebrand in 2020. As part of the rebrand, everything on their website was redesigned, refactored, and rewritten. 

Plenti Software Engineer Matt Milburn managed the tech stack migration, saying “I tried to weigh every option possible, but Next.js ended up being the obvious choice. It just looks so nice, and gets you going so fast. You start building what you want to build right away, with zero configuration.” 

Milburn adds, “I’m happy we are no longer messing with our old monolithic WordPress stack. It’s total freedom.”

## [Link to heading](#everything-optimized-with-vercel-api-and-analytics)Everything optimized with Vercel API and Analytics

One of Milburn’s favorite features is the [Vercel API](https://vercel.com/docs/integrations/vercel-api-overview), a REST API that empowers you to gauge the capabilities of the entire Vercel platform including the Integrations. He uses the Vercel API to make a plugin for [Strapi](https://strapi.io/), Plenti’s Headless CMS provider, which triggers deployments automatically.

![The Vercel API allows you to leverage plugins, integrations, and more to enhance your workflow.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7KxeqQwOMNeQKiwtGqFTUn%2Faf76c124f9da095798d6e6364c6317f8%2FBlog_Graphic-Light_2x.png&w=1920&q=75)![The Vercel API allows you to leverage plugins, integrations, and more to enhance your workflow.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7BQ47m0JhMMcqxRxyo5np2%2F3aa890f22b64a797c99f4f54964fc12e%2FBlog_Graphic-FINAL_2x.png&w=1920&q=75)

The Vercel API allows you to leverage plugins, integrations, and more to enhance your workflow.

Milburn also values [Vercel Analytics](https://vercel.com/analytics)–particularly the [Real Experience Score (RES)](https://vercel.com/docs/concepts/analytics/web-vitals#real-experience-score-res) feature. “RES helps us narrow down a variety of optimizations we can make proactively,” he says. With RES, Plenti is able to collect web vitals from the actual devices their visitors are using. Because of that, it provides a real grade of how users actually experience what Plenti builds.

![While other performance measuring tools like Lighthouse estimate your user's experience by running a simulation in a lab, Vercel's Real Experience Score is calculated using real data points collected from the devices of the actual users of your application.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1Ht3VAQFlAgsEWm8rKD8ZV%2F45286c7d3dbd37aed5eabac1f0d949e4%2FScreenshots.png&w=1920&q=75)

While other performance measuring tools like Lighthouse estimate your user's experience by running a simulation in a lab, Vercel's Real Experience Score is calculated using real data points collected from the devices of the actual users of your application.

## [Link to heading](#zero-configuration-empowers-a-team-of-one)Zero-configuration empowers a team of one

But perhaps the most impressive part of Plenti’s successful composable frontend is that it’s managed by a single software engineer: Milburn. “My team is just me…I credit that to using [Next.js](https://vercel.com/solutions/nextjs) and [Strapi](https://strapi.io/). I can manage both, all on my own,” he says. 

And when it comes to harnessing the power of Vercel in tandem with Next.js, he concludes, “using Next.js and Vercel together? Of course. They make the thing. It’s zero-configuration.”

-   See how [Vercel Analytics](https://vercel.com/analytics) gives you better insights for peak performance
    
-   Why are innovators going composable (also known as headless)? [Get the guide.](https://vercel.com/try/ebook-why-innovators-are-going-headless) 
    
-   Want to ensure a great developer and user experience by going composable with Next.js? [Get in touch](https://vercel.com/contact/sales).