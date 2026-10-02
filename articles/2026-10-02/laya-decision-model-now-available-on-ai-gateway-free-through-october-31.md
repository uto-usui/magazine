---
title: "Laya decision model now available on AI Gateway, free through October 31"
source: "https://vercel.com/changelog/laya-decision-model-now-available-on-ai-gateway-free-through-october-31"
publishedDate: "2026-10-01"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Laya from Convai Innovations](https://vercel.com/ai-gateway/models/laya) is free to use on [AI Gateway](https://vercel.com/ai-gateway) for 1 month through October 31, 2026 via [Boundless](https://vercel.com/ai-gateway/models/providers/boundless).

Laya is an evaluation/decision model that evaluates shared context against yes/no, choice, or scoring questions and returns structured answers with probabilities. For example, use it to:

-   **Triage support requests:** Detect a refund request and route it to the billing team.
    
-   **Route agent work:** Choose which tool or workflow should handle a request.
    
-   **Check guardrails:** Flag a request or response for review when it may violate a policy.
    
-   **Score against a rubric:** Rate a ticket's urgency or an answer's quality on a defined scale.
    

You can call Laya through the [AI SDK evaluation API](https://vercel.com/docs/ai-gateway/modalities/evaluation), the [native HTTP API](https://vercel.com/docs/ai-gateway/modalities/evaluation#http-api), or the [TypeSafe-compatible API](https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe) with `convaiinnovations/laya` or `convaiinnovations/laya-free`:

Through October 31, 2026, both `convaiinnovations/laya` and `convaiinnovations/laya-free` are free when served by [Boundless](https://vercel.com/ai-gateway/models/providers/boundless). The `-free` ID routes to Boundless and stops serving after the promotion; the standard ID begins billing then.

Read the documentation on [evaluation models](https://vercel.com/docs/ai-gateway/modalities/evaluation) on AI Gateway for more details, or explore the [model catalog](https://vercel.com/ai-gateway/models).

AI Gateway provides one API for calling models, tracking usage and cost, and configuring routing, retries, and failover. You can use an [AI Gateway API key](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys) or [bring your own provider key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok).