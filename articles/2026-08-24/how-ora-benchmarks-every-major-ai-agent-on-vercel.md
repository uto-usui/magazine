---
title: "How Ora benchmarks every major AI agent on Vercel"
source: "https://vercel.com/blog/how-ora-benchmarks-every-major-ai-agent-on-vercel"
publishedDate: "2026-08-21"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

### [Copy link to heading](#ora-on-vercel)Ora on Vercel

-   Front end, back end, and agent runtime on one platform
    
-   Every major agent tested side by side on live sites
    
-   Hundreds of commits a day from a 16-person engineering team
    

Ora sends agents onto live websites with instructions to sign up for a product, integrate with it, and pay for it. Agents often fail, and by Ora's estimate, 99% of the web isn't agent-ready. The platform shows customers where and why agents fail, and what to change.

Assaf Elovic, co-founder of Ora, spent years helping agents discover the web. His previous company, [Tavily](https://www.tavily.com/), built a web search engine for AI agents and was acquired by [Nebius](https://nebius.com/) earlier this year. Search solved half the problem, but an agent that finds a product still has to actually use it. He and co-founder Liad Yosef started Ora to measure how ready the web is for agents, and to fix the parts that aren't.

Today that means spawning agents against live customer sites from [journey.ora.ai](https://journey.ora.ai/), where Ora runs a journey and records the cost, latency, and steps an agent needs to finish a task. The platform runs on Vercel, including the agent runtime.

## [Copy link to heading](#benchmarking-every-major-agent-side-by-side)Benchmarking every major agent side by side

### [Copy link to heading](#every-harness-expects-its-own-infrastructure)Every harness expects its own infrastructure

Agents decompose into two parts: a model, which does the reasoning, and a harness, the software that gives the model its tools and drives it from step to step. Ora's lineup covers the agents customers use most: Claude Code, ChatGPT, Gemini, Hermes, OpenClaw, and [eve](https://vercel.com/eve), Vercel's agent framework. Ora runs each agent on a customer's website and watches how it handles common workflows.

No two harnesses want the same infrastructure. Each expects its own environment and exposes its steps differently, so Ora runs a separate runtime for every harness and traces every step. Ido Finder, who leads engineering at Ora, calls that side-by-side coverage one of the most valuable things ora brings to its customers.

When an agent stalls in a signup flow, the customer sees which step and what it tried. Without the trace, the result is a score with nothing behind it.

### [Copy link to heading](#one-platform-under-every-harness)One platform under every harness

Ora built this testing system entirely on Vercel. Front end, back end, and the agent runtime share the same deployment path, logs, and authentication. The agent runtime isn't separate infrastructure to operate; it lives where the rest of the product lives.

## [Copy link to heading](#ora-benchmarked-eve,-then-built-on-it)Ora benchmarked eve, then built on it

### [Copy link to heading](#testing-eve-like-any-other-harness)Testing eve like any other harness

When Vercel launched [eve](https://vercel.com/eve), Ora gave it no special treatment. eve went through the same benchmark, under the same conditions, as every other harness in the lineup. Ora works with Vercel Engineering as a design partner, and Finder gave the eve team direct access to the platform to dig into the results.

The initial test put eve against Claude Code across hundreds of real journeys on multiple domains. Both harnesses ran the same models, Claude Fable 5 and Haiku 4.5, and every run gave the agent the same job: integrate with a product.

Ora published three numbers from the comparison:

-   7% fewer steps to reach the goal
    
-   2x native success: twice as many tasks finished on the customer's own site instead of falling back to web search
    
-   9% more valid endpoints: more of the endpoints the agent found were ones it could actually call
    

The benchmark fed back into eve, too. One run surfaced a prompt-caching issue, the eve team shipped a fix, and Ora's next round of results measured roughly 15% lower total cost.

> You don't need to configure much on eve, it works out of the box, and parity with other harnesses is amazing to see.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/7Kk94vZZWQTvprzpnmu78c/cc388baa35782d5ea6ed1fe0d6d800d3/ido_photo.png)
> 
> Ido Finder AI Lead @ Ora

### [Copy link to heading](#the-framework-behind-ora's-own-agents)The framework behind Ora's own agents

For a company that benchmarks every major harness for a living, this is not a casual choice. After those results, Ora builds on eve.

Because eve follows the Next.js paradigm, there was little to configure, and tools, skills, and connectors take little code. The feature that sealed it was the sandbox override. An agent framework like eve ships with its own sandbox, the isolated environment where the agent executes, runs tools, and touches files. That's a good default for most teams, because you get safe execution for free. But an agent in the framework's own sandbox runs outside the instrumented environment where Ora traces every step. The override lets the team swap that environment in, so eve agents get recorded like every other harness, with nothing new built.

[Journey.ora.ai](https://journey.ora.ai/) now has eve on both sides, eve is one of the harnesses it tests, and eve is what it runs on.

> I've been building agents since the technology first became available, and eve was the easiest setup I've experienced.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/7Kk94vZZWQTvprzpnmu78c/cc388baa35782d5ea6ed1fe0d6d800d3/ido_photo.png)
> 
> Ido Finder AI Lead @ Ora

## [Copy link to heading](#how-16-engineers-ship-hundreds-of-commits-a-day)How 16 engineers ship hundreds of commits a day

The engineering team is 16 people shipping hundreds of commits a day, and day-to-day infrastructure work belongs to their coding agents. A stack that sits in one place lets those agents run it end to end.

> Everything is consolidated into the same infrastructure, which makes our coding agents much more efficient. I don't even log into the Vercel UI. I ask my coding agents to run on the logs, debug everything, deploy, change environment variables."
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/7Kk94vZZWQTvprzpnmu78c/cc388baa35782d5ea6ed1fe0d6d800d3/ido_photo.png)
> 
> Ido Finder AI Lead @ Ora

Finder puts the time saved at a few hours a week at least. Elovic credits a similar amount to how well coding agents build with Vercel's libraries.

## [Copy link to heading](#what's-next)What's next

Ora is adding more products, and the architecture is growing with them. The team is splitting its platform into microservices, all of them on Vercel. New services deploy to the same infrastructure and talk to each other with no extra configuration, and the internal agents built on eve will run as one more service.

By Ora's own measure, 99% of the web still can't handle an agent that shows up to sign up, integrate, and pay.

[About Ora:](https://ora.ai/) Ora makes the web agent-ready. Companies use ora to benchmark how AI agents discover, navigate, and interact with their websites, and to build the infrastructure agents need to find, use, and transact with them.