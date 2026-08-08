---
title: "Introducing Agent Plugins 1.0.0"
source: "https://vercel.com/changelog/introducing-agent-plugins-1-0-0"
publishedDate: "2026-08-06"
category: "frontend"
feedName: "Vercel"
author: "Jonathan Hefner"
---

Agent Plugins 1.0.0 is now available. It is an open, vendor-neutral standard for packaging Agent Skills and MCP servers into portable plugins. Compatible agent clients can discover and load them.

Agent Plugins defines a common format: a root `plugin.json` manifest, plus fixed locations for portable components. Each client keeps control of installation, distribution, policy, user experience, and client-specific capabilities.

At launch, Agent Plugins is supported across the following clients:

-   ChatGPT and Codex
    
-   Cursor
    
-   GitHub Copilot
    
-   Kiro
    
-   VS Code
    

Read the [specification and implementation guides](https://agent-plugins.org/), learn more in the [announcement](https://vercel.com/blog/introducing-agent-plugins) post, and [follow our guide](https://vercel.com/kb/guide/agent-plugins) to build a plugin on the new standard.