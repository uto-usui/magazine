---
title: "fx is now available in the AI SDK harness layer"
source: "https://vercel.com/changelog/fx-ai-sdk-harness-adapter"
publishedDate: "2026-08-31"
category: "frontend"
feedName: "Vercel"
author: "Felix Arntz"
---

The [AI SDK harness layer](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk) now supports [fx](https://fx.sh/), Vercel's lightweight, open-source coding agent. The harness layer provides one API for running coding agents in your application, so you can add fx without building a separate integration.

Configure `HarnessAgent` with the official `@ai-sdk/harness-fx` adapter:

```
import { HarnessAgent } from '@ai-sdk/harness/agent';import { fx } from '@ai-sdk/harness-fx';const agent = new HarnessAgent({  harness: fx,});
```

Run fx through the HarnessAgent interface.

The `@ai-sdk/harness-fx` adapter connects to fx over the Agent Client Protocol (ACP) using [`@ai-sdk/harness-acp`](https://vercel.com/changelog/use-acp-compatible-harnesses-with-the-ai-sdk-harness-layer).

fx joins Claude Code, Cline, Codex, Cursor, Deep Agents, Grok Build, OpenCode, and Pi in the list of supported harnesses.

Read the [fx harness documentation](https://ai-sdk.dev/v7/providers/ai-sdk-harnesses/fx) to get started.