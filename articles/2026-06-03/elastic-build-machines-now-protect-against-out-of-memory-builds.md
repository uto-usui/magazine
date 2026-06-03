---
title: "Elastic Build Machines now protect against out of memory builds"
source: "https://vercel.com/changelog/elastic-build-machines-now-protect-against-out-of-memory-builds"
publishedDate: "2026-06-01"
category: "frontend"
feedName: "Vercel"
author: "Mehul Kar"
---

1 min read

Jun 1, 2026

Elastic build machines now monitor your build's memory usage and automatically adjust to prevent out-of-memory (OOM) failures:

-   If your build is fast but memory-intensive, we will no longer downgrade you to a smaller machine
    
-   If your build is close to running out of memory, we will automatically upgrade to a higher tier
    
-   If your build fails due to an out-of-memory error, the next deployment will automatically run on a higher tier
    

Thresholds are set conservatively to balance deployment reliability and cost. Vercel only considers your build's memory usage, not the memory used by Vercel's own build infrastructure.

Enable elastic builds in your [team settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fsettings%2Fbuild-and-deployment%23build-machines) or [project settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment%23build-machine), or read the [docs](https://vercel.com/docs/builds/managing-builds#elastic-build-machines).