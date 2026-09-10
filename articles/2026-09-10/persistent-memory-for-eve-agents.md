---
title: "Persistent memory for eve agents"
source: "https://vercel.com/changelog/persistent-memory-for-eve-agents"
publishedDate: "2026-09-09"
category: "frontend"
feedName: "Vercel"
author: "Andrew Barba"
---

[eve](https://eve.dev/) agents can now retain context across sessions and use it in future conversations.

Persistent [memory](https://eve.dev/docs/memory) is organized into slots. You can define named slots in files under `agent/memory/`. Each slot specifies a provider, which stores and retrieves the memory, and a scope, which determines who or what shares it. For example, you can keep separate memory for each authenticated user.

Before each turn, eve retrieves relevant memory and adds it to the model's context. Depending on the provider, memory can be updated automatically after a turn, through tools the agent uses, or through both methods.

To add eve's built-in file memory provider, run:

```
eve add memory/file
```

Add eve’s built-in file memory provider.

The command creates a `file` memory slot scoped to each authenticated caller:

agent/memory/file.ts

```
import { defineMemory } from "eve/memory";import { fileMemory } from "eve/memory/file";import { byPrincipal } from "eve/memory/scope";export default defineMemory({  description: "Remember useful details from previous conversations.",  provider: fileMemory(),  scope: byPrincipal,});
```

Configure file memory separately for each authenticated user.

For agents deployed on Vercel, file memory uses a private [Vercel Blob](https://vercel.com/docs/vercel-blob) store so saved memories persist across restarts and deployments.

Other supported memory providers include [Supermemory](https://eve.dev/docs/memory#supermemory), [Upstash AgentKit](https://eve.dev/docs/memory#upstash-agentkit), and [Kybernesis Arcana](https://eve.dev/docs/memory#kybernesis-arcana). You can also connect another storage system or memory service by [building a custom provider](https://eve.dev/docs/memory/custom-provider).

Read the [memory documentation](https://eve.dev/docs/memory) to choose a provider and get started.