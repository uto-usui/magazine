---
title: "Supporting additional payment methods for agentic commerce "
source: "https://stripe.com/blog/supporting-additional-payment-methods-for-agentic-commerce"
publishedDate: "2026-03-03"
category: "engineering"
feedName: "Stripe Blog"
---

Last year, we launched [Shared Payment Tokens](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens) (SPTs), a payment primitive for agentic commerce that lets agents initiate payments with a customer’s permission and preferred payment method, without exposing the underlying credentials. We’ve seen widespread adoption of SPTs by leading businesses such as Etsy and URBN (including Anthropologie, Free People, and Urban Outfitters). Since then, sellers have asked us for access to more of the most popular payment methods for agentic transactions. 

To that end, we’re expanding SPT support to enable broader access to network-led agentic payment capabilities, including Mastercard Agent Pay and Visa Intelligent Commerce, as well as buy now, pay later (BNPL) methods such as Affirm and Klarna. This makes Stripe the first and only provider that supports both agentic network tokens and BNPL tokens in agentic commerce through a single primitive. These capabilities are already rolling out: Stripe is using agentic network tokens to process transactions across supported AI agents.

 ![Blog > Supporting additional payment methods for agentic commerce > Image 1](https://images.stripeassets.com/fzn2n1nzq965/1F5FemTwofKWAVRF1uJrjR/220808a8c501f45804330954d787b0ea/tokenization-2.png?w=1616&q=80)

For sellers, the experience is straightforward. You interact only with SPTs, while Stripe handles the complexity of provisioning agentic network and BNPL tokens behind the scenes. Any seller already processing payments with Stripe automatically supports these new payment methods for agentic transactions.

## Enable network-led agentic payments with Mastercard and Visa

Built by Mastercard and Visa and deployed in partnership with Stripe, agentic network tokens are network-issued, secure digital credentials that allow authorized AI agents to initiate payments on a customer’s behalf without exposing underlying card details. 

“Mastercard Agent Pay represents a fundamental shift in how agent-initiated commerce comes to life, extending the scale and trust of network tokenization into AI-driven payments,” said Pablo Fourez, chief digital officer at Mastercard. “Together with Stripe, we’re helping build and scale the critical infrastructure for the agentic economy.”

“Agentic commerce is accelerating the next phase of digital payments, where security, control, and scale are foundational,” said Rubail Birwadker, senior vice president, head of growth products and partnerships at Visa. “Through our partnership with Stripe, Visa agentic network tokens will power agent-driven payments with the same trust, performance, and protections merchants rely on every day.”

When a customer authorizes an agent to make purchases, Stripe provisions an agentic network token from Mastercard or Visa scoped to the customer’s intent and shares it with the agent. The agent can then use these tokens across any seller accepting agentic payments and anywhere Mastercard or Visa is accepted. The network then handles secure credential translation, verification, and authorization. This allows agents to vault agentic network tokens with Stripe once and use them across multiple sellers in alignment with the customer’s intent. 

Agentic network tokens function similarly to card-on-file network tokens: payment networks automatically map the agentic network token to the latest FPAN when sending authorization requests to the issuers. They also add additional information in the authorization message for the issuers to make informed authorization and provisioning decisions, and manage disputes and fraud.

## Accept Affirm and Klarna payments

BNPL methods, which allow customers to finance purchases and pay them back in fixed installments, were little-known less than a decade ago. Today, they account for over [$300 billion](https://www.globaldata.com/store/report/buy-now-pay-later-market-analysis/) in transactions worldwide. Businesses on Stripe can see up to a [14% increase in revenue](https://stripe.com/blog/testing-the-impact-of-buy-now-pay-later) on BNPL-eligible sessions, driven by increased conversion and higher average order values.

We’re now bringing this value to agentic transactions by adding SPT support for Affirm and Klarna. This allows agents to present flexible payment options on behalf of customers, helping increase checkout conversion rates. And just like with agentic network tokens, sellers already processing payments with Stripe get access to BNPLs in agentic flows. 

Here’s how it works: when a customer selects a BNPL option, Stripe surfaces the BNPL confirmation page on the agent’s UI and passes the seller’s credentials to the BNPL provider. This means the customer experience is unchanged while Stripe manages the complexity behind the scenes.

## Looking ahead

Looking ahead, we plan to expand SPT support to more payment methods, making agentic payments accessible to more customers. And to learn more about how we’re expanding our agentic commerce solutions, [join us at Stripe Sessions](https://register.stripesessions.com/2026/form).