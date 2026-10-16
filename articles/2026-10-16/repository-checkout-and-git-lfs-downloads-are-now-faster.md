---
title: "Repository checkout and Git LFS downloads are now faster"
source: "https://vercel.com/changelog/repository-checkout-and-git-lfs-downloads-are-now-faster"
publishedDate: "2026-10-13"
category: "frontend"
feedName: "Vercel"
author: "Andrew Healey "
---

Repository checkout and [Git LFS](https://vercel.com/docs/project-configuration/git-settings#git-large-file-storage-lfs) downloads are now faster on Vercel, reducing the time spent preparing your project's files before a build.

During rollout on build machines with more than two vCPUs:

-   The average time to get project files ready fell by 20%.
    
-   For LFS-enabled projects, the average time to get project files ready fell by 54%, saving approximately 13 seconds per deployment on this step.
    
-   The 90th-percentile time to get project files ready fell by 22%. This means 90% of deployments finish this step in that time or less.
    

These improvements apply automatically, with no action required. Read the [Git deployment documentation](https://vercel.com/docs/git) to learn more.