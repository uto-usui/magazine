---
title: "Server rendering benchmarks: Fluid Compute and Cloudflare Workers"
source: "https://vercel.com/blog/fluid-compute-benchmark-results"
publishedDate: "2025-10-09"
category: "frontend"
feedName: "Vercel"
author: "Kevin Corbett"
---

4 min read

Oct 9, 2025

Independent developer [Theo Browne](https://x.com/theo) recently published [comprehensive benchmarks](https://github.com/t3dotgg/cf-vs-vercel-bench/blob/main/readme.md) comparing server-side rendering performance between [Fluid compute](https://vercel.com/fluid) and Cloudflare Workers. The tests measured 100 iterations across Next.js, React, SvelteKit, and other frameworks.

The results showed that for compute-bound tasks, Fluid compute performed 1.2 to 5 times faster than Cloudflare Workers, with more consistent response times.

## [Link to heading](#what-the-benchmarks-measured)What the benchmarks measured

The tests used each platform's typical production configuration: Cloudflare Workers with standard constraints (shared CPU, 128MB RAM) and Fluid compute with performance functions (2 vCPU, 4GB RAM). These configurations reflect different architectural approaches. Cloudflare Workers' constraints enable global edge deployment. Fluid compute runs in-cloud with configurable resources.

**Framework performance comparison**

**Framework**

**Platform**

**Mean**

**Min**

**Max**

**Variability**

**Performance**

**Next.js**

Fluid compute

0.534s

0.343s

1.442s

1.098s

**3.55x faster**

Cloudflare

1.895s

0.800s

3.971s

3.171s

**React SSR**

Fluid compute

0.138s

0.059s

0.635s

0.576s

**3.45x faster**

Cloudflare

0.476s

0.227s

1.383s

1.156s

**SvelteKit**

Fluid compute

0.113s

0.058s

0.552s

0.494s

**2.59x faster**

Cloudflare

0.292s

0.078s

1.038s

0.960s

**Math operations**

Fluid compute

0.702s

0.463s

1.136s

0.673s

**2.09x faster**

Cloudflare

1.469s

0.751s

3.387s

2.636s

**Vanilla JS**

Fluid compute

0.208s

0.119s

0.743s

0.624s

**1.06x faster**

Cloudflare

0.220s

0.104s

0.620s

0.516s

Fluid compute averaged 2.55 times faster across these workloads. The variability column shows the range between fastest and slowest response times. For Next.js, Cloudflare responses ranged across 3.171 seconds (from 0.800s to 3.971s) while Fluid responses ranged across 1.098 seconds (from 0.343s to 1.442s).

Individual runs revealed outliers. Roughly one in five Cloudflare requests on Next.js and SvelteKit took 10+ seconds on tasks averaging 1.2 seconds. The same page load might feel instant one moment and frustratingly slow the next.

Users experience individual requests, not averages. For production applications, consistent performance often matters more than fast averages.

## [Link to heading](#how-fluid-compute-works)How Fluid compute works

Fluid compute is the default runtime on Vercel. The architecture makes specific trade-offs to optimize server-side rendering workloads.

### [Link to heading](#in-region-deployment)In-region deployment

Server-rendered applications typically make database queries and API calls during request processing. An application making five database queries per request spends far more time waiting for data than rendering components.

Fluid compute deploys in the same cloud region as your infrastructure. When your database runs in AWS US-East-1, Fluid functions can deploy to AWS US-East-1. This co-location reduces network latency for database queries and API calls. For applications making multiple database queries per request, network proximity affects total request time. JSON serialization, schema validation, API calls to external services, and database queries all involve I/O operations where deployment location matters.

### [Link to heading](#full-runtime-compatibility)Full runtime compatibility

Cloudflare Workers run a custom JavaScript runtime that approximates Node.js behavior. You cannot use `performance.now()` on Cloudflare. The API is frozen due to Spectre mitigation in the isolate model. When Workers run code in an isolate instead of a VM, you share memory with other workers. Security constraints limit which APIs work.

Fluid compute runs standard Node.js and Python. You can specify Node.js 24 or any version. The entire npm ecosystem works without compatibility layers. Frameworks like Next.js, Remix, and SvelteKit assume they're running in Node.js. When the runtime only approximates Node.js, compatibility issues emerge. Packages may not work as expected. Edge cases break. Debugging is harder when the runtime behaves differently than documented Node.js behavior.

### [Link to heading](#concurrency-and-resource-configuration)Concurrency and resource configuration

Fluid compute processes multiple function invocations concurrently on the same environment. Combined with [scale to 1](https://vercel.com/blog/scale-to-one-how-fluid-solves-cold-starts), this approach maintains warm instances and enables efficient resource usage for server-side rendering.

Resources are configurable from 1-4 vCPU and up to 4GB RAM. This flexibility lets you optimize for your workload. Lightweight operations like middleware run efficiently with minimal resources. Compute-intensive operations like server rendering or AI inference can scale up. Both Fluid compute and Cloudflare Workers use CPU-based pricing where you pay for actual compute time.

## [Link to heading](#workload-flexibility)Workload flexibility

Edge deployment works well for specific use cases. Serving static assets from the edge is fast because assets are cached close to users. Simple routing logic or header manipulation works at the edge because these operations don't need database access or heavy computation.

Fluid compute handles both lightweight and compute-intensive workloads on the same platform. High concurrency runs middleware and simple APIs efficiently. Configurable resources handle server rendering and complex application logic. The platform adapts to your workload instead of forcing your workload to adapt to platform constraints.

## [Link to heading](#view-the-benchmarks)View the benchmarks

The complete benchmark implementation and raw results [are available on GitHub](https://github.com/t3dotgg/cf-vs-vercel-bench). The repository includes test code, detailed results, and methodology documentation.

Deployment architecture determines performance characteristics. For server rendering workloads that query databases and perform compute operations, in-region deployment with full runtime compatibility provides measurable advantages.