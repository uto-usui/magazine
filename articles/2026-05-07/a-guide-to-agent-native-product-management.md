---
title: "A guide to agent-native Product Management"
source: "https://every.to/guides/ai-product-management-guide"
publishedDate: "2026-05-06"
category: "design"
feedName: "Sidebar"
---

## The discipline of product management

“Product management” was born in the 1930s within the consumer goods giant Procter & Gamble. As the company expanded its product offering, leaders realized their products would be more successful if they ceded control to direct managers of the products. Someone needed to be in charge of each product, and they called that person the “Brand Man.” The raison d’etre of product management—ownership and accountability—survives to this day.

In the intervening years, however, the product management job description has been rewritten several times over. In the 1940s and 1950s, Hewlett-Packard’s product managers became the middlemen between customers and engineers. Toward the end of the century, internet startup PMs added user experience design, agile development, and A/B testing to their toolkits.

Now, PMs need to be good at everything: design and diplomacy, sales and statistics. Thousands of startups have raised billions of dollars to help PMs across these disciplines. But that introduced a new problem: The average company today has over [100 software subscriptions](https://www.saasacademy.com/blog/saas-statistics%5C), an overload that impacts PMs more than other functions given how many other roles and disciplines they interact with. No wonder many people I know in product management feel burnt out.

Now, much of the interdisciplinary work that goes into product management can be done by an LLM in minutes, sometimes seconds. What used to be a three-hour-long analytics investigation is now a simple back-and-forth with Claude. A product review that used to be a fortnightly chore emerges from a single typo-ridden chat message.

This has been my recent experience, at least. I no longer struggle with semicolons in SQL queries or even write tickets. All of my product management work happens in conversation with, in my case, Claude Code. The conversation is the work.

The following guide is a point-in-time snapshot of how I’m doing product management with agents. New AI tools launch every day, and my workflow changes at least weekly. I’ve tried to capture here the main pillars of my workflow that likely won’t change for months. It’s hard to see ahead farther than that these days.

## The main PM loop

This is a familiar software development lifecycle (SDLC) loop. Product management happens mainly at the “plan” and “review” stages. For more on the “ship” stage, check out my colleague **[Kieran Klaassen](https://every.to/@kieran_1355)**’s [guide to compound engineering](https://every.to/guides/compound-engineering).

Everything that ships is an experiment. You never know for sure how users are going to react to something new. The more you ship, the more you learn—and those learnings reinforce themselves over time, allowing you to serve customers better. Once enough learnings accumulate, it’s time to revisit the strategy. Is this still the winning approach, in light of what we now know? The answer may be yes, but if it’s no, change it and get back to shipping.

But everything starts with…

### The Only Subscription You Need to Stay at the Edge of AI

Start shipping agent-native products with Every.

![Email](https://every.to/assets/icons/email-10ff3ba37cc5acd6148e8d02a1968f35810765415fd1aef2ecdfe22c5fd25af3.svg)

## The strategy document

As Kieran says, software development has shifted from 20 percent planning and 80 percent execution to 80 percent planning and 20 percent execution. The foundation of all software planning is the strategy.

The new compound engineering command `/ce-strategy` takes its structure from the book _[Good Strategy Bad Strategy](https://www.youtube.com/watch?v=4uWKEG0s9Kc)_ by management professor **Richard Rumelt**. As the title suggests, he surveys lots of real examples, from companies and governments, and classifies them as good strategies or bad strategies.

The first time you run `/ce-strategy` in an agent environment (Claude Code, Codex, etc.), you’ll be asked a series of questions and ultimately get a `strategy.md` file. The components of `strategy.md` are:

There are two optional sections. “Not working on” is an explicit list of things that might be tempting but are not near-term priorities. It’s sometimes helpful to state this up front to head off distractions. “Marketing/positioning” is a list of things the product team will work on to support growth.

The strategy doc doesn’t contain product requirements. There are no specific features, issues, or statuses described in detail. It’s the big picture of the product. The specs come later.

### Filling it in

Writing a strategy document cold is hard. The best way to do it, I’ve found, is to have an agent interview you. The `ce-strategy` skill does this. It runs through the sections in order and has built-in guidance about what makes a good answer (and what kinds of answers to push back on). The output is `docs/strategy.md`. You can rerun the command at any time to revisit a specific section without rewriting the whole thing.

The interview is deliberately conversational. If the first answer to, “What’s the core problem this product solves” is vague, the agent drills down: “Whose situation specifically? What do they try today, and why doesn’t it work?” The guidance here is taken from personal experience and from the Rumelt book.

### Compounding the strategy

Assuming you’re using compound engineering and shipping at post-AI speeds, you should rerun the strategy interview every few months. The next time you do the interview, your agent will have weeks or months of context from planning features, shipping them, and reviewing the data. The agent’s questions will be sharper, the conversation tougher.

### Shipping

I used to spend a lot of time writing tickets. I prided myself on detailed acceptance criteria (given, when, then) that left no room for engineering uncertainty for how a feature should work.

Now I no longer write tickets. Once you have a strategy document including the work tracks, I’d recommend using the compound engineering ideate, brainstorm, and plan skills to come up with what to build.

You need an issue tracker, and it should be one that has an MCP (model context protocol) or other agent integration. I use GitHub Issues, but I’ve had great experiences with Linear in the past. Your agent should write tickets for you, move them around the board, and keep the statuses up to date. You no longer read or write tickets; you just talk about them with your agent.

For statuses, I use lists of now/next/later, which roughly correspond to this week, next week, and… some point in the future. I don’t do sprints, just [Kanban](https://www.atlassian.com/agile/kanban). There’s “In Progress,” and there’s “Done.” That is all you need.

## Product pulse

The product pulse is where strategy meets reality. The pulse command is my main window into how the product is actually being used, whether features are successful, and how healthy the system is. A pulse is generated on demand, and the collection of pulses is the product’s memory.

### Creating a product pulse

This assumes your product is instrumented and logs are being stored somewhere. If that’s not the case, I would recommend you stop reading this and go set that up. (Posthog has a [self-setup wizard](https://posthog.com/docs/ai-engineering/ai-wizard).)

Like the strategy command, the `/ce:product-pulse` command interviews you the first time you run it.

### What makes up a pulse

A good pulse report fits on a single page (about 30 to 40 lines of terminal output) and covers four things:

### Making it run

#### **Data sources**

A pulse pulls from up to four categories of tools in the product’s stack:

A team that has only one of these can still run a useful pulse. The report skips sections when the requisite data source isn’t available. With the number of data sources, quality beats quantity.

#### **Wiring up MCP connections**

The fastest way to let an agent query these tools on every run is to connect them via MCP. If you’re running Claude Code, `/mcp` lists what’s already connected. Your agent’s MCP registry is an easy way to find connectors, or you can use Google to search for them.

If a tool has no MCP available, the pulse can still work. The agent just needs a credentialed path (like a CLI or API), but agents seem to like MCPs.

#### **Feedback channels**

Pulse covers the quantitative half of feedback—metrics, errors, performance. The qualitative side has to come from users directly. I like emailing with users, so I made the Spiral email address conspicuous in the product, and emails to it land in my work inbox. I also include a 15-minute call booking link in every marketing email that goes out to users. There is no substitute for talking to users. You will never cease to be surprised by what they say.

Platforms like Canny and Featurebase are also good ways to collect and organize feature requests and bug reports. They have MCPs, which can be another good input into Pulse.

#### **Memory: Saved reports**

Every pulse run saves a copy to `~/pulse-reports/` as a Markdown file. A single pulse answers, “What happened today?” A folder of pulses answers, “What happened this month?” “When did this trend start?” “Did that feature change anything?” Over time, the folder becomes the team’s working memory of the product.

#### **Running on a cadence**

Claude Code has a Routines feature, which allows you to schedule frequent tasks, so you can automate recurring pulse runs. I have it run every day at 8 a.m., so I start work with the freshest perspective on how the product is doing. I typically run `/ce:product-pulse` manually a few times over the rest of the day.

#### **Reading it like a founder**

The agent is instructed to assemble the report, read it from the perspective of a founder, annotate anomalies, and run follow-up queries where necessary. For example, if a certain endpoint yielded higher errors, it will dig into those errors: Were they from one user? Did they coincide with a reported third-party outage? On the agent’s second pass, unless everything is completely normal, it will add a section at the end that preemptively answers natural follow-up questions. In this way, the agent works as an analyst, not just by pulling the data but by evaluating and presenting it.

By default, there are no hard-coded thresholds above or below which the agent will flag metrics. The agent evaluates the report using common sense and by comparison to previous pulse numbers. For example, if response times are suddenly three times higher on average, it will flag that and likely investigate further. If you do have specific performance goals—say, average system response time—you can ask your agent to reference those in the relevant section.

## The plugin

The `ce-strategy` and `ce-product-pulse` skills described in this guide ship inside Every’s open-source [compound-engineering](https://github.com/EveryInc/compound-engineering-plugin) plugin, installable in Claude Code with:

`/plugin marketplace add EveryInc/compound-engineering-plugin`

`/plugin install compound-engineering`

Contributions are welcome.

## Going further

#### **How the PM skills fit into compound engineering**

When `docs/strategy.md` is present, the other compound-engineering skills (`ce-ideate`, `ce-brainstorm`, `ce-plan`) read it as grounding for their own work. Strategy flows into feature conception, specs, and ultimately shipped code. The next pulse reads the result. Those planning skills should be run with reference to past pulse reports as well, in order to make better feature design and prioritization decisions.

#### **What’s not included**

#### **Product management is now about the interesting parts**

LLMs have allowed our tools to catch up with the multifaceted duties of product managers. For me, product management has been reduced to the interesting parts: dreaming up features, thinking through designs, looking at interesting data, and talking to users. We all feel the economic imperative to embrace AI tools, but the better reason, I think, is to make work more fun.