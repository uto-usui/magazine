---
title: "Chat SDK now supports concurrent message handling"
source: "https://vercel.com/changelog/chat-sdk-now-supports-concurrent-message-handling"
publishedDate: "2026-03-24"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

1 min read

Mar 24, 2026

[Chat SDK](https://chat-sdk.dev/) now lets you control what happens when a new message arrives before a previous one finishes processing, with the new `concurrency` option for the Chat class.

```
const bot = new Chat({  concurrency: {    strategy: "queue",    maxQueueSize: 20,    onQueueFull: "drop-oldest",    queueEntryTtlMs: 60_000,  },  // ...});
```

Multiple options are supported to customize your concurrency strategy.

Four strategies are available:

-   `drop` (default): discards incoming messages
    
-   `queue`: processes the latest message after the handler finishes
    
-   `debounce`: waits for a pause in conversation, processes only the final message
    
-   `concurrent`: processes every message immediately, no locking
    

Read the [documentation](https://chat-sdk.dev/docs/concurrency) to get started.