---
title: "New features to help SaaS platforms manage risk and stay compliant "
source: "https://stripe.com/blog/new-features-to-help-saas-platforms-manage-risk-and-stay-compliant"
publishedDate: "2025-12-02"
category: "engineering"
feedName: "Stripe Blog"
---

Platforms tell us that managing risk and compliance often feels like choosing between speed and safety. You need to onboard businesses quickly so they can start using your product, but you also need to screen thoroughly for fraud. You want to expand globally, but each new market brings complex verification requirements. One misstep—whether it’s a fraudulent merchant, missed risk signals, or inadequate compliance—can result in millions of dollars lost or foregone.

Stripe has been steadily building solutions to help you manage this balance for years, and the work continues. We recently launched three new features that give you more control to fine-tune your risk and compliance strategy, allowing you to use more of Stripe’s data to inform your approach. Here’s what’s new.

## Set reserves on user funds with Radar for platforms 

 ![Blog > compliance launches > Reserves image](https://images.stripeassets.com/fzn2n1nzq965/4PyD6mj8kA30LuhbQ00zM/6f7ac34eaa6df47e9714aa38c2670767/reserves-final.png?w=1620&q=80)

Platforms such as FreshBooks, Shopify, and Jobber use [Radar for platforms](https://docs.stripe.com/radar/radar-for-platforms) to prevent, detect, and mitigate fraud and insolvency risk. With AI-powered risk scores trained on over $1.4 trillion in payments volume, a custom rules engine, and powerful actions to restrict fraudulent transactions and suspicious businesses, Radar for platforms allows you to use more of Stripe’s data to mitigate financial risk.

Now we’re going further. Radar for platforms allows you to safeguard your business against potential losses by [setting temporary reserves](https://docs.stripe.com/connect/connected-account-reserves) on user funds, either programmatically or via the Stripe Dashboard. You can customize how you place reserves to best mitigate risk for your business, choosing between fixed amounts or rolling reserves. 

For example, you can write a rule to detect businesses with elevated risk scores then set ongoing reserves on those accounts, so you’re automatically protected if they experience a sudden spike in disputes. Or, if a business processes a large transaction with an unusually long delivery time, you could create a hold to reserve funds from that transaction and release them when the return window closes.

## Access new risk and compliance controls for trusted platforms

 ![blog > compliance roundup > verified ](https://images.stripeassets.com/fzn2n1nzq965/hwakbdGkP7WXG47FtRs7W/87a5b2f4ef4a4f0cda0d8923498aa17d/Verified-platforms.png?w=1620&q=80)

Programmatically blocking bad actors with Radar for platforms is extremely effective, but you know your users best—and sometimes you need to be able to personalize risk thresholds based on that context.

[Stripe Verified for platforms](https://docs.stripe.com/verified/verified-for-platforms) does exactly that by giving trusted platforms on Stripe specialized controls to customize our risk and compliance systems. Verified platforms can now extend due dates for eligible risk and compliance tasks their users encounter—directly from the Stripe Dashboard. This gives businesses more time to complete important requests and minimize potential disruptions.

Verified platforms can also access benefits customized to their unique business model or industry. For example, we can offer platforms for property managers higher ACH limits, because we know that’s what landlords use to collect rent. This ensures that these platforms are able to smoothly process ACH payments during peak times, such as the first of the month, minimizing unnecessary failed transactions for their users.

## Customize the information you collect during onboarding with our updated embedded component

 ![image](https://images.stripeassets.com/fzn2n1nzq965/6IZ9JVey7ESYI0SUGv3ztO/23ae3906abf53d8166c4df279c3b092c/account-onboarding-2.png?w=1620&q=80)

Global onboarding and verification workflows require significant engineering resources, as requirements vary by region and change with new regulations. This complexity can prevent platforms from capturing millions in potential international revenue.

You can now use our no-code [account onboarding component](https://docs.stripe.com/connect/supported-embedded-components/account-onboarding) to configure [exactly what information you collect](https://docs.stripe.com/connect/supported-embedded-components/account-onboarding?platform=web#requirements-collection-options) during onboarding. This flexibility allows you to create targeted onboarding and remediation workflows for complex requirements, such as proof of liveness in Singapore or document uploads in Canada. It also decreases time investment for engineering by 90%, reducing implementation work from a typical 40 weeks to fewer than 4, as these components automatically update.

## What’s next

We will continue expanding our risk signals beyond fraud, giving you greater insight into the financial exposure attributed to businesses on your platform. We plan to expand access to Verified for additional trusted platforms on Stripe, and give you more controls to customize the information you collect from your users during onboarding. 

[Contact us](https://stripe.com/contact/sales) if you want to learn more about our risk and compliance solutions.