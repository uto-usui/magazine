---
title: "Cursor now supported on Vercel MCP"
source: "https://vercel.com/changelog/cursor-now-supported-on-vercel-mcp"
publishedDate: "2025-08-09"
category: "frontend"
feedName: "Vercel"
author: "Mark Roberts"
---

1 min read

Aug 9, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ZKdzahMkW5PfkFRroImuT%2F97abb70643fa54e0dbec49e64fb8af8e%2FLight.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3NqNtEx4eto0pmHCB1BvRf%2F27ea27a15729c8f06a8293c30784b33c%2FDark.png&w=1920&q=75)

You can now use [Cursor](https://vercel.com/docs/mcp/vercel-mcp#cursor) with Vercel MCP, our official [Model Context Protocol (MCP) server](https://vercel.com/docs/mcp/vercel-mcp). To ensure secure access, Vercel MCP currently supports AI clients that have been reviewed and approved by Vercel.

With Vercel MCP you can explore projects, inspect failed deployments, fetch logs, and more, now all without leaving Cursor.

To connect, either use click [here for a one-click setup](cursor://anysphere.cursor-deeplink/mcp/install?name=vercel&config=eyJ1cmwiOiJodHRwczovL21jcC52ZXJjZWwuY29tIn0%3D) or add the following to your `.cursor/mcp.json`:

mcp.json

```
{  "mcpServers": {    "vercel": {      "url": "https://mcp.vercel.com"    }  }}
```

Once added, Cursor will prompt you to log in with your Vercel account.

Read more about using [Cursor in Vercel MCP](https://vercel.com/docs/mcp/vercel-mcp#cursor).