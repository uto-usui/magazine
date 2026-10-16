---
title: "Vercel Sandbox creation now returns a ready sandbox"
source: "https://vercel.com/changelog/sandbox-create-waits-until-ready"
publishedDate: "2026-10-08"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

A new Vercel Sandbox is now ready to run commands and read or write files when creation completes.

`Sandbox.create()` now resolves only after snapshot restoration completes, so the first command or file operation no longer waits for it. Startup errors also reject `Sandbox.create()` instead of surfacing during that operation.

```
import { Sandbox } from '@vercel/sandbox';// Resolves after snapshot restoration. Startup failures reject here.const sandbox = await Sandbox.create();// Runs without waiting for snapshot restoration.await sandbox.runCommand('node', ['--version']);
```

Run a command right after creating a sandbox.

Snapshot restoration time now counts toward creation instead of the first operation. Creation is about 50 ms longer at p50, with a larger increase possible for uncached snapshots. The total time through the first operation remains the same.

This change applies automatically, with no SDK upgrade or configuration changes required. See the `Sandbox.create()` [documentation](https://vercel.com/docs/sandbox/sdk-reference#sandbox.create) for details.