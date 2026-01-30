---
title: "Bun runtime on Vercel Functions"
source: "https://vercel.com/blog/bun-runtime-on-vercel-functions"
publishedDate: "2025-10-28"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

4 min read

Oct 28, 2025

We now support [Bun](https://bun.com/) as a [runtime option for Vercel Functions](https://vercel.com/docs/functions/runtimes/bun), available in Public Beta. You can choose between Node.js and Bun for your project, configuring runtime behavior based on workload. We're working closely with the Bun team to bring this capability to production.

This flexibility allows you to choose what works best for your use case. Use Node.js for maximum compatibility or switch to Bun for compute-intensive applications that benefit from faster execution.

Through internal testing, we've found that Bun reduced average latency by 28% in CPU-bound Next.js rendering workloads compared to Node.js.

These gains come from Bun's runtime architecture, built in Zig with optimized I/O and scheduling that reduce overhead in JavaScript execution and data handling.

## [Link to heading](#how-to-use-the-bun-runtime)How to use the Bun runtime

The [Bun](https://bun.com/) runtime is currently supported for [Next.js](https://nextjs.org/), [Express](https://expressjs.com/), [Hono](https://hono.dev/), and [Nitro](https://nitro.build/), with support for additional frameworks coming soon.

To enable Bun for your entire project, add the `bunVersion` setting to your `vercel.json` file:

vercel.json

```
{  "bunVersion": "1.x"}
```

Enable Bun runtime support in your app by adding bunVersion to vercel.json

This configuration applies Bun across your entire deployment and integrates with Vercel's observability, logging, and monitoring infrastructure automatically.

Bun supports TypeScript with zero configuration. Here's an example of creating a simple API with Hono:

src/index.ts

```
import { Hono } from 'hono';const app = new Hono();app.get('/', (c) => {  return c.text(`Hello from Hono on Bun ${process.versions.bun}!`);});export default app;
```

Hello World endpoint in Hono with the Bun runtime on Vercel

You can also get started by using one of our starter templates:

The Bun runtime runs on [Fluid compute](https://vercel.com/fluid), which handles multiple concurrent requests on the same instance. [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) means you pay for time spent executing code, not wall-clock time waiting on responses. If your function is waiting for a database query or an API call, you're not being charged for that wait time.

## [Link to heading](#why-runtime-choice-matters)Why runtime choice matters

Applications handle different kinds of workloads. Some perform heavy computation, others handle high request volume or stream large responses. Choosing the right runtime for your application lets you optimize for what matters most.

Bun delivers low-latency performance, efficient streaming, and robust built-in APIs through a safety-focused systems language, while Node.js offers unparalleled ecosystem maturity and broad compatibility for every use case. The choice depends on your application's priorities.

Because Vercel runs native Node.js and Bun runtimes, code runs exactly as it does locally. No emulation or compatibility layers, just full access to each runtime's native capabilities. Switching between them is a configuration change in `vercel.json`.

## [Link to heading](#benchmark-results)Benchmark results

Recently, independent developer [Theo Browne](https://x.com/theo) published [comprehensive benchmarks](https://github.com/t3dotgg/cf-vs-vercel-bench) testing CPU performance across server-side rendering (Next.js, React, SvelteKit) and computational workloads, comparing Cloudflare Workers and Vercel Functions. We analyzed the results in [our previous post](https://vercel.com/blog/fluid-compute-benchmark-results).

We want to thank Theo for this work. Efforts like these surface valuable insights into runtime performance, and healthy competition helps push the entire ecosystem forward, benefiting everybody.

Following the initial benchmarks, improvements were made across the ecosystem. Cloudflare optimized their scheduling algorithm and V8 garbage collection tuning, and [proposed a PR](https://github.com/nodejs/node/pull/60153) to Node.js enabling a V8 flag that improves math operations. Work on OpenNext improved Next.js performance across alternative hosting environments. We profiled our infrastructure and identified bottlenecks in Node.js web streams implementation.

### [Link to heading](#what-we-measured-when-profiling)What we measured when profiling

The original benchmarks measured time-to-first-byte (TTFB), which captures when the server begins sending a response but not the full cost of generating and transmitting it. The benchmarks were updated to measure total request duration (time-to-last-byte). For server rendering workloads, this more accurately represents what users experience, as it includes the complete work of rendering and streaming the response.

We deployed to Vercel with 1 vCPU/2GB in `iad1` (`us-east-1`) and ran the benchmark client from a VM in the same AWS region to minimize network variability.

The benchmarks focused on server-side rendering, the process of generating HTML from React components on the server before sending it to the browser. This differs from client-side rendering, where the browser receives JavaScript and builds the page itself.

Platform overhead is the time spent in infrastructure code before reaching your application. In these tests, platform overhead accounted for only a small fraction of total request time. Nearly all execution occurred inside the application runtime.

Profiling showed that the main bottleneck in Node.js came from its Web Streams implementation and transform operations, where buffer scanning and data conversions added measurable CPU cost. Garbage collection also consumed a significant share of total processing time under heavy load.

For Next.js workloads, Bun cut latency by 28% compared to Node.js. Performance was similar across platforms for React SSR, SvelteKit, and vanilla JavaScript benchmarks. The Next.js performance gains come from Bun's optimized handling of web streams and reduced garbage collection overhead. We expect the numbers for React SSR will improve further once we integrate Bun's optimized `react-dom/server` implementation.

The complete benchmark implementation is [available on GitHub](https://github.com/t3dotgg/cf-vs-vercel-bench).

## [Link to heading](#performance-characteristics-and-tradeoffs)Performance characteristics and tradeoffs

Each runtime has distinct strengths. Bun delivers clear speed improvements for server rendering workloads, while Node.js remains the most compatible and battle-tested environment.

The table below summarizes their key differences:

**Category**

**Bun**

**Node.js**

**Performance**

Faster for CPU-intensive and streaming workloads

Reliable and consistent across workload types

**Cold starts**

Slower than Node.js due to runtime initialization overhead

Mature and well-optimized

**Compatibility**

Implements Node.js APIs with growing coverage; edge-case differences may exist

Full ecosystem compatibility

**Ecosystem maturity**

Rapidly evolving; smaller community

Stable and widely supported across frameworks and libraries

**Best use**

Performance-critical applications

Default for broad compatibility and production stability

Test your dependencies under Bun before migrating production traffic to confirm expected behavior. While Bun implements Node.js APIs, some edge cases may behave differently.

## [Link to heading](#deploy-bun-on-vercel)Deploy Bun on Vercel

The [Bun runtime is now available](https://vercel.com/changelog/bun-runtime-now-in-public-beta-for-vercel-functions) in Public Beta.

We're continuing to expand framework support and optimize performance across both Node.js and Bun. If you hit performance issues or have benchmarks to share, we want to see them.

[

**Try the Bun runtime on Vercel Functions**

Switch between Node.js and Bun with a single configuration change. Available in Public Beta.

Deploy with Bun



](https://vercel.com/changelog/bun-runtime-now-in-public-beta-for-vercel-functions)