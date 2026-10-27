---
title: "Deleted deployments are permanently removed sooner"
source: "https://vercel.com/changelog/deleted-deployments-are-permanently-removed-sooner"
publishedDate: "2026-10-16"
category: "frontend"
feedName: "Vercel"
author: "Jay Gengelbach"
---

Deployments deleted before they are 30 days old now have a shorter [recovery period](https://vercel.com/docs/deployment-retention#restoring-a-deleted-deployment) before permanent deletion. As developers deploy more frequently on Vercel, this reduces the buildup of old deployments on the Recently Deleted page.

For successfully built deployments, the recovery period is the time you have to restore them after deletion:

**When the deployment is deleted**

**Time to restore after deletion**

By retention policy before it reaches 30 days old

Same length as the policy. A 7-day policy gives you 7 more days.

[Manually](https://vercel.com/docs/deployments/managing-deployments#delete-a-deployment), less than 1 day after creation

1 more day

Manually, at least 1 day but less than 30 days after creation

Same as its age at deletion. Delete it 3 days after creation, and you have 3 more days.

Manually or by retention policy, 30 days or more after creation

30 more days, unchanged

After this time, deployments are permanently deleted and cannot be restored. Unsuccessful deployments may be permanently deleted sooner.

Learn more in the [deployment retention documentation](https://vercel.com/docs/deployment-retention).