---
title: "Vercel Connect now supports Linq"
source: "https://vercel.com/changelog/vercel-connect-now-supports-linq"
publishedDate: "2026-08-25"
category: "frontend"
feedName: "Vercel"
author: "Owen Kephart"
---

[Vercel Connect](https://vercel.com/docs/connect) now includes a managed connector for [Linq](https://vercel.com/connect/linq), so your apps and agents can send and receive messages over iMessage, RCS, and SMS.

As a [Vercel Managed Connector](https://vercel.com/docs/connect/concepts/connectors), Vercel can create a Linq account and phone number for you, or link an existing account. You never manage credentials yourself.

Create a connector from the [dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect) or [Vercel CLI](https://vercel.com/docs/cli/connect):

```
# Create a Linq connectorvc connect create linq --name my-agent# Attach it to a projectvc connect attach linq/my-agent --project my-app --environment production
```

Create a Linq connector and attach it to a project's production environment.

## [Copy link to heading](#give-your-eve-agent-a-phone-number)Give your eve agent a phone number

The connector powers the new [Linq channel](https://eve.dev/docs/channels/linq) in [eve](https://vercel.com/eve).

Run `eve add channel/linq`, choose Vercel Connect, and eve wires up the connector, phone numbers, and webhook for you:

agent/channels/linq.ts

```
import { connectLinqCredentials } from '@vercel/connect/eve';import { linqChannel } from 'eve/channels/linq';export default linqChannel({  credentials: connectLinqCredentials('linq/my-agent'),});
```

Credentials resolve at runtime through the connector with connectLinqCredentials

The channel marks accepted messages as read and continues the same eve session for every message in a Linq conversation. Out of the box, the channel supports read receipts, typing indicators, and mid-conversation steering for a more natural messaging experience.

## [Copy link to heading](#use-the-connector-in-any-project)Use the connector in any project

Call `getToken` with your connector, and the [@vercel/connect](https://vercel.com/docs/connect/ts-sdk-reference) SDK exchanges your Vercel deployment's OIDC identity for a short-lived Linq token.

Pass it as the bearer token on any [Linq Partner API](https://docs.linqapp.com/) request:

app/lib/send-text.ts

```
import { getToken } from '@vercel/connect';const token = await getToken('linq/my-agent', {  subject: { type: 'app' },});await fetch('https://api.linqapp.com/api/partner/v3/chats', {  method: 'POST',  headers: {    Authorization: `Bearer ${token}`,    'Content-Type': 'application/json',  },  body: JSON.stringify({    from: '+12223334444',    to: ['+15556667777'],    message: {      parts: [{ type: 'text', value: 'Production deployment is live.' }],    },  }),});
```

Send a project deploy notification with a short-lived Linq token

Linq delivers each message over the best protocol the recipient supports, starting with iMessage, then RCS, then SMS. The same token works across the full Linq API, including group chats, reactions, rich media, and typing indicators.

Read the [Vercel Connect documentation](https://vercel.com/docs/connect), view details about the [Linq connector](https://vercel.com/connect/linq) in the Vercel Connect catalog, or [create a Linq connector](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect) to get started.