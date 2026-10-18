---
title: "Vercel Drives is now generally available"
source: "https://vercel.com/changelog/vercel-drives-is-now-generally-available"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

[Vercel Drives](https://vercel.com/docs/sandbox/concepts/drives) is now generally available for [Vercel Sandbox](https://vercel.com/docs/sandbox) on Hobby, Pro, and Enterprise.

A Drive is persistent storage that you mount as a directory in a Vercel Sandbox. Its files remain available after the sandbox stops, so later runs and other sandboxes can access them by mounting the same Drive.

Use Drives to preserve an agent’s workspace or file-based memory across runs, or to make datasets, models, dependencies, and build artifacts available across sandboxes.

You can also fork a Drive into independent writable Drives. Forks inherit the source Drive's data, region, and maximum size, then store their own changes. Parallel workers can start with the same files and make changes without affecting the original or one another.

```
import { Sandbox, Drive } from '@vercel/sandbox';const drive = await Drive.get({ name: 'base-drive' })for (let i = 0; i < 2; i++) {  const fork = await drive.fork({ name: `worker-${i}` })  const sandbox = await Sandbox.create({    mounts: {      '/data': fork,    }  })  // Run the session, then delete the fork  await fork.delete()}
```

Start parallel workers from the same saved workspace while keeping their changes isolated.

Learn more in the [Drives documentation](https://vercel.com/docs/sandbox/concepts/drives).