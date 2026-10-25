---
title: "Deployments now show build cache size"
source: "https://vercel.com/changelog/deployments-now-show-build-cache-size"
publishedDate: "2026-10-23"
category: "frontend"
feedName: "Vercel"
author: "Mehul Kar"
---

Deployment summaries now show the size of the build cache each deployment saved and how close it is to the limit for its [build machine](https://vercel.com/docs/builds/managing-builds#build-machines). The same information is in the CLI with `vercel inspect` on version 65.1.0 or newer, and in the [get-deployment REST API endpoint](https://vercel.com/docs/rest-api/deployments/get-a-deployment-by-id-or-url).

Uploading the build cache is billable build time, and a cache that goes over the limit is discarded, so the next build starts without one.

This is on by default on all plans for deployments built on or after October 21. See the [maximum build cache size for each build machine](https://vercel.com/docs/limits#build-cache-maximum-size) in the docs.