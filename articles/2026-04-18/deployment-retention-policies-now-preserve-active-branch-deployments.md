---
title: "Deployment retention policies now preserve active branch deployments"
source: "https://vercel.com/changelog/deployment-retention-policies-now-preserve-active-branch-deployments"
publishedDate: "2026-04-17"
category: "frontend"
feedName: "Vercel"
author: "Jay Gengelbach"
---

1 min read

Apr 17, 2026

Retention policies no longer delete the latest preview deployment for branches with open or unmerged pull requests. Previously, deployments for active branches could be removed if they exceeded the configured retention window.

This means you can safely use shorter retention windows without risking losing active preview deployments. This change applies to all plans.

Your 10 most recent production deployments and any aliased deployments continue to be preserved regardless of retention settings.

Learn more about [Deployment Retention](https://vercel.com/docs/deployment-retention).