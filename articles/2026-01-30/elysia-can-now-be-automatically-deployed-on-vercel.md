---
title: "Elysia can now be automatically deployed on Vercel"
source: "https://vercel.com/changelog/support-for-elysia"
publishedDate: "2025-11-17"
category: "frontend"
feedName: "Vercel"
author: "Jeff See"
---

1 min read

Nov 17, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1Je3MLPSbHZFeJ6AU5zUry%2F2f458ecf33ece6847dcbdc12683c5990%2FVercel___Elysia_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3oI71RssL2Q6SBGrkvzzpX%2Fa095e9e0ecf590c48ede3d3c7cee2d3b%2FVercel___Elysia_-_Dark.png&w=1920&q=75)

[Elysia](https://elysiajs.com/), a popular ergonomic TypeScript framework with end-to-end type safety, can now be deployed instantly on Vercel.

When deployed, Vercel will now automatically identify your app is running Elysia and provision the optimal resources to run it efficiently.

src/index.ts

```
import { Elysia } from "elysia";const app = new Elysia()  .get("/", () => `Hello from Elysia, running on Vercel!`);export default app;
```

By default, Elysia will use Node. You can opt-in to the Bun runtime by adding the [bunVersion line](https://vercel.com/docs/functions/runtimes/bun#configuring-the-runtime) below to your `vercel.json`.

vercel.json

```
{  "$schema": "https://openapi.vercel.sh/vercel.json",  "bunVersion": "1.x"}
```

Backends on Vercel use [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) by default, so you only pay for time where your code is actively using CPU.

[Deploy Elysia on Vercel](https://vercel.com/templates/backend/elysia-on-vercel), or visit the documentation for [Elysia](https://vercel.com/docs/frameworks/backend/elysia) or [Bun Runtime](https://vercel.com/docs/functions/runtimes/bun#configuring-the-runtime) at Vercel.