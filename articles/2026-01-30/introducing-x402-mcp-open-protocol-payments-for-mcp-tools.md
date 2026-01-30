---
title: "Introducing x402-mcp: Open protocol payments for MCP tools"
source: "https://vercel.com/blog/introducing-x402-mcp-open-protocol-payments-for-mcp-tools"
publishedDate: "2025-09-12"
category: "frontend"
feedName: "Vercel"
author: "Ethan Niser"
---

2 min read

Sep 12, 2025

AI agents are improving at handling complex tasks, but a recurring limitation emerges when they need to access paid external services. The current model requires pre-registering with every API, managing keys, and maintaining separate billing relationships. This workflow breaks down if an agent needs to autonomously discover and interact with new services.

[x402](https://www.x402.org/) is an open protocol that addresses this by adding payment directly into HTTP requests. It uses the [402 Payment Required status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402) to let any API endpoint request payment without prior account setup.

We built `x402-mcp` to integrate x402 payments with Model Context Protocol (MCP) servers and the Vercel AI SDK.

## [Link to heading](#how-does-x402-help)How does x402 help?

Developers building agents often encounter the same barrier: the agent can call APIs or MCPs, but integrating payments still requires manual setup such as registering accounts, exchanging keys, and configuring billing. The x402 protocol enables programmatic payments as part of the standard HTTP request flow.

Unlike vendor-specific payment APIs, x402 is designed as an open web protocol. It is not tied to any centralized payment provider and can support different payment networks or schemes.

## [Link to heading](#paid-api-routes)Paid API routes

For APIs, protecting routes is as simple as declaring middleware:

```
import { paymentMiddleware } from "x402-next";export const middleware = paymentMiddleware(  {    "/protected": {      price: 0.01,      config: {        description: "Access to protected content"      }    },  });
```

On the client side, consuming these APIs just requires a fetch wrapper:

```
import { wrapFetchWithPayment } from "x402-fetch";const fetchWithPay = wrapFetchWithPayment(fetch, client);const response = await fetchWithPay("https://api.example.com/paid-endpoint");
```

## [Link to heading](#paid-mcp-tools)Paid MCP tools

For MCP servers, `x402-mcp` is a light wrapper around the existing `mcp-handler` package. It adds the ability to define `paidTool`s, which include a price when called.

api/mcp/route.ts

```
import { createPaidMcpHandler } from "x402-mcp";import z from "zod";const handler = createPaidMcpHandler(  (server) => {    server.paidTool(      "add_numbers",      {         // declare a price of $0.001        price: 0.001       },      { a: z.number(), b: z.number() },      async (args) => {        // ...your tool call      }    );  },  { recipient: process.env.WALLET_ADDRESS });export { handler as GET, handler as POST };
```

On the client, payments are added with a single wrapper:

```
import { experimental_createMCPClient as createMCPClient } from "ai";import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";import { withPayment } from "x402-mcp";const mcpClient = await createMCPClient({  transport: new StreamableHTTPClientTransport(url),}).then((client) => withPayment(client, { account }));const tools = await mcpClient.tools();
```

This adds additional tools which enable agents to decide when and how to authorize tool payments over MCP in a transport-agnostic way.

## [Link to heading](#how-the-protocol-works)How the protocol works

The protocol follows the standard HTTP exchange:

1.  The client requests a protected resource
    
2.  The server responds with a 402 status code and payment instructions
    
3.  The client submits payment authorization in a header and retries the request
    
4.  The server verifies and settles the request with an external payment “facilitator”
    
5.  The server returns the resource to the client with payment outcomes in a header
    

Right now most implementations settle as exact, one-time payments in USDC on the Base blockchain, which enables fast and accountless transactions. However, the x402 standard itself is payment-network agnostic and supports other currencies and schemes, including non-crypto payments.

## [Link to heading](#try-the-starter-template)Try the starter template

We created the [x402 AI Starter](https://vercel.com/templates/ai/x402-ai-starter) template that demonstrates x402 in use with our wider suite of AI developer tools: [Next.js](https://nextjs.org/), [AI SDK](https://ai-sdk.dev/), [AI Elements](https://ai-elements.dev/), and [AI Gateway](https://vercel.com/ai-gateway). It has:

-   An API route protected by `paymentMiddleware`
    
-   An MCP server with a `paidTool`
    
-   An MCP client extended with `withPayment`
    
-   A normal page which charges crawlers using x402
    
-   Secure server managed wallets through Coinbase's developer platform
    
-   A frontend AI Chat + API playground to see x402 in action
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6yA0ye6xTOS8kkGGnZMPtW%2F143ca6e8781493c49cd9f820e3ce7362%2FCleanShot_2025-09-11_at_14.19.14_2x.png&w=1920&q=75)

The template deploys to Vercel with [one click](https://vercel.com/new/clone?demo-description=A%20fullstack%20template%20for%20using%20x402%20with%20MCP%20and%20AI%20SDK&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2FRySDRkLC7OpZaTg9gNXRg%2F6010713a043bc3eec14160e796f09acf%2Fscreenshot.png&demo-title=x402%20AI%20Starter&demo-url=https%3A%2F%2Fx402-ai-starter.labs.vercel.dev%2F&env=CDP_API_KEY_ID%2CCDP_API_KEY_SECRET%2CCDP_WALLET_SECRET&envDescription=Coinbase%20Developer%20Platform%20credentials%20are%20needed%20to%20create%20and%20fund%20server%20wallets%2C%20and%20use%20the%20Coinbase%20x402%20facilitator&envLink=https%3A%2F%2Fdocs.cdp.coinbase.com%2Fapi-reference%2Fv2%2Fauthentication&from=templates&project-name=x402%20AI%20Starter&project-names=Comma%20separated%20list%20of%20project%20names%2Cto%20match%20the%20root-directories&repository-name=x402-ai-starter&repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fx402-ai-starter&root-directories=List%20of%20directory%20paths%20for%20the%20directories%20to%20clone%20into%20projects&skippable-integrations=1&teamSlug=ethannisers) and comes with everything needed to start experimenting. Install the package with `npm install x402-mcp` and [check out our live example](https://x402-ai-starter.vercel.app/).

## [Link to heading](#what's-next)What's next

x402 offers a new approach to programmatic payments in AI applications. If you're building agents that need to pay for services, or APIs that want to charge agents, the starter template is a good place to begin exploring.