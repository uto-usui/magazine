---
title: "Building a real-time power outage map with Next.js on Vercel"
source: "https://vercel.com/blog/building-a-real-time-power-outage-map-with-next-js-on-vercel"
publishedDate: "2026-05-28"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

4 min read

May 28, 2026

### [Link to heading](#endeavour-energy-on-vercel)Endeavour Energy on Vercel

-   Sub-1s page loads during peak storm traffic
    
-   Five-minute data sync cycle across all upstream systems
    
-   38% faster deployments compared to their previous platform
    

When a summer storm rolls through New South Wales in Australia, hundreds of thousands of people pull up the same page: the [Endeavour Energy outage map](https://www.endeavourenergy.com.au/power-outages/outage-map).

During the worst storms, people check it from the dark, on a phone with patchy reception, while a tree is still down on the line outside. They want one thing: accurate information, fast.

[Endeavour Energy](https://www.endeavourenergy.com.au/) is one of Australia's largest electricity distributors, serving more than 2.8 million people across New South Wales. Storms hit the region often, and when they do, that outage map is the front door to the company. For a long time, it was also the bottleneck. Traffic surged exactly when performance mattered most, and before migrating to Vercel, the platform underneath couldn't keep up.

## [Link to heading](#every-storm-exposed-faulty-infrastructure)Every storm exposed faulty infrastructure

The previous setup tightly coupled the frontend to the content layer, making deployments slow and scaling difficult. Real-time updates required manual orchestration and weren't reliable under load. Refresh cycles that should have taken 10 minutes could stretch to an hour or more, exactly when the map needed to be current.

The outage map was hard to extend and slow to update. Small editorial changes could take a full day, and structural changes took even longer. Yet speed was the whole point: during a storm, customers need accurate information in minutes, not hours.

> Our outage map is the single most important thing on our website during a storm. Before Vercel, it wasn't fast or accurate, and that meant we were failing the people we serve.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/1YbE1L5FgDbcUsSBgh3j9S/6bbaeb94b0d4106ae6931cf47e85ada0/rebecca-hill.jpg)
> 
> **Rebecca Hill,** External Communications and Brand Manager @ Endeavor Energy

Every storm produces a traffic spike on the scale of a product launch, except no one chooses when it lands; the storm does. Without infrastructure that automatically absorbs spikes, the team had to provision year-round resources for roughly 17x normal traffic, roll their own preview environments so operations and engineering could review changes in parallel, and maintain cron jobs to keep upstream data flowing.

Each workaround was a quarterly tax on the engineering team, and patching only added more code to maintain. So they rebuilt the system on Next.js and Vercel.

## [Link to heading](#three-layers,-scaling-on-their-own-terms)Three layers, scaling on their own terms

Endeavor's engineering team opted for a headless setup on Vercel. They started by migrating the frontend from Sitecore to Next.js, and then they implemented a new database service for live outage data. The CMS stayed in place for content editors.

Each piece of the architecture now scales, deploys, and updates independently.

-   [**Next.js**](https://nextjs.org/) on Vercel powers the frontend with server-side rendering, static generation, and edge delivery.
    
-   [**Supabase**](https://vercel.com/marketplace/supabase) manages the real-time data layer, storing and serving outage and asset data through its API.
    
-   [**Sitecore**](https://vercel.com/partners/sitecore) remains the content and experience platform, handling editorial workflows and page content.
    

Going headless meant each layer could scale on its own terms. On Vercel, the frontend automatically absorbs traffic spikes, so the team no longer provisions year-round for the worst-case storm. Content editors kept their existing workflow, and the entire rebuild happened without a CMS migration.

> We migrated to Vercel because we needed each layer to scale on its own terms. A storm doesn't care about your deployment pipeline, and our content team shouldn't have to either. Splitting the stack let every team move at the speed they need to.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/6zhHAsFBCvTXcCK8wesbNF/d095dfda0e10fdb249ff4ae98102d2bb/favicon.ico)
> 
> **Jagan Sampath Kumar,** Application Team Leader @ Endeavor Energy

## [Link to heading](#five-minute-syncs-with-vercel-cron-jobs)Five-minute syncs with Vercel Cron Jobs

The value of the outage map depends on its freshness. Stale data during an active weather event is worse than no data at all.

Endeavor's new data pipeline uses [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs) to synchronize upstream outage systems into [Supabase](https://vercel.com/marketplace/supabase) every five minutes. The scheduled jobs run as [Vercel Functions](https://vercel.com/docs/functions), pulling the latest outage status, affected areas, and estimated restoration times. The frontend reads from Supabase in near real-time.

Refresh cycles that once stretched to 45 minutes under load now hit their five-minute window on schedule, even at peak storm traffic. For the customer checking the map in the dark, that's the difference between trusting what they see and constantly refreshing, hoping for an update.

## [Link to heading](#migrating-without-going-dark)Migrating without going dark

For a utility serving millions, going offline for a migration wasn't an option. The team ran an [incremental migration](https://vercel.com/docs/incremental-migration): a Vercel environment alongside the existing platform, with content moved gradually. Endeavour kept Sitecore in place and rebuilt only the frontend and data layer around it, leaving editorial workflows untouched.

Their engineering team worked with [Gamma](https://vercel.com/partners/solution-partners/gamma), a Vercel solution partner, to rebuild the outage map and migrate to Vercel.

The outage map was prioritized first, since it carried the highest traffic and the highest stakes. New components were built and tested in parallel before going to production. [Preview deployments](https://vercel.com/docs/deployments/preview-deployments) gave multiple teams, from engineering to operations, visibility into each build before it went live.

> Vercel's preview deployments changed the conversation with stakeholders. Instead of describing what we’re building, we send a link. Sign-offs that used to take days now happen in an hour.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/3DxMGhE7saI1qTTV3k99Qk/fa107f7359d9006bf09f1e9923970c62/image.png)
> 
> **Divya Ruhela,** Solution Architect @ Gamma

The phased approach allowed the team to validate each component under real-world conditions without disrupting the existing service. Deployments are 40% faster on Vercel's pipeline, with preview environments automatically generated on every push.

## [Link to heading](#what-comes-next)What comes next

The next storm season is already on the horizon. When it arrives, the outage map will support sub-second page loads under peak traffic, with data refreshed every five minutes from upstream systems.

Endeavor's engineering team transformed their entire web application, but for their 2.8 million customers, the change is simple: when they reach for the map in the dark, it will be there.

> Going into the next storm season, we're not worrying about the infrastructure. We know the outage map will hold up on Vercel, which lets the team focus on customers instead of the platform.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/6zhHAsFBCvTXcCK8wesbNF/d095dfda0e10fdb249ff4ae98102d2bb/favicon.ico)
> 
> **Jagan Sampath Kumar,** Application Team Leader @ Endeavor Energy

**About Endeavour Energy**: [Endeavour Energy](https://www.endeavourenergy.com.au/) is one of Australia's largest electricity distributors, serving more than 2.8 million people across Western Sydney, the Blue Mountains, the Southern Highlands, and the Illawarra.