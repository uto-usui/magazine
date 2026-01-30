---
title: "Zero-configuration support for Fastify"
source: "https://vercel.com/changelog/zero-configuration-support-for-fastify"
publishedDate: "2025-10-31"
category: "frontend"
feedName: "Vercel"
author: "Austin Merrick"
---

1 min read

Oct 31, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F15HvRmzBeV63MMToxluXTL%2F067a70ee0d1fc0682780164276b53edc%2FVercel___Fastify_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2SV7ct5c7ewbCWqKEF7KHg%2F08609c87420c96087082d72959d08b69%2FVercel___Fastify_-_Dark.png&w=1920&q=75)

Vercel now supports [Fastify](https://fastify.dev/) applications, a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture, with zero-configuration.

src/server.ts

```
import Fastify from 'fastify'const fastify = Fastify({ logger: true })fastify.get('/', async (request, reply) => {  return { hello: 'world' }})fastify.listen({ port: 3000 })
```

A "Hello World" Fastify app on Vercel

Backends on Vercel use [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) by default. This means your Fastify app will automatically scale up and down based on traffic, and you only pay for what you use.

[Deploy Fastify on Vercel](https://vercel.com/templates/backend/fastify-on-vercel) or visit the [Fastify on Vercel documentation](https://vercel.com/docs/frameworks/backend/fastify)