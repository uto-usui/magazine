---
title: "Deploy xmcp servers with zero-configuration"
source: "https://vercel.com/changelog/deploy-xmcp-servers-with-zero-configuration"
publishedDate: "2025-08-22"
category: "frontend"
feedName: "Vercel"
author: "Anthony Shew"
---

1 min read

Aug 22, 2025

Vercel now supports [xmcp](https://xmcp.dev/), a framework for building and shipping MCP servers with TypeScript, with zero-configuration.

xmcp uses file-based routing to create tools for your MCP server.

```
my-project/├── src/│   ├── middleware.ts│   └── tools/│       ├── greet.ts│       ├── search.ts├── package.json├── tsconfig.json└── xmcp.config.ts
```

File-based routing using xmcp

Once you've created a file for your tool, you can use a default export in a way that feels familiar to many other file-based routing frameworks. Below, we create a "greeting" tool.

```
// src/tools/greet.tsimport { z } from "zod";import { type InferSchema } from "xmcp";export const schema = {  name: z.string().describe("The name of the user to greet"),};// Tool metadataexport const metadata = {  name: "greet",  description: "Greet the user",};export default async function greet({ name }: InferSchema<typeof schema>) {  const result = `Hello, ${name}!`;  return {    content: [{ type: "text", text: result }],  };}
```

Learn more about [deploying xmcp to Vercel](https://vercel.com/docs/frameworks/backend/xmcp) in the documentation.