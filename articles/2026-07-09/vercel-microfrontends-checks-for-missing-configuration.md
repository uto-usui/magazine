---
title: "Vercel Microfrontends checks for missing configuration"
source: "https://vercel.com/changelog/vercel-microfrontends-checks-for-missing-configuration"
publishedDate: "2026-07-08"
category: "frontend"
feedName: "Vercel"
author: "Cody Wong"
---

The Microfrontends Config Present [deployment check](https://vercel.com/docs/deployment-checks) prevents broken production routing by blocking any default app deployment that is missing its `microfrontends.json`. This appears alongside other [Native Deployment Checks](https://vercel.com/docs/deployment-checks#native-deployment-checks), such as lint and typecheck.  

The check is blocking by default for eligible apps, with no opt-in required. Eligible apps are projects enrolled in [Vercel Microfrontends](https://vercel.com/docs/microfrontends) and designated as the default app in a Microfrontends group. If `microfrontends.json` is missing from the deployment's build outputs, the check fails and prevents the deployment from reaching production.

This can happen when a deployment from an older branch without the Microfrontends config is manually promoted. The check passes on the next deployment once `microfrontends.json` is included in the build outputs.

To adjust check behavior, visit your project's [Build and Deployment Settings](https://vercel.com/docs/projects/overview#build-and-development-settings).