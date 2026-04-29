---
title: "Native Deployment Checks are now available"
source: "https://vercel.com/changelog/native-deployment-checks"
publishedDate: "2026-04-28"
category: "frontend"
feedName: "Vercel"
author: "Cody Wong"
---

1 min read

Apr 28, 2026

You can now run lint and typecheck on every Vercel deployment, in parallel with the build. Native Deployment Checks are available to every team and join your existing [Deployment Checks](https://vercel.com/docs/deployment-checks) alongside GitHub and Marketplace integrations.

Once added from your project's [Build and Deployment settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment%23deployment-checks), Vercel runs the matching script from your `package.json` on each deployment, and skips the check if no matching script exists. You can mark a check as required to hold the deployment from production until it passes, and choose which environments each check runs on.

When a Native Deployment Check fails on a pull request, [Vercel Agent](https://vercel.com/docs/agent) investigates the failure and suggests a fix you can review and merge.