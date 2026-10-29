---
title: "Vercel Container Registry now supports 2 GB compressed image layers"
source: "https://vercel.com/changelog/vercel-container-registry-now-supports-2-gb-compressed-image-layers-new"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

[Vercel Container Registry](https://vercel.com/docs/container-registry) now supports up to 2 GB per compressed image layer, up from 500 MB, allowing larger layers to be pushed without splitting them. The total image size limit remains 15 GB.

The higher layer limit is useful for images with large toolchains or dependency sets, such as custom [Vercel Sandbox](https://vercel.com/docs/sandbox/concepts/images) environments for coding-agent evaluations.

With Docker and the [Vercel CLI](https://vercel.com/docs/cli) installed, run these commands from the directory containing your Dockerfile:

```
vercel linkvercel vcr login dockervercel vcr build docker . --push
```

Link your project, authenticate Docker, then build and push the image.

Read the [Vercel Container Registry getting-started guide](https://vercel.com/docs/container-registry/getting-started) to build, push, and pull your first container image.