---
title: "New currency capabilities for global businesses to cut FX costs "
source: "https://stripe.com/blog/reduce-fx-costs-with-stripe"
publishedDate: "2026-08-17"
category: "engineering"
feedName: "Stripe Blog"
---

 ![Blog > New currency capabilities for global businesses to cut FX costs > Blog header](https://images.stripeassets.com/fzn2n1nzq965/2oXiqTGc86yKU4kubsosv4/2267456ff2dfddb2c7d18345f6c93663/Blog___Header_new__2000x1000_.png?w=1620&q=80)

The fastest-growing companies on Stripe are going global earlier than their predecessors, with cross-border payment volume growing over 40% every year since 2018. But that growth often comes with the expensive and complex operational challenge of managing multiple currencies.

Businesses that sell globally face several problems. 

First, they fall into the double foreign exchange (FX) trap, paying conversion fees twice: once to convert payments into their home currency, and again when converting funds to pay payroll, vendors, or operating expenses in foreign currencies.

Second, when a conversion is necessary, businesses face delays and hidden markups, which makes the total cost of FX difficult to predict and manage.

Lastly, most businesses stitch together multiple providers for payments, FX, banking, and payouts, which creates even more overhead, errors, and delays.

Today, we’re announcing two upgrades to make it easy for global businesses to manage FX entirely on Stripe: we’re expanding multicurrency settlement to more markets and currencies, and we’re introducing the ability to convert currencies instantly—all on Stripe. 

## **Settle payments in more markets and currencies** 

We introduced [multicurrency settlement](https://docs.stripe.com/payouts/multicurrency-settlement) two years ago to help businesses settle payments in the same currencies their customers use to pay.

 ![Blog > New currency capabilities for global businesses to cut FX costs > Blog | MCS UI](https://images.stripeassets.com/fzn2n1nzq965/26IHNR0e3VNa5m3v5GoR4E/12281dda1907c6efb5f07aa910b1c7ae/MCS_UI_static_NEW.png?w=1620&q=80)

Since launching, we’ve seen steady demand and growth: 

-   Between 2024 and 2025, the number of businesses on Stripe using multicurrency settlement grew 35%, and the number settling in four or more currencies doubled. 
-   Fast-growing companies are adopting multicurrency settlement at an even higher rate: businesses on Stripe that grew by 40% annually over the past two years were more than twice as likely to use multicurrency settlement than those growing by 10% or less. 

To build on the demand we’ve seen, we’re expanding settlement currencies across multiple markets. By the end of 2026, businesses in 37 markets—including Australia, Hong Kong, and Singapore—will be able to settle payments earnings in up to 18 currencies, depending on where they operate. This expanded coverage gives businesses more flexibility to keep funds in the currencies they need, whether they’re covering international expenses or sending money to vendors around the world. Check out the [roadmap](https://stripe.com/money-management/availability#receive) for full details.  

 ![Blog > New currency capabilities for global businesses to cut FX costs > Blog | MCS roadmap ](https://images.stripeassets.com/fzn2n1nzq965/4WfD7kqe7aXgNNZyvIZcbh/1f52d146a2b67f3bfe8c17be26b0ef7b/Blog___MCS_roadmap__2160x916_.png?w=1620&q=80)

## **Convert currencies instantly on Stripe** 

Even with multicurrency settlement, businesses have historically had to wait for funds to settle to their external bank account or FX provider before converting them. Now, any business accepting multiple currencies on Stripe can hold and convert those funds through the Stripe Dashboard, API, or on mobile using [instant currency conversion](https://docs.stripe.com/instant-currency-conversion).

Instant currency conversion allows businesses to convert funds between 15 currencies at transparent, market-leading pricing, with additional currencies planned for 2026.

Businesses can see rates in real time and convert funds 24/7, without hidden markups embedded in the exchange rate or weekend surcharges. For businesses with more complex currency workflows, the [instant currency conversion API](https://docs.stripe.com/instant-currency-conversion#convert-currencies-instantly-using-the-api) can automate conversions. Platforms can also use the API to monetize and distribute currency management capabilities to their merchants.

We’re already seeing businesses use instant currency conversion as part of their regular operating cadence: 50% of businesses convert on multiple occasions within 60 days of their first conversion. Those businesses convert funds every 25 days on average, consistent with monthly payroll cycles and month-end close.

## **How businesses use Stripe to reduce FX costs and simplify workflows** 

Together, multicurrency settlement and instant currency conversion let businesses settle, store, and convert funds in the same place they already accept payments. 

Businesses like [Canva](https://stripe.com/customers/canva) and Voodoo have high-volume multicurrency needs for paying out vendors, payroll, and operating expenses across markets. They use Stripe to avoid the double FX trap and simplify currency management. Global platforms and marketplaces like [Kustom](https://www.kustom.co/) and [Turo](https://stripe.com/customers/turo) use these currency tools with [Stripe Connect](https://docs.stripe.com/connect) to manage cross-border payouts more efficiently while staying compliant and out of the flow of funds. 

[Voodoo](https://stripe.com/customers/voodoo-announcement), the French mobile gaming company behind titles like _Monster Survivors_ and _Mob Control_, earns more than half its revenue from US customers. Historically, every dollar earned had to be converted back to euros, adding FX costs at scale. With multicurrency settlement, Voodoo now settles all incoming US payments in euros—avoiding FX fees while continuing to scale its business in a key market.

## **What’s next**

[View our roadmap](https://stripe.com/money-management/availability) to see where multicurrency settlement and instant currency conversion are expanding through 2026 and 2027. Here’s what’s coming by the end of this year: 

-   **Automated conversions:** We’ll give you the ability to automate conversions from the Stripe Dashboard. 
-   **Advanced API workflows:** We’ll expand access to the API, which supports custom and advanced workflows, especially for platforms that want to offer currency conversion to their merchants_._ [Request access](https://docs.stripe.com/instant-currency-conversion?__previewId=#convert-currencies-instantly-using-the-api) to the private preview now.
-   **Currency management for platforms:** We’ll improve platform distribution and monetization of [multicurrency settlement](https://docs.stripe.com/payouts/multi-currency-settlement) through upgrades to the platform pricing tool in the Dashboard.
-   **Expansion of storage and payout capabilities:** When multicurrency settlement and instant currency conversion are coupled with [Stripe Treasury](https://docs.stripe.com/treasury) and [Stripe Global Payouts](https://docs.stripe.com/global-payouts), businesses can facilitate all their global money management needs on Stripe.

## **Get started today**

To enable [multicurrency settlement](https://docs.stripe.com/payouts/multi-currency-settlement) and start [converting currencies instantly](https://docs.stripe.com/instant-currency-conversion) on Stripe, add settlement currencies from the [Balances page](https://dashboard.stripe.com/balance/overview) of the Dashboard.