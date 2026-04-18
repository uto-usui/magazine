---
title: "Anomaly alert configuration now available"
source: "https://vercel.com/changelog/anomaly-alert-configuration-now-available"
publishedDate: "2026-04-10"
category: "frontend"
feedName: "Vercel"
author: "Fabio Benedetti"
---

1 min read

Apr 10, 2026

You can now granularly configure [anomaly alerts](https://vercel.com/docs/alerts) to define exactly which unexpected spikes and errors matter to your application. Alert rules give you detection-level control, allowing you to customize which projects, alert types, metrics, HTTP status codes, and specific routes you monitor for anomalies.

For the anomalies you choose to track, Vercel automatically investigates your logs and metrics to identify the root cause, routing those findings to distinct destinations like dedicated Slack channels or individual emails.

When you configure a rule to silence a specific pattern, anomaly detection skips that traffic entirely, preventing anomalies from appearing in your dashboard and stopping notifications before they trigger.

This feature is available for teams using Observability Plus at no additional cost.

[Try it out](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) or learn more about [alert rules](https://vercel.com/docs/observability).