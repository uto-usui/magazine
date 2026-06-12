---
title: "How Okara runs CMO agents for 120,000 companies on Vercel"
source: "https://vercel.com/blog/how-okara-runs-cmo-agents-for-120000-companies-on-vercel"
publishedDate: "2026-06-11"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

3 min read

Jun 11, 2026

### [Link to heading](#okara-on-vercel)Okara on Vercel

-   4 billion tokens processed daily across a multi-provider AI stack on Vercel
    
-   AI CMOs actively managing growth for 120,000+ businesses
    
-   Eight sub-agents handling SEO, GEO, social, content, Reddit, and Hacker News
    
-   New AI models available to users the same day they ship
    

Okara is an AI CMO that directs a team of specialized sub-agents to drive marketing, so founders don't have to. Give Okara your website URL, and the AI CMO builds a marketing strategy, develops a brand voice, and activates agents across SEO, content, and social media to drive awareness and pipeline without a single marketing hire.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1zScZ6ZVEkuhFyVSw0tju4%2F77da8e315a0612e89f127d30059e8248%2Fdashboard__2_.webp&w=1920&q=75)

  
As Fatima Rizwan, Okara's founder, puts it: "You can build something in a weekend and spend months trying to get anyone to notice." Distribution, she argues, is stuck in the pre-AI era: fragmented across subscriptions and agencies that cost over $15,000 a month before a single dollar comes back.

Okara is built by a team of four and processes 4 billion tokens a day. The company operates on the new model for startups: a small team building a platform that handles growth for thousands of other companies. Fatima quickly learned that serving hundreds of thousands of companies with four people meant infrastructure had to be invisible. Any time spent on it was time not spent building.

> We're four people building for hundreds of thousands of companies. We can't afford to build infrastructure and not product. Vercel gives us the foundation to move as fast as we need to.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/7hmyUHaOANJpmGl5rXFcgX/4a96e615bc087ebb7270731bc14c68b2/fatima_rizwan_headshot.jpeg)
> 
> **— Fatima Rizwan,** Founder & CEO @ Okara

## [Link to heading](#using-ai-gateway-to-integrate-multiple-providers-with-one-api-key)Using AI Gateway to integrate multiple providers with one API key

#### [Link to heading](#the-friction-of-managing-individual-provider-sdks)The friction of managing individual provider SDKs

Okara's backend originally talked to eight model providers through separate SDKs, each with its own key management, image handling, and edge cases. When they expanded to open-source models, the approach broke down completely. Every new model meant an engineer stopped shipping product and wrote an adapter instead. Retry logic, fallback routing, and provider health monitoring all lived in Okara's codebase, maintained by hand.

Most AI infrastructure would have required Okara to keep living with that friction. That's why they moved to Vercel AI Gateway.

> Before AI Gateway, every new model provider meant new keys, new dashboards, new billing. The overhead was constant and it had nothing to do with actually building. Vercel changed that.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/5TF95Aj1dzfDfnavITWpae/a05dc58b7a4faa08dc17150905260af0/boney_hernandez_headshot.jpeg)
> 
> **Boney Hernandez,** Full Stack Developer @ Okara

#### [Link to heading](#one-endpoint,-every-provider)One endpoint, every provider

[AI Gateway](https://vercel.com/docs/ai-gateway) replaced every custom integration with a single configuration. Retry logic and fallback handling moved out of Okara's codebase and into Vercel's routing layer entirely, including zero-data retention support for Okara's privacy-sensitive secure chat.

The day a new model ships, Okara's team can make it available to users immediately through Gateway. No adapter, no edge case testing, no deploy cycle.

> With AI Gateway, everything is in one place. We can configure any provider on the spot and ship the same day. What used to take days now takes minutes.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/5TF95Aj1dzfDfnavITWpae/a05dc58b7a4faa08dc17150905260af0/boney_hernandez_headshot.jpeg)
> 
> **Boney Fernandez,** Full Stack Developer @ Okara

## [Link to heading](#running-agent-workflows-in-vercel-sandboxes)Running agent workflows in Vercel Sandboxes

Okara's SEO agent can scan for problems and write the code that fixes them. When the agent finds a technical issue on a user's site, it spins up a Vercel Sandbox and runs the analysis in an isolated environment. The findings are passed to a coding agent, which opens a pull request with the fix, ready for the developer to review and merge. Detection, analysis, code change: the entire loop runs automatically, with a human making the final call before anything goes live.

Okara adopted Vercel Sandboxes the day they launched. Rizwan saw the announcement on X and the team started building immediately.

> We evaluated other options, but the answer was always Vercel Sandbox. It spins up instantly and just works.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/5TF95Aj1dzfDfnavITWpae/a05dc58b7a4faa08dc17150905260af0/boney_hernandez_headshot.jpeg)
> 
> **Boney Fernandez,** Full Stack Developer @ Okara

## [Link to heading](#what's-next)What's next

120,000 websites are now using Okara's AI CMO. The team ships to production six or seven times a day, and every improvement lands for customers the same day it ships. A solo founder using Okara gets the same distribution muscle as a team ten times their size, without the headcount or the $15,000 monthly agency bill.

Okara is expanding its agent suite and moving upmarket to serve larger teams. As the product grows, so does the infrastructure demand. More users, more agents, more tokens. When you're four people handling growth for 120,000 companies, you can't afford for infrastructure to be a distraction. With Vercel, it isn't.

**About** **Okara:** [Okara](https://okara.ai/) is an AI CMO that directs a team of specialized sub-agents to handle SEO, content, and social media for founders and small teams. It connects to your website, develops a brand voice, and manages distribution across eight channels without a marketing hire.