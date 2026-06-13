---
title: "New ways to turn global demand into revenue"
source: "https://stripe.com/blog/new-ways-to-turn-global-demand-into-revenue"
publishedDate: "2026-06-04"
category: "engineering"
feedName: "Stripe Blog"
---

It’s never been easier to reach global customers. Thirty-six percent of Stripe businesses now have customers in more than one country, and the number selling into more than 100 countries has quadrupled in five years. Turning that reach into revenue, however, requires solving a familiar set of cross-border challenges. At Sessions, we announced dozens of new products and capabilities to localize the customer experience, maximize payment performance, move money across borders, and manage tax and regulatory compliance.

## **Convert customers with a localized experience**

 ![Blog > New ways to turn global demand into revenue > Image 1](https://images.stripeassets.com/fzn2n1nzq965/5vTrZnlwtIGNObG48ekTQe/87db3ba75d417bc5b5dc8d5f54f04ba6/Inline_adaptive_pricing.png?w=1616&q=80)

Cross-border success often depends on the customer experience at checkout. A localized experience includes core components like customers’ preferred languages, currencies, and payment methods; it also requires continuous optimization.

[Checkout studio](https://docs.stripe.com/payments/checkout-studio), the newest addition to the [Optimized Checkout Suite](https://support.stripe.com/questions/what-is-stripe-s-optimized-checkout-suite-\(ocs\)), provides tools for businesses to tailor their checkouts to local customers. Industry-specific recommendations and location data help surface local payment methods for each market, with built-in tracking for adoption and performance. Stripe provides access to more than 125 payment methods, including support for [Sunbit](https://docs.stripe.com/payments/sunbit), [Bizum](https://docs.stripe.com/payments/bizum), [Pay by Bank](https://docs.stripe.com/payments/pay-by-bank), [BLIK](https://docs.stripe.com/payments/blik), and [TWINT](https://docs.stripe.com/payments/twint). A fashion retailer expanding into Spain or Poland, for instance, might be prompted in Checkout studio to add Bizum or BLIK and A/B test against live traffic before deploying it live. 

Checkout studio provides recommendations to help present the right payment methods. Stripe data shows that even one geographically irrelevant payment method can decrease conversion by up to 15%. The upside of getting it right is significant: on Stripe, businesses offering Pix see up to 38.3% higher conversion from customers in Brazil, and those offering UPI see 19.8% higher conversion from customers in India.

Localization also extends beyond language and payment methods to include pricing in local currencies. Stripe data shows that 76% of customers will choose to pay in their local currency when given the option. [Adaptive Pricing](https://docs.stripe.com/payments/currencies/localize-prices/adaptive-pricing) uses AI to display prices in local currencies, while Stripe handles conversion and the operational work behind it. On average, businesses using Adaptive Pricing see a 5% increase in authorization rates and a 17.8% lift in cross-border revenue.

Adaptive Pricing also supports subscription sign-ups and renewals, with guardrails built in to help keep renewal amounts consistent across billing cycles. On average, [Adaptive Pricing for subscription businesses](https://stripe.com/blog/adaptive-pricing-for-subscriptions) drives a 4.7% conversion uplift and a 5.4% increase in lifetime value (LTV) per session.

## **Increase payment acceptance and reduce fraud in every market**

 ![Blog > New ways to turn global demand into revenue > Image 2](https://images.stripeassets.com/fzn2n1nzq965/6VinfcBVSHTJ648zTcqouc/ca2d82b8cbd813a3381da80a2755e505/Radar_-_option_2.png?w=1616&q=80)

Maximizing payment performance also requires accounting for local nuances. Authorization rates vary across markets due to differences in issuers, local network preferences, and regional card behavior. Stripe helps businesses optimize global payments performance with AI-powered authentication, authorization, and fraud tools.

[Stripe Authorization Boost](https://stripe.com/authorization-boost) adapts to market differences automatically with optimizations like real-time retries and issuer-specific messaging per transaction, and it includes support for [Data Only authentication flows](https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions#data-only) to reduce payment friction. Together, these capabilities can drive higher acceptance rates and lower processing costs without manual intervention. Businesses see an average 3.8% lift in authorization, and some Stripe customers with custom interchange pricing see processing costs decrease by up to 3.3%. Built-in [A/B testing](https://docs.stripe.com/payments/analytics/optimization/a-b-testing) helps businesses measure impact before fully rolling out changes more broadly.

Adding new markets and payment methods also introduces new fraud vectors. [Stripe Radar helps reduce fraud by](https://stripe.com/radar) automatically blocking high-risk transactions across [all supported payment methods](https://docs.stripe.com/radar/local-payment-methods), including local bank debits; wallets; buy now, pay later options; and stablecoin payments. In a private preview, Stripe data showed that Radar reduced fraud by an average of 71% across four payment methods: Klarna, PayPal, Affirm, and Cash App Pay.

## **Reduce cross-border costs**

 ![Blog > New ways to turn global demand into revenue > Image 3](https://images.stripeassets.com/fzn2n1nzq965/23FCHqUiTeJ3SvFBR9BG8e/72520a42da9766d2994a780c37aa91e3/inline_Stripe_Treasury.png?w=1616&q=80)

Expanding into more countries can increase revenue, but each new market adds complexity when storing and moving money. Traditional money movement is often fragmented across currencies, accounts, and providers—forcing companies to spend precious time managing operations instead of growing the business.

[Stripe Treasury](https://stripe.com/treasury) brings payments and finances together in one place with the ability to store, convert, and send money across multiple currencies and stablecoins without leaving Stripe. For businesses in the US and UK, settled payment earnings are available instantly, regardless of bank holidays or weekend closures.

Holding funds in multiple currencies has traditionally required multiple bank accounts, local entities, and unnecessary FX fees. With Stripe, businesses can hold [multiple currencies](https://docs.stripe.com/payouts/multicurrency-settlement) side by side in a Treasury account without having to convert them. When [currency conversion](https://docs.stripe.com/instant-currency-conversion) is needed, businesses can do so instantly, 24/7, and lock in transparent, market-leading rates. Organizations can also [pay out globally](https://docs.stripe.com/global-payouts) to more than 160 countries in fiat and stablecoins, and [create cards](https://docs.stripe.com/treasury/cards) that let employees spend directly from Treasury balances.

Additional support for stablecoins gives businesses even more ways to manage and move money globally. A global marketplace, for example, can accept [stablecoin payments](https://docs.stripe.com/payments/stablecoin-payments) in 32 new markets and enable its sellers to hold stablecoins in Treasury. Sellers in 30 countries can also receive a [stablecoin-backed card](https://docs.stripe.com/issuing/stablecoin-cards) and [offramp funds to local currencies](https://apidocs.bridge.xyz/get-started/introduction/what-we-support/payment-routes#supported-fiat-rails) like ARS, COP, EUR, MXN, PHP, and USD.

Today, Treasury is live in more than 120 countries—with stablecoin-backed balances in 100 of them—and we plan to add stablecoin support for an additional 41 countries by the end of 2026. Entrepreneurs in more than 50 countries already use Treasury as their primary business account.

## **Manage tax and regulatory compliance**

 ![Blog > New ways to turn global demand into revenue > Image 4](https://images.stripeassets.com/fzn2n1nzq965/7woVOpoXPPlfuj1WOlB7O4/91cc4cd139736f95db1a6e2f62cb9927/Inline_stripe_managed_payments.png?w=1616&q=80)

Every market comes with its own tax and regulatory rule book, which can slow global expansion. A business might solve for the roughly 16,000 combinations of US sales tax rates and rules, but expanding into India requires navigating different GST structures, real-time e-invoicing, and dispute windows measured in hours instead of days.

Whether businesses choose to manage compliance themselves with Stripe Tax, or rely on Stripe to handle it through Stripe Managed Payments, both approaches help reduce overhead and make global growth easier.

For businesses that want to remain the merchant of record, [Stripe Tax](https://stripe.com/tax) automates tax calculations, collection, threshold monitoring, registrations, and filing. Stripe Tax automatically calculates and collects the right tax in more than 100 countries across more than 600 product categories to simplify tax compliance as a business grows. OpenAI, [ElevenLabs](https://stripe.com/customers/elevenlabs), and [Retell AI](https://stripe.com/customers/retell-ai) are among more than 67,000 companies using Tax to handle compliance rather than building out a full tax team. 

For businesses that want to outsource their tax responsibility, [Managed Payments](https://docs.stripe.com/payments/managed-payments) is Stripe’s merchant of record solution. It handles tax registration, collection, and remittance in more than 80 countries, letting businesses focus on their core product, growth, and expansion.

Tax is only part of the challenge of growing globally. Building internal processes for fraud, disputes, and customer support can slow expansion and increase the cost of entering new markets. With Managed Payments, businesses also get fraud protection, dispute management, customer support, and a localized checkout experience. Managed Payments is now available to businesses selling digital goods, and it has already helped companies like Unity, RevenueCat, and Lovable expand.

## **Grow globally, faster**

Whether you’re entering your first international market or optimizing for the next 10, Stripe offers solutions to help businesses sell, operate, and grow.

See [everything announced at Sessions 2026](https://stripe.com/blog/everything-we-announced-at-sessions-2026), and check out our [product roadmap](https://stripe.com/roadmap) to see the upcoming features Stripe is planning to help global businesses. To network with industry leaders and explore new paths to growth, sign up for a [Stripe Tour](https://stripetour.com/) event near you.