---
title: "Expanded search for workflow runs in Vercel Observability"
source: "https://vercel.com/changelog/expanded-search-for-workflow-runs-in-vercel-observability"
publishedDate: "2026-07-31"
category: "frontend"
feedName: "Vercel"
author: "Karthik Kalyanaraman"
---

The runs list for [Vercel Workflows](https://vercel.com/docs/workflows) in Observability now has structured search, giving you more ways to find and investigate runs.

-   **Structured filters:** Filter runs by workflow, environment, deployment ID, [region](https://vercel.com/docs/regions), or any custom run attribute. Paste a run ID to pull up that exact run.
    
-   **Smarter suggestions:** The search bar suggests filters and values from your project's run data as you type, and recent searches are saved per project.
    
-   **Editable queries:** Applied filters appear as removable chips that combine in one query, and the query lives in the URL, so a filtered view can be shared as a link and restores on load.
    

For example, `workflow:sendEmail environment:preview region:iad1` pulls up preview runs of one workflow in one region, since the list otherwise shows production runs.

Search your runs from the Workflows tab in [Vercel Observability](https://vercel.com/docs/observability).