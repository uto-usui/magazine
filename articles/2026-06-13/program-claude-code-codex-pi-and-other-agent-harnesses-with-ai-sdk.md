---
title: "Program Claude Code, Codex, Pi and other agent harnesses with AI SDK"
source: "https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk"
publishedDate: "2026-06-12"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

1 min read

Jun 12, 2026

[AI SDK 7](https://ai-sdk.dev/v7/docs/introduction) introduces `HarnessAgent`, a single API for running established agent harnesses, including Claude Code, Codex, and Pi. AI SDK has always let you switch models without rewriting your agent. Now you can switch the harness the same way.

Write the agent once. Use the best harness available.  
Today. In 3 months. A year from now.

Harnesses manage the components above a model call, including skills, sandboxes, sessions, permission flows, compaction, runtime configuration, and sub-agents. The AI SDK normalizes access to those capabilities through a unified harness abstraction.

Initial harness adapters for this experimental release include Claude Code, Codex, and Pi, with more coming soon.

agent.ts

```
import { HarnessAgent } from '@ai-sdk/harness/agent';import { claudeCode } from '@ai-sdk/harness-claude-code';import { createVercelSandbox } from '@ai-sdk/sandbox-vercel';const agent = new HarnessAgent({  harness: claudeCode,  sandbox: createVercelSandbox({    runtime: 'node24',    ports: [4000],  }),  tools: { /* pass custom tools */ },  skills: [ /* pass custom skills */ ],});const session = await agent.createSession();try {  const result = await agent.stream({    session,    prompt: 'Check the test failures and fix the production code.',  });  for await (const part of result.fullStream) {    if (part.type === 'text-delta') {      process.stdout.write(part.text);    }  }} finally {  await session.destroy();}
```

Create a harness-backed agent using Claude Code

Swap `claudeCode` for `codex` or `pi` and keep the same `HarnessAgent` flow. Every harness runs the agent in a sandboxed workspace, keeping the host environment safe.

Both `HarnessAgent.generate()` and `HarnessAgent.stream()` return AI SDK-compatible results. If your app already uses `useChat` or related AI SDK tooling, you can swap in `HarnessAgent` without changing your user interface code.

`HarnessAgent` is available on the AI SDK canary release. Read the [AI SDK harness documentation](https://ai-sdk.dev/v7/docs/ai-sdk-harnesses/overview) to get started.

Harness packages are **experimental**. Expect breaking changes between releases as this early API gets further refined.