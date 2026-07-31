---
title: "Server-Timing response headers will pass through to the client"
source: "https://vercel.com/changelog/server-timing-header"
publishedDate: "2026-07-30"
category: "frontend"
feedName: "Vercel"
author: "Tim Caswell"
---

On August 10, 2026, Vercel's CDN will stop stripping the [Server-Timing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Server-Timing) response header and begin passing it through to the client.

Use `Server-Timing` to report backend metrics like database query time and cache hits. These values appear in the browser's network panel and as [PerformanceServerTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceServerTiming) entries through the Performance API.

```
Server-Timing: db;desc="Database";dur=53,cache;desc="Cache";dur=4.2
```

If you want to keep the current behavior, where the header is stripped from every response, you can add a [transform](https://vercel.com/docs/project-configuration/vercel-json#transform-object-definition) in `vercel.json`:

```
{  "$schema": "https://openapi.vercel.sh/vercel.json",  "routes": [    {      "src": "/(.*)",      "transforms": [        {          "type": "response.headers",          "op": "delete",          "target": {            "key": "server-timing"          }        }      ]    }  ]}
```

Learn more about the [Performance API and Server Timing](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Server_timing).