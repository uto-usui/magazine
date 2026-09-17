---
title: "Hobby projects now retain fewer deployments to free up storage"
source: "https://vercel.com/changelog/hobby-projects-now-retain-fewer-deployments-to-free-up-storage"
publishedDate: "2026-09-16"
category: "frontend"
feedName: "Vercel"
author: "Jay Gengelbach"
---

Hobby projects now retain fewer deployments past the 30-day retention window. Hobby teams get 10GB of [Deployment Storage](https://vercel.com/docs/deployment-storage). Every deployment you keep uses some of it, and going over the limit can block you from deploying until you free some up. [Deployment Retention](https://vercel.com/docs/deployment-retention) for Hobby teams now deletes old deployments sooner, so dormant projects stop holding storage that your active projects need.

Each Hobby project now keeps its 3 most recent production deployments, plus its 3 most recent deployments of any type, regardless of age. Preview deployments no longer get their own protection. Your current production deployment is still never deleted, and aliased and active-branch deployments are still protected. See the [full list of exceptions in the docs](https://vercel.com/docs/deployment-retention#exceptions-to-the-retention-policy).

If your team is over the 10GB limit, deployments outside those exceptions are now deleted immediately instead of after 30 days.

To stay under the limit, see [how to optimize your Deployment Storage usage](https://vercel.com/docs/deployment-storage/optimize), or upgrade to [Pro](https://vercel.com/docs/plans/pro-plan), where storage is billed at $0.10 per GB per month.