---
title: "Chat SDK adds X adapter support"
source: "https://vercel.com/changelog/chat-sdk-adds-x-adapter-support"
publishedDate: "2026-07-14"
category: "frontend"
feedName: "Vercel"
author: "Josh Singh"
---

Chat SDK now supports X, extending its single-codebase approach to Slack, Discord, GitHub, Teams, Telegram, and WhatsApp with the new [X adapter](https://chat-sdk.dev/adapters/official/x).

Teams can build bots that reply to public mentions and hold direct message conversations through the X API v2 and the [X Activity API](https://docs.x.com/x-api/activity/introduction). The adapter handles CRC verification and webhook signature checks automatically and can manage OAuth token refresh for long-running bots.

lib/bot.ts

```
import { Chat } from "chat";import { createXAdapter } from "@chat-adapter/x";const bot = new Chat({  userName: "mybot",  adapters: {    x: createXAdapter(),  },});bot.onNewMention(async (thread, message) => {  await thread.post(`Hi @${message.author.userName}!`);});
```

Configure the adapter to respond to @-mentions on X

Likes are the only supported reaction, and responses post once on completion since X has no native streaming. X's [automation rules](https://docs.x.com/developer-terms/policy) apply to automated messages.

Read the [documentation](https://chat-sdk.dev/adapters/official/x) to get started or browse the [adapter directory](https://chat-sdk.dev/adapters).

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across platforms.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)