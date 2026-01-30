---
title: "Bun runtime now in Public Beta for Vercel Functions"
source: "https://vercel.com/changelog/bun-runtime-now-in-public-beta-for-vercel-functions"
publishedDate: "2025-10-28"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Oct 28, 2025

The Bun runtime is now available in Public Beta for Vercel Functions.

You can choose between Node.js and Bun as your project runtime, selecting the best option for your workload.

[Benchmarks show Bun reduced average latency by 28%](https://vercel.com/blog/bun-runtime-on-vercel-functions#benchmark-results) for CPU-bound Next.js rendering compared to Node.js.

To use Bun in Vercel Functions, set the runtime globally in your project's `vercel.json`:

vercel.json

```
{  "bunVersion": "1.x"}
```

Enable Bun runtime support in your app by adding bunVersion to vercel.json

We currently support the following frameworks, with more on the way:

-   `Next.js`
    
-   `Hono`
    
-   `Express`
    
-   `Nitro`
    

Bun supports TypeScript with zero configuration. Here's an example with Hono:

src/index.ts

```
import { Hono } from 'hono';const app = new Hono();app.get('/', (c) => {  return c.text(`Hello from Hono on Bun ${process.versions.bun}!`);});export default app;
```

Hello World endpoint in Hono with the Bun runtime on Vercel

Or get started with one of our starter templates:

Bun deployments automatically integrate with Vercel's existing logging, observability, and monitoring systems.

See [benchmarks in our blog post](https://vercel.com/blog/bun-runtime-on-vercel-functions), or [read the docs to learn more](https://vercel.com/docs/functions/runtimes/bun).