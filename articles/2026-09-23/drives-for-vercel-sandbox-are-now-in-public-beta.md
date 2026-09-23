---
title: "Drives for Vercel Sandbox are now in public beta"
source: "https://vercel.com/changelog/drives-for-vercel-sandbox-are-now-in-public-beta"
publishedDate: "2026-09-22"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

Drives for Vercel Sandbox are now available in public beta on Hobby, Pro, and Enterprise.

A Drive is persistent storage that you mount as a directory in a Vercel Sandbox. It isn’t tied to a single sandbox, so you can reuse the same Drive across runs and different sandbox instances.

Use Drives to preserve an agent's workspace or on-disk memory, or to reuse datasets, models, and dependency trees.

### [Copy link to heading](#create-and-mount-a-drive)Create and mount a Drive

Create or retrieve a Drive and mount it at a path when starting a sandbox. Read and write files through the sandbox filesystem at that path.

```
import { Sandbox, Drive } from '@vercel/sandbox';const workspace = await Drive.getOrCreate({   name: 'agent-workspace', });const sandbox = await Sandbox.create({  mounts: { '/data': workspace },});
```

Create and mount a Drive in a Vercel sandbox.

Anything stored under `/data` remains on the Drive after the sandbox stops.

A Drive supports one read-write mount at a time. After the Drive has been written to, multiple sandboxes can read from it concurrently by mounting point-in-time, read-only snapshots.

```
import { Sandbox, Drive } from '@vercel/sandbox';const workspace = await Drive.getOrCreate({  name: 'agent-workspace',});// The Drive must have been written to at least once.const [reviewSandbox, testSandbox] = await Promise.all([  Sandbox.create({    mounts: { '/data': workspace.snapshot() },  }),  Sandbox.create({    mounts: { '/data': workspace.snapshot() },  }),]);
```

Give multiple sandboxes concurrent read-only access to a Drive.

Each snapshot reflects the Drive at the moment it's mounted. Later writes aren’t included; mount a new snapshot to access them.

### [Copy link to heading](#limits-and-pricing)Limits and pricing

Each sandbox can mount up to four Drives at separate paths. Drives default to a maximum size of 1 TiB (1 GiB on Hobby) and can be configured up to 16 TiB, with higher limits available by request.

Drives are available in every [Sandbox region](https://vercel.com/docs/sandbox/concepts/regions). Each Drive stays in the region where it was created. Sandboxes that mount it must run in that region and can’t use failover regions.

Drive pricing is based on storage, reads, and writes, with rates varying by region. In `iad1`, storage costs $0.05 per GB-month, reads $0.0015 per GB, and writes $0.004 per GB. Hobby includes 15 GB of Drive storage and 30 GB each of reads and writes per month. See [Sandbox pricing](https://vercel.com/docs/sandbox/pricing#regional-pricing) for regional rates and plan details.

Learn more in the [Drives documentation](https://vercel.com/docs/sandbox/concepts/drives).