---
title: "Introducing Vercel Drives: persistent storage for agents"
source: "https://vercel.com/blog/introducing-vercel-drives-persistent-storage-for-agents"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Kevin Sundstrom"
---

Agents often handle complex work that continues across runs. As that work evolves, they may need a new environment with different tools, runtimes, or compute. They should be able to continue working with the same files when they change environments.

We built [Vercel Drives](https://vercel.com/docs/sandbox/concepts/drives) to keep an agent’s files independent of its execution environment. It is now generally available for [Vercel Sandbox](https://vercel.com/docs/sandbox). Agents can mount the same drive in a new environment configured for the next task and continue where they left off.

## [Copy link to heading](#persisting-state-with-a-drive)Persisting state with a drive

Create a drive once, then mount it when you create a sandbox. From the CLI:

```
sandbox drives get-or-create agent-workspacesandbox create --mount agent-workspace:/workspace
```

Or from the Sandbox SDK:

```
import { Sandbox, Drive } from '@vercel/sandbox';const drive = await Drive.getOrCreate({ name: 'agent-workspace' });const sandbox = await Sandbox.create({  mounts: { '/workspace': drive },});await sandbox.runCommand('git', ['clone', repoUrl, '/workspace/repo']);
```

In this example, everything under `/workspace` persists on the drive. Everything else belongs to the sandbox. The next sandbox that mounts the drive finds the repository, and anything else the agent wrote there, where the previous run left it.

The drive keeps the agent’s files independent of the sandbox running it. An agent can resume work in a new sandbox or switch runtimes without transferring its workspace. Other sandboxes can mount the same drive.

## [Copy link to heading](#sharing-state-across-sandboxes)Sharing state across sandboxes

Agents can prepare files on a drive once and reuse them across sandboxes. If one agent builds a dataset on a drive, other agents can mount read-only copies to analyze the data or generate reports without rebuilding the dataset. They use the shared files as input and save their results separately.

Agents can also fork a drive to explore different approaches independently. Each fork starts with the drive’s contents and provides its own writable workspace. Agents can try different transformations of the dataset in parallel without changing the original or affecting one another. Forks don’t merge back into the original drive.

Forking is [generally available](https://vercel.com/docs/sandbox/concepts/drives#forking-a-drive).

## [Copy link to heading](#get-started)Get started

Vercel Drives is now generally available for Vercel Sandbox on all plans.

Drives default to 1 TiB, or 1 GiB on Hobby, with up to 16 TiB available. See the [documentation](https://vercel.com/docs/sandbox/concepts/drives) for configuration, snapshots, and limits, or the [changelog](https://vercel.com/changelog/vercel-drives-is-now-generally-available) for what changed at GA.

### [Copy link to heading](#resources)Resources

-   Read the [Vercel Drives guide](https://vercel.com/kb/guide/vercel-drives)
    
-   Deploy the Vercel Drives eve agent starter template [in one click](https://vercel.com/templates/eve/eve-vercel-drives-starter)