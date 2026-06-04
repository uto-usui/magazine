---
title: "Trace any Vercel request from the CLI"
source: "https://vercel.com/changelog/trace-any-vercel-request-from-the-cli"
publishedDate: "2026-05-15"
category: "frontend"
feedName: "Vercel"
author: "Andrew Gadzik"
---

1 min read

May 15, 2026

You can now generate [Session Traces](https://vercel.com/docs/tracing/session-tracing) through the Vercel CLI.

Use the new `vercel curl --trace` command to generate an OpenTelemetry trace to the specified endpoint from the terminal.

```
vercel curl --trace https://your-app.vercel.app/api/products
```

Generate a Session Trace from the CLI

Use the new `vercel traces get` command to fetch the generated trace by request ID.

```
vercel traces get f47ac10b-58cc-4372-a567-0e02b2c3d479
```

Fetch the tracing data by request ID from the CLI

Available on all plans.  
  
Update the Vercel CLI to the latest version and run `vercel curl --trace` to get started. Learn more about the [`vercel curl` CLI command.](https://vercel.com/docs/cli/curl)