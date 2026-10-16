---
title: "Deployment Storage billing begins for existing Pro teams"
source: "https://vercel.com/changelog/deployment-storage-pricing-expands-to-existing-teams"
publishedDate: "2026-10-09"
category: "frontend"
feedName: "Vercel"
author: "Jay Gengelbach"
---

[Deployment Storage](https://vercel.com/docs/deployment-storage) and Functions Storage billing will begin for all Pro teams at $0.10 per GB-month. Check your email for details about when billing will start for your team. To keep storage costs low, the deployment retention window also changes to 30 days.

Deployments older than 30 days will be deleted starting October 23, unless you opt out in your retention settings before then. Retention settings already at 30 days or shorter are unchanged.

### [Copy link to heading](#control-your-deployment-storage)Control your Deployment Storage

Review retention periods for Pre-Production, Production, Canceled, and Errored deployments with a [Deployment Retention Policy](https://vercel.com/docs/deployment-retention). Shorter periods reduce stored history, and deleted deployments cannot be used for rollback.

See Deployment Storage and Functions Storage per project on the Usage page.

Reduce future deployment size by removing unnecessary build files, moving large assets to Vercel Blob, and shrinking Function bundles.

Read the [storage optimization guide](https://vercel.com/docs/deployment-storage/optimize).