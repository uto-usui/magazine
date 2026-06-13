---
title: "Chat SDK adds AgentPhone support"
source: "https://vercel.com/changelog/chat-sdk-adds-agentphone-support"
publishedDate: "2026-06-01"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

Jun 1, 2026

Chat SDK now supports AgentPhone with the new [vendor-official adapter](https://chat-sdk.dev/adapters/vendor-official/agentphone).

Give your bot its own phone number so it can handle voice calls and text messages using the same handlers you already write. When a call ends, the transcript is delivered as a message, allowing your bot to respond via SMS or iMessage.

lib/bot.ts

```
import { Chat } from "chat";import { createAgentPhoneAdapter } from "@agentphone/chat-sdk-adapter";const bot = new Chat({  userName: "mybot",  adapters: {    agentphone: createAgentPhoneAdapter(),  },});bot.onNewMention(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Configure the adapter to respond to @-mentions in AgentPhone conversations

Calls and messages to the same number arrive via a single webhook, so you handle both from a single endpoint rather than a separate pipeline for each channel. They also land in one thread, so your bot maintains context throughout the conversation.

Read the [AgentPhone](https://docs.agentphone.ai/) documentation to get started.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)