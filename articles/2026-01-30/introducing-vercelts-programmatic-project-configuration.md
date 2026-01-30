---
title: "Introducing vercel.ts: Programmatic project configuration"
source: "https://vercel.com/changelog/vercel-ts"
publishedDate: "2025-12-19"
category: "frontend"
feedName: "Vercel"
author: "Pranav Karthik"
---

1 min read

Dec 19, 2025

Vercel now supports `vercel.ts`, a new TypeScript-based configuration file that brings type safety, dynamic logic, and better developer experience to project configuration.

`vercel.ts` lets you express configuration as code by defining advanced routing, request transforms, caching rules, and cron jobs, going beyond what static JSON can express. In addition to full type safety, this also allows access to environment variables, shared logic, and conditional behavior.

All projects can now use `vercel.ts` (or `.js`, `.mjs`, `.cjs`, `.mts`) for project configuration. Properties are defined identically to `vercel.json` and can be enhanced using the new `@vercel/config` package.

vercel.ts

```
import { type VercelConfig, routes, deploymentEnv } from '@vercel/config/v1';export const config: VercelConfig = {  framework: 'nextjs',  crons: [    { path: '/api/cleanup', schedule: '0 0 * * *' },    { path: '/api/sync-users', schedule: '*/15 * * * *' },  ],  rewrites: [    routes.rewrite('/(.*)', 'https://external-api.com', {      requestHeaders: {        'proxy-header': deploymentEnv('PROXY_HEADER')      }    }),  ],};
```

[Try the playground](https://vercel-ts-playground.vercel.app/) to explore `vercel.ts`, [learn how to migrate from an existing vercel.json](https://vercel.com/docs/project-configuration/vercel-ts#migrating-from-vercel.json), or read the [documentation](https://vercel.com/docs/project-configuration) and the [@vercel/config package](https://www.npmjs.com/package/@vercel/config).