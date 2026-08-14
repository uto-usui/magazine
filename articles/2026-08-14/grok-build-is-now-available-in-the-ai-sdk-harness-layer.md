---
title: "Grok Build is now available in the AI SDK harness layer"
source: "https://vercel.com/changelog/grok-build-harness-adapter"
publishedDate: "2026-08-13"
category: "frontend"
feedName: "Vercel"
author: "Felix Arntz"
---

The [AI SDK harness layer](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk) lets you run established coding-agent runtimes through one unified interface, so you can switch runtimes without changing your application code. Today we are adding Grok Build, which runs through the same `HarnessAgent` interface as every other supported harness.

`@ai-sdk/harness-grok-build` is the official harness adapter for Grok Build, built on top of [the ACP harness adapter](https://vercel.com/changelog/use-acp-compatible-harnesses-with-the-ai-sdk-harness-layer) (`@ai-sdk/harness-acp`).

```
import { HarnessAgent } from '@ai-sdk/harness/agent';import { grokBuild } from '@ai-sdk/harness-grok-build';const agent = new HarnessAgent({  harness: grokBuild,});
```

Basic example for using Grok Build with HarnessAgent

Read the [Grok Build harness documentation](https://ai-sdk.dev/v7/providers/ai-sdk-harnesses/grok-build) to get started.

The full supported list of harnesses is now: Claude Code, Codex, Deep Agents, Grok Build, OpenCode, Pi, with more coming soon.