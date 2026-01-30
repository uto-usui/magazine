---
title: "Bun's text lockfile is now supported with zero configuration"
source: "https://vercel.com/changelog/buns-text-lockfile-is-now-supported-with-zero-configuration"
publishedDate: "2025-01-16"
category: "frontend"
feedName: "Vercel"
author: "Austin Merrick"
---

1 min read

Jan 16, 2025

Projects using Bun's new text `bun.lock` lockfile can now be deployed to Vercel with zero configuration.

While Vercel [already supports Bun's binary `bun.lockb` lockfile](https://vercel.com/changelog/bun-install-is-now-supported-with-zero-configuration-6qPMITQUrVSmCuGQSdO9HC), Bun v1.1.39 introduces a new [text-based](https://bun.sh/blog/bun-lock-text-lockfile) lock file with `bun install --save-text-lockfile`. Bun plans to make this the default in v1.2.

Learn more about [package managers supported by Vercel](https://vercel.com/docs/deployments/builds/package-managers#package-managers).