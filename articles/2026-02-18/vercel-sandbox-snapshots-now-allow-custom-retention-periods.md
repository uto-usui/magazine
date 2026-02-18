---
title: "Vercel Sandbox snapshots now allow custom retention periods"
source: "https://vercel.com/changelog/vercel-sandbox-snapshots-now-allow-custom-retention-periods"
publishedDate: "2026-02-17"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Feb 17, 2026

Snapshots created with [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) now have configurable expiration, instead of the previous 7 days limit, along with higher defaults.

```
import { Sandbox } from '@vercel/sandbox';import ms from 'ms';const sandbox = Sandbox.create();sandbox.snapshot({ expiration: ms('1d') })
```

The expiration can be configured between [1 day to infinity.](https://vercel.com/docs/vercel-sandbox/sdk-reference#sandbox.snapshot) If not provided, the default snapshot expiration is 30 days.

You can also configure this in the [CLI](https://vercel.com/docs/vercel-sandbox/cli-reference#sandbox-snapshot).

```
# Create a snapshot of a running sandboxsandbox snapshot sb_1234567890 --stop# Create a snapshot that expires in 14 dayssandbox snapshot sb_1234567890 --stop --expiration 14d# Create a snapshot that never expiressandbox snapshot sb_1234567890 --stop --expiration 0
```

Read the [documentation](https://vercel.com/docs/vercel-sandbox/concepts/snapshots) to learn more about snapshots.