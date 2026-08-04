---
title: "Share Vercel Container Registry repositories across teams"
source: "https://vercel.com/changelog/share-vercel-container-registry-repositories-across-teams"
publishedDate: "2026-08-03"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

[Vercel Container Registry](https://vercel.com/docs/container-registry#share-a-repository) now lets you share a repository with other Vercel teams to grant read access to its images.

Sharing is read-only and covers the whole repository. Recipients can pull and use every image, but cannot push, delete, or re-share. You can also share a repository with your own team. Each repository can be shared with up to 100 teams.

Share from the project dashboard under Images → repository → Settings → Repository Sharing, or with the Vercel CLI:

terminal

```
# Share a repository with a teamvercel vcr permissions my-repository add other-team# List teams with accessvercel vcr permissions my-repository ls# Revoke a team's accessvercel vcr permissions my-repository rm other-team# Remove all shared accessvercel vcr permissions my-repository clear
```

Shared images can be used in [Vercel Sandbox](https://vercel.com/docs/sandbox/concepts/images#use-a-shared-image), accepting a team-scoped `image` reference in `Sandbox.create()` :

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create({  image: 'other-team/their-project/shared-repository:latest',});
```

Repository sharing is available on all plans. Update the Vercel CLI to v58.3.0 or later with `npm i -g vercel@latest` to get started and see the Vercel Container Registry [documentation](https://vercel.com/docs/container-registry#share-a-repository) to learn more.