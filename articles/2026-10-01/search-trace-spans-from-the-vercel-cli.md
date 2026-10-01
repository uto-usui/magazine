---
title: "Search trace spans from the Vercel CLI"
source: "https://vercel.com/changelog/search-trace-spans-from-the-vercel-cli"
publishedDate: "2026-09-29"
category: "frontend"
feedName: "Vercel"
author: "Darpan Kakadia"
---

You and your coding agents can now search a project’s trace spans from the terminal with `vercel traces search`.

Each span represents one step in a request, helping you investigate errors, latency, and security-related behavior without opening the dashboard.

By default, `vercel traces search` returns up to 100 spans from the last hour, newest first, so you can search without first finding a request or trace ID. Filter results by environment, service, span name, status, deployment ID, request ID, trace ID, or span ID, or narrow the time range with `--since` and `--until`:

```
# error spans from the last hourvercel traces search --status error --since 1h# every span in one tracevercel traces search --trace-id 4bf92f3577b34da6a3ce929d0e0e4736
```

Find recent errors or inspect every span in a trace.

For filters without a dedicated option, use `--query` with Vercel's supported subset of [Kibana Query Langugage (KQL)](https://www.elastic.co/docs/reference/query-languages/kql). It supports fields such as duration, along with span and resource attributes:

```
# spans slower than two secondsvercel traces search --query 'span.duration > 2000'
```

Find spans that took longer than two seconds.

Add `--json` to output one JSON object per span, giving scripts and agents structured data to analyze.

Update to the latest Vercel CLI with `vercel upgrade`, then run `vercel traces search --help` to see all available options. Learn more in the `vercel traces` [documentation](https://vercel.com/docs/cli/traces).