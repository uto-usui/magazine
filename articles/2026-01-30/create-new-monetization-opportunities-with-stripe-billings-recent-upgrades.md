---
title: "Create new monetization opportunities with Stripe Billing’s recent upgrades"
source: "https://stripe.com/blog/create-new-monetization-opportunities-with-recent-stripe-billing-upgrades"
publishedDate: "2025-11-11"
category: "engineering"
feedName: "Stripe Blog"
---

Atlassian, Figma, Instacart, and fast-growing AI companies such as OpenAI, Anthropic, and NVIDIA use [Stripe Billing](https://stripe.com/billing) to power diverse and complex revenue models. We’ve worked closely with these users to make Billing a complete, configurable platform for all business types—ensuring they have the flexibility to adapt pricing as their products change and to integrate Stripe into their existing payments infrastructure. 

This user-led approach is working: Billing now has more than 300,000 users and was recognized as a Leader in both the [2025 _Gartner® Magic Quadrant™ for Recurring Billing Applications_](https://go.stripe.global/gartner-magic-quadrant-billing-2025)[1](#blog-greater-than-new-monetization-opportunities-with-stripe-billings-recent-detail) and [_The Forrester Wave™: Recurring Billing Solutions_](https://stripe.com/lp/forrester-wave-billing-2025) for Q1 2025.

We recently released a series of improvements to expand multiprocessor support, give you more control over your billing and invoicing models, and better tailor your pricing for AI products. Here’s everything that’s new.

## Billing can now manage successful, failed, refunded, and canceled payments made by off-Stripe payment processors

 ![Blog > Billing roundup > MP](https://images.stripeassets.com/fzn2n1nzq965/1z3Rc5zpjSOOw2abQO3FkB/b0143030214370af1ef97d2bf3f21a63/updated-MP.png?w=1620&q=80)

You can already integrate Billing with different payment processors, but large users with complex payment stacks comprising multiple processors tell us that they want to use Billing to manage more of their recurring revenue. You can now use Billing to manage subscription payments made with [off-Stripe payment processors across the payments lifecycle](https://docs.stripe.com/billing/subscriptions/third-party-payment-processing), including successful, failed, refunded, and canceled payments. This means you can:

-   Report failed payment statuses for off-Stripe transactions and attach those records to invoices
-   Set up scheduled retries and use dunning for off-Stripe transactions
-   View your uploaded payment method logos and names in the customer portal for off-Stripe transactions
-   Take advantage of unified reporting and revenue recognition across Stripe and non-Stripe payment volume (this is an additional paid feature on Stripe)

We’ll continue to expand multiprocessor support for Billing throughout the year. Soon, you’ll be able to use Stripe Sigma for advanced reporting, record an off-Stripe dispute payment, and update subscriptions in the customer portal with any other payment processor.

## Billing and Stripe Invoicing upgrades help you offer flexible payment options 

 ![Blog > Billing roundup > Prebilling](https://images.stripeassets.com/fzn2n1nzq965/3XKq7ywaRNdvBU0iOzmPqd/c24864c689ac5042fa08c97520e80df8/prebill-2.png?w=1620&q=80)

As you grow, you need the ability to quickly adapt your pricing strategy to stay competitive and meet customer expectations. Businesses tell us they want to offer early payment incentives to close deals, align subscription terms to competitors, and provide flexible payment options that reduce customer friction. 

To that end, you can now [bill for future subscription periods at any time](https://docs.stripe.com/billing/subscriptions/sales-led-billing#prebill-customers-in-advance)—whether that’s collecting next month’s payment today to close a sales deal or billing three months in advance to improve cash flow predictability. You can prebill specific items on a subscription, cover arbitrary periods (such as prebilling through December 2025 and returning to regular billing afterward), and prebill partial periods. 

We also released a series of improvements to [Invoicing](https://stripe.com/invoicing) to help you get paid faster and enhance your customers’ payment experience. You can allow customers to pay in their local currency in more than 150 countries via [Adaptive Pricing](https://docs.stripe.com/payments/currencies/localize-prices/adaptive-pricing) and give customers the flexibility to pay in installments with [buy now, pay later (BNPL) methods](https://docs.stripe.com/payments/buy-now-pay-later#product-support) such as Klarna, Affirm, and Afterpay/Clearpay—all available on the Hosted Invoice Page. You can also more flexibly manage payments on invoices by accepting [partial payments](https://docs.stripe.com/invoicing/partial-payments) and [unapply payments](https://docs.stripe.com/invoicing/payment-application#unapply-a-payment-from-an-invoice) from paid invoices to correct reconciliation errors.

## New pricing plans allow you to model and manage hybrid pricing

 ![Blog > Billing roundup > Pricing plans](https://images.stripeassets.com/fzn2n1nzq965/1xiE0kS0kSzOVsoUVjsS3F/3e702607893b5fc470236c2eb9c63728/new-pricing-plans.jpg?w=1620&q=80)

AI is fundamentally reshaping product capabilities, the value they deliver, and the methods for monetizing that value. However, traditional pricing models struggle to keep pace with shifting costs. Hybrid pricing approaches that combine subscriptions, usage-based rates, and credits offer a better balance between predictability and scalability, but they’re often complex for businesses to implement.

Last month at Stripe Tour New York, we previewed our solution: our new pricing plans that combine [usage-based rates with dimensional pricing, recurring fees, and credits](https://docs.stripe.com/billing/subscriptions/usage-based/advanced/compare) allow you to easily model and manage hybrid pricing.

For example, imagine Lora, a fictional AI company that offers a monthly subscription that automatically grants recurring credits. With Stripe’s pricing plans and rate cards, Lora can set up the subscription, issue monthly credits, and define how those credits are consumed across different products—all through one simple plan and consolidated bill. Consumption is tracked in real time, and dashboards powered by the Usage Analytics API give both Lora and its customers clear visibility into usage and credit balances. Lora can then schedule automatic top-ups when credits run low, ensuring that customers get an uninterrupted product experience.

What once took weeks of engineering work can now be completed much faster. For example, Lovable implemented its complete system with just two engineers in under two weeks—from design to launch—using Stripe’s new pricing plans.

## Stripe’s LLM proxy protects your margins when AI model costs change

 ![Blog > Billing roundup > Token billing](https://images.stripeassets.com/fzn2n1nzq965/CYkYP6HtHvNAN7CNzWY39/76b5362c6d671b667bfaea8bf61c5989/banner2.png?w=1620&q=80)

AI products are under constant pressure from fluctuating inference costs, which can vary significantly—sometimes by 10%–40% within just a few months. If inference costs drop 25% and you don’t adjust prices, you risk losing your competitive advantage. If costs rise and you don’t react quickly, your margins suffer. 

At Stripe Tour New York, we shared how you can automatically update pricing and protect margins when AI model costs change with [Stripe’s LLM proxy](https://docs.stripe.com/billing/token-billing), currently available via private preview. 

Here’s how it works: when you make an API request using Stripe’s LLM proxy endpoint, we track query and response usage based on token consumption, and we apply your previously defined pricing—all in one request. Stripe tracks and totals token usage, applies your markup, and sends unified invoices on your behalf. When underlying costs change, you don’t need to do additional work to maintain margins. Through integrations with OpenRouter, Cloudflare, Vercel, and Helicone—with more coming—you can route requests through third-party LLM proxies while Stripe automatically logs token consumption and usage events.

## Supporting your growth

As we continue to improve Billing, [we’d love to hear](https://stripe.co1.qualtrics.com/jfe/form/SV_b7ne4W5n1kbdYJ8) what you want us to build next. To learn more about how Billing can accelerate your growth, read our [docs](https://docs.stripe.com/) or [get in touch](https://support.stripe.com/) with an expert from our team.