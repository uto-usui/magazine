---
title: "Automate progressive rollouts with Vercel Flags"
source: "https://vercel.com/changelog/progressive-rollouts-in-vercel-flags"
publishedDate: "2026-05-11"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

May 11, 2026

You can now use [Vercel Flags](https://vercel.com/docs/flags) to roll out a feature to a growing percentage of users on a schedule, with progressive rollouts.

Unlike weighted splits, which hold a fixed distribution (for example, 50/50) for experiments, a progressive rollout follows a predefined schedule that gradually shifts the traffic percentage to the new variant. Each stage has a target percentage and a duration.

Exposing a change in stages lets you catch a regression on a small slice of users before it hits everyone.

Progressive rollouts are [now available in the dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fflags&title=Vercel+Flags) and through the new `vercel flags rollout` CLI command.

Learn more in the [Vercel Flags documentation](https://vercel.com/docs/flags).