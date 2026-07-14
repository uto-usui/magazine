---
title: "Agent Runs now show subagent activity on eve projects"
source: "https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects"
publishedDate: "2026-07-13"
category: "frontend"
feedName: "Vercel"
author: "Allen Zhou"
---

You can now inspect subagent activity for eve projects in [Agent Runs](https://vercel.com/docs/eve/observability#agent-runs).

The new Subagents tab shows every subagent, organized by which turn started it. Each row shows the prompt, duration, and any failures, all on a shared timeline.

![Turn detail panel showing a delegated subagent list with durations on a timeline; one subagent failed.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F43bMBoQ9ybXDzD1qPbRBj2%2F60f58c663eb0e9bc2003f52c7e1d3e6e%2FEve_o11y_-_Light.png&w=1920&q=75)![Turn detail panel showing a delegated subagent list with durations on a timeline; one subagent failed.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F64zlk0kZQBBdmajKMXHLO8%2F40a8ddb639f88081b1aa8e4170647c2c%2FEve_o11y_-_Dark.png&w=1920&q=75)

Subagents appear inline on the turn that delegated them.

Click any subagent to open its run. The tab shows the same details as a parent run: turns, tool calls, metadata, cost, and token usage.

Open [Agent Runs](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fagent-runs) to try it, or read the [documentation](https://vercel.com/docs/eve/observability#agent-runs) to learn more.