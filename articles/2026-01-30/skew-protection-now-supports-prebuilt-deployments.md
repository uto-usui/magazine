---
title: "Skew Protection now supports prebuilt deployments"
source: "https://vercel.com/changelog/skew-protection-now-supports-prebuilt-deployments"
publishedDate: "2026-01-28"
category: "frontend"
feedName: "Vercel"
author: "Brooke Mosby"
---

1 min read

Jan 28, 2026

Skew Protection can now be used with `vercel deploy --prebuilt` deployments.

For teams building locally and uploading with `--prebuilt`, you can now set a custom `deploymentId` in your `next.config.js`:

next.config.js

```
module.exports = {  deploymentId: process.env.GIT_SHA || 'my-deployment-id',}
```

This ID is written to `routes-manifest.json` and used by Vercel for skew protection routing. You control the ID lifecycle, using the same ID across multiple prebuilt deployments or updating it when deploying new versions.

This feature enables Skew Protection support for the specific workflow of building applications locally and then uploading them to Vercel.

Learn more about [Skew Protection](https://vercel.com/docs/skew-protection).