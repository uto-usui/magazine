---
title: "Scaffold your chat apps with create-chat-sdk"
source: "https://vercel.com/changelog/scaffold-your-chat-apps-with-create-chat-sdk"
publishedDate: "2026-06-23"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Creating a new [Chat SDK](https://chat-sdk.dev/) bot now takes a single command.

`create-chat-sdk` scaffolds a complete [Next.js](https://nextjs.org/) project with your chosen platform adapters, a state adapter, environment variables, and a webhook route.

```
npm create chat-sdk@latest vercel-bot
```

The CLI walks you through selecting your [platform adapters](https://chat-sdk.dev/adapters#:~:text=Search%20adapters...-,Official,-Published%20under%20%40chat) (e.g., Slack and Discord) and a [state adapter](https://chat-sdk.dev/adapters#:~:text=your%20own%20adapter-,State%20Adapters,-Pluggable%20state%20adapters) (e.g., Redis), then installs the dependencies for you.

-   **Everything wired up:** `src/lib/bot.ts` with `onNewMention` and `onSubscribedMessage` handlers, a populated `.env.example`, and a pre-configured `next.config.ts`.
    
-   **Pick your stack:** combine any of the official or vendor-official platform and state adapters into a single project. The CLI installs only what you select.
    
-   **Fully scriptable:** every prompt can be skipped with flags, so `create-chat-sdk` works with your AI agents and in CI. Coding agents are automatically detected, so the CLI runs non-interactively when they scaffold your application.
    

For example, scaffold a Slack and Discord bot with Redis in one command:

```
npm create chat-sdk@latest -- vercel-bot -d 'My Vercel bot' --adapter slack discord redis -yq
```

Read the [documentation](https://chat-sdk.dev/docs/create-chat-sdk) to get started.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)