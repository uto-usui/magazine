---
title: "Analyzing the evidence that helps businesses win “product not received” disputes"
source: "https://stripe.com/blog/analyzing-the-evidence-that-helps-businesses-win-product-not-received-disputes"
publishedDate: "2026-07-21"
category: "engineering"
feedName: "Stripe Blog"
---

“[Product not received](https://docs.stripe.com/disputes/categories)” disputes—where a cardholder claims they didn’t receive what they paid for—are the most common nonfraud dispute category on Stripe. It can be challenging to know which claims are legitimate and which are not: some customers genuinely never received what they paid for, while others incorrectly claim they didn’t receive the order. 

To understand what can influence win rates, we analyzed evidence packets from one million disputes over a 16-week period. We compared win rates for packets that included various types of evidence—such as delivery confirmation or content consumption logs—against those that didn’t, isolating which features correlated with higher win rates. 

Here’s what the data shows for businesses broadly, what’s different for businesses selling digital goods, and what it means for how you mitigate disputes.

## **Businesses that submitted delivery information saw a 44 percentage point higher win rate**

 ![analyzing_evidence_blog_image1](https://images.stripeassets.com/fzn2n1nzq965/7ihb5fwe0ODULWqyhHXkTJ/f014010195849d5d0144a26279fc3a36/Percentage_point_increase_in_dispute_win_rate_for_physical_goods__by_evidence_type_2000x1000_px_2x.png?w=1620&q=80)

For businesses selling physical goods, disputes with delivery confirmation as evidence had a 27 percentage point higher win rate than disputes without it. Adding a GPS delivery map as evidence, which shows where the carrier scanned the package, lifted win rates by an additional 15 percentage points on top of delivery confirmation alone. And including a recipient signature as evidence added a further two percentage point lift. Together, disputes with delivery confirmation, a GPS map, and a signature had a 44 percentage point higher win rate than disputes without them.

Yet many businesses still don’t include delivery confirmation in their dispute responses. Part of this gap is awareness, but the bigger barrier is operational. For most businesses, shipping data and dispute workflows live in separate systems. Matching a specific dispute to the right order and confirmed delivery status often requires manual work and is hard to scale.

## Businesses that submitted evidence after the delivery was confirmed saw a 27 percentage point higher win rate

 ![analyzing_evidence_image2](https://images.stripeassets.com/fzn2n1nzq965/6WhyQF8Yqnwxf4SdeOYjmA/d6a066a47c16fa68e3b10733f7cb5fdd/Percentage_point_increase_in_dispute_win_rate_for_businesses_selling_physical_goods__by_evidence_timing_2000x1000_px_2x.png?w=1620&q=80)

Many businesses submit a shipping tracking ID as proof of delivery. However, depending on the status of the package at the time you submit the evidence, the tracking number might only confirm that the package left your facility. 

Our analysis found that win rates increased based on what the tracking ID showed when a business submitted it—specifically, whether delivery had been confirmed. Disputes with evidence submitted after delivery was confirmed had a 27 percentage point higher win rate than disputes with no delivery confirmation. On the other hand, disputes with evidence submitted when the package was still in transit had only a two percentage point higher win rate than disputes with no delivery confirmation. 

This suggests that the timing of your evidence submission matters. Customers might file a “product not received” dispute before an order arrives, especially if a shipment is delayed or still in transit. Because most businesses have 20 or more days to respond, consider holding your submission until the carrier confirms arrival if your dispute window allows it. If you do need to submit before delivery is confirmed, consider including documentation showing that the order is still within the delivery time frame the customer agreed to at checkout.

## Businesses that submitted digital activity and usage logs saw a 10 percentage point higher win rate

 ![analyzing_evidence_image3](https://images.stripeassets.com/fzn2n1nzq965/7ikaiWgzvYeHDs567Q71I5/6da3d10f1aeb1b3c83dfe86ad8fe88e9/Percentage_point_increase_in_dispute_win_rate_for_businesses_selling_digital_products__by_evidence_type2000x1000_px_2x.png?w=1620&q=80)

Businesses selling digital goods also need to provide proof of fulfillment, though the supporting evidence looks different. 

Disputes with digital activity and usage logs—such as JSON telemetry logs from common analytics platforms showing that a user streamed, downloaded, or accessed the specific product they purchased—had a 10 percentage point higher win rate than disputes without them. And disputes with service documentation, such as provisioning records, had an eight percentage point higher win rate than disputes without them. 

The pattern mirrors what we found with businesses selling physical goods: specificity is always better. Service documentation might only prove that a customer had access. On the other hand, content consumption logs might prove customers streamed, downloaded, or accessed the specific product they paid for.

## Businesses that included evidence of a refund issued through Stripe saw a 63 percentage point higher win rate

 ![analyzing_evidence_image4](https://images.stripeassets.com/fzn2n1nzq965/45zYDjmoJpQnQMHoWW4Fn0/fe03d918f10ea0ebed1404e0bdc7d77b/Percentage_point_increase_in_dispute_win_rate_for_businesses_selling_digital_goods__by_refund_type_2x.png?w=1620&q=80)

Cardholders can still initiate [a dispute even after a refund has been processed](https://support.stripe.com/questions/disputes-on-a-refunded-transaction-faq), often because the refund and dispute were filed around the same time or because the issuing bank didn’t check the refund status before filing the dispute. When this happens, many businesses include refund evidence in their dispute responses as proof they’ve already made the customer whole. But our analysis showed that the impact of “proof of refund” on win rates for businesses selling digital goods depended on how the refund was processed.

A full refund issued through Stripe was the strongest predictor of high win rates for businesses selling digital goods. Disputes that included this type of evidence had a 63 percentage point higher win rate than disputes that didn’t include it. On the other hand, disputes with refunds issued via other channels, such as store credit, saw only a six percentage point lift compared to disputes that didn’t include it. 

This might be because issuers can only act on information they can verify. When a refund is processed through your payment processor, the issuing bank can verify that credit on the card network. A refund issued outside of your payment processor can’t be verified in the same way by the issuer; there is no record.

## How Stripe can help

[Smart Disputes](https://docs.stripe.com/disputes/smart-disputes) is designed to apply these best practices for you, helping you save time and recover revenue. It uses AI to automatically assemble tailored evidence packets for eligible card disputes, applying the same data-backed best practices identified in this analysis, so you don’t have to manually implement them dispute by dispute.

You can increase your win rates by providing Smart Disputes with a shipping carrier and tracking number when you receive a dispute. Stripe supports more than 12 shipping providers and automatically works with them to pull the entire fulfillment history, such as delivery status, time stamps, and location data. You can also add any additional evidence, such as customer communications or supplementary documentation, and Stripe will merge it with the auto-generated packet to create the strongest possible response. 

Stripe then assembles that information into a compelling evidence packet for you, optimizing packet content and structure based on the specific dispute, down to the network, region, issuer, and reason code. If you don’t take any action before the dispute deadline, Smart Disputes submits the evidence on your behalf to ensure disputes are not lost due to missed deadlines. 

No additional integration is required if you already use Stripe. To learn more about Smart Disputes, [read our docs](https://docs.stripe.com/disputes/smart-disputes). 

_The insights, projections, and forward-looking statements contained here are for informational purposes only and should not be relied upon. These are based on assumptions and information currently available, but actual results may differ materially._