---
title: "How KIKO Milano scales for Black Friday"
source: "https://vercel.com/blog/how-kiko-milano-scales-for-black-friday"
publishedDate: "2026-05-05"
category: "frontend"
feedName: "Vercel"
author: "Meghan Schaefer"
---

3 min read

May 5, 2026

### [Link to heading](#kiko-milano-on-vercel:)KIKO Milano on Vercel:

-   Eliminated 3 weeks of Black Friday infrastructure prep
    
-   75% decrease in app build times
    
-   Went from minimal releases to deploying multiple times per day
    

KIKO Milano’s ecommerce team used to treat peak traffic as an operations project. Weeks before Black Friday, they had to manually scale AWS infrastructure and adjust application configuration, knowing that if demand exceeded forecasts, their site could slow down or even break, costing them real revenue.

After migrating to Vercel, they removed manual prep from their playbook. Instead of provisioning infrastructure, their team now ships campaigns and tests daily.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3lHcBErvlrwxNzOXrDXN3m%2F7a1e2274bbbe1f31d8a4b03e0dca0c11%2FCleanShot_2026-05-05_at_14.39.28_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1KohNp3IrHAB7oKzuh1bZI%2Fd6d290d8fcec08e2e391c5f107d12342%2FCleanShot_2026-05-05_at_14.37.25_2x.png&w=1920&q=75)

## [Link to heading](#the-black-friday-problem:-manual-scaling-and-stressful-failure-modes)The Black Friday problem: manual scaling and stressful failure modes

Before Vercel, KIKO ran their ecommerce app on AWS EC2 instances sized for normal traffic, then scaled by hand ahead of peak periods.

This was their previous process leading into Black Friday:

-   **Manual scaling window:**
    
    Black Friday prep began 2–3 weeks ahead of the event, then had to be unwound after the traffic spike passed.
    
-   **Infrastructure configuration:**
    
    The infra team manually adjusted AWS EC2 capacity to support expected traffic.
    
-   **Application configuration:**
    
    Scaling also required application-side changes, making peak readiness more than just an infrastructure task.
    
-   **War room prep:**
    
    Chat channels and conference rooms were set up for teams to triage performance and downtime problems.
    

Beyond the manual prep work, KIKO’s dev team had to anticipate failure modes that hurt the business. Slow navigation and site instability made it hard for users to purchase, and, in Ant’s words, they knew that at any point, “everything could break.”

## [Link to heading](#worry-free-delivery-and-automatic-scaling)Worry-free delivery and automatic scaling

Vercel changed the work from preparation to execution. With environments available on demand, faster builds, and automatic scaling during traffic spikes, Ant’s team stopped planning around infrastructure limits and focused on the ecommerce experience itself.

> Before we had to limit the number of releases as much as possible, but on Vercel we have the ability deploy multiple times a day if we want.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/1t0kpkVoiKROETwlKE4b1h/d2cd3d000a66747bff24248b194d113e/image.png)
> 
> **Antonino Samperi,** Digital Solutions Specialist

### [Link to heading](#environments-without-the-bottleneck)Environments without the bottleneck

KIKO's old setup ran on a fixed number of shared environments, which constrained how the team handled dev, test, pre-prod, and prod work in parallel. On Vercel, Ant described provisioning new environments as "snapping your fingers," including spinning them up on the fly when a project calls for it. Cloning environment variables is quick, and many changes that used to require code edits now "just require redeployment."

### [Link to heading](#shipping-faster-without-the-operational-tax)Shipping faster without the operational tax

The dev team’s old pipeline took around 20 minutes to run, which meant they had to keep releases to a minimum. Builds on Vercel finish in under four minutes on average, even with many locales and a large catalog of pre-rendered pages. The deployments view in the Vercel dashboard gives the team one place to check build status and surface failures without digging through logs.

### [Link to heading](#no-more-performance-variability-during-traffic-spikes)No more performance variability during traffic spikes

Performance used to swing with traffic, which meant the team felt every spike. Ant said that on Vercel, "everything scales automatically."

> On Vercel, infrastructure is something we were finally able to forget entirely, and that’s priceless.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/1t0kpkVoiKROETwlKE4b1h/d2cd3d000a66747bff24248b194d113e/image.png)
> 
> **Antonino Samperi,** Digital Solutions Specialist

That’s possible because their Next.js app runs on infrastructure that separates static delivery, cached pages, and dynamic compute, so each part can scale independently during traffic spikes, instead of forcing the team to size and tune servers ahead of time.

## [Link to heading](#beyond-black-friday:-velocity,-seo,-and-innovation)Beyond Black Friday: velocity, SEO, and innovation

The infrastructure migration didn’t just change how KIKO prepares for traffic spikes, it changed how much operational work the team carries every week.

Ant estimates that Vercel saves his team almost an entire day per week when all of the friction is added up, and that time savings has made the team more confident: the platform works, they can ship quickly, and when they need support, they know Vercel is there with them.

> It’s not only technical that the platform works, but also the people that are behind it. We never felt abandoned.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/1t0kpkVoiKROETwlKE4b1h/d2cd3d000a66747bff24248b194d113e/image.png)
> 
> **Antonino Samperi,** Digital Solutions Specialist

**About KIKO Milano:** [KIKO Milano](https://www.kikocosmetics.com/en-us/) is a global beauty brand delivering cosmetics and ecommerce experiences to customers worldwide.