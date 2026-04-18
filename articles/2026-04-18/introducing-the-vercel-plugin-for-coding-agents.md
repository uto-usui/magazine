---
title: "Introducing the Vercel plugin for coding agents"
source: "https://vercel.com/changelog/introducing-vercel-plugin-for-coding-agents"
publishedDate: "2026-03-17"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

1 min read

Mar 17, 2026

Claude Code and Cursor can now further understand Vercel projects using the new Vercel plugin and a full platform knowledge graph.

The plugin observes real-time activity, including file edits and terminal commands, to dynamically inject Vercel knowledge into the agent's context. Key capabilities include:

-   **Platform knowledge:** Access 47+ skills covering the Vercel platform, including Next.js, AI SDK, Turborepo, Vercel Functions, and Routing Middleware, powered by a relational knowledge graph
    
-   **Specialized tooling:** Use three specialist agents (AI Architect, Deployment Expert, Performance Optimizer) and five slash commands (`/bootstrap`, `/deploy`, `/env`, `/status`, `/marketplace`)
    
-   **Context management:** An injection engine and project profiler rank, deduplicate, and budget-control loaded context
    
-   **Code validation:** `PostToolUse` validation catches deprecated patterns, sunset packages, and stale APIs in real time
    

Instead of standard retrieval, the plugin compiles pattern matchers at build time and runs a priority-ranked injection pipeline across seven lifecycle hooks. Skills fire when glob patterns, bash regexes, import statements, or prompt signals match, and are then deduplicated across the session to ensure accurate agent responses.

The plugin currently supports Claude Code and Cursor, with OpenAI Codex support coming soon.

Install the plugin via npx:

```
npx plugins add vercel/vercel-plugin
```

Directly in Claude Code via the official marketplace:

```
/plugin install vercel
```

Or directly in Cursor:

```
/add-plugin vercel
```

Explore the source code in the [Vercel plugin repository](https://github.com/vercel/vercel-plugin).