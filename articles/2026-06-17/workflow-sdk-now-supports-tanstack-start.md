---
title: "Workflow SDK now supports TanStack Start"
source: "https://vercel.com/changelog/workflow-sdk-now-supports-tanstack-start"
publishedDate: "2026-06-16"
category: "frontend"
feedName: "Vercel"
author: "Pranay Prakash"
---

Workflow SDK now supports [TanStack Start](https://vercel.com/docs/frameworks/full-stack/tanstack-start) applications on Vercel.

TanStack Start is built on Vite and [Nitro](https://nitro.build/), so the existing `workflow/vite` plugin works directly. Add it to `vite.config.ts` alongside `tanstackStart()`.

vite.config.ts

```
import { tanstackStart } from "@tanstack/react-start/plugin/vite";import { defineConfig } from "vite";import { workflow } from "workflow/vite";export default defineConfig({  plugins: [    workflow(),    tanstackStart(),  ],});
```

Adding the Workflow SDK plugin to a TanStack Start Vite config

From there, write workflow and step functions in standard TypeScript with `"use workflow"` and `"use step"`. They run as durable, resumable operations that survive restarts, sleep for days, and retry on failure, with compilation, queue configuration, and persistence handled by the plugin.

Read the [TanStack Start guide](https://workflow-sdk.dev/v5/docs/getting-started/tanstack-start) to learn more and create your first durable workflow.