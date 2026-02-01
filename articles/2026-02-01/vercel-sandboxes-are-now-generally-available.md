---
title: "Vercel Sandboxes are now generally available"
source: "https://vercel.com/changelog/vercel-sandboxes-ga"
publishedDate: "2026-01-30"
category: "frontend"
feedName: "Vercel"
author: "Guðmundur Bjarni Ólafsson"
---

1 min read

Jan 30, 2026

Vercel Sandboxes are now generally available, providing an ephemeral compute primitive for safely executing untrusted code.

It lets teams run AI agent-generated outputs, unverified user uploads, and third-party code without exposing production systems.

Each sandbox runs inside Firecracker microVMs, isolated from your infrastructure, so code running in a sandbox is blocked from accessing environment variables, database connections, and cloud resources.

Sandboxes are in production use by teams including v0, Blackbox AI and RooCode.

To bootstrap a simple Node.js application that creates a Vercel sandbox, use the code below:

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create();await sandbox.runCommand({  cmd: 'node',   args: ["-e", 'console.log("Hello from Vercel Sandbox!")'],  stdout: process.stdout,});await sandbox.stop();
```

Or get started with the CLI by opening an interactive shell:

```
npx sandbox create --connect
```

Explore the [documentation](https://vercel.com/docs/vercel-sandbox) to get started, and check out the [open-source SDK and CLI](https://www.npmjs.com/package/sandbox).