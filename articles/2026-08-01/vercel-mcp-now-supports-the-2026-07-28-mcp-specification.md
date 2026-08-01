---
title: "Vercel MCP now supports the 2026-07-28 MCP specification"
source: "https://vercel.com/changelog/vercel-mcp-now-supports-the-2026-07-28-mcp-specification"
publishedDate: "2026-07-31"
category: "frontend"
feedName: "Vercel"
author: "Josh Souphanthong"
---

[Vercel MCP](https://mcp.vercel.com/) now supports the 2026-07-28 MCP specification, giving newer clients a stateless request model and updated authorization behavior without any change on the client side.

Clients built for the 2025 protocol keep working exactly as before, and clients that understand the new specification pick it up automatically.

Both protocol versions are served from the same endpoint through the official MCP SDK v2 and `mcp-handler` 2.x, which [added support for the latest spec](https://vercel.com/changelog/latest-mcp-spec-now-supported-in-mcp-handler), so a single connection handles either protocol.

Nothing about setup changes. Add the server the same way you always have.

`npx add-mcp https://mcp.vercel.com`

You can also run `vercel mcp`. See the [Vercel MCP documentation](https://vercel.com/docs/agent-resources/vercel-mcp) to connect your client. For the full list of protocol changes, read the [2026 specification changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog) and the [authorization announcement](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/).