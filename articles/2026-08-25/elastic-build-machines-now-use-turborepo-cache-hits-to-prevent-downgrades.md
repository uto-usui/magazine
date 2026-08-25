---
title: "Elastic build machines now use Turborepo cache hits to prevent downgrades"
source: "https://vercel.com/changelog/elastic-build-machines-now-use-turborepo-cache-hits-to-prevent-downgrades"
publishedDate: "2026-08-24"
category: "frontend"
feedName: "Vercel"
author: "Mehul Kar"
---

[Elastic build machines](https://vercel.com/docs/builds/managing-builds#elastic-build-machines) now consider [Turborepo](https://turborepo.dev/) cache hits when deciding whether to use a smaller build machine. A warm-cache build no longer triggers a downgrade.

A warm-cache build can use less CPU and memory than the same build with a cold cache. Downgrading based on that lower usage could leave a later cold-cache build without enough resources to complete successfully.

This change applies automatically to all builds using elastic build machines. No action is required. Learn more in the [build documentation](https://vercel.com/docs/builds/managing-builds#elastic-build-machines).