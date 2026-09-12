---
title: "How Featured's users make 100K media pitches per month on Vercel"
source: "https://vercel.com/blog/how-featureds-users-make-100k-media-pitches-per-month-on-vercel"
publishedDate: "2026-09-11"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

### [Copy link to heading](#featured-on-vercel-)Featured on Vercel

-   3 engineers supporting 3 brands and 100,000+ users on Vercel
    
-   Migrated 374 Sanity sites from AWS Elastic Beanstalk to Vercel
    
-   [AI SDK](https://ai-sdk.dev/) and [AI Gateway](https://vercel.com/ai-gateway) power Featured's chat bot across 17 models
    
-   [Workflow SDK](https://vercel.com/workflows) replaced custom long-running job infrastructure
    

[Featured](https://featured.com/) is a co-pilot for public relations (PR) that subject matter experts and PR teams use to find media opportunities. Tell Featured's agents what you know, and it surfaces opportunities across journalist requests, podcasts, awards, and GEO, with no PR background required.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F16c7URJNPuYzmxKHpEDVO3%2F097863559a5dccafa323772bc5e06b3b%2F5b4d5053-42b0-4fe9-9ad4-8cf38de98d90.png&w=1920&q=95)

Founder Brett Farmiloe knows from experience how hard and time consuming getting press is. He spent 10 years running Markitors, a digital marketing agency with 500 small business clients. Every client, from an eyelash extension supplier to an equipment financing company, had real expertise to share, but no way to get it in front of journalists. PR, as Farmiloe puts it, "has always been about who has access to what." He founded Featured to change the question from who has access to who has knowledge.

Featured connects one of their users with a journalist or publisher every 6 seconds. Their agents deliver more than 100,000 media pitches per month, and have sent over 100 million Help A Reporter Out (HARO) emails in the past year.

Behind it all is an engineering team of just three people. With a team that lean, there's no time to manage servers or piece together custom integrations. Every hour spent on infrastructure is an hour taken away from building features what will help their customers land more media placements.

## [Copy link to heading](#the-cost-of-managing-infrastructure-by-hand)**The cost of managing infrastructure by hand**

Before Vercel, Featured’s infrastructure work pulled the team away from product development. Hosting lived on AWS Elastic Beanstalk, AI features depended on custom provider integrations, and long-running, multi-step jobs ran on separate orchestration infrastructure. Each layer worked, but each one added operational overhead for a three-person team supporting multiple brands.

## [Copy link to heading](#one-platform-for-compute,-ai-primitives,-and-model-access-)One platform for compute, AI primitives, and model access

The migration to Vercel started with a forcing function: Featured needed to launch 374 Sanity sites at once, and every Elastic Beanstalk deploy had to be manually spun up, migrated, and then torn down.

When you multiply that process by almost four hundred, the math doesn't work, even when you divide it across a team of three. Vercel collapsed each site launch into to a single-click deploy.

Once the sites were live, the team evaluated Vercel for background jobs and AI tooling, eventually migrating their entire app and the agents that run in it.

### [Copy link to heading](#compute-without-the-clusters)Compute without the clusters

Deploys that once meant standing up a new EB instance, migrating the URL, and terminating the old one became a single click. On Vercel, all 374 sites shipped from one platform, and rollouts across all three brands now happen centrally, instead of one cluster at a time. "In hindsight, doing each one of those by hand was kind of crazy," Farmiloe admits.

### [Copy link to heading](#ai-sdk-and-ai-gateway:-one-abstraction-for-every-model)AI SDK and AI Gateway: one abstraction for every model

[AI SDK](https://vercel.com/ai-sdk) and [AI Gateway](https://vercel.com/ai-gateway) handle all of Featured's model traffic through a single abstraction, so their team doesn't have to manage custom rate-limit or API integrations from multiple providers.

Featured routes across 17 models at any given time. Calling a model is one standardized function with a schema, and swapping providers is a configuration change instead of a rewrite. When a new model ships, the team can test it against Featured's use cases right away.

### [Copy link to heading](#workflow-sdk-for-long-running-backend-jobs)Workflow SDK for long-running backend jobs

After migrating their AI stack, Featured moved long-running jobs from a separate orchestration system onto [Workflow SDK](https://vercel.com/workflows). These are the processes that can't live in a request cycle: monitoring the media around the clock, qualifying opportunities, and combining all of those signals to deliver more than 100,000 pitches a month.

## [Copy link to heading](#chat-became-the-product)**Chat became the product**

As users kept choosing conversation over navigation, the team made chat Featured's primary interface, and they deliver it through eve, Vercel's open-source agent framework.

eve's `useEveAgent` hook made the new interface easy to implement. Instead of wiring up an agent by hand, the team got durable sessions, streaming, tool calls, and approval prompts out of the box, with model calls routed through AI Gateway so they can pick the right model per task without managing provider keys.

What would have been a months-long rebuild was a week-long replace and refactor. Now, instead of a dashboard with dozens of buttons, users ask Featured questions, and the team adapts the product to their needs, not the other way around.

## [Copy link to heading](#what's-next)What's next

Featured is building toward being the AI layer for public relations, the same way dedicated agent platforms have emerged for legal and finance. The goal is to make it faster and easier for anyone with expertise to share their knowledge and get featured in the media.

The team's advice to other founders building in the agentic era:

-   Know that your data is your moat. For us, access to good information is what lets Featured connect people with the sources that want to publish them.
    
-   Lean on tested abstractions like Vercel instead of reinventing security and infrastructure by hand.
    

**About** [**Featured:**](https://featured.com/) Featured is a co-pilot for public relations that helps people find media opportunities, submit pitches, and get featured in the press. Featured also owns and operates [Help A Reporter Out (HARO)](https://www.helpareporter.com/) and [Connectively](https://www.connectively.us/), journalist request platforms connecting sources with publishers.