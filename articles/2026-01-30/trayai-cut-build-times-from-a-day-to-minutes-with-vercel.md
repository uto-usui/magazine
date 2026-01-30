---
title: "Tray.ai cut build times from a day to minutes with Vercel"
source: "https://vercel.com/blog/tray-ai-cut-build-times-from-a-day-to-minutes-with-vercel"
publishedDate: "2025-06-16"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

2 min read

Jun 16, 2025

How Roboto Studio simplified infrastructure, improved developer experience, and consolidated thousands of pages for Tray.ai

[Tray.ai](https://tray.ai/) is a composable AI integration and automation platform that enterprises use to build smart, secure AI agents at scale.

To modernize their marketing site, they partnered with [Roboto Studio](https://vercel.com/partners/solution-partners/roboto-studio) to migrate off their legacy solution and outdated version of Next.js. The goal: simplify the architecture, consolidate siloed repos, and bring content and form management into one unified system.

After moving to Vercel, builds went from a full day to just two minutes.

## [Link to heading](#from-fragile-pipelines-to-fast-deploys)From fragile pipelines to fast deploys

Before the migration, [Tray.ai](http://tray.ai/)’s infrastructure was held together by legacy decisions. An older version of Next.js coupled with [Serverless](https://www.serverless.com/), 250MB package builds, and a rigid dev–stage–prod pipeline slowed development to a crawl. Previewing changes required full deploys. Form logic lived in a separate repo. Builds failed often, and when they didn’t, they took a full day.

> Moving to Vercel reduced build times from a full day to just 2 minutes for faster rollouts and more agile updates.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3Lc0jYqoiElRN0vdaj20Ms/4a3a0bf43d88365260f5c98809178729/image.png)
> 
> **Co-founder & CEO,** Tray.ai

Roboto Studio rebuilt the site from the ground up using [Next.js](https://nextjs.org/). They consolidated everything into a single [Turborepo](https://turborepo.com/) monorepo, with custom page resolution and deeply nested dynamic routing to handle the complexity of over 500,000 pages.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1z6OSuEtn5yRejorZUURSH%2Fd55498cb7b609aa0e67feb476694e488%2FScreenshot_2025-06-13_at_9.18.42%C3%A2__am.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F77zdinLPYIjMtikZXvi5bC%2F76072c10b9674117e8694ae7c1fbf924%2FScreenshot_2025-06-13_at_9.19.11%C3%A2__am.png&w=1920&q=75)

On Vercel, the team now uses [automatic git-based deployments](https://vercel.com/docs/git) on every branch push. Developers get to see see their changes using [preview deployments](https://vercel.com/products/previews) that mimics production, allowing them to find and fix issues before they merge.

## [Link to heading](#unified-infrastructure,-fewer-unknowns)Unified infrastructure, fewer unknowns

The new site architecture uses a hybrid approach with Static Site Generation (SSG), Server-Side Rendering (SSR), and Client-Side Rendering (CSR), each applied where it makes sense. Roboto also rebuilt Tray’s forms engine using [Vercel Functions](https://vercel.com/docs/functions), integrated with recaptcha for added protection.

With [Vercel Analytics](https://vercel.com/docs/analytics) and [Speed Insights](https://vercel.com/docs/speed-insights), the team can now understand how real users interact with the site. Performance insights right in the Vercel Dashboard became a north star.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2YsSrqB4Tcu46Sjyj9lepV%2F01d4cc0c19359afb95cc9c71855c567b%2FLight_mode_performance_insights-1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5M7YdM7GILbAwt6dEude0C%2Faa3f5bc917cccb1980ecac44f96a4133%2FLight_mode_performance_insights.png&w=1920&q=75)

In addition, reliability has drastically improved. The team now catches build errors instantly, no more digging through layers of abstraction or chasing down broken deploys. What used to take extra steps and time is now visible the moment it happens, making fixes faster and more straightforward.

> We are shipping far faster, far more often, and we’re giving Tray visibility into every change, right in the workflow.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/19z9Po3mrhGqo9TWPc6XYK/ca4c38436ba151be897f6192ca6ab465/image.png)
> 
> **Founder of Roboto Studio**

## [Link to heading](#resilience-at-the-edge)Resilience at the edge

When the team spotted a DDoS attack targeting dynamic SSR routes through [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability), they quickly refactored the most vulnerable pages to static, cached versions. The problem resolved without any infrastructure intervention. This kind of flexibility is built into the architecture, powered by [Vercel’s Edge Network](https://vercel.com/docs/edge-network).

They now serve over one million page views monthly with a setup designed to scale.

## [Link to heading](#results)Results

Tray’s migration wasn’t just about fixing broken builds, it was about unlocking a better way to work. With a modern Next.js architecture on Vercel, they now deploy faster, validate ideas quicker with preview deployments, and debug issues with real-time visibility.

Consolidating multiple repos into a single codebase reduced complexity and made it easier to manage forms, content, and shared logic in one place. Combined with analytics, performance insights, and edge caching, the new stack gives Tray a faster, more reliable foundation built for iteration, scale, and speed.

[

**Talk to a migration expert**

Start building a cleaner enterprise-grade stack.

Contact Sales



](https://vercel.com/contact/sales)