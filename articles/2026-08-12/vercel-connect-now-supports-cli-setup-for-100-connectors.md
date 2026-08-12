---
title: "Vercel Connect now supports CLI setup for 100+ connectors"
source: "https://vercel.com/changelog/vercel-cli-100-services"
publishedDate: "2026-08-11"
category: "frontend"
feedName: "Vercel"
author: "Bhrigu Srivastava"
---

You can now integrate 100+ services through Vercel Connect from the CLI. Previously, `vercel connect create` completed setup in the terminal for some services, and opened the dashboard for everything else.

Pass the service name to create a connector, then attach it to your project:

```
vercel connect create shopify --name acme-shopvercel connect attach shopify/acme-shop --project my-app --environment production
```

Use the Vercel CLI to add the Shopify connector

The CLI pre-populates the brand name, icon, auth type, and MCP or discovery URL, then prompts for any credentials the service requires and creates the connector.

After attaching the connector, call `getToken` with its UID (`service/name`) to request a short-lived, scoped token from the provider:

```
import { getToken } from '@vercel/connect';const token = await getToken('shopify/acme-shop', {  subject: { type: 'app' },  scopes: ['write_products'],});await fetch(`https://acme.myshopify.com/admin/api/2026-01/graphql.json`, {  method: 'POST',  headers: {    'X-Shopify-Access-Token': token,    'Content-Type': 'application/json',  },  body: JSON.stringify({    query: `mutation {      productUpdate(product: { id: "gid://shopify/Product/123", title: "Restocked: Acme Mug" }) {        product { id }      }    }`,  }),});
```

Update a product in your Shopify store with the Vercel Connect credential

Get started by browsing the [connectors directory](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect%2Fbrowse), or read the [CLI reference](https://vercel.com/docs/cli/connect).

**Vercel Connect is in beta and available on all plans.** Features and behavior, including available connectors and trigger forwarding, may change before general availability. Usage is subject to the [Beta Agreement](https://vercel.com/docs/release-phases/public-beta-agreement) and [Vercel Connect terms](https://vercel.com/docs/connect/legal).