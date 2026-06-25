---
title: "Chat SDK adds Kapso support"
source: "https://vercel.com/changelog/chat-sdk-adds-kapso-support"
publishedDate: "2026-06-22"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Chat SDK now supports Kapso with the new [vendor-official adapter](https://chat-sdk.dev/adapters/vendor-official/kapso).

Kapso connects your bot to WhatsApp through its hosted platform, handling the WhatsApp Business setup, credentials, and webhooks so you can focus on your bot's logic. Replies use the standard Chat SDK thread and message APIs, with support for buttons and cards, media, reactions, contacts, and conversation history.

lib/bot.ts

```
import { Chat } from "chat";import { createMemoryState } from "@chat-adapter/state-memory";import { createKapsoAdapter } from "@kapso/chat-adapter";export const bot = new Chat({  userName: "support",  state: createMemoryState(),  adapters: {    kapso: createKapsoAdapter({      kapsoApiKey: process.env.KAPSO_API_KEY,      phoneNumberId: process.env.KAPSO_PHONE_NUMBER_ID,      webhookSecret: process.env.KAPSO_WEBHOOK_SECRET,    }),  },});bot.onDirectMessage(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Configure the adapter to respond to @-mentions in WhatsApp chats

The adapter maps each WhatsApp conversation to a Chat SDK thread, tied to a specific phone number and contact, and each inbound WhatsApp message to a Chat SDK message.

Read the [Kapso](https://docs.kapso.ai/docs/whatsapp/chat-sdk) documentation to get started.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)