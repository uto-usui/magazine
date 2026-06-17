---
title: "Workflow SDK now supports inflight cancellation"
source: "https://vercel.com/changelog/workflow-sdk-now-supports-inflight-cancellation"
publishedDate: "2026-06-16"
category: "frontend"
feedName: "Vercel"
author: "Pranay Prakash"
---

The Workflow SDK 5 beta now supports the standard `AbortController` and `AbortSignal` APIs across workflow and step boundaries.

Create a controller inside a workflow, pass its signal into one or more steps, and cancel in-flight operations using the same API `fetch` already uses.

```
import { sleep } from "workflow";export async function cancellableWorkflow() {  "use workflow";  const controller = new AbortController();  const result = await Promise.race([    fetchReport(controller.signal),    sleep("30s").then(() => null),  ]);  if (result === null) {    controller.abort();    return { status: "timed-out" };  }  return result;}async function fetchReport(signal: AbortSignal) {  "use step";  const response = await fetch("https://api.example.com/report", {    signal,  });  return response.json();}
```

Passing a signal into a step and cancelling the in-flight operation

That signal stays durable across suspensions and deterministic replay. When a step is running, it sees the cancellation, even when it's in a separate function invocation. Cancellation is also cooperative; steps have to inspect the signal or pass it to an API that supports `AbortSignal`.

Use it to stop a slow step when a durable timeout wins a race, cancel the remaining requests after the first successful response, thread one signal through a multi-step pipeline, or cancel parallel work when an external condition changes.

Try it with `workflow@beta` and read the [cancellation documentation](https://workflow-sdk.dev/v5/docs/foundations/cancellation) to learn more.