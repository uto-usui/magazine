---
title: "More granular observability for Vercel Sandbox"
source: "https://vercel.com/changelog/more-granular-observability-for-vercel-sandbox"
publishedDate: "2026-07-07"
category: "frontend"
feedName: "Vercel"
author: "Brandon Tuttle"
---

[Vercel Sandbox](https://vercel.com/sandbox) observability now includes detailed resource metrics, giving you deeper visibility into how your sandboxes consume compute and networking.

From the [Observability tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability%2Fsandboxes&title=Go+to+Sandbox+Observability) in your dashboard, you can now monitor:

-   **Active CPU and CPU usage:** Measures when your code actively uses the CPU. Active CPU is measured in core-hours and time spent waiting on I/O, such as network requests or model calls, is not billed
    
-   **Provisioned Memory:** Memory allocated to your sandboxes multiplied by runtime, measured in GB-hours
    
-   **Data Transfer:** Total data transferred in and out of your sandboxes, including package downloads and API calls
    
-   **Running sandboxes and sessions:** How many sandboxes are running at any give time, and when sessions are stopped or started
    

Each metric can be grouped by Sandbox Name and Sandbox Session ID, so you can drill down from aggregate usage to the individual sandbox responsible.

You can also query and visualize metrics via the Vercel CLI:

Terminal

```
# View all available metricsvercel metrics schema vercel.sandbox# Retrieve the CPU usage of all projectsvercel metrics vercel.sandbox.cpu_usage --all
```

Metrics are available at both the team and project level and align directly with how [Sandbox usage is billed](https://vercel.com/docs/sandbox/pricing), so you can attribute costs to specific workloads and catch unexpected usage early. This is useful for tracking agent workloads that create sandboxes at scale, right-sizing sandbox configurations based on actual utilization, and identifying sandboxes with unexpectedly high data transfer.

Observability for Sandbox is included on all plans, and manual [queries](https://vercel.com/docs/query) are available on Pro and Enterprise plans. Learn more in the [Sandbox documentation](https://vercel.com/docs/sandbox).