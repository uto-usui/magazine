---
title: "Deploy Node servers with zero configuration"
source: "https://vercel.com/changelog/deploy-node-servers-with-zero-configuration"
publishedDate: "2026-06-23"
category: "frontend"
feedName: "Vercel"
author: "Ricardo Gonzalez  "
---

You can now deploy a [Node.js server](https://vercel.com/docs/functions/runtimes/node-js) to Vercel with zero configuration.

Vercel detects a `server.ts` file at the project root or at `src/server.ts` and deploys it as a Node.js application, in addition to existing zero-configuration backends like Express, Koa, and NestJS:

server.ts

```
import { createServer } from 'node:http'const server = createServer((req, res) => {  res.end('Hello from Node.js on Vercel!')})server.listen(process.env.PORT ?? 3000)
```

A Node app deployed on Vercel

Vercel CLI can handle local development and deployment:

```
# Run the server locallyvc dev# Create a deploymentvc deploy
```

Both commands pick up server.ts automatically, with no configuration files required.

Backends on Vercel are powered by [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute).

Learn more about the [Node.js runtime on Vercel](https://vercel.com/docs/functions/runtimes/node-js).