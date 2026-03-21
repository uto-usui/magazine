---
title: "Three of the biggest fraud trends from MRC Vegas 2026"
source: "https://stripe.com/blog/three-fraud-trends-from-mrc-vegas-2026"
publishedDate: "2026-03-20"
category: "engineering"
feedName: "Stripe Blog"
---

Earlier this week, more than 2,000 payments leaders gathered at the [Merchant Risk Council (MRC) Vegas 2026](https://merchantriskcouncil.org/events/2026/mrc-vegas-2026) conference to discuss new fraud patterns, authentication strategies, and agentic commerce. One theme emerged: fraud has become more automated and increasingly difficult to detect with traditional tools.

The most sophisticated fraud teams are responding by shifting from one-size-fits-all fraud approaches to more dynamic, tailored interventions. They are removing friction for trusted users, embedding fraud detection directly into agentic transactions, and investing in multilayered identity verification to combat deepfakes. 

Here’s how leading enterprises are evolving their fraud strategy. 

## 1\. Successful fraud teams are dynamically authenticating users based on intent

Many businesses add authentication requirements universally to all customers or businesses, to increase the likelihood of finding every bad actor. The cost of this approach is often underestimated, said Roberta Del Monte Radford, payment risk operations lead, strategy and innovation at Airbnb, during her session on connecting refund fraud and reseller fraud. A false positive leads to a declined transaction and losing the potential lifetime value of a legitimate customer. 

Her proposed alternative is to build a behavioral picture of each user over time and use it to understand intent—what she calls high-trust velocity. And if you can gauge intent with precision, you can strategically introduce authentication requirements to some users, but not all. 

“If we have high-trust velocity, why would we put that entity through friction? We don’t need to; we know they’re good, so they don’t need any friction whatsoever. We’ll reserve the friction package to the 1% of the traffic that actually is proven to be risky,” said Del Monte Radford. 

Stripe is building with this principle in mind. Stripe Radar’s [adaptive 3DS](https://docs.stripe.com/radar/risk-settings#adaptive-3ds) applies friction dynamically, using AI to assess risk level and only triggering an authentication challenge when something looks unusual. Businesses on Stripe have seen an over 30% reduction in fraud on eligible transactions, representing one of our largest ever improvements.

## 2\. Agentic commerce is challenging rules-based fraud detection

Ashley Furniture has built a sophisticated rules-based fraud operation. The company handles both products that ship within a few days alongside custom orders that take more than 30 days to manufacture; each type of order requires a different authorization cycle. That infrastructure works when humans are managing the process, but Ashley Furniture’s team realized its fraud strategy needed to evolve when it launched its agentic commerce offering.

“Rule-based fraud detection was not going to be sufficient,” said Kyle Dorcas, head of product management at Ashley Global Retail, during his session on building payments and fraud infrastructure for AI agents. “We firmly believe that in order to combat fraud, \[detection\] really has to be in the payment fabric.”

When agents are making purchases across channels, fraud detection can’t evaluate transactions after the fact. Instead, fraud detection has to be embedded in the payment infrastructure itself, adapting in real time to patterns that static rules can’t anticipate. 

Stripe’s [Shared Payment Tokens](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens) allow AI agents to initiate payments using a buyer’s saved payment method without exposing payment credentials. When used with [Stripe Radar](https://stripe.com/radar), they also relay underlying risk signals in real time—including likelihood of fraudulent dispute, card testing, stolen card use, and issuer declines—helping differentiate between high-intent agents and low-trust automated bots.

## 3\. Deepfakes and synthetic identities require new fraud tactics

Producing a convincing fake identity used to require criminal infrastructure, specialist knowledge, and meaningful effort. That barrier is largely gone. Bad actors now have easy access to templates for driver’s licenses, bank statements, utility bills, and government IDs. Generative AI has also accelerated impersonation capabilities. Gordon Sheppard, head of fraud operations at H&R Block, demonstrated this during his session on strengthening identity verification to combat ecommerce fraud. Using a single still photo, a 30-second audio clip, and about 20 minutes of work, he generated a convincing video of himself speaking fluent Mandarin, Italian, and Russian. The same tools are available to anyone. 

Gordon says identity verification now depends on finding the anomalies fraudulent actors can’t get perfectly right every time, such as an incorrect signature or a mirror-image headshot. He shared an example where everything on a fraudulent license was flawless except one detail: the expiration date didn’t match what the authoritative data source had on file for that license. The implication, Gordon argued, is that no single check is sufficient because a convincing forgery will fail somewhere.

With [Stripe Identity](https://stripe.com/identity), businesses can programmatically confirm the identity of global customers to prevent attacks from bad actors. We can detect fake IDs and spoofed photos with AI, match the ID photo with selfies of the document holder, and validate SSN and addresses against global databases.

To learn more about how Stripe can help your business fight fraud, [contact us](https://stripe.com/gb/contact/sales) or [sign up for an account](https://dashboard.stripe.com/register?redirect=radar).