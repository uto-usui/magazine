---
title: "Use any Chat SDK adapter with eve"
source: "https://vercel.com/changelog/eve-chat-sdk-channel"
publishedDate: "2026-07-08"
category: "frontend"
feedName: "Vercel"
author: "Josh Singh"
---

[eve](https://eve.dev/) now supports Chat SDK adapters with the new [Chat SDK channel](https://eve.dev/docs/channels/chat-sdk).

One channel connects your eve agent to Facebook Messenger, WhatsApp, Resend, Liveblocks, and any other surface with an [adapter](https://chat-sdk.dev/adapters). You write normal Chat SDK handler code, and calling `send` inside a handler hands the message to your agent.

agent/channels/resend.ts

```
import { createMemoryState } from "@chat-adapter/state-memory";import { createResendAdapter } from "@resend/chat-sdk-adapter";import type { Message, Thread } from "chat";import { chatSdkChannel } from "eve/channels/chat-sdk";export const { bot, channel, send } = chatSdkChannel({  userName: "Resend Agent",  adapters: {    resend: createResendAdapter({      fromAddress: "hello@example.com",      fromName: "Resend Agent",    }),  },  state: createMemoryState(),  streaming: false,});bot.onNewMention(async (thread: Thread, message: Message) => {  await thread.subscribe();  await send(message.text, { thread });});export default channel;
```

Reply to emails with a eve Resend agent

Register handlers on `bot` exactly as you would in a standalone Chat SDK app.

Out of the box, the channel:

-   Mounts a webhook route for each adapter (e.g., `/eve/v1/resend`)
    
-   Shows a typing indicator while a turn runs, then posts the agent's reply
    
-   Renders human-in-the-loop input requests as cards with buttons, and resumes the session when one is clicked
    
-   Persists the thread, so later events, including proactive sends from schedules, reach the same conversation
    
-   Reports failures in the thread with a readable message
    

Supply your own `events` handlers to override any of these defaults.

Read the [Chat SDK channel](https://eve.dev/docs/channels/chat-sdk) documentation to get started, or learn how to build your own [eve agent with Resend](https://vercel.com/kb/guide/eve-agent-with-resend).