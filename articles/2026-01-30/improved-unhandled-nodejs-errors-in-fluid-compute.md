---
title: "Improved unhandled Node.js errors in Fluid compute"
source: "https://vercel.com/changelog/improved-unhandled-node-js-errors-in-fluid-compute"
publishedDate: "2025-06-12"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Jun 12, 2025

Fluid compute now gracefully handles [uncaught exceptions](https://nodejs.org/api/process.html#event-uncaughtexception) and [unhandled rejections](https://nodejs.org/api/process.html#event-unhandledrejection) in Node.js by logging the error, allowing inflight requests to complete, and then exiting the process.

This prevents [concurrent requests](https://vercel.com/docs/functions/fluid-compute#optimized-concurrency) running on same fluid instance from being inadvertently terminated in case of unhandled errors, providing the isolation of traditional serverless invocations.

[Enable Fluid](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions%23fluid-compute&title=Go+to+Function+Settings) for your existing projects, and learn more in our [blog](https://vercel.com/blog/introducing-fluid-compute) and [documentation](https://vercel.com/docs/functions/fluid-compute).