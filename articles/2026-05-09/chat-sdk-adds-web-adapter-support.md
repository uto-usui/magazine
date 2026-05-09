---
title: "Chat SDK adds web adapter support"
source: "https://vercel.com/changelog/chat-sdk-adds-web-adapter-support"
publishedDate: "2026-05-08"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

May 8, 2026

You can now build chat UIs that connect to Chat SDK with the new [web adapter](https://chat-sdk.dev/adapters/web). Build in-product assistants, support agents, or any other browser-based chat experience.

Define the bot on your server:

lib/bot.ts

```
import { Chat } from "chat";import { createWebAdapter } from "@chat-adapter/web";const bot = new Chat({  userName: "mybot",  adapters: {    web: createWebAdapter({      userName: "mybot",      getUser: (req) => ({ id: getUserIdFromCookie(req) }),    }),  },});bot.onDirectMessage(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Echo each direct message back to the sender

Then stream replies live to the browser with a preconfigured [`@ai-sdk/react`](https://ai-sdk.dev/) `useChat` hook:

app/chat/page.tsx

```
import { useChat } from "@chat-adapter/web/react";const { messages, sendMessage, status } = useChat();
```

Wire the bot into a React component

Read the [Chat SDK documentation](https://chat-sdk.dev/adapters/web) to get started, [browse the supported adapters](https://chat-sdk.dev/adapters), or [learn how to build your own](https://chat-sdk.dev/build-your-own).