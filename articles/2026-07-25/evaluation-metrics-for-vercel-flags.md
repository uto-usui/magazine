---
title: "Evaluation metrics for Vercel Flags"
source: "https://vercel.com/changelog/evaluation-metrics-for-vercel-flags"
publishedDate: "2026-07-23"
category: "frontend"
feedName: "Vercel"
author: "Luis Meyer"
---

[Vercel Flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags) now shows a live evaluation view on each flag's detail page. You can see evaluations per minute charted over time, with each flag version marked in the chart so you can tie evaluation shifts to specific configuration changes.

You can group and filter evaluations by variant, reason, environment, SDK key, client, and reporting project. Custom clients can set the new `clientName` property on the client initializer to show up as their own group. This makes it straightforward to confirm rollout percentages match what's being served, separate targeted matches from default fallbacks, and see which projects are using a given flag.

Upgrade to `@vercel/flags-core` 1.6.0 or later to get started. Metrics appear automatically with no additional configuration.

Learn more in the [evaluation metrics documentation](https://vercel.com/docs/flags/vercel-flags/evaluation-metrics).