---
title: "Run scheduled jobs with Vercel Cron Jobs and Vercel Functions"
source: "https://vercel.com/changelog/run-scheduled-jobs-with-vercel-cron-jobs-and-vercel-functions"
publishedDate: "2023-02-22"
category: "frontend"
feedName: "Vercel"
author: "Vincent Voyer"
---

1 min read

Feb 22, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7nZJdxuhoF1aaVK5CmxA8F%2F93f13685ef5c6b062c9f8ebc4313f2f7%2FCron_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FQQrMOqx6bcKD9LnlN1Ihe%2Fdd22086a9fee4e72a3544e8fcb78290c%2FCron_-_Dark.png&w=1920&q=75)

Vercel Cron Jobs enable you to run scheduled jobs for automating backups and archiving, sending email and Slack notifications, and more. Cron jobs can be used for any task you need to run on a schedule.

By using a specific syntax called a [cron expression](https://vercel.com/docs/cron-jobs#cron-expressions), you can define the frequency and timing of each task. Cron jobs are supported in [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions), [Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), and the [Build Output API](https://vercel.com/docs/build-output-api/v3#build-output-configuration).

Vercel Cron Jobs are available in public beta. [Check out the documentation](https://vercel.com/docs/cron-jobs) to get started.