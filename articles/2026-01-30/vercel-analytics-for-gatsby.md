---
title: "Vercel Analytics for Gatsby"
source: "https://vercel.com/blog/gatsby-analytics"
publishedDate: "2020-11-04"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

2 min read

Nov 4, 2020

Monitor your page speeds over time with reporting from real user experiences.

At Next.js Conf, we announced [Next.js Analytics](https://nextjs.org/analytics?utm_source=vercel&utm_medium=blog&utm_campaign=gatsbyanalytics), providing developers with their Real Experience Score through data from actual visitors. Today we're expanding Vercel's analytics offerings to include Gatsby.

## [Link to heading](#get-started)Get Started

Starting today, Gatsby analytics for projects deployed to Vercel are available with zero configuration:

-   1\. **Open a Gatsby project in your** [**Vercel dashboard**](https://vercel.com/dashboard?analytics=1)
    
-   2\. **Select the "Analytics" tab and follow the flow**
    

No code changes are required ([docs](https://vercel.com/docs/analytics?utm_source=vercel&utm_medium=blog&utm_campaign=gatsbyanalytics)), and [options for self-hosted applications](https://vercel.com/contact/sales?utm_source=vercel&utm_medium=blog&utm_campaign=gatsbyanalytics) are available for enterprises.

### [Link to heading](#performance-is-critical)Performance Is Critical

To your visitors, it's essential that your application is fast. Over 50% of site visitors will abandon a page that takes more than 3 seconds to load, and a 0.1-second delay can cause a 1% drop in ecommerce conversions.

As developers, we often focus on performance when we first develop, preview, and ship, but then it's easy to lose focus on continued performance.

Vercel solves this by allowing developers to [track performance continuously](https://vercel.com/docs/analytics?utm_source=vercel&utm_medium=blog&utm_campaign=gatsbyanalytics#real-experience-score) and track changes over time, with insights on the [Core Web Vitals](https://vercel.com/docs/analytics#web-vitals?utm_source=vercel&utm_medium=blog&utm_campaign=gatsbyanalytics) from real user data across devices and regions, page by page, for every deployment.

![An example of the Analytics tab on the project view.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3ykCSrHR904R0dKbnTbiJw%2F09d906f71cea2f89ba3b6984f20e844b%2Fpreview.png&w=1920&q=75)

An example of the Analytics tab on the project view.

### [Link to heading](#start-with-the-developer)Start with the Developer

Performance starts with the developer experience, and Vercel is the best place to deploy any frontend app. Deploy with zero configuration to our global edge network and scale to millions of pages without breaking a sweat.

Starting today, Gatsby analytics for projects on Vercel are available with zero configuration required.

By expanding our analytics features to enable Real Experience Score (RES) collection to both Next.js and Gatsby apps, we expect developers on these frameworks to create consistently fast user experiences.

And to enable more developers to perform at the highest level, we'll continue releasing analytics for other frameworks, enabling RES for as many sites as possible. [Follow us](https://twitter.com/vercel) on Twitter for updates.

## [Link to heading](#how-it-works)How It Works

In the build step of your Gatsby deployments, Vercel automatically installs the [gatsby-plugin-vercel](https://www.npmjs.com/package/gatsby-plugin-vercel) npm package and modifies your `gatsby-config.js` file to inform Gatsby about the newly added plugin. You do not need to add it manually.

Once deployed, your application will automatically report [Core Web Vitals](https://vercel.com/docs/analytics#web-vitals?utm_source=vercel&utm_medium=blog&utm_campaign=gatsbyanalytics) to Vercel.

Next.js and Gatsby are the first two [frameworks supported](https://vercel.com/docs/analytics#supported-frameworks), with more are coming soon. [Let us know on Twitter](https://twitter.com/vercel) which frameworks you'd like to see support for.

Next.js and Gatsby analytics are new essentials for ensuring your sites continue to perform beyond Lighthouse scores. Not yet on Vercel? [Import your Gatsby project today](https://vercel.com/import/git).