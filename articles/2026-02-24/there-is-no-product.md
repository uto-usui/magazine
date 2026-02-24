---
title: "There is no product"
source: "https://sidu.in/essays/after-ai-there-is-no-product.html"
publishedDate: "2026-02-23"
category: "design"
feedName: "Sidebar"
---

If you’ve been anywhere near tech Twitter in the last few weeks, you’ve heard it:

-   SaaS is dead. Nadella said so.
-   Software stocks are cratering. Salesforce down 6%, Adobe down 5%, the index down 15% YTD.
-   AI agents will replace every SaaS tool. Just vibe-code your own HRMS.
-   Seat-based pricing is finished. It’s all about outcomes now.
-   VCs won’t touch a pure SaaS pitch anymore.

Everyone has an explanation. Nadella declared SaaS dead on the [BG2 podcast](https://www.youtube.com/watch?v=FWbBYmgWJps). Lemkin calls it [“the end of easy SaaS.”](https://www.saastr.com/the-2026-saas-crash-its-not-what-you-think/) Ghodsi says SaaS will become [“invisible like plumbing.”](https://techcrunch.com/2026/02/09/databricks-ceo-says-saas-isnt-dead-but-ai-will-soon-make-it-irrelevant/) Shahar at DTCP says the [entire business category is dying](https://www.calcalistech.com/ctechnews/article/hjlvyl7lze). The a16z folks push back, arguing vibe-coded apps aren’t real products. The stock market, meanwhile, is having its worst start since 2022 and doesn’t care about anyone’s take.

On the ground, startups are watching their SaaS vendors try to [double prices from $70k to $170k a year](https://x.com/codyschneiderxx/status/2011105976921813032) - while AI-built custom software already costs _less_ than the SaaS subscription. We’ve been saying this since our seed deck in 2023: the SaaS model of amortising development cost will be obsolete. Customers’ iteration cycles will be in hours, not years.

They’re all focused on the symptom. Software valuations are falling, and the discourse is about _why software valuations are falling_.

The deeper thing is this: the traditional economics of software - the idea that building software creates an _asset_ - is breaking.

> lots of inbound convos on AI Native the last few days. a consistent pattern: we are still not realising that amortizing software inventory (which makes it an asset) is no longer the game. if software is cheap to build, inventory is a liability.
> 
> 'building a product' no longer means 'building an asset'. it means building an inventory that anyone can trivially replicate and therefore something that cannot be amortized due to a more efficient alternative.
> 
> — Sidu Ponnappa (@ponnappa) [February 11, 2026](https://twitter.com/ponnappa/status/2021513872973459728)

## The Wrong Question[](#the-wrong-question)

Let’s ask a different question.

“Is SaaS dead?” is what everyone’s debating. But SaaS is a _delivery model_. Software hosted in the cloud, sold on a subscription. That’s not dying. Nobody’s going back to shrink-wrapped boxes and perpetual licences. The cloud is plumbing now.

> The question nobody’s asking is: _is the economics of software as an asset dying?_

Here’s how traditional product thinking works. You invest a large amount of money and time building software. This is expensive and risky - most software projects fail, and the ones that succeed take years and millions of dollars. Because it’s expensive and risky, the output is _valuable_. It’s hard to replicate. You’ve built something your competitors can’t easily copy and your customers can’t easily build themselves. So you amortise that investment across as many customers as possible, for as many years as possible. The software is an _asset_, and the subscription revenue is the return on that asset.

Build something _difficult_. Amortise it widely. Collect rent. That’s the economic engine of every software product company.

The entire “SaaS is dead” discourse is about the _rent collection_ part - pricing models, seat counts, AI agents replacing UIs. But rent collection is downstream of a far more important question: is the thing you built still _difficult_?

If it isn’t difficult to build anymore, it isn’t an asset. It’s idle inventory - software sitting on a shelf that anyone can manufacture on demand. You don’t amortise inventory. You _liquidate_ it. And if it isn’t an asset, there’s nothing to amortise. The engine falls apart - not because of how you price the software, but because of what the software _is_.

> oversimplified: trad product thinking creates software liabilities, not software assets
> 
> the line between the two is shifting up with model capabilities. from auto complete in 2024 to full CRUD apps in 2026.
> 
> compilers, sota models, operating systems, cross border taxation etc remain above the line. for now.
> 
> — Sidu Ponnappa (@ponnappa) [February 11, 2026](https://twitter.com/ponnappa/status/2021513872973459728)

## Inventory vs. Asset[](#inventory-vs-asset)

Let’s make the distinction precise.

When you build software that’s expensive and risky to create, the output is scarce. Scarcity is what makes it an asset. You can amortise the development cost over its useful life and generate returns by licensing access to it. This is how every enterprise software company from Oracle to Salesforce to the smallest vertical SaaS startup has worked for decades. The upfront investment is the moat. The difficulty of replication is what keeps the moat full.

Inventory is the opposite. Inventory is something you _manufacture_. It sits in a warehouse - or on a server - waiting to be sold or deployed. The economics of inventory are fundamentally different from the economics of assets. Inventory _depreciates_. It has carrying costs. It becomes obsolete. And critically, inventory has no moat - someone else can manufacture the same thing.

Here’s the question every software company needs to answer: is the software you’re building an _asset_ or _inventory_?

If building an HRMS takes a team of engineers six months and costs half a million dollars, the output is an asset. It’s scarce. It’s hard to replicate. You can amortise it.

If building the same HRMS takes an AI agent a weekend and costs a few hundred dollars in compute, the output is inventory. It’s abundant. It’s trivially replicable. You _can’t_ amortise it - because your customer can just manufacture their own. Why would they rent yours?

It’s actually worse than that. A centralised SaaS product has to architect for diversity - every customer’s feature permutations, every edge case, every conflicting workflow, all coexisting in a single multi-tenant system. That architectural complexity is _enormous_. A custom build for a single customer doesn’t carry any of it. One set of features, one workflow, one tenant. Orders of magnitude less complex to build, and orders of magnitude less complex to maintain and run in production.

The economics get worse the more you look at them. SaaS pricing bakes maintenance into the per-seat licence cost. You pay per user, per month, and the vendor handles hosting, updates, support. Sounds reasonable until your headcount grows and your licence bill balloons with it. The vendor’s costs don’t scale linearly with your seat count - but your bill does. You’re subsidising their margins with your growth.

Now consider the alternative. For anything below the line, a customer can hire a services company to build the software and maintain it on an annual contract. The build is cheap - we’ve established that. The maintenance contract is a fixed annual cost. And as headcount rises, the TCO per employee _drops_ - because adding users to your own software costs you nothing. No new seats. No per-user fees. The SaaS bill scales with your headcount. The maintenance contract doesn’t. At some point the curves cross, and after that they diverge fast.

I’ve lived this. At Gojek, our HRMS vendor quoted $400k _additional_ annually for 2,000 licences to add their performance review module. The module was clunky and would’ve taken months of customisation to match our actual perf process. Our CHRO asked me: can we build and run this for less than $400k a year? I said yes. We did. Eight months - including rolling it out and running a full review cycle on it. This was pre-AI, in 2021.

Today, the same build would take weeks, cost a fifth of what we spent, and be _far_ cheaper to maintain - because you don’t have to lock in a team to retain context. Agents document everything as they build. The institutional knowledge lives in the project, not in someone’s head. The vendor’s moat wasn’t the software. It was the _assumption_ that building your own would be harder. That assumption is gone.

For fifty years, traditional product thinking assumed that building software creates assets. That assumption held because building software was genuinely difficult. It’s now failing - not everywhere, not all at once, but steadily and accelerating - because AI is converting one class of software after another from asset to inventory. If you’re still building below the line, you’re not creating assets. You’re accumulating liabilities.

## The Line[](#the-line)

If some software is still an asset and some has become inventory, the natural question is: which is which? Model capabilities define the answer - what the current generation of AI can trivially replicate versus what it can’t.

And the line is moving. In 2024, AI could autocomplete your code and generate boilerplate - useful, but it wasn’t replacing anyone’s product. Anything that required architectural judgment, domain expertise, or multi-system integration was still firmly an asset.

By 2025, AI was building entire components. Standard integrations, common workflows, authentication systems, admin dashboards. The line moved up. If your product was essentially a well-built integration layer or a workflow automation tool, you were below the line. Your moat was draining.

In 2026, AI builds full CRUD applications. Standard business logic, internal tools, reporting systems - the stuff that makes up the vast majority of enterprise software. An HRMS. A project tracker. A basic analytics dashboard. A customer portal. All below the line. Any competent services company with agentic tooling can build a customer-specific version in weeks.

What’s still above the line? Compilers. State-of-the-art models. Operating systems. Software that encodes genuinely novel algorithms or requires years of accumulated domain data - cross-border taxation engines, real-time trading systems, climate modelling platforms. These remain assets because AI can’t trivially replicate the _knowledge_ embedded in them. The difficulty isn’t in the code. It’s in the understanding the code encodes.

You can watch the line move in real time. When Anthropic shipped a legal plugin for Claude in February, Thomson Reuters, RELX, and Wolters Kluwer [lost billions in market cap overnight](https://fortune.com/2026/02/09/anthropic-isnt-done-spooking-saas-investors/). Legal research software - a category that seemed safely above the line - crossed below it in a single product launch.

> JPMorgan: Anthropic is eating SaaS model collapsing the Software Model with no where to Hide !
> 
> — Navroop Singh (@TheNavroopSingh) [February 4, 2026](https://twitter.com/TheNavroopSingh/status/2018882925463544151)

But here’s what should keep software founders up at night: the line only moves in one direction. Every model generation pushes it higher. What’s above the line today will be below it in eighteen months. You can’t build a business on the assumption that your moat is permanent when the water level is rising on a schedule.

Most SaaS products live below the line. Not some. Not the weaker ones. _Most_. The uncomfortable truth isn’t that SaaS is dying - it’s that the majority of software products have already crossed from asset to inventory, and their vendors haven’t noticed yet.

## There Is No Product[](#there-is-no-product-1)

We’ve been talking about assets and inventory and lines, but we haven’t asked the fundamental question: what _is_ a product?

> Right now there's a massive gap between "projects" and real products. People vibe-build something, then say "look! I built this!" but honestly 99% of these are just projects, not products.
> 
> — Yingjun Wu (@YingjunWu) [February 18, 2026](https://twitter.com/YingjunWu/status/2024116199886602661)

A product is an expensive or risky project whose output - because it’s consequently valuable - is amortised across multiple customers. The expense and the risk are the point. They’re what makes the output worth productising. Customers pay you because building it themselves would be harder, slower, and riskier than buying access to yours. The product is the crystallised output of difficulty.

Remove the difficulty and you remove the product.

If the project isn’t expensive and isn’t risky, its output can’t be amortised - because anyone can produce the same output for less than your subscription costs. Your customers can build it. Their consultants can build it. Given another year of model improvements, their interns can build it. Nothing to sell because there’s nothing scarce.

The vibe-coding crowd is proving this without realising it. Every weekend project posted on Twitter with “look what I built!” is a demonstration that the output has no product economics. The built-in-a-weekend flex is also the confession - if it took you a weekend, it’ll take your competitor a weekend too. The fact that _anyone_ can build it is precisely _why_ it can’t be productised. They’re not building products. They’re manufacturing disposable inventory and calling it a startup.

Don’t try to fix your pricing model. Don’t pivot to outcome-based billing. Don’t add AI features to your existing product and hope the market comes back. Those are all attempts to bend the spoon.

_There is no spoon._

If the software you’ve built sits below the line, there is no product. The thing you thought was an asset - the thing your valuation is built on, the thing your investors are pricing, the thing your roadmap is organised around - doesn’t exist in the way you assumed it did. It’s inventory. Inventory doesn’t have a pricing problem. It has an _existence_ problem.

Below the line, _there is no product._