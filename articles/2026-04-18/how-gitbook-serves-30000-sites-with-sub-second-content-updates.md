---
title: "How GitBook serves 30,000 sites with sub-second content updates"
source: "https://vercel.com/blog/how-gitbook-serves-30000-sites-with-sub-second-content-updates"
publishedDate: "2026-04-16"
category: "frontend"
feedName: "Vercel"
author: "Eric Dodds"
---

4 min read

Apr 16, 2026

### [Link to heading](#gitbook-on-vercel)GitBook on Vercel

-   30,000 documentation sites hosted on a single Vercel deployment
    
-   120 million monthly page views served from the edge
    
-   40,000 cache invalidations processed daily, each resolved in under 300ms
    
-   41% of all traffic now comes from AI crawlers and automated systems
    

GitBook hosts 30,000 documentation sites on Vercel, serving 120 million page views every month. Companies like n8n, Nvidia, and Zoom trust the platform to keep their docs fast and current. For modern engineering teams and coding agents, documentation is as critical as the production code it describes, and GitBook sits at the center of that expectation.

GitBook's publishing model mirrors how teams ship software: propose changes, review, and merge. With 30,000 independently managed sites each on its own update cadence, keeping content fast and fresh was a complicated engineering problem. Before migrating to Vercel, site editors would hit merge, visit the published site to validate, and see old version of the content. "One of our customers planned a large feature release, and on launch day, the docs lagged behind the rest of the product," says Steven Hall, Head of Engineering at GitBook. "That was the moment we really internalized that docs are as important as your code going to production."

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5YA1RYQNMlksIQ1K2DYUOc%2F748423a057f7b2bcc154cbfd6f694ada%2Fgitbook-editor-png.png&w=1920&q=75)

## [Link to heading](#making-merge-mean-live-at-multi-tenant-scale)Making merge mean live at multi-tenant scale

GitBook's published content frontend runs on Next.js and is open source. When Vercel's `use cache` directive became available, the team saw a solution to their speed problem: cache individual data-fetching functions rather than full page responses. That meant expensive API calls were deduplicated across requests, and cache behavior became visible directly in code rather than buried in external configuration.

The harder problem was invalidation. In a multi-tenant system, a broad cache purge is expensive and wasteful. One team merging a typo fix shouldn't trigger revalidation for 29,999 other sites. GitBook already had a reliable signal for when content becomes stale: a merge event, whether through GitBook's app, GitHub, or GitLab. The team built tag-based invalidation triggered directly by those events. Cached data is tagged by content unit, and when a merge occurs, only the affected tags are revalidated. Everything else stays cached.

Today, when a change is merged, updated content becomes visible globally within 300 milliseconds. GitBook processes 40,000 of these invalidations daily. "Outside of building our own caching, I don't think we considered anything else," says Hall.

> We considered building a caching layer ourselves, but Vercel was really the only option that made sense for our multi-tenant architecture.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/5m0yJdbmmD0MUvHgT2fVZi/45e0e3f65d3215fcf2d962cbf2e17143/steven-hall-gitbook.jpeg)
> 
> **Steven Hall,** Head of Engineering @ GitBook

## [Link to heading](#what-changes-when-41%-of-your-traffic-isn't-human)What changes when 41% of your traffic isn't human

AI-driven traffic to GitBook documentation surged 5x year-over-year in 2025 and now accounts for 41% of all page views. LLMs and automated systems crawl docs programmatically, using GitBook as a source of truth for internal tooling, SDKs, and AI applications.

That changes the infrastructure math. A human reader might visit a handful of pages on a single docs site, but an AI crawler can sweep every page across hundreds of sites in a single session, hitting cold cache paths that no human would visit. Multiply that across 30,000 sites and the caching foundation has to handle not just more traffic, but fundamentally less predictable traffic. Content still has to be immediately consistent after every change, and infrastructure costs have to stay predictable even as volume climbs.

Hall says they didn't choose the caching architecture because of AI specifically, but it turned out to be the right foundation. "We need fast docs regardless of whether AI or humans are reading them," he says. "Our target is closer to 100% cache hits. Cache hits mean fast docs, and fast docs are a critical feature of GitBook."

## [Link to heading](#the-next-30,000-sites)The next 30,000 sites

The caching infrastructure isn't finished. Features like adaptive documentation, which modifies content based on who's reading it, make multi-tenant caching meaningfully more complex. And as AI traffic keeps climbing, the volume of requests flowing through 30,000 sites will only grow.

"Volume is going up everywhere," Hall says. "Engineers shipping more means more docs changes. LLMs are crawling more pages every day. Our main goal is to maintain that high bar for latency and predictability as we scale."

[_GitBook_](https://www.gitbook.com/) _is an AI-native documentation platform used by more than 30,000 teams to create, publish, and maintain product and developer documentation at scale. GitBook's published content frontend is open-source._