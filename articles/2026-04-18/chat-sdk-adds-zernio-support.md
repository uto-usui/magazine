---
title: "Chat SDK adds Zernio support"
source: "https://vercel.com/changelog/chat-sdk-adds-zernio-support"
publishedDate: "2026-04-01"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

Apr 1, 2026

Chat SDK now supports [Zernio](https://zernio.com/), a unified social media API, with the new [Zernio adapter](https://chat-sdk.dev/adapters/zernio). This is an official vendor adapter built and maintained by the Zernio team.

Teams can build bots that work across Instagram, Facebook, Telegram, WhatsApp, X/Twitter, Bluesky, and Reddit through a single integration.

**Try the Zernio adapter today:**

```
import { Chat } from "chat";import { createZernioAdapter } from "@zernio/chat-sdk-adapter";const bot = new Chat({  adapters: {    zernio: createZernioAdapter(),  },});bot.onNewMention(async (thread, message) => {  const platform = message.raw.platform;  await thread.post(`Hello from ${platform}!`);});
```

Feature support varies by platform; rich cards work on Facebook, Instagram, Telegram, and WhatsApp, while editing and streaming are currently limited to Telegram.

Read the [documentation](https://docs.zernio.com/resources/integrations/chat-sdk) to get started, browse the [directory](https://chat-sdk.dev/adapters), or build [your own adapter](https://chat-sdk.dev/docs/contributing/building).