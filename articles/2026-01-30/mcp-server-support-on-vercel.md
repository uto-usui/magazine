---
title: "MCP server support on Vercel"
source: "https://vercel.com/changelog/mcp-server-support-on-vercel"
publishedDate: "2025-05-07"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

2 min read

May 7, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F73N0dZEENNBHEK030NFGlR%2F643235f2fbd7c082c7333bb315fab891%2FMCP__6_.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5BgexYzxXsnvPY1u4CxYfl%2Ff40e9ac88f1ba0e333d3f74b4bcc5686%2FMCP__1_.jpg&w=1920&q=75)

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is a way to build integrations for AI models.

Vercel now supports deploying MCP servers (which AI models can connect to) as well as MCP clients ([AI chatbot](https://chat-sdk.dev/) applications which call the servers).

Get started with our [Next.js MCP template](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js) today.

## [Link to heading](#how-is-mcp-different-than-apis)How is MCP different than APIs?

APIs allow different services to communicate together. MCP is slightly different.

Rather than thinking about MCP like a REST API, you can instead think about it like a tailored toolkit that helps an AI achieve a particular task. There may be multiple APIs and other business logic used behind the scenes for a single MCP tool.

If you are already familiar with [tool-calling in AI](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling), MCP is a way to invoke tools hosted on a different server.

MCP now supports a protocol similar to other web APIs, namely using HTTP and OAuth. This is an improvement from the previous stateful [Server-Sent Events (SSE)](https://v0.dev/chat/QokL3arwn1E) protocol.

## [Link to heading](#deploying-mcp-servers-to-vercel)Deploying MCP servers to Vercel

To simplify building MCP servers on Vercel, we’ve published a [new package](https://www.npmjs.com/package/@vercel/mcp-adapter), `@vercel/mcp-adapter`, which supports both the older SSE transport and the newer stateless HTTP transport.

app/\[transport\]/route.ts

```
import { createMcpHandler } from '@vercel/mcp-adapter';const handler = createMcpHandler(server => {  server.tool(    'roll_dice',    'Rolls an N-sided die',    { sides: z.number().int().min(2) },    async ({ sides }) => {      const value = 1 + Math.floor(Math.random() * sides);      return { content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }] };    }  );});export { handler as GET, handler as POST, handler as DELETE };
```

An example MCP server with a single tool call.

The majority of MCP clients currently only support the SSE transport option. To handle state required for the SSE transport, you can integrate a Redis server through any provider in our [marketplace](https://vercel.com/marketplace/category/storage) like Upstash and Redis Labs.

We’ve already seen customers successfully deploying MCP servers in production. One customer has seen [over 90% savings](https://x.com/rauchg/status/1919413544568701138) using [Fluid compute](https://vercel.com/fluid) on Vercel versus traditional serverless. Fluid enables you to have full Node.js or Python compatibility, while having a more cost effective and performant platform for AI inference and agentic workloads.

## [Link to heading](#get-started-with-mcp)Get started with MCP

Vercel's [AI SDK has built-in support](https://ai-sdk.dev/cookbook/next/mcp-tools) for connecting your Node.js or Next.js apps to MCP servers.

We’re looking forward to future MCP servers built with the HTTP transport and starting to explore the latest developments like OAuth support.

[Other Vercel projects like shadcn/ui](https://x.com/shadcn/status/1917597228513853603) are exploring ways to integrate MCP. If you have suggestions for MCP server use cases on Vercel, you can share your feedback in our [community](https://community.vercel.com/).

[

**MCP Server with Next.js**

Get started building your first MCP server on Vercel.

Deploy now



](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)