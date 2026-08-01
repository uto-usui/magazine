---
title: "AI Gateway logs now have a dedicated page"
source: "https://vercel.com/changelog/ai-gateway-logs"
publishedDate: "2026-07-31"
category: "frontend"
feedName: "Vercel"
author: "Sam Chitgopekar"
---

AI Gateway now has a dedicated [Logs page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Flogs&title=AI+Gateway+Logs) listing every request your team sends through the gateway, newest first, with cost, token counts, duration, and the model, provider, and region that served it. Open any request to see how it was routed. It's available at the team scope and per project.

## [Copy link to heading](#filter-and-search)Filter and search

Filter by provider, model, modality, credentials, or status, or search by model, provider, or request ID to jump straight to one request. Every filter is stored in the URL, so you can share a filtered view by copying the address. A chart above the table shows request counts over the selected range, and you can drag across it to zoom into a narrower window.

![Filter requests by provider, model, modality, and more. Drag across to zoom into a time range.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6YBBNhGgLhaaNjQMYuJuaH%2F473f730c29c868d788e9cd55e9ef7248%2Flightmode_2x.png&w=1920&q=75)![Filter requests by provider, model, modality, and more. Drag across to zoom into a time range.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3AYkHNvig2kKaItn5awMZk%2F6ee0d47eb6e7bde0c927181394fc55b4%2Ftest1_2x.png&w=1920&q=75)

Filter requests by provider, model, modality, and more. Drag across to zoom into a time range.

You can also export the current view as CSV or JSON, with your filters applied.

## [Copy link to heading](#drill-into-a-request)Drill into a request

Click any row to open its details next to the list: total cost, a token breakdown across input, output, reasoning, and cache reads and writes, duration, time to first token, and whether Zero Data Retention and region restrictions were applied.

The fallback path lists every provider attempt for the request in order. Each attempt shows the model, provider, status code, credentials, and how long it took, and failed attempts include the reason, such as a provider timeout or an exhausted routing budget.

![Open a request to see its cost and token breakdown, plus the full fallback path across providers.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1rRmoWJn3a6c76z8C5eJtg%2F3e54eb093debce4a6a96fdea4456739d%2FCleanShot_2026-07-30_at_17.32.02_2x.png&w=1920&q=75)![Open a request to see its cost and token breakdown, plus the full fallback path across providers.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FjyraGi6TQdHGOnp6oXkKw%2Fd469051c62673e94a6420aee0c80bb71%2FCleanShot_2026-07-30_at_17.31.49_2x.png&w=1920&q=75)

Open a request to see its cost and token breakdown, plus the full fallback path across providers.

To learn more about AI Gateway logs, [read the documentation](https://vercel.com/docs/ai-gateway/observability-and-spend/logs).