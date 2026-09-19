---
title: "WebMCP support now available in mcp-handler"
source: "https://vercel.com/changelog/webmcp-mcp-handler"
publishedDate: "2026-09-18"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

`mcp-handler` now has experimental support for [WebMCP](https://github.com/webmachinelearning/webmcp), the proposed web standard for exposing tools to in-browser agents. Add a single script tag to your site, and your existing MCP tools become available there too.

Opt tools in by adding them to the `experimental_webMcp` object:

app/api/mcp/route.ts

```
import { createMcpHandler } from "mcp-handler";const handler = createMcpHandler(  (server) => {    server.registerTool("roll_dice", /* ... */);  },  {    experimental_webMcp: {      tools: ["roll_dice"],    },  },);export { handler as GET, handler as POST };
```

Then load the script from your MCP endpoint with the `?webmcp-script` parameter:

```
<script src="/api/mcp?webmcp-script"></script>
```

The script registers those tools with the page and proxies each call back to your MCP server as the signed-in user, so authenticated tools work without a browser-side OAuth flow.

Upgrade to `mcp-handler@2.2.0` and read the [documentation](https://github.com/vercel/mcp-handler/blob/main/docs/WEBMCP.md) to get started.