---
title: "Trace and debug eve agent sessions with Vercel Observability"
source: "https://vercel.com/changelog/eve-agent-observability"
publishedDate: "2026-06-26"
category: "frontend"
feedName: "Vercel"
author: "Andrew Barba"
---

You can now view [Agent Runs](https://vercel.com/docs/eve/observability) in your Vercel dashboard for [eve](https://eve.dev/), the open-source agent framework.  
The Agent Runs tab appears automatically for every eve project, surfacing trigger, duration, and token usage for each session at a glance. Drill into any run to inspect every turn, model call, and tool call in the conversation. Runtime errors that previously vanished into function logs now correlate to the failing step.

Two views read the same data:

-   **Developer mode** shows raw tool names, input and output JSON, and per-step token counts for engineers debugging a failure.
    
-   **Business mode** humanizes tool names, hides JSON, and generates a plain-English summary so a non-technical reviewer can audit what an agent did.
    

Run data is encrypted by default. Retention scales with plan:

-   **Hobby**: 12 hours
    
-   **Pro**: 1 day
    
-   **Enterprise**: 3 days
    

Pro and Enterprise teams can extend retention to 30 days with [Observability Plus](https://vercel.com/docs/observability/observability-plus).

Teams using a custom OpenTelemetry backend can still export AI SDK spans from `agent/instrumentation.ts` to any destination, such as Braintrust or Datadog.

Open [Agent Runs](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fagent-runs) in your project and read the [documentation](https://vercel.com/docs/eve/observability) to get started.