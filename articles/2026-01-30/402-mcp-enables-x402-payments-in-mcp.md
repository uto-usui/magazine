---
title: "402-mcp enables x402 payments in MCP"
source: "https://vercel.com/changelog/402-mcp-enables-x402-payments-in-mcp"
publishedDate: "2025-09-12"
category: "frontend"
feedName: "Vercel"
author: "Ethan Niser"
---

1 min read

Sep 12, 2025

Introducing [`x402-mcp`](https://github.com/ethanniser/x402-mcp), a library that integrates with the AI SDK to bring [x402](https://www.x402.org/) paywalls to Model Context Protocol (MCP) servers to let agents discover and call pay for MCP tools easily and securely.

With x402-mcp, you can define MCP servers with `paidTools` that require payment to run, enabling account-less, low-latency, anonymous payments directly in AI workflows. Payments confirm in ~100–200ms, with fees under $0.01 and support for minimums under $0.001.

Getting started is easy, here's how you can define a paid tool:

```
import { createPaidMcpHandler } from "x402-mcp";import z from "zod";const handler = createPaidMcpHandler(  (server) => {    server.paidTool(      "add_numbers",      {         // declare a price of $0.001        price: 0.001       },      { a: z.number(), b: z.number() },      async (args) => {        // ...your tool call      }    );  },  { recipient: process.env.WALLET_ADDRESS });export { handler as GET, handler as POST };
```

And integrating with AI SDK MCP Clients takes just one function to enable payments:

```
import { experimental_createMCPClient as createMCPClient } from "ai";import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";import { withPayment } from "x402-mcp";const mcpClient = await createMCPClient({  transport: new StreamableHTTPClientTransport(url),}).then((client) => withPayment(client, { account: process.env.PRIVATE_KEY }));const tools = await mcpClient.tools();
```

Read more about [x402](https://vercel.com/blog/introducing-x402-mcp-open-protocol-payments-for-mcp-tools) or try our full stack [x402 AI Starter Kit](https://x402-ai-starter.vercel.app/).

[

**x402 AI Starter**

Fullstack AI demo of x402 with Next.js, AI SDK, AI Gateway, AI Elements and the Coinbase CDP

Deploy



](https://vercel.com/templates/ai/x402-ai-starter)