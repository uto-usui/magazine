---
title: "Vercel Agent sessions now cost 67% less"
source: "https://vercel.com/changelog/vercel-agent-sessions-now-cost-67-percent-less"
publishedDate: "2026-10-27"
category: "frontend"
feedName: "Vercel"
author: "Bryan Hunter"
---

Vercel Agent sessions in the dashboard and Slack now cost 67% less on average. We rebuilt how Agent manages context, reducing the tokens needed per session and improving prompt-cache reuse. These improvements are live and require no action.

What changed:

-   **Workflow-based CLI skills:** Updated Vercel CLI skills give agents clearer guidance for common workflows and error recovery. Other agents using these skills also benefit.
    
-   **Incremental context management:** Agent manages context more efficiently as conversations grow, including long Slack threads.
    
-   **Improved prompt caching:** Agent preserves more reusable context across turns so more of it can be read from the cache.
    
-   **More efficient coding and planning:** Updated guidance helps Agent plan changes and write code with fewer tokens.
    

[Vercel Agent’s billing rates](https://vercel.com/docs/agent/pricing) are unchanged. Paid sessions are billed at the model provider’s inference rates plus a Vercel Agent fee of $0.25 per million tokens. View usage and costs in the [Agent section](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent%2Fusage&title=Vercel+Agent+Usage) of your dashboard.