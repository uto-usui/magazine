---
title: "Cron jobs now support 100 per project on every plan"
source: "https://vercel.com/changelog/cron-jobs-now-support-100-per-project-on-every-plan"
publishedDate: "2026-01-20"
category: "frontend"
feedName: "Vercel"
author: "Andy Schneider"
---

1 min read

Jan 20, 2026

Cron jobs on Vercel no longer have per-team limits, and per-project limits were lifted to 100 on all plans.

Previously, all plans had a cap of 20 cron jobs per project, with per-team limits of 2 for Hobby, 40 for Pro, and 100 for Enterprise.

To get started, add cron entries to `vercel.json`:

vercel.json

```
{  "crons": [    {      "path": "/api/send-slack-notification",      "schedule": "*/10 * * * *"    },    {      "path": "/api/daily-backup",      "schedule": "0 2 * * * *"    },    {      "path": "/api/hourly-onboarding-emails",      "schedule": "0 * * * *"    }  ]}
```

An example of different Vercel Cron Jobs

You can also deploy the [Vercel Cron Job template](https://vercel.com/templates/template/vercel-cron).

Once you deploy, Vercel automatically registers your cron jobs. Learn more in the [Cron Jobs documentation](https://vercel.com/docs/cron-jobs).