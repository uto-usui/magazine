---
title: "How Notion powers rapid and performant experimentation"
source: "https://vercel.com/blog/how-notion-powers-rapid-and-performant-experimentation"
publishedDate: "2024-11-25"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

2 min read

Nov 25, 2024

Using Next.js, Vercel, and Statsig to increase iteration velocity and run hundreds of experiments per year.

#### 300%

Increase in speed to deploy hotfixes

#### 0.09

Average Cumulative Layout Shift score

[Talk to an Expert](https://vercel.com/contact/sales)

[Notion](https://www.notion.so/) is a connected workspace that allows users to write, plan, and organize, all enhanced with built-in AI. With a platform as flexible as Notion, the challenge for their website team lies in communicating the vast range of use cases—from personal projects like planning trips to enterprise-level tasks like managing company documentation. That’s a huge total addressable market that attracts many millions of diverse visitors to their website every week. As these numbers continue to rapidly grow and personas expand, Notion needed a website capable of rapid iteration and experimentation to help their message resonate with more people.

## [Link to heading](#improving-iteration-velocity-with-vercel)Improving iteration velocity with Vercel

With a small team focused on the marketing site, Notion required an infrastructure solution that enabled quick updates without compromising performance.

Previously, Notion deployed its marketing site using ECS. The team of engineers were web experience specialists and didn't have the resources to spend on configuring infrastructure, leading to challenges with handling traffic spikes, autoscaling issues, and long deployment times. Moving to Vercel simplified these processes by abstracting away infrastructure maintenence. As a result, the team could focus on faster iterations without worrying about complex deployment setups.

Vercel provided the perfect solution to Notion’s need for speed. With Vercel, the marketing team saw a significant boost in development velocity thanks to features like fast deploys and [Instant Rollbacks](https://vercel.com/docs/deployments/instant-rollback). **What once took an hour to deploy a hotfix now takes just 15 minutes (a 75% decrease), and rolling back changes happens in seconds.**

## [Link to heading](#statsig-and-edge-config-for-seamless-experimentation)Statsig and Edge Config for seamless experimentation

Notion's marketing sites are built with Next.js and integrated with [Statsig](https://www.statsig.com/) for experimentation. This integration automatically updates experiments to Vercel's Edge Config store, with [Middleware](https://vercel.com/docs/functions/edge-middleware) handling real-time experimentation at the edge. By using [Vercel Edge Config](https://vercel.com/docs/storage/edge-config) in combination with Statsig's target apps to experiment [server-side](https://vercel.com/docs/frameworks/nextjs#server-side-rendering-ssr), they minimize payload sizes and latency, ensuring no negative impacts to performance or Core Web Vitals. Notion now consistently averages **0.09 or better for** [Cumulative Layout Shift](https://web.dev/articles/cls), placing their site in the top tier for user experience.

![Middleware makes routing decisions based on Statsig. Statsig SDK is bootstrapped from Edge Config instead of fetching from the Statsig API.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6pNMdT6GodRhx78Hn6Qs4B%2F2d36c173dde4fa95ff5f8d28be926c92%2Fstatsig_lightmode.png&w=1920&q=75)![Middleware makes routing decisions based on Statsig. Statsig SDK is bootstrapped from Edge Config instead of fetching from the Statsig API.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2XdNJ68vI2pexKNq8jOYb8%2F6c4f8b5ded3737bd9dde1c1598166a34%2Fstatsig_lightmode-1.png&w=1920&q=75)

Middleware makes routing decisions based on Statsig. Statsig SDK is bootstrapped from Edge Config instead of fetching from the Statsig API.

Feature flags are a crucial component of Notion's setup. Vercel's integrated [Toolbar](https://vercel.com/docs/workflow-collaboration/feature-flags#step-2.-managing-feature-flags-from-the-toolbar) allows both developers and non-developers to easily toggle experiments for testing and iteration, streamlining the rollout process. Notion's marketing team utilizes this integration to run tests aimed at growing their top-of-funnel metrics, specifically increasing the number of new onboarded users.

Notion is data-driven and has a strong broader culture of experimentation, **running hundreds of tests per year across their team**. By choosing Statsig and Vercel, the team gets seamless integration, with holistic metrics analysis that offers both top-line and detailed views of performance from feature flags.

[

**Start interacting with your application’s feature flags.**

Unlock the new workflow today: Use the Vercel Toolbar to read and set feature flag overrides for your application.

Get started



](https://vercel.com/docs/workflow-collaboration/feature-flags/using-vercel-toolbar)

In addition, Notion uses Vercel’s [monitoring](https://vercel.com/docs/observability/monitoring#monitoring) tools to track performance and resolve issues on their website overall. Weekly queries and ad-hoc dashboards help the engineering team monitor key metrics, such as page errors and caching issues, ensuring the site is always performing at its best even with experiments running.

## [Link to heading](#get-started-with-vercel)Get started with Vercel

Since adopting Vercel, Notion has seen substantial improvements in its development process. The implementation has reduced infrastructure concerns and decreased deployment times, allowing the team to focus on iterating quickly and ship updates that truly speak to their users.

[

**Want to add Vercel to your composable stack?**

Talk to an expert to learn how you can improve your site’s performance and UX.

Get in touch



](https://vercel.com/contact/sales)