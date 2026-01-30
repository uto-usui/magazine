---
title: "Correlate logs and traces with OpenTelemetry in Vercel Log Drains"
source: "https://vercel.com/changelog/correlate-logs-and-traces-with-opentelemetry-in-vercel-log-drains"
publishedDate: "2025-07-04"
category: "frontend"
feedName: "Vercel"
author: "Darpan Kakadia"
---

1 min read

Jul 4, 2025

Vercel now automatically correlates logs with distributed traces for customers using OpenTelemetry to instrument their applications.

Traces are a way to collect data about the performance and behavior of your application and help identify the cause of performance issues, errors, and other problems. [OpenTelemetry (OTel)](https://vercel.com/docs/otel) is an open source project that allows you to instrument your application to collect traces.

When a request is traced using OTel, Vercel will enrich the relevant logs with trace and span identifiers. This allows you to correlate your individual logs to a trace or span.

This feature is available to customers using log drains through our integrations with Datadog and Dash0. No action is required and log to trace correlation will happen automatically going forward for customers using OTel with any of these integrations.

Learn more about [correlating logs to traces using log drains](https://vercel.com/docs/drains/using-drains#logs-and-traces-correlation).