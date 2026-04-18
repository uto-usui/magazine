---
title: "Chat SDK adds Liveblocks support"
source: "https://vercel.com/changelog/chat-sdk-adds-liveblocks-support"
publishedDate: "2026-04-07"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

Apr 7, 2026

Chat SDK now supports [Liveblocks](https://liveblocks.io/), enabling bots to read and respond in Liveblocks Comments threads with the new [Liveblocks adapter](https://chat-sdk.dev/adapters/liveblocks). This is an official vendor adapter built and maintained by the Liveblocks team.

Teams can build bots that post, edit, and delete comments, react with emojis, and resolve @mentions within Liveblocks rooms.

**Try the Liveblocks adapter today:**

```
import { Chat } from "chat";import { createLiveblocksAdapter } from "@liveblocks/chat-sdk-adapter";const bot = new Chat({  userName: "mybot",  adapters: {    liveblocks: createLiveblocksAdapter({      apiKey: "sk_...",      webhookSecret: "whsec_...",      botUserId: "my-bot-user",      botUserName: "MyBot"    }),  },});bot.onNewMention(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Read the [documentation](https://liveblocks.io/docs/api-reference/liveblocks-chat-sdk-adapter) to get started, browse the [directory](https://chat-sdk.dev/adapters), or build [your own adapter](https://chat-sdk.dev/docs/contributing/building).