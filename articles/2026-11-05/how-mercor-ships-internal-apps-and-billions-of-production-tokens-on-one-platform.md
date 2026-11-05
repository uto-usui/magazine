---
title: "How Mercor ships internal apps and billions of production tokens on one platform"
source: "https://vercel.com/blog/how-mercor-ships-internal-apps-and-billions-of-production-tokens-on-one-platform"
publishedDate: "2026-11-03"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

### [Copy link to heading](#mercor-on-vercel)**Mercor on Vercel**

-   Batch jobs cut from 12 hours to 2 hours
    
-   18M requests and 63B tokens routed through AI Gateway in 10 days
    
-   Expert access provisioned in seconds via Vercel Passport
    
-   Over 2,000 projects created by hundreds of internal builders
    

[Mercor](https://www.mercor.com/) connects hundreds of thousands of domain experts with frontier AI labs, helping those labs generate the human data they need to train and evaluate leading models. It also runs large batches of automated grading jobs to evaluate models for labs and enterprises.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7BGe6owwMmt9gwA3i78HsC%2Ff0d040cc9973cb7d1facd7c21c5bbfb0%2Fstudio-batch-run-framed.png&w=1920&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7BGe6owwMmt9gwA3i78HsC%2Ff0d040cc9973cb7d1facd7c21c5bbfb0%2Fstudio-batch-run-framed.png&w=1920&q=95)

Demand arrives in bursts that can push model traffic to peak capacity for days, even as individual evaluation or labeling jobs carry 24-hour deadlines. With so little time to deliver, requests waiting on a provider’s rate limits can put a client’s deadline at risk.

Mercor’s business teams also need applications tailored to each engagement, giving experts a way to see their tasks and progress without waiting for changes to the core platform.

For Aaron Brown, Mercor’s Head of Security, enabling more people to build means making it easier to give them the access they need and keep track of how they use it. Mercor uses [Vercel AI Gateway](https://vercel.com/ai-gateway) to manage model access and [Vercel Passport](https://vercel.com/passport) to handle secure access to their applications.

## [Copy link to heading](#when-model-capacity-becomes-a-customer-deadline)When model capacity becomes a customer deadline

Mercor’s mix of direct integrations and third-party gateways could not provide enough token-per-minute capacity for its open-model workloads when demand surged. As requests hit provider limits and entered retry queues, time-sensitive batch jobs stretched beyond 12 hours, consuming more than half of a client’s 24-hour deadline.

[AI Gateway](https://vercel.com/ai-gateway) provided more inference capacity and failover routing between providers when requests hit rate limits, helping batch work continue instead of waiting in retry queues. Mercor reports that those jobs now finish in 2 to 3 hours, leaving more time to complete the rest of the client’s work. In its first 10 days on Gateway, the team routed 18 million requests and 63 billion tokens, without hitting rate limits.

Mercor continues to use multiple gateways and vendors, valuing Vercel for its combination of model access, controls, and hands-on support when the team needs more capacity. Engineers also get one API for leading foundation model providers and a growing catalog of open models, so they can try a new model without building another provider integration.

## [Copy link to heading](#giving-engineers-room-to-experiment-within-limits)Giving engineers room to experiment within limits

As model use grew, Mercor needed to understand where token spend was going, but its previous setup offered little visibility into usage by team and project. A single loop error in a script could exhaust the available budget.

Hundreds of Mercor engineers now use open models through AI Gateway with per-user keys that carry expiration dates, token limits, and spend limits. Security can give experimentation a budget and an end date, then use the usage records to see which user, project, and workload is driving consumption. Engineers can try different models through the same gateway under those controls, without managing another set of provider credentials each time.

## [Copy link to heading](#managing-access-as-business-teams-build)Managing access as business teams build

A few hundred people across Mercor’s business teams now build applications on Vercel, where the company’s project count has grown from fewer than a dozen to roughly 2,000. Many of those projects are temporary environments for a specific client engagement.

One production use case gives experts detailed views of their project tasks and progress. Rather than ask engineering to add every engagement’s interface to the core platform, business teams build the interfaces themselves and share them with the experts doing the work.

To share those applications, teams need to control who can sign in without taking on a separate authentication setup for every project. Passport provides that common authentication layer, handling sign-in to Vercel deployments through an existing identity provider.

Mercor’s identity team built a product called Audiences, integrating Vercel Passport as a first class primitive, to automate access provisioning. Once a team selects the experts who need access, Audiences creates the IdP group, Vercel connection, and Passport configuration. With that workflow, Mercor reports provisioning access in seconds for audiences ranging from dozens of experts to tens of thousands. Offboarding works the same way in reverse. Because access is derived from the IdP group, removing the group at the end of an engagement removes access to the project, so no stale access is left behind.

## [Copy link to heading](#limiting-what-each-agent-can-do)Limiting what each agent can do

Alongside those applications, Mercor uses agents to answer questions from experts in its marketplace, automate HR workflows, and help employees navigate internal systems. Mercor’s approach is to give each agent narrow permissions suited to its job, rather than everything available to the person who invoked it.

For agents that use open models through AI Gateway, Mercor can also scope model access, set expiration dates, and cap spending. That governs their model use while Mercor separately determines which systems and actions each agent can access.

## [Copy link to heading](#what’s-next)What’s next

Mercor expects more open models to power its internal agents and systems, and more teams outside engineering to build tools for experts. As that work grows, the company wants teams to spend less time setting up model integrations and application authentication so they can respond to client workloads with tight deadlines.

The aim is to make the secure path the fastest path, with shared model access and repeatable authentication workflows helping experts get the tools they need and labs get their work back on time. Mercor wants to support that growth without security work increasing at the same rate.

**About Mercor:** [Mercor](https://www.mercor.com/) is an AI data company that organizes human intelligence for AI training and evaluation. Its network of more than 5M experts, from doctors to lawyers to engineers, powers benchmarks, enterprise evals, RL environments, post-training and agent deployments.