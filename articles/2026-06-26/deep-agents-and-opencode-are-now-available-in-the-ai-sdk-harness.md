---
title: "Deep Agents and OpenCode are now available in the AI SDK Harness"
source: "https://vercel.com/changelog/deepagents-and-opencode-harness-adapters"
publishedDate: "2026-06-25"
category: "frontend"
feedName: "Vercel"
author: "Maya Lekhi"
---

The [AI SDK Harness](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk) lets you run established coding-agent runtimes through one unified interface, so you can switch runtimes without changing your application code. Today we're adding two new adapters, Deep Agents and OpenCode, both running inside a Vercel Sandbox.

## [Link to heading](#deep-agents)Deep Agents

[`@ai-sdk/harness-deepagents`](https://ai-sdk.dev/providers/ai-sdk-harnesses/deepagents) adapts LangChain's `deepagents` runtime, with built-in file and shell tools, skills, host tools, multi-turn sessions, attach and resume, and built-in tool approvals.

```
import { HarnessAgent } from '@ai-sdk/harness/agent';import { deepAgents } from '@ai-sdk/harness-deepagents';const agent = new HarnessAgent({  harness: deepAgents,});
```

Basic example for using Deep Agents with HarnessAgent

Read the [Deep Agents harness documentation](https://ai-sdk.dev/v7/providers/ai-sdk-harnesses/deepagents) to get started.

## [Link to heading](#opencode)OpenCode

[`@ai-sdk/harness-opencode`](https://ai-sdk.dev/providers/ai-sdk-harnesses/opencode) boots a real OpenCode server inside the sandbox via `@opencode-ai/sdk` and streams its session events through the harness. It exposes OpenCode's built-in tools, supports both built-in and host tool approvals, and lets you pick the model, provider, and reasoning variant.

```
import { HarnessAgent } from '@ai-sdk/harness/agent';import { openCode } from '@ai-sdk/harness-opencode';const agent = new HarnessAgent({  harness: openCode,});
```

Basic example for using OpenCode with HarnessAgent

Read the [OpenCode harness documentation](https://ai-sdk.dev/v7/providers/ai-sdk-harnesses/opencode) to get started.

The full supported list of harnesses is now: Claude Code, Codex, Deep Agents, OpenCode, Pi, with more coming soon.