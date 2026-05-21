---
title: "Chat SDK now includes AI SDK tools"
source: "https://vercel.com/changelog/chat-sdk-now-includes-ai-sdk-tools"
publishedDate: "2026-05-20"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

May 20, 2026

Chat SDK now ships a built-in [AI SDK](https://ai-sdk.dev/docs/foundations/tools) toolset through the new `chat/ai` subpath. One `createChatTools(chat)` call wires Chat SDK's read and write actions into your agent.

lib/bot.ts

```
import { Chat } from "chat";import { createChatTools } from "chat/ai";import { ToolLoopAgent } from "ai";const chat = new Chat({ userName: "mybot" /* ... */ });const agent = new ToolLoopAgent({  model: "openai/gpt-5.4",  instructions: 'You are a helpful assistant.'  tools: createChatTools(chat, { preset: "messenger" }),});
```

Create a chat agent with the messenger preset

-   **Approval by default:** write tools are gated by a `requireApproval` option.
    
-   **Presets:** `reader`, `messenger`, and `moderator` scope the toolset.
    
-   **Lazy loading:** only the tools your preset allows are constructed.
    

`toAiMessages` and its supporting types have moved to `chat/ai`. The previous `chat` re-exports are flagged `@deprecated`.

Read the [documentation](https://chat-sdk.dev/docs/ai) to get started, or try one of our [templates](https://chat-sdk.dev/resources).

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)