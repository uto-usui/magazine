---
title: "Introducing Fluid compute"
source: "https://vercel.com/blog/introducing-fluid-compute"
publishedDate: "2025-02-04"
category: "frontend"
feedName: "Vercel"
author: "Mariano Cocirio"
---

3 min read

Feb 4, 2025

While dedicated servers provide efficiency and always-on availability, they often lead to over-provisioning, scaling challenges, and operational overhead. Serverless computing improves this with auto-scaling and pay-as-you-go pricing, but can suffer from cold starts and inefficient use of idle time.

It’s time for a new, balanced approach. [**Fluid compute**](https://vercel.com/fluid) evolves beyond serverless, trading single-invocation functions for high-performance mini-servers. This model has helped thousands of early adopters maximize resource efficiency, minimize cold starts, and reduce compute costs **by up to 85%**.

## [Link to heading](#what-is-fluid-compute)**What is Fluid compute?**

Fluid compute is a new model for web application infrastructure. At its core, Fluid embraces a set of principles that optimize performance and cost while establishing a vision for meeting the demands of today’s dynamic web:

-   Compute triggers only when needed
    
-   Real-time scaling from zero to peak traffic
    
-   Existing resources are used before scaling new ones
    
-   Billing based on actual compute usage, minimizing waste
    
-   Pre-warmed instances reduce latency and prevent cold-starts
    
-   Supports advanced tasks like streaming and post-response processing
    

All with zero configuration and zero maintenance overhead.

## [Link to heading](#the-evolution-of-vercel-functions)**The evolution of Vercel Functions**

Fluid delivers measurable improvements across a variety of use cases, from ecommerce to AI applications. Its unique execution model combines serverless efficiency with server-like flexibility, providing real benefits for modern web applications.

### [Link to heading](#smarter-scaling-with-higher-ceilings-and-better-cost-efficiency)Smarter scaling with higher ceilings and better cost efficiency

Vercel Functions with Fluid compute prioritize existing resources before creating new instances, eliminating hard scaling limits and leveraging warm compute for faster, more efficient scaling. By scaling functions before instances, Fluid shifts to a [many-to-one model](https://vercel.com/blog/serverless-servers-node-js-with-in-function-concurrency) that can handle tens of thousands of concurrent invocations.

At the same time, Fluid mitigates the risks of uncontrolled execution that can drive up costs. Functions waiting on backend responses can process additional requests instead of sitting idle, reducing wasted compute. Built-in recursion protection prevents infinite loops before they spiral into excessive usage.

### [Link to heading](#cold-start-prevention-for-reduced-latency)Cold start prevention for reduced latency

Fluid minimizes the effects of cold starts by greatly reducing their frequency and softening their impact. When cold starts do happen, a [Rust-based runtime](https://vercel.com/blog/vercel-functions-are-now-faster-and-powered-by-rust) with full Node.js and Python support accelerates initialization. [Bytecode caching](https://vercel.com/blog/introducing-bytecode-caching-for-vercel-functions) further speeds up invocation by pre-compiling function code, reducing startup overhead.

### [Link to heading](#support-for-advanced-tasks)Support for advanced tasks

Vercel Functions with Fluid compute extend the lifecycle of an invocation, enabling function executions to extend beyond when the final response is sent back to a client.

With [`waitUntil`](https://vercel.com/changelog/waituntil-is-now-available-for-vercel-functions), tasks like logging, analytics, and database updates can continue to run in the background of a compute function to reduce time to response. For AI workloads, this means managing post-response tasks like model training updates without impacting real-time performance.

### [Link to heading](#dense-global-compute-and-multi-region-failover)Dense global compute and multi-region failover

Vercel Functions with Fluid compute support a dense global compute model, running compute closer to where your data already lives instead of attempting unrealistic replication across every edge location. Rather than forcing widespread data distribution, this approach ensures your compute is placed in regions that align with your data, optimizing for both performance and consistency.

Dynamic requests are routed to the nearest healthy compute region—among your designated locations—ensuring efficient and reliable execution. In addition to standard [multi-availability zone failover](https://vercel.com/blog/effortless-high-availability-for-dynamic-frontends), for enterprise customers, multi-region failover is now the default when activating Fluid.

### [Link to heading](#open,-portable,-and-fully-supported)Open, portable, and fully supported

Vercel Functions run without proprietary code, ensuring full portability across any provider that supports standard function execution. Developers don’t need to write functions explicitly for the infrastructure—workloads are inferred and automatically provisioned.

With full Node.js and Python runtime support, including native modules and the standard library, Fluid ensures seamless compatibility with existing applications and frameworks—without runtime constraints.

## [Link to heading](#enable-fluid-compute-on-vercel-today)Enable Fluid compute on Vercel today

Fluid compute is available for all users today. Go to the [Functions tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions) in your Project Settings to activate—no migrations or application code changes required.

[

**Enable Fluid compute today**

Fluid is our fast, cost-efficient compute, available today.

Enable Now



](https://vercel.com/docs/functions/fluid-compute#how-to-enable-fluid-compute)

After Fluid is enabled, you can monitor your performance in the [Observability tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability) to track metrics like function performance and compute savings.

Learn more in the [changelog](https://vercel.com/changelog/vercel-functions-can-now-run-on-fluid-compute) and [documentation](https://vercel.com/docs/functions/fluid-compute).

_Acknowledgments: While Fluid is a new compute model, it builds on previous work in the community. We'd like to acknowledge products like Google Cloud Run, and other autoscaling server infrastructure, which has approached solving these problems in similar ways._