---
title: "Vercel Cron Jobs are now generally available"
source: "https://vercel.com/changelog/vercel-cron-jobs-are-now-generally-available"
publishedDate: "2023-11-15"
category: "frontend"
feedName: "Vercel"
author: "Andy Schneider"
---

1 min read

Nov 15, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7nZJdxuhoF1aaVK5CmxA8F%2F93f13685ef5c6b062c9f8ebc4313f2f7%2FCron_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FQQrMOqx6bcKD9LnlN1Ihe%2Fdd22086a9fee4e72a3544e8fcb78290c%2FCron_-_Dark.png&w=1920&q=75)

Vercel Cron Jobs let you to run scheduled jobs for things like data backups or archives, triggering updates to third-party APIs, sending email and Slack notifications, or any task you need to run on a schedule.

By using a specific syntax called a [cron expression](https://vercel.com/docs/cron-jobs#cron-expressions), you can define the frequency and timing of each task. Cron Jobs work with any frontend framework and can be defined in `vercel.json`. You can use them to run your [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions) and [Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions).

During the beta, we made Cron Jobs more secure by providing an environment variable with the name [`CRON_SECRET`](https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs). We also added support for [Deployment Protection](https://vercel.com/docs/security/deployment-protection) and [Instant Rollback](https://vercel.com/docs/deployments/instant-rollback).

Cron Jobs are now **included for customers on all plans**. Per account, users on the Hobby plan will have access to 2 Cron Jobs, users on the Pro plan will have access to 40 Cron Jobs, and users on the Enterprise plan will have access to 100 Cron Jobs.

Check out our [documentation](https://vercel.com/docs/cron-jobs) or [deploy an example with Cron Jobs](https://vercel.com/templates/next.js/vercel-cron).