---
title: "AI Gateway production index"
source: "https://vercel.com/blog/ai-gateway-production-index"
publishedDate: "2026-05-12"
category: "frontend"
feedName: "Vercel"
author: "Harpreet Arora"
---

8 min read

May 12, 2026

Ask which AI model is best, and the answer changes before the ink dries. That's what happens in an industry where new models are released weekly.

Every benchmark measures a different race, and every race crowns its own winner, but Vercel has a unique view of the industry through production workloads. [AI Gateway](https://vercel.com/ai-gateway) serves tens of trillions of tokens across hundreds of models through real applications and agents.

**What we're seeing**:

-   Anthropic leads in spend despite a higher unit price, Google leads in volume
    
-   OSS models are gaining traction, but there is no loyalty to specific labs
    
-   OpenAI spend share is growing quickly after recent model updates
    
-   High-volume workloads route across 30+ distinct models on average
    
-   Agentic workloads carry 59% of all token volume (up 2x over 6 months)
    

This report is built on data from seven months of production traffic from AI Gateway, with usage from over 200K+ unique teams.

## [Link to heading](#anthropic-leads-in-spend;-google-leads-in-volume)Anthropic leads in spend; Google leads in volume

Cost and volume rankings disagree because they measure two different workloads, even for the same customer.

By spend in April 2026, Anthropic took 61%, Google 21%, and OpenAI 12%.

By token volume, the picture flipped. 38% of April traffic through AI Gateway routed to Google, 26% to Anthropic, 13% to OpenAI, and 10% to xAI. Smaller labs split the rest.

Some models are positioned to win by being cheap enough per token to carry huge volume, while others are priced high enough to make sense only for quality-critical work. The different models are not competing for the same call. In aggregate the same customer base sits on both leaderboards, with premium reasoning calls landing on [Claude Opus](https://vercel.com/ai-gateway/models/claude-opus-4.7) and cheap fast calls landing on [Gemini Flash](https://vercel.com/ai-gateway/models/gemini-3-flash). Spend follows the high-stakes calls, and volume follows the low-stakes ones, with the labs each holding a different layer of the same applications.

Volume-vs-spend also changes quickly at the lab level. A few specific signals:

-   Gemini Flash helped Google take the lead on volume at a smaller share of spend
    
-   Claude Opus helps Anthropic lead on spend with less volume than Google
    
-   OpenAI's spend share tripled from March to April after the [GPT-5.4/5.5](https://vercel.com/ai-gateway/models/gpt-5.5) releases
    
-   Google's spend share climbed from 8% in March to 21% in April as Gemini Flash usage scaled
    

## [Link to heading](#spend-follows-the-cost-of-being-wrong)Spend follows the cost of being wrong

The same cost/volume divide exists at a finer grain inside specific kinds workloads:

-   Personal assistants account for 20% of cost on 40% of token volume
    
-   Coding agents sit roughly balanced at 22% of cost on 20% of tokens
    
-   Back office agents run at 6% of cost on 15% of tokens
    
-   App generation runs at 7% of cost on 11% of tokens
    

What a workload spends per token is a function of how expensive a wrong answer is to the use case. Personal assistants can run on cheap, fast models because mistakes only impact individual users and are quickly corrected. Back-office workflows pay for stronger reasoning because errors can trigger legal, financial, or operational risks that outweigh the per-call savings. The per-token economics are a stake map: applications spend more per token when mistakes cost more.

The same pattern holds in a broader B2C/B2B split. B2C applications generate many low-cost calls, while B2B applications run fewer, more expensive ones. On a per-token basis, B2B costs roughly two times as much as B2C.

## [Link to heading](#no-single-provider-wins-across-use-cases)No single provider wins across use cases

Cutting the data by use case shows a fragmented provider landscape:

-   Anthropic notably leads in software building
    
-   Google over-indexes in consumer
    
-   OpenAI is the most evenly distributed
    
-   xAI and others are split across coding, consumer, and long-tail use cases
    

Anthropic's pattern is concentration at the high-stakes layer. As the workload moves from back office to consumer, Anthropic's token share drops from 71% down to 7%. Its cost share follows a much shallower curve and keeps the lead through three of the four categories. The revenue concentrates wherever the answer has to be right, regardless of how much volume passes through.

Google is the inverse shape. Its footprint concentrates in consumer, where Gemini Flash carries 28% of tokens at 15% of cost, and barely appears on the cost chart outside it. The position is a single-SKU bet that rises and falls with Flash adoption.

xAI is a price wedge. [Grok](https://vercel.com/ai-gateway/models/grok-4.3) carries 20% of building tokens and 18% of outreach tokens at materially smaller cost shares in each. xAI wins on price-to-quality fit, and whoever matches the price closes the wedge.

OpenAI is the most balanced of the four at 6% of building cost, 18% of consumer cost, and 28% of outreach cost. No single layer is load-bearing for OpenAI's overall share, which makes the company the least exposed of the four to disruption in any one layer.

Open-weights families like [Kimi](https://vercel.com/ai-gateway/models/kimi-k2.6), [MiniMax](https://vercel.com/ai-gateway/models/minimax-m2.7), and [GLM](https://vercel.com/ai-gateway/models/glm-5.1) rotate through the consumer and building tiers where the cost ceiling is lowest. Their cost share stays small, and their token share inside consumer and building is large enough that any cost-only view of the market understates them.

There is no single dominant provider across the whole market because there is no single dominant use case. The right question is not "Who is winning AI?", it is "Which models are winning the use case I care about?" The labs that look closest to even on a blended chart are competing for different layers of the same stack.

## [Link to heading](#apps-are-becoming-more-agentic)Apps are becoming more agentic

The shape of production AI requests has changed underneath all of this. In April 2026, 22.2% of AI Gateway requests ended with a tool call, up from 11.4% in October 2025. Measured by tokens, the shift is bigger. 58.9% of all tokens are now in tool-call requests, up from 31.6% six months ago.

By both measures the agentic share roughly doubled in half a year, but the more telling number is the gap between the two shares. 22.2% of requests carry 58.9% of tokens, which means tool-using requests are about 2.6× more token-heavy than the rest. The cost surface of AI has shifted from chat-shaped to agent-shaped, while headline request counts barely budged.

Every kind of round trip bills against the same meter, whether it's a function execution, an API call, a database query, or a code run, so an agent shipping ten tool calls bills roughly ten times the tokens a chat would. Where a chat bills one round trip per prompt, an agent bills a chain.

## [Link to heading](#leaderboards-rank-one-model,-but-production-teams-use-35+-at-scale)Leaderboards rank one model, but production teams use 35+ at scale

At scale, multi-model stops being a choice and becomes standard agent architecture.

Teams running 1K to 10K requests averaged 3 distinct models. By the 10M+ requests bucket, the average is 35 models in regular use. The jump from 18 models in the 1M to 10M bucket to 35 in the 10M+ bucket is the inflection point.

A 35-model fleet runs as a routing graph, with a cheap classifier for intent detection, a frontier model for the reasoning step, an embedding model for retrieval, a fast model for summarization, and a vision model for screenshots. Every one of those models is swappable. If a provider raises prices, degrades quality, or has an outage, traffic redistributes across the rest in hours. At the scale that produces most of the spend on the leaderboards, switching between labs is closer to a config change than to a vendor migration, and the standard story about lab lock-in inverts the higher you go on the request-volume curve.

## [Link to heading](#new-models-are-adopted-rapidly)New models are adopted rapidly

The same fleet design explains how fast new releases get absorbed. When a new version ships inside a model family, traffic moves to it within weeks.

[Claude Sonnet 4.6](https://vercel.com/ai-gateway/models/claude-sonnet-4.6) absorbed most of the Sonnet family's share by its first full month after launch.

The Opus family is moving through the same shape now, with [Claude Opus 4.7](https://vercel.com/ai-gateway/models/claude-opus-4.7) taking share from Opus 4.6 on a near-identical curve.

Predecessor models stayed live and routable on AI Gateway throughout both windows, but teams moved anyway. The migration is a config change, and the labs no longer set the upgrade timeline of their own product lines.

## [Link to heading](#provider-outages-have-a-hidden-cost)Provider outages have a hidden cost

Roughly 3.5% of requests on AI Gateway complete after a fallback. That means the initial route hit an error, a rate limit, or a timeout, and the gateway reissued the request to a healthy alternative fast enough that the user still got a successful response.

Measured in tokens the rescue rate runs at 5.1%, and in dollars at 4.9%. The token-weighted and cost-weighted rates run higher than the request-weighted rate because the requests that get rescued are, on average, bigger and more expensive than the ones that don't. Long context windows hit rate limits more often than short ones, multi-step agent runs accumulate failure across steps, and heavy reasoning calls time out under sustained load. Each of those failure modes targets the expensive end of the workload, which is why the dollar rate sits higher than the request rate.

A provider's SLA measures request-level uptime, but a production application experiences cost-weighted uptime, and the two come apart on exactly the calls that paid for the model.

## [Link to heading](#conclusion:-build-for-workload,-not-the-lab)Conclusion: Build for workload, not the lab

Production workloads are designed for efficiency, reliability, and flexibility, not to match the latest model leaderboards.

Across six cuts of the same data, the shape underneath stays the same. Different labs win different layers of the same applications, and the architecture that handles those layers is the one production teams at scale have already built for.

This echoes the early cloud era. Teams expanded compute first (more instances, regions, redundancy) and squeezed per-unit cost later. The 35-model fleets visible at the top of the spend curve are the same patter at a faster cadence; the optimization that follows happens at the routing layer.

For anyone shipping AI today:

-   Plan for multiple models across providers
    
-   Assume the need for fallbacks to optimize for uptime and cost
    
-   Design routing as a core unit of architecture from the beginning
    

We expect to revisit this data on a recurring cadence as the patterns shift. Live model rankings are available on the [AI Gateway Leaderboards](https://vercel.com/ai-gateway/leaderboards).

### [Link to heading](#about-this-data)About this data

This analysis is based on anonymized, aggregate routing data from the Vercel AI Gateway through April 2026.

A few notes on measurement:

-   _Spend_ uses market-rate pricing (published list price) to provide a normalized view across teams that bring their own API keys.
    
-   _Volume_ counts tokens routed through AI Gateway.
    
-   _B2C_, _B2B_, and _use-case_ classifications are aggregate. No individual team or workload is identified.