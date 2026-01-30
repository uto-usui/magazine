---
title: "Trigger GitHub Actions with enriched deployment data from Vercel"
source: "https://vercel.com/changelog/trigger-github-actions-with-enriched-deployment-data-from-vercel"
publishedDate: "2025-04-07"
category: "frontend"
feedName: "Vercel"
author: "Erika Rowland"
---

1 min read

Apr 7, 2025

You can now trigger GitHub Actions workflows in response to Vercel deployment events with enriched data using [`repository_dispatch` events](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#repository_dispatch). These events are sent from Vercel to GitHub, enabling more flexible, cost-efficient CI workflows, and easier [end-to-end testing for Vercel deployments](https://vercel.com/guides/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment).

Previously, we recommended using [`deployment_status` events](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#deployment_status), but these payloads were limited and required extra parsing or investigation to understand what changed.

With `repository_dispatch`, Vercel sends custom JSON payloads with full deployment context—allowing you to reduce Github Actions overhead and streamline your CI pipelines.

We recommend [migrating to `repository_dispatch`](https://vercel.com/docs/git/vercel-for-github#repository-dispatch-events) for a better experience. `deployment_status` events will continue to work for backwards compatibility.