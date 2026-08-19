---
title: "Cline is now available in the AI SDK harness layer"
source: "https://vercel.com/changelog/cline-harness-adapter"
publishedDate: "2026-08-18"
category: "frontend"
feedName: "Vercel"
author: "Felix Arntz"
---

The [AI SDK harness layer](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk) lets you run established coding-agent runtimes through one unified interface, so you can switch runtimes without changing your application code. Today we are adding Cline, which runs through the same `HarnessAgent` interface as other supported harness.

`@ai-sdk/harness-cline` is the official harness adapter for Cline, implemented in collaboration with the Cline team.

```
import { HarnessAgent } from '@ai-sdk/harness/agent';import { cline } from '@ai-sdk/harness-cline';const agent = new HarnessAgent({  harness: cline,});
```

Basic example for using Cline with HarnessAgent

Cline runs fully in the host process and uses the sandbox as a remote filesystem and shell, so only its tools operate in the sandbox. No bridge process is installed inside the sandbox, similar to the existing Pi harness.

Read the [Cline harness documentation](https://ai-sdk.dev/providers/ai-sdk-harnesses/cline) to get started.

The full supported list of harnesses is now: Claude Code, Cline, Codex, Deep Agents, Grok Build, OpenCode, and Pi, with more coming soon.