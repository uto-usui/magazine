---
title: "How Uber uses AI for development: inside look"
source: "https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development"
publishedDate: "2026-03-10"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

_Before we start: all The Pragmatic Summit videos are now [available to view](https://www.pragmaticsummit.com/). Paid newsletter subscribers also have access [to each session with the Q&A session, as well](https://newsletter.pragmaticengineer.com/p/the-pragmatic-summit-recordings)._

I spent four years working at Uber until 2020 and experienced firsthand the company’s standout engineering culture. Uber is a company that did the speed run of going from a small startup, through hypergrowth, to being a large company facing major risk during the pandemic, when the rideshare business briefly collapsed. Today, it’s maturing as a publicly traded, profitable company, and employs almost 3,000 people in the tech function.

At the recent Pragmatic Summit in San Francisco, one of the most interesting behind-the-scenes sessions came from the ridesharing company’s principal engineer, [Ty Smith](https://www.linkedin.com/in/tyvsmith/), and director of engineering [Anshu Chada](https://www.linkedin.com/in/anshuman-chadha-8ab58717/), who [pulled back the curtain](https://youtu.be/i1tZN41VKcE) on what Uber has been doing with AI tools, internally. They were candid about the amount of work it took to build up Uber’s internal “AI stack,” why all that work was necessary, and also discussed the drawbacks as well as benefits of this rapidly spreading technology. _You can watch their [presentation at The Pragmatic Summit here](https://youtu.be/i1tZN41VKcE)._

In today’s issue, we cover:

1.  **Agentic layers & systems.** Four layers spanning an internal AI platform, context sources, industry tools, and specialized agents for testing and code review.
    
2.  **Internal tooling: MCP Gateway, Uber Agent Builder, and the AIFX CLI**. Uber built several internal tools to make it easier for devs to use AI tools, and to make internal AI agents more effective.
    
3.  **How AI changes developer workflows**. A move away from single-threaded coding in an IDE, to orchestrating multiple parallel agents. Engineers naturally gravitate toward kicking off new agents, which starts to create resource and cost challenges.
    
4.  **Minion: running background agents at scale.** Uber built Minion, an internal background agent platform with monorepo access and optimized defaults. It’s a clever abstraction layer that works well in practice.
    
5.  **New internal dev tools.** More AI-generated code means more code reviews and more noise, so Uber built Code Inbox for smart PR routing, uReview for high-signal AI code review comments, Autocover for generating 5,000+ unit tests per month, and Shepherd for managing large-scale migrations end to end.
    
6.  **Challenges**. AI adoption is slower than expected, even at a forward-thinking company like Uber. Top-down mandates are less efficient than engineers sharing their wins with peers.
    
7.  **Impact in numbers.** 92% of Uber devs use agents monthly, 31% of code is AI-authored, and 11% of pull requests opened by agents. At the same time, AI-related costs are up 6x since 2024, and token cost optimization is a growing priority.
    

Longtime readers might recall we’ve covered Uber’s engineering culture over time:

-   [Developer Experience at Uber](https://newsletter.pragmaticengineer.com/p/uber-eng-productivity) – with Uber’s founding engineer on Developer Platform, Gautam Korlam (2025)
    
-   [How Uber built its observability platform](https://newsletter.pragmaticengineer.com/p/how-uber-built-its-observability-platform) (2023)
    
-   [Inside Uber’s move to the Cloud](https://newsletter.pragmaticengineer.com/p/uber-move-to-cloud) (2023)
    
-   [How Uber is measuring engineering productivity](https://newsletter.pragmaticengineer.com/p/uber-eng-productivity) (2022)
    
-   [The Program and Platform split at Uber](https://newsletter.pragmaticengineer.com/p/program-platform-split-uber) (2021)
    

Let’s get into it:

AI is not new at Uber, but rolling it out companywide is. The company has used machine learning and AI technologies in many systems, including its Marketplace platform, which are responsible for routing and matching drivers with riders, forecasting demand, etc. What is relatively new at nearly all tech companies is the process of integrating AI across engineering and beyond.

[

![](https://substackcdn.com/image/fetch/$s_!uBE4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F596ad0d5-6c2e-41ad-8aa8-570641097308_2048x1366.png)

](https://substackcdn.com/image/fetch/$s_!uBE4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F596ad0d5-6c2e-41ad-8aa8-570641097308_2048x1366.png)

Anshu Chada at The Pragmatic Summit

The official strategy at the ridesharing giant is to become a “GenAI-powered” company:

[

![](https://substackcdn.com/image/fetch/$s_!5oGV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F41d0dfcd-ec1a-4df5-a1f8-ed6807e00f8a_1600x887.png)

](https://substackcdn.com/image/fetch/$s_!5oGV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F41d0dfcd-ec1a-4df5-a1f8-ed6807e00f8a_1600x887.png)

Uber’s company strategy now explicitly includes AI

I appreciate Uber sharing this approach openly because while most companies say that they want to be “AI-powered” – however cliche that claim might be – not all provide as much transparency.

**It’s worthwhile engineers internalizing how leadership views AI**. These folks, in general, see a tool that can bring efficiency everywhere. My take is that in some ways, AI is seen similarly to the cloud, which has been perceived as a means to reduce costs and improve the flexibility and elasticity of hardware resources. Today, AI is seen as the way to increase efficiency and lower costs, such as customer support, software development, the finance function – or any function.

Uber is focusing not on automating everything possible in engineering. Instead, it wants to:

1.  Eliminate toil: helping AI do “boring” work like upgrades, migrations, trivial bug fixes, etc.
    
2.  Free up engineers to focus more on creative work.
    

As Anshu Chada, Engineering Director on Uber’s Dev Platform, puts it:

> “What we found is when we push some of the boring stuff to AI – upgrades, migrations, bug fixes – not only does it result in much higher satisfaction from our engineers, but they’re able to push our product and create features for end users in ways that we didn’t even think were possible.”

[

![](https://substackcdn.com/image/fetch/$s_!hiin!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab25b639-5aac-479c-b130-851e6240d207_2048x1366.png)

](https://substackcdn.com/image/fetch/$s_!hiin!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab25b639-5aac-479c-b130-851e6240d207_2048x1366.png)

Ty Smith at The Pragmatic Summit

Uber’s “agentic system” for software engineering is actually made up of several systems:

[

![](https://substackcdn.com/image/fetch/$s_!m3Bk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1368c8cd-fc82-4512-91ec-452948b6294a_1600x889.png)

](https://substackcdn.com/image/fetch/$s_!m3Bk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1368c8cd-fc82-4512-91ec-452948b6294a_1600x889.png)

_Uber’s agentic systems, split across four layers_

Categories of systems:

-   **Internal AI platform.** Built on top of [Michelangelo](https://www.uber.com/en-NL/blog/michelangelo-machine-learning-platform/), Uber’s ML/AI platform. This layer provides things like a model gateway to proxy to frontier models or internally hosted models.
    
-   **Internal Uber context:** accessing Uber’s source code, engineering documentation, Slack information, JIRA tickets, etc. These all serve as “memory” for agents to use.
    
-   **Industry agents:** Uber’s approach is to enable the “latest & greatest” AI agents for engineers, so they support several tools like Claude Code, GitHub Copilot, Codex, and other clients.
    
-   **Specialized agents:** Uber’s background agent platform, the test generation platform, code review agents, and more.
    
-   **Engineering enablement:** measuring the efficiency of agents, controlling costs, and educating engineers about which tools to use.
    

MCP – the Model Context Protocol – has quickly become the standard way to connect agents and data sources with one another. A frequent analogy is that MCP is like the “USB-C interface for AI agents.” _We published a [deepdive on the MCP protocol](https://newsletter.pragmaticengineer.com/p/mcp) and covered [real-world MCP server use cases](https://newsletter.pragmaticengineer.com/p/mcp-deepdive)._

Uber put together a “tiger team” (a temporary unit that gets things done fast) to design the MCP strategy and build the central MCP gateway, which looks like this:

[

![](https://substackcdn.com/image/fetch/$s_!kRuX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fccdf1000-5c80-46fa-ac8f-9b7ffe6e71c6_1342x1050.png)

](https://substackcdn.com/image/fetch/$s_!kRuX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fccdf1000-5c80-46fa-ac8f-9b7ffe6e71c6_1342x1050.png)

Uber’s MCP gateway

This MCP gateway allows:

-   **Proxy internal endpoints to MCPs**: any internal Thrift, Protobuffer, or HTTP endpoint can be exposed as an MCP server with a simple configuration change. _Uber uses the [Apache Thrift](https://en.wikipedia.org/wiki/Apache_Thrift) protocol and [Protobuffer](https://protobuf.dev/) protocols extensively for backend service communications_
    
-   **First-party MCPs:** these are exposed as a single, consistent interface
    
-   **Third-party MCPs:** external MCP servers are also exposed via the gateway, which handles all authentication and authorization tasks.
    
-   **Platform concerns:** the gateway takes care of authorization, telemetry, and logging in one central place. Plus, it conveniently offers a unified interface to interact with any MCP.
    

The MCP gateway also provides:

-   **A registry:** to look up MCP servers, and for devs to be able to register their own.
    
-   **A sandbox:** for devs to experiment with MCP servers without long-winded setups.
    

Uber’s Agent Builder product is a no-code solution to build agents that can access Uber’s internal data sources (both MCP servers and Uber data sets), and hand off work to other agents:

[

![](https://substackcdn.com/image/fetch/$s_!rvWa!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe1c56a10-d2a9-4a4d-ab42-6963199af187_1374x1400.png)

](https://substackcdn.com/image/fetch/$s_!rvWa!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe1c56a10-d2a9-4a4d-ab42-6963199af187_1374x1400.png)

_Uber’s Agent Builder: a no-code experience to build agents_

The platform includes a tool called Agent Studio, where multi-agent workflows can be visualized, debugged, traced, versioned, and evaluated. This is how it looks:

[

![](https://substackcdn.com/image/fetch/$s_!IfQh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdfa141c4-411e-4b23-965a-cb4389588bb2_2048x1324.jpeg)

](https://substackcdn.com/image/fetch/$s_!IfQh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdfa141c4-411e-4b23-965a-cb4389588bb2_2048x1324.jpeg)

Uber’s Agent Studio: a no-code UI to create workflows using AI agents

The agents built in Agent Builder become discoverable through a registry:

[

![](https://substackcdn.com/image/fetch/$s_!7vu4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcad1a604-6dd9-47a4-bb40-34013138a9b0_1600x1010.png "Screenshot 2025-09-22 at 9.42.44 PM.png")

](https://substackcdn.com/image/fetch/$s_!7vu4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcad1a604-6dd9-47a4-bb40-34013138a9b0_1600x1010.png)

Uber’s Agent Builder registry, where existing agents can be discovered, used, and copied

Uber’s Developer Experience platform team had a few issues with deploying AI agent tooling at scale:

-   How does the company update all clients when a new version comes out? For example, if a new version of Cursor is released, how can they ensure all devs use the latest one?
    
-   How can the clients be configured with helpful defaults? Uber’s Dev Platform team might have found better defaults for tools, like more helpful models. How are these rolled out to all devs?
    
-   How can devs easily discover MCP servers and configure them for agents?
    
-   How can agents connect to Uber’s background task infrastructure?
    

The Dev Experience team built the AIFX CLI, which is the AI tooling command line used by all engineers there. Here’s what it looks like:

[

![](https://substackcdn.com/image/fetch/$s_!doa7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F701562a8-46ee-4615-b37b-394b4b9231d6_1046x672.png "Screenshot 2026-02-09 at 11.30.59 AM.png")

](https://substackcdn.com/image/fetch/$s_!doa7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F701562a8-46ee-4615-b37b-394b4b9231d6_1046x672.png)

Uber’s AIFX command line tool

This tool supports:

-   Provisioning AI agents (client tools like Claude Code, Codex, Cursor, and others)
    
-   Finding and using MCP servers
    
-   Running background agent tasks
    
-   Updating AI agents and clients to the latest versions
    

The traditional way of building software:

[

![](https://substackcdn.com/image/fetch/$s_!U_r3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb4ca227-68fc-4866-b272-ef47d824fa03_1986x876.png)

](https://substackcdn.com/image/fetch/$s_!U_r3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb4ca227-68fc-4866-b272-ef47d824fa03_1986x876.png)

_Pre-AI software development workflow. Most time is spent inside an IDE_

Devs spent some time planning, most time writing code (code authorship), and then some time in code review.

The first AI agent-based workflows were single-threaded: devs worked with a single agent in the command line or inside their IDE:

[

![](https://substackcdn.com/image/fetch/$s_!ZGpD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F24000091-eda4-4b36-b26d-edddbf33b93c_1970x876.png)

](https://substackcdn.com/image/fetch/$s_!ZGpD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F24000091-eda4-4b36-b26d-edddbf33b93c_1970x876.png)

_Early agentic workflows: working with an agent and approving plans, giving commands and corrections_

At Uber, the latest workflows which many software engineers follow are pretty different, involving parallel agents, each kicked off with their own tasks:

[

![](https://substackcdn.com/image/fetch/$s_!BvlU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F898accd3-5c2d-4a6b-94bd-11843968d5ce_1996x766.png)

](https://substackcdn.com/image/fetch/$s_!BvlU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F898accd3-5c2d-4a6b-94bd-11843968d5ce_1996x766.png)

Latest AI agent-based workflows look pretty different

As Ty explained, running multiple agents comes naturally to most devs:

> “\[Once you start using agents\] as an engineer, you’re giving a prompt and waiting for something. While it’s running and you’re waiting you’re thinking: ‘What am I going to do? Have a coffee or browse Reddit? Might as well kick off another background agent.’
> 
> And so, engineers get into this mode of running several agents at once, right? Both us \[at Uber\] and a lot of the industry is trying to push towards this.”