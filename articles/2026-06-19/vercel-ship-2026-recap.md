---
title: "Vercel Ship 2026 recap"
source: "https://vercel.com/blog/vercel-ship-2026-recap"
publishedDate: "2026-06-17"
category: "frontend"
feedName: "Vercel"
author: "Eric Dodds"
---

For a decade, Vercel has shaped how the web is built. Now, we’re doing the same for agents. The companies that win the next decade will build on infrastructure designed for agents from the start, and over 2,500 people gathered in London this week to do just that at Vercel Ship 2026.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F64Jiitkz8u7xgX3hCt0VM9%2F81981f5e1f8467816fb4346971c66320%2FAgentic_Infra_Per_Skew.png&w=1920&q=75)

## [Link to heading](#agentic-infrastructure-)Agentic infrastructure

Guillermo kicked off Ship by sharing his vision for Vercel: a true full-stack platform where you can deploy anything, including software that can think.

> We are deploying software that can think.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/27XHQudM8gCc2byKwFFMCT/5d8a8aa70d60c49020d13eee568d8103/guillermo-rauch-128.jpg)
> 
> Guillermo Rauch CEO @ Vercel

[Agentic infrastructure](https://vercel.com/blog/agentic-infrastructure) has three parts:

-   **Vercel is where coding agents deploy software**. When you ask Claude Code or Codex where to deploy, you get Vercel, because Vercel is built for the way agents work.
    
-   **Vercel is where you build and deploy your own agents**. We give you every tool you need to build and run apps and agents in production, securely, at scale.
    
-   **Vercel itself is automated by agents**. Vercel runs your apps in production, handling traffic, traces, observability, and anomalies. That data gives our agents the context they need to investigate autonomously, and then surface pull requests, not just alerts.
    

## [Link to heading](#vercel-is-for-shipping-agents)Vercel is for shipping agents

In the next keynote, Tom walked through each primitive in the [Agent Stack](https://vercel.com/blog/agent-stack), an end-to-end set of building blocks for agents. Hedi introduced [Vercel Connect](https://vercel.com/blog/introducing-vercel-connect), a secure way for agents to connect with external systems. And Shar gave a full demo of [eve](https://vercel.com/blog/introducing-eve), Vercel's new agent framework that implements the Agent Stack in minutes, in a single directory.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F79z6UOVbnfkxDawfGBoxF6%2Fa99fd13c4ccb3dde3a261975caab622f%2FG_Select_3.png&w=1920&q=75)

### [Link to heading](#the-agent-stack)The Agent Stack

No matter the workload, every agent needs to connect to models, run workflows across many steps, and connect to the systems and people that make it useful. Vercel gives you every primitive you need to build all three capabilities.

-   [AI SDK](https://ai-sdk.dev/) gives you one API to call any model, so streaming, tool calls, and structured output work the same across every provider
    
-   [AI Gateway](https://vercel.com/ai-gateway) routes your requests across hundreds of models from one endpoint, with automatic failover when a provider goes down
    
-   [Workflow SDK](https://workflow-sdk.dev/) makes every run durable with automatic retries, state persistence, and observability built in
    
-   [Vercel Sandbox](https://vercel.com/sandbox) gives each agent an isolated microVM to run and test the code it writes before it ships to production
    
-   [Chat SDK](https://chat-sdk.dev/) lets you deploy your agent across Slack, Discord, GitHub, and more from a single codebase
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7kiMrWRXssVXj24VYGNEkY%2Fab0bef2e3a9da7b429c81d9852fe8669%2FTomo_5._adjustedpng.png&w=1920&q=75)

#### [Link to heading](#vercel-connect-)Vercel Connect

[Vercel Connect](https://vercel.com/connect) launched at Ship 2026 in London as the newest building block in the Agent Stack.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FzivDAP2ryqFEO5ew9NKam%2Ff02567cfaf2828a95abd5571957b64f0%2FHedi_3_adjustedpng.png&w=1920&q=75)

Connect provides agents with secure access to the tools, data, and services they work with, without requiring a long-lived provider token stored in your environment variables. Your app or agent requests a temporary credential scoped to the one task in front of it, so there’s no standing secret left to leak.

[

**Securely connect your agents.**

Keep your provider credentials safe with Vercel Connect, authenticating and authorizing your agents as they work across your app.

Read the blog post



](https://vercel.com/blog/introducing-vercel-connect)

#### [Link to heading](#eve)eve

After building hundreds of agents at Vercel, we noticed that the architecture underneath had the same shape. [eve](https://vercel.com/blog/introducing-eve) is that shape as an open-source framework, and it's how we build, run, and scale production agents at Vercel.

eve Agents live in a single directory, with instructions in markdown and tools in TypeScript. Durable execution, sandboxed compute, approvals, subagents, and evals are already wired in.

[

**Ship a production agent in minutes.**

Every agent is a directory you scaffold, run, and deploy with the commands you already use.

Read the blog post



](https://vercel.com/blog/introducing-eve)

## [Link to heading](#vercel-is-for-shipping-full-stack-apps)Vercel is for shipping full-stack apps

Guillermo also highlighted Vercel's ability to host full stack applications, with support for additional backend frameworks, databases, and now, microservices.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6RDK2lPdXvcKEHVsOt0Et0%2F60ad86ce555ff94843a6f1723555f74a%2FG_select_1.png&w=1920&q=75)

### [Link to heading](#backends-and-databases)Backends and databases

Earlier this year, Vercel brought on some of the [best Python developers](https://vercel.com/blog/investing-in-the-python-ecosystem) in the world to extend support for backend workloads.

-   You can now run [FastAPI](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template), [Flask](https://vercel.com/kb/guide/build-with-a-flask-starter-template), [Express](https://vercel.com/kb/guide/build-with-a-express-starter-template), [Hono](https://vercel.com/kb/guide/build-with-a-hono-starter-template), and [other backend frameworks](https://vercel.com/kb/backend) at scale on Vercel.
    
-   Backend-only services are also supported, so you can host REST APIs, durable workflows, queues, cron, and [MCP servers](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express).
    
-   The Vercel Marketplace added access to databases like [Amazon Aurora](https://vercel.com/marketplace/aws/aws-apg), [Aurora DSQL,](https://vercel.com/marketplace/aws/aws-dsql) [DynamoDB](https://vercel.com/marketplace/aws/aws-dynamodb), and [OpenSearch](https://vercel.com/marketplace/aws/opensearch) directly from the Vercel dashboard.
    

### [Link to heading](#vercel-services)Vercel Services

Guillermo announced the launch of Vercel Services, available July 1. With Vercel Services, microservices are now a first-class citizen on Vercel. You can develop and deploy your frontend and backend together, and backend-only changes still build the app in a full preview environment. And for the first time, those services can communicate with each other without touching the public internet.

## [Link to heading](#vercel-is-for-shipping-in-the-enterprise)Vercel is for shipping in the enterprise

For us, Next.js and eve made building agents the easy part. The hard part was everything around them: access, authentication, integrations, and proving all of it to the security team. Jeanne told the story of how we built an enterprise security platform for ourselves, then made it available to our customers.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6GLykwCtvKgd3LoVIhysLu%2Fa7277d0b1d0f99e794489d417a96d9ec%2FJeanne_2.jpeg&w=1920&q=75)

### [Link to heading](#vercel-for-enterprise-apps-and-agents)Vercel for Enterprise Apps and Agents

[Vercel for Enterprise Apps and Agents](https://vercel.com/blog/vercel-for-enterprise-apps-and-agents) brings the Vercel developer experience to everyone at your company, with the identity, access, and governance needed to deploy safely.

-   Enterprise Managed Users (in Private Beta) centrally manages who can use Vercel and v0, with a full audit trail.
    
-   [Vercel Passport](https://vercel.com/changelog/vercel-passport-is-now-in-public-beta) keeps internal apps internal, private by default behind your IdP
    
-   Bring your own cloud (BYOC) on AWS (in Private Beta) gives you the ability to run Vercel in your own AWS tenant, including your Vercel functions.
    

[

**Build agents your security team will sign off on.**

Vercel for Enterprise Apps and Agents is the platform we run our own 100+ agents on. Get a demo to put it to work at your company.

Get started



](https://vercel.com/blog/vercel-for-enterprise-apps-and-agents)

## [Link to heading](#vercel-agent)Vercel Agent

Malte announced Vercel Agent (in Private Beta), the intelligence layer for shipping on Vercel. Built on eve and the Agent Stack, it monitors your production deployments, autonomously investigates alerts and anomalies, and opens fixes in PRs for you to review and approve.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1dkgq9DyyAFJwDrPnM0Ih2%2F63b30f66f414f7ff5d1ad80826a4b756%2FMalte_4.jpeg&w=1920&q=75)

Vercel Agent's first-of-its-kind permissions model combines plan mode with granting permissions, making it safe to use for both developers and the enterprise. Rather than asking you to approve actions one-at-a-time, Vercel Agent plans what permissions it will require to complete a task and then asks you to approve them in a single, coherent step. It runs as its own identity, is read-only by default, and asks for narrow, temporary permission before it touches production.

## [Link to heading](#ship-2026-in-london-)Ship 2026 in London

### [Link to heading](#ship-week-london)Ship week London

Our first Ship outside the U.S. ran five days of events leading into the keynote, and an ice cream truck spent the week working its way across the city.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6wPhAKEwwHW4rTqxzdazS2%2F254f22ccb1af3f4cbeb689ce05bfc1f4%2FVercel-1.jpg&w=1920&q=75)

#### [Link to heading](#built-in-london-hackathon)Built in London hackathon

Two hundred builders shipped agents on Codex and Vercel in a hackathon with OpenAI. Three projects stood out. Stella hunts down unclaimed grants for London SMBs, Oscar is a co-pilot that sharpens your prompts before you send them to a model, and Phone Jail blocks distractions and roasts you when you reach for your phone anyway.

#### [Link to heading](#media,-founder,-vc,-and-cto-dinners)Media, Founder, VC, and CTO dinners

Reporters traded story ideas over a media dinner. Twelve founders talked through the future of AI in EMEA at a VC dinner. And a dozen CTOs from teams including Marks & Spencer and Currys went off the record on what it takes to build and scale agents in the enterprise.

#### [Link to heading](#day-zero-builder-night)Day Zero builder night

Day Zero, the day before the keynote, turned into a 400-person builder night. Enterprise teams Mentimeter, Okta, and MongoDB joined Vercel in a packed room alongside partners DeepMind, ElevenLabs, and Cursor.

#### [Link to heading](#ai-social-club)AI Social Club

A 160-deep waitlist formed for Malte's talk _A New Stack for a New Era of Software_, followed by Guillermo and Deliveroo's Will Shu's chat on building the agentic enterprise.

### [Link to heading](#ship-day-sessions)Ship day sessions

-   [André Balleyguier](https://x.com/andrebalg) from Anthropic showed Claude Managed Agents on Vercel, where Anthropic hosts the agent loop while every command the agent runs executes inside a Vercel Sandbox you own, keeping its filesystem, processes, and network egress in your environment.
    
-   [Tomas Jansson](https://x.com/TomasJansson) from Currys/Elkjøp showed how his team evolved a Nordic retailer's ecommerce stack from storefronts toward shopping agents in three phases, anchored by a Next.js migration that cut time to first byte by 40%. The end state is one where customer intent replaces navigation.
    
-   [Matan Kushner](https://x.com/matchai) from Vercel broke down how Vertex, Vercel's support agent, now automates 91% of support tickets and saves 5,000 engineer-hours a month without degrading as its context grows.
    
-   [Jas Sagoo](https://x.com/JasSagoo) and [Sam Bellen](https://x.com/sambego) from Auth0 made the case that getting an agent into production depends more on identity than on model quality. They demoed four standards-based identity patterns on the Vercel AI SDK, Token Vault, CIBA approvals, agents as first-class principals, and on-behalf-of delegation, so every action is scoped and traces back to a human decision instead of a shared API key.
    
-   [Abhi Sivasailam](https://x.com/_abhisivasailam) from Vercel went deep into d0, Vercel's internal data agent built on eve, which runs analyses in a sandbox and now gets 45% of its questions from other agents, rather than people.
    
-   [Romain Huet](https://x.com/romainhuet) from OpenAI showed developers how to ship faster by delegating whole tasks to Codex Cloud Agents on Vercel, and made the case that as agents become users of your product, you design for agent experience with scoped API keys, markdown docs, and plugins.
    
-   [Michał Pierzchała](https://x.com/thymikee) from Callstack demoed a QA agent that runs mobile apps on real devices, explores user flows on its own, and posts screenshots, recordings, and logs to pull requests on every PR.
    
-   [Alex Holt](https://x.com/i_am_holt) from ElevenLabs paired the ElevenLabs Speech Engine with the AI SDK to build a voice agent that can reply in under a second, take interruptions mid-sentence, and switch language mid-conversation.
    
-   [Malavika Balachandran Tadeusz](https://x.com/malavikabala) from Vercel showed the mechanics of how software can ship itself, extending the agent loop past development into testing, observability, and experimentation with primitives like Vercel Flags and Skills.
    

#### [Link to heading](#panel:-agents-in-production)Panel: Agents in production

Jeanne Grosser, COO of Vercel, moderated a panel on taking agentic workloads from prototype to production with some of the EU's top CTOs and AI leaders from frontier labs. A few highlights:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2j7nA5qMqy8kDS6YCM4qqK%2F96b0089927add00a05d6ab61e4afb058%2FJeanne_panel_7.jpeg&w=1920&q=75)

[**Arthur Viegers**](https://www.linkedin.com/in/viegers/) **(Cursor):** Autonomy should track risk, and the better an agent can assess the risk of a change, the more you can let it run on its own. Shopify and Amplitude already auto-review and merge 60-70% of low-risk PRs with no developer time, while a two-line change to authentication still goes to a human.

[**André Balleyguier**](https://x.com/andrebalg) **(Anthropic)**: To decide what an agent can do on its own, judge each action by how reversible it is and how large its blast radius is, then contain it accordingly, for example inside a self-hosted sandbox. As you grant more autonomy, observability and evals become the things that keep it safe.

[**Ryan den Rooijen**](https://uk.linkedin.com/in/ryandenrooijen) **(Currys):** The predicted death of stores never arrived, and Currys leads its markets by betting on humans. The open question for agentic commerce is which shopping journeys customers want an agent to handle and which they still want a person for.

[**Nicolas Le Pallec**](https://www.linkedin.com/in/nictd/) **(AKQA):** AI-native customer experience replaces navigation with intent. Reaching it takes three layers: a way to capture true customer intent, a brand brain that stores brand and product data for AI systems to retrieve, and generative UI that composes pages on the fly instead of serving static ones.

### [Link to heading](#fireside-chat-with-harry-stebbings)Fireside chat with Harry Stebbings

The day ended with a fireside chat between Guillermo and [Harry Stebbings](https://x.com/HarryStebbings?lang=en) from 20VC. Below are excerpts from the lightening round at the end of the discussion.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3R7DM6RMhVZXCCy0exsj4h%2Fa69f7d123867b8a621124b48a0964fb0%2FG_Ending_Keynote_5.jpeg&w=1920&q=75)

**Guillermo Rauch: What are the attributes of a founder you want to back?**

Harry Stebbings: The profile has changed completely. It used to be a sales-led CEO who could fundraise and grow customers, where personality and sales carried the company. Now I want an engineering- and product-led founder.

**Guillermo Rauch: Can you teach someone to become a voice for their industry?**

Harry Stebbings: You can, but it's hard. You have to do it for six months straight. It's a muscle you build, and you have to commit to it every day and every hour.

**Guillermo Rauch: When anyone can produce content and software, how do you stand out?**

Harry Stebbings: You come up with a new format, a new intro, a new way to tell the story and shape the work. The content itself has shifted too. We used to do shows about leadership and hiring, and nobody cares about that anymore. What lands now is a founder and AI. Those are the two things.

## [Link to heading](#ship-what's-next)Ship what's next

Thanks for joining us for Ship 2026 in London. We will see you in Berlin, New York City, Sydney, and San Francisco. If you haven't signed up yet, [there's still time to get a ticket](https://vercel.com/ship).