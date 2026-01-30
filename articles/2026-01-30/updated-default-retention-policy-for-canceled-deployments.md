---
title: "Updated default retention policy for canceled deployments"
source: "https://vercel.com/changelog/updated-default-retention-policy-for-canceled-deployments"
publishedDate: "2024-10-12"
category: "frontend"
feedName: "Vercel"
author: "Brooke Mosby"
---

1 min read

Oct 12, 2024

[We recently introduced](https://vercel.com/changelog/configure-retention-periods-for-deployments) the ability to manage deployment retention—a way to automatically clean up your project's deployments after a set period of time.

Starting November 18, 2024, we are changing the default retention policy for **canceled deployments only**. Canceled deployments will be automatically deleted after **30 days** for all projects, unless your project has a [custom deployment retention setting](https://vercel.com/docs/security/deployment-retention#setting-a-deployment-retention-policy). There will be no impact to deployments that are not canceled.

Learn more about [Deployment Retention](https://vercel.com/docs/security/deployment-retention).