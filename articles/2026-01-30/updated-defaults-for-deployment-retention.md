---
title: "Updated defaults for deployment retention"
source: "https://vercel.com/changelog/updated-defaults-for-deployment-retention"
publishedDate: "2025-09-15"
category: "frontend"
feedName: "Vercel"
author: "Luke Phillips-Sheard"
---

1 min read

Sep 15, 2025

Starting October 15, 2025, Vercel will update the default deployment retention policy for all projects currently using the legacy “unlimited” setting:

-   Canceled Deployments - **30 days**, with a maximum of **1 year.**
    
-   Errored Deployments - **3 months**, with a maximum of **1 year.**
    
-   Pre-Production Deployments - **6 months**, with a maximum of **3 years.**
    
-   Production Deployments - **1 year**, with a maximum of **3 years.**
    

Projects with a [custom deployment retention setting](https://vercel.com/docs/security/deployment-retention#setting-a-deployment-retention-policy) will not be affected. Additionally, before October 15, the "unlimited" option will become unavailable when modifying retention policies.

Team owners can configure a default retention policy to be applied to any new projects created under the team on [Teams > Security & Privacy > Deployment Retention Policy](https://vercel.com/dashboard/~/settings/security#deployment-retention-policy). This policy can also be easily applied to all existing projects.

_Note that your 10 most recent production deployments and any currently aliased deployment will never be deleted, regardless of age._

Learn more about [Deployment Retention](https://vercel.com/docs/security/deployment-retention).