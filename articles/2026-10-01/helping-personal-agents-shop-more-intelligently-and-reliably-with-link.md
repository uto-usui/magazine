---
title: "Helping personal agents shop more intelligently and reliably with Link "
source: "https://stripe.com/blog/helping-personal-agents-shop-more-intelligently-and-reliably-with-link"
publishedDate: "2026-09-29"
category: "engineering"
feedName: "Stripe Blog"
---

The most popular personal AI agents—such as Muse, Meta’s new personal agent; Grok Bot; and Instinct—now use [Link’s wallet for agents](https://link.com/agents) to power consumer spending. Consumers are embracing this new way to shop: over the past month, agentic purchases made with Link increased 38x.

As agents take on more purchases, agent builders have increasingly asked us to help agents navigate checkout and earn consumer trust. Today, we’re sharing three major improvements to support this broader set of needs. Link can now help agents complete more purchases with incremental authorization and guidance on how to overcome checkout obstacles; analyze consumer spending to make better product recommendations; and provide purchase protection if an agent makes a mistake.

## Help agents complete more purchases

Online checkout flows are complex, and agents do not always have all the information they need at the start of a purchase. The final price may change because of taxes, shipping, or other costs added later in the process. 

Link now supports [incremental authorization](https://docs.stripe.com/agentic-commerce/link-agent-wallet/use-link-wallet-pay-online#increase-the-amount), which lets agents request a higher approved amount when the final price exceeds the original. For example, a consumer might ask an agent to book a flight, then add a checked bag after approving the initial fare. With Link, the agent can update the approved amount to include the baggage fee instead of restarting the purchase and placing a second hold on the consumer’s card. This helps agents account for price changes and complete more purchases with less intervention. 

When an agent encounters additional payment obstacles, Link provides [specific guidance on how to proceed](https://docs.stripe.com/agentic-commerce/link-cli/use-link-wallet-pay-online#next-actions) to increase the chances of a successful payment. For example, Link can provide a URL that the agent can send to the consumer to complete a 3D Secure challenge. Or if the original payment method was declined, the agent can ask the consumer to choose another and create a new spend request.

## Enable agents to make better product recommendations

Agent builders can now use Link’s [financial insights](https://docs.stripe.com/financial-connections/agents/financial-insights) to help their agents analyze a consumer’s purchase history to make better product recommendations. With a consumer’s permission, an agent could identify the stores the person frequents, set an appropriate budget based on their spending habits, make informed product suggestions, and then complete an approved purchase—creating a more personalized shopping experience. For example, a consumer could ask an agent to buy new cleaning supplies, and the agent might suggest purchasing from Sudsy based on their purchase history.  

Powered by Financial Connections, Stripe’s open banking solution, Link gives agents consumer-permissioned access to transaction data from more than 12,000 financial institutions covering over 97% of US bank accounts. Consumers choose which bank and credit card accounts to share and can revoke access at any time.

## Protect purchases made by agents

When consumers ask an agent to make a purchase, they want to be confident that they’ll have recourse if the agent makes a mistake. 

Consumers may now be eligible to receive free [purchase protections](https://link.com/protections) when an agent uses Link to complete an eligible purchase on their behalf. For qualifying Link transactions, accidental damage, lost items, price drops after they buy, no-fee returns, and return guarantees are covered.

 ![blog > link innovation > purchase protections](https://images.stripeassets.com/fzn2n1nzq965/1JA2Ej0WJhUxtNK6MBtavK/7ef6e0f8742e1619bee2998624f79362/Purchase_protections_2.png?w=1620&q=80)

This allows agent developers to give consumers added safeguards at checkout without building their own protection program or managing claims.

Muse is the first AI agent to offer purchase protections through Link’s wallet for agents. We plan to make Link’s purchase protections available through more agents soon.

## What’s next

We plan to introduce spending controls that let consumers set an agent’s budget and allow the agent to complete a task on their behalf—without having to approve each individual transaction. For example, a consumer could give an agent a budget to buy a limited-release pair of shoes as soon as they go on sale at 1 a.m., without staying up to approve the purchase.

[Get started today](https://link.com/agents#get-started-section) with Link’s wallet for agents.