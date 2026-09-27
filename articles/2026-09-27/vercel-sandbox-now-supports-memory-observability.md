---
title: "Vercel Sandbox now supports memory observability"
source: "https://vercel.com/changelog/vercel-sandbox-now-supports-memory-observability"
publishedDate: "2026-09-25"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

[Vercel Sandbox observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability%2Fsandboxes&title=Sandbox+Observability) now includes memory usage data.

You can access sandbox memory usage data in the dashboard and through the CLI via the `vercel metrics` command.

### [Copy link to heading](#sandbox-observability-memory-in-the-dashboard)Sandbox observability memory in the dashboard

The Memory Usage card reports average, P75, and P95 memory across your sandboxes, alongside the existing CPU usage and data transfer metrics on the sandbox overview page and the project and team-level pages.

![The Memory Usage card in the Sandbox observability dashboard shows usage over time, including metrics for P75, P95, and the average.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fcaee82d0eaec0e8710b08c1b%2F483c242f276f51b9e85c07cb7ffb5f27%2FCleanShot_2026-09-24_at_12.18.08_PM_2x.png&w=1920&q=95)![The Memory Usage card in the Sandbox observability dashboard shows usage over time, including metrics for P75, P95, and the average.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fca49a0df6efc49c83befce93%2F87aa458d24cccdd09bbf930e47519891%2FCleanShot_2026-09-24_at_12.12.29_PM_2x.png&w=1920&q=95)

The Memory Usage card in the Sandbox observability dashboard shows usage over time, including metrics for P75, P95, and the average.

On the sandbox detail page, charts are designed to show how close a sandbox is running to its memory ceiling by:

-   Automatically scaling the y-axis to sandbox's memory limit
    
-   Adding a dashed reference line at 85% of that limit
    

Sandbox memory is also available in the Observability query builder as the `memoryUsedBytes` measure on the sandbox usage event. You can build custom queries against it and create alerts from the chart.

### [Copy link to heading](#sandbox-memory-observability-in-the-cli)Sandbox memory observability in the CLI

Sandbox observability data is also available through the Vercel CLI via the `vercel metrics` command under `vercel.sandbox.memory_used_bytes`. Run the command in a linked project for project-specific data, or append `--all` to see aggregate data across all projects in your team.

![You can access Sandbox memory usage data via the Vercel CLI.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ZZXaG9jPzVsKx6kO9NP54%2F17e9d98dffd71989ac330abc712135c0%2Fchangelog-terminal-light.png&w=1920&q=95)![You can access Sandbox memory usage data via the Vercel CLI.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7L6O4jZR6Ly4M96Z9hgh4L%2F7221992b6717704bd275f4d267172143%2Fchangelog-terminal-dark.png&w=1920&q=95)

You can access Sandbox memory usage data via the Vercel CLI.

The CLI returns:

-   The metric
    
-   The reporting period
    
-   The measurement interval
    
-   The project the sandbox is associated with
    
-   A graph of memory usage, with min, max and avg values
    

Learn more in the [Sandbox documentation](https://vercel.com/docs/sandbox).