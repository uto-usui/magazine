---
title: "AI traffic insights now available in Vercel Observability"
source: "https://vercel.com/changelog/ai-traffic-insights-now-available-in-vercel-observability"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Vercel"
author: "Mark Knichel"
---

You can now query AI traffic in [Vercel Observability](https://vercel.com/docs/observability) to understand how AI bots are accessing your site.

AI traffic insights show:

-   **Requests by verified AI bot:** how many requests each bot makes
    
-   **Most-crawled pages:** pages most frequently requested by AI crawlers for indexing or model training
    
-   **Assistant retrievals:** pages AI assistants fetch in response to user actions or search queries
    
-   **Markdown requests:** pages AI bots request in Markdown format
    
-   **Errors:** pages where requests from AI bots return errors
    

To view AI traffic insights, open [**Observability > AI Traffic**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fai-traffic) in the Vercel dashboard.

You and your agents can also query these metrics with `vercel metrics` in the [Vercel CLI](https://vercel.com/docs/cli/metrics#ai-traffic). CLI queries require Observability Plus.

```
vc metrics vercel.ai_traffic.count --group-by botName
```

AI traffic to your site broken down by bot name

Learn more in the [AI traffic documentation](https://vercel.com/docs/observability/insights#ai-traffic).