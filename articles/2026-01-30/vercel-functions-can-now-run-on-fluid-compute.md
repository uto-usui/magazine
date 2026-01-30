---
title: "Vercel Functions can now run on Fluid compute"
source: "https://vercel.com/changelog/vercel-functions-can-now-run-on-fluid-compute"
publishedDate: "2025-02-04"
category: "frontend"
feedName: "Vercel"
author: "Mariano Cocirio"
---

1 min read

Feb 4, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6V2T1DCdHrU56msilfoSob%2F9248c02cc59e17512b05ccd632ca299b%2Ffluid-compute-changelog-og-image-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6hRxsSu9clthzdPr9JMJNM%2F199dee928449b07ac4e9c88d0df51ee4%2Ffluid-compute-changelog-og-image-dark.png&w=1920&q=75)

Vercel Functions can now run on [Fluid compute](https://vercel.com/fluid), bringing improvements in efficiency, scalability, and cost effectiveness. [Fluid is now available for all plans](https://vercel.com/blog/introducing-fluid-compute).

### [Link to heading](#what’s-new)**What’s New**

-   **Optimized concurrency:** Functions can handle multiple requests per instance, reducing idle time and lowering compute costs by **up to 85%** for high-concurrency workloads
    
-   **Cold start protection:** Fewer cold starts with smarter scaling and pre-warmed instances
    
-   **Optimized scaling:** Functions scale before instances, moving beyond the traditional 1:1 invocation-to-instance model
    
-   **Extended function lifecycle:** Use `waitUntil` to run background tasks after responding to the client
    
-   **Runaway cost protection:** Detects and stops infinite loops and excessive invocations
    
-   **Multi-region execution:** Requests are routed to the nearest of your selected compute region for better performance
    
-   **Node.js and Python support:** No restrictions on native modules or standard libraries
    

[Enable Fluid today](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions%23fluid-compute&title=Go+to+Function+Settings) or learn more in our [blog](https://vercel.com/blog/introducing-fluid-compute) and [documentation](https://vercel.com/docs/functions/fluid-compute).