---
title: "Chat SDK adds Messenger adapter support"
source: "https://vercel.com/changelog/chat-sdk-adds-messenger-adapter"
publishedDate: "2026-05-08"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

May 8, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FO5ioHygBcr4WNWVUO1993%2F714c2761c14eed577a57c837d0956d23%2FOG-Chat-SDK-Messenger.png&w=1920&q=75)

Chat SDK now supports [Messenger](https://chat-sdk.dev/adapters/messenger) as a chat adapter.

Build agents that support messages, reactions, multimedia downloads, postback buttons, and direct conversations, with display names fetched automatically from user profiles.

lib/bot.ts

```
import { Chat } from "chat";import { createMessengerAdapter } from "@chat-adapter/messenger";const bot = new Chat({  userName: "mybot",  adapters: {    messenger: createMessengerAdapter(),  },});bot.onDirectMessage(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Echo each new mention back to the sender

Read the [Chat SDK documentation](https://chat-sdk.dev/adapters/messenger) to get started, [browse the supported adapters](https://chat-sdk.dev/adapters), or [learn how to build your own](https://chat-sdk.dev/build-your-own).

Special thanks to [@mitkodkn](https://github.com/mitkodkn), whose community contribution in [PR #461](https://github.com/vercel/chat/pull/461) laid the groundwork for this adapter.