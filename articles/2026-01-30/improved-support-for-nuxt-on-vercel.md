---
title: "Improved support for Nuxt on Vercel"
source: "https://vercel.com/blog/nuxt-on-vercel"
publishedDate: "2023-05-05"
category: "frontend"
feedName: "Vercel"
author: "Steph Dietz"
---

2 min read

May 5, 2023

Nuxt applications can now take advantage of Vercel KV, ISR, and more.

We've been partnering with Nuxt to further integrate the framework with Vercel and support all Vercel products. Nuxt on Vercel now supports:

This builds on the integration with other Vercel products like [Functions](https://vercel.com/docs/frameworks/nuxt#edge-functions), [Middleware](https://vercel.com/docs/frameworks/nuxt#middleware), [Image Optimization](https://vercel.com/docs/frameworks/nuxt#image-optimization), and more.

## [Link to heading](#vercel-kv-integration-with-nitro-storage)Vercel KV integration with Nitro Storage

Vercel [recently launched Vercel KV](https://vercel.com/blog/vercel-storage#vercel-kv-a-durable-redis-database), a serverless durable Redis store. We've partnered with the Nuxt team to add support for integrating Vercel KV into Nitro, making fast key-value storage available for your Nuxt apps.

In a few lines of configuration, you can now set up a cache with durable storage for your Nuxt application:

nuxt.config.ts

```
export default defineNuxtConfig({  nitro: {    storage: {      data: { driver: 'vercelKV' }    }  }})
```

Nuxt automatically reads the `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables for your KV database. Then, you can easily store data in any event handler:

```
export default eventHandler(async (event) => {  const storage = useStorage('data');  await storage.setItem('userId', 'id');  return {    id: await dataStorage.getItem('userId'),  };});
```

View a demo of [Vercel KV with Nuxt](https://github.com/danielroe/vercel-kv) or see the [Nitro docs](https://nitro.unjs.io/deploy/providers/vercel#vercel-kv-storage).

## [Link to heading](#static-and-isr-support-for-nuxt)Static and ISR support for Nuxt

Nuxt developers want to choose the best rendering strategy for a given page. With the [Nitro 2.4 release](https://github.com/unjs/nitro/releases/tag/v2.4.0), they can now pick between fully static, fully dynamic, or incrementally updated routes with powerful route rules.

nuxt.config.js

```
export default defineNuxtConfig({  routeRules: {    // all routes will be background revalidated (ISR) at most every 60 seconds    '/**': { isr: 60 },    // this page will be generated on demand and cached permanently    '/static': { isr: true }  },});
```

Nuxt's route rules enable you to opt different routes into the optimal rendering strategy.

View a demo of [ISR with Nuxt](https://github.com/danielroe/nuxt-vercel-isr) to try out route rules.

## [Link to heading](#partnering-with-nuxt)Partnering with Nuxt

We're thrilled the Nuxt team has chosen to build [nuxt.com](https://nuxt.com/), [nuxtlabs.com](https://nuxtlabs.com/), [nuxt.studio](https://nuxt.studio/), [volta.net](https://volta.net/), and more with Vercel.

> We love working with Vercel. They share our values of great DX, zero-configuration and best practices built-in. I'm also really pleased to see the new offerings Vercel have been launching this week. I'm confident they will make Nuxt users' lives easier and better.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/7lCkozY627D2ugE8tP4R5/eeec31da660f8ad0b8694f725a2e825e/T3J9L1PV0-U018A243RM5-76b480416377-512.jpeg)
> 
> **Daniel Roe**

We're excited about our continued sponsorship of the framework and investment into supporting the latest Nuxt features on Vercel.

﻿With Vercel's powerful tools and performance enhancements, Nuxt continues to be a leading choice for web developers looking to build modern, serverless applications.

## [Link to heading](#try-nuxt-on-vercel)Try Nuxt on Vercel

Vercel supports all features of Nuxt out of the box, now including support for Vercel KV as a durable storage layer.

To leverage Vercel KV storage and ISR features for Nuxt, upgrade your Nuxt project to Nitro >= 2.4.0 with `npx nuxi@latest upgrade --force`.

Learn more about [Nuxt on Vercel](https://vercel.com/docs/frameworks/nuxt) or [deploy a Nuxt template](https://vercel.com/templates/nuxt).