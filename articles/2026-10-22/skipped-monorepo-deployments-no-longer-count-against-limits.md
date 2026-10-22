---
title: "Skipped monorepo deployments no longer count against limits"
source: "https://vercel.com/changelog/skipped-monorepo-deployments-no-longer-count-against-limits"
publishedDate: "2026-10-21"
category: "frontend"
feedName: "Vercel"
author: "Tom Knickman"
---

Deployments that Vercel [automatically skips](https://vercel.com/docs/monorepos#skipping-unaffected-projects) in a monorepo no longer count against your deployment rate limits. Teams with monorepos now get more deployments from the same limits.

Vercel skips a project's deployment when its source code and internal dependencies haven't changed, using [Turborepo](https://vercel.com/solutions/turborepo)'s package graph and lockfile analysis to determine which projects a commit affects.

Skipping is enabled by default for new monorepo projects. You can turn it on for existing projects under **Build and Deployment** in the [project's settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment%23root-directory&title=Go+to+Build+and+Deployment+settings).

Learn more about [skipping unaffected projects](https://vercel.com/docs/monorepos#skipping-unaffected-projects) and deployment [limits](https://vercel.com/docs/limits).