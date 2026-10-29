---
title: "Vercel Plugin now available in OpenCode"
source: "https://vercel.com/changelog/vercel-plugin-now-available-in-opencode"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Vercel"
author: "Vincent Voyer"
---

The [Vercel Plugin](https://vercel.com/plugin) is now available in [OpenCode](https://opencode.ai/).

The plugin provides guidance on Vercel APIs and recommended patterns, with [skills](https://vercel.com/docs/agent-resources/vercel-plugin#available-skills) for AI SDK, Vercel Functions, Workflow, and more. It also includes specialist agents for deployment, performance optimization, and AI application design. Use `/vercel:deploy` to deploy projects and `/vercel:env` to manage environment variables.

The plugin requires OpenCode 2. If you’re using OpenCode 1, [upgrade](https://opencode.ai/docs/cli/#upgrade) with `opencode upgrade --major`.

To install the plugin, run:

```
opencode plugin add github:vercel/vercel-plugin
```

Install the Vercel Plugin in OpenCode 2.

Then run `/mcps` in OpenCode, select **vercel**, and sign in. This connects the [Vercel MCP server](https://vercel.com/docs/agent-resources/vercel-mcp) so OpenCode can access your Vercel projects, deployments, and logs.

Learn more in the [Vercel Plugin documentation](https://vercel.com/docs/agent-resources/vercel-plugin#install-in-opencode).