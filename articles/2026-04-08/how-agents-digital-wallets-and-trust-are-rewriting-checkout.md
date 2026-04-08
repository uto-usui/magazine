---
title: "How agents, digital wallets, and trust are rewriting checkout"
source: "https://stripe.com/blog/global-checkout-trends"
publishedDate: "2026-04-07"
category: "engineering"
feedName: "Stripe Blog"
---

Changes in the internet economy are prompting businesses to take a more tailored approach to checkout. On Stripe, 65% of transactions under $50 now happen on mobile, and shoppers are increasingly staying on their phones for higher-value purchases, too. Digital wallets cut average mobile checkout time in half, but wallet preferences vary widely by region and generation, shaping checkout design. Local payment methods are becoming a bigger driver of conversion, and offering the right one—or the right mix—can substantially improve performance. 

Checkout is also being redesigned for a new kind of buyer: agents. As customers grow more comfortable with AI-assisted purchases across a range of categories, businesses are rethinking how they manage risk and convert increasingly fragmented demand.

We analyzed checkout and payment activity from nearly 20,000 B2C businesses on the Stripe network from August 2023 through February 2026, and combined those insights with Stripe-commissioned surveys to understand the latest trends in consumer preferences. 

The [resulting report](https://stripe.com/lp/checkout-trends) examines how customer purchase behavior is changing, how those shifts are showing up in the checkout flow, and what they mean for businesses. 

A few takeaways stand out:

## 1\. Shoppers are increasingly making big-ticket purchases on mobile

Mobile already dominates smaller purchases, but the old habit of moving to desktop for bigger purchases is starting to fade. Stripe data shows shoppers are increasingly completing higher-value purchases on mobile, including purchases over $500. While that shift is most pronounced in APAC and EMEA—where mobile is the preferred checkout device—mobile in the US gained share across every purchase size we measured in the last two years. Canada is the outlier: shoppers there tend to switch to desktop in the $100–$249 price range, based on our data.

 ![Blog > Global checkout trends > Image 1](https://images.stripeassets.com/fzn2n1nzq965/3igONWE4MvqzIeK9ys5rZf/3ab077982a3c21ae38b178e257d97f73/Blog_image_-_4_2x.png?w=1616&q=80)

## 2\. As digital wallets spread globally, wallet preference is generational and regional

Digital wallets now account for about [30%](https://www.mckinsey.com/industries/financial-services/our-insights/global-payments-report) of global point-of-sale volume. In our global survey, 61% of shoppers said they would use a digital wallet. And in traditionally card-led markets like the US and Japan, they’re among the fastest-growing checkout methods. 

Here, we’re seeing a generational divide.

 ![Blog > Global checkout trends > Image 2](https://images.stripeassets.com/fzn2n1nzq965/3QofdDm51uKGFlZtFcWcsY/e5668665d7d1a605b61998f71c450aed/Blog_image_-_Dividers_-_18_2x__3_.png?w=1616&q=80)

That preference also extends across purchase sizes. In our survey, 50% of shoppers ages 18–29 said they use wallets for purchases under $25, and $33% said they use them for purchases over $250. A driving factor here is speed: Stripe data shows that using a digital wallet cuts average mobile checkout time in half.

 ![Blog > Global checkout trends > Image 3](https://images.stripeassets.com/fzn2n1nzq965/7wMica76t9XmP3vq6rsR6e/4e0c594a1bcd99061369d743e5c99603/Blog_image_-_Dividers_-_16_2x.png?w=1616&q=80)

But while wallets are becoming the default checkout layer across markets, the leading wallet still varies by region—from MB WAY in Portugal to MobilePay in Denmark to Alipay in China. Those regional differences shape how businesses design checkout. Supporting wallets is no longer enough on its own; checkout needs to reflect how people actually pay in each market. In some regions, adding Apple Pay, Google Pay, and [Link](https://stripe.com/payments/link) might cover most checkout volume. In others, a different wallet mix might do more to improve conversion.

## 3\. As global demand broadens, checkout expectations become more market-specific 

In a YouGov consumer survey commissioned by Stripe, 45% of respondents said they had made at least one international online purchase in the past year. However, global demand doesn’t automatically translate into conversion. Businesses need to localize checkout—but even localization strategy is market-specific. What customers expect from checkout differs by market.  

In some places, like Indonesia and Vietnam, payment preference is more fragmented. Consumer preferences are distributed across digital wallets, bank transfers, debit-linked apps, and other local payment methods. In these markets, localization means adapting the full checkout experience: payment method mix, currency, and the way options are presented. 

In other markets, preferences are more concentrated. There, conversion depends on centering a single, dominant payment method.

 ![Blog > Global checkout trends > Image 4](https://images.stripeassets.com/fzn2n1nzq965/6pKiXsiiC77AyXosRUfjVO/c12b97839cc8eae94ecbe0372519d99a/Blog_image_-_Dividers_-_05_2x.png?w=1616&q=80)

Shoppers notice when checkout feels unfamiliar, and missing relevant payment methods—or showing irrelevant ones—can hurt performance. Our experiments on the Stripe network found that showing just one payment method that’s not geographically relevant can reduce conversion rates by up to [15%](https://stripe.com/blog/stripe-ai-personalized-checkout-experiences). 

Supporting the leading method can have an outsized effect. For example, Stripe data shows that offering BLIK to customers in Poland increases checkout conversion by 46% on average, while offering Pix in Brazil increases conversion by 31% on average.

 ![Blog > Global checkout trends > Image 5](https://images.stripeassets.com/fzn2n1nzq965/s1LV3mFOITq4de37s1SAk/3f630885b368a088e4b8717db89bc4c5/Blog_image_-_Dividers_-_11_2x.png?w=1616&q=80)

## 4\. AI-assisted shopping and agents are starting to change the path to checkout

AI is reshaping checkout from both sides of the transaction. On the front end, shoppers are becoming more receptive to agent-assisted buying. In a survey conducted by Stripe and Visa of more than 3,500 consumers, a majority across markets said they’re open to AI agents helping them make purchasing decisions.

 ![Blog > Global checkout trends > Image 6](https://images.stripeassets.com/fzn2n1nzq965/5Wcl2FtE9Wsc0Hcd3o1S6O/620e695327db88eaefe1b166f4148340/Blog_image_-_Dividers_-_06_2x.png?w=1616&q=80)

On the back end, AI is also changing how payment performance is managed. As automated attacks such as [card testing](https://stripe.com/blog/how-stripe-radar-responded-to-a-new-wave-of-card-testing) become easier to scale, businesses often respond by tightening risk controls, which can inadvertently reject legitimate customers in the process. New payment models help balance that trade-off by evaluating more signals in real time, requesting authentication more selectively, and improving how payments are routed and retried. Stripe’s AI-driven interventions can reduce fraud by [30%](https://stripe.com/blog/stripe-ai-personalized-checkout-experiences) without lowering conversion, by decreasing false declines and issuer rejections.

 ![Blog > Global checkout trends > Image 7](https://images.stripeassets.com/fzn2n1nzq965/46M6Dfac9IVeyhD6f8JChK/f71c4a8a07bca8f58deec0501f96d0f2/Blog_image_-_Dividers_-_13_2x__1_.png?w=1616&q=80)

Together, these shifts are changing checkout from a simple payment step into the point where identity, intent, and authorization are verified. Product discovery and purchasing are increasingly happening inside AI interfaces, including general purpose assistants like Google Gemini and Microsoft Copilot, visual search tools such as OpenAI’s image-based shopping, and business-specific tools such as Stitch Fix Vision and Walmart’s Sparky AI shopping assistant. As a result, checkout now needs to recognize who is buying, confirm that the shopper or agent is authorized to complete the purchase, and make it easy to finish the transaction quickly.

[Download the full report](https://stripe.com/lp/checkout-trends) to see the data behind these shifts and what businesses are doing to adapt.