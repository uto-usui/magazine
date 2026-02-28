---
title: "Chat SDK adds Telegram adapter support"
source: "https://vercel.com/changelog/chat-sdk-adds-telegram-adapter-support"
publishedDate: "2026-02-27"
category: "frontend"
feedName: "Vercel"
author: "Tobias Lins"
---

1 min read

Feb 27, 2026

Chat SDK now supports Telegram, extending its single-codebase approach to Slack, Discord, GitHub, and Teams, with the new [Telegram adapter](https://www.chat-sdk.dev/docs/adapters/telegram).

Teams can build bots that support mentions, message reactions, direct messages, and typing indicators.

The adapter handles single file uploads and renders basic text cards, with buttons and link buttons that display as inline keyboard elements, allowing developers to create interactive workflows directly within Telegram chats.

**Get start with Telegram adapter setup:**

```
import { Chat } from "chat";import { createTelegramAdapter } from "@chat-adapter/telegram";const bot = new Chat({  userName: "mybot",  adapters: {    telegram: createTelegramAdapter(),  },});bot.onNewMention(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Telegram does not expose full historical message APIs to bots, so message history relies on adapter-level caching. Additionally, callback data is limited to 64 bytes, and the platform does not currently support modals or ephemeral messages.

Read the [documentation](https://www.chat-sdk.dev/docs/adapters/telegram) to get started.