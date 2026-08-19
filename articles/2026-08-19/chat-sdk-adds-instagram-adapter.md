---
title: "Chat SDK adds Instagram adapter"
source: "https://vercel.com/changelog/chat-sdk-adds-instagram-adapter"
publishedDate: "2026-08-19"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

You can now build bots for Instagram with the new [Instagram adapter](https://chat-sdk.dev/adapters/official/instagram) for Chat SDK.

Bots can send and receive DMs and media, render cards as quick replies and link buttons, show typing indicators, receive reactions, and handle story replies.

lib/bot.ts

```
import { Chat } from "chat";import { createInstagramAdapter } from "@chat-adapter/instagram";export const bot = new Chat({  userName: "mybot",  adapters: {    instagram: createInstagramAdapter(),  },});bot.onDirectMessage(async (thread, message) => {  await thread.post("Hello from Instagram!");});
```

Reply to a direct message on Instagram

The adapter connects through Meta's Instagram Messaging API and requires a professional Business or Creator account.

Messages are buffered, so streamed responses send as one message when the stream completes. Meta enforces a 24-hour messaging window, so bots can only reply within a day of the user's last message.

Read the [documentation](https://chat-sdk.dev/adapters/official/instagram) to get started or browse the [adapter directory](https://chat-sdk.dev/adapters).