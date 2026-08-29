---
title: "Cursor is now available in the AI SDK harness layer"
source: "https://vercel.com/changelog/cursor-ai-sdk-harness-adapter"
publishedDate: "2026-08-27"
category: "frontend"
feedName: "Vercel"
author: "Felix Arntz"
---

The [AI SDK harness layer](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk) now supports Cursor through the official `@ai-sdk/harness-cursor` adapter. The harness layer lets your application run different coding agents through the same `HarnessAgent` interface, so you can switch agents without changing your application code.

Pass `cursor` to `HarnessAgent`:

```
import { HarnessAgent } from '@ai-sdk/harness/agent';import { cursor } from '@ai-sdk/harness-cursor';const agent = new HarnessAgent({  harness: cursor,});
```

Create a HarnessAgent that runs Cursor.

Under the hood, the adapter uses [`@ai-sdk/harness-acp`](https://vercel.com/changelog/use-acp-compatible-harnesses-with-the-ai-sdk-harness-layer) to connect Cursor to `HarnessAgent` through the Agent Client Protocol (ACP).

Supported harnesses now include, in addition to Cursor, Claude Code, Cline, Codex, Deep Agents, Grok Build, OpenCode, and Pi, with more coming soon.

Read the [Cursor harness documentation](https://ai-sdk.dev/v7/providers/ai-sdk-harnesses/cursor) to get started.