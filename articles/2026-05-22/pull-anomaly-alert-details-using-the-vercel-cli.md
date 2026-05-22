---
title: "Pull anomaly alert details using the Vercel CLI"
source: "https://vercel.com/changelog/pull-anomaly-alert-details-using-the-vercel-cli"
publishedDate: "2026-05-21"
category: "frontend"
feedName: "Vercel"
author: "Julia Shi"
---

1 min read

May 21, 2026

You can now access anomaly alerts and their details directly through the [Vercel CLI](https://vercel.com/docs/cli).

With the `vercel alerts` command, you can list all alerts for a team or given project. For each alert, you can view the start time, the type of alert, and whether or not the alert is still active.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7vutadreVqzFYg85alqvVw%2F7b6da92d6d521f7108135920dc0ebab3%2Fimage__5_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FxBgPyXNNjhFnkN7nBLywb%2F8e2092a559f689627cbe8c59e9547647%2Fimage__6_.png&w=1920&q=75)

With the `--ai` option, the AI investigation results appear alongside each alert. You and your agent can act on alerts without leaving the terminal.

```
vercel alerts --ai
```

Shows alert details with AI investigation results inline.

Available on [Observability Plus](https://vercel.com/docs/observability).

Learn more about `vercel alerts` in the [CLI documentation](https://vercel.com/docs/cli/alerts).