---
title: "Query Speed Insights from the Vercel CLI"
source: "https://vercel.com/changelog/query-speed-insights-from-the-vercel-cli"
publishedDate: "2026-06-29"
category: "frontend"
feedName: "Vercel"
author: "Damien Simonin Feugas"
---

You can now query Speed Insights datapoints directly through the Vercel CLI.

Using the `vercel metrics` command, you can pull core [Web Vitals](https://web.dev/articles/vitals) (LCP, INP, CLS) and other page performance metrics (FCP, TTFB) based on client-side measurements from real user traffic.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F46AvPCNl0AffcCAyhSY0vn%2F146cadad0448608ee2d8db79e7232616%2Fspeed_insights_cli_light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F44lrudw20AhNV6MPmIOMXE%2Fe96f1c8b1229eeb80068fb6dca0a9c8d%2Fspeed_insights_cli_dark.png&w=1920&q=75)

By providing a coding agent access to the CLI, an agent can answer questions such as:

-   Which pages' INP have regressed since last week?
    
-   How is the perceived speed of my home page in Asia?
    
-   Compare the CLS of the dashboard between mobile and desktop.
    

For more details on how to use the CLI command and a complete list of supported metrics, dimensions, filters, and query options, explore the [documentation](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli).