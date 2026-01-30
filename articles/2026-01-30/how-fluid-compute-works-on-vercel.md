---
title: "How Fluid compute works on Vercel"
source: "https://vercel.com/blog/how-fluid-compute-works-on-vercel"
publishedDate: "2025-03-03"
category: "frontend"
feedName: "Vercel"
author: "Mariano Cocirio"
---

3 min read

Mar 3, 2025

[Fluid compute is Vercel’s next-generation compute model](https://vercel.com/blog/introducing-fluid-compute) designed to handle modern workloads with real-time scaling, cost efficiency, and minimal overhead. Traditional serverless architectures optimize for fast execution, but struggle with requests that spend significant time waiting on external models or APIs, leading to wasted compute.

To address these inefficiencies, [Fluid compute](https://vercel.com/fluid) dynamically adjusts to traffic demands, reusing existing resources before provisioning new ones. At the center of Fluid is Vercel Functions router, which orchestrates function execution to minimize cold starts, maximize concurrency, and optimize resource usage. It dynamically routes invocations to pre-warmed or active instances, ensuring low-latency execution.

By efficiently managing compute allocation, the router prevents unnecessary cold starts and scales capacity only when needed. Let's look at how it intelligently manages function execution.

## [Link to heading](#coordinating-function-execution)Coordinating function execution

Vercel Functions router applies Fluid principals to optimize execution. It dynamically assigns requests to instances based on real-time metrics such as load, availability, and type.

In turn, Fluid instances process multiple concurrent requests, reducing idle compute cycles and ensuring efficient workload distribution. This interplay between routing intelligence and flexible execution allows Fluid compute to scale responsively, maintaining low-latency performance while preventing over-provisioning and performance degradation.

This optimization is achieved through a secure infrastructure design where instances communicate exclusively through the router via persistent TCP tunnels. Rather than accepting direct traffic, instances establish bidirectional connections with the function router, enabling them to receive incoming invocation data while simultaneously streaming response data back.

This architectural pattern enhances security and enables Vercel Functions router to maintain precise control over workload distribution and scaling decisions.

### [Link to heading](#vercel-functions-router:-efficient-request-management)**Vercel Functions router: Efficient request management**

The router optimizes every request in real time—routing efficiently, selecting the best compute, and scaling dynamically with the following process:

**1\. Routing, security, and caching  
**The moment a [user presses enter](https://vercel.com/blog/life-of-a-vercel-request-what-happens-when-a-user-presses-enter-OS1LtjaoEhdWhzd2MOICP), their request is routed to the nearest Vercel Point of Presence (PoP) via Anycast for the lowest possible latency. Before moving forward:

-   The **Vercel Firewall** inspects traffic, blocking threats like DDoS attacks and suspicious patterns
    
-   If cached at the edge, the response is served instantly
    
-   If execution is required, the request moves to the router
    

**2\. Compute selection and execution  
**Vercel Functions router determines the optimal execution region based on proximity, load, and availability. It then selects the best compute instance:

-   **In-flight instances (active)** are prioritized for efficiency
    
-   **Proactively spawned, pre-warmed instances (currently idle)** minimizes cold starts, while [bytecode caching](https://vercel.com/blog/introducing-bytecode-caching-for-vercel-functions) reduces their start time
    

**3\. Processing and response optimization**  
With an instance assigned, the function begins execution—running logic, querying databases, or calling APIs. If streaming is enabled, responses start flowing immediately as data becomes available, improving Time to First Byte (TTFB).

**4\. Adaptive scaling and resource efficiency  
**To maintain performance and avoid wasting compute, Fluid continuously:

-   Monitors traffic patterns, instance health, and workload fluctuations in real time
    
-   Proactively scales new instances during surges
    
-   Gracefully scales down idle instances to optimize resource use
    

From keystroke to response, Fluid dynamically optimizes execution, intelligently handling every request with speed and efficiency.

## [Link to heading](#reducing-costs-with-fluid)**Reducing costs with Fluid**

Because Fluid prioritizes existing resources with idle capacity, projects with Fluid enabled have **cut compute costs by up to 85%.**

Fluid compute is not just about better scaling, it is about smarter resource usage. By dynamically adjusting to traffic and eliminating idle compute time, Fluid compute ensures you only pay for the compute you actually use.

## [Link to heading](#enable-fluid-compute-on-vercel-today)**Enable Fluid compute on Vercel today**

Enable Fluid compute in [your Project Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions) today—no migrations needed. Available on all plans.

[

**Enable Fluid compute today**

Fluid is our fast, cost-efficient compute, available today.

Enable Now



](https://vercel.com/docs/functions/fluid-compute#how-to-enable-fluid-compute)

Once enabled, visit [your Observability tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability) to track function performance and compute savings.

Learn more about Fluid in the [changelog](https://vercel.com/changelog/vercel-functions-can-now-run-on-fluid-compute) and [documentation](https://vercel.com/docs/functions/fluid-compute).