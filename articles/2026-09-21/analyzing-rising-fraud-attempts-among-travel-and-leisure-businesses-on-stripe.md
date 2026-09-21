---
title: "Analyzing rising fraud attempts among travel and leisure businesses on Stripe"
source: "https://stripe.com/blog/analyzing-rising-fraud-attempts-among-travel-and-leisure-businesses-on-stripe"
publishedDate: "2026-09-18"
category: "engineering"
feedName: "Stripe Blog"
---

 ![Blog > Analyzing rising fraud attempts among travel and leisure businesses on Stripe > Header image](https://images.stripeassets.com/fzn2n1nzq965/5BQyko7sqYN4gXE8NMc1F/982c0d3bf5cad640d1acbe9f9d0d7aff/Header_image_Specs__2000x1000px_2x.png?w=1620&q=80)

For travel and leisure businesses, combating fraud is a balancing act between speed and security. These businesses—which include not only hotels and travel booking platforms, but also museums, theme parks, and live-event venues—sell offerings that are time-sensitive, easily resold, and often purchased across borders. That makes fraudulent transactions hard to stop and losses hard to recover. 

At the same time, travelers booking last minute are rarely willing to wait. Travel and leisure businesses need to approve high-value bookings in seconds or risk losing legitimate customers to competitors. As a result, they have less room to add verification steps, even when fraud risk is high.

That’s giving bad actors an opening. Last year, Stripe data shows that fraud attempts against travel and leisure businesses hit a four-year high. We analyzed payment activity from more than 200,000 active travel and leisure businesses on Stripe to understand where fraud is rising, how effectively it’s being blocked, and what businesses can do in response.

 ![Blog > Analyzing rising fraud attempts among travel and leisure businesses on Stripe > Image 1](https://images.stripeassets.com/fzn2n1nzq965/a0qYmfv8rM4GHpEQerLcR/26d2052adabf244197ddfac0750a844c/Image1_2x-2.png?w=1620&q=80)

## Fraud attempts are rising in travel and leisure, but successful fraud is declining with Stripe Radar 

Among Stripe businesses in travel and leisure, fraud attempts rose sharply over the past three years. Scams continue to multiply, from [reservation hijacking](https://www.theguardian.com/money/2026/mar/15/travel-scam-airline-accounts-fake-refunds-iran-war-flight-disruption) to WhatsApp-veiled hotel impersonators. Bad actors are also going after travel businesses themselves—even phishing kits are now sold [as a service](https://www.wired.com/story/hundreds-of-hotels-caught-up-in-vacation-booking-scams/). And with AI making it easier to launch convincing scam campaigns and create synthetic identities at scale, fraud is becoming both more prolific and harder to detect. 

 ![Blog > Analyzing rising fraud attempts among travel and leisure businesses on Stripe > Image 2](https://images.stripeassets.com/fzn2n1nzq965/6EQhuYV33TzkaQ3ndVhTHG/824d182a8a3180524558802d22579c21/Image2_2x.png?w=1620&q=80)

Stripe [Radar](https://stripe.com/radar), our AI-powered fraud product, blocked the overwhelming majority of those attempts. Radar also became more effective over time: the share of attempted fraud that made it through to payment fell by more than two-thirds from 2023 to 2025. As a result, the vast majority of attempted fraud activity was intercepted before payment, while the rate of fraud identified after payment remained broadly stable. 

 ![Blog > Analyzing rising fraud attempts among travel and leisure businesses on Stripe > Image 3](https://images.stripeassets.com/fzn2n1nzq965/yeYOtsOzdNmINiELhtiBr/5e85733b1ff408ef11e6a5b9c3bde4f0/Image_3_2x.png?w=1620&q=80)

Trained on more than $1.9 trillion in transaction volume across millions of businesses, Radar blocked more than $3 billion in suspected fraudulent payment volume among travel and leisure merchants last year alone.

 ![Blog > Analyzing rising fraud attempts among travel and leisure businesses on Stripe > Image 4](https://images.stripeassets.com/fzn2n1nzq965/1jOB89zeqbJ5gpu0Tg8R7K/2493ae508e7e4e2752f5dc05ba169915/Image4_2x.png?w=1620&q=80)

## Regional fraud trends diverged across travel markets last year

Fraud attempt rates rose across most regions last year for travel and leisure businesses on Stripe. Those in APAC saw the biggest year-over-year increase, followed by EMEA, with both rates up more than fivefold from 2024. The fraud attempt rate also rose 37% year over year among LATAM businesses. North American businesses were the exception, with the fraud attempt rate declining from 2024 to 2025.

Travel is growing fastest in regions where mobile-first and cross-border bookings are also becoming more common, giving fraudulent actors more ways in. In North America, slower travel growth and more established fraud controls may be keeping attempted fraud at bay.

 ![Blog > Analyzing rising fraud attempts among travel and leisure businesses on Stripe > Image 5](https://images.stripeassets.com/fzn2n1nzq965/3d0Kw0J5tiWrzSMWF40loE/82f51bf271a0847b5161e542eaf3c371/Image5_2x.png?w=1620&q=80)

For travel and leisure businesses operating globally, a fraud control that works in one market may not work in another. Breaking out fraud attempts, successful fraud, disputes, acceptance rates, and false declines by region and payment method can help businesses pinpoint what’s driving risk in each market, whether that’s card testing, stolen-card bookings, account takeovers, or post-trip chargeback abuse. 

Targeted fraud controls can reduce losses without adding the same checks to every booking. For example, [Oasis Hotels](https://stripe.com/customers/oasis-hotels), which serves international guests in Mexico, used Radar to apply additional authentication to bookings where the name on the reservation did not match the name on the card. Within six months, its fraudulent dispute rate fell by 90%.

Likewise, [SiteMinder](https://stripe.com/customers/siteminder), a hotel commerce platform serving properties in 150 countries, implemented Radar to strengthen fraud screening across the payments it processes for hotel partners. Fraudulent payment volume fell 61%, and fraudulent bookings dropped 27%.

## Where travel fraud is happening now

Among travel and leisure businesses, fraud often shows up in four areas: bookings, extras and travel credits, promotions and new account offers, and post-trip disputes. 

Bookings remain a primary target. Stolen cards are often used by a person who is not the cardholder to book last-minute or high-value reservations. The traveler can then present an ID that matches the name on the ticket or booking, even though the cardholder didn’t authorize the purchase. If the booking has been confirmed, the bad actor often uses the flight, hotel stay, or rental car before fraud is detected, making the loss harder for businesses to recover. Stolen payment details are also sometimes used to buy extras around the booking, including seat upgrades, baggage credits, and lounge access. Because these purchases are usually smaller than the main booking, they’re less likely to trigger review.

Promotions create another common opening for abuse. Bad actors can use bots to create multiple accounts and email addresses, repeatedly claim sign-up discounts or referral offers, and then use those discounts to book travel at a lower price, either for personal use or resale. To prevent this type of abuse, businesses need to be able to identify suspicious behavior when accounts are created and block promotion redemptions at checkout. 

Radar can use login-related signals to identify possible multi-account abuse and flag accounts for additional verification or review. It can also help detect fraud patterns associated with unusual account activity and suspicious payment behavior at checkout. [Stripe Identity](https://stripe.com/identity) can add an extra verification step before high-risk actions, while [3D Secure](https://stripe.com/resources/more/3d-secure-101) can help protect payment methods used for those purchases.

Fraud can also happen after the trip is complete. A customer might stay in a hotel or take a flight, then dispute the charge as fraudulent in an attempt to get a refund. Keeping clear records of bookings, customer approval, service delivery, cancellation terms, and any refund issued can make it easier for travel businesses to respond. [Smart Disputes](https://stripe.com/payments/dispute-management), available for card disputes, can help businesses assemble and submit the most relevant evidence, though the final decision ultimately rests with the card issuer.

Travel fraud becomes much more expensive when it gets past checkout. Once a booking is paid for, the business can end up dealing with both the original financial loss, as well as the follow-up work across fraud, support, and disputes. Early detection gives businesses more time to stop suspicious bookings before they become losses or disputes. 

Learn more about how AI is changing the [fight against fraud](https://stripe.com/sessions/2026/how-ai-changes-the), or [get in touch](https://stripe.com/contact/sales) to see how Radar can help protect travel revenue.