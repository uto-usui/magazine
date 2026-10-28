---
title: "Vercel Agent can now validate alerts before paging"
source: "https://vercel.com/changelog/vercel-agent-can-now-validate-alerts-before-paging-you"
publishedDate: "2026-10-26"
category: "frontend"
feedName: "Vercel"
author: "Fabio Benedetti"
---

[Vercel Agent](https://vercel.com/agent) can now investigate alerts from [Vercel monitors](https://vercel.com/changelog/create-custom-monitors-in-vercel-observability) before they reach your paging system. With validation enabled for a webhook destination, only alerts Agent classifies as **Critical** are sent to it.

To enable validation:

1.  Open a monitor’s notification settings and create or link a webhook destination for your paging system, such as incident.io.
    
2.  Select **Critical Only** next to that destination.
    

You can also configure notification destinations with the [Vercel CLI](https://vercel.com/docs/cli/monitors) using `vercel monitors notifications`. Add `--critical-only` when linking or updating a webhook destination.

Agent checks logs and metrics to assess impact. For example, it can identify health-check errors that don’t affect customers or confirm sustained 5xx errors affecting checkout requests. You can also add context to each monitor to guide Agent’s investigation.

Alert validation is available on Pro and Enterprise plans with Observability Plus. Observability Plus includes 10 Agent investigations per billing cycle, with [additional investigations billed separately](https://vercel.com/docs/agent/pricing). Custom monitors cost $0.0035 per GB of data scanned. Built-in alerts remain included with Observability Plus.

Learn more in the [alert webhook documentation](https://vercel.com/docs/alerts/configure-alerts#configure-webhooks).