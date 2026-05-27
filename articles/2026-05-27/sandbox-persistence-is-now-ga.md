---
title: "Sandbox persistence is now GA"
source: "https://vercel.com/changelog/sandbox-persistence-is-now-ga"
publishedDate: "2026-05-26"
category: "frontend"
feedName: "Vercel"
author: "Marc Codina Segura"
---

2 min read

May 26, 2026

[Vercel Sandboxes](https://vercel.com/docs/vercel-sandbox) now automatically save and restore filesystem state between sessions. Persistence is on by default, meaning no snapshots to manage or state to track manually.

Each sandbox has a durable, [customizable name](https://vercel.com/changelog/vercel-sandboxes-now-allow-unique-customizable-names) that acts as a unique reference in your project. You can create, retrieve, or resume a sandbox by name. Vercel spins sessions up and down automatically, without interrupting your workflow.

## [Link to heading](#create-a-persistent-sandbox)Create a persistent sandbox

When you call `Sandbox.create()`, persistence is enabled by default:

```
import { Sandbox } from "@vercel/sandbox";// Filesystem is snapshotted automaticallyconst sandbox = await Sandbox.create({ name: "my-sandbox" }); await sandbox.runCommand("npm", ["install"]);await sandbox.stop();
```

Create a sandbox with persistence on by default

  
Each automatic snapshot consumes [snapshot storage](https://vercel.com/docs/vercel-sandbox/pricing#snapshot-storage), which is billed separately from compute. For ephemeral workloads, opt out of persistence to minimize storage costs:

```
import { Sandbox } from "@vercel/sandbox";const sandbox = await Sandbox.create({ persistent: false });// Or update an existing sandbox.await sandbox.update({ persistent: false });
```

Create an ephemeral sandbox

To opt out of persistence with the CLI, pass `--non-persistent` to `sandbox create`. Non-persistent sandboxes discard their filesystem when the session ends.

## [Link to heading](#resume-a-persistent-sandbox)Resume a persistent sandbox

Resuming is automatic. Any call on a stopped sandbox, like `runCommand()` or `writeFiles()`, starts a new session from the most recent snapshot.

```
import { Sandbox } from "@vercel/sandbox";const resumedSandbox = await Sandbox.get({ name: "my-sandbox" });// Automatically resumes the sandbox.await resumedSandbox.runCommand("npm", ["test"]);
```

Automatically resume a stopped sandbox

## [Link to heading](#other-improvements)Other improvements

-   `Sandbox.fork()`: Create a new sandbox from an existing one
    
-   `Sandbox.getOrCreate()`: Idempotent retrieve-or-create for long-lived sandboxes
    
-   `Sandbox.delete()`: Permanently delete a sandbox
    
-   Richer `sandbox.stop()`: Returns snapshot metadata plus active-CPU and network-transfer totals
    
-   Lifecycle hooks: `onCreate` and `onResume` hooks for `create`, `get`, and `getOrCreate`
    
-   [Tags](https://vercel.com/docs/vercel-sandbox/concepts/tags): Assign custom properties to sandboxes for multi-tenant tracking
    

## [Link to heading](#get-started-)Get started

Upgrade to the latest version to create persistent sandboxes by default:

-   `pnpm install @vercel/sandbox@latest # SDK`
    
-   `pnpm install -g sandbox@latest # CLI`
    

Learn more about persistent sandboxes in the [documentation](https://vercel.com/docs/vercel-sandbox/concepts/persistent-sandboxes).