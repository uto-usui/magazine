---
title: "The “alien” economics of AI monetization"
source: "https://stripe.com/blog/economics-of-ai-monetization"
publishedDate: "2026-10-13"
category: "engineering"
feedName: "Stripe Blog"
---

Two-thirds of the companies on the Forbes AI 50 list now use some form of usage-based pricing, reflecting AI’s variable costs and unpredictable demand. At the second annual Monetize conference last month, Metronome CEO and Cofounder Scott Woody put it more bluntly: today’s leading companies operate in ways that would seem [“alien”](https://youtu.be/r2DgVruHZg0) to traditional SaaS businesses. These companies are iterating much faster on pricing, prioritizing market share over ARR, and pursuing multiple go-to-market strategies at once.

More than 300 leaders from fast-moving companies like [Replit](https://stripe.com/customers/replit), [Fin](https://stripe.com/customers/intercom), [Snowflake](https://stripe.com/customers/snowflake-proserv), and Clay came together at Monetize to trade notes on pricing, cost management, and scaling AI products as customer expectations change. Across sessions, five approaches for how companies are now approaching the economics of AI monetization came up repeatedly.

## **Hybrid pricing: Packaging usage with subscriptions and credits** 

A year ago, it was common to expect usage-based pricing to displace subscriptions. Businesses are still using them, just in a new way. We’re seeing more companies using subscriptions to package up variable usage, often through credits.

Aisling O’Reilly, Fin’s director of product for monetization, described the evolution of her own company’s pricing models. The company evolved from a platform subscription to a hybrid model, introducing outcome-based pricing when it launched Fin AI Agent. Initially, customers paid for each support conversation resolved by the agent. As the product expanded into actions like recommending products, qualifying leads, and booking meetings, its original (and only) billable metric became an insufficient representation of customer value. Fin introduced additional billable outcomes, letting customers choose the outcome they wanted from each conversation type and pay based on its value. Customers can commit to a pool of credits, then draw down against that pool across outcomes without having to forecast each one separately.

What’s emerging for Fin and many other companies is a layered model, with subscriptions for actions and predictability, usage-based pricing for agentic work, and credits to simplify multiple usage or outcome units.

## **Predictability is becoming a product feature**

One of the biggest challenges with usage-based billing is giving customers more predictable costs. They need to understand what drives usage, anticipate spend, set spend limits, and connect usage to value. Many companies have addressed those requirements through in-product dashboards, predictions, and other types of tooling.

Snowflake Senior Director Ryan Campbell explained how he and his team help customers monitor and control their consumption through in-product tooling like forecasting, calculators, scenario builders, and usage visibility. Similarly, Stripe’s Head of Global Pricing and Commercialization, Sam Lee, described the usage control pane, where users can see alerts, set and adjust spending controls, and manage consumption, as a new standard.

Commercial terms can also offer more predictability while keeping charges tied to usage. Annual usage buckets, discounted overages, and first-year fixed contracts with follow-on true-ups all offer customers clearer controls to manage variable bills.

As bills become more unpredictable, strong usage controls become part of what customers are paying for. Those controls help build trust in both the company and the product.

## **Falling AI costs and rising usage call for flexible packaging** 

With advances in AI, companies are able to package the same product in different ways. Subscriptions can house lower-cost and rate-limited experiences, while usage-based billing can be used for more resource-intensive agent work. Replit uses both as model costs and agent workloads shift, said Michele Catasta, the company’s president and head of AI.

When Replit’s agents used to run for just a few minutes, the company charged 25¢ per agent checkpoint. But as runtimes grew, some jobs cost Replit several dollars while users still paid just 25¢. The company adopted usage-based billing to close the gap, aligning prices more closely with the amount of work performed by its agents. 

This move solved one problem and introduced another: unpredictable spending and abrupt paywalls for users accustomed to a straightforward monthly subscription. As inference costs fell—due in part to increasingly capable open-source models and the pressure they put on frontier-model prices—Replit introduced a rate-limited Free Mode. This gives users the ability to keep building on a simple subscription. The company changes elements of its pricing several times a month, passing savings on to customers.

This opens up more flexible packaging beyond the one-product, one-pricing-model approach. Companies can combine subscriptions and usage-based billing, then adjust the mix as the underlying economics shift. That lets them offer versions of the same product at different speeds, prices, and service levels. 

## **Finance’s new mandate: Proving AI value**

While tokens might determine a company’s costs, it’s rare that they [represent the value](https://stripe.com/blog/where-pricing-is-headed) customers think they’re buying. In a session on how finance teams can measure AI’s value, Karan Parekh, Clay’s head of finance, said the company doesn’t want to be in the business of “upcharging and taxing tokens.” When pricing, Clay treats model tokens and third-party data as pass-through inputs, separate from the differentiated value its product provides.

Clay applies the same approach to evaluate its own internal AI investments. The sales team tracks productivity, the product team focuses on development time, and support teams measure throughput and customer satisfaction. Parekh’s team is comfortable with its own AI spending growing faster than revenue only if it’s producing something distinctive Clay couldn’t otherwise achieve. 

Attribution is difficult when multiple tools and workflow changes contribute to the same result, making token-level ROI calculations misleading. Clay’s solution is to measure AI tooling against those function-specific targets, reviewing them quarterly to track whether those AI investments prove out. For finance teams, operational outcomes are a more useful lens than focusing on input costs.

## **Pricing information needs to be readable by both machines and humans**

Agents are already influencing how products are discovered and evaluated, even if autonomous enterprise purchasing has yet to fully emerge.

To understand how buyers might encounter pricing in AI-generated answers, Kyle Poyar, founder of Growth Unhinged, tested how six AI engines presented pricing information for companies on the Cloud 100. He analyzed 7,600 AI-generated responses. For one unnamed company, negative pricing language appeared in 88% of responses. Without accessible pricing for this organization, LLMs resorted to scouring informal sources like Reddit and reported back prices ranging from $100–$2,400 per user, per month, a 24x difference. 

Pricing information might be fully visible to humans who visit your site, but if it’s blocked from crawlers or rendered in a way agents can’t reliably interpret, it’s basically invisible. While autonomous enterprise procurement is still early, pricing now has two different audiences to serve. The person accountable for the purchase is still in the picture, but they’ve made room for the machine helping them evaluate the purchase. 

## **AI monetization is becoming an adaptive system**

AI products, model economics, and usage patterns are changing far too quickly for pricing to stay static. Across sessions, leaders described identifying what customers value, giving them more control over spending, and adjusting pricing and packaging as products and business economics change. 

[Watch the recorded sessions](https://go.stripe.global/monetize-2026-on-demand) from Monetize 2026 for the full conversations with leaders from Replit, Fin, Snowflake, Clay, Growth Unhinged, and Stripe.