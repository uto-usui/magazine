---
title: "Agents can now access protected deployments via Vercel’s MCP server"
source: "https://vercel.com/changelog/give-agents-access-to-protected-deployments-via-vercels-mcp-server"
publishedDate: "2025-08-19"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

-   **`get_access_to_vercel_url`** Generates a [shareable URL](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) that allows agent tools such as web fetch or Playwright to access deployments protected by [Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication). The URL is temporary and grants access without requiring login credentials.
    
-   **`web_fetch_vercel_url`** Allows agents to directly fetch content from deployments [protected by Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments), even if a normal fetch would return `401 Unauthorized` or `403 Forbidden`.
    

**Connect to Vercel MCP**

Read the docs to learn more about the server

Get started