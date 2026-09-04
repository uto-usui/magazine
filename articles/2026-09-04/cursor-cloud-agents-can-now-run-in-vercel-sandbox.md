---
title: "Cursor Cloud Agents can now run in Vercel Sandbox"
source: "https://vercel.com/changelog/run-cursor-cloud-agents-vercel-sandbox"
publishedDate: "2026-09-03"
category: "frontend"
feedName: "Vercel"
author: "Allen Zhou"
---

[Cursor Cloud Agents](https://cursor.com/docs/cloud-agent) can now run in [Vercel Sandbox](https://vercel.com/docs/sandbox) instead of Cursor's hosted machines.

Cursor manages the agent harness and inference loop. Its [Self-Hosted Machines](https://cursor.com/docs/cloud-agent/self-hosted) APIs let you supply the execution environment where agents clone repositories, edit files, and run commands and tests. Self-Hosted Machines requires a Cursor Enterprise plan.

Vercel Sandbox provides that execution environment as an isolated Firecracker microVM for each agent request. [Vercel Functions](https://vercel.com/docs/functions\)) and [Vercel Workflow](https://vercel.com/workflow) form a durable control plane that claims queued agent requests, provisions workers, monitors sessions, and cleans up automatically.

With this architecture, you get:

-   A scale-to-zero worker pool without long-lived virtual machines
    
-   A dedicated, isolated Sandbox for every agent request
    
-   Durable retries when a worker or session fails
    
-   Short-lived, user-scoped credentials inside each Sandbox
    

Follow the [step-by-step guide](https://vercel.com/kb/guide/cursor-vercel-sandbox) to deploy the reference implementation to your own Vercel account, or learn more in the [Vercel Sandbox documentation](https://vercel.com/docs/sandbox).