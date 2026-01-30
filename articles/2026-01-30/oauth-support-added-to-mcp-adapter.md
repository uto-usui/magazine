---
title: "OAuth support added to MCP Adapter"
source: "https://vercel.com/changelog/oauth-support-added-to-mcp-adapter"
publishedDate: "2025-07-15"
category: "frontend"
feedName: "Vercel"
author: "Allen Zhou"
---

1 min read

Jul 15, 2025

Secure your MCP servers with OAuth using version `1.0.0` of the [MCP Adapter](https://github.com/vercel/mcp-adapter), which now includes official support for the [MCP Authorization spec](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization). This release introduces:

-   Helper functions for OAuth-compliant authorization flows
    
-   A new `withMcpAuth` wrapper for securing routes
    
-   One-click deployable examples with popular auth providers like Better Auth, Clerk, Descope, Stytch, and WorkOS
    

Here’s an example of how to integrate auth in your MCP server:

app/\[transport\]/route.ts

```
import { createMcpHandler, withMcpAuth } from 'mcp-handler';const handler = createMcpHandler((server) => {  server.tool(    'roll_dice',    'Rolls an N-sided die',    { sides: z.number().int().min(2) },    async ({ sides }) => {      const value = 1 + Math.floor(Math.random() * sides);      return { content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }] };    }  );})const verifyToken = async (  req: Request,  bearerToken?: string,) => {   if (!bearerToken) return undefined;  const isValid = bearerToken === '123';  if (!isValid) return undefined;  return {    token: bearerToken,    scopes: ['read:stuff'],    clientId: 'client123',  };};const authHandler = withMcpAuth(handler, verifyToken, {  required: true, });export { authHandler as GET, authHandler as POST };
```

Additionally, use the `protectedResourceHandler` to expose resource server metadata for compliant clients. Learn more in the [MCP Auth documentation](https://vercel.com/docs/mcp#enabling-authorization).

### [Link to heading](#start-building-secure-mcp-servers)Start building secure MCP servers

Deploy an example MCP server by [cloning our Next.js MCP template](https://vercel.com/templates/ai/model-context-protocol-mcp-with-next-js), or explore starter integrations from our auth partners:

[

**MCP Server with Next.js**

Get started building your first MCP server on Vercel.

Deploy now



](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)