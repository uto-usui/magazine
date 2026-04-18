---
title: "Chat SDK now supports scheduled Slack messages"
source: "https://vercel.com/changelog/chat-sdk-now-supports-scheduled-slack-messages"
publishedDate: "2026-03-24"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

Mar 24, 2026

[Chat SDK](https://chat-sdk.dev/) now supports scheduled messages on Slack, allowing you to deliver a message at a future time.

Use `thread.schedule()` and pass your message and a `postAt` date, like:

```
const scheduled = await thread.schedule("Reminder: standup in 5 minutes!", {    postAt: new Date("2026-03-09T08:55:00Z"),});// Cancel before deliveryawait scheduled.cancel();
```

Read the [documentation](https://chat-sdk.dev/docs/api/thread#schedule) to get started.