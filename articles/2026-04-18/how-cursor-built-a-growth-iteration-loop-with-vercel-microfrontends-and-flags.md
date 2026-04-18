---
title: "How Cursor built a growth iteration loop with Vercel Microfrontends and Flags"
source: "https://vercel.com/blog/how-cursor-built-a-growth-iteration-loop-with-vercel-microfrontends-and-flags"
publishedDate: "2026-04-14"
category: "frontend"
feedName: "Vercel"
author: "Eric Dodds"
---

6 min read

Apr 14, 2026

Cursor shipped a new brand, unified four web surfaces, and handed content operations to agents, all without disrupting revenue-driving signup flows.

### [Link to heading](#cursor-on-vercel)Cursor on Vercel

-   Unified four web properties and ~100+ routes under [cursor.com](http://cursor.com/)
    
-   Increased PLG signups 5% through experimentation
    
-   Expanded localization from 4 languages to 11
    

Cursor’s growth team sits close to the sharp edge of the product.

By the time Cursor launched a new brand and redesigned marketing site in September, the team had already proven they could move quickly. The next step was more subtle: not moving faster, but learning faster. They wanted to understand which changes were working, which were not, and how to make confident improvements across a web experience that was getting broader and more global.

That meant solving two problems at once.

First, Cursor wanted a single, consistent web experience under one domain. Second, they needed a framework for measuring results, especially as they expanded localization and started evolving from a purely product-led motion to one that also included sales.

### [Link to heading](#a-bigger-surface-area,-and-a-simple-goal:-one-cursor.com)A bigger surface area, and a simple goal: one [cursor.com](http://cursor.com/)

Emily Gavrilenko is an engineer on Cursor's growth team. She was part of the September launch from the start, collecting logos, sourcing customer proof points, and making sure the transition did not break the core signup flows that drive the business. The launch team was small: Emily, brand designer Justin, and VP, Developer Education Lee Robinson.

Cursor's web presence had expanded in scope. It was not just a marketing site. It also included the sign-in dashboard, documentation, and a help center. Each site lived in its own repo, but all needed to feel like a single experience to visitors.

Cursor's goal was straightforward: unify everything under [cursor.com](http://cursor.com/).

“We wanted everything to be on [cursor.com](http://cursor.com/) for domain and brand recognition,” Emily said, describing the push to standardize the domain experience across properties.

### [Link to heading](#unifying-four-properties-with-microfrontends)Unifying four properties with Microfrontends

Cursor had already separated their marketing site and signed-in experience into different repositories. That helped the team move quickly within each surface area, but it also created a new challenge: how do you present a unified experience for users when multiple codebases and properties need to live under the same domain?

[Microfrontends](https://vercel.com/docs/microfrontends) was the answer.

Cursor’s immediate constraint was practical. They wanted to launch the new marketing site quickly, but key routes for authentication and signup still lived on the old experience. Microfrontends let them ship the new marketing pages while maintaining continuity for the existing flows.

Emily described it simply: the team wanted “integration between the marketing pages people see and the signup experience,” and Microfrontends were “the best way to get it out fast without any downtime.”

> Vercel Microfrontends were the best way to get a unified, cross-site experience out fast, without any downtime.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/3qaf7SmXYBwhtR73jm4eR7/7196acad502d17d2a6959f34f9a986ea/emily-g.jpeg)
> 
> **Emily Gavrilenko,** Growth Engineer @ Cursor

That initial launch was only the start. Cursor’s migration path was intentionally progressive, executed in three phases:

-   The new marketing site launched first, supporting around 20 core routes.
    
-   Docs moved later, migrating from [docs.cursor.com](http://docs.cursor.com/) to [cursor.com/docs](http://cursor.com/docs).
    
-   The help center came last, also folded into the same Microfrontends setup.
    

Over time, this grew into a significant routing surface area. Cursor is now redirecting over 100 routes across four different sites.

### [Link to heading](#building-a-learning-loop-with-flags,-edge-config,-and-statsig)Building a learning loop with Flags, Edge Config, and Statsig

Unifying the domain was step one. Step two was building the measurement loop.

Before this work, Cursor was not running A/B tests on the signed-out marketing experience. “We initially hyper-focused on building the best possible product.” Emily said. “As our team and user base grew, we began dedicating time to optimizing the onboarding funnel.”

Cursor wanted to confidently make onboarding and content choices backed by experimentation data. Maintaining a healthy SEO/AEO and PLG funnel was a top priority, paired with fast loading pages and seamless content rendering without layout shifts and experimentation flicker.

The implementation they landed on combined tools Cursor already used with Vercel primitives that made the experience fast and consistent:

-   Experiments live in Statsig, which Cursor already used for the signed-in product.
    
-   For the marketing site, they implemented the [Vercel Flags SDK](https://vercel.com/docs/flags) so experiments could be evaluated with low latency using [Edge Config](https://vercel.com/docs/edge-config).
    
-   To keep the experience seamless, they generate versions at build time using a pre-compute approach, trading longer builds for a smoother on-page experience.
    

Once the system was in place, it enabled exactly what Cursor wanted: confident iteration on the content and flows that matter most.

The experiments themselves ranged from high-level messaging to navigation decisions. They tested hero copy and calls-to-action, for example whether it was better to ask visitors to “download” the app versus “get started.” They also tested adding “Contact sales” in the navigation as Cursor expanded their sales motion, and Emily shared one notable outcome: “Sales conversions increased, but so did PLG signups, by 5%."

With a large international audience, experimentation also extended into localization and segmentation. Cursor tested country-level localization approaches, tier recommendations, and even which logos and case studies were shown based on the visitor's geography.

### [Link to heading](#publishing-that-keeps-up:-dropping-the-cms-for-an-agent-first-workflow)Publishing that keeps up: dropping the CMS for an agent-first workflow

As Cursor’s web surface area grew, so did the need to ship changes quickly. But for Cursor, “quickly” did not mean frantic human work. It meant letting agents do the first pass, then letting humans review and merge.

That workflow drove a key decision: Cursor moved away from a CMS for updating marketing content.

The reason was simple: it did not fit how the team worked.

Emily explained that much of their development happened through cloud agents in Slack. Someone can tag an agent with a request, like “@Cursor, make this fix.” A CMS forced humans back into a manual loop: logging in, editing content directly, and managing changes in a separate interface. “Migrating to CMS slowed that down significantly,” Emily said, “because we had to actually go sign in and make the changes to ourselves.”

So Cursor shifted to publishing content directly in code, using Markdown where edits might need a human in the loop.

In practice, that means a change request can trigger a workflow that looks much more like engineering than content operations:

-   Agents open a GitHub PR
    
-   The PR produces a Vercel Preview Deployment so reviewers can click around and test changes
    
-   Cloud agents can generate a preview video using computer use, showing before-and-after behavior across relevant routes
    

For Cursor, this did more than remove steps. It changed who could participate. Instead of requiring specialized knowledge of the CMS, people across the team could request updates in Slack and review the result through previews and artifacts.

The CMS migration itself was a proof of concept for the approach. Cursor ran over 200 agents in parallel over the course of a week to migrate content, test it, and surface issues: a self-iterating, self-testing loop that required prompting when problems came up but handled the bulk of the work autonomously. Total cost: about $260 in tokens and three days of elapsed time.

Once Cursor codified a process as a reusable skill, it became even easier. Emily described the compounding effect: the upfront work took research and iteration, but once it was done and codified in a skill, making changes became super seamless.

### [Link to heading](#a-unified-foundation-for-what-comes-next)A unified foundation for what comes next

Cursor’s story is not about a single migration. It is about building a web system that scales with ambition: a unified [cursor.com](http://cursor.com/) experience that can expand across multiple properties, while supporting rapid iteration that is measured, repeatable, and increasingly automated.

Microfrontends gave Cursor a path to consolidate their domain experience without downtime. Flags, Edge Config, and pre-compute made experimentation fast and without layout shifts. And an agent-first publishing workflow made it possible to keep shipping improvements without adding friction as the surface area grew.

**About Cursor:** Cursor builds tools that help teams write and ship software faster with AI and agents.