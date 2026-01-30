---
title: "Builds now start up to 30% faster"
source: "https://vercel.com/changelog/builds-now-start-up-to-30-faster"
publishedDate: "2025-09-16"
category: "frontend"
feedName: "Vercel"
author: "Ali Smesseim"
---

1 min read

Sep 16, 2025

The build cache stores files from previous builds to speed up future ones. We've improved its performance by downloading parts of the cache in parallel using a worker pool.

This decreased the build initialization time by **30% on average**, reducing build times by up to 7 seconds for all plans.

This is enabled automatically for all new builds and adds to the [build initialization improvements](https://vercel.com/changelog/45-percent-faster-build-initialization) previously launched.

Learn more about [builds on Vercel](https://vercel.com/docs/deployments/builds).