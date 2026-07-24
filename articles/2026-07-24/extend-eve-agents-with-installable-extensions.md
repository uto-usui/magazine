---
title: "Extend eve agents with installable extensions"
source: "https://vercel.com/changelog/eve-extensions"
publishedDate: "2026-07-22"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

You can now package tools, connections, skills, instructions, and hooks into extensions that any [eve](https://eve.dev/) agent can import. Extensions can be published to package registries, then installed, versioned, and upgraded like any other project dependency.

A browser-use extension might ship tools for navigating a site, a memory extension can capture context with hooks and recall it with tools, and a self-improvement extension pairs hooks with dynamic instructions.

Scaffold a new extension with a single command:

```
npx eve@latest extension init crm
```

Scaffolding an extension named crm

This creates the package, installs dependencies, and initializes Git. The generated package is shaped like an agent, with tools, connections, skills, and hooks following the same file conventions.

```
@acme/crm/  package.json  extension/    extension.ts        # defineExtension + config schema    tools/search.ts    connections/api.ts    skills/triage/SKILL.md    instructions.md    hooks/audit.ts    lib/http.ts
```

The generated extension package

When the extension is ready, running `eve extension build` generates the publishable package.

To use an extension, install the package and import it from a file in `agent/extensions/`:

agent/extensions/crm.ts

```
import crm from "@acme/crm";export default crm({ apiKey: process.env.CRM_API_KEY! });
```

Importing and configuring the extension in an agent

The filename sets the namespace, so the extension's search tool runs in the agent as `crm__search`.

Extensions allow you to:

-   Declare a config schema using a standard schema library, such as Zod. Consumer settings are validated on import and typed everywhere the extension reads them.
    
-   Require approval before an extension's tool runs, replace it with your own, or remove it with `disableTool()`.
    
-   Narrow an extension tool's result type in hooks with `toolResultFrom`.
    

Read the [documentation](https://eve.dev/docs/extensions) to get started.