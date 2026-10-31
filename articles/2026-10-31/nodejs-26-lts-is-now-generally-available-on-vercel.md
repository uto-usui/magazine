---
title: "Node.js 26 LTS is now Generally Available on Vercel"
source: "https://vercel.com/changelog/node-js-26-lts-is-now-generally-available-on-vercel"
publishedDate: "2026-10-29"
category: "frontend"
feedName: "Vercel"
author: "Ali Smesseim"
---

Node.js 26 LTS is now Generally Available for [builds](https://vercel.com/docs/builds) and [Vercel Functions](https://vercel.com/docs/functions).

This release includes:

-   **HTTP/2 by default for built-in** **`fetch`** ([Undici 8](https://undici.nodejs.org/best-practices/migrating-from-v7-to-v8)) lets multiple requests share a connection with servers that support it. This can reduce latency when your functions call APIs or databases over HTTP.
    
-   [**Temporal API**](https://tc39.es/proposal-temporal/docs/) offers an alternative to `Date` with immutable values and built-in time zone and calendar support.
    
-   [**V8 version 14.6**](https://nodejs.org/en/blog/release/v26.0.0), the updated JavaScript engine, adds features such as `Map.prototype.getOrInsert()` to retrieve an existing value or insert a default when a key is missing.
    

## [Copy link to heading](#using-node.js-26)Using Node.js 26

Node.js 26 is the default for all new projects.

-   **Automatic upgrades:** If `engines.node` in your existing project’s `package.json` allows 26, such as `>=20`, your Node.js builds on Vercel will use 26 on the next deployment.
    
-   **Manual upgrades:** Set `engines.node` to `26.x` in your project's `package.json` and redeploy.
    
-   **Prebuilt deployments:** Use [Vercel CLI](https://vercel.com/docs/cli) version 65.8.0 or later to deploy Node.js 26 Functions.
    
-   **HTTP/1.1 in Functions:** To keep HTTP/1.1, set the [`VERCEL_FETCH_DISABLE_H2`](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration) environment variable to `1` and redeploy.
    

Minor and patch updates to Node.js 26 roll out automatically for builds and Vercel Functions.

Read the [Node.js version documentation](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) to learn more.