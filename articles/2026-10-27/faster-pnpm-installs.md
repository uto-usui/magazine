---
title: "Faster pnpm installs"
source: "https://vercel.com/changelog/faster-pnpm-installs"
publishedDate: "2026-10-26"
category: "frontend"
feedName: "Vercel"
author: "Andrew Healey "
---

pnpm installs on Vercel are now faster, reducing the time spent installing dependencies before your build.

For Pro deployments with restored build cache, we observed 14% lower average install times with the optimization enabled.

Vercel now reuses successful dependency verification across deployments. In the best case, when dependencies are unchanged and the previous verification can be reused, installs can complete in milliseconds.

Before:

```
✓ Lockfile passes supply-chain policies (461 entries in 2.5s)Done in 2.8s using pnpm v12.3.4
```

After:

```
✓ Lockfile passes supply-chain policies (verified 58s ago)Done in 135ms using pnpm v12.3.4
```

This improvement is available on all plans and applies automatically, with no configuration required.