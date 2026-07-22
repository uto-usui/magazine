---
title: "Vercel Connect adds 90+ preset connectors"
source: "https://vercel.com/changelog/vercel-connect-preset-connectors"
publishedDate: "2026-07-21"
category: "frontend"
feedName: "Vercel"
author: "Bhrigu Srivastava"
---

Vercel Connect now includes preset connectors for 90+ services, including Shopify, Okta, Workday, Jira, and Sanity.

Preset [connectors](https://vercel.com/docs/connect/concepts/connectors) are predefined configurations for supported services. They reduce manual setup by pre-populating the brand name, icon, auth type, and MCP or discovery URL. Unlike managed connectors, preset connectors don't register your app with the external service for you.

## [Copy link to heading](#add-a-connector)Add a connector

Select a preset from the [connectors directory](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect%2Fbrowse) in the Vercel dashboard. Review the pre-populated configuration, add any credentials the service requires, and create the connector.

You can also start from the CLI:

```
vercel connect create shopify --name acme-shopvercel connect attach shopify/acme-shop --project my-app --environment production
```

Use the Vercel CLI to add the Shopify connector

Today, `vercel connect create` opens the dashboard to complete setup. Full CLI support for preset connectors is coming soon.

## [Copy link to heading](#request-tokens)Request tokens

After attaching a preset connector, request [tokens](https://vercel.com/docs/connect/concepts/tokens) the same way you do for any other Connect provider. Call `getToken` with the connector's UID (`service/name`) to receive a short-lived, scoped token:

```
import { getToken } from '@vercel/connect';const token = await getToken('shopify/acme-shop', {  subject: { type: 'app' },  scopes: ['write_products'],});await fetch(`https://${shop}.myshopify.com/admin/api/2026-01/graphql.json`, {  method: 'POST',  headers: {    'X-Shopify-Access-Token': token,    'Content-Type': 'application/json',  },  body: JSON.stringify({    query: `mutation {      productCreate(product: { title: "Restocked: Acme Mug" }) {        product { id }      }    }`,  }),});
```

Update a product in your Shopify store with the Vercel Connect credential

To get started, browse [preset connectors](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect%2Fbrowse) or learn more in the [documentation](https://vercel.com/docs/connect/quickstart).