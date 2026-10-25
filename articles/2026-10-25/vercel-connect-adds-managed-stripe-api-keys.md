---
title: "Vercel Connect adds managed Stripe API keys"
source: "https://vercel.com/changelog/vercel-connect-adds-managed-stripe-api-keys"
publishedDate: "2026-10-23"
category: "frontend"
feedName: "Vercel"
author: "Dima Voytenko"
---

[Vercel Connect](https://vercel.com/docs/connect) can now create a separate [restricted Stripe API key](https://docs.stripe.com/keys/restricted-api-keys) for each agent or task. When you create a Stripe connector, you can now choose Managed API Key as the connection method.

Vercel creates the key in your Stripe account, limited to the permissions you pick. The existing MCP and bring-your-own API key methods are unchanged.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6B0HTUZn7PXmsWqx9vlGKW%2F6b11a65f6e870cfb723b530b3ba9f934%2Fcebf1387-7265-4d17-a034-c8eb1e049db6.png&w=1920&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2zM1lADYMdUBxLA2cebj60%2F83d2b878b9a36675383e5716d7017c44%2F2898ffb3-f455-474a-b0f8-ed1f17ac6ee6.png&w=1920&q=95)

Most apps and agents run on Stripe’s default secret key, which has full access to the account. With per-agent keys, each agent gets only the access its job needs. For example, a daily revenue report agent can be limited to read-only access to charges, and an onboarding agent can be limited to write access to customers.

Vercel creates and stores the key, so there is no secret key to paste. You can rotate it from the connector's settings without redeploying, and the old key stays valid for up to 24 hours while you switch.

### [Copy link to heading](#add-the-stripe-connector)Add the Stripe connector

Create a Stripe connector from the connectors directory, choose Managed API Key, pick its permissions, and attach it to your project. You can also start from the CLI, which opens the browser to finish setup:

```
vercel connect create stripe --connection-method managed-api-key --name acme-stripevercel connect attach stripe/acme-stripe --project my-app --environment production
```

Add the Stripe connector with the Vercel CLI

```
import Stripe from 'stripe';import { getToken } from '@vercel/connect';const key = await getToken('stripe/acme-stripe', {  subject: { type: 'app' },});const stripe = new Stripe(key);const customers = await stripe.customers.list({ limit: 10 });
```

Call getToken with the connector’s UID to get the restricted key at runtime

To get started, add the [Stripe connector](https://vercel.com/connect/stripe) or read the [documentation](https://vercel.com/docs/connect/quickstart).