---
title: "Introducing the Edge Runtime"
source: "https://vercel.com/blog/introducing-the-edge-runtime"
publishedDate: "2022-06-21"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

The Edge Runtime is designed to help framework authors adopt edge computing and provide open-source tooling built on Web standards. It’s designed to be integrated into frameworks (like Next.js) and not for usage in application code.

The Edge Runtime is a subset of Node.js APIs, giving you compatibility and interoperability between multiple web environments. The project is designed to be compliant with standards developed by [WinterCG (opens in a new tab)](https://wintercg.org/) - a community group between Vercel, Cloudflare, Deno, Shopify, and more. The term “Edge” refers to the orientation toward instant serverless compute environments and not a specific set of locations.

Web APIs

Context isolation

Easy to extend

Lightweight

Written in TypeScript

Node.js v16 or higher

## Using the Edge Runtime Locally[](#using-the-edge-runtime-locally)

When developing and testing locally, the Edge Runtime will polyfill Web APIs and ensure compatibility with the Node.js layer.

In production, the Edge Runtime uses the [JavaScript V8 engine (opens in a new tab)](https://v8.dev/), **not** Node.js, so there is **no access** to Node.js APIs.

Get started using Edge Runtime:

-   [Explore the available APIs](https://vercel.com/features/available-apis)
-   [Integrate it in your project](https://vercel.com/packages/runtime)
-   [Test your code with Jest](https://vercel.com/packages/jest-environment) or [Vitest (opens in a new tab)](https://vitest.dev/config/#environment)

[Getting Started](https://vercel.com/getting-started "Getting Started")