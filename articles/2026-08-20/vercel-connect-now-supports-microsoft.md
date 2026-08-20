---
title: "Vercel Connect now supports Microsoft"
source: "https://vercel.com/changelog/vercel-connect-supports-microsoft"
publishedDate: "2026-08-19"
category: "frontend"
feedName: "Vercel"
author: "Bhrigu Srivastava"
---

[Vercel Connect](https://vercel.com/docs/connect) now includes a managed connector for [Microsoft](https://vercel.com/connect/microsoft), so your apps and agents can access all Microsoft products such as Teams, OneDrive and more.

As a [Vercel Managed Connector](https://vercel.com/docs/connect/concepts/connectors), Vercel registers the Entra application and configures federated credentials for it, so you don't have to create an app registration or manage client secrets yourself. Authorize the app for your Microsoft tenant once, then attach the connector to the projects and environments it needs.

Create a connector from the [dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect) or the [Vercel CLI](https://vercel.com/docs/cli/connect):

```
# Create a Microsoft connectorvc connect create microsoft --name acme-msft# Attach it to a projectvc connect attach microsoft/acme-msft --project my-app --environment production
```

Create a Microsoft connector and attach it to a project's production environment.

With the connector attached, your code requests a token only when it needs one. The [@vercel/connect](https://vercel.com/docs/connect/ts-sdk-reference) SDK authenticates with your deployment's OIDC identity and returns a short-lived token for the app itself, using the application permissions your admin granted:

app/lib/send-email.ts

```
import { getToken } from '@vercel/connect';const token = await getToken('microsoft/acme-msft', {  subject: { type: 'app' },  scopes: ['https://graph.microsoft.com/.default'],});await fetch('https://graph.microsoft.com/v1.0/users/releases@acme.com/sendMail', {  method: 'POST',  headers: {    Authorization: `Bearer ${token}`,    'Content-Type': 'application/json',  },  body: JSON.stringify({    message: {      subject: 'Deploy finished',      body: { contentType: 'Text', content: 'Production is live ✅' },      toRecipients: [{ emailAddress: { address: 'eng@acme.com' } }],    },  }),});
```

Request an app token and send an email through the Microsoft Graph API.

Each token is scoped to what you request and refreshed automatically, so there's nothing to leak or rotate. To act as a specific person instead, pass that user as the subject and the token carries their delegated permissions:

app/lib/act-as-user.ts

```
const token = await getToken('microsoft/acme-msft', {  subject: { type: 'user', id: userId },  scopes: ['User.Read'],});
```

The token acts as this user, limited to what they authorized.

Read the [Vercel Connect docs](https://vercel.com/docs/connect) and [create a Microsoft connector](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect) to get started.

**Vercel Connect is in beta and available on all plans.** Features and behavior, including available connectors and trigger forwarding, may change before general availability. Usage is subject to the [Beta Agreement](https://vercel.com/docs/release-phases/public-beta-agreement) and [Vercel Connect terms](https://vercel.com/docs/connect/legal).