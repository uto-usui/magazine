---
title: "Chat SDK now supports reactions and ephemeral messages on Teams"
source: "https://vercel.com/changelog/chat-sdk-reactions-and-ephemeral-messages-on-teams"
publishedDate: "2026-07-31"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Chat SDK's [Microsoft Teams adapter](https://chat-sdk.dev/adapters/official/teams) now supports reactions and ephemeral messages through the same API as other adapters.

Bots can add and remove reactions on Teams messages, and call `thread.postEphemeral()` or `channel.postEphemeral()` to send native, targeted messages that only the intended user sees, like permission prompts.

lib/bot.ts

```
import { Chat, emoji } from "chat";import { createTeamsAdapter } from "@chat-adapter/teams";const bot = new Chat({  userName: "mybot",  adapters: {    teams: createTeamsAdapter(),  },});bot.onSubscribedMessage(async (thread, message) => {  // Acknowledge with a reaction, then clear it when done  const sent = await thread.post("Working on it...");  await sent.addReaction(emoji.check);  await sent.removeReaction(emoji.check);  // Reply so only the message author sees it  await thread.postEphemeral(message.author, "Only you can see this", {    fallbackToDM: true,  });});
```

This release also adds:

-   **Author emails:** Incoming Teams messages include the author's Microsoft Graph email, with their user principal name as a fallback.
    
-   **Custom token factory:** Pass a token function in `TeamsAdapterConfig` to supply your own access tokens, so bots on runtimes without Azure IMDS can authenticate without a static client secret.
    
-   **Native DM status:** Progress messages now show as a native Teams status in direct messages.
    
-   **Conversation routing:** Group conversations are no longer misidentified as direct messages, so they're always handled correctly.
    
-   **Mention conversion:** Email addresses, `@handles` inside URLs, and mentions inside code spans are no longer turned into Teams mentions.
    

Read the [Teams adapter documentation](https://chat-sdk.dev/adapters/official/teams) to get started, or learn more about [ephemeral messages](https://chat-sdk.dev/docs/ephemeral-messages) and [reactions](https://chat-sdk.dev/docs/emoji).

_Special thanks to_ [_onmax_](https://github.com/onmax) _for their contributions to this release._