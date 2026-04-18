---
title: "Chat SDK now has an adapter directory"
source: "https://vercel.com/changelog/chat-sdk-adapter-directory"
publishedDate: "2026-03-10"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Mar 10, 2026

Chat SDK now has an [adapter directory](https://chat-sdk.dev/adapters), so you can search platform and state adapters from Vercel and the community.

These include:

-   **Official** adapters: maintained by the core Chat SDK team and published under `@chat-adapter/*`
    
-   **Vendor-official** adapters: built and maintained by the platform companies, like [Resend](https://chat-sdk.dev/adapters/resend) and [Beeper](https://chat-sdk.dev/adapters/matrix). These live in their GitHub org and are documented in their docs.
    
-   **Community** adapters are built by third-party developers, and can be published by one, following the same model as [AI SDK community providers](https://ai-sdk.dev/providers/community-providers).
    

We encourage teams to build and submit adapters to be included in this new directory, like Resend's adapter that connects email to Chat SDK:

```
import { Chat } from "chat";import { MemoryStateAdapter } from "@chat-adapter/state-memory";import { createResendAdapter } from "@resend/chat-sdk-adapter";const resend = createResendAdapter({  fromAddress: "bot@yourdomain.com",});const chat = new Chat({  userName: "email-bot",  adapters: { resend },  state: new MemoryStateAdapter(),});// New inbound email (new thread)chat.onNewMention(async (thread, message) => {  await thread.subscribe();  await thread.post(`Got your email: ${message.text}`);});
```

An agent workflow that triages support emails or sends follow-ups uses the same handlers and card primitives as a Slack bot.

Browse the [adapter directory](https://chat-sdk.dev/adapters) or read the [contributing guide](https://chat-sdk.dev/docs/contributing/building) to learn how to build, test, document, and publish your own adapter.