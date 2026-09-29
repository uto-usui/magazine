---
title: "Travel’s AI dilemma at Skift Global Forum"
source: "https://stripe.com/blog/travels-ai-dilemma-at-skift-global-forum"
publishedDate: "2026-09-28"
category: "engineering"
feedName: "Stripe Blog"
---

 ![blog > skift > hero image](https://images.stripeassets.com/fzn2n1nzq965/3sixwW4Q4XbBvQLOZX1ZpY/7fe22790b07cb7c561ceaa419ec1b55b/03_Header_image.png?w=1620&q=80)

At the Skift Global Forum last week, a conference themed around the travel industry’s “great recalibration,” Airbnb CEO Brian Chesky effectively summed up attendees’ push-and-pull relationship with AI. At different points in his roughly 30-minute conversation onstage Wednesday, Chesky called AI “an existential risk” to his company and “literally the best thing to ever happen” to it. AI could threaten Airbnb’s hold on travel discovery, but Chesky also credits the technology with helping his team ship nearly twice as many features as last year. 

That contradiction surfaced throughout the three-day event, which brought nearly 1,000 travel leaders from 45 countries to New York. Executives from Expedia Group, Priceline, IHG Hotels & Resorts, Amadeus, and other companies discussed how to harness the benefits of AI—more personalized discovery, faster customer service, new sources of revenue—without giving up control of the booking or their brand.

A central question was whether AI will simplify travel or fragment it further. For now, it’s doing both: simplifying individual tasks like comparing options or changing a booking, and multiplying the agents, interfaces, and paths travelers use to plan and purchase a trip. Travel leaders are making decisions in real time about which agents to partner with, what to build themselves, and how to preserve the integrity of customer relationships in what Amadeus Executive Vice President Elena Avila called a “high emotion, high stakes” industry.

## The all-in-one AI agent is giving way to specialists

Many travel companies have devoted time and resources to building a single agent that could handle a trip from discovery through service. Now they’re pursuing a more diversified AI strategy, spreading investments across specialized agents, answer engines, apps, and brand-owned tools. 

Expedia Group, for example, began building an end-to-end agent a few years ago before changing course to more specialized agents tailored to individual tasks across shopping and planning. “What’s going to be more effective is to have single agents and really perfect those,” said CEO Ariane Gorin. “That’s not what I would have said to you two years ago.” Once each agent works on its own, Expedia plans to connect them over time.

The company is making other inroads into AI travel, too. Expedia is joining Meta’s Muse agent and continuing to invest in answer engine optimization, now its fastest-growing channel, according to Gorin.

Similarly, Airbnb is taking a portfolio approach, building its own interface while partnering with outside agents. “I think the homepage of the internet is no longer going to exist,” Chesky said. “There’s going to be many homepages. There’s going to be many agents.” 

## Personal AI agents are prompting travel businesses to redefine risk

Muse and Instinct were raised repeatedly in conversations at Skift because they’re moving beyond trip recommendations to booking on behalf of travelers. Once an authorized agent reaches checkout, however, it can get tripped up by systems designed to stop automated attacks. 

Bill Ryan, senior vice president and CTO at BWH Hotels, described testing an agent on his company’s website and getting stalled by a CAPTCHA. The bot control worked, but it inadvertently blocked a legitimate purchase. 

Risk systems have to evaluate both the legitimacy of the payment method and the authority of the agent to act. Agents also need limited payment credentials that allow them to make an approved purchase without exposing the traveler’s card details.

Fraud rates are already high across the industry. Fraud attempts against travel and leisure businesses hit a [four-year high](https://stripe.com/blog/analyzing-rising-fraud-attempts-among-travel-and-leisure-businesses-on-stripe) last year, according to Stripe data. Meanwhile, Radar, Stripe’s AI-powered fraud prevention tool, blocked the overwhelming majority of those attempts—the share of attempted fraud that reached the payment stage fell by more than [two-thirds](https://stripe.com/blog/analyzing-rising-fraud-attempts-among-travel-and-leisure-businesses-on-stripe) from 2023 to 2025. Radar distinguishes bot abuse from legitimate agentic transactions, admitting authorized agents while deflecting bad actors and scrapers.

## As AI makes inventory easier to compare, high-touch hospitality matters more

When AI can compare prices and properties in seconds, travel inventory risks becoming a commodity. But AI hasn’t yet taken over the booking decision. On Wednesday, McKinsey&Company Partner Margaux Constantin presented survey data showing that 70% of travelers use AI for research, but fewer than 16% are comfortable booking through an AI tool. Sixty percent said while AI helps them find options faster, extra options prolong the decision-making. 

According to Chesky and others, that friction isn’t entirely bad. “The ultimate form of entertainment shopping is planning travel,” he said. “I don’t think people want all that taken away.” 

Travel brands are reaching more travelers by partnering with a growing array of AI agents and continuing to invest in the apps they control. Chesky said Airbnb is focusing on the parts of its product an agent can’t reproduce, including community, identity verification, host communication, and visual browsing. IHG is taking a hybrid approach: making its hotel content readable by AI platforms and keeping the booking on the IHG site, where travelers can see loyalty benefits and cancellation policies.

AI can present endless options, but travel brands still need to win the booking through hospitality that feels personal, especially when every listing starts to look the same.

## Travel companies are using AI to head off buyer’s remorse and offer more after checkout

Some of AI’s most useful travel applications come after checkout. More than 50% of travelers change their minds and rebook after purchase, according to research Constantin presented at Skift. About 40% keep hunting for a better price; 30% worry they chose the wrong option.

Booking is an emotionally charged moment. “That’s when the excitement starts. That’s when the momentum starts,” said Priceline Chief Commercial Officer Traci Mercer. An agent that can supply a quick answer or make an easy change might prevent the customer from second-guessing or canceling their purchase. 

The same context that enables an agent to reassure an uncertain traveler can also help it suggest a relevant addition later. Priceline’s Penny is a conversational agent that started as a chatbot at checkout. Now it helps customers change, cancel, or rebook travel while retaining the context of the trip. The agent can also connect the original purchase to add-ons later, like a hotel stay or car rental. Expedia reported seeing record attach rates after making it easier for travelers to add hotels and other products to an existing booking. 

This is the idea behind the “[connected trip](https://stripe.com/sessions/2026/under-one-roof-unifying)”: bringing flights, hotels, car rentals, and activities into one activity. With AI, brands can carry a traveler’s preferences and trip details across those bookings as the person moves through various stages of trip planning. On the B2B side, Expedia’s is also expanding this model to other travel sellers. Its CarTrawler acquisition and updated activities API allow banks, travel agencies, and other booking platforms to offer car rentals and activities alongside flights and hotels. 

For travel companies, the connected trip gives more chances to keep a traveler who’s waffling about their purchase and sell additions that improve a trip they’ve already booked.

## How Stripe can help

Stripe's [agentic commerce](https://docs.stripe.com/agentic-commerce) solution helps businesses sell to and through agents by making their products discoverable, managing fraud, and enabling agentic payments.

-   [Optimized Checkout Suite](https://docs.stripe.com/payments) reduces friction and improves conversion for customers referred to a business’s website by an agent, before or instead of embedded checkout.
-   [Stripe Directory](https://stripe.com/guides/agentic-commerce-primer) gives agents a registry of machine-ready businesses they can discover and interact with.
-   [Link’s wallet for agents](https://stripe.com/blog/giving-agents-the-ability-to-pay) allows agents to make approved purchases on a traveler’s behalf without seeing the underlying payment credentials.
-   [Radar](https://stripe.com/radar), Stripe’s AI-powered fraud prevention tool, evaluates agentic transactions to block malicious bots while allowing legitimate ones through. It assesses risk signals such as dispute likelihood, card testing, stolen-card risk, and issuer-decline patterns. 

Learn more about how Stripe supports the [connected trip](https://stripe.com/sessions/2026/under-one-roof-unifying), or [get in touch](https://stripe.com/industries/travel) with our team.