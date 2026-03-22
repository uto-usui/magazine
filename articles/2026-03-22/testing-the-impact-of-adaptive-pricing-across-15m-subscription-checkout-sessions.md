---
title: "Testing the impact of Adaptive Pricing across 1.5M subscription checkout sessions"
source: "https://stripe.com/blog/adaptive-pricing-for-subscriptions"
publishedDate: "2026-03-19"
category: "engineering"
feedName: "Stripe Blog"
---

 ![Blog > Adaptive Pricing for subscriptions > Header image](https://images.stripeassets.com/fzn2n1nzq965/3Sc7PKugHkS3ICXvyjfxON/f9246d95b5e0626ace7e1f6fc80a60b2/Hero_Image__top_of_blog__2x__1_.png?w=1616&q=80)

Subscription businesses are more global than ever, driven in large part by the growth of AI companies. But as they expand into more markets, setting the right price in the right currency is still incredibly complex. 

Localizing even a one-time purchase is difficult: because exchange rates move, keeping prices localized requires businesses to absorb foreign exchange (FX) risk, pay conversion fees, and continually manage price lists across currencies, while also taking on the ongoing finance and accounting work of adjusting, reconciling, and reporting on those changes over time. 

Subscriptions add another layer of complexity. Localizing a subscription means keeping pricing predictable across every billing cycle, even as exchange rates fluctuate. Consistency is especially important for recurring purchases, where small, unexpected changes can cause a customer to cancel. Renewals are also more likely to fail when the charge is processed cross-border rather than in a local currency. In 2025, 80% of subscription transactions were still priced in the business’s default currency.

To address these challenges, [Adaptive Pricing](https://docs.stripe.com/payments/currencies/localize-prices/adaptive-pricing) for subscriptions is now available as part of the Optimized Checkout Suite, so businesses can automatically present prices in a customer’s local currency while Stripe handles the currency conversion and the operational work behind it. Adaptive Pricing supports both subscription signups and subsequent renewals and includes a stability buffer that helps keep renewal amounts consistent across billing cycles, despite changes in exchange rates. For example, a customer who signs up at R$49.60/month in Brazil continues to see R$49.60 each month, instead of a different amount every time their bank converts from USD.

If rates move significantly, renewal amounts for that billing cycle may be adjusted to reflect the latest exchange rate—similar to the experience customers have today with their card issuers.

## Measuring the impact of Adaptive Pricing on subscriptions

To understand how localized pricing affects subscription performance, we analyzed 1.5 million subscription checkout sessions across businesses in our private preview, comparing sessions that offered Adaptive Pricing with a 1% randomized holdback group. We evaluated both session-level outcomes, which capture the total value generated per checkout session, and subscription-level outcomes, which capture the total value of the subscription over time, including the initial transaction and renewals. 

We analyzed the impact of Adaptive Pricing at signup and through the first three months:

**At signup:** 

-   Conversion rate
-   Authorization rate

**Over time:**

-   Subscription duration per session
-   Subscription lifetime value (LTV) per session

## Adaptive Pricing improves subscription signup performance

At signup, offering Adaptive Pricing increased conversion by 4.7% on average and authorization by 1.9% on average across sessions. In practice, that means more customers made it to payment, and more of those payments were approved—together increasing the number of successful subscription signups.

 ![Blog > Adaptive Pricing for subscriptions > Inline image 1](https://images.stripeassets.com/fzn2n1nzq965/ARkjGf5JLohrw31wnAizd/cbd2bb8e775acdf8dfe2964640806ffe/Inline_image_1.png?w=1616&q=80)

Those gains also carried through to downstream outcomes, including a 5.4% increase in LTV per session on average. Results varied across businesses, with some seeing increases of more than 30%. [Runway](https://stripe.com/customers/runway), for example, saw a 14% increase in LTV per session, and subscriptions using Adaptive Pricing generated 17.7% more LTV per subscription.

People are more likely to complete a purchase when they see prices in a currency they immediately recognize and understand, without needing to mentally convert the total cost. Localized pricing can make subscriptions feel more transparent, since customers are committing to an ongoing charge rather than a one-time payment.

Charging in local currency also improves payment performance. Cross-border transactions are more likely to be declined, so presenting and charging in a customer’s local currency can increase the likelihood that the payment is approved. In the sessions we analyzed, offering Adaptive Pricing increased authorization rates by 1.9%, helping more subscription purchases go through at signup. 

Taken together, these results show that Adaptive Pricing helps convert more checkout sessions into paying subscriptions, leading to more subscription LTV per session.

## Higher signup conversion can translate into more value over time

In addition to the stronger signup performance, customers who paid in their local currency consistently showed higher retention than those who paid in a business’s default currency. This suggests that localized pricing can support continued renewals, beyond the initial signup.

 ![Blog > Adaptive Pricing for subscriptions > Inline image 2](https://images.stripeassets.com/fzn2n1nzq965/68A6RLoRf6AZOkOwchTweZ/574e1e46bc14d2d5a321f939b2c09bd8/Inline_image_2.png?w=1616&q=80)

That has implications for customer lifetime value. When more customers start subscriptions—and more of those subscriptions remain active, as successful renewals add up—the value of each subscriber grows. Even modest improvements in conversion and payment success can increase subscriber value over time. 

## Scale subscriptions globally with localized pricing

Businesses that don’t localize prices are likely leaving revenue behind. Our analysis shows that Adaptive Pricing helps subscription businesses capture more of that revenue by showing prices in a customer’s local currency, increasing conversion, improving authorization at signup, and driving more value from every checkout session.

It also means businesses don’t need to build and maintain their own FX infrastructure, localized price lists, and renewal logic across currencies. More than 500,000 businesses, including 16,000+ subscription companies like Cursor, Perplexity, and Runway, already use Adaptive Pricing to offer subscription pricing in local currencies to customers worldwide.

To learn more about Adaptive Pricing for subscriptions, [read our docs](https://docs.stripe.com/payments/currencies/localize-prices/adaptive-pricing) or [get in touch](https://stripe.com/contact/sales).