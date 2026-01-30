---
title: "Just another (Black) Friday"
source: "https://vercel.com/blog/just-another-black-friday"
publishedDate: "2025-10-15"
category: "frontend"
feedName: "Vercel"
author: "Sharon Toh"
---

4 min read

Oct 15, 2025

Vercel customers can treat Black Friday like just another day, ready to scale to billions of requests.

For teams on Vercel, Black Friday is just another Friday. The scale changes, but your storefronts and apps stay fast, reliable, and ready for spikes in traffic.

Many of the optimizations required for peak traffic are already built into the platform. Rendering happens at the edge, caching works automatically, and protection layers are on by default.

What’s left for teams is refinement: confirming observability is set up, tightening security rules, and reviewing the dashboards that matter most.

Last year, Vercel created a live Black Friday Cyber Monday dashboard that showcased our scale in real-time, showing the spikes. Overall, from Friday to Thursday, Vercel served **86,702,974,965** requests across its network, reaching a peak of **1,937,097** requests per second.

[Helly Hansen](https://vercel.com/blog/how-helly-hansen-migrated-to-vercel-and-drove-80-black-friday-growth), a major technical apparel brand, entered the weekend with this confidence. Before the event, they moved from client-heavy rendering to Vercel’s CDN and saw:

-   80% year-over-year increase in revenue
    
-   2x higher conversion
    
-   Zero downtime
    
-   Core Web Vitals shift from red to green
    

Their success came from deliberate performance decisions, not SREs on standby reacting to outages.

## [Link to heading](#defense-that-adapts-to-traffic)Defense that adapts to traffic

At scale, security is as much about maintaining control as it is about protection. The same global network that keeps pages fast also shields them from attacks, automatically absorbing and filtering traffic before it reaches the origin.

Every request goes through a multi-layered firewall, and for Vercel customers, this means the platform firewall has already deflected the largest DDoS attempts long before they reach their apps.

Last year, Vercel's system Firewall triggered **3,052,195,860** request blocks, while our customer-specific Web Application Firewalls blocked **519,841,270** requests.

**Platform Firewall for DDoS**  
Vercel’s Firewall automatically mitigates distributed denial-of-service traffic by filtering requests at the network perimeter. The system dynamically scales its defenses as load increases, so legitimate users continue to see a fast experience even during an attack.

**Business logic and the Vercel Web Application Firewall**  
The Vercel WAF gives teams granular control to apply their own logic at the edge. Instead of static rules, the WAF lets customers define protection around business-critical routes such as checkout, login, or API endpoints. This ensures security is specific to the application, not generic to the network.

**Keeping the experience human**  
Poorly configured bot defenses, or asking your customers to pay traffic light tax, can create friction when traffic spikes. BotID provides invisible CAPTCHA-level protection that automatically distinguishes real usrs from automated agents, without degrading UX.

[

**Understand how Vercel secures your app**

From network protections to Layer 7 granular controls, learn how Vercel's infrastructure provides multi-layered protection for your application.

Learn more



](https://vercel.com/blog/life-of-a-request-securing-your-apps-traffic-with-vercel)

## [Link to heading](#serve-instantly,-update-intelligently)Serve instantly, update intelligently

At high traffic, the goal is not just speed but predictability and origin stability. The CDN must adapt: serve from cache when possible, refresh intelligently, and collapse redundant work. Below are key techniques Vercel uses to achieve this.

**Revalidation that is invisible to users  
**Rather than forcing every user to wait for rebuilds, Vercel supports background revalidation. Pages served stale will trigger regeneration behind the scenes while users still get a fast response.

This means a page may refresh every 5 minutes, but users never see that pause.

**Request collapsing to prevent stampedes  
**When many requests hit an uncached or expired route at once, Vercel’s CDN collapses them into a single regeneration per region. Other requests wait and receive the result. This prevents duplicate work and protects the origin under traffic surges.

[

**Understanding Vercel's infrastructure**

Learn how Vercel's framework-defined infrastructure automatically handles user traffic.

Read the blog



](https://vercel.com/blog/life-of-a-vercel-request-navigating-the-edge-network)

## [Link to heading](#track-performance-&-availability-in-real-time)Track performance & availability in real time

While many companies may insist on a code freeze, Vercel customers didn't stop deploying, with **2,454,917** deployments taking place over this roughly 96 hour window.

To stay confident during peak traffic, you need full visibility into how your system behaves. Not after the fact, but while it’s running.

Observability gives you that insight: you can see latency, errors, cache behavior, and resource usage across every layer. On Vercel, that means monitoring everything from network requests to function invocations and real user metrics.

**Built-in insights by layer**

In the Observability dashboard, you can view metrics across these layers:

-   Cache hit/miss rates, request count per region, traffic by path and bot category
    
-   Vercel Function invocation counts, error rates, and latency
    
-   Upstream latency and error rates to pinpoint third-party slowdowns
    
-   Revalidation frequency and cache efficiency
    
-   Real-user metrics aggregated over time to see how performance truly feels
    

**Custom queries and anomaly alerts**

You can write custom queries to investigate traffic, like sustained latency above threshold, error spikes, or rising cache miss rates.

Anomaly alerts, available for Pro and Enterprise users in public beta, can notify you at the earliest signs of unusual app activity.

**Unified signal streams**

Vercel lets you stream logs, traces, analytics, and performance data into your existing tools via Drains. You get correlated signal: a slow function call can be tied to a trace, enriched logs, and a decline in web vitals. This unified view helps you quickly root-cause regressions.

[

**Black Friday Cyber Monday readiness with Vercel**

Peak season punishes slow sites and shaky architectures. With Vercel, you can harden the critical pages in weeks. See how.

Register Now



](https://vercel.fyi/QNt4TbT)

## [Link to heading](#get-ready-for-black-friday-with-vercel)Get ready for Black Friday with Vercel

Vercel’s global network absorbs traffic spikes, serves content from cache, and revalidates pages in the background. Built-in observability tracks performance and availability in real time so teams can monitor and adjust during peak load.

Make Black Friday just another fast, reliable day on your platform. Our team can help you validate your setup, apply the right protections, and optimize your caching strategy before traffic peaks.

[Talk to sales](https://vercel.fyi/DHnY84q) to build a tailored readiness plan, or join our [Black Friday Cyber Monday readiness webinar](https://vercel.fyi/QNt4TbT) for a full walkthrough, best practices checklist, and a free site readiness assessment tool.