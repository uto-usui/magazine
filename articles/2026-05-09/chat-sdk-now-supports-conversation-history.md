---
title: "Chat SDK now supports conversation history"
source: "https://vercel.com/changelog/chat-sdk-conversation-history"
publishedDate: "2026-05-08"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

May 8, 2026

Chat SDK now supports cross-platform conversation history through the new `transcripts` and `identity` options. User transcripts persist across every [platform adapter](https://chat-sdk.dev/adapters), allowing the same user to keep their message history wherever they message your bot.

lib/bot.ts

```
import { Chat } from "chat";const bot = new Chat({  userName: "mybot",  identity: ({ author }) => author.email ?? null,  transcripts: {    retention: "30d",    maxPerUser: 200,  },  // ...});
```

Identify users by email and keep up to 200 messages per user for 30 days

`bot.transcripts` exposes four methods, backed by your existing state adapter:

-   `append`: persist an inbound message or a bot reply
    
-   `list`: return entries chronologically with filters
    
-   `count`: total entries stored for a user
    
-   `delete`: wipe every entry for a user
    

Read the [Chat SDK documentation](https://chat-sdk.dev/docs/conversation-history) to get started, or try one of the [templates](https://chat-sdk.dev/resources).