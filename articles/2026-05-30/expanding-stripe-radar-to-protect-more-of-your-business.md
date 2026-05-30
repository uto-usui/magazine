---
title: "Expanding Stripe Radar to protect more of your business"
source: "https://stripe.com/blog/expanding-stripe-radar-to-protect-more-of-your-business"
publishedDate: "2026-05-27"
category: "engineering"
feedName: "Stripe Blog"
---

Last month at Stripe Sessions, we shared the biggest expansion we’ve ever made to [Stripe Radar](https://stripe.com/radar), our AI-powered fraud prevention tool. Radar now blocks high-risk transactions across all supported payment methods; defends against new fraud types like multi-account abuse and pay-as-you-go abuse, regardless of which payment processor you use; and gives platforms new tools to evaluate and mitigate merchant risk on and off Stripe. We also launched additional ways to fight disputes with smarter evidence and automated evidence libraries.

Here’s a closer look at what we announced.

## Protect more transactions with global payment coverage, new multiprocessor signals, and custom models

 ![Blog > Expanding Stripe Radar > Image 1](https://images.stripeassets.com/fzn2n1nzq965/1YQEgHoT7D5t8qxeF6bODV/cf4ed4636c6479c72d6e604d737e103f/3v-lpms.jpg?w=1616&q=80)

Fraud protection is getting more complex. Businesses need to defend across a range of payment methods, and they need more precision in the signals they use to catch fraud before it happens—on and off Stripe. Radar now addresses both, along with the ability to use custom fraud models. 

**Block high-risk transactions across all supported global payment methods**

Radar now protects [all supported payment volume globally](https://docs.stripe.com/radar/local-payment-methods), including bank debits, buy now, pay later (BNPL) options, crypto, digital wallets, real-time payments, and cash vouchers. When Radar detects a fraudulent pattern on a transaction, that information becomes available to protect transactions across all payment methods. For example, if a fraudulent actor uses a stolen credit card at one business on Stripe, and we detect and block it, that same IP address and device fingerprint are now flagged across bank debits, wallets, and BNPL transactions network-wide. We found that Radar reduced suspected fraud by 71% during a five-month period for businesses using Affirm, Cash App, Klarna, and PayPal. 

**Improve your fraud decisioning with new multiprocessor signals**

Businesses use Radar’s risk signals for off-Stripe transactions to complement their in-house fraud models and make more precise fraud decisions across payment processors. Now, you can further improve your fraud decisioning with additional signals for off-Stripe transactions to help you prevent fraud before it happens. 

Stripe can now identify whether a payment is [likely to trigger an early fraud warning](https://docs.stripe.com/radar/multiprocessor#early-fraud-warning) from the card network. You can then choose to proactively refund the transaction and protect your dispute rate. 

Stripe can also predict whether a payment is [likely to result in a fraudulent dispute](https://docs.stripe.com/radar/multiprocessor#fraudulent-dispute). You can use this signal to issue refunds, gather evidence, or adjust your dispute strategy. 

We plan to add new signals that can be used across your entire payments stack.

**Access enterprise-grade custom fraud models**

For businesses with more complex risk profiles, Radar now offers [custom fraud models](https://docs.stripe.com/radar/custom-fraud-models). You can pass signals unique to your business to Stripe, such as product catalog data, loyalty status, behavioral metrics, or any structured metadata relevant to your risk profile. Stripe then combines this information with our global network data to deploy a model customized specifically to your business. For early adopters, custom models are detecting at least 15% more fraud with no increase in false positives.

## Defend against new types of fraud

 ![Blog > Expanding Stripe Radar > Image 2](https://images.stripeassets.com/fzn2n1nzq965/2sfsKO96ni64Sdg5qepMBF/fb60f99bba79aafb92da57fb093c2cab/abuse-prevention.jpg?w=1616&q=80)

Fraudulent actors have become as sophisticated at stealing compute as they are at stealing money. They abuse policies by cycling through free trials, setting up multiple accounts, or intentionally not paying their next invoice. As businesses scale AI products, token abuse has become an expensive fraud vector.

Last month, we shared how Radar addresses one of these fraud vectors with [free trial abuse prevention](https://stripe.com/blog/how-stripe-radar-helps-prevent-free-trial-abuse). At Sessions, we highlighted new ways to protect your business against multi-account abuse, pay-as-you-go fraud, and fraudulent bot-driven payments.

**Block multi-account abuse**

Multi-account abuse is when a single fraudulent actor creates several accounts to reuse promotional coupons or spread stolen card activity across multiple accounts to avoid detection for longer. Across the Stripe network, more than one in six sign-ups at AI companies are linked to multi-account abuse.

Now, Radar can [evaluate each new account in real time](https://docs.stripe.com/radar/multi-account-and-account-sharing-abuse#multi-account-abuse), so you can block suspicious accounts before abuse happens—on and off Stripe. Our solution draws on information from prior abuse across the entire Stripe network, including device fingerprints, IP addresses, email domains, and more. In the past two months, ElevenLabs has been able to block 2,000 users a day from abusing its free tier. 

**Predict pay-as-you-go abuse**

Pay-as-you-go abuse occurs when customers abuse your service by racking up usage costs with no intention of paying when the bill comes due. These bad actors exploit the structure of consumption-based pricing, where charges accumulate throughout a billing cycle, but payment happens later. For example, a customer could consume thousands of dollars of compute over the course of a month, get billed at the end, and never pay.

Radar now helps [predict nonpayment abuse as usage accumulates](https://docs.stripe.com/radar/pay-as-you-go-abuse), allowing you to intervene before a customer is billed. This allows you to require a top-up, cut off service, or take whatever action fits your risk tolerance.  

**Detect and prevent fraudulent bot-driven payments**

As agentic commerce scales, distinguishing between legitimate agents acting on behalf of customers and malicious bots becomes increasingly important. Both are nonhuman traffic making purchases, but one is a customer’s authorized agent, and the other might exploit your checkout to buy limited-availability inventory, abuse promotional pricing, or bypass purchase limits.

Radar now assigns a bot score to payments made on Stripe Checkout, evaluating the likelihood that [they were made by a malicious bot](https://docs.stripe.com/radar/bot-abuse). You can use this score to enforce anti-scripting or anti-bot policies. For example, you could block automated purchases of limited-edition items or flag high-velocity orders for review.

## Protect your platform from account fraud

 ![Blog > Expanding Stripe Radar > Image 3](https://images.stripeassets.com/fzn2n1nzq965/3bV7Fs3qcI87p6POew3EE/b882b289a83fa51915f2cb733b0e3175/platforms-2.jpg?w=1616&q=80)

Fraudulent actors are using generative AI to create fake identities, documents, and websites convincing enough to bypass many platforms’ verification systems. Platforms face a trade-off: request additional information during onboarding and increase friction, or keep the onboarding flow lightweight and take on potentially significant risk.

[Platforms can now mitigate risk](https://docs.stripe.com/radar/radar-for-platforms) across their business with Radar, featuring 0-to-100 fraud scores for every business and transaction; AI-powered insights that explain why accounts are flagged; note taking and account history to help your team understand account context; and account-level metrics for disputes, declines, refunds, and payments. 

We also introduced three new ways platforms can monitor and evaluate merchant risk—on and off Stripe.

-   The [fraudulent website](https://docs.stripe.com/radar/fraudulent-website) signal analyzes a business’s website the way a human fraud analyst would, looking for red flags like luxury items sold at unrealistically low prices, AI-generated copy, misspelled brand URLs, or other indicators that suggest the site is fraudulent. Platforms can use this signal during onboarding to automate verifications, flag accounts for manual review, or as an input to their own risk scoring before approving a business.
-   The [fraudulent merchant](https://docs.stripe.com/radar/fraudulent-merchant) signal identifies whether a new or existing account poses a fraud risk, based on analyzing patterns across the Stripe network, including bank account information, business details, transaction activity, and disputes. Platforms can then raise a review, pause payouts, pause payments, reject the account, set reserves, or request identity verification. 
-   The [merchant delinquency risk](https://docs.stripe.com/radar/merchant-delinquency-risk) signal predicts whether a business is at risk of accruing a negative balance; specifically, it predicts whether that balance is likely to remain negative for 60 days or more. Platforms can use this signal to decide whether to proactively adjust payout schedules, require reserves on high-risk accounts, or flag merchants for closer review before losses accumulate.

## Fight disputes more effectively with smarter evidence and automated evidence libraries

 ![Blog > Expanding Stripe Radar > Image 4](https://images.stripeassets.com/fzn2n1nzq965/5lLQFDCVkkzoSzjnTIBle2/179052cb73f6ef3ac5ef2dea028b87c4/disputes-2.jpg?w=1616&q=80)

[Smart Disputes](https://docs.stripe.com/disputes/smart-disputes), our AI-powered dispute management product, has always compiled and submitted evidence on your behalf. Now, Smart Disputes can develop a more customized strategy to improve your chances of winning each dispute. 

Smart Disputes analyzes each dispute and surfaces [AI-powered recommendations](https://docs.stripe.com/disputes/set-up-smart-disputes#provide-more-data-at-dispute-time) for specific evidence fields, such as tracking numbers or customer usage logs. Businesses that add our AI-recommended evidence through Smart Disputes are winning 3x more often than those that don’t add any evidence. 

We’re also reducing the manual effort involved in submitting evidence. Many disputes require the same supporting materials: terms and conditions, return policies, and service agreements. With the evidence library, you upload and store these documents once, and Smart Disputes automatically selects and includes them in your evidence packet based on the dispute’s reason code, network requirements, and cardholder claims—no manual resubmission needed. 

## What’s next

At Sessions, we also launched [our public roadmap](https://stripe.com/roadmap): an itemized list with hundreds of detailed entries through the first quarter of 2027, including [products, features, and improvements across Radar](https://stripe.com/roadmap?product=Radar). 

To learn more about how Radar can protect your business, join us in major global cities for [Stripe Tour 2026](https://stripetour.com/). You can also [read our docs](https://docs.stripe.com/radar) or [get in touch](https://stripe.com/contact/sales) with an expert from our team.