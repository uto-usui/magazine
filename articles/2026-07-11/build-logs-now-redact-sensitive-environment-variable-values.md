---
title: "Build logs now redact Sensitive Environment Variable values"
source: "https://vercel.com/changelog/build-logs-now-redact-sensitive-environment-variable-values"
publishedDate: "2026-07-09"
category: "frontend"
feedName: "Vercel"
author: "Andrew Healey "
---

When an Environment Variable is marked Sensitive and has a value 32 characters or longer, Vercel now replaces it with `[REDACTED]` in the deployment's build logs.

The Build Logs view also indicates when redaction happened, giving teams visibility into why output was masked without ever exposing the underlying value. When a value is redacted, Vercel logs the Environment Variable key, project, and deployment in the Activity Log, but never the value.

Vercel also redacts selected system Environment Variables used for deployment security.

Learn more about [Sensitive Environment Variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables).