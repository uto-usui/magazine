---
title: "Billions of requests: Black Friday-Cyber Monday 2025"
source: "https://vercel.com/blog/bfcm-2025"
publishedDate: "2025-12-02"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

4 min read

Dec 2, 2025

Every year, Black Friday and Cyber Monday reveal how people shop, browse, and discover products at global scale. For Vercel, the weekend doesn't require a different operating mode. The platform behaves the same way it does [every day](https://vercel.com/blog/just-another-black-friday), only with higher traffic volume.

A [live dashboard](https://vercel.com/bfcm) showed the traffic as it played out.

This year, traffic reached more than 115.8 billion total requests, reflecting 33.6% year-over-year growth with consistent performance throughout the events.

The traffic shape told a familiar story. Requests dipped on Thanksgiving as people stepped away from screens, then surged on Black Friday, stayed elevated through the weekend, and built into a second wave on Cyber Monday.

These rhythms played out across every major geography, and the platform adapted continuously without configuration changes or manual intervention.

Below is a snapshot of what the weekend looked like.

## [Link to heading](#key-metrics-from-the-weekend)**Key metrics from the weekend**

-   **115,836,126,847 total requests** - Global traffic delivered with consistent performance.
    
-   **518,027 peak requests per second -** Traffic delivered at peak demand
    
-   **6,120,247 deployments** - New versions of applications shipped
    
-   **24,086,391 AI Gateway requests** - AI routing kept responses fast across providers
    
-   **43,213,555,901 Fluid compute invocations** - Dynamic workloads scaled automatically
    
-   **56,926,096,915 cache hits** - Fast delivery directly from globally distributed regions
    
-   **1,809,912,897 ISR reads** - Initial regional loads of refreshed content, does not count cached responses
    
-   **1,517,476,504 ISR writes** - Catalog, pricing, and content updates propagated instantly.
    
-   **7,507,223,309 firewall actions** - Threats filtered before reaching applications
    
-   **415,683,895 bots blocked** - Automated abuse stopped early
    
-   **2,408,122,336 humans verified** - Legitimate shoppers passed security checks
    
-   **Top regions:** US, DE, GB, IN, BR, SG, JP - with high activity across all 20 global regions
    

## [Link to heading](#global-scale-and-natural-traffic-rhythms)**Global scale and natural traffic rhythms**

Of the **115 billion requests** that flowed through Vercel from November 28 through December 1, the United States led activity with over **40.7 billion requests**, followed by Germany, the United Kingdom, India, Brazil, Singapore, and Japan. Traffic moved across time zones throughout the weekend, with peaks in one region balanced by lower activity in others.

Vercel handled these shifts the same way it manages everyday production traffic, scaling the global network and compute layer to match real user behavior.

### [Link to heading](#ai-gateway-supported-ai-native-shopping-at-global-scale)**AI Gateway supported AI-native shopping at global scale**

AI continued to shape how shoppers discovered products, searched catalogs, and received personalized help. More than **24 million AI requests** passed through [AI Gateway](https://vercel.com/ai-gateway) across the BFCM window. Retailers used AI for search, recommendations, guided browsing, and customer support. AI Gateway routed these queries across providers and regions, maintaining low latency and resilience even when demand fluctuated.

AI is now part of the normal shopping experience. Routing, failover, and provider coordination are essential when millions of customers depend on AI-powered workflows. AI Gateway delivered this consistency at global scale.

### [Link to heading](#fluid-compute-matched-real-traffic-automatically)**Fluid compute matched real traffic automatically**

[Fluid compute](https://vercel.com/fluid) handled more than **43.2 billion function invocations** across the weekend. Teams used it for personalization logic, cart behavior, content evaluation, and AI inference. Fluid adjusts instantly to incoming traffic. Capacity increases the moment volume rises and scales back when demand settles. With automated pre-warming, and no tuning or configuration required.

This elasticity is part of the platform’s normal operation and ensures applications stay responsive regardless of traffic shape.

### [Link to heading](#incremental-static-regeneration-kept-content-fresh-and-fast)**Incremental Static Regeneration kept content fresh and fast**

Product catalogs, pricing details, inventory indicators, and promotions changed continuously throughout the event. ISR processed more than **1.8 billion reads** and **1.5 billion writes**, refreshing content across the CDN without requiring redeploys or adding strain to backend systems.

Shoppers received accurate information at static performance speeds, even as merchandisers updated content minute by minute.

### [Link to heading](#security-systems-filtered-billions-of-unwanted-requests)**Security systems filtered billions of unwanted requests**

Security activity increased alongside customer traffic. More than **7.5 billion firewall actions** were taken across system rules and customer-defined WAF logic. These protections stopped invalid and malicious traffic at the edge, preserving compute capacity and ensuring stable performance.

Bot Management also operated at massive scale. More than **415 million bot attempts** were identified and blocked, while more than **2.4 billion** legitimate human interactions were verified through invisible checks by both [Vercel BotID](https://vercel.com/docs/botid) and system security defenses. Retailers protected checkout flows, inventory endpoints, and account systems without introducing friction.

### [Link to heading](#caching-delivered-fast-performance-worldwide)**Caching delivered fast performance worldwide**

More than **56.9 billion requests** were served directly from Vercel’s global cache. These cache hits reduced latency, decreased backend load, and ensured fast page delivery throughout the weekend. Caching works in tandem with ISR and Fluid compute, forming a multi-layer performance system where static assets stay fast, dynamic updates propagate instantly, and compute is reserved for real application logic.

### [Link to heading](#a-platform-built-for-everyday-traffic,-even-when-every-day-is-bigger)**A platform built for everyday traffic, even when every day is bigger**

The 2025 traffic profile reinforces that large events do not require special preparation when the delivery layer is built to adapt to real user behavior. Cache hits, ISR updates, Fluid compute, AI routing, and firewall filtering worked together to absorb global demand. Development teams deployed more than **6.1 million** times across the weekend, shipping updates continuously with the confidence provided by instant rollbacks and predictable reliability.

[

**How you can build for peak traffic with Vercel and Contentful**

Watch this video on-demand to see how you can build for traffic surges, with optimized caching strategies and self-driving infrastructure.

Build for peak traffic



](https://vercel.com/go/bfcm-webinar-contentful-vercel)

### [Link to heading](#looking-ahead)**Looking ahead**

As AI-driven experiences expand, as personalization deepens, and as global traffic patterns evolve, the infrastructure behind these applications must adapt at the speed of real users. Vercel’s software layer does this every day. Black Friday through Cyber Monday simply highlight the scale of normal operations.

If you are preparing for your next peak moment, explore how AI Gateway, Fluid compute, ISR, and Vercel’s security tools fit into your architecture. The teams who thrive during high-pressure events are the ones who adopt adaptive infrastructure before they need it.

[

**Deploy your own BFCM website**

Design engineer and v0 user, Abil Shrestha, rebuilt our Black Friday-Cyber Monday site and published it as a forkable template you can try today.

Fork the v0 app



](https://v0.app/templates/vercel-blackfriday-map-hUI7hCyGNye)