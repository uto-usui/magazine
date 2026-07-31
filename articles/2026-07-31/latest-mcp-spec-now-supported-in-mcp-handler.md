---
title: "Latest MCP spec now supported in mcp-handler"
source: "https://vercel.com/changelog/latest-mcp-spec-now-supported-in-mcp-handler"
publishedDate: "2026-07-30"
category: "frontend"
feedName: "Vercel"
author: "Boris Besemer"
---

`mcp-handler@2.0.0` is now available with support for the [2026-07-28 Model Context Protocol specification](https://modelcontextprotocol.io/specification/2026-07-28/changelog) and [MCP TypeScript SDK v2](https://ts.sdk.modelcontextprotocol.io/v2/).

We originally built [`mcp-handler`](https://vercel.com/changelog/mcp-server-support-on-vercel) to make it easier to spin up MCP servers on popular web frameworks including Next, Nuxt, Svelte, and more.

With the new 2.0 release, the handler now supports:

-   The stateless `2026-07-28` protocol, served natively, including per-request metadata and server/discover
    
-   A stateless compatibility layer for clients using 2025-era Streamable HTTP
    
-   Both protocols with no Redis dependency or session storage
    

Existing stateless Streamable HTTP clients can continue connecting to the same `/mcp` endpoint while servers adopt the latest protocol.

Install the new packages:

```
npm install mcp-handler@^2 @modelcontextprotocol/server@^2 zod@^4
```

Create a Next.js route handler:

app/api/mcp/route.ts

```
import { createMcpHandler } from "mcp-handler";import { z } from "zod";const handler = createMcpHandler((server) => {  server.registerTool(    "roll_dice",    {      description: "Roll an N-sided die",      inputSchema: z.object({        sides: z.number().int().min(2),      }),    },    async ({ sides }) => {      const value = 1 + Math.floor(Math.random() * sides);      return {        content: [          {            type: "text",            text: `🎲 You rolled a ${value}!`,          },        ],      };    },  );});
```

MCP clients can connect to `/api/mcp`.

Get started with the [Next.js MCP server template](https://vercel.com/templates/template/model-context-protocol-mcp-with-next-js), updated for `mcp-handler` 2.0.

## [Copy link to heading](#before-you-upgrade)Before you upgrade

Version 2 requires Node.js 20 or later and zod4, and replaces `@modelcontextprotocol/sdk` with `@modelcontextprotocol/server`.

Tool, prompt, and resource definitions now use the SDK v2 registration APIs and Standard Schema inputs, such as `registerTool` with `z.object(...)`.

The deprecated HTTP+SSE transport has been removed. Requests to `/sse` and `/message` return `410 Gone`. If your clients still depend on that transport, remain on `mcp-handler` 1.x while migrating them to Streamable HTTP.