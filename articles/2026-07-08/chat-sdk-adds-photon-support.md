---
title: "Chat SDK adds Photon support"
source: "https://vercel.com/changelog/chat-sdk-adds-photon-support"
publishedDate: "2026-07-08"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Chat SDK now supports Photon with the new [vendor-official adapter](https://chat-sdk.dev/adapters/vendor-official/photon).

Build bots that send and receive iMessages directly and in group chats, share media, and react with native tapbacks. Run the adapter against Spectrum Cloud, your own server, or directly on a Mac.

lib/bot.ts

```
import { Chat } from "chat";import { createMemoryState } from "@chat-adapter/state-memory";import { createiMessageAdapter } from "@photon-ai/chat-adapter-imessage";export const bot = new Chat({  userName: "Photon Bot",  adapters: {    imessage: createiMessageAdapter({      local: false,      projectId: process.env.IMESSAGE_PROJECT_ID,      projectSecret: process.env.IMESSAGE_PROJECT_SECRET,    }),  },  state: createMemoryState(),});bot.onNewMention(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Configure the Photon adapter to respond to @-mentions

Each Photon conversation becomes a Chat SDK thread, and tapbacks come through as reactions. Handlers, posts, and subscriptions work the same as with any other adapter. Webhooks are HMAC-verified, and your bot can reply to a DM straight from a webhook delivery, no live connection needed.

Read the [Photon](https://github.com/photon-hq/vercel-chat-adapter-imessage) documentation to get started.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across platforms.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)