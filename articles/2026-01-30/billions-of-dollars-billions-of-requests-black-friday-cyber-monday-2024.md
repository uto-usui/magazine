---
title: "Billions of dollars, billions of requests: Black Friday-Cyber Monday 2024"
source: "https://vercel.com/blog/black-friday-cyber-monday-2024-recap"
publishedDate: "2024-12-03"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

3 min read

Dec 3, 2024

The Black Friday-Cyber Monday (BFCM) stakes are high. Billions of dollars are on the line with consumers racing to save money over the biggest shopping days of the year.

This year, Vercel celebrated the success of our customers by building a [live dashboard](https://vercel.com/bfcm) showing activity across the platform for BFCM.

![Final Black Friday-Cyber Monday 2024 metrics on Vercel](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F92sagyaHdMHHU86zNKw8C%2F7b98485575f0737b6270e219846121fe%2Fvercel-bfcm-2024-final-metrics-light.png&w=1920&q=75)![Final Black Friday-Cyber Monday 2024 metrics on Vercel](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3d2vtg4TmCUu1czLtmXRji%2F79c8c58ca2d3760cc6466c63c6bbc1f9%2Fvercel-bfcm-2024-final-metrics-dark.png&w=1920&q=75)

Final Black Friday-Cyber Monday 2024 metrics on Vercel

During BFCM 2024, Vercel handled:

-   **86,702,974,965** requests
    
-   **1,937,097** peak requests per second
    
-   **2,454,917** deployments
    
-   **3,052,195,860** system-triggered Vercel Firewall blocks
    
-   **519,841,270** customer-specific Vercel Web Application Firewall blocks
    

Vercel experienced **99.9992% uptime** throughout BFCM. Top ecommerce brands like Under Armour, Fanatics, and ASICS trust Vercel’s [Managed Infrastructure](https://vercel.com/docs/infrastructure) to handle the demand and ship with confidence.

> Last Black Friday and Cyber Monday was the first in NZXT’s 20-year history with zero downtime. That literally translates to millions of dollars.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/01qtzFO3wzCnV7THL8zweS/3b979b89f8a7a6094f0328962c7df320/NZXT_logo.png)
> 
> **Director of Engineering,** NZXT

## [Link to heading](#scaling-to-meet-extraordinary-demand)**Scaling to meet extraordinary demand**

At peak times, Vercel served **270K+ legitimate requests per second** while also mitigating **1.75M+ DDoS requests per second**. Additionally, **28.9B+ functions were invoked** (including Serverless Functions, Edge Functions, and Edge Middleware). Every layer of Vercel’s infrastructure made this possible—scaling up and down dynamically, so you don’t need to worry about traffic spikes.

-   [Function failover regions](https://vercel.com/docs/functions/runtimes#failover-mode): If a region becomes unresponsive, Vercel will automatically failover to a healthy region. No redeployments required
    
-   [Auto-scaling concurrency](https://vercel.com/docs/functions/runtimes#automatic-concurrency-scaling): All functions on Vercel scale automatically based on demand to manage increased traffic loads. This is ideal for unpredictable traffic
    

## [Link to heading](#optimized-for-speed-and-personalization)**Optimized** for speed **and personalization**

Vercel helps to ensure optimal speed, responsiveness, reliability, and overall efficiency of your app, which is key for converting visitors into customers. [Studies have shown](https://www.gigaspaces.com/blog/amazon-found-every-100ms-of-latency-cost-them-1-in-sales) that slow experiences result in lost sales. Dynamic content, external connections, and personalized experiences don't have to be slow.

Vercel saw **60M+ requests to checkout paths** and also handled **734M+ connections to ecommerce platforms** (BigCommerce, Salesforce Commerce Cloud, Shopify, and Stripe).

-   [Edge Middleware](https://vercel.com/docs/functions/edge-middleware): Server-side personalization helps deliver tailored experiences without relying on the client side. This reduces visible artifacts while delivering a dynamic experience tailored to user behavior, location, or segmentation data
    
-   [Incremental Static Regeneration (ISR)](https://vercel.com/blog/isr-a-flexible-way-to-cache-dynamic-content): Static assets can be created, updated, and automatically cached on your site without redeploying. This allows for better performance, reduced backend load, faster builds, and higher availability
    

## [Link to heading](#shipping-on-fridays,-and-throughout-the-weekend)Shipping on Fridays, and throughout the weekend

During BFCM, customers proved they’re ready to deploy on Fridays—and even weekends. Vercel did **2.4M+ deployments**, transforming code into production-ready infrastructure. With instant rollbacks, teams confidently shipped last-minute updates, fixes, and improvements.

-   [Framework-defined infrastructure:](https://vercel.com/blog/framework-defined-infrastructure) For each deployment, Vercel analyzes your code to allocate fast, scalable, and secure global infrastructure
    
-   [Instant Rollbacks](https://vercel.com/docs/deployments/instant-rollback): With one click, you can restore a previous deployment. This can be useful in situations that require a swift recovery from accidental bugs, allowing you to ship with confidence even during peak usage
    

## [Link to heading](#secure-by-default)Secure by default

The Vercel Web Application Firewall (WAF) provides L3/L4 protection at every edge location, so your site stays protected without adding latency. Over BFCM, the Firewall handled **3B+ blocks, 2.2B+ challenges**, and **519M+ custom WAF blocks**, for a total of **6.3B+ Firewall actions** (including logging and other non-blocking events)**.**

-   [DDoS mitigation](https://vercel.com/docs/security/vercel-firewall#ddos-mitigation): Vercel’s automated DDoS mitigation blocks incoming traffic identified as abnormal or suspicious without any manual configuration, saving resources for legitimate traffic
    
-   [Web Application Firewall (WAF)](https://vercel.com/docs/security/vercel-firewall#web-application-firewall-waf): WAF blocks specific requests based on your own business logic, allowing you to strengthen your security and helping you maintain control of your sites. [Persistent actions](https://vercel.com/docs/security/vercel-waf/custom-rules#persistent-actions) stop repeat offenders early, blocking their requests within a specified timeframe and preventing unnecessary costs
    

## [Link to heading](#looking-ahead-to-2025)Looking ahead to 2025

Overall, Vercel saw **80% growth in peak requests per second from BFCM 2023 to 2024.** From blocking billions of threats to powering millions of deployments, this BFCM showed companies can ship confidently on Vercel, even on the busiest days of the year. Vercel provides the reliability and performance you need without worrying about infrastructure, giving you time to focus on building the best experience for your customers.

Congratulations to our customers on a record-breaking BFCM on Vercel. We look forward to helping you achieve an even better BFCM in 2025.

[

**Prepare for BFCM 2025**

If you’re looking ahead to next year’s BFCM, watch the recording of our Black Friday 2025 virtual event hosted by Vercel CTO Malte Ubl.

Watch now



](https://vercel.com/go/black-friday-2025?utm_source=vercel-site&utm_medium=blog&utm_campaign=WBN-Beyond-Black-Friday-2024-12-10)

> It’s just a pity we didn’t go sooner. Next.js and Vercel make our developers happier, make us go to market quicker, and let us move with confidence.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/7mlje7mNxEK4jvgqWKu507/bc064f44b3a0fc67695e354003fb3d1c/image.png)
> 
> **Jonathan Lemon,** Software Engineering Manager at Sonos