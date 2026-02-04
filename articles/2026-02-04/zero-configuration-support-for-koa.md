---
title: "Zero-configuration support for Koa"
source: "https://vercel.com/changelog/zero-configuration-support-for-koa"
publishedDate: "2026-02-03"
category: "frontend"
feedName: "Vercel"
author: "Jeff See"
---

1 min read

Feb 3, 2026

Vercel now supports [Koa](https://koajs.com/) applications, an expressive HTTP middleware framework to make web applications and APIs more enjoyable to write, with zero-configuration.

server.ts

```
import Koa from 'koa'import { Router } from '@koa/router'const app = new Koa()const router = new Router()router.get('/', (ctx) => {  ctx.body = { message: 'Hello from Koa!' }})app.use(router.routes())app.use(router.allowedMethods())app.listen(3000)
```

A "Hello World" Koa app on Vercel

Backends on Vercel use [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) by default. This means your Koa app will automatically scale up and down based on traffic, and you only pay for what you use.

Visit the [Koa on Vercel documentation](https://vercel.com/docs/frameworks/backend/koa) for more details.