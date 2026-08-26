---
title: "Chat SDK now supports XChat"
source: "https://vercel.com/changelog/chat-sdk-now-supports-xchat"
publishedDate: "2026-08-25"
category: "frontend"
feedName: "Vercel"
author: "Josh Singh"
---

You can now build bots that hold end-to-end encrypted 1:1 and group conversations on XChat with the new [XChat adapter](https://chat-sdk.dev/adapters/official/xchat) for Chat SDK.

The adapter handles all encryption, key management, and signature verification automatically. Bots can also message users first, as long as the user has encrypted chat set up and follows the bot.

lib/bot.ts

```
import { Chat } from "chat";import { createXchatAdapter } from "@chat-adapter/x/chat";const bot = new Chat({  userName: "mybot",  adapters: {    xchat: createXchatAdapter(),  },});bot.onDirectMessage(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Reply to a direct message on XChat

XChat has no markdown rendering, so the adapter falls back automatically: URLs and @mentions render as tappable links, tables as ASCII code blocks, and cards as text with a link preview. Streaming works through message edits.

Read the [XChat adapter](https://chat-sdk.dev/adapters/official/xchat) documentation to get started.