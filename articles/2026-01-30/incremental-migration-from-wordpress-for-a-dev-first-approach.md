---
title: "Incremental migration from WordPress for a dev-first approach"
source: "https://vercel.com/blog/incremental-migration-from-wordpress-for-a-dev-first-approach"
publishedDate: "2023-04-14"
category: "frontend"
feedName: "Vercel"
author: "Kelsey Dillon"
---

3 min read

Apr 14, 2023

Navigating the agency world can be complicated, with each agency claiming to offer the most innovative solutions. Enter [Gearbox](https://www.gearboxbuilt.com/), a five-person team that crafts stunning sites and apps while empowering their clients to retain complete control over their brand. The secret to their success: a "dev-first approach" that sets them apart from typical marketing and design-focused competitors.

Flexible enough to power both their small team and larger brands, Next.js and Vercel are Gearbox's go-to solutions—even for clients who may not be ready to transition to a headless stack all at once.

## [Link to heading](#features-to-power-an-incremental-migration)Features to power an incremental migration

When he first founded Gearbox, CEO Troy McGinnis served his clients using WordPress, which was the tech he was accustomed to from his previous agency. After two years of working around security, maintenance, and performance issues with Wordpress—the Gearbox team endeavored to move to a [headless tech stack](https://vercel.com/blog/your-guide-to-headless-commerce). 

> Coming from the WordPress world to the Vercel world, everything in our life has become more efficient. Things like cloning an existing project or onboarding a new developer used to take many hours. Compare this against Next.js and Vercel, which takes less than five minutes. We clone the repo from GitHub, hook it up to Sanity CMS, and then we are up and running. It’s insanely fast.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/eWDBvtwS84mHUwl3JkA9G/6eeede2a902d7d2816918c6c74cc9430/gearbox_logo.jpg)
> 
> **Troy McGinnis,** Gearbox CEO

They initially chose Gatsby as their frontend framework. But “Gatsby and WordPress were still too restrictive. Gatsby was falling off the radar. That’s when we found Next.js and Vercel. We loved it from the get-go, and with all the recent features, it just keeps getting better and better.”

## [Link to heading](#going-headless-at-the-edge-)Going headless at the edge  

![Vercel's Edge Network gives you access to powerful compute without added latency. Test locally, deploy globally, with zero configuration.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6hNkSN3vG3o48JB6US8Dxe%2F67aae6d73755a3368b8a589ed9ba0f55%2FGroup_107942.png&w=1920&q=75)

Vercel's Edge Network gives you access to powerful compute without added latency. Test locally, deploy globally, with zero configuration.

Gearbox uses [Edge Middleware](https://vercel.com/features/edge-functions) to incrementally adopt Next.js. One advantage of this is in managing blog redirects, to maintain SEO. With Edge Middleware, the new posts automatically rewrite to an existing WordPress blog under the hood, filter traffic, and point to other services and websites—all while masking the URL and without complicated server setup. Eventually, they will move everything from that WordPress blog and this allows the team to incrementally migrate in phases and manage scopes accordingly.

## [Link to heading](#security,-streamlined)Security, streamlined

The Gearbox team deeply values the security of their clients’ apps and sites. Security vulnerabilities are common with legacy WordPress sites, so the team often pushes clients to migrate to Vercel with this in mind. 

McGinnis shares, “We actually just had a client run a penetration test with their legacy WordPress stack, and it failed within a few hours. **The first thing that popped into my head was, ‘if this was on Vercel and Next.js, we wouldn’t be having this problem.' We’d be locked down on security, and Vercel would be handling all this for us.”**

With Vercel, sites are secure by default: requests are handled in isolation and content is replicated globally, ensuring stability by design.

## [Link to heading](#getting-to-production-faster)Getting to production faster

The Gearbox team also loves [Vercel Preview Deployments.](https://vercel.com/features/previews) “I was just raving to our team that it’s so nice to have Preview URLs. Previously we would have to pull down the database from the server to be able to view development content, or hook it up to another database and then pull down files, and it was all very time consuming even just to review code," says McGinnis, "whereas with Vercel and our Preview URLs, it’s just there. It’s so integrated into our workflow.

## [Link to heading](#a-revamped-workflow-for-continued-success)A revamped workflow for continued success

Gearbox has been all-in on Vercel and Next.js for almost three years now. They have a growing and diverse client base, from breweries to government agencies. Even if their clients can’t switch to a composable tech stack all at once, they experience the benefits of Next.js and Vercel with each increment of their migration. 

“It has completely reshaped how we approach development workflow,” says McGinnis. 

[

**Ready to go headless at the edge?**

Talk to a Next.js expert about reshaping your team's workflow.

Get in touch



](https://vercel.com/contact)