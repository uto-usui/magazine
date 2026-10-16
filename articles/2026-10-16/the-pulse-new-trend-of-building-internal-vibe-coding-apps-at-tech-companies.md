---
title: "The Pulse: new trend of building “internal vibe-coding apps” at tech companies"
source: "https://newsletter.pragmaticengineer.com/p/the-pulse-new-trend-of-building-internal"
publishedDate: "2026-10-08"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

_The Pulse is a series covering events, insights, and trends within Big Tech and startups._

Today, we cover:

1.  **New trend: building internal vibe-coding apps at mid-sized companies.** Ramp and Stripe built platforms for non-engineers to build internal websites and tools with, and both are taking off in those workplaces. I expect more companies to do the same.
    
2.  **Do us engineers** _**really**_ **enjoy hard problems?** Or do we actually like pattern-matching with backend problems? A provocative post by Cloudflare engineer, Sunil Pai, suggests there are other motives.
    
3.  **New open models launch in the EU and US**. Kolibri, Mistral Large 4, and Beam by Reflection AI could challenge China’s dominance in open weight models.
    
4.  **Industry Pulse.** Why Figma doesn’t let any agent use its MCP server; Google Cloud adds Swift support on the server side, Anthropic’s two-week sprint to speed up Claude Code, Coinbase dumps React Native shortly after Shopify announces doing so, Claude Opus 5.5 formats the C: drive, and more.
    

When I visited Ramp’s headquarters last month in New York, I talked with the four-person development team behind ‘Glass,’ which is Ramp’s “internal Lovable.” This name refers to [Lovable.dev,](https://lovable.dev/) the leading AI vibe-coding tool.

Ramp’s ‘Glass’ is basically a vibe-coding platform for non-engineers to create complex applications which run internally. They can share the applications they make with others to use and modify. This is what the landing page looks like:

[

![](https://substackcdn.com/image/fetch/$s_!11Mp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30dd81a8-f0c6-43d0-9369-ce9d7933fb49_1080x920.png)

](https://substackcdn.com/image/fetch/$s_!11Mp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30dd81a8-f0c6-43d0-9369-ce9d7933fb49_1080x920.png)

_The landing page for Glass. Source: Ramp_

Users can connect various internal systems as “connectors” that can then be used as data sources for their apps:

[

![](https://substackcdn.com/image/fetch/$s_!ElqN!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18bdd157-c23e-4f93-9079-0794b5b8ea2a_1200x1023.png)

](https://substackcdn.com/image/fetch/$s_!ElqN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18bdd157-c23e-4f93-9079-0794b5b8ea2a_1200x1023.png)

_Setting up connectors in Glass_

The team showed me a few popular apps, including a custom CRM built by someone in marketing, which had 50+ fields and filters on-screen. It seemed overwhelming to me, but the creator reportedly finds it extremely powerful to use.

Since then, I’ve learned that many other mid-sized-and-above companies are building similar “internal Lovables” that don’t usually see the light of day in the outside world.