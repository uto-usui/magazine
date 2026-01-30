---
title: "45% faster build initialization"
source: "https://vercel.com/changelog/45-percent-faster-build-initialization"
publishedDate: "2025-05-15"
category: "frontend"
feedName: "Vercel"
author: "Janos Szathmary"
---

1 min read

May 15, 2025

Builds on Vercel now initialize 45% faster on average, reducing build times by around 15 seconds for Pro and Enterprise teams.

Build initialization includes steps like restoring the build cache and fetching your code before the [Build Command](https://vercel.com/docs/deployments/configure-a-build#build-command) runs. These improvements come from continued enhancements to [Hive, Vercel’s build infrastructure](https://vercel.com/blog/a-deep-dive-into-hive-vercels-builds-infrastructure).

This improvement also reduced I/O wait times for file writes inside the build container by 75%, improving performance for the entire build.

Learn more about [builds on Vercel](https://vercel.com/docs/deployments/builds).