---
title: "Vercel Container Registry repositories can now be made public"
source: "https://vercel.com/changelog/vercel-container-registry-repositories-can-now-be-made-public"
publishedDate: "2026-08-07"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

[Vercel Container Registry](https://vercel.com/docs/container-registry) now lets you make a repository public, so anyone with a Vercel account can pull and use its images.

Sharing already granted read access to up to 100 teams, and making a repository public opens that access to every Vercel team rather than a named set. Public access is read-only, so anyone can pull and use the images but cannot push, delete, or otherwise change the repository. Repositories stay private by default.

Make a repository public from the project dashboard under Images → repository → Settings → Public Access, where confirming requires typing the repository name. You can also set visibility from the Vercel CLI:

```
vercel vcr config <repository> --public truevercel vcr config <repository> --public false
```

Public images work like shared images in [Vercel Sandbox](https://vercel.com/docs/sandbox/concepts/images), which accepts a team-scoped `image` reference in `Sandbox.create()`:

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create({  image: 'their-team/their-project/their-repository:latest',});
```

Update your repository visibility from the dashboard, the CLI, or the REST API, and see the Vercel Container Registry [documentation](https://vercel.com/docs/container-registry) to learn more.