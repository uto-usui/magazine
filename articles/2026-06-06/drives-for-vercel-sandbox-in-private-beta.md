---
title: "Drives for Vercel Sandbox in Private Beta"
source: "https://vercel.com/changelog/drives-for-vercel-sandbox-in-private-beta"
publishedDate: "2026-06-05"
category: "frontend"
feedName: "Vercel"
author: "Joe Haddad"
---

1 min read

Jun 5, 2026

[Vercel Sandbox](https://vercel.com/docs/sandbox) now supports drives in private beta. Drives are persistent, attachable storage with a lifecycle independent from any sandbox.

Create a drive once, then mount it at a configurable path when starting a sandbox. When the sandbox stops, the drive remains available to attach to a later sandbox.

Install the beta [SDK](https://vercel.com/docs/sandbox/sdk-reference) (`@vercel/sandbox@beta`) or beta [CLI](https://vercel.com/docs/sandbox/cli-reference) (`sandbox@beta`), then create and mount a drive:

```
import { Drive, Sandbox } from "@vercel/sandbox";const drive = await Drive.getOrCreate({  name: "agent-workspace",});const sandbox = await Sandbox.create({  mounts: {    "/workspace": {      drive: drive.name,      mode: "read-write",    },  },});
```

Sandbox Drives are useful for:

-   Keeping agent workspaces across disposable sandboxes
    
-   Retaining cloned repositories, dependencies, and build outputs
    
-   Managing data independently from the sandbox lifecycle
    

During the private beta, a drive can be mounted read-write by one sandbox at a time. Sandbox drives should not be used for production data while in private beta.

Sign up [here](https://vercel.typeform.com/to/F19n6v2q) to join the waitlist, and learn more in the [docs](https://vercel.com/docs/sandbox/concepts/drives).