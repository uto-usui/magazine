---
title: "Logo.dev MCP server"
source: "https://www.logo.dev/docs/mcp/introduction"
publishedDate: "2026-10-20"
category: "design"
feedName: "Sidebar"
---

MCP server

Connect Claude, Cursor, VS Code, Codex, or any MCP client to Logo.dev, and let your agent look up brands, logos, and brandmarks.

The Logo.dev MCP server gives AI agents the Logo.dev API as tools. Your agent can look up a brand by domain, ticker, ISIN, crypto symbol, or name, fetch its logo or brandmark, search brands, and manage webhook subscriptions.

## Transport and sign-in

The server uses the streamable HTTP transport and signs you in with OAuth. The first time you connect, your MCP client opens a browser window where you sign in to Logo.dev. You don’t put a secret key in the client’s configuration. Each tool runs as, and bills to, your team. If you have no team, it runs as your personal account. You don’t need to create an API key for MCP. Each tool has the same access checks, [rate limits](https://www.logo.dev/docs/platform/rate-limits), and [webhook subscription](https://www.logo.dev/docs/webhooks#subscriptions) behavior as the REST route it mirrors. Tool calls count as MCP usage, which spends API credits at the same rates as REST requests.

## Next steps

Was this page helpful?

[

Tools

](https://www.logo.dev/docs/mcp/tools)