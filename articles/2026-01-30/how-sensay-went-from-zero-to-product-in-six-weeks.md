---
title: "How Sensay went from zero to product in six weeks"
source: "https://vercel.com/blog/how-sensay-went-from-zero-to-product-in-six-weeks"
publishedDate: "2026-01-27"
category: "frontend"
feedName: "Vercel"
author: "Eric Dodds"
---

5 min read

Jan 27, 2026

Sensay went from zero to an MVP launch in six weeks by leaning on Vercel previews, feature flags, and instant rollbacks. The team kept one codebase, moved fast through pivots, and shipped without a DevOps team.

## [Link to heading](#impact-at-a-glance)Impact at a glance

-   **6 weeks** from zero to MVP launch for Web Summit
    
-   **Zero** upfront infrastructure cost to go live
    
-   **No DevOps team** required
    
-   **Fast iteration loops** using preview deployments and feature flags
    

## [Link to heading](#a-startup-searching-for-its-market)**A startup searching for its market**

[Sensay](https://sensay.io/) did not start as an employee off-boarding platform.

The company's original mission was deeply human: build "replicas" of people that could capture their knowledge, voice, and image so families could preserve memories before cognitive decline set in. The team worked with retirement homes and care providers, focusing on Alzheimer's and dementia patients who wanted to leave something of themselves behind.

Product reality arrived quickly. It was hard to build and distribute software for that demographic, especially when the early versions were text-based. The market was there, but the fit wasn't.

For CTO and co-founder Marco Bettiolo, the lesson was clear: Sensay needed a tech stack that would let them ship, test, and change direction fast, without accumulating the kind of infrastructure drag that slows startups.

He'd seen what that drag looked like up close. In two previous companies, Marco had helped build the exact infrastructure that makes engineering teams productive: internal deployment systems, preview environments, rollbacks, monitoring, alerting. Those systems worked, but they required years of development, dedicated headcount, and ongoing maintenance.

"I was responsible for building out infrastructure in-house at two separate companies, and both times it resulted in spending millions," Marco recalls.

For a startup trying to find product-market fit, platform work becomes a second product that doesn't generate revenue. Marco knew he didn't want to build that infrastructure again.

> Because we are a startup, it didn't make sense to get a DevOps team, so it was very natural to marry Next.js with Vercel.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2U45JWj4MYq2JvuFhpP8XX/2669c88ed234d74756ed9ac52d529cbb/marco-bettiolo-sensay.jpeg)
> 
> **Marco Bettiolo,** Co-founder and CTO

## [Link to heading](#three-pivots,-one-codebase)**Three pivots, one codebase**

Building replicas led the team at Sensay to a broader insight: they were really building an AI knowledge engine. The core goal was to ground LLM responses in specific source material rather than relying on generic training data. If you're recreating someone's lived experience—say, a grandfather who fought in World War II and spoke a dialect that no longer exists—the AI needs to reflect that person's actual knowledge and voice, not hallucinated generalities.

That realization became their second iteration: an API platform that let teams build grounded agents using their own knowledge base. They built a chat widget, landed customers, and learned that selling an API in a crowded space required technical sales expertise they didn't yet have.

Customers kept asking about a specific vertical problem: knowledge loss when employees leave companies. So they built an off-boarding platform that captures departing employees' institutional knowledge, keeping it accessible to the business.

When the opportunity came to launch at Web Summit, the team compressed everything into a tight timeline. "In the six weeks prior to Web Summit, we went from zero to developing the MVP to a production launch at the event," Marco says.

Six weeks. From concept to live product at a major conference. "If I had to start building on our own infrastructure, we wouldn't have done anything to launch in six weeks, much less 6 months."

## [Link to heading](#what-made-speed-possible)**What made speed possible**

For Sensay, Vercel wasn't about any single feature. It was about removing the work that makes shipping feel risky.

[Preview deployments](https://vercel.com/products/previews) meant every branch got a working URL that could be tested and shared immediately, no merge required, no staging branch overhead. "When we need to move fast, it's incredible to test things in isolation on a PR," Marco explains. "That allows you to control the blast radius."

[Feature flags](https://vercel.com/docs/feature-flags) became a development primitive. Instead of maintaining long-lived branches that inevitably lead to merge conflicts, the team kept everyone working on the same mainline codebase. Unfinished features were simply hidden behind flags until ready. Using the [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar), developers and teammates could toggle functionality on or off safely. 

[Instant rollbacks](https://vercel.com/docs/instant-rollback) reduced the psychological cost of deploying. Domain configuration and environment variables made going live repeatable and fast. Security features like [firewall](https://vercel.com/docs/vercel-firewall) and bot protection eliminated the need for additional services. [Usage dashboards](https://vercel.com/docs/observability) provided visibility into resource consumption. "You get productivity from the first moment," Marco says. "You just push to the branch and you go live."

The result was a workflow where moving fast didn't mean losing control. "Without the dashboard, it would have been a total mess to understand why or how I am consuming your resources."

Sensay runs a hybrid architecture with serverless front-and-backend workloads on Vercel and stateful workloads elsewhere. Next.js powers the frontend, their API runs as a separate Vercel project using Hono, and they use the Vercel [AI SDK](https://ai-sdk.dev/) to streamline the buildout and maintenance of AI features and model access.

"All the serverless workloads are on Vercel," Marco explains. "So we still don't have any DevOps."

## [Link to heading](#the-million-dollar-question)**The million-dollar question**

When asked about savings compared to building infrastructure in-house, Marco is direct about the numbers.

> We’ve literally saved millions of dollars by using Vercel. And I get a better developer experience.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2U45JWj4MYq2JvuFhpP8XX/2669c88ed234d74756ed9ac52d529cbb/marco-bettiolo-sensay.jpeg)
> 
> **Marco Bettiolo,** Co-founder and CTO

He's not exaggerating. At his previous company, he led a 20-person team dedicated to building internal deployment tooling. The bill ran into the millions. The system worked, but it took years to reach the level of productivity that Vercel provided on day one. 

For a startup, those millions (not to mention the time savings) are the difference between reaching product-market fit and running out of runway while building infrastructure. "Going live immediately with a well-structured platform is a no-brainer," Marco says.

## [Link to heading](#what's-next:-keeping-knowledge-alive)**What's next: keeping knowledge alive**

Sensay's near-term focus is distribution: getting the off-boarding product into pilot partners' hands and iterating based on real workflows. The product direction is becoming clearer through product usage and customer conversations: make voice and text interviews frictionless for departing employees.

But the bigger opportunity is what happens after knowledge gets captured. "Once you capture the knowledge, people ask, "Okay, but then I want to make it as useful as possible," Marco notes. Teams want living knowledge bases that stay current, not static snapshots that decay.

Sensay's story is fundamentally about velocity to product-market fit. 

"Who knows where we’d be if we decided to build everything in-house," Marco reflects. “Certainly not where we are today.”

Sometimes the best infrastructure decision is the one you don't have to make.

**About Sensay:** [Sensay](https://sensay.io/) builds AI products that ground model responses in real organizational knowledge, including an off-boarding platform that captures knowledge from departing employees so it stays accessible inside the business.