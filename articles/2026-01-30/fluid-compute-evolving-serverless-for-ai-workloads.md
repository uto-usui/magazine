---
title: "Fluid compute: Evolving serverless for AI workloads"
source: "https://vercel.com/blog/fluid-compute-evolving-serverless-for-ai-workloads"
publishedDate: "2025-05-30"
category: "frontend"
feedName: "Vercel"
author: "Collier Kirkland"
---

4 min read

May 30, 2025

AI’s rapid evolution is reshaping the tech industry and app development. Traditional serverless computing was designed for quick, stateless web app transactions. LLM interactions require a different sustained compute and continuous execution patterns.

This design mismatch presents an opportunity for a new compute model tailored for AI workloads.

### [Link to heading](#llm-interactions:-a-sequence,-not-a-single-request)LLM interactions: A sequence, not a single request

Engaging with an LLM is more than just sending a request and receiving a response. Unlike traditional web apps, where most requests are processed in milliseconds, LLM workloads involve extended execution times and periods of inactivity.

Each interaction follows a multi-step process:

-   **Serverless function is invoked:** The function initializes and prepares to process the LLM request
    
-   **Function sends request to LLM API:** At this stage, the function is actively consuming compute resources
    
-   **Function enters idle state waiting for response:** This can take several seconds to minutes, but the function remains running, accumulating billable time despite doing no useful work
    
-   **LLM completes processing and returns response to function:** The response is received by the waiting function (if still active)
    
-   **Response is streamed back to the client:** If the function timed out during the wait, a new instance must be spun up to handle the response
    
-   **Cycle repeats for subsequent requests:** Each new interaction typically spawns a new function instance, even though existing ones may still be available but underutilized
    

This sequence reveals how architectural assumptions differ between LLM interactions and traditional serverless:

-   **Transaction timing:** Instead of multi-second LLM processing times, traditional serverless was designed for millisecond responses
    
-   **Execution patterns:** Functions were built for single, isolated requests, rather than sequential LLM conversations
    
-   **Resource lifecycle:** The traditional model assumes quick completion over sustained interactions
    
-   **Scaling model:** Horizontal scaling was optimized for short bursts of activity, not continuous AI workloads
    

Traditional serverless computing excels at its intended use case: quick, stateless web transactions. LLM interactions simply represent a different computational paradigm that requires purpose-built infrastructure.

## [Link to heading](#fluid-compute-for-ai-workloads)**Fluid compute for AI workloads**

Fluid, [our new compute model](https://vercel.com/blog/introducing-fluid-compute), reduces total compute consumption by utilizing existing resources before scaling new ones. Instead of launching a new function for every request, it intelligently reuses available capacity, ensuring that compute isn’t sitting idle. This means:

-   **Prioritizing existing resources before spawning new ones**: Fluid scales inside a single instance first (many-to-one), avoiding cold starts and extra spin-ups that increase costs
    
-   **Scaling happens inside a function, not just across instances**: Compute is shared dynamically instead of spawning unnecessary new functions
    
-   **AI conversations remain fluid and cost-efficient**: Users get uninterrupted responses while developers reduce infrastructure inefficiencies
    

A single instance can now process multiple AI inference requests simultaneously, reducing overhead and enabling more efficient scaling. By dynamically reallocating compute where needed, Fluid ensures your AI workloads run at peak performance with every resource actively contributing to processing.

Additionally, Fluid strategically places resources in regions close to your data, optimizing for both performance and consistency while enabling efficient execution of resource-intensive AI workloads.

With Fluid compute, LLM workloads no longer have to choose between scalability and efficiency; they get both. AI apps remain secure and responsive, costs stay predictable, and every function invocation actively contributes to processing, not just waiting**.** Instead of paying for idle compute, Fluid compute ensures every second of function time is fully utilized.

[

**See how Fluid compute works on Vercel**

Fluid compute boosts serverless performance by reusing idle compute during LLM calls, keeping functions active and scaling dynamically.

Learn more



](https://vercel.com/blog/how-fluid-compute-works-on-vercel)

## [Link to heading](#secure-by-default)Secure by default

Beyond optimization, Fluid compute is built on a foundation of security and reliability for the demands of modern AI workloads.

-   **Edge security with Vercel Firewall**: Requests are routed to the nearest Vercel Point of Presence (PoP) and inspected by the Vercel Firewall before reaching the [Vercel Functions router](https://vercel.com/blog/how-fluid-compute-works-on-vercel). This [Layer 7 protection](https://vercel.com/security/web-application-firewall) blocks most application-level threats, including DoS attacks, and filters suspicious traffic, ensuring that only legitimate requests reach your apps
    
-   **Secure instance architecture**: Fluid compute instances are never directly exposed to the internet. Instead, they connect to the Vercel Functions router through secure, persistent TCP tunnels. All communication, including function invocations and responses, flows through this controlled channel, ensuring strong isolation and precise workload management
    
-   **Enhanced reliability and availability**: Fluid automatically fails over across multiple availability zones within a region. For Enterprise customers, [Fluid also has multi-region failover capabilities](https://vercel.com/fluid). These safeguards help ensure uptime and keep your apps resilient in the face of localized disruptions
    

This layered security model ensures that Fluid delivers performance and efficiency without compromising the protection required for sensitive AI workloads.

## [Link to heading](#start-building-with-ai)**Start building with AI**

AI workloads require more than just scale. They require efficiency and security**.** Fluid compute ensures full resource utilization, ultimately reducing costs while delivering secure, high-performance execution.

It’s the infrastructure AI teams have been looking for: fast, adaptive, and built to support real-time inference and background tasks. [Fluid compute is now the default for new projects](https://vercel.com/changelog/fluid-compute-is-now-the-default-for-new-projects), and can be [enabled for existing projects](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions%23fluid-compute&title=Go+to+Function+Settings).

[

**Deploy an AI-powered app with Fluid compute today**

Optimize your AI applications with Fluid compute and maximize your compute.

Get started



](https://vercel.com/templates/ai)