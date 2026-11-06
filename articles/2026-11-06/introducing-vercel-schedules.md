---
title: "Introducing Vercel Schedules"
source: "https://vercel.com/blog/introducing-vercel-schedules"
publishedDate: "2026-11-04"
category: "frontend"
feedName: "Vercel"
author: "Elliot Dauber"
---

Cron jobs are useful for work that needs to happen regularly. You can use them to do things such as back up your database on a schedule, or keep data in sync between two systems.

You define them once in code and then can update them by editing their config and redeploying. But today, agents interact with users as work evolves, and schedules need to be updated in real time.

We built Vercel Schedules to allow agents and applications to create, change, or cancel one-time and recurring schedules through code, without redeploying.

## [Copy link to heading](#what-are-vercel-schedules)What are Vercel Schedules?

Schedules builds on the static approach used by [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs), but are designed to let users and agents decide when work should happen while your application is still running. A schedule tells Vercel when to trigger a task and where to send it. Your application provides the code that carries out the work.

You can use schedules for both static and dynamic jobs:

-   **Static schedules** keep the timing in `vercel.json` or [Build Output API configuration](https://vercel.com/docs/build-output-api/configuration) and sync when you deploy. You can use them to call private functions or HTTP paths, or send messages to [Queue topics](https://vercel.com/docs/queues).
    
-   **Dynamic schedules** let your app create and manage schedules through the [JS SDK](https://vercel.com/docs/schedules/sdk), [CLI](https://vercel.com/docs/cli), or [API](https://vercel.com/docs/schedules/http-api) as it runs. They support one-time and recurring work through Queue topics.
    

You can also test scheduled work on [Preview deployments and in custom environments](https://vercel.com/docs/deployments/environments) before running it in Production.

## [Copy link to heading](#how-schedules-works)How Schedules works

Take this example: A user could ask an agent with web access, “Tomorrow morning, summarize the top five stories on Hacker News.” The traditional solution would be storing the request and its schedule time in a database, then using a cron job to check for work that is due.

With Schedules, an agent can create a schedule that records the request and when to run it, without a separate database and polling job. The example below defines an AI SDK tool that gives an agent this capability.

lib/schedule-task-tool.ts

```
import { randomUUID } from 'node:crypto';import { tool } from 'ai';import { z } from 'zod';import { Schedules } from '@vercel/schedules';export function scheduleTaskTool(tenantId: string, userId: string) {  return tool({    description: 'Schedule a task to run at a future time.',    inputSchema: z.object({      task: z.string().min(1).max(1000),      at: z.string().describe('Future local time: YYYY-MM-DDTHH:mm'),      timezone: z.string().describe('IANA time zone, e.g. America/New_York'),    }),    execute: ({ task, at, timezone }) =>      Schedules.create({        name: `agent-task-${randomUUID()}`,        namespace: tenantId,        expression: { type: 'single', at },        timezone,        target: { topic: 'agent-work' },        payload: { userId, task },      }),  });}
```

An AI SDK tool that creates a one-time schedule for an agent task.

When the task is due, Vercel uses [Queues](https://vercel.com/docs/queues) to deliver the saved request to your app. Your app provides [code to read that request](https://vercel.com/docs/queues/quickstart), check the user’s current permissions, and start the agent. The agent fetches the top five Hacker News posts with a web tool, then returns a summary for your app to save for the user.

If you already build agents with [fx’s JavaScript library, libfx](https://github.com/vercel-labs/fx/blob/main/sdk/README.md) or [Pi’s agent library](https://github.com/earendil-works/pi/blob/main/packages/agent/README.md), you can add a similar scheduling tool. The [eve agent framework](https://eve.dev/docs/experimental/dynamic-schedules) uses Vercel Schedules to provide dynamic scheduling tools for production agents hosted on Vercel.

### [Copy link to heading](#run-recurring-application-jobs)Run recurring application jobs

You can schedule recurring work with Vercel Schedules. Schedules can be created dynamically via the [JS SDK](https://vercel.com/docs/schedules/sdk), [API](https://vercel.com/docs/schedules/http-api), and [CLI](https://vercel.com/docs/cli/schedules), or set up in your project’s configuration.

For example, to create a job that cleans up expired records every day, you could define a schedule that invokes a private function in your chosen time zone:

vercel.json

```
{  "$schema": "https://openapi.vercel.sh/vercel.json",  "schedules": {    "cleanup": {      "schedule": "0 2 * * *",      "function": "api/cleanup",      "timezone": "America/New_York"    }  },  "functions": {    "api/cleanup.ts": {      "experimentalTriggers": [        { "type": "schedule/v1beta" }      ]    }  }}
```

Schedules a private cleanup function for 2 a.m. New York time each day.

Vercel calls this cleanup code directly, without exposing it at a public URL. It checks that each call comes from the scheduling service, so you don’t have to add that check yourself.

If your app already uses the Nitro 3 server framework, its [experimental integration](https://nitro.build/deploy/providers/vercel#vercel-schedules) lets you run the recurring jobs in your existing `scheduledTasks` configuration as private functions.

You can also try the agent task and cleanup locally with [`vercel dev`](https://vercel.com/docs/cli/dev), then test them on a Preview branch or in a custom environment before production. Use Run Schedule in your project’s Schedules tab to try either task without waiting, and see when past runs happened.

## [Copy link to heading](#get-started)Get started

Vercel Schedules is now in [Public Beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta), and you can use it for the recurring tasks your application already runs. When a user or agent chooses when work should happen, your code can create and manage a schedule for that task.

To get started, check out the [Vercel Schedules skill](https://github.com/vercel/vercel-plugin/blob/main/skills/vercel-schedules/SKILL.md) and read the [documentation](https://vercel.com/docs/schedules).