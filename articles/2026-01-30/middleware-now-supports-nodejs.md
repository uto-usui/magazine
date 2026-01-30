---
title: "Middleware now supports Node.js"
source: "https://vercel.com/changelog/middleware-now-supports-node-js"
publishedDate: "2025-02-26"
category: "frontend"
feedName: "Vercel"
author: "Gal Schlezinger"
---

1 min read

Feb 26, 2025

Middleware support for the Node.js runtime is now available, providing full Node.js support for authentication, personalization, and more—using familiar APIs.

Middleware continues to be deployed globally on Vercel, regardless of the runtime used. We are first releasing support for Node.js Middleware in [Next.js 15.2](https://nextjs.org/blog/next-15-2).

This experimental feature requires the Next.js canary channel. Upgrade to `next@canary` and enable the `nodejs` experimental flag in your config to use it:

next.config.ts

```
import type { NextConfig } from "next";const nextConfig: NextConfig = {  experimental: {    nodeMiddleware: true, // Enable Node.js middleware  },};export default nextConfig;
```

You must also specify the Node.js runtime in your middleware file:

middleware.ts

```
import type { NextRequest } from "next/server";export function middleware(request: NextRequest) {  // Your middleware logic here}export const config = {  runtime: "nodejs", // Specify the runtime environment as Node.js};
```

[Deploy now](https://vercel.com/templates/next.js/nextjs-boilerplate) with Next.js 15.2.