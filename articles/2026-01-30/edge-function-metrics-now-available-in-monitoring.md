---
title: "Edge Function metrics now available in Monitoring"
source: "https://vercel.com/changelog/edge-function-metrics-now-available-in-monitoring"
publishedDate: "2025-01-30"
category: "frontend"
feedName: "Vercel"
author: "Tobias Lins"
---

1 min read

Jan 30, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FlDFlx11ayGcSZI7RrvgZy%2Fa82a3efc16e8f691403c6b18dcf0d5b0%2Fimage.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1UcWyWgJHTQ23qf7GFfay9%2F5596e123d52500541574cf3d970d94f8%2Fimage.png&w=1920&q=75)

Monitoring now includes three new metrics for Edge Functions to provide a comprehensive view of your Edge Function activity and performance:

-   [Edge Function Invocations](https://vercel.com/docs/pricing/edge-functions#optimizing-function-invocations)**:** Tracks the total number of times your Edge Functions are invoked, including both successful and errored calls
    
-   [Edge Function Execution Units](https://vercel.com/docs/pricing/edge-functions#managing-execution-units)**:** Measures the CPU time your Edge Functions use, calculated in 50ms increments
    
-   [Fast Origin Transfer](https://vercel.com/docs/pricing/networking#fast-origin-transfer) (Incoming and Outgoing)**:** Track data transfer rates to and from your origin servers
    

These metrics are available for all [Observability Plus](https://vercel.com/docs/observability#enabling-observability-plus) and [Monitoring](https://vercel.com/docs/observability/monitoring) customers.

Monitoring [recently became part of Observability Plus](https://vercel.com/changelog/monitoring-pricing-reduced-up-to-87).