---
title: "Audit Log Drains now support Datadog, Splunk, and Panther"
source: "https://vercel.com/changelog/audit-log-drains-now-support-datadog-splunk-and-panther"
publishedDate: "2026-08-07"
category: "frontend"
feedName: "Vercel"
author: "Luka Hartwig"
---

Audit Log Drains now stream your team's audit events into [Datadog](https://vercel.com/docs/drains/audit-logs-to-datadog), [Splunk](https://vercel.com/docs/drains/audit-logs-to-splunk), and [Panther](https://vercel.com/docs/drains/audit-logs-to-panther), joining the existing custom HTTPS endpoint and Amazon S3 destinations.

An [Audit Log Drain](https://vercel.com/docs/drains/reference/audit-logs) forwards every event from your team's Activity Log, plus additional audit metadata, to the destination you choose. They're available on Enterprise plans.

To create one, go to [Drains](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fdrains) in your team settings. Click Add Drain, choose Audit Log as the data type, and pick a destination.

Audit Log Drains replace [Custom SIEM Log Streaming](https://vercel.com/docs/audit-log#custom-siem-log-streaming). If you already stream audit logs to a SIEM, follow the [migration guide](https://vercel.com/docs/audit-log/migrating-to-drains) to move your integration over.

Learn more about [Drains](https://vercel.com/docs/drains) in the documentation.