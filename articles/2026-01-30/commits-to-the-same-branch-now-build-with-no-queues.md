---
title: "Commits to the same branch now build with no queues"
source: "https://vercel.com/changelog/build-commits-to-the-same-branch-without-waiting"
publishedDate: "2025-10-14"
category: "frontend"
feedName: "Vercel"
author: "Luke Phillips-Sheard"
---

1 min read

Oct 14, 2025

Vercel now builds multiple commits to the same branch at the same time when On-Demand Concurrent Builds is enabled.  
  
Previously, a new commit would wait for the previous build on that branch to finish before starting. This update eliminates that queue, allowing commits to start building as soon as they arrive.

Visit the [On-demand concurrent builds documentation](https://vercel.com/docs/builds/managing-builds#on-demand-concurrent-builds) to learn more.