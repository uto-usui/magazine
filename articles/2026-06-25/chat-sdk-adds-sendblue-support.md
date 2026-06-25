---
title: "Chat SDK adds Sendblue support"
source: "https://vercel.com/changelog/chat-sdk-adds-sendblue-support"
publishedDate: "2026-06-22"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Chat SDK now supports Sendblue with the new [vendor-official adapter](https://chat-sdk.dev/adapters/vendor-official/sendblue).

Build bots that send and receive iMessage, SMS, and RCS through Sendblue's hosted gateway, reaching people on the messaging apps they already use. Messages use iMessage-first delivery with support for automatic SMS and RCS fallback, tapbacks, typing indicators, and delivery status callbacks.

lib/bot.ts

```
import { Chat } from "chat";import { createSendblueAdapter } from "chat-adapter-sendblue";import { createMemoryState } from "@chat-adapter/state-memory";const chat = new Chat({  userName: "imessage-bot",  adapters: {    sendblue: createSendblueAdapter(),  },  state: createMemoryState(),});chat.onDirectMessage(async (thread, message) => {  await thread.post(`Got it: ${message.text}`);});
```

Configure the adapter to respond to @-mentions in mobile conversations

The adapter maps each Sendblue conversation to a Chat SDK thread, tied to a specific phone line and contact (or group), and each inbound iMessage, SMS, or RCS message to a Chat SDK message.

Read the [Sendblue](https://docs.sendblue.com/guides/chat-sdk-adapter/) documentation to get started.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)