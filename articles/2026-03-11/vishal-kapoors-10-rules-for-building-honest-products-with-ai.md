---
title: "Vishal Kapoor’s 10 rules for building honest products with AI"
source: "https://www.figma.com/blog/vishal-kapoors-10-rules-building-with-ai/"
publishedDate: "2026-03-10"
category: "design"
feedName: "Figma Blog"
---

Building with AI isn’t just a technical challenge—it’s a trust challenge. This is especially relevant at [Affirm](https://www.affirm.com/), which empowers customers with transparent, flexible payment plans to take better control of their financial lives. Given the deeply emotional nature of personal finances and the often-convoluted terms of credit card companies, earning user trust is key to Affirm’s mission and enduring success.

Having spent his career at the intersection of engineering, product, and design, Vishal Kapoor, SVP of Product at Affirm, is tackling this emerging challenge from multiple angles. As AI becomes embedded in everyday workflows, we asked Vishal to share how he helps teams accelerate development, explore more ideas, and still deliver experiences that are honest and human at their core. Distilled from that conversation, here are 10 rules for navigating what Vishal calls “the fun and messy middle” of AI adoption to build truly trustworthy products.

## [1\. Put a high premium on first-principles thinking](#_1-put-a-high-premium-on-first-principles-thinking)

I’m an engineer by training, and at heart, so I approach systems problems from first principles. When tackling a complex challenge, I deconstruct it into its fundamental components to understand the larger puzzle. The end-to-end process of uncovering customer needs, finding a differentiated way to address them, and navigating the S-curves of iteration—that is the joy of building. While AI can accelerate and augment this process, it cannot replace it; [having a unique perspective and intuition remain inherently human](https://www.figma.com/blog/how-to-harness-skills-that-ai-cant-automate/)

.

For example, we offer most approved customers three payment plan options after a real-time eligibility check. I recently challenged the team: “Why three plans? Why not five? Why not one? Why not let customers create a custom plan?” The power of asking these fundamental questions is that it forces diverse and often original viewpoints. AI can help us explore alternatives faster, but critical insight comes from thoughtful human disagreement.

> AI can help us explore alternatives faster, but critical insight comes from thoughtful human disagreement.

## [2\. Stay grounded in deep human emotions](#_2-stay-grounded-in-deep-human-emotions)

There is immense value in being close to customers and remaining humble about their problems. There is no substitute for rolling up your sleeves, visiting a UX research lab, and observing how real customers use the product by asking direct questions. I actively track social media and app store reviews, and speak with customers whenever possible, especially with strangers [who recognize the Affirm logo on my shirt](https://www.figma.com/blog/corpcore/)

. We even have an internal AI-powered tool called Pluto that I can query directly: “How have our customers been disappointed with us in the last 30 days?”

Dashboards and metrics matter, but data only points the way. To truly understand customer needs, you must experience how human emotions underpin finance. Anxiety, trust, frustration, and relief all surface during checkout. It’s not about the bike you are buying; it’s about the unadulterated joy it’ll bring.

## [3\. Treat AI like another teammate](#_3-treat-ai-like-another-teammate)

In the early stages of any new technology, we tend to swing to extremes—believing AI will either make us 10x faster, or replace us entirely. The reality is far more practical.

When we first piloted AI tools, there was understandable hesitation across the board. What we quickly realized is that since building products is inherently a team sport, AI is simply one more member of that team: one that helps us turn customer insights into tangible prototypes and real products much faster.

For instance, we run different flights of experiments because checkout flows vary across web, mobile, and desktop. We use various AI tools, including Fi[gma Make](https://www.figma.com/blog/figma-make-general-availability/)

, to help ensure there are no broken windows in the system—say, if we want to update an interaction pattern across all screens. Auditing every single screen for every modality and use case could take months. Make helps us identify early on how to replace outdated design patterns across all these different surfaces. Crucially, by taking cycles away from engineers and putting them back into the hands of designers and PMs, we accelerate velocity and unlock more creativity across the organization.

## [4\. Spike on the edge cases](#_4-spike-on-the-edge-cases)

Building a delightful and authentic product means looking beyond the high-level happy path. The deepest, most valuable work lies in the variations, the rabbit holes, and especially the edge cases. Navigating that terrain demands intense focus, precision, [and a lot of love](https://www.figma.com/blog/double-click-does-efficiency-kill-love/)

.

[One challenge we faced](https://www.figma.com/blog/3-ways-product-teams-are-building-conviction-faster-with-figma-make/)

was helping customers decide between 6-week, 6-month, and 12-month payment terms at checkout. Previously, we didn’t fully explain _why_ those options existed. Through research, we knew customers fall into three clear buckets: those seeking 0% APRs (or minimal interest), those who want the shortest possible plan, and those managing cash flow with the smallest monthly payment. Our solution was to show clear badging for each goal, but without overwhelming the customer. The question was: Which badge to show, to which person, on which checkout, on which device?

This is a complicated problem to solve at scale, so we rapidly prototyped different options. Instead of taking six weeks to validate an idea and take it to production, we can do so in a matter of days. This capability dramatically expands the number of ideas we can explore at any given time.

## [5\. Embrace the counter metrics](#_5-embrace-the-counter-metrics)

When prototyping and evaluating ideas, we don’t just look at the success metrics; we pay a lot of attention to the counter metrics. In the badging example, we focused on people who may have unintentionally completed their purchase out of confusion. If I were to just look at conversions, I would say it’s a win. But if I look at complaints and refunds, I would say it’s a loss. We actively track customer dissatisfaction (DSAT) metrics during product reviews to truly understand how features perform in customers' hands and across different modalities.

The ability to validate and test quickly allows us to preempt customer dissatisfaction with more realistic prototyping. This ensures we gather higher-quality qualitative data before a single line of production code is written.

## [6\. Rapidly experiment, and fail fast](#_6-rapidly-experiment-and-fail-fast)

We are always asking ourselves: How can we experiment and build 10X better products? With tools like Figma Make, Claude, and Cursor, our prototypes are production-ready faster, significantly reducing front-end development time. Because we’ve connected our design artifacts through the [Figma MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/)

, we can vibe code to continuously iterate on prototypes.

Taking the Affirm app as an example, designers aren’t just creating mockups—they’re building real proofs of concept with Cursor and our app. Since the design system maps directly to our codebase, we maintain design intent from concept to launch. We are also able to move 10x faster with testing variants because the cost of prototyping has reduced by several degrees.

## [7\. Use creativity as a competitive advantage](#_7-use-creativity-as-a-competitive-advantage)

Previously, PMs at Affirm used Figma to review designs, not author them. But because our amazing designers showed the power of Figma Make, our product team has been inspired to create prototypes directly in the tool, which then form the foundation for product requirements documents (PRDs).

As an example, we were working with Shopify to move a disclosure and change which term would be preselected in the Shop Pay Installments flow. The next day, a prototype landed in my inbox from a PM—I was genuinely surprised. This visual representation became the robust foundation for the PRD, which we still perform due diligence on. AI tools accelerate that process by gleaning insights, helping with formatting, and providing immediate critique. It also helps us see around corners for things like errors and missed states before we go into production.

## [8\. Blur functional silos and treat everyone like a builder](#_8-blur-functional-silos-and-treat-everyone-like)

Traditionally, a feature used to flow in a waterfall: written in a PRD by a PM, translated into a Figma file by a designer, coded by an engineer, and finally QA’ed and deployed. All of that is up for grabs because AI is democratizing the skills required across all these stages. Engineers can now modify design artifacts; product managers can push code into pre-production to understand the look and feel; and designers can create PRDs—or even production-ready code.

[Our roles will continue to blur](https://www.figma.com/blog/2025-shifting-roles-report/)

, opening up a new world of possibilities and collaboration. We all have powerful ideas, but bringing them to life was the constraining factor. AI is injecting the joy and energy of building into functions that previously lacked access. We are living in the golden age for builders. The future belongs to the curious.

> We are living in the golden age for builders. The future belongs to the curious.

## [9\. Make it fun (and safe) to tinker](#_9-make-it-fun-and-safe-to-tinker)

As a leader, one of my most important jobs is to inspire curiosity about what AI tools can do. Increased usage drives proficiency in identifying where these tools help and where they fall short. The name of the game is continuously testing systems, monitoring the state of the art, and trying to stay two steps ahead.

To that end, we founded an AI enablement steering committee that keeps teams abreast of the latest developments and triages inbound requests for new tools. Our security and procurement teams set up a pilot for that team or individual, inviting them to kick the tires. The most advanced users help us identify the tools ready for larger adoption and create robust on-ramps. Once a tool is widely available, we track active usage, publish reports on which teams are using which products at what frequency, and run qualitative surveys to understand how they’re helping teams do their jobs better. We are still in this messy middle, but we have turned the tide and converted many AI skeptics into AI advocates.

## [10\. Be very careful about “AI slop”](#_10-be-very-careful-about-ai-slop)

Trust is everything to our mission, and how we build that is through simplicity and transparency. In this golden age of AI, it is dangerously easy to create too much complexity and unintentional “slop.” It’s easy to experiment, throw things at the wall, and see what sticks. The true art and challenge lies in using AI to distill and deliver a product that is profoundly simple and transparent—one that is rooted in authentic customer problems and original perspectives.

How do you harness all that energy and excitement to create something truly compelling? Simplicity is _the_ critical competitive advantage, and it’s achieved by an endless pursuit of excellence.