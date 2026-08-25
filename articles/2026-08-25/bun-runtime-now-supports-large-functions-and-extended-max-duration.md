---
title: "Bun runtime now supports large functions and extended max duration"
source: "https://vercel.com/changelog/bun-runtime-now-supports-large-functions-and-extended-max-duration"
publishedDate: "2026-08-24"
category: "frontend"
feedName: "Vercel"
author: "Florentin Eckl"
---

The [Bun runtime](https://vercel.com/docs/functions/runtimes/bun) on Vercel Functions now supports larger package sizes up to 5GB uncompressed and extended max duration for up to 30 minutes, two betas that previously ran on Node.js and Python only.

Large functions raise the standard 250MB package size limit to 5GB, and extended max duration raises the generally available 800-second ceiling to 1800 seconds for Pro and Enterprise teams. Both features require [Fluid compute](https://vercel.com/docs/fluid-compute) to be enabled. New projects are enrolled in the large functions beta automatically, while existing projects created before _July 2026_ opt in by adding `VERCEL_SUPPORT_LARGE_FUNCTIONS=1` as an [environment variable in your project settings](https://vercel.com/docs/environment-variables/managing-environment-variables), then redeploying. Durations above 800 seconds are set per function in `vercel.json` rather than as a project-level default:

vercel.json

```
{  "$schema": "https://openapi.vercel.sh/vercel.json",  "functions": {    "server.ts": {      "maxDuration": 1800    }  }}
```

Setting a per-function max duration of 30 minutes in vercel.json

The `server.ts` entry point serves the long-running route with Bun:

server.ts

```
Bun.serve({  routes: {    "/": () => Response.json({ success: true })  }});
```

A Bun server entry point for the long-running route

During the beta, these features are unavailable on projects using Secure Compute or Static IPs.

Read the [large functions](https://vercel.com/docs/functions/limitations#large-functions-beta) and [extended max duration](https://vercel.com/docs/functions/configuring-functions/duration#extended-max-duration-beta) documentation.