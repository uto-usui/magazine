---
title: "Measure time between steps in Vercel Workflows"
source: "https://vercel.com/changelog/measure-time-between-steps-in-vercel-workflows"
publishedDate: "2026-08-05"
category: "frontend"
feedName: "Vercel"
author: "Mitul Shah"
---

You can now measure the time between any two steps in the trace viewer for [Vercel Workflows](https://vercel.com/workflows) and the [Workflow SDK](https://workflow-sdk.dev/).

Select a step, hold `Option` on macOS or `Alt` on Windows and Linux, then hover another step to see a measurement line between them:

-   Between sequential steps, the line measures from the end of the earlier step to the start of the later step.
    
-   Between overlapping or nested steps, it measures the difference between their start times.
    

With no step selected, hold the modifier to see the gaps across the timeline, now drawn with the same measurement line.

This can be useful for spotting delayed starts and queue waits when a run takes longer than its steps account for.

To get started, open a workflow run from the Workflows tab in [Vercel Observability](https://vercel.com/docs/workflows#observability), or locally with `npx workflow@beta web`.