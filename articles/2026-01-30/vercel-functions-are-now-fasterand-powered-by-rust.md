---
title: "Vercel Functions are now faster—and powered by Rust"
source: "https://vercel.com/blog/vercel-functions-are-now-faster-and-powered-by-rust"
publishedDate: "2024-05-03"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

3 min read

May 3, 2024

Vercel Functions run code on demand without the need to manage your own infrastructure, provision servers, or upgrade hardware—and are now powered by Rust under the hood.

We're gradually rolling out these improvements to new deployments, with all customers on our new Rust-powered functions in the coming weeks. No action is required.

We've already served **billions of invocations** on our new system, which has faster executions and slightly lower cost. With our migration to Rust, we've seen:

-   **30% faster cold starts** for smaller workloads
    
-   **80ms faster** (average) and **500ms faster** (p99) for larger workloads
    

We wanted to share more about why we made this change and how we're building a new foundation for future performance and reliability improvements.

## [Link to heading](#why-rust)Why Rust?

We've added new features to Vercel Functions over the years that required extending our base infrastructure primitives. For example, the ability for functions to [stream responses](https://vercel.com/docs/functions/streaming/streaming-examples), have [Web API-based signatures](https://vercel.com/docs/functions/functions-api-reference), [automatic recursion protection](https://vercel.com/changelog/automatic-recursion-protection-for-vercel-serverless-functions), and much more.

As we've profiled and improved function performance for the past year, we saw many opportunities to improve startup times. The first was rewriting the function initialization phase (when it starts up) and the invocation phase (when a request is processed) to use a lower-level language than JavaScript.

While moving to Rust is _not_ a silver bullet, it can greatly improve performance and memory management for certain workloads. After some early experiments, it was clear moving to Rust could produce significant performance wins. The following parts of our function "bridge" are now optimized with Rust:

-   Reading and attaching environment variables
    
-   Spawning the Node.js process
    
-   Streaming and encrypting chunked responses
    
-   Using APIs like `waitUntil` before completing the function invocation
    

## [Link to heading](#how-much-faster-are-vercel-functions)How much faster are Vercel Functions?

We tested our initial hypothesis with a synthetic function benchmark that returned a "hello world" response in US East (running every 15 minutes). This was enough time for the function to become cold (and the response was not cached).

**Vercel Functions, now powered by Rust, were 150ms faster on average** in comparison with our previous version. However, to see if this would really work, we started to validate with a subset of production traffic for vercel.com.

As mentioned above, when a function has a cold start, it goes through two phases: initialization and invocation. When testing with real-world workloads, we saw improvements up to **80ms faster** (average) and **500ms faster** (p99) for larger workloads by moving logic from Node.js to Rust.

When streaming, functions connect to the nearest Vercel Edge Network region from your function. Now powered by Rust, this process was **47% faster** (21ms to 11ms, average) and **77% faster** (120ms to 27ms, p99) for the time to connect.

As a result, the duration customers are billed for is now slightly shorter. This means you'll pay slightly less for the same workloads (since it's faster). This _also_ means all Next.js App Router workloads are faster, which stream by default. This includes other frameworks that produce streaming responses, as well as standalone Vercel Functions.

We also made improvements to our regional routing, which reduced latency further for invocations, especially for new deployments. The result is that you should see consistently faster startups for Vercel Functions. In addition, you can now more easily select different [CPU and memory options](https://vercel.com/changelog/manage-your-vercel-functions-cpu-and-memory-in-the-dashboard) from the dashboard.

## [Link to heading](#what's-next)What's next?

Vercel Functions give you predictable CPU performance, the ability to run dynamic workloads in [multiple regions](https://vercel.com/docs/functions/configuring-functions/region), [automatic SSL and encryption](https://vercel.com/docs/security/encryption), [integrated CI/CD into your Git workflow](https://vercel.com/docs/deployments/git), [preview environments](https://vercel.com/products/dx-platform), [instant rollbacks](https://vercel.com/docs/deployments/instant-rollback), and more—and you can get started for free!

These function improvements will soon be live for all customers. And we're just getting started with performance improvements for our compute products.

In the coming weeks, we'll also share more about automatic optimizations we're making to user code, and ways that we're enhancing concurrency for all functions using I/O bound workloads. [Tune into Vercel Ship](https://vercel.com/ship) to hear more about this, as well.

[Learn more about Vercel Functions](https://vercel.com/docs/functions) or get started [building your first site](https://vercel.com/templates).