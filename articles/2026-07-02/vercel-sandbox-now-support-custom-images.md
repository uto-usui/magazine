---
title: "Vercel Sandbox now support Custom Images"
source: "https://vercel.com/changelog/vercel-sandbox-now-support-custom-images"
publishedDate: "2026-06-30"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

Vercel Sandboxes now supports custom images. Launching in public beta today, images allow Sandboxes to start with your own custom root filesystem. Images are pulled from [Vercel Container Registry](https://vercel.com/docs/container-registry), so anything you `docker push` is immediately available.

```
Sandbox.create({  image: "repository:tag"})
```

Bring your own OS, toolchain and dependencies into the Sandbox without needing to spin up compute and create Snapshots.

Images in the background for Fluid Compute and boot from a precompiled snapshot in the same format as our [Sandbox Snapshots](https://vercel.com/blog/optimizing-vercel-sandbox-snapshots) - so you get the convenience of a custom filesystem without sacrificing cold start performance.

Read more about running images with Sandbox in the [documentation](https://vercel.com/docs/sandbox/concepts/images).