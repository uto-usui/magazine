---
title: "Deployments are now up to 7 seconds faster"
source: "https://vercel.com/changelog/deployments-are-now-up-to-7-seconds-faster"
publishedDate: "2026-07-30"
category: "frontend"
feedName: "Vercel"
author: "Andrew Healey "
---

Over the past few months, we've made deployments up to 7 seconds faster end to end. We removed up to 5 seconds of fixed platform overhead from every build, and deploys from the latest Vercel CLI save up to 2 seconds more. The improvements are most noticeable on smaller builds, where orchestration represents a larger share of the total build time.

The largest platform gains:

-   **~2.2s**: Internal build-process shutdown now happens outside the critical path to deployment readiness
    
-   **~930ms**: The Vercel CLI is prepared ahead of time inside the secure, isolated build environment, removing startup work from the critical path
    
-   **~413ms**: Deployment finalization starts earlier, processing routing and output metadata concurrently with other work
    
-   **~900ms**: Redundant API and storage requests are eliminated across build start and finalization, including fetching deployment configuration concurrently with the build and loading build records directly by ID
    

These apply automatically to builds triggered through Git, the dashboard, or Vercel CLI. Deployments from the latest CLI finish up to another 2.1 seconds sooner:

-   **~1s**: The CLI completes as soon as the event stream reports domain aliases are assigned, instead of waiting for the next polling interval
    
-   **~650ms**: The deployment's team is resolved directly instead of loading the complete team list
    
-   **~500ms**: Deployment and project information already returned to the CLI is reused instead of making two final API requests
    

Combined, a small build deployed from the latest CLI is up to **7 seconds** faster end to end. Run `vercel upgrade` to update.

Learn more about [builds on Vercel](https://vercel.com/docs/builds).