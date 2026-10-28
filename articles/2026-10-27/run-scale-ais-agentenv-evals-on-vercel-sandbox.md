---
title: "Run Scale AI’s AgentEnv evals on Vercel Sandbox"
source: "https://vercel.com/changelog/run-scale-ais-agentenv-evals-on-vercel-sandbox"
publishedDate: "2026-10-26"
category: "frontend"
feedName: "Vercel"
author: "Elisabeth Rülke"
---

[AgentEnv](https://github.com/scaleapi/agentenv-framework), Scale AI's framework for testing agents against tasks and scoring their results, now runs on [Vercel Sandbox](https://vercel.com/docs/sandbox). The Vercel provider ships in AgentEnv 0.9.1334 and later, and runs the agent and its task environment in separate Sandboxes.

Try the [AgentEnv example](https://github.com/vercel-labs/agentenv-framework/tree/vercel-demo) to run an evaluation on Vercel Sandbox and inspect the task’s score and the agent’s recorded actions. After completing the [setup guide](https://vercel.com/docs/sandbox/ecosystem/agentenv), run this command from the cloned repository. It uses your existing Vercel CLI login:

```
./vercel-eval --scope YOUR_TEAM --project YOUR_PROJECT
```

Replace `YOUR_TEAM` with your Vercel team slug and `YOUR_PROJECT` with an existing project name.

Learn more in the [Sandbox ecosystem documentation](https://vercel.com/docs/sandbox/ecosystem).