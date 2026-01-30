---
title: "Open SDK strategy"
source: "https://vercel.com/blog/open-sdk-strategy"
publishedDate: "2025-09-03"
category: "frontend"
feedName: "Vercel"
author: "Tom Occhino"
---

3 min read

Sep 3, 2025

At Vercel, our relationship with open source is foundational. We do not build open source software to make money. Rather, we’re building an enduring business that enables us to continue developing great open source software. We believe in improving the default quality of software for everyone, everywhere, whether they are Vercel customers or not. A rising tide lifts all boats.

### [Link to heading](#against-lock-in)Against lock-in

We built Next.js at Vercel, and we’ve learned a lot by doing so.

We’ve seen the way that building open source and managed infrastructure in tandem can create an incredible developer experience and have massive impact. But coupling a project too tightly to one platform can raise questions about openness and control, even if it also accelerates quality and adoption.

That’s true even when lock-in is unintended.

### [Link to heading](#planting-a-flag)Planting a flag

We believe in open source, community, portability, and freedom of choice, so we want to take some time right now to articulate this commitment as a new ‘Open SDK’ strategy. Here’s what we commit to:

1.  **Open by default**: We commit to building our frameworks, SDKs, and tools in the open, wherever possible, and will default to the most permissive open source licenses in all cases
    
2.  **Loose coupling, high cohesion**: We want what we build to work extremely well on Vercel, but not at the cost of lock-in. We commit to building frameworks, SDKs, and tools that are open, portable, and usable on any platform
    
3.  **Innovation, then generalization:** We will build first on Vercel, where we can iterate fastest to ensure the best end-to-end developer and user experience. And as we become confident projects are mature, we’ll invest in ensuring our SDKs and tools are deployable to any platform
    

This is a commitment we want you to hold us to. In the long run, we believe this openness means you’ll be more likely to stay with Vercel. Not because you have to, but because you choose to.

### [Link to heading](#where-it-comes-from)Where it comes from

This strategy emerged from a series of real world observations and product decisions:

1.  **The ubiquity of React:** One compelling reason many developers choose React is that it is unopinionated about how and where you deploy it
    
2.  **Next.js as a standalone choice:** Developers wanted to use Next.js to its full potential on other managed platforms. That desire has become a north star for our open strategy
    
3.  **The AI SDK:** When Vercel acquired the `ai` npm package name, we knew we had a responsibility to make it platform, and framework-agnostic. That was non-negotiable
    
4.  **Nuxt and NuxtLabs:** With NuxtLabs joining Vercel and core members of the Nuxt and Nitro teams now working alongside us, we have to be crystal clear. We want Vercel to be the place open source creators aspire to be as they build for the open web
    

### [Link to heading](#applying-the-strategy)Applying the strategy

This isn’t about any single framework, whether Next.js or the AI SDK. And it won’t necessarily apply to Vercel’s commercial products, but we're actively applying this strategy across a growing family of libraries and frameworks:

-   [**Nuxt**](https://nuxt.com/): Bringing the same design principles to the Vue ecosystem
    
-   [**Svelte**](https://svelte.dev/)**:** Enabling high-performance apps with flexible deployment options
    
-   [**Flags**](https://flags-sdk.dev/)**:** A portable feature flag system that doesn’t require a specific flag provider
    
-   Plus [Nitro](https://nitro.build/), [Turborepo](https://turborepo.com/), [SWR](https://swr.vercel.app/), and more
    

### [Link to heading](#for-the-web)For the web

We believe the best way to build the future of the internet is to invest in open tools, empower developers with freedom and confidence, and to continue raising the bar for what’s possible without being locked in to any single platform.

Business follows quality. Quality follows mission.

Our mission is to build a better web, for everyone.