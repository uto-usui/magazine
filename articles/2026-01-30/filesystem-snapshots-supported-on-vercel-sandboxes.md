---
title: "Filesystem snapshots supported on Vercel Sandboxes"
source: "https://vercel.com/changelog/filesystem-snapshots-supported-on-vercel-sandboxes"
publishedDate: "2026-01-22"
category: "frontend"
feedName: "Vercel"
author: "Guðmundur Bjarni Ólafsson"
---

1 min read

Jan 22, 2026

[Vercel Sandbox](https://vercel.com/sandbox) now supports filesystem snapshots to capture your state. You can capture a Sandbox's complete filesystem state as a snapshot and launch new Sandboxes from that snapshot using the Sandbox API.

This eliminates repeated setup when working with expensive operations like dependency installation, builds, or fixture creation. Create the environment once, snapshot it, then reuse that exact filesystem state across multiple isolated runs.

### [Link to heading](#how-snapshots-work)How snapshots work

Snapshots capture the entire filesystem of a running Sandbox. New Sandboxes can launch from that snapshot, providing immediate access to pre-installed dependencies and configured environments.

### [Link to heading](#key-capabilities)Key capabilities

-   Create a snapshot from any running Sandbox with `sandbox.snapshot()`
    
-   Launch new Sandboxes from snapshots via `source: { type: 'snapshot', snapshotId }`
    
-   Reuse the same snapshot with multiple Sandboxes for parallel testing and experimentation
    

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create();await sandbox.writeFiles([{  path: '/vercel/sandbox/hello',  content: Buffer.from('Hello Vercel Sandbox and Snapshots'),}]);const snapshot = await sandbox.snapshot();const newSandbox = await Sandbox.create({  source: { type: 'snapshot', snapshotId: snapshot.snapshotId },});for await (const chunk of await newSandbox.readFile({ path: '/vercel/sandbox/hello' })) {  process.stdout.write(chunk);};
```

See the [documentation](https://vercel.com/docs/vercel-sandbox/managing#snapshotting) to get started with snapshots.