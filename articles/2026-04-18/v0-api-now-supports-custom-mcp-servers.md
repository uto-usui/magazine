---
title: "v0 API now supports custom MCP servers"
source: "https://vercel.com/changelog/v0-api-now-supports-custom-mcp-servers"
publishedDate: "2026-03-06"
category: "frontend"
feedName: "Vercel"
author: "Max Leiter"
---

1 min read

Mar 6, 2026

The v0 API now supports [connecting to any custom MCP server](https://v0.app/docs/api/platform/reference/mcp-servers/create). Teams can configure new servers programmatically by providing the necessary endpoint and authentication details.

```
import { v0 } from "v0-sdk"const server = await v0.mcpServers.create({  name: "Vercel",  url: "https://mcp.vercel.com",})
```

Once configured, you can make these custom servers available directly during a v0 chat session by referencing the server ID:

```
import { v0 } from "v0-sdk"await v0.chats.create({  message: "Build a heatmap of my team's Vercel deployments.",  mcpServerIds: [server.id],})
```

Visit the [v0 API docs](https://v0.app/docs/api/model).