---
title: "Runtime logs can now be filtered by request type and Vercel resource"
source: "https://vercel.com/changelog/runtime-logs-can-now-be-filtered-by-request-type-and-vercel-resource"
publishedDate: "2025-01-07"
category: "frontend"
feedName: "Vercel"
author: "Luc Leray"
---

1 min read

Jan 7, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3xPcKpt76jiO52JFztF7z5%2Fe4b7179618e5007b9b95846faf023722%2FNew_Filters_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FqBuODfj1bZcDuTQxKFWJU%2F1ec62fbc3b365abc7071ae2967474d96%2FNew_Filters_-_Dark.png&w=1920&q=75)

The "Contain Types" filter in [runtime logs](https://vercel.com/docs/observability/runtime-logs) has been replaced by two new filters for better clarity:

1.  **Resource**: Filters which infrastructure resource within the Vercel Edge Network was used to serve the request. Examples include Serverless Functions, Edge Cache, and Edge Middleware
    
2.  **Request Type**: Filters which framework-defined mechanism or rendering strategy was used by the request. Examples include API routes, Incremental Static Regeneration (ISR), and cron jobs
    

These updates provide more granular insights into how your requests are processed. Both filters are available on all plans starting today.

Learn more about [how Vercel processes requests](https://vercel.com/blog/life-of-a-vercel-request-what-happens-when-a-user-presses-enter).