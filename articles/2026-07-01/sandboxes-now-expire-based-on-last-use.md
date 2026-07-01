---
title: "Sandboxes now expire based on last use"
source: "https://vercel.com/changelog/sandboxes-now-expire-based-on-last-use"
publishedDate: "2026-06-29"
category: "frontend"
feedName: "Vercel"
author: "Marc Codina Segura"
---

Vercel Sandbox snapshots now expire based on when they were last used, not when they were created. Active snapshots stay alive as long as workflows depend on them, while unused snapshots expire on their retention policy.

```
// Now expires 7 days after last useawait Sandbox.update({  snapshotExpiration: 7 * 24 * 60 * 60 * 1000,});
```

Every time a snapshot is used, its expiration timer resets. This lets you set shorter retention windows without worrying that a snapshot will disappear between sessions, making it safer to build long-running workflows on top of Sandbox persistence.

Learn more about Sandbox snapshots in the [documentation](https://vercel.com/docs/vercel-sandbox/concepts/snapshots).