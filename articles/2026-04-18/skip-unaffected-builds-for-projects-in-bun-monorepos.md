---
title: "Skip unaffected builds for projects in Bun monorepos"
source: "https://vercel.com/changelog/skip-unaffected-builds-for-projects-in-bun-monorepos"
publishedDate: "2026-03-06"
category: "frontend"
feedName: "Vercel"
author: "Anthony Shew"
---

1 min read

Mar 6, 2026

[Skipping unaffected builds in monorepos](https://vercel.com/docs/monorepos#when-does-a-monorepo-build-occur) now detects Bun lockfiles, extending the same compatibility already available for other package managers.

When Vercel evaluates which projects to build, it reads lockfile changes to determine whether dependencies have changed. Teams using Bun can now rely on this detection to skip builds for projects that haven't changed, reducing unnecessary build time across monorepos.

See the [monorepo documentation](https://vercel.com/docs/monorepos#when-does-a-monorepo-build-occur) to learn how skipping unaffected projects works.