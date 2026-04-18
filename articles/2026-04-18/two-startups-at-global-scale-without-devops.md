---
title: "Two startups at global scale without DevOps"
source: "https://vercel.com/blog/two-startups-at-global-scale-without-devops"
publishedDate: "2026-03-19"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

36 min watch

Mar 19, 2026

Leonardo.AI processes more than 4.5 million images every day across cities worldwide, and Relevance AI's agents run autonomously across time zones, touching Salesforce, HubSpot, Slack, and dozens of other systems without pause. Neither company has a dedicated DevOps team.

That's not an oversight. It's an operational model.

The startup ecosystem in APAC is a clear example of why this model is taking hold. AI-native startups are surging across the region: over 1,000 are building in Australia alone, according to the State of Australian Startup Funding Report. Meanwhile, nearly a third of Singapore's new startups last year were focused on AI.

## [Link to heading](#startups-can-find-capital,-but-not-devops-talent)Startups can find capital, but not DevOps talent

Billions in AI venture capital are flowing into APAC. In Australia alone, more than $1 billion was invested in AI-native startups in 2025. Singapore attracted $8.4 billion, accounting for 75% of the region's total.

The money is there. The infrastructure talent is not. A single DevOps engineer in Australia costs $150K+, takes months to close, and that's only if you can find one. Sixty to 80 percent of APAC organizations report difficulty filling IT roles, according to IDC.

For a 15-person startup, that math means shortening the runway by three months. Factor in tooling, on-call overhead, and the opportunity cost of pulling engineers off product work, and the true cost extends well beyond the salary line. That's why companies are increasingly deploying on infrastructure that keeps them lean and accelerates their ability to ship.

Two Australian startups didn't solve this problem by hiring faster; they solved it by not needing to hire at all.

## [Link to heading](#relevance-ai)Relevance AI

**50,000 agents, zero infrastructure team**

[Relevance AI](https://relevanceai.com/), based in Sydney, builds a platform that lets sales and marketing teams run AI agents across their existing tools. Their agents run autonomously across systems like Salesforce, HubSpot, and Slack, handling lead qualification, customer support, and outbound workflows.

What makes their product distinct is the broad capabilities of their agents. Beyond workflow automation, Relevance AI can craft a web experience (like a landing page), test it, and push it to production, all without human intervention. The process is surprisingly simple: they use the [Vercel REST API](https://vercel.com/docs/rest-api) for each step.

During a v0 Power Hour, Scott Henderson from Relevance AI built a similar agent in [v0](https://v0.app/) and deployed it globally with a few clicks.

## [Link to heading](#leonardo.ai)Leonardo.AI

**4.5 million images a day, zero manual provisioning**

[Leonardo.AI](https://leonardo.ai/) started as a tool for game developers to generate custom visual assets with AI. It expanded quickly to serve artists, marketers, and creative professionals. The platform now processes more than 4.5 million images every day.

Their early growth quickly exceeded the limits of their original infrastructure. In early 2023, Leonardo.AI had over 100,000 sign-ups and 200,000 more on the waitlist. App build times regularly exceeded 10 minutes. Pages that weren't properly cached took 60 seconds to load. Outages were common, and the engineering team spent cycles managing infrastructure rather than improving media output.

**Metric**

**Before Vercel**

**After Vercel**

Build times

10+ minutes

2 minutes

Page load times

60 seconds (uncached)

~3 seconds

Product launch cycle

Months

2 weeks

Those numbers represent more than speed. They represent a team that stopped managing infrastructure entirely. Vercel handles provisioning, scaling, and observability automatically, so the engineers who used to build and babysit infrastructure now spend their time iterating on proprietary models.

With [Vercel Observability](https://vercel.com/products/observability) providing real-time visibility into [Fluid compute](https://vercel.com/fluid) performance, issues get caught before users notice them. Global scale happens automatically, even during high-traffic periods, without a single manual intervention.

> Switching to Vercel transformed our workflow at Leonardo.AI, cutting build times from 10 minutes to just 2 minutes. Vercel didn't just speed us up; it changed how we innovate.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/6sfYoKuNHCiB8pUL8iGK3v/0983bc882757d065786bf2bdfb7491fb/leonardo.ai_avatar.jpeg)
> 
> **Peter Runham,** Co-Founder & CTO

## [Link to heading](#the-operational-model-that-wins)**The operational model that wins**

What Leonardo.AI and Relevance AI have in common isn't their industry or their product; it's their operating model. Both companies run at a global scale, serve millions of users, and ship continuously, all without dedicated infrastructure teams. The platform handles that layer, so their engineers don't have to.

This is becoming the default for AI-native startups. As these companies grow faster and continue to hire lean, the ones that win won't be the ones with the biggest ops teams. They'll be the ones who spent their time building a product instead.

[

**AI SYD**

Join us in Sydney for our latest meetup, co-hosted with Relevance AI. Meet our team and others building with AI.

Join us in Sydney



](https://luma.com/yt0jierk)