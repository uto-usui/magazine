---
title: "Build an MCP server with Nuxt"
source: "https://vercel.com/changelog/build-mcp-server-with-nuxt"
publishedDate: "2026-04-02"
category: "frontend"
feedName: "Vercel"
author: "Hugo Richard"
---

1 min read

Apr 2, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6QbJ9nIhQA5TU0j88ZO3d3%2F7bb4a6115e5325fee773be8a5f477424%2Fnuxt-x-mcp-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1vFnL08x8rVHSCyxhGdgty%2F597b173c421e7b64e85b117f810a565c%2Fnuxt-x-mcp-dark.png&w=1920&q=75)

Developers building AI features with [Nuxt](https://nuxt.com/) can now create Model Context Protocol (MCP) servers directly within their applications using the [Nuxt MCP Toolkit](https://mcp-toolkit.nuxt.dev/).

**Install the module**

```
npx nuxt module add mcp-toolkit
```

The module lets you define tools with Zod validation, expose data as resources, and create reusable prompts. It also includes an integrated MCP Inspector for debugging, middleware support, dynamic definitions, session persistence across tool calls, and a [Code Mode](https://mcp-toolkit.nuxt.dev/advanced/code-mode) that lets models orchestrate multiple tool calls in a single execution.

Read the [documentation](https://mcp-toolkit.nuxt.dev/getting-started/installation) or the [walkthrough guide](https://vercel.com/kb/guide/how-to-build-an-mcp-server-with-nuxt) to start building.