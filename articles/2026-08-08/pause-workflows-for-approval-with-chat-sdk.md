---
title: "Pause workflows for approval with Chat SDK"
source: "https://vercel.com/changelog/chat-sdk-durable-approvals"
publishedDate: "2026-08-06"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

You can build human-in-the-loop approvals with Chat SDK through the new `chat/workflow` subpath. One `requestApproval` call posts a card with Approve and Deny buttons and suspends a [Workflow SDK](https://workflow-sdk.dev/) workflow until someone decides.

The wait can last seconds or days and survives deploys and restarts. You don't need an approvals table, an `onAction` handler, or a polling loop:

lib/bot.ts

```
import { requestApproval } from "chat/workflow";import type { Thread } from "chat";export async function deployApproval(opts: { thread: Thread; version: string }) {  "use workflow";  const { approved, user, timedOut } = await requestApproval(opts.thread, {    title: `Deploy Website?`,    fields: { Version: opts.version },    timeout: "24h",  });  if (approved) {    await deploy(opts.version);  }}
```

Send a card to request approval for a deployment

Start the workflow from any handler, and `Thread` instances serialize across the workflow boundary automatically. The card handles the rest:

-   **Scoped approvers:** Pass `approvers` to restrict who can decide. Clicks from anyone else post a notice, and the workflow keeps waiting.
    
-   **Verified decisions:** Chat SDK checks the platform's signature on every click, so the `user.id` on the result is the person who decided.
    
-   **Audit trail:** Once a decision lands or the timeout elapses, the card is edited in place with an outcome line, preventing stale clicks.
    

Get started by reading the [approvals documentation](https://chat-sdk.dev/docs/approvals).