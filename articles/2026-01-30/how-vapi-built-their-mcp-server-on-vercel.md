---
title: "How Vapi built their MCP server on Vercel"
source: "https://vercel.com/blog/vapi-mcp-server-on-vercel"
publishedDate: "2025-05-21"
category: "frontend"
feedName: "Vercel"
author: "Elizabeth Trykin"
---

2 min read

May 21, 2025

Vercel recently published a [Model Context Protocol (MCP) adapter](https://vercel.com/changelog/mcp-server-support-on-vercel-4FowFVUeMI2SORXwOBOMfo) that makes it easy to spin up an MCP server on most major frameworks.

[Vapi](https://vapi.ai/) is building an API for building real-time voice agents. They handle orchestration, scaling, and telephony to provide a completely model-agnostic and interchangeable interface for building agents. 

Vapi rebuilt their [MCP server](https://docs.vapi.ai/sdk/mcp-server) on Vercel, letting users create agents, automate testing, analyze transcripts, build workflows, and give agents access to all of Vapi’s endpoints.

## [Link to heading](#what-are-mcp-servers-)What are MCP servers?

MCP servers are integrations for AI models to access external capabilities.

Rather than thinking about MCP like a REST API, you can instead think of it as tailored toolkit that helps an AI achieve a particular task. There may be multiple APIs and other business logic used behind the scenes for a single MCP tool.

If you are already familiar with [tool-calling in AI](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling), MCP is a way to invoke tools hosted on a different server.

## [Link to heading](#migrating-to-vercel)Migrating to Vercel

Vapi’s MCP server was previously deployed to only support the [Server-Sent Events (SSE)](https://v0.dev/chat/QokL3arwn1E) transport. By rebuilding their MCP server using [Vercel's MCP adapter](https://www.npmjs.com/package/@vercel/mcp-adapter), Vapi is now able to support both SSE transport and the newer Streamable HTTP transport out of the box.

Rebuilding their server was accelerated using the Vercel MCP Adapter. Compared to other ways to write and deploy MCP servers, the MCP Adapter is a simple package anyone can drop into a route endpoint of any Node.js compatible framework. It utilizes [widely available web standards](https://vercel.com/blog/evolving-vercel-functions-2Boy2rUPGkv708ud0QsFjj) and, when deployed on Vercel, enables MCP clients to instantly connect and use the server.

Deploying on Vercel allows Vapi to to leverage [Fluid Compute](https://vercel.com/fluid). Fluid Compute maximizes available compute time and resources, which significantly optimizes your compute footprint and efficiency. Specifically for MCP workloads, Fluid will intelligently re-use existing resources to handle multiple MCP client connections before scaling up new ones.

> We're betting on MCP to make integrating Vapi into workflows frictionless. Building on Vercel let us deliver a seamless, reliable experience for our users. Setup was fast, and we're excited for new features like observability and OAuth as our MCP server grows!
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/R7NiPuAbgyeYj9umTcfS8/543079d901b50d2fd4398c5a917b7554/Photo_May_07_2025__6_03_30_PM__1_.jpg)
> 
> **Elizabeth Trykin**

## [Link to heading](#conclusion)Conclusion

Vapi is going all in on Vercel for their MCP server infrastructure. Vercel's suite of products including the MCP Adapter, [Observability](https://vercel.com/changelog/vercel-observability-is-now-generally-available-532QrzDhXIw7fPR1PRhTV1), Fluid Compute, and [Firewall](https://vercel.com/changelog/improved-traffic-visibility-on-firewall-overview-page-3oxkdIUeQgEr35vKHWwYhG) make it easier for Vapi to focus on building their product instead of managing infrastructure.

Check out [Vapi's MCP server](https://mcp.vapi.ai/), their [blog post](https://vapi.ai/blog/vapi-s-mcp-server-is-live-on-vercel), and get started deploying MCP servers with our [Next.js MCP template](https://github.com/vercel-labs/mcp-for-next.js/) today.