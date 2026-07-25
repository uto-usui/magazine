---
title: "Workflow steps now support extended function durations"
source: "https://vercel.com/changelog/workflow-steps-now-support-extended-function-durations"
publishedDate: "2026-07-24"
category: "frontend"
feedName: "Vercel"
author: "Elliot Dauber"
---

Workflow steps on Pro and Enterprise plans can now run for up to 30 minutes (1800 seconds), up from 800 seconds, using [extended function durations](https://vercel.com/changelog/vercel-functions-can-now-run-up-to-30-minutes) (in beta).

To opt in, set `VERCEL_ENABLE_WORKFLOW_EXTENDED_MAX_DURATION` to `1` in your project's Environment Variables, then redeploy. Requires [Fluid compute](https://vercel.com/docs/fluid-compute) and a supported Node.js or Python runtime.

Extended durations are not available on Hobby plans, which remain limited to 5 minutes (300 seconds).

See [function duration limits by plan](https://vercel.com/docs/functions/configuring-functions/duration#duration-limits) in the documentation.