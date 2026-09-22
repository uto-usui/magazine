---
title: "Vercel Connect now supports Microsoft Teams"
source: "https://vercel.com/changelog/vercel-connect-microsoft-teams"
publishedDate: "2026-09-21"
category: "frontend"
feedName: "Vercel"
author: "Bhrigu Srivastava"
---

[Vercel Connect](https://vercel.com/docs/connect) now includes a managed connector for [Microsoft Teams](https://vercel.com/connect/microsoft-teams). Creating one gives your organization a Teams bot that your apps and agents run. People can @mention it in channels or message it directly, and your code receives the message and replies as the bot.

As a [Vercel Managed Connector](https://vercel.com/docs/connect/concepts/connectors), Vercel registers the Entra app and Azure Bot resource in your tenant, so there's no client secret to store. A tenant administrator with an Azure subscription completes setup once. Incoming Teams activities are verified and forwarded to your project as [Connect trigger](https://vercel.com/docs/connect/concepts/triggers).

Create a connector from the [dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect) or [Vercel CLI](https://vercel.com/docs/cli/connect):

```
vc connect create microsoft-teams --name acme-teams --triggers
```

Create a Teams connector with triggers enabled

Once the connector is set up, your code requests a token only when it needs one. Use it with the [@vercel/connect](https://vercel.com/docs/connect/ts-sdk-reference) SDK, [eve](https://vercel.com/docs/connect/frameworks/eve) channel or [Chat SDK](https://vercel.com/docs/connect/frameworks/chat-sdk) adapter:

Receive a forwarded Teams message and reply to it as the bot through the Bot Framework API

Each token is scoped to what you request and refreshed automatically, so there's nothing to rotate by hand. Connectors only work in the environments you attach them to, and you can revoke access at any time with `vc connect revoke-tokens`.

Read the [Vercel Connect documentation](https://vercel.com/docs/connect), view details about the [Teams connector](https://vercel.com/connect/microsoft-teams) in the Vercel Connect catalog, or [create a Teams connector](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect%2Fcreate%3Ftype%3Dmicrosoft-teams) to get started.