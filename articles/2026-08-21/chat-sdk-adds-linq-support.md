---
title: "Chat SDK adds Linq support"
source: "https://vercel.com/changelog/chat-sdk-adds-linq-adapter"
publishedDate: "2026-06-22"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Chat SDK now supports Linq with the new [vendor-official adapter](https://chat-sdk.dev/adapters/vendor-official/linq).

Build bots that send and receive texts in both direct messages and group chats, with bidirectional media and native iMessage tapback reaction support. Replies use the standard Chat SDK thread and message APIs, with HMAC-verified webhooks and stable threading.

lib/bot.ts

```
import { Chat } from "chat";import { createMemoryState } from "@chat-adapter/state-memory";import { createLinqAdapter } from "@linqapp/chat-sdk-adapter";export const bot = new Chat({  userName: "Linq Bot",  adapters: {    linq: createLinqAdapter({      apiKey: process.env.LINQ_API_KEY,      signingSecret: process.env.LINQ_WEBHOOK_SECRET,    }),  },  state: createMemoryState(),});bot.onDirectMessage(async (thread, message) => {  await thread.subscribe();  await thread.post(`You said: ${message.text}`);});bot.onReaction(["thumbs_up"], async (event) => {  await event.thread.post("Appreciate the tapback 🫡");});
```

Configure the adapter to respond to @-mentions and iMessage tapbacks

The adapter maps each Linq chat to a Chat SDK thread, each text to a message, and each iMessage tapback to a reaction, so subscriptions, handlers, posts, and reactions work the same as with any other Chat SDK adapter.

Read the [Linq](https://github.com/linq-team/linq-chat-sdk/tree/main/packages/adapter-linq) documentation to get started.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first chatbot to deploying it across platforms.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)

_Special thanks to_ [_Fardeem Munir_](https://github.com/fardeem)_, whose community contributions laid the groundwork for this adapter._