---
title: "How Factory scaled its cloud backend to one billion monthly requests on Vercel"
source: "https://vercel.com/blog/how-factory-scaled-its-cloud-backend-to-one-billion-monthly-requests-on-vercel"
publishedDate: "2026-08-03"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

### [Copy link to heading](#factory-on-vercel)Factory on Vercel

-   One billion backend API requests served daily
    
-   350ms p95 response time
    
-   Scaled backend, internal tooling, and security without a dedicated infrastructure team
    

[Factory's](https://factory.ai/) mission is to bring autonomy to every phase of the software development lifecycle, from signals to production. Not to replace engineering judgment, but to automate the repetitive work around it, giving engineers more time to focus on the decisions that matter most. To deliver this enterprise-grade platform, Factory adopted their ideal operation model internally: remaining lean and agile by deploying Droids to manage routine workloads, so their engineers could focus strictly on building the product.

As Factory scaled from a simple web app into a multi-surface platform, serving everyone from individual developers to enterprises with tens of thousands of engineers, their backend scaled alongside them. Today, a single [Next.js](https://nextjs.org/docs/app) backend on Vercel powers every surface, handling one billion daily requests across API routes, middleware, and webhook handlers, without becoming a separate engineering project.

> We're doing tens of millions of API requests daily. We've been on Vercel since the beginning and infrastructure has never slowed us down.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/6v0sYVnERWAIQFFMfrMSdp/e648cd82bb5a32b2fba05d938227f7b1/nikita_photo_factor.jpeg)
> 
> — Nikita Lilichenko Technical Staff @ Factory

## [Copy link to heading](#next.js-as-a-full-stack-backend-for-cloud-saas:-api-routes,-middleware,-and-backend-logic-at-scale)Next.js as a full-stack backend for cloud SaaS: API routes, middleware, and backend logic at scale

Most teams think of Next.js as a frontend framework. Factory runs its entire cloud backend on it:

-   API routes handle the customer-facing API, which launched in its own section of their Next.js app
    
-   Middleware manages authentication and routing logic across every surface
    
-   Webhook handlers and log drain pipelines run alongside the web platform, feeding analytics downstream
    

As Factory grew rapidly, the same backend absorbed every new workload. None of it required standing up separate infrastructure or making a new vendor decision. The only areas that required tuning were memory limits and function duration. Both scaled up without incident. [Fluid compute](https://vercel.com/fluid) keeps functions warm across requests, removing the cold start penalty that makes traditional serverless a liability for latency-sensitive workloads. The result is a p95 response time of 350ms or below.

Three years in, the trajectory has been smooth growth without the overhead that typically comes with it.

> When someone needs to write a new route that our web platform needs to use, it’s a no-brainer. We just spin it up in Vercel.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/6v0sYVnERWAIQFFMfrMSdp/e648cd82bb5a32b2fba05d938227f7b1/nikita_photo_factor.jpeg)
> 
> — Nikita Lilichenko Technical Staff @ Factory

## [Copy link to heading](#shipping-internal-tools-without-pulling-engineers-off-product)Shipping internal tools without pulling engineers off product

### [Copy link to heading](#non-technical-teams-were-bottlenecked-on-engineering)Non-technical teams were bottlenecked on engineering

When an account executive needed an internal analytics dashboard or a solution architect needed to deploy a customer prototype, the request went to engineering. Every context switch cost the team shipping product, and they pointed their own product at Vercel to solve the problem.

### [Copy link to heading](#droids-hit-vercel's-apis-to-build-and-deploy-autonomously)Droids hit Vercel's APIs to build and deploy autonomously

Factory's non-technical teams now use their own Droids in the Factory Desktop App or CLI to build what they need and deploy directly to Vercel. Droids reach Vercel programmatically to handle configuration, builds, and deployments end-to-end. Engineers set guardrails and review high-stakes decisions, and Droids handle everything else. That workflow produces dozens of deployments a day across the team, and a growing library of internal tools:

-   Internal analytics dashboards that pull directly from Factory's analytics databases and software tools
    
-   Tailored, customer-specific demos that solutions engineers can build and deploy in minutes
    
-   Custom utilities for one-off internal workflows
    

## [Copy link to heading](#securing-a-consumer-facing-product-with-minimal-security-overhead)Securing a consumer-facing product with minimal security overhead

### [Copy link to heading](#going-self-serve-exposed-factory's-backend-to-a-new-category-of-threat)Going self-serve exposed Factory's backend to a new category of threat

When Factory opened self-serve signups, attacks from automated traffic followed. Bots created fraudulent accounts, and requests flooded in from bad IPs. The team needed route-level protection at the network layer quickly.

### [Copy link to heading](#observability-and-waf-handle-protection-at-the-network-level)Observability and WAF handle protection at the network level

[Vercel Observability](https://vercel.com/docs/observability) gives the team visibility into what's hitting the API, surfacing traffic patterns and problematic IPs as they appear. The [Web Application Firewall](https://vercel.com/docs/vercel-firewall) handles enforcement: the team blocks bad actors with route-level rules, while rate limiting and DDoS protection run continuously beneath the surface.

> We're doing tens of millions of requests daily and I'm not losing sleep over what's hitting the API. Vercel's WAF and rate limiting are just always on, always working.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/6v0sYVnERWAIQFFMfrMSdp/e648cd82bb5a32b2fba05d938227f7b1/nikita_photo_factor.jpeg)
> 
> — Nikita Lilichenko Technical Staff @ Factory

## [Copy link to heading](#what's-next)What's next

Factory uses their own Droids to build Factory. Every internal automation is a future product feature, stress-tested on their own infrastructure first. That loop is about to run at a different scale.

Factory is growing rapidly as it continues to implement and expand its pioneering vision towards autonomous software factories at scale.

> We're growing rapidly and trusting Vercel to scale with us."
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/6v0sYVnERWAIQFFMfrMSdp/e648cd82bb5a32b2fba05d938227f7b1/nikita_photo_factor.jpeg)
> 
> — Nikita Lilichenko Techncial Staff @ Factory

**About** [**Factory:**](https://factory.ai/) Factory is the platform enterprises use to build and operate their software factory: a 24/7 system that continuously turns signals into production software across the entire lifecycle. It's model-agnostic, deploys anywhere from cloud to fully private, and keeps engineers in control as the governance layer. Factory was founded in 2023 by Matan Grinberg and Eno Reyes and is headquartered in San Francisco.