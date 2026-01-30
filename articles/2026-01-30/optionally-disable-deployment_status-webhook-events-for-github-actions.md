---
title: "Optionally disable deployment_status webhook events for GitHub Actions"
source: "https://vercel.com/changelog/optionally-disable-deployment_status-webhook-events-for-github-actions"
publishedDate: "2025-05-01"
category: "frontend"
feedName: "Vercel"
author: "Erika Rowland"
---

1 min read

May 1, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F58vBDeSvRu4zPSOllApkXZ%2Fae233303f9783a252cdf3e707a6d0484%2Fdeployment_status_events_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2tajWiyCFFr9oFYTrJFJ36%2F83ad633471acbbd224a5163288a55cf4%2Fdeployment_status_events_-_Dark.png&w=1920&q=75)

You can now disable the [`deployment_status` webhook event](https://docs.github.com/en/webhooks/webhook-events-and-payloads#deployment_status) that Vercel sends to GitHub when Vercel is connected to your GitHub repository.

When `deployment_status` events are enabled, GitHub's pull request activity will create a log with a status event for every deployment. While this can keep your team better informed, it can also create noisy event logs for repositories with many deployment events, especially in monorepos with many projects.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3pczJCHM1o1D9hyJmsQZPP%2Fe743fc5b23b9be5eadbafef7deef442b%2FChangelog_Image_752__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F32gnXKTR0EONpiqoVrRon7%2Fdb927b83f4170bfc7ea1862e1fcde5fd%2FChangelog_Image_751__2_.png&w=1920&q=75)

Disabling these events prevents repeated messages from cluttering your GitHub PR's event history, giving you a cleaner, more focused view of your pull request activity. The Vercel Github comment containing links to your preview deployments will continue to be posted as before.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6Whhz8vnOnvj9D9mVZ1XW0%2F5b39f22344f5cda59260333b4969d6a4%2FChangelog_Image_753__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5UFeUPGH4to3wIwEZ0Ux4u%2F053aa6c66da9a52dc6cb2c4534073ddc%2FChangelog_Image_754.png&w=1920&q=75)

The [`deployment_status` event](https://docs.github.com/en/rest/deployments/deployments?apiVersion=2022-11-28) is most often used as a trigger for GitHub Actions. We recommend [migrating to `repository_dispatch` events](https://vercel.com/docs/git/vercel-for-github#migrating-from-deployment_status) to simply workflows with richer Vercel deployment information.

[Learn more in the documentation](https://vercel.com/docs/git/vercel-for-github#silence-deployment-notifications-on-pull-requests).