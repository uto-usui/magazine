---
title: "Chat SDK adds Novu support"
source: "https://vercel.com/changelog/chat-sdk-adds-novu-support"
publishedDate: "2026-06-22"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Chat SDK now supports Novu with the new [vendor-official adapter](https://chat-sdk.dev/adapters/vendor-official/novu).

One handler set puts your agent on Slack, Microsoft Teams, WhatsApp, Telegram, and email. Novu handles credentials, identity, and delivery, keeping OAuth and tokens outside your app and mapping each channel to one user. Your agent always knows who they're talking to.

Your agent can also send proactive notifications and handle the replies in the same loop, on whichever channel the customer used.

lib/bot.ts

```
import { Chat } from "chat";import { createMemoryState } from "@chat-adapter/state-memory";import { createNovuAdapter } from "@novu/chat-sdk-adapter";const novu = createNovuAdapter();const chat = new Chat({  userName: "support",  adapters: { novu },  state: createMemoryState(),});chat.onNewMention(async (thread, message) => {  await thread.post(`Hi! You said: ${message.text}`);});chat.onSubscribedMessage(async (thread, message) => {  await thread.post(`echo: ${message.text}`);});await chat.initialize();
```

Configure the adapter and connect it to the Novu system

One CLI command connects a real channel to your agent:

```
npx novu connect --runtime chat-sdk
```

It signs you in, creates a bridge agent, sets up the channel you pick (e.g., Slack), and adds the credentials to your project.

Read the [Novu](https://novu.co/changelog/novu-chat-sdk-adapter/) documentation to get started.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)