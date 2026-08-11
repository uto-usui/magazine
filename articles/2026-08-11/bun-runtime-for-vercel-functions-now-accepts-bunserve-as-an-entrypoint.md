---
title: "Bun runtime for Vercel Functions now accepts Bun.serve as an entrypoint"
source: "https://vercel.com/changelog/bun-serve-entrypoint-for-vercel-functions"
publishedDate: "2026-08-10"
category: "frontend"
feedName: "Vercel"
author: "Florentin Eckl"
---

The [Bun runtime](https://vercel.com/docs/functions/runtimes/bun) for Vercel Functions now supports `Bun.serve()` as a function entrypoint, including WebSocket handlers. The server you run locally with Bun deploys as-is, without being wrapped in a framework.

Enable the runtime by setting `"bunVersion": "1.x"` in `vercel.json`.

### [Copy link to heading](#deploy-a-routes-based-server)Deploy a routes-based server

Create a server with a `routes` map in `server.ts` at the project root.

```
Bun.serve({  routes: {    "/api/boolean": () => Response.json({ success: true }),    "/api/users/:id": (request) => Response.json({ user: request.params.id }),    "/*": () => new Response("api catch-all"),  },});
```

A Bun.serve server deployed to Vercel with static, dynamic, and wildcard routes

### [Copy link to heading](#accept-websocket-connections)Accept WebSocket connections

Add a `websocket` handler and call `server.upgrade(request)` in `fetch` to upgrade matching requests. The rest of the server stays the same.

```
Bun.serve({  routes: {    "/health": Response.json({ status: "ok" }),  },  fetch(request, server) {    const { pathname } = new URL(request.url);    if (pathname === "/ws" && server.upgrade(request)) {      return;    }    return new Response("Not found", { status: 404 });  },  websocket: {    message(socket, message) {      socket.send(message);    },  },});
```

A websocket handler echoes messages back, and fetch upgrades requests to /ws and falls back to a 404

WebSocket connections run on [Fluid compute](https://vercel.com/docs/fluid-compute) with [Active CPU pricing](https://vercel.com/docs/functions/usage-and-pricing), so you pay only for time spent processing messages, not idle connection time. A connection is pinned to one function instance for its lifetime, and a single instance can handle multiple concurrent connections. Use an external data store to coordinate messages across instances.

Read the [documentation](https://vercel.com/docs/functions/runtimes/bun) to get started.