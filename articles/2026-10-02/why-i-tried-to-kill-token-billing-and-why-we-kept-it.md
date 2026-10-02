---
title: "Why I tried to kill token billing (and why we kept it)"
source: "https://stripe.com/blog/where-pricing-is-headed"
publishedDate: "2026-10-01"
category: "engineering"
feedName: "Stripe Blog"
---

Token billing is useful infrastructure and, for almost every company, a bad customer-facing pricing model. In its simplest form, passthrough pricing charges customers for the model tokens their usage consumes, plus a markup on the underlying cost. If you’re building your pricing around that token consumption, you’re letting your costs determine your price.

That’s reflected in how our customers are using token billing today. They need it on the backend to track usage, manage markups, and protect their unit economics, but they don’t want those details defining how they price their product.

This gets at something I’ve been saying for a while: your invoice should be where you define your value to your customer.

## **Token-based billing has an invoice problem**

This raises the obvious question: why did we build token billing in the first place? Because it’s a safeguard against runaway compute costs, and it’s easy to deploy and explain. For model providers, token usage is the product. For most other AI companies, token billing can be a useful place to start: tokens provide an obvious, countable basis for pricing. But neither subscription seats nor tokens accurately reflect the value your customer receives. 

Token billing positions your product as a commodity markup on top of an actual commodity. It shows the customer an accounting of which models were used, how many tokens were consumed, and what markup was applied. But presenting your model mix, input costs, and margins to a customer misses the point. If their invoice shows that you used 10 models with a 10% markup on one, 5% on another, and 25% on another, you’ve defined your value as the difference between your price and somebody else’s model costs. 

As those models become cheaper and more interchangeable, customers can challenge your markup or route around you entirely. Competition drives the markup, and potentially your business, toward zero.

## **A better model: Unified credits**

Many of our customers are already using Metronome as a margin-tuning system, not just to deploy pricing models. They make model-routing decisions upstream, then send the resulting token usage to Metronome—either broken out by customer or attributed to a single aggregate customer for cost tracking. Our product then gives them visibility into token consumption so they can manage costs and tune their margins. 

That gives companies control over their internal economics, but it doesn’t solve the invoice problem. They still need a presentation layer on top of the core modeling that translates the underlying usage into something tangible for customers. More companies are turning to a unified credit model. 

A unified credit model creates a credit-based burndown. Customers draw down a common credit balance as they use different product operations, with each task consuming credits at its own rate based on the underlying token consumption. One operation might enrich a dataset, another might generate an image. In that case, the invoice can show the customer those enrichments or generated images, not the 10 models you used in the process and the markup applied to each. 

The point isn’t to eliminate complexity; it’s to keep it behind the scenes. Metronome preserves token-level metering, so companies can continue routing models upstream and tuning for margin and performance as workloads change or new models are introduced. But with a unified credit model, your customer doesn’t have to parse all that complexity. On their invoice, the customer sees credits tied to the work the product performs, not tokens tied to the model costs.

## **Why output-based pricing is the ideal (and outcome-based pricing is a myth)**

Unified credits are a stepping stone to output-based pricing, which is the best way to align AI consumption pricing with value today. 

There are three common pricing metrics in AI. The first is an **input**, which is a cost, like a token. 

The second is an **outcome**, which could mean the customer making more money, building more pipeline, or reducing churn. Outcomes can help you orient your product around customer value, but they’re difficult to turn into defensible pricing metrics.

Outcome-based pricing only works in a very limited set of circumstances and is largely a luxury reserved for the corporate super-rich. You either need monopoly-like power—enough control over the transaction and its underlying telemetry to measure the outcome, and enough market power to make customers accept that pricing—or a very high ticket price, since only very large contracts can justify the investment required to measure outcomes. At a high enough ticket price, you can afford to instrument a workflow end-to-end and prove mathematically that you’ve made it much more efficient: it requires fewer people, work gets done faster, or inventory turns more quickly. Every quarter, you can prove that value back to the customer and charge a fee as a function of that outcome.  

For everyone else, outcome-based pricing is, for all intents and purposes, a myth. There’s a telemetry gap around what counts as the outcome, whether it occurred, and whether your product caused it. 

Say, for example, I sell you a sales agent and charge you based on the revenue it generates. I’ve immediately invited a dispute over the relative value of human labor versus automated labor. Did the agent generate the sale or was it the sales rep? Was it marketing? Would the customer have purchased anyway? The outcome might be valuable, but it can’t be objectively attributed to the product.

The third way to price is on **outputs**. An output is an objective, verifiable metric, like generating an image or sending an email. Fin’s pricing, based on resolved support conversations, is considered the poster child for outcome-based pricing. I would argue it’s actually an output. The outcome of customer support is happy customers; a resolved support ticket is something you can objectively count. 

All companies should do the same: define your output metric, call it an outcome, and convince the market that you’re right.

## **Where pricing is headed**

Pricing models are slow to change because customers compare you with the rest of your competition. There’s a heavy penalty for departing from the herd.

But once a new model takes hold, the market can change very quickly. It’s Darwinian: a pricing model can look completely maladaptive, then suddenly become adaptive and spread through the category.

Three years ago, our team at Metronome predicted that hybrid pricing—some combination of seats plus usage—would become a prominent business model. We built support for it, and it went largely unused by our customers for around 18 months. Then, as of August 2026, roughly one in six (and growing) Stripe users that had crossed key revenue milestones were actively using or rolling out hybrid pricing. The model we’d been hypothesizing about for years seemed to catch on all at once.

Fin followed a similar pattern. Three years ago, almost no one in the AI customer-support category was talking about outcome-based pricing. Within a quarter of Fin introducing pricing based on resolved support conversations, all five of the leading companies in the category had committed to some version of outcome-based pricing. 

Nothing changed, then everything changed. Once the product category and its buyers reached a certain level of maturity, the preference cascaded through the market.

As agents become more involved in both buying services and doing work, I suspect we’ll see the same thing with output-based pricing. 

Subscription and seat-based pricing have been dominant thus far partly because they’re straightforward for humans to understand and compare. It’s easy to explain a fixed price per month or a fixed price per user to human buyers. An agent, on the other hand, can account for far more variables and match the price of each task more closely to its value. 

One analogy for this trajectory is high-frequency trading. Trading algorithms operate at a level of speed and complexity that humans can’t. Something similar could happen with pricing. As agents increasingly evaluate and purchase services, pricing models won’t be limited by how much complexity a human buyer can handle. Agents also make the work itself easier to measure. Each task leaves an audit trail, which makes more activities observable and verifiable without a separate monitoring system. 

As more work moves through agents, I expect the measurable outputs they produce to become pricing metrics—even if they’re still often marketed as outcomes.

[Learn more](https://stripe.com/billing/usage-based-billing) about how Metronome helps turn usage into revenue, or [get started](https://marketplace.stripe.com/apps/metronome) now.