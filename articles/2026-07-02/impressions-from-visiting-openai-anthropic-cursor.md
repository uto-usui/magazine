---
title: "Impressions from visiting OpenAI, Anthropic, & Cursor"
source: "https://newsletter.pragmaticengineer.com/p/impressions-from-visiting-openai"
publishedDate: "2026-06-30"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

_Scheduling note: this week, I’m in San Francisco at the [AI Engineer’s World Fair](https://www.ai.engineer/worldsfair/2026), so there won’t be an edition of The Pulse on Thursday. However, tomorrow (Wednesday) there will be a special podcast episode – the lengthiest, most detailed one yet – with software engineering legend, Kent Beck._

In recent days, I’ve visited the offices of OpenAI, Anthropic, and Cursor, in San Francisco. Onsite, I talked with software folks working on the model side to learn more about how their way of building software is changing. This article is based on observations from those visits, including some new developments that I reckon may be adopted industry-wide.

We cover:

1.  **Next mega-trend? Agents running in the cloud to go mainstream.** OpenAI, Anthropic, and Cursor are all-in on cloud agents and expect demand for them to increase massively.
    
2.  **Mass adoption of coding harnesses by non-developers.** At OpenAI, more than 95% of non-engineers use Codex, not ChatGPT. Is it a sign of things to come across tech?
    
3.  **Will the main task of engineers be to make agents more efficient?** Ever more engineering work is about building environments for agents to execute more efficiently at Anthropic and Cursor.
    
4.  **Next trend? Companies aggressively optimize spend-per-token.** AI spending by software engineers is so high that it makes sense for platform teams to slash per-token cost. A case study from Coinbase.
    

Last week, Andrej Karpathy employed the phrase “new paradigm” to describe using Claude Tag – a way to mention Claude in Slack and have it kick off tasks – to work with AI:

[

![](https://substackcdn.com/image/fetch/$s_!3smK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6848d9d-a3c8-4486-8d7d-9d2ee55edd85_1180x1044.png)

](https://substackcdn.com/image/fetch/$s_!3smK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6848d9d-a3c8-4486-8d7d-9d2ee55edd85_1180x1044.png)

_Andrej Karpathy [on X](https://x.com/karpathy/status/2069547676849557725?s=20)_

There was plenty of pushback against this claim on social media; after all, it’s _just_ a Slack integration with Claude, right? I also thought this until I asked [David Hershey](https://www.linkedin.com/in/david-hershey/) at Anthropic’s Applied AI unit about it while visiting the company’s offices. He explained in detail what makes this particular Slack integration different from using something like Claude Code:

-   **No additional setup.** For Claude Code to work well, it should be connected to internal MCP servers, with the right [skills](https://code.claude.com/docs/en/skills) on your local machine. Of course, at larger companies this setup is at least partially automated, but devs often need to do tweaking.
    
-   **No “tool context-switching.**” Just mention it in Slack! Of course, opening Claude Code is not a big effort, but it’s still more work than just typing it out in Slack, and kicking off work.
    
-   **Routine work made easier.** David has “Claude playing Pokémon” as his side project. Every time a new model comes out, he kicks off a run of his script on it. Previously, this took a few minutes to set up every time, and then it ran on his machine for hours. With this new Slack integration, it’s just one command.
    

My sense is that the excitement here is less about the Slack integration itself, and more to do with the fact that it’s easy to kick off one or more AIs that no longer run on a local machine. You can skip the setup entirely.

**‘Claude Managed Agents’ is a big focus at Anthropic.** While there, I met Katelyn Lesse, head of engineering for Claude Platform, who explained that [Claude Managed Agents](https://www.anthropic.com/engineering/managed-agents) is a large, complex project which her team built over a six-month period. It’s a hosted service to execute long-running agents on various cloud providers.

Also last week, I had the opportunity to attend a private AI builders event, where Peter Steinberger discussed his workflow.

[

![](https://substackcdn.com/image/fetch/$s_!JLz_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F17f00be6-8fd8-474c-9e1f-9dab109ef86f_2048x1536.jpeg)

](https://substackcdn.com/image/fetch/$s_!JLz_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F17f00be6-8fd8-474c-9e1f-9dab109ef86f_2048x1536.jpeg)

Peter Steinberger covers how he uses AI coding agents

He talked about how he has gotten really tired of having several OpenClaw agents running on his local machine, which heat up the CPU and slow down his whole system. So, he built [Crabbox](https://crabbox.sh/) as a way to run OpenClaw agents in the cloud:

[

![](https://substackcdn.com/image/fetch/$s_!bJdZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8899addf-5c9d-4382-a501-8b27fe4e20e1_2048x1470.png)

](https://substackcdn.com/image/fetch/$s_!bJdZ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8899addf-5c9d-4382-a501-8b27fe4e20e1_2048x1470.png)

_Crabbox: remote agents for OpenClaw_

Suddenly, the same solution of cloud agents has emerged in separate places – at Anthropic and with Peter’s OpenClaw – in response to issues caused by locally-running agents. I also learned that cloud agents are becoming a big deal at OpenAI and Cursor, too.

OpenAI acquired Ona, (formerly Gitpod), the leader in cloud development environments (CDEs). Back in 2021, CDEs were built for developers to develop software faster, and they also happen to be the perfect primitive for agents to run in a sandboxed cloud environment. From the [acquisition announcement by OpenAI](https://openai.com/index/openai-to-acquire-ona/) (emphasis mine):

> “As Codex becomes more capable, its most valuable work is unfolding over hours or days, rather than minutes. **We believe people should be able to delegate more ambitious work without remaining tied to the machine where it began.** The work should continue beyond the initial session, with Codex making it possible to stay connected and check progress, provide direction, make decisions, and review results from anywhere.
> 
> Ona will help us do that. Its technology provides secure, persistent environments where agents can access the tools, systems, and context they need to make progress over time.
> 
> By bringing Ona to OpenAI, we will expand Codex beyond work tied to a single device or active session and help more organizations deploy agents securely in production.“

At OpenAI’s offices, I asked engineers there if their focus is shifting to cloud-based agents. Their answer: it very much is. This is a fairly recent development and they’re hiring engineers for the Cloud Agents team. Here’s [one job ad](https://openai.com/careers/software-engineer-cloud-agents-san-francisco/) that’s currently live:

> “We are looking for an experienced software engineer to help build and scale our cloud agent platform. You will design and operate systems for orchestrating agents at scale. You will work closely with product engineers on ChatGPT, API, and Codex to define the right abstractions and enable them to ship products quickly. Strong backend or infrastructure experience is important; experience with Python, Rust, distributed systems, cloud infrastructure, or product platforms is especially helpful.”

At Cursor, I spent an hour with cofounder Sualeh Asif (formerly the CTO, now Chief Product Officer). Cursor [released Cloud Agents](https://cursor.com/docs/cloud-agent) at the end of last year, and is starting to focus a lot more on this area. Sualeh revealed some interesting details about working with cloud agents:

-   **Agents in the cloud don’t have a way to “complain.”** With running an agent locally, when it gets warnings or errors, it surfaces them to a human in its response, who instructs it to do X or Y. However, there’s no such loop for a long-running task on the cloud! Cursor came up with the idea for the model “confess” in regular interviews, and the “confessions” are shared with the infra team to improve the agents’ environment.
    
-   **Long-running agents have their own challenges.** What happens when a node terminates, midway through; how do you move agent execution from one node to the other? There are new, nontrivial engineering challenges the team needs to solve.
    

Only yesterday, (Monday, 29 June), Cursor [launched](https://cursor.com/blog/ios-mobile-app#handoff-between-local-and-cloud) its iOS app that enables the building of software from anywhere.

[

![](https://substackcdn.com/image/fetch/$s_!4sZw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa37878e-12ce-4277-bca0-47eb6afd9fe6_930x588.png)

](https://substackcdn.com/image/fetch/$s_!4sZw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa37878e-12ce-4277-bca0-47eb6afd9fe6_930x588.png)

_Building software on a smartphone needs cloud agents. Source: [Cursor](https://cursor.com/blog/ios-mobile-app)_

This product is built on top of cloud agents to allow for long-running tasks, the company said:

> “Cloud agents run in isolated virtual machines with full development environments to test, verify, and demo work. Since they operate asynchronously with their own tools and resources, cloud agents can run for longer and iterate toward merge-ready PRs without intervention.
> 
> To take advantage of these capabilities, send a local plan to a cloud agent or move active agents to the cloud to keep running. You can move the cloud session back to your computer to test changes locally before merging”.

It figures that running AI agents in the cloud is practical: there’s less setup involved, several can run in parallel, and the cloud is a better, more convenient place for long-running agents than a personal laptop is; i.e., having to keep the lid open even when walking around the office.

But why is this happening now? My hypothesis is that a mix of factors are at play:

-   **Coding models got ‘good enough’.** Before Opus 4.5 / GPT-5.4, AI models could not really code autonomously, so running them for long tasks was pointless!
    
-   **Infra for AI coding agents has matured.** Ways of giving more context to agents have improved: things like MCP and skills became mainstream and better understood.
    
-   **The context window is bigger.** Today’s models have context windows of up to 1 million tokens, meaning that more complex instructions, code, and context can be passed in. It’s hard to have agents run for a longer time without access to a large context window.
    
-   **Cloud providers have much more GPU capacity.** Every cloud provider has been building GPU clusters in the last few years, and now there’s enough that these AI agents can make use of this infra.
    

At OpenAI, I also met [Andrew Ambrosino](https://x.com/ajambrosino), who was the first engineer on the Codex team. Our time together got off to an ideal start, with Andrew saying he needed to show me something incredible: