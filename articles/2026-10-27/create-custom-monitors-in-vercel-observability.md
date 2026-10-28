---
title: "Create custom monitors in Vercel Observability"
source: "https://vercel.com/changelog/create-custom-monitors-in-vercel-observability"
publishedDate: "2026-10-26"
category: "frontend"
feedName: "Vercel"
author: "Fabio Benedetti"
---

You can now create custom monitors to get alerts based on your [Vercel Observability query](https://vercel.com/docs/query) results.

For example, you can track signals such as AI Gateway costs, Core Web Vitals and other performance metrics, Workflow and external API failure rates, or Vercel Sandbox CPU time.

Each monitor tracks a single metric, such as response time, or a ratio of two metrics, such as errors divided by total requests. Choose statistical anomaly detection or a fixed threshold, then configure the detection window, filters, and grouping.

To create a monitor, inspect a chart’s query in Observability, start from a preset, or open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts%3FcustomAlert%3Dtrue) for your team.

You can also define a custom monitor in a JSON file and create it with `vercel monitors add` in the [Vercel CLI](https://vercel.com/docs/cli/monitors). Run `vercel monitors schema --type custom` for the schema and examples.

Receive alerts through email, Slack, Vercel Inbox, push notifications, or team-level webhooks. You can also add context for [Vercel Agent](https://vercel.com/agent) to use when investigating an alert.

Custom monitors are available on Pro and Enterprise plans with Observability Plus, at $0.0035 per GB of data scanned. Built-in alerts remain included with Observability Plus.

[Create a custom monitor](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts%3FcustomAlert%3Dtrue) or learn more in the [configuration documentation](https://vercel.com/docs/alerts/configure-alerts#configure-custom-rules).