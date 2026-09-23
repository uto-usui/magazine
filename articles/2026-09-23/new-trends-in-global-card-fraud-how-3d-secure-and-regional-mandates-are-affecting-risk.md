---
title: "New trends in global card fraud: How 3D Secure and regional mandates are affecting risk "
source: "https://stripe.com/blog/new-trends-in-global-card-fraud-how-3d-secure-and-regional-mandates-are-affecting-risk"
publishedDate: "2026-09-22"
category: "engineering"
feedName: "Stripe Blog"
---

Thirty-six percent of businesses on Stripe now have customers in more than one country, and the number of companies selling into more than 100 countries has quadrupled in five years. 

This growth can also come with additional risk. Expanding into more markets means operating in new fraud environments, where fraud patterns, cultural norms around authentication, and regulatory requirements vary by region. 

The differences can be substantial. In 2025, businesses in Latin America saw 160% higher card fraud rates compared to businesses in Europe, the Middle East, and Africa, and 151% higher than businesses in Asia Pacific. Managing that variability often involves separate risk strategies, with dedicated teams, for each market a business operates in.

We analyzed billions of transactions on Stripe from January 2022 to March 2026 to understand how card fraud patterns differ by region and country, what's driving those differences, and how businesses can respond. Here's what we found.

## As of Q1 2026, businesses in Asia Pacific had lower card fraud rates than businesses in Europe, the Middle East, and Africa for the first time

 ![blog > regional fraud trends > APAC ](https://images.stripeassets.com/fzn2n1nzq965/5kJHuXgR4JRw7oFrEzlqPN/2d6cd57a9cfe5b873a59884ff37b3c5e/9cc2df67-abbf-41ec-a50f-2f52b5e3a1a0.png?w=1620&q=80)

Of all the regions we analyzed, businesses in Asia Pacific saw the most consistent decline in card fraud rates from 2022 to 2025—and by 2026, had the lowest card fraud rate of any region on Stripe for the first time in our studied time frame. 

Markets across Asia Pacific have introduced [3D Secure (3DS) requirements](https://stripe.com/resources/more/3d-secure-101) for online card transactions, adding an extra security layer by verifying that the person making a purchase is the legitimate cardholder. The data suggests the mandates are working.

Take Malaysia, where businesses saw a 74% decrease in card fraud rates from 2022 to 2025—the biggest decrease across countries in the Asia Pacific region. Malaysia's central bank applies a relatively strict approach with its 3DS mandate. Financial institutions are required to implement multifactor authentication, migrate from SMS-based one-time passwords to secure app-based authorization, and let customers immediately freeze their account—all of which leave fewer opportunities for unauthenticated transactions to get through compared to other markets.

Businesses in Japan also saw consistently lower fraud rates each year from 2022 to 2025. This is, in part, thanks to Japan’s [April 2025 3DS mandate](https://support.stripe.com/questions/3ds-mandate-in-japan). [Our analysis](https://stripe.com/blog/3ds-trends-in-regulated-markets) of disputes shows that the mandate is working to reduce fraud: dispute rates—which correlate with fraud, as customers dispute charges once they identify unauthorized transactions—were more than 30% lower in 2025 than the same period in 2024.

## Card fraud rates for businesses in Europe have declined since 2022, though not uniformly

Card fraud rates for businesses in Europe have declined 21% from 2022 to 2025, though there is considerable variation among countries within the region. France and Great Britain—two of the larger European markets—have both seen consistent decreases in card fraud rates from 2022 through 2025, with France decreasing 40% and Great Britain decreasing 27%. 

 ![blog > regional fraud trends > Europe](https://images.stripeassets.com/fzn2n1nzq965/11tZyLoN7eMwaCL6ZX58GW/fac3ff13c9b192d51f67d1b446f32acc/Card_fraud_rates_for_businesses_in_France_and_Great_Britain__2022-2025.png?w=1620&q=80)

This reflects the maturity of the payments ecosystems in each market. [Strong Customer Authentication (SCA)](https://stripe.com/guides/strong-customer-authentication) regulation, which requires businesses to support two-factor authentication on their checkout page to reduce fraud, has given issuers the framework and time to invest in more sophisticated fraud infrastructure. In France, that maturity also has historical roots. France was one of the earliest adopters of chip-and-PIN authentication, normalizing two-factor authentication years before most other countries. French cardholders are familiar with the process and more likely to complete authentication flows successfully as a result, which can help lower fraud rates.

On the other hand, Iberia was the only named European region in which businesses’ card fraud rate increased every year from 2022 to 2025. Spain and Portugal rely more heavily on one-time passwords as temporary security codes for authentication than other European markets, which can be more susceptible to fraud than biometrics or app-based verification. Spain and Portugal are also both heavily targeted by “smishing” attacks, SMS phishing scams where fraudulent actors impersonate trusted institutions to steal card credentials. 

## Businesses in Latin America had up to 160% higher card fraud rates than other regions in 2025

Businesses in Latin America on Stripe have had the highest card fraud rates among the regions analyzed on Stripe since January 2022. The gap remained significant in 2025: card fraud rates for businesses in Latin America were 65% higher than businesses in North America; 151% higher than businesses in Asia Pacific; and 160% higher than businesses in Europe, the Middle East, and Africa. 

Some markets are improving. Businesses in Ecuador, Panama, and Brazil saw card fraud rates decrease from 2022 to 2025. But across the region, several structural factors keep overall rates elevated.

1.  Latin America is more of a cash-based economy than other regions, which might mean card-based fraud detection systems have less historical data to draw on.
2.  Dispute frameworks in Latin America create additional complexity for businesses. Card dispute rules can favor cardholders, placing the burden of proof on businesses when a charge is contested. 
3.  The region sees a lot of variability; standards and requirements in one country may not be the same in others, which creates more operational overhead. Most Latin American markets now mandate electronic invoicing, but scope, formats, and maturity differ. Mexico, for example, obliges digital service providers to give Mexico’s tax authority, SAT, permanent access to their transaction data. The tax authority logs in on its own schedule and queries individual transactions, which must be searchable within a day and retained for five years.

## How Stripe can help

To help businesses better manage fraud as they enter new markets, we recently expanded [Stripe Radar](https://stripe.com/radar), our AI-powered fraud prevention product, to protect [all supported payment volume globally](https://docs.stripe.com/radar/local-payment-methods). That expansion includes bank debits, stablecoin payments, digital wallets, real-time payments, and cash vouchers. 

Stripe can also help businesses in SCA regions reduce fraud and meet regulatory requirements through 3DS authentication. On average, businesses in SCA regions can benefit from a 1.20% uplift in conversion while reducing fraud on all transactions by 7.67% with [our AI-powered optimizations](https://stripe.com/payments/authentication). Businesses can [run 3DS authentication using Stripe](https://docs.stripe.com/payments/3d-secure/standalone-three-d-secure) while authorizing the payment with any payment processor and [intelligently trigger 3DS](https://docs.stripe.com/radar/risk-settings#authentication) to optimize for payments, fraud, or conversion use cases. 

To learn more about how [Radar](https://stripe.com/radar) can help your business prevent fraud as you expand into new countries, [contact us](https://stripe.com/contact/sales) or [sign up for an account](https://dashboard.stripe.com/register?redirect=radar).