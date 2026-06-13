---
title: "Workflow SDK now runs natively in Nitro v3"
source: "https://vercel.com/changelog/workflow-sdk-now-runs-natively-in-nitro-v3"
publishedDate: "2026-06-13"
category: "frontend"
feedName: "Vercel"
author: "Rihan Arfan"
---

1 min read

Jun 13, 2026

[Workflow SDK](https://workflow-sdk.dev/)'s native Nitro v3 integration is now in beta. Steps run inside the same bundled runtime as the rest of your app, instead of a separate bundle. Nitro's `useStorage()` and other server-side APIs work directly inside `"use step"` functions.

workflows/sync-user.ts

```
import { useStorage } from "nitro/storage";export async function getUserPreferences(userId: string) {  "use step";  const storage = useStorage("cache");  return await storage.getItem(`preferences:${userId}`);}
```

Reading from Nitro storage inside a step function

The Nitro dev server also serves the workflow web UI at `/_workflow`. Open it in your browser to inspect, monitor, and debug workflow runs.

Workflow routes are now bundled by Nitro as part of the app build. Dependencies are traced, and unused code is tree-shaken, so the output includes only what runs, with faster builds and smaller bundles.

Get started with [Workflow SDK on Nitro](https://workflow-sdk.dev/v5/docs/getting-started/nitro).