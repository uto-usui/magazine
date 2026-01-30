---
title: "ChatGPT can now integrate with Vercel MCP"
source: "https://vercel.com/changelog/chatgpt-is-now-supported-on-vercel-mcp"
publishedDate: "2025-09-10"
category: "frontend"
feedName: "Vercel"
author: "Anthony Shew"
---

1 min read

Sep 10, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1oZvJK7Ex5BJTJj4u0Q83A%2F74e7effd4f72575b51f8d441eb76e537%2FLight.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5S7sYB9gDV5g2o7XcXBiMV%2Fb7f8ec74280aa21fe0e836de4467ab01%2FDark.png&w=1920&q=75)

You can now use ChatGPT with [Vercel MCP,](https://vercel.com/docs/mcp/vercel-mcp) our official Model Context Protocol (MCP) server. For security, Vercel MCP currently supports AI clients that have been reviewed and approved by Vercel.

Connectors within ChatGPT are available in [beta to Pro and Plus accounts](https://platform.openai.com/docs/guides/developer-mode) on the web.

Follow the steps below to set up Vercel as a connector within ChatGPT:

-   **Enable developer mode:** Go to [Settings → Connectors](https://chatgpt.com/#settings/Connectors) → Advanced → Developer mode.
    
-   **Add Vercel MCP**
    
    -   Open [ChatGPT settings](https://chatgpt.com/#settings)
        
    -   In the Connectors tab, click `Create`
        
        -   Name: `Vercel`
            
        -   MCP server URL: `https://mcp.vercel.com`.
            
        -   Authentication: `OAuth`
            
    -   Click `Create`
        

You should now be able to select Vercel as a connector in [Developer Mode](https://platform.openai.com/docs/guides/developer-mode) chats.

With Vercel MCP you can give agents [access to protected deployments](https://vercel.com/changelog/give-agents-access-to-protected-deployments-via-vercels-mcp-server), [analyze build logs](https://vercel.com/docs/deployments/logs), and more.

Read more about using [AI tools with Vercel MCP](https://vercel.com/docs/mcp/vercel-mcp).

[

**Connect to Vercel MCP**

Read the docs to learn more about the server

Get started



](https://vercel.com/docs/mcp/vercel-mcp#setup)