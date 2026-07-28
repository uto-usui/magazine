---
title: "Run Claude Managed Agents with Chat SDK"
source: "https://vercel.com/changelog/claude-managed-agents-with-chat-sdk"
publishedDate: "2026-07-27"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

You can now run [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview) with [Chat SDK](https://chat-sdk.dev/).

Claude Managed Agents handles the agent loop server-side, including the model, tools, session state, and sandboxed web research.

Chat SDK gives that agent a chat interface through a single type-safe handler, with adapters that carry it to Slack, WhatsApp, and more.

### [Copy link to heading](#what-you-get)What you get

-   **Token-by-token streaming**: Replies render as the model writes them, over a single streamed response.
    
-   **Live activity feed**: Tool calls and model requests are available as the turn runs, so you can surface a trace in the chat.
    
-   **No database to run:** The Managed Agents session stores the conversation, so the sidebar, transcript, and replay read from it, no server-side state of your own.
    
-   **Portability by design**: Swapping a few lines in the handler moves your agent to Slack, Teams, Discord, WhatsApp, and 30+ other platforms.
    

To see it work, a new [Anthropic quickstart](https://github.com/anthropics/claude-quickstarts/tree/main/managed-agents/chat-sdk) builds a working research analyst you chat with in the browser. It runs on Chat SDK's web adapter, so there's no platform registration, webhook verification, or tunnel, just your Anthropic credentials.

Follow the [step-by-step guide](https://vercel.com/kb/guide/claude-managed-agents-chat-sdk) or learn more in the [Chat SDK documentation](https://chat-sdk.dev/docs/getting-started).