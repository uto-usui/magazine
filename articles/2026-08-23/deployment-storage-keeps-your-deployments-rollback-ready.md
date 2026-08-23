---
title: "Deployment Storage keeps your deployments rollback-ready"
source: "https://vercel.com/changelog/deployment-storage-keeps-your-deployments-rollback-ready"
publishedDate: "2026-08-21"
category: "frontend"
feedName: "Vercel"
author: "Jay Gengelbach"
---

Every deployment produces a set of files, including the pages, functions, and assets Vercel serves. Deployment Storage keeps those files available so you can inspect previous deployments and roll back when needed.

**Instantly roll back to previous deployments in seconds**

If a production deploy ships a bug or a change you want to reverse, rolling back restores the previous version in seconds. Open your project, click [Instant Rollback](https://vercel.com/docs/instant-rollback) on the Production Deployment tile, then choose an earlier production deployment. Vercel immediately repoints your domains to that deployment, with no rebuild required.

**Deployment Storage pricing**

-   Deployment Storage is billed at $0.10 per GB per month
    
-   Hobby teams include up to 10 GB
    

Existing teams continue with their current pricing, with no change to their bill at this time.

**C****ontrol how much Deployment Storage you keep:**

-   Edit your [Deployment Retention Policy](https://vercel.com/docs/deployment-retention) to set how long Pre-Production, Production, Canceled, and Errored deployments stay available. Shorter retention means less storage, but you can't roll back to a deleted deployment
    
-   The Usage page shows Deployment Storage and Functions Storage by project
    
-   Keep future deployments smaller by trimming your output directory, moving large files to Vercel Blob, and reducing Function bundle size
    

Learn more about Deployment Storage [here](https://vercel.com/docs/deployment-storage/optimize).