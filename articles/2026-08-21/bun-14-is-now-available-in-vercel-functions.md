---
title: "Bun 1.4 is now available in Vercel Functions"
source: "https://vercel.com/changelog/bun-1-4-is-now-available-in-vercel-functions"
publishedDate: "2026-08-20"
category: "frontend"
feedName: "Vercel"
author: "Florentin Eckl"
---

Vercel Functions now support the new [Bun 1.4 release](https://bun.com/blog/bun-v1.4), a rewrite of Bun from Zig to Rust, with over 2,900 issues resolved, more than 1,500 additional Node.js compatibility tests passing, and new features and performance improvements.

Bun on Vercel Functions:

-   Runs on Fluid compute with [Active CPU pricing](https://vercel.com/docs/functions/usage-and-pricing)
    
-   Supports [WebSockets](https://vercel.com/docs/functions/websockets#bun) and `Bun.serve()`
    
-   Supports common frameworks such as Next.js, Elysia, and Hono
    

To update from the previous Bun version, set `bunVersion` to `1.4.x` in `vercel.json`.

vercel.json

```
{  "bunVersion": "1.4.x"}
```

Upgrading is an explicit opt-in because Bun 1.4 has several [breaking changes](https://bun.com/blog/bun-v1.4#upgrading-to-1-4). Review the breaking changes and update your application before upgrading.

Learn more about using Bun on Vercel in the [runtime documentation](https://vercel.com/docs/functions/runtimes/bun).