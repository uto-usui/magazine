---
title: "Open source Workflow Development Kit is now in public beta"
source: "https://vercel.com/changelog/open-source-workflow-dev-kit-is-now-in-public-beta"
publishedDate: "2025-10-23"
category: "frontend"
feedName: "Vercel"
author: "Pranay Prakash"
---

1 min read

Oct 23, 2025

Workflow Development Kit, a framework for building durable, long-running processes, is now in public beta.

Workflow Development Kit brings durability, reliability, and observability to async JavaScript so you can build apps and AI agents that suspend, resume, and maintain state with ease.

Turning functions into durable workflows is made simple by the `"use workflow"` directive:

```
export async function hailRide(requestId: string) {  "use workflow";  const request = await validateRiderRequest(requestId);  const trip = await assignDriver(request);  const confirmation = await notifyRider(trip);  const receipt = await createReceipt(trip);  return receipt;}
```

**Key highlights include**:

-   **Reliability** by simply adding `"use workflow"` to make async functions durable. No manual wiring of queues, no schedulers, no YAML.
    
-   **Mark Steps** to denote with `"use step"`. Retries are automatic.
    
-   **Durability.** Call `sleep` to pause without holding compute, then resume in place.
    
-   **Built-in observability.** Traces, logs, and metrics for every run. Pause, replay, and time travel while debugging.
    
-   **No lock-in.** Develop locally and deploy to Vercel or any other cloud.
    

Learn more about [Workflow](https://useworkflow.dev/) or [read the documentation](https://useworkflow.dev/docs/getting-started).