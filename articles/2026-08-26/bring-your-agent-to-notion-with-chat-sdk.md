---
title: "Bring your agent to Notion with Chat SDK"
source: "https://vercel.com/changelog/notion-chat-sdk"
publishedDate: "2026-08-25"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Your team already works in Notion. Now your agent can too.

With the new [Notion adapter](https://chat-sdk.dev/adapters/official/notion) for Chat SDK, the same agent you run on Slack, Discord, GitHub, Teams, or WhatsApp can join comment discussions on your Notion pages, no separate codebase required.

lib/bot.ts

```
import { Chat } from "chat";import { createNotionAdapter } from "@chat-adapter/notion";import { createRedisState } from "@chat-adapter/state-redis";const bot = new Chat({  userName: "my-bot",  adapters: {    notion: createNotionAdapter(),  },  state: createRedisState(),});bot.onNewMention(async (thread, message) => {  await thread.post("Hello from Notion!");});
```

Respond to a comment on Notion with your agent

Each Notion page maps to a channel and each comment thread to a thread, so replies stay threaded automatically.

The adapter supports mentions, message editing, conversation history, and up to three file attachments. By default, your bot replies when @-mentioned and where mentions aren't available in a workspace, it can trigger on a keyword or on all comments instead.

Notion doesn't support buttons, modals, or reactions, and cards render as markdown. Discussions can start at the page or block level, but not on inline text ranges. History fetches return only open comments.

Read the [documentation](https://chat-sdk.dev/adapters/official/notion) to get started, browse the [directory](https://chat-sdk.dev/adapters), or [build your own](https://chat-sdk.dev/docs/contributing/building).