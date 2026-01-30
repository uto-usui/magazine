---
title: "Deployment-level configuration for Fluid compute"
source: "https://vercel.com/changelog/deployment-level-configuration-for-fluid-compute"
publishedDate: "2025-10-02"
category: "frontend"
feedName: "Vercel"
author: "Florentin Eckl"
---

1 min read

Oct 2, 2025

You can now configure [Fluid compute](https://vercel.com/docs/fluid-compute) on a per-deployment basis.

By setting `"fluid": true` in your `vercel.json`, Fluid compute will be activated for that specific deployment. You can also enable or disable Fluid regardless of project level settings.

This allows teams to selectively test and adopt Fluid compute without changing the global project settings.

vercel.json

```
{   "$schema": "https://openapi.vercel.sh/vercel.json",  "fluid": true}
```

Read more in [our documentation](https://vercel.com/docs/fluid-compute#enable-for-specific-environments-and-deployments).