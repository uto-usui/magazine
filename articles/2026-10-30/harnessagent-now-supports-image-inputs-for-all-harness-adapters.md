---
title: "HarnessAgent now supports image inputs for all harness adapters"
source: "https://vercel.com/changelog/harness-agent-image-inputs"
publishedDate: "2026-10-27"
category: "frontend"
feedName: "Vercel"
author: "Felix Arntz"
---

The AI SDK `HarnessAgent` layer now accepts image inputs across every harness adapter.

Pass images alongside text in the standard AI SDK message format: a `content` array mixing `{ type: 'text' }` and `{ type: 'file' }` parts.

Image input is processed by the harnesses' underlying vision models and supported across all available adapters: Claude Code, Cline, Codex, Cursor, Deep Agents, fx, GitHub Copilot, Grok Build, OpenCode, Pi.

```
import { HarnessAgent } from '@ai-sdk/harness/agent';import { codex } from '@ai-sdk/harness-codex';import { createVercelNetworkSandboxSession } from '@ai-sdk/sandbox-vercel';import { readFileSync } from 'node:fs';const agent = new HarnessAgent({ harness: codex });const sandboxSession = await createVercelNetworkSandboxSession({  runtime: 'node24',  ports: [4000],  template: await agent.getSandboxTemplate(),});const session = await agent.createSession({ sandboxSession });const result = await agent.generate({  session,  messages: [    {      role: 'user',      content: [        { type: 'text', text: 'Describe the image in one sentence.' },        {          type: 'file',          mediaType: 'image/png',          data: readFileSync('image.png'),        },      ],    },  ],});
```

Basic example asking the Codex harness to describe a given image

Read the [`HarnessAgent` image inputs documentation](https://ai-sdk.dev/docs/ai-sdk-harnesses/harness-agent#image-inputs) to get started.