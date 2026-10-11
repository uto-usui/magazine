---
title: "Skip sending request bodies to Routing Middleware"
source: "https://vercel.com/changelog/skip-sending-request-bodies-to-routing-middleware"
publishedDate: "2026-10-08"
category: "frontend"
feedName: "Vercel"
author: "Shohei Maeda"
---

You can now skip sending client request bodies to [Routing Middleware](https://vercel.com/docs/routing-middleware) with `skipMiddlewareRequestBody`. This reduces incoming [Fast Origin Transfer](https://vercel.com/docs/manage-cdn-usage#fast-origin-transfer) usage for middleware invocations and can improve time to first byte, especially for requests with large bodies.

Enable this option only if your Routing Middleware doesn’t read request bodies. Vercel Functions and rewrite targets still receive the body, so you can read and process it there.

Set `skipMiddlewareRequestBody` to `true` in your project’s JSON configuration file, `vercel.json`:

vercel.json

```
{  "$schema": "https://openapi.vercel.sh/vercel.json",  "skipMiddlewareRequestBody": true}
```

Skip forwarding request bodies to Routing Middleware using vercel.json.

If you use a TypeScript configuration file, add the same setting to `vercel.ts` instead. This example assumes `@vercel/config` is installed:

vercel.ts

```
import type { VercelConfig } from '@vercel/config/v1';export const config: VercelConfig = {  skipMiddlewareRequestBody: true,};
```

Skip forwarding request bodies to Routing Middleware using vercel.ts.

Redeploy your project for the change to take effect. The option defaults to `false`, so existing projects are unchanged unless you enable it.

Read more in the [skipMiddlewareRequestBody documentation](https://vercel.com/docs/project-configuration/vercel-json#skipmiddlewarerequestbody).