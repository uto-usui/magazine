---
title: "Vercel Sandbox supports forking"
source: "https://vercel.com/changelog/vercel-sandbox-supports-forking"
publishedDate: "2026-07-28"
category: "frontend"
feedName: "Vercel"
author: "Marc Codina Segura"
---

[Vercel Sandbox](https://vercel.com/docs/sandbox) now supports forking with `Sandbox.fork()`.

The fork starts from the source's current snapshot and inherits its config and environment variables. If the source is running, it forks the latest saved state, not the live in-memory state. If the source has no snapshot, it falls back to a fresh create, using the source's `runtime` and config. Any parameter you pass overrides the inherited value.

A fork takes about the same time as creating a sandbox, with the same limits. Use it to branch an agent from a shared base, give each tenant its own copy of a template, or run variations of one setup in parallel.

To fork a sandbox with the SDK:

```
import { Sandbox } from '@vercel/sandbox';// Inherit every field from the source's snapshotconst fork = await Sandbox.fork({  sourceSandbox: 'prod-agent',});// Override specific fields; the rest are inheritedconst customized = await Sandbox.fork({  sourceSandbox: 'prod-agent',  name: 'forked-prod-agent',  resources: {    vcpus: 4,  }});
```

To fork a sandbox with the CLI:

```
sandbox fork prod-agent --name forked-prod-agent --vcpus 4
```

To get started, upgrade to the latest version:

-   `pnpm install @vercel/sandbox@latest # SDK`
    
-   `pnpm install -g sandbox@latest # CLI`
    

Learn more in the Sandbox [documentation](https://vercel.com/docs/sandbox/sdk-reference#sandbox.fork).