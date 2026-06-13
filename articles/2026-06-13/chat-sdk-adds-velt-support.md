---
title: "Chat SDK adds Velt support"
source: "https://vercel.com/changelog/chat-sdk-adds-velt-support"
publishedDate: "2026-06-01"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

Jun 1, 2026

Chat SDK now supports Velt with the new [vendor-official adapter](https://chat-sdk.dev/adapters/vendor-official/agentphone).

Build bots that read and reply within Velt comment threads, right where your team already works: documents, text editors, and canvases. Tag the bot, and it will answer in the same thread, grounding its reply with the document name, URL, and anchored text.

lib/bot.ts

```
import { Chat } from "chat";import { createVeltAdapter } from "@veltdev/chat-sdk-adapter";const bot = new Chat({  userName: "mybot",  adapters: {    velt: createVeltAdapter(),  },});bot.onNewMention(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Configure the adapter to respond to @-mentions in Velt documents

The adapter maps Velt documents to Chat SDK channels, comment annotations to threads, and individual comments to messages.

Read the [Velt](https://velt.dev/docs/ai/chat-sdk-adapter) documentation to get started.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)