---
title: "Turbo build machines can now be enabled per deployment"
source: "https://vercel.com/changelog/turbo-build-machines-can-now-be-enabled-per-deployment"
publishedDate: "2026-09-17"
category: "frontend"
feedName: "Vercel"
author: "Mehul Kar"
---

You can now opt into Turbo build machines on any individual deployment. This is useful when you need to increase resources temporarily without changing project settings. You can do this in three ways:

1.  Include `#VERCEL_BUILD_MACHINE=TURBO` in your Git commit message before pushing to GitHub
    
2.  Use `vc deploy --turbo` (Vercel CLI 59.20.0 or later)
    
3.  Set `buildMachine` to `turbo` when creating a deployment with [the REST API](https://vercel.com/docs/rest-api/deployments/create-a-new-deployment)
    

Learn more in the [managing builds documentation](https://vercel.com/docs/builds/managing-builds#selecting-a-build-machine-per-deployment).