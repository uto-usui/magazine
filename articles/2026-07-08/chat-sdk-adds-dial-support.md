---
title: "Chat SDK adds Dial support"
source: "https://vercel.com/changelog/chat-sdk-adds-dial-support"
publishedDate: "2026-07-08"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Chat SDK now supports Dial with the new [vendor-official adapter](https://chat-sdk.dev/adapters/vendor-official/dial).

Build bots that send and receive SMS, MMS, and iMessage on a real phone number, with bidirectional media and inbound voice-call transcripts. Replies use the standard Chat SDK thread and message APIs, with HMAC-verified webhooks and stable per-conversation threading.

lib/bot.ts

```
import { Chat } from "chat";import { createMemoryState } from "@chat-adapter/state-memory";import { createDialAdapter } from "@getdial/chat-sdk-adapter";export const bot = new Chat({  userName: "Dial Bot",  adapters: {    dial: createDialAdapter({      apiKey: process.env.DIAL_API_KEY,      fromNumberId: process.env.DIAL_FROM_NUMBER_ID,      webhookSecret: process.env.DIAL_WEBHOOK_SECRET,    }),  },  state: createMemoryState(),});bot.onNewMention(async (thread, message) => {  await thread.post(`heard you: ${message.text}`);});
```

Configure the Dial adapter to respond to @-mentions

Each phone conversation becomes a Chat SDK [thread](https://chat-sdk.dev/docs/api/thread). Texts and media arrive as messages on that thread, and when a voice call ends, its transcript appears there too. Subscriptions, handlers, posts, and per-thread state work the same as with any other Chat SDK adapter.

Read the [Dial](https://docs.getdial.ai/integrations/agent-clients/vercel-chat-sdk) documentation to get started.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across platforms.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)