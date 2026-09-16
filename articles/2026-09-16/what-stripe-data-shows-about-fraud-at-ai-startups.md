---
title: "What Stripe data shows about fraud at AI startups"
source: "https://stripe.com/blog/what-stripe-data-shows-about-fraud-at-ai-startups"
publishedDate: "2026-09-15"
category: "engineering"
feedName: "Stripe Blog"
---

New Stripe data shows that fraudulent actors disproportionately target AI companies throughout the customer lifecycle. During sign-up, AI subscription companies saw a 40% increase in attempted multi-account abuse in a six-month period. And at the transaction stage, AI startups faced up to 4.3x higher attempted fraud rates than startups overall. 

AI founders have recently shared similar experiences on social media.

> We also get so much fraud. Very common across most self-serve AI founders I speak with. I vastly underestimated how much fraud and abuse there is on the internet. Stripe has been incredibly helpful at blocking it for us.

Here’s a closer look at what our data shows about attempted fraud and multi-account abuse rates at AI companies, and how [Stripe Radar](https://stripe.com/radar), our AI-powered fraud prevention product, can help businesses stay ahead of changing fraud patterns.  

## AI startups on Stripe saw up to 4.3x higher attempted transaction fraud rate than startups overall 

 ![blog > AI startups attempted fraud rate ](https://images.stripeassets.com/fzn2n1nzq965/63wN4sGUSoCk9FndbPcYsr/24e084a81239350fbc00dd8899cc040a/Attempted_fraud_rate.png?w=1620&q=80)

Attempted transaction fraud rates for startups on Stripe have stayed relatively flat over the past year—except for one industry. In Q3 2025, AI startups saw a 4.3x higher attempted transaction fraud rate compared to startups in aggregate on Stripe. By Q1 2026, AI startups’ attempted fraud rate on Stripe had decreased to 2.6x the rate of startups overall. This decline reflects how quickly AI companies and Radar adapted to emerging fraud patterns. As transaction fraud tactics become less likely to succeed, fraudulent actors shift their efforts to other forms of fraud, such as multi-account or free trial abuse.

AI startups offer compute that’s valuable and easy to resell, making them a particularly attractive target for fraud attacks. A fraudulent actor may use a stolen card to buy an AI subscription or a block of tokens, then sell that access on secondary markets or in regions where the product isn’t directly available. By the time the legitimate cardholder notices and disputes the charge, the resale is complete and the business absorbs the loss.

Because fraudulent actors rotate through stolen cards across businesses, this pattern can be difficult for any single company to detect on its own. Radar draws on signals across billions of transactions on the Stripe network to help identify fraudulent payments before a transaction is processed—including cards that have been used fraudulently at other businesses, even when they’re new to yours.

## Attempted multi-account abuse at AI subscription companies increased 40% in six months

AI companies are increasingly exposed to fraud before a transaction takes place. This requires them to assess the risk of a customer, not just a payment. For example, with [multi-account abuse](https://stripe.com/resources/more/how-to-detect-fake-users-and-multiaccount-sign-up-abuse), fraudulent actors create many accounts during sign-up to repeatedly claim free tokens, trials, and other new account benefits.

Multi-account abuse is one of the most common types of abuse we’re seeing across AI subscription companies on the Stripe network. In fact, our models identified a 40% increase in attempted multi-account abuse rates across all AI subscription companies from January 2026 to June 2026. 

 ![blog > multi-account abuse image](https://images.stripeassets.com/fzn2n1nzq965/66PYvSekY86y2trZqAOWdX/287b56723244b4907213c20f0daedb91/Visual_4__Slope_chart__Multi-account_abuse_among_AI_subscription_companies.png?w=1620&q=80)

We also looked at attempted multi-account abuse patterns among the most affected companies. As these businesses introduce more sophisticated controls, their rate of attempted abuse might be expected to decline. Instead, the AI subscription companies with the highest rates of attempted multi-account abuse saw a 154% increase in that same six-month time period, with some seeing over 600% increases. This suggests that the most attractive targets are becoming even more so—and that fraudulent actors are increasingly moving away from transaction fraud to other forms of abuse. 

Detecting this fraud earlier in the customer lifecycle, before a payment is processed, is now possible with [Radar’s abuse prevention features](https://stripe.com/radar/customer-abuse). By evaluating risk at registration and login, you can identify two distinct patterns: the multi-account signal flags a single fraudulent actor registering multiple accounts to exploit your service, while the account sharing signal identifies a single account being used simultaneously across multiple locations.

## How Stripe can help

We process billions of transactions across millions of businesses, which gives us visibility into comprehensive fraud patterns across all industries. Our scale enables us to detect and automatically block true fraud more accurately, helping reduce fraud losses. In a two-month time period, ElevenLabs was able to block 2,000 users a day from abusing its free tier with Radar’s multi-account abuse prevention. 

To learn more about how [Radar](https://stripe.com/radar) can help your business fight fraud, [contact us](https://stripe.com/contact/sales) or [sign up for an account](https://dashboard.stripe.com/register?redirect=radar).