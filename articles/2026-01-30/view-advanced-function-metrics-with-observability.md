---
title: "View advanced function metrics with Observability"
source: "https://vercel.com/changelog/view-advanced-function-metrics-with-observability"
publishedDate: "2024-10-30"
category: "frontend"
feedName: "Vercel"
author: "Tobias Lins"
---

1 min read

Oct 30, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7iytHUPlRdK0buaqt1gw8m%2Fd45c4a9791a26e35f6b413981538a5df%2FAdvances_Function_Metrics_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5cbIVMvM54jvDjRqzAANCl%2F790bcd2a95f58d255e1ab390e6f07cf9%2FAdvances_Function_Metrics_-_Dark.png&w=1920&q=75)

Users in the [limited beta of Observability](https://vercel.com/changelog/application-aware-observability-in-limited-beta-5POkb52n4XdTZvwbMCqljG) can now view advanced insights for serverless Vercel Functions. Explore low level metrics about function execution, including:

-   **CPU throttle and memory usage**: Understand CPU usage and memory consumption and see if you could benefit from upgrading the function to more resources
    
-   **Time to First Byte (TTFB)**: See how quickly your function responds to requests by sending the first bytes of the response
    
-   **Function start type**: View cold start and pre-warmed function invocation rates
    

Observability is in [limited beta](https://vercel.com/docs/release-phases#limited-beta) for current [Monitoring](https://vercel.com/docs/observability/monitoring#monitoring) users and can be accessed from the new Observability tab in your Vercel projects.