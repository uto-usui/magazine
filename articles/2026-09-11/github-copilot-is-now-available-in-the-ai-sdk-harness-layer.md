---
title: "GitHub Copilot is now available in the AI SDK harness layer"
source: "https://vercel.com/changelog/github-copilot-ai-sdk-harness-adapter"
publishedDate: "2026-09-10"
category: "frontend"
feedName: "Vercel"
author: "Felix Arntz"
---

The [AI SDK harness layer](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk) now supports GitHub Copilot through the official `@ai-sdk/harness-github-copilot` adapter. The harness layer lets your application run different coding agents through the same `HarnessAgent` interface, so you can switch agents without changing your application code.

Pass `githubCopilot` to `HarnessAgent`:

```
import { HarnessAgent } from '@ai-sdk/harness/agent';import { githubCopilot } from '@ai-sdk/harness-github-copilot';const agent = new HarnessAgent({  harness: githubCopilot,});
```

Create a HarnessAgent that runs GitHub Copilot.

Under the hood, the adapter uses [`@ai-sdk/harness-acp`](https://vercel.com/changelog/use-acp-compatible-harnesses-with-the-ai-sdk-harness-layer) to connect GitHub Copilot to `HarnessAgent` through the Agent Client Protocol (ACP).

Supported harnesses now include, in addition to GitHub Copilot, Claude Code, Cline, Codex, Cursor, Deep Agents, fx, Grok Build, OpenCode, and Pi, with more coming soon.

Read the [GitHub Copilot harness documentation](https://ai-sdk.dev/v7/providers/ai-sdk-harnesses/github-copilot) to get started.