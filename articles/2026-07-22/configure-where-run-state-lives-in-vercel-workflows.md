---
title: "Configure where run state lives in Vercel Workflows"
source: "https://vercel.com/changelog/configure-where-run-state-lives-in-vercel-workflows"
publishedDate: "2026-07-20"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

[Vercel Workflows](https://vercel.com/workflows) now keeps each run's state, queue dispatch, and output streams in a single home region: the region where the run starts by default, or any target region you choose.

A run keeps its home region for its lifetime, so for agents built on Workflows, the whole loop stays near the user: an agent serving someone in Sydney executes, checkpoints its progress, and streams output from Sydney. During a regional incident, workflow traffic fails over to the next closest region.

To get started, update the [Workflow SDK](https://workflow-sdk.dev/) to `workflow@5.0.0-beta.33` or later:

```
pnpm i workflow@beta
```

Installs the latest beta release of the Workflow SDK.

To pin a run to a specific region, pass the `region` option to `start()`:

app/api/start-workflow/route.ts

```
import { start } from 'workflow/api';import { myWorkflow } from '@/workflows/my-workflow';const run = await start(myWorkflow, [input], { region: 'sfo1' });
```

Stores the run's data in sfo1 and dispatches its queue messages from there.

Existing workflows pick up regional placement on their next run, with no migration or code changes.

Learn more in the [Workflows documentation](https://vercel.com/docs/workflows).