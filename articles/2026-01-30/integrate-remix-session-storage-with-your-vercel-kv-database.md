---
title: "Integrate Remix session storage with your Vercel KV database"
source: "https://vercel.com/changelog/integrate-remix-session-storage-with-your-vercel-kv-database"
publishedDate: "2023-05-22"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

1 min read

May 22, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FMIF9X6xSw1jSsU9oi08Kb%2F17951d1afc6826d77187eb1bc6b9c115%2Fremix_KV_integration_light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4iqI8sUjy6zLo1W9b63dR2%2F4616dc48199291bbd3caf536a3d1b63d%2Fremix_KV_integration_dark.png&w=1920&q=75)

The Vercel KV product has been sunset. You can now deploy alternative KV stores and other storage solutions through the [Vercel Marketplace Storage](https://vercel.com/marketplace/category/storage?category=storage&search=redis), with automatic account provisioning and unified billing. [Learn more](https://vercel.com/blog/introducing-the-vercel-marketplace).

The release of `@vercel/remix` v1.16.0 introduces a new function, `createKvSessionStorage()`, which allows you to integrate your [Remix](https://vercel.com/templates/remix/remix-boilerplate) session storage with your Vercel KV database in a few lines of code.

Upgrade to `@vercel/remix` v1.16.0 to get started.

[Check out the documentation](https://vercel.com/docs/storage/vercel-kv) to learn more about storage with Vercel KV.