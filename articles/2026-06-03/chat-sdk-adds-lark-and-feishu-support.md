---
title: "Chat SDK adds Lark and Feishu support"
source: "https://vercel.com/changelog/chat-sdk-adds-lark-feishu-support"
publishedDate: "2026-05-31"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

May 31, 2026

Chat SDK now supports Lark and Feishu via a new [vendor-official adapter](https://chat-sdk.dev/adapters/vendor-official/lark).

Build bots that post, edit, and delete messages, stream replies via Lark's native cardkit typewriter API, send interactive cards, and react with emojis across both Lark and Feishu conversations.

lib/bot.ts

```
import { Chat } from "chat";import { createLarkAdapter } from "@larksuite/vercel-chat-adapter";const bot = new Chat({  userName: "mybot",  adapters: {    lark: createLarkAdapter(),  },});bot.onNewMention(async (thread, message) => {  await thread.post(`You said: ${message.text}`);});
```

Configure the adapter to respond to @-mentions in Lark and Feishu

The adapter connects over Lark's WebSocket transport, so bots run from any long-running Node process without exposing an HTTP webhook endpoint.

To get started, read the [Lark](https://open.larksuite.com/document/mcp_open_tools/integrating-agents-with-feishu/vercel-chat-sdk-lark-message-publish) or [Feishu](https://open.feishu.cn/document/mcp_open_tools/integrating-agents-with-feishu/vercel-chat-sdk-lark-message-publish) documentation.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)