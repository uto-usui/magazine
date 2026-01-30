---
title: "Analyzing how SaaS platforms are shipping payments and finance products in days"
source: "https://stripe.com/blog/analyzing-how-saas-platforms-are-shipping-payments-and-finance-products-in-days"
publishedDate: "2025-12-04"
category: "engineering"
feedName: "Stripe Blog"
---

Last year, we introduced [Stripe Connect embedded components](https://stripe.com/blog/platforms-can-now-white-label-payment-workflows-in-record-time): prebuilt, production-ready UI modules that platforms can drop in with minimal code. The interfaces provide platforms with plug-and-play payments and finance workflows, from onboarding customers and supporting localized payment methods to helping users manage disputes and receive payouts.

Active users of embedded components more than tripled in the past year, including among platforms such as Squarespace, DoorDash, and FreshBooks. To guide what we build next, we examined real usage data for SaaS platforms across sectors and industries.

That analysis revealed surprising patterns about how different platform types approach payments integration, how they’re customizing their workflows, and where they’re getting the most value. 

## **Large platforms are 3x more likely than startup platforms to adopt embedded components** 

We initially introduced embedded components to meet the needs of startup platforms, which often face pressure to build payments and finance features quickly despite limited resources. But while startup platforms represent the majority of embedded components users, we found that large platforms (those with more than 1,000 employees or over $1 billion in revenue) are nearly 3 times more likely to adopt embedded components on a per-platform basis. 

They’re also integrating more broadly: larger platforms use a median of three embedded components, compared to two for startup platforms.

 ![Blog > Analyzing how SaaS platforms are shipping payments and finance products in days > Image 1](https://images.stripeassets.com/fzn2n1nzq965/65XL07QxobuwP3N6nMPx2z/500296eeb8334fc0154623f200abf5a7/Graphic-1.png?w=1616&q=80)

SaaS platforms tell us the reason for adoption is complexity at scale. As businesses expand internationally, compliance and localization requirements compound. With embedded components, platforms can manage that complexity without needing to take on custom builds. 

[FreshBooks](https://stripe.com/customers/freshbooks), for example, uses the account onboarding component to onboard customers in more than 160 countries. The UI automatically adjusts to each user’s country and language, minimizing the need for localized flows or regional compliance work.  

Large platforms also tell us they need to continuously ship new features to stay competitive. The auto repair platform [Tekmetric](https://stripe.com/customers/tekmetric), which serves more than 12,000 auto shops nationwide, began offering Stripe Capital financing through embedded components immediately after updating its Connect implementation earlier this year. And the creator platform [Kajabi](https://stripe.com/customers/kajabi-and-xero), which powers more than 100,000 businesses, used embedded components to launch a Xero accounting integration in 6 weeks instead of the typical 6 to 12 months. 

## **Platforms serving in-person industries lead embedded component adoption**

When we introduced embedded components in 2024, we anticipated that platforms serving primarily online businesses would be the main users. Instead, adoption is strongest among platforms serving largely in-person businesses. Platforms serving sectors such as automotive repair implement embedded components at more than twice the median rate.

 ![Blog > Analyzing how SaaS platforms are shipping payments and finance products in days > Image 2](https://images.stripeassets.com/fzn2n1nzq965/4xh0FAONRKuCmjLx9jxm5k/caf97a6c5ddabd5d100d6cd09c3df9b0/Graphic-2.png?w=1616&q=80)

Brick-and-mortar businesses face unique challenges: they tend to have lower margins and higher operating expenses than online-only businesses. Many are also newer to accepting online payments and need easy-to-use solutions. Embedded components allow platforms serving these businesses to offer streamlined payments experiences by integrating workflows directly into their own dashboards. And because these components are optimized by Stripe data from millions of businesses, platforms can deliver robust user experiences that would be difficult to build independently. 

In addition, embedded components enable platforms to speed up onboarding, a boon in industries where that process is notoriously slow. The barbershop booking app [theCut](https://stripe.com/customers/thecut), for example, uses embedded onboarding components to help businesses accept both in-person and online payments quickly. The hospitality platform [Cloudbeds](https://stripe.com/customers/cloudbeds) was able to cut the time it takes to bring hotels live from weeks to hours using the onboarding component.

Platforms serving in-person industries are also more likely to offer feature-rich components that are particularly valuable for cash-strapped merchants—not just [payments](https://docs.stripe.com/connect/supported-embedded-components), but advanced capabilities such as extending financing to their customers through Stripe Capital. [Jobber](https://stripe.com/customers/jobber), the software platform for home services businesses, saw a 100% increase in Capital originations after implementation. 

## **71% of platforms customize embedded components for brand consistency**

A consistent visual language builds trust, especially when users are handling payments, identity verification, and other sensitive workflows. Embedded components are giving platforms that continuity and control. 

Most platforms are using embedded components to reinforce their brand identity. Across all implementations, 71% use Stripe’s theming features to align components with their own design systems—from notification banners to user dashboards.

 ![Blog > Analyzing how SaaS platforms are shipping payments and finance products in days > Image 3](https://images.stripeassets.com/fzn2n1nzq965/5DJ7x0cRNpz9ltpq82OLXN/72748ed5c8484c41ab5b74d85fea3866/Graphic-3-2x.png?w=1616&q=80)

The majority of platforms also apply brand-specific color palettes, rather than relying on defaults.

 ![Blog > Analyzing how SaaS platforms are shipping payments and finance products in days > Image 4](https://images.stripeassets.com/fzn2n1nzq965/5zLsWETs9xe9oQc7LzXhZE/d14860d481c6de9457646eb98eb8073f/Graphic-4.png?w=1616&q=80)

If your business is an established brand, new payments capabilities can be easily integrated into your existing visual identity.

## **Expanding embedded components offerings**

Based on the traction we’re seeing with embedded components and feedback from users, we’re continuing to expand the library. Recent additions include: 

-   Platforms can boost user engagement and generate new revenue streams by promoting financial products such as [Instant Payouts](https://docs.stripe.com/connect/supported-embedded-components/instant-payouts-promotion) and [Capital](https://docs.stripe.com/connect/supported-embedded-components/capital-financing-promotion) directly within their dashboards. 
-   With the [disputes embedded components](https://docs.stripe.com/connect/supported-embedded-components/disputes-for-a-payment), platforms can give their users agency to manage their own payment disputes, reducing operational workload.

For a full list of embedded components available, check out our [docs](https://docs.stripe.com/connect/supported-embedded-components), explore this [interactive demo](https://www.furever.dev/), or [get in touch](https://stripe.com/contact/sales).