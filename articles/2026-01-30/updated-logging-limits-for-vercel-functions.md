---
title: "Updated logging limits for Vercel Functions"
source: "https://vercel.com/changelog/updated-logging-limits-for-vercel-functions"
publishedDate: "2025-01-09"
category: "frontend"
feedName: "Vercel"
author: "Craig Andrews"
---

1 min read

Jan 9, 2025

The [runtime log](https://vercel.com/docs/observability/runtime-logs) limits for [Vercel Functions](https://vercel.com/docs/functions) have been increased, allowing for significantly larger log entries. These updates replace the previous 4KB-per-line restriction, and they are now live for all projects.

**The runtime log limits are now:**

-   **Log line size:** Up to 256KB per log line.
    
-   **Log line count:** Up to 256 individual log lines per request.
    
-   **Total log size per request:** Up to 1MB (sum of all log lines in a single request).
    

Learn more about our logs in [our documentation](https://vercel.com/docs/observability/runtime-logs).