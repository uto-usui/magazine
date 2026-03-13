---
title: "10 things we learned building for the first generation of agentic commerce"
source: "https://stripe.com/blog/10-lessons"
publishedDate: "2026-03-12"
category: "engineering"
feedName: "Stripe Blog"
---

A future where we buy with AI agents feels inevitable. Making it actually work is another story. The moment agents meet live product catalogs, inventory, fraud systems, and customer support queues, sellers quickly run into a long list of real-world edge cases to solve for. 

Over the past six months, we launched the [Agentic Commerce Protocol](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce) (ACP), an open checkout specification that lets buyers, AI agents, and sellers transact through APIs; introduced a complete agentic solution with the [Agentic Commerce Suite](https://stripe.com/blog/agentic-commerce-suite); integrated businesses such as Etsy and URBN; and powered AI shopping experiences across agents. That’s given us an insider’s view into what matters in production, from the unglamorous integration work to the failure modes we’ve seen early adopters grapple with.

These lessons from the first generation of agentic commerce are meant to help sellers decide what to tackle first, avoid common bottlenecks, and be proactive about what’s coming.

 ![Blog > 10 things learned > Section 1 image](https://images.stripeassets.com/fzn2n1nzq965/1kVOJxPDzq06ix7ydz31zs/20926d050be89930d6d041d3ce28769e/Blog_Section_-_1.png?w=1620&q=80)

Your product catalog is the entry point to agents, but different AI agents want your data in different formats. One needs an SFTP file drop. Another wants a custom API integration. A third has its own feed spec entirely. We’ve seen brands reformat the same product catalog in six different ways to get listed across multiple AI agents. It creates an ongoing maintenance burden that’s a drag on time and resources. 

We’ve heard frustration from sellers about having to build (and rebuild) custom integrations for every agent. It’s why we designed the Agentic Commerce Suite: to prevent catalog fragmentation and support the full transaction lifecycle, from discovery to checkout. Upload your product catalog data to Stripe, and we syndicate it across supported agents. No duplicate work or reformatting required.  

In practice, getting “ingestion-ready” product data is what determines whether you show up reliably across agent surfaces.

 ![Blog > 10 things learned > Section 2 image](https://images.stripeassets.com/fzn2n1nzq965/1UXbP5SCJBdbMIDBSZNxy6/fb5564ec8b218929deb87bff40de59e5/Blog_Section_-_2.png?w=1620&q=80)

Formatting your catalog is the starting point. Sellers are also increasingly focused on avoiding data lag. When a potential customer is looking at a specific product in an agentic channel, the agent needs to verify it’s in stock right now, not 15 minutes ago. One platform recently asked us if inventory verification happens down to the millisecond, underscoring how close to real time agents must confirm availability before showing customers a checkout option. 

This gets even more complicated when you add variants to the mix, which are difficult to format in a way that agents can reliably understand. Take a shirt where the shopper can choose a size, a color, and even add custom embroidery. Or consider a sneaker in 14 different colorways, each with its own size availability. In cases like these, agents will need real-time checks to confirm that a specific item or combination is actually in stock, or to know when to prompt the customer with alternative options. 

We worked with partners like OpenAI to stress-test the ACP against market complexity. With your Stripe-hosted ACP endpoint (via the Agentic Commerce Suite), you can share availability with AI agents in the checkout API call. As agentic commerce scales, real-time systems will be key for customer trust and brand reputation.

 ![Blog > 10 things learned > Section 3 image](https://images.stripeassets.com/fzn2n1nzq965/2i7mqZwXny4t0EDgL5co04/f6c97d548ea60358946f58ec9b229fd1/Blog_Section_-_3.png?w=1620&q=80)

Since we codeveloped ACP with OpenAI in September 2025, we’ve shipped four releases and added [payment handlers](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.payment_handlers.md), [scoped tokens](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.seller_backed_payment_handler.md), [extensions](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.extensions.md) (starting with [discounts](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discount_extension.md)), built-in buyer auth, and native [MCP transport](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/pull/139). That protocol work is important, but sellers can’t afford to rebuild their stack every time a protocol changes. We built the Agentic Commerce Suite as a protocol-agnostic commerce layer that works across standards, including Google’s UCP, so sellers don’t have to bet their roadmap on any single spec. 

The businesses we talk to are wary of building zombie integrations: something they ship for a specific AI agent that becomes obsolete six months later after a strategic pivot. Unless you want to staff a team dedicated to tracking protocol changes, you need a partner that can absorb that volatility. Integrate with Stripe once, and we’ll keep you compatible across agents as protocols evolve.

 ![Blog > 10 things learned > Section 4 image](https://images.stripeassets.com/fzn2n1nzq965/15aQCDBI2LlDbpb4CL81VV/43b537bfadbb3bc64cf1941b29405a65/Blog_Section_-_4.png?w=1620&q=80)

One key link between agents and existing payment rails is the token layer. To enable agentic transactions, the Agentic Commerce Suite handles and processes [Shared Payment Tokens](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens) (SPTs), a payment primitive built for agentic commerce that allows agents to initiate payments with a buyer’s permission and preferred payment method, without exposing credentials. For many retailers, especially large enterprises, this token layer is where Stripe adds particular value. They need infrastructure that makes agentic transactions possible in the first place: secure, scoped tokens that let agents transact on behalf of buyers.

But agentic transactions aren’t only about the payment. There are multiple steps that have to work correctly in the flow: catalog discovery, checkout state management, shipping, and post-sale details such as returns and refunds. Stripe has a part in all of them. 

We’re playing an open source role by bringing a protocol into the world alongside OpenAI. But we’re also building the business layer on top, providing fraud tools, onboarding of businesses, catalog management, and more, so businesses can support agent-driven commerce end to end, not just at the moment of payment.

 ![Blog > 10 things learned > Section 5 image ](https://images.stripeassets.com/fzn2n1nzq965/71FUiznbOOylJ3Qq946G4Y/9302ef4e5ebda4fbb780ceb500b34bb0/Blog_Section_-_5.png?w=1620&q=80)

One of the most common questions we hear from sellers is about whether we’re seeing an uptick in fraud as agentic commerce grows in volume. The answer is reassuring: since launching the Agentic Commerce Suite with major retailers like Coach, Kate Spade, and Ashley Furniture, fraud rates have been near zero.

Traditional fraud detection relies on signals tuned to human traffic: everything from browser fingerprinting and mouse movements to device battery level and window size. Those signals vanish in an agentic world where there’s no human buyer on the frontend. Instead, we leverage the density of the Stripe network. Even if an agentic purchase is “new” to a given business, the end customer and their payment method likely aren’t new to Stripe, which gives an immediate source of history and risk context.

By using SPTs (described above), Stripe Radar can apply the same scrutiny to agentic transactions as it does to direct checkout flows, even when authorization happens off-Stripe. The result is enterprise-grade fraud protection that works without needing weeks of seller-specific data history.

 ![Blog > 10 things learned > Section 6 image](https://images.stripeassets.com/fzn2n1nzq965/1QyDoa7imAdWJbBwChk7S1/5e56c65b184b5cfadff12d789c30f53f/Blog_Section_-_6.png?w=1620&q=80)

Don’t flip the switch on your entire catalog. One approach we’ve seen work is to start with a focused set of SKUs you believe will convert, so you can measure performance and watch how the channel actually behaves. When starting out, stick to straightforward products that ship directly to the buyer’s home (nothing that requires installation or complex fulfillment coordination) as the frontend user experience develops.

URBN, the parent company of Anthropologie, Free People, and Urban Outfitters, sells everything from plants to custom furniture. When launching agentic commerce, the brand focused on a subset of its most popular products (dresses and denim) that would provide value early. 

For sellers, the early phase of agentic commerce means being strategic about which SKUs, payment methods, and fulfillment options you enable first. Think of it as gathering data so you can scale intelligently. The good news is that the scope of what’s possible is expanding quickly. In time, agents will enable new buying experiences beyond single-item, single-business carts. Starting small positions sellers to take advantage of those capabilities as they go live.

 ![Blog > 10 things learned > Section 7 image](https://images.stripeassets.com/fzn2n1nzq965/3P9laVETvfQ4jgktdZalFu/b43aac7d07c011775d3df9373e008ecd/Blog_Section_-_7.png?w=1620&q=80)

Early retail happened in store. First-wave ecommerce happened on your site. Mobile maintains your brand’s look and feel. Agentic commerce shifts buying intent onto AI surfaces. That changes how sellers need to think about discovery, brand control, dispute resolution, and trust. 

It also demands a strategic reframe. Agents often sit between the seller and the customer; they’re helping people discover products and decide where to buy. “Showing up” starts to look less like launching a new channel and more like work you already do for SEO and performance marketing: making sure you’re easy to find and choose. Commerce has always been about meeting customers where they are. It’s the “where” (and who controls it) that’s shifting.

Visibility isn’t the only challenge. Once an agent is in the loop, the messy parts of commerce don’t go away, but they pop up in different places. If an agent confirms an order but a legacy backend rejects it after a fraud check, how do you notify the customer? If a customer returns to an AI surface and says, “Cancel my order,” does the agent reliably route that request to the seller? We’re working with sellers and our AI partners to anticipate these issues and build solutions proactively.

 ![Blog > 10 things learned > Section 8 image](https://images.stripeassets.com/fzn2n1nzq965/6vWP8wAp5DQoacPxezYUgw/70b9608d97947cc284779f681f10a3fd/Blog_Section_-_8.png?w=1620&q=80)

The logged-in state is the holy grail for sellers. It allows them to recognize customers across sessions and channels, personalize experiences, and apply benefits such as loyalty and saved preferences. Right now, most agentic commerce still behaves like a guest checkout: the agent acts as proxy, and the customer’s identity isn’t revealed until the moment they hit “buy.” Identity signals exist, but sellers have to do a lot of manual work to capture what’s available and map it into existing customer and order management systems. 

As a result, brands we talk to are struggling to honor loyalty benefits, apply targeted discounts, and attribute conversion (or diagnose abandoned carts) with the same fidelity they’re used to. And as agents get better at making timely, relevant recommendations, the decision to buy can happen faster. If checkout then forces extra steps (whether that’s a click-out to a business’s site or additional confirmation and form-fills), sellers risk losing that intent.

It’s one reason we’re continuing to improve Link, a digital wallet built by Stripe. For returning Link customers, shipping and payment details are already saved, so checkout is faster. Link can also give agents a safer way to complete purchases without exposing a shopper’s personal or payment details. 

Over time, as the agentic ecosystem matures, we expect to see loyalty programs plug in, more complex fulfillment options supported, and upgrades to post-purchase engagement.

 ![Blog > 10 things learned > Section 9 image](https://images.stripeassets.com/fzn2n1nzq965/3Kytm8GBljAJ5G8GdIVNdK/4c60d69264b47df0f0c8ee55edfddb16/Blog_Section_-_9.png?w=1620&q=80)

A recurring question we’re hearing from sellers: should you build a first-party agentic experience (like a brand-owned assistant on your site or app), or lean into third-party agentic commerce on external AI agents? In practice, this isn’t an either-or decision so much as a measurement challenge. The two approaches show up in different points in the customer journey. 

First-party agents, such as NikeAI, Magic Apron from Home Depot, or Ask Ralph from Ralph Lauren, are primarily about engagement. They deepen relationships with known customers, preserve brand control, and make it easier to maintain customer context like identity and preferences. Third-party agent surfaces are largely about acquisition. They meet customers where they already are and help capture net-new demand. We’ve seen this dynamic emerge early on with Etsy, for example.

There’s an opportunity to design for both. Use first-party agentic experiences to improve retention and lifetime value, and treat third-party surfaces as a new distribution surface that can bring customers to your owned channels over time.

 ![Blog > 10 things learned > Section 10 image](https://images.stripeassets.com/fzn2n1nzq965/3iy5tSWc9hiNLBmwQ0vkaz/3237b05c51469d9dba3f20e26c381202/Blog_Section_-_10.png?w=1620&q=80)

Most of what we’ve covered here is everyday checkout, where a person decides to buy and pays through familiar rails. In parallel, we’re starting to see agents pay other services directly, per request, while they’re completing a task. That’s outside the standard ACP flow. It’s not a checkout session with shipping, loyalty, and a human confirmation step. It’s typically a fast, programmatic payment inside an HTTP call.  

Agents also don’t pay like humans. They might make thousands of small decisions a day and need low-latency, HTTP-native payments for pay-per-call or pay-per-task business models. Builders tell us they want to charge agents directly for things like tool usage, data access, or automated workflows, but the existing tooling is mostly built around human checkout. 

To help bridge the gap, we previewed [machine payments](https://x.com/jeff_weinstein/status/2021331763960873058?s=20) using stablecoins on Stripe. With a few lines of code, you can use the PaymentIntents API to charge agents for things such as API usage, MCP calls, or HTTP requests. You specify the amount and currency, then Stripe generates a unique deposit address for that transaction.

From there, you return the deposit address to the agent, so it can pay programmatically. In an x402 flow, for example, the protocol passes the address back to the agent so it knows exactly where to remit payment. You can track status via API, webhooks, or the Stripe Dashboard, and funds settle into your Stripe balance. We’re starting with support for x402 using USDC on Base, with more protocols coming. 

We’re already seeing [early](https://x.com/jeff_weinstein/status/2024199579718353218?s=20) [examples](https://x.com/GabGarrett/status/2024194283931111757?s=20), like charging agents per API call for inventory, pricing, delivery quotes, or pick-up-slot holds, and charging per task for automation such as fitment checks, bundle building, quote generation, or replenishment. This isn’t common in traditional retail yet, and today it’s stablecoin-based, but it points to where agent-native monetization can go as protocols and rails mature.  

## **What’s next**

Agentic commerce is changing fast. In the near future, agents, humans, and businesses will be able to transact as reliably as today’s checkout, with richer context and better controls. Stripe is building the economic infrastructure for that future. 

As agents start buying, selling, and coordinating work on our behalf, we want it to be easy for any business to show up on AI surfaces and get paid reliably. If you already use Stripe for payments, you’re well positioned as agentic commerce expands. 

To get there, we’re continuing to improve the [Agentic Commerce Suite](https://go.stripe.global/agentic-commerce-contact-sales): pushing more real-time updates, expanding SPT [support to more payment methods](https://stripe.com/blog/supporting-additional-payment-methods-for-agentic-commerce), strengthening fraud signals as new vectors emerge, and building the identity resolution logic that helps sellers recognize customers across agentic surfaces. In addition, as agentic commerce becomes more global, we’re investing in broader geographic coverage and support for new verticals. 

To learn more about how we’re expanding our agentic commerce solutions, [join us at Stripe Sessions](https://register.stripesessions.com/2026/form).