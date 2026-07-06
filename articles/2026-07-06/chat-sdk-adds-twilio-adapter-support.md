---
title: "Chat SDK adds Twilio adapter support"
source: "https://vercel.com/changelog/chat-sdk-adds-twilio-adapter-support"
publishedDate: "2026-06-02"
category: "frontend"
feedName: "Vercel"
author: "Josh Singh"
---

Chat SDK now supports Twilio, extending its single-codebase approach to Slack, Discord, GitHub, Teams, Telegram, and WhatsApp with the new [Twilio adapter](https://chat-sdk.dev/adapters/official/twilio).

Teams can build SMS and MMS bots that handle direct messages, inbound media, and message history through the Messages API. The adapter also ships low-level voice helpers, so you can build an app that handles voice calls using [TwiML](https://www.twilio.com/docs/voice/twiml) primitives.

lib/bot.ts

```
import { Chat } from "chat";import { createTwilioAdapter } from "@chat-adapter/twilio";const bot = new Chat({  userName: "mybot",  adapters: {    twilio: createTwilioAdapter(),  },});bot.onNewMention(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Configure the adapter to respond to @-mentions in text messages

Modals, buttons, and reactions are not supported, and cards display as plain text. Outbound media must link to a URL accessible by Twilio.

Read the [documentation](https://chat-sdk.dev/adapters/official/twilio) to get started, browse the [directory](https://chat-sdk.dev/adapters), or build your own [adapter](https://chat-sdk.dev/docs/contributing/building).

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)