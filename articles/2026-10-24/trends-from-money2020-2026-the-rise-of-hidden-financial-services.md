---
title: "Trends from Money20/20 2026: The rise of “hidden” financial services "
source: "https://stripe.com/blog/trends-from-money20-20-2026-the-rise-of-hidden-financial-services"
publishedDate: "2026-10-22"
category: "engineering"
feedName: "Stripe Blog"
---

 ![blog > money2020 > header image](https://images.stripeassets.com/fzn2n1nzq965/6bfsudwMkweyDUuwPDxlds/2b4fef07fbd8b3bf876f679bc738b688/image_2eader_image__runs_at_the_top_of_the_post__after_the_title_and_before_the_body_copy_._Specs__2000x1000px__2_.png?w=1620&q=80)

Onstage at Money20/20 USA this week, Airtm Chief Product Officer Arshi Singh made the case that financial infrastructure works best when customers don’t have to think about it. “If we expect our user to understand the stablecoin infrastructure, then we are not doing our job right,” she said.

Speakers from Robinhood, Citi Treasury and Trade Solutions, the Solana Foundation, and other companies reinforced that idea throughout the event, which brought more than 11,000 payments, fintech, and business leaders to Las Vegas. Customers need access to useful financial products without requiring them to understand—or manage—the infrastructure underneath. That can mean using a stablecoin wallet inside a familiar application, setting clear limits on what an AI agent can buy, or accessing financial services outside banking hours.

Making those products easy to use requires enterprises and fintechs to use the right infrastructure behind the scenes. Three trends at Money20/20 showed what that looks like.

## The next 100 million stablecoin users might never download a crypto wallet

Stablecoin adoption might not depend on persuading consumers to download a crypto product. Instead, businesses are embedding stablecoin wallets into the mobile apps, websites, and other products people already use. In most cases, users won’t need to understand the infrastructure underneath. 

Amira Valliani, head of payments growth at the Solana Foundation, described two emerging models: dedicated crypto wallets that give users access to a wide range of assets, and “hidden” or white-labeled wallets embedded inside another product. These hidden wallets might support stablecoin payouts, for example, without presenting users with an explicitly crypto-branded experience.

“I don’t know about a single feature that will bring on 100 million users,” said Valliani. “But I do think what’s going to happen is we’re going to have a few killer integrations that bring on the next 100 million users.”

A mobile-device manufacturer, for example, could add [stablecoin-powered](https://news.samsung.com/us/samsung-wallet-bring-stablecoin-access-eligible-galaxy-users-us/) international money transfers to the wallet app already available on its phones, rather than ask customers to adopt a separate financial app. This can help make an existing product more useful, increase engagement, and add financial capabilities without becoming a traditional bank.

As stablecoin wallet functionality becomes more integrated throughout the existing financial ecosystem, consumers increasingly associate the experience with the application they use, rather than the infrastructure behind it. "I think crypto basically just fades into the background,” said Nitesh Nath, founder and CEO of DFlow. “\[The wallet and application\] become the same thing.”

Companies that simplify the underlying complexity can have an advantage. Customers want to be able to sign up quickly, access funds right away, and complete transactions without learning the language of crypto. By building these capabilities into familiar products, fintechs can reach new users without requiring them to adopt a separate crypto product—or even know that a stablecoin wallet is involved.

## Always-on money is creating new financial products

Around-the-clock settlement with stablecoins allows fintechs and financial institutions to design credit, investment, treasury, and earnings products that respond to demand in real time, including outside traditional banking hours.

Citi Treasury and Trade Solutions offered its vision for helping institutional clients fund activity across markets with different operating calendars. Ryan Rugg, global head of digital assets for Citi Treasury and Trade Solutions, described a broker-dealer that wanted to buy US equities during Chinese New Year, when banks in Singapore were closed for the holiday. Traditionally, the company would have had to forecast its needs and send money to the US in advance. With tokenized deposits, it could move the funds when they were needed.

Always-on payment rails can also support new lending models. Valinor Digital used stablecoins to create a financing facility that lets prediction-market businesses access capital in real time, including overnight and on weekends. 

“The economy doesn’t shut just as the banks do,” said Valinor Digital Cofounder and CBO Lily Yarborough. The facility gave borrowers access to capital when demand arose, while giving lenders an opportunity that would have been difficult to serve on a traditional banking schedule.

Consumer fintechs are using the same infrastructure in different ways. Robinhood used on-chain lending markets to let customers earn potentially higher returns on their stablecoins than through its traditional cash product. Airtm uses stablecoins to help digital workers outside the US and Europe receive earnings from companies in those markets, then connects those funds to local options for saving, spending, and withdrawing. 

This 24/7 money movement can reduce the need to forecast and prefund accounts, align financing with real-time demand, and make financial services available across more hours and markets. This helps financial products to operate on the schedules of the businesses and people they serve.

## Agentic payments require machine-readable consumer intent

A payment credential can show that an agent has access to a consumer’s funds, but it can’t show what the consumer authorized the agent to purchase. Businesses need a structured record of the consumer’s instructions, such as what the agent can buy, how much it can spend, and when the permission expires.

However, natural language instructions leave room for interpretation. For example, a consumer might request a cheap pair of headphones that will arrive quickly.  The agent still has to define “cheap,” “quickly,” and even “headphones.” The agent might make a reasonable inference from the customer’s spending history and still complete a purchase the customer did not intend.

Rather than asking consumers to manage the payment mechanics themselves, payment providers are building those boundaries into the transaction. Shirley Zhou, product lead for Link at Stripe, described a process in which an agent submits a spend request specifying the amount, seller, and purpose of a proposed purchase. The buyer can approve the request before the agent completes the purchase, with the spend request information also informing fraud models. [Link’s wallet for agents](https://link.com/agents) also offers free [purchase protections](https://link.com/protections) when an agent uses Link to complete an eligible purchase on their behalf. For qualifying Link transactions, accidental damage, lost items, price drops after they buy, no-fee returns, and return guarantees are covered. 

Other financial companies are developing ways to carry consumer intent through the agentic transaction. American Express, for example, described a model where the issuer receives the customer’s purchase instructions earlier in the transaction lifecycle and can set controls based on what the customer asked for. Permissions for longer-running tasks may also need to remain visible, adjustable, and revocable. A buyer could authorize several purchases within a set budget, ask an agent to monitor an item for a price drop, or allow it to act until a specified date.

The financial infrastructure for these agentic payments remains largely out of sight, while the consumer retains control over the decisions that matter.

## How Stripe can help

Customers increasingly want products that help them make better use of their money. Delivering those experiences means connecting [traditional and stablecoin rails](https://go.stripe.global/rs/072-MDK-283/images/Guide_Why_fintechs_are_using_both_stablecoins_and_traditional_payment_rails.pdf), preserving customer preferences across agentic channels, and maintaining trust as AI takes on more responsibilities tied to personal finance. 

Stripe brings these capabilities together in one stack. Businesses can embed wallets, issue cards, enable payments, and move money between fiat and [stablecoins](https://stripe.com/use-cases/crypto) without exposing users to the underlying complexity. 

Stripe also supports OUSD, [Open Standard's](https://joinopenstandard.com/) recently launched stablecoin for global money movement and settlement across payment networks. With more than [$800 million](https://reserves.bridge.xyz/ousd) in circulation, OUSD allows businesses to receive, hold, send, and spend funds with [Stripe Treasury](https://stripe.com/treasury); build and operate a global card program with [Stripe Issuing](https://stripe.com/issuing); and pay recipients worldwide with [Stripe Global Payouts](https://stripe.com/payouts). 

Stripe’s [agentic commerce solution](https://stripe.com/use-cases/agentic-commerce) can also help businesses make payments available to agents while preserving details they’ve spent years honing, like authorization, fraud controls, and branded checkout.

To learn how Stripe can support your stablecoin or agentic commerce strategy, [contact us](https://stripe.com/contact/sales).