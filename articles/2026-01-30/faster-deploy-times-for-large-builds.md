---
title: "Faster deploy times for large builds"
source: "https://vercel.com/changelog/faster-deploy-times-for-large-builds"
publishedDate: "2025-02-06"
category: "frontend"
feedName: "Vercel"
author: "Andrew Healey "
---

1 min read

Feb 6, 2025

We optimized the deploy step of the [build process](https://vercel.com/docs/deployments/builds#build-process) to reduce build times by 2.8 seconds at P99, 760ms at P75, and 410ms on average.

For customers with a large number of Vercel Functions (100+), builds are more than 50 seconds faster. Several customers have time savings of over 2 minutes.

Check out [the documentation](https://vercel.com/docs/deployments/builds) to learn more about builds.