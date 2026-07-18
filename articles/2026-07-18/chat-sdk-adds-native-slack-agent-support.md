---
title: "Chat SDK adds native Slack agent support"
source: "https://vercel.com/changelog/chat-sdk-adds-native-slack-agent-support"
publishedDate: "2026-07-17"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Chat SDK's [Slack adapter](https://chat-sdk.dev/adapters/official/slack) now supports the agent messaging experience [Slack introduced on June 30](https://docs.slack.dev/changelog/2026/06/30/agent-messages-tab/). Agents built with Chat SDK could already talk in channels and DMs and stream replies token-by-token. This update adds the Agent badge, agent conversations in the Messages tab, suggested prompts, rotating status messages, and native feedback buttons.

lib/bot.ts

```
import { Chat } from "chat";import { createSlackAdapter } from "@chat-adapter/slack";const bot = new Chat({  userName: "mybot",  adapters: {    slack: createSlackAdapter({      agentView: true,      suggestedPrompts: {        title: "Welcome! What can I do for you?",        prompts: [          { title: "Catch me up", message: "What did I miss today?" },          { title: "Draft a message", message: "Help me draft a message" },        ],      },      loadingMessages: ["Thinking...", "Digging through the archives..."],      feedbackButtons: true,    }),  },});
```

Configure your native Slack agent in Chat SDK

Here's what the adapter gives you:

-   **Suggested prompts, per thread:** Pass a static payload or an async resolver that receives the thread context, including what the user is currently viewing under `agent_view`. Prompts are pinned automatically whenever an agent thread opens.
    
-   **Native streaming with a fallback:** Streamed replies render token-by-token via Slack's streaming API, including task and plan cards. If a workspace doesn't support streaming (e.g., GovSlack), the adapter switches to post-and-edit mid-stream without losing content.
    
-   **Built-in feedback:** Set `feedbackButtons: true` and every streamed reply ends with Slack's native thumbs-up and thumbs-down buttons. Clicks dispatch through the regular `bot.onAction` flow with a positive or negative value.
    

One thing to know: under `agent_view`, Slack threads each user message individually, so channel history only returns the user's side of a DM. Use [Chat SDK transcripts](https://chat-sdk.dev/docs/conversation-history) to build AI conversation history instead.

Read the [documentation](https://chat-sdk.dev/adapters/official/slack) to get started, or begin with one of our [templates](https://chat-sdk.dev/resources).