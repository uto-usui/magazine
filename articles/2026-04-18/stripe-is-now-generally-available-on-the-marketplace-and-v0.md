---
title: "Stripe is now generally available on the Marketplace and v0"
source: "https://vercel.com/changelog/stripe-is-now-generally-available-on-the-marketplace-and-v0"
publishedDate: "2026-03-05"
category: "frontend"
feedName: "Vercel"
author: "Dima Voytenko"
---

1 min read

Mar 5, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6pqFNSvo51wfz4tv7p2Z9S%2F75faf1c65a82e1a793fc8a54226e576c%2FVercel___Stripe_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7tdiEJUmbthcpKHEVhzcj1%2F6b6e6dcff9d3606f3d37e2c73eaa8aaa%2FVercel___Stripe_-_Dark.png&w=1920&q=75)

You can now connect your production Stripe account to Vercel and start accepting real payments. The integration securely provisions your API keys as environment variables and supports both sandbox and live modes.

Test your payment flows in sandbox, then move to production without manually exchanging or managing keys. Built in collaboration with Stripe, the new key management APIs make it possible to reduce setup friction while strengthening security from day one.

This unlocks real production use cases like:

-   **Live ecommerce:** Accept real payments and manage checkout flows for production storefronts
    
-   **Production SaaS billing:** Charge customers for subscriptions, usage, and invoices from day one
    
-   **Shipping to real users:** Move from sandbox to production without re-wiring your integration
    

```
import Stripe from "stripe"const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)const session = await stripe.checkout.sessions.create({    ui_mode: 'embedded',    redirect_on_completion: 'never',    line_items: [      {        price_data: {          currency: "usd",          product_data: { name: "T-Shirt" },          unit_amount: 40_00,        },        quantity: 1,      },    ],    mode: 'payment',  })
```

Get started today with this [example](https://vercel.com/templates/next.js/simple-online-store-with-stripe) to build your first online simple store using Vercel and Stripe. See the [documentation](https://vercel.com/docs/integrations/ecommerce/stripe) to learn more.