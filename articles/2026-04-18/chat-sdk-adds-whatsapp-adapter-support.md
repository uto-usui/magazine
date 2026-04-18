---
title: "Chat SDK adds WhatsApp adapter support"
source: "https://vercel.com/changelog/chat-sdk-adds-whatsapp-adapter-support"
publishedDate: "2026-03-11"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

1 min read

Mar 11, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2KdR7J6DW8UpsDrI2ZQih6%2Fd6d9aeb9e10d98ce6037ad451677dcae%2Fimage.png&w=1920&q=75)

Chat SDK now supports WhatsApp, extending its single-codebase approach to Slack, Discord, GitHub, Teams, and Telegram with the new [WhatsApp adapter.](https://chat-sdk.dev/adapters/whatsapp)

Teams can build bots that support messages, reactions, auto-chunking, and read receipts. The adapter handles multi-media downloads (e.g., images, voice messages, stickers) and supports location sharing with Google Maps URLs.

**Try the WhatsApp adapter today:**

```
import { Chat } from "chat";import { createWhatsAppAdapter } from "@chat-adapter/whatsapp";const bot = new Chat({  userName: "mybot",  adapters: {    whatsapp: createWhatsAppAdapter(),  },});bot.onNewMention(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

The adapter does not support message history, editing, or deletion. Cards render as interactive reply buttons with up to three options, and fall back to formatted text. Additionally, WhatsApp enforces a 24-hour messaging window, so bots can only respond within that period.

Read the [documentation](https://chat-sdk.dev/adapters/whatsapp) to get started or browse the [adapters directory](https://chat-sdk.dev/adapters).

_Special thanks to_ [_@ghellach_](https://github.com/ghellach)_, whose community contribution in_ [_PR #102_](https://github.com/vercel/chat/pull/102) _laid the groundwork for this adapter._