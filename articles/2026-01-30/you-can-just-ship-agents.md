---
title: "You can just ship agents"
source: "https://vercel.com/blog/you-can-just-ship-agents"
publishedDate: "2025-10-23"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

6 min read

Oct 23, 2025

Building agents should feel like shaping an idea rather than fighting a maze of code or infrastructure.

And we've seen this story before. A decade ago, the web moved from hand‑rolled routing and homegrown build scripts to opinionated frameworks and a platform that understood what developers were trying to do. Velocity went up, quality followed, and a generation of products appeared as if overnight.

AI is following the same arc, but the stakes and surface area are larger because what you build is no longer a set of pages. It is a system that intelligently reasons, plans, and acts.

Built on the foundations of Framework-defined Infrastructure, [Vercel AI Cloud](https://vercel.com/blog/the-ai-cloud-a-unified-platform-for-ai-workloads) provides the tooling, infrastructure primitives, developer experience, and platform to bypass the complexity. You focus entirely on what you're building, with confidence in what's powering it under the hood.

## [Link to heading](#from-single-model-calls-to-real-workflows)From single model calls to real workflows

The earliest AI features were simple.

You picked a provider, called their API, streamed a response, and stitched the result into your app. But that simplicity did not last.

Real products need to swap between models, call multiple providers at once, handle rate limits and outages, and reconcile billing and observability across a growing catalog of services. Most importantly, the logic itself evolves from a one‑off prediction into a loop that thinks over time, pulls in context, chooses tools, and tries again when it is not satisfied with the answer.

This is why we created [AI SDK](https://ai-sdk.dev/). We were building [v0](https://v0.app/), a production AI platform at scale that pushes any single provider to its limits and needed to be agile, with resiliency.

AI SDK provides a single TypeScript surface for defining agent logic, connecting tools, and switching among providers with minimal code changes. You get end-to-end type safety, a predictable agent loop, and an interface that stays stable even as the model landscape changes.

It's currently the 2nd most popular JS/TS package for AI programming, behind OpenAI's, and it's the way our own teams ship agents. It exists so you can concentrate on outcomes rather than the mechanics of calling models. Over 3 million developers download it weekly from npm.

## [Link to heading](#the-platform-that-runs-it-in-production)The platform that runs it in production

Agents need a home that treats reliability and cost as first-class concerns.

The Vercel AI Cloud is that home, bringing together model routing, elastic compute, isolated execution, and workflow durability. Each piece is simple yet powerful on its own, and together they remove the usual tradeoff between speed, safety, and confidence.

-   [AI Gateway](https://vercel.com/ai-gateway) gives you one key for many models and providers, with automatic failover and clear visibility into latency and usage
    
-   [Fluid compute](https://vercel.com/fluid) scales up quickly when your agent is thinking, then scales to zero when it waits for a response, so [you only pay for active CPU time](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute)
    
-   [Sandbox](https://vercel.com/changelog/run-untrusted-code-with-vercel-sandbox) executes generated or untrusted code in microVMs that are fast to start and safe to run
    
-   [Workflow](https://useworkflow.dev/) tooling turns reliability into something you express in code, rather than a tangle of schedulers and queues
    

## [Link to heading](#what-to-build:-productivity-that-compounds)What to build: productivity that compounds

The strongest near-term wins come from removing the tasks that slow teams down. Productivity agents do not replace judgment, but clear the runway for it.

One thing we recognized is that if you give teams the tools, they'll build what they need to reduce repetitive work so they can focus on what they want to do.

Inside Vercel, we followed a simple process to find the best candidates for automation. We asked each team what part of the job they like least and which repetitive task they wish they never had to do again. Those answers mapped directly to agents that now save real time.

Our customer experience team built a support agent that reduced tickets by one third. It resolves tickets instantly or surfaces the right answer from our docs.

Our security team built an abuse platform agent that automatically takes potentially infringing or high-risk URLs, runs visual analysis, understands the page's intention, and returns recommended actions.

Our content team built a content agent. Many of our content ideas start as a Slack thread. Now we can mention the content agent in that thread and it drafts an initial blog post based on the thread, automating the context gathering stage and providing a fast pipeline to envisioning your idea as a blog instead of starting from a blank page.

The shared pattern is time returned to the team. You shorten the path from idea to artifact, reduce waiting on busywork, and convert parallel effort into compounding progress.

The gain is more than just speed. It increases the number of bets your team can place, the surface area of experiments you can run, and the bandwidth you recover for deeper thinking.

### [Link to heading](#quality-that-rises-with-every-iteration)Quality that rises with every iteration

Productivity gains without quality is just noise. The second pillar is agents that raise the floor for correctness, security, and polish.

Quality agents help concentrate judgment, not try to eliminate it.

By standardizing the checks that are easy to miss when people are tired or rushed, they reserve human time for decisions that shape the product and the business. Over time, the bar rises because the system learns from what your team accepts, edits, or rejects.

Each agent started small, then grew in scope as trust increased. The reason that growth felt safe is the foundation. AI SDK gives a single surface for reasoning and tooling, and AI Cloud provides reliability and scale without extra work. You write the logic once and it grows from a successful one-off project into a durable part of daily operations.

## [Link to heading](#a-reliable-backbone-for-long-running-work)A reliable backbone for long-running work

Agents that plan and act over time need durability. Work often pauses for human approval or an external event, then resumes hours or days later. Traditional approaches require you to wire timers, queues, and state storage by hand, which leads to complex control flow and hard‑to‑debug edge cases.

Today we released [Workflow Development Kit](https://useworkflow.dev/). It lets you express durability directly in TypeScript. Mark boundaries that should persist and define how steps should retry or fail in a controlled way.

Behind the scenes, when deployed to Vercel, the workflow persists progress at each step. It can resume after a crash or deploy, and it exposes traces so you can see what happened at each step. You keep the clarity of async code while gaining the resilience of a production orchestrator.

## [Link to heading](#a-clear-path-to-your-first-agent)A clear path to your first agent

If you are deciding where to begin, start with an interview loop:

-   Talk to support, sales, finance, operations, marketing, and engineering
    
-   Listen for the ten- to fifteen-minute tasks that happen dozens of times a day, or the one hour tasks that block follow‑through on important work
    
-   Pick a candidate where the inputs and guardrails are clear, the output can be reviewed before it goes live, and the value of saving time is easy to measure
    
-   Use a template as a starting point, connect one or two tools, run it with a small group, and let their edits teach the system how to do better next time
    

With that first success in place, you will see the next two or three opportunities immediately. The playbook repeats and the returns stack.

## [Link to heading](#build-or-buy-without-friction)Build or buy without friction

Many teams will start by adopting a proven agent instead of building one from scratch. Whether you buy or build, look for the same things: productivity gains and quality.

That is why we are introducing an [agentic marketplace](https://vercel.com/marketplace/category/agents) where you can discover and run production‑ready agents that connect to your projects securely and extend through tools.

![Agentic marketplace for finding and running AI agents securely.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F41n745vixdHeT1yUNjC8wr%2F44a155fc825e2dba01177cbef2025405%2FCleanShot_2025-10-22_at_15.20.26_2x.png&w=1920&q=75)![Agentic marketplace for finding and running AI agents securely.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F34swjftCblRZhKMvZtIUp4%2Fd99327af6901968311e7c7739599e0d4%2FCleanShot_2025-10-22_at_15.21.02_2x.png&w=1920&q=75)

Agentic marketplace for finding and running AI agents securely.

With the new agentic marketplace, you can install an agent in the dashboard, configure the access it needs, and run it on the same platform that powers your applications. When you reach the point where custom logic will create outsized value, pick up the SDK and shape the agent to your workflows.

Some general guidance: buy when standard is enough and build when differentiation matters. The platform supports both paths.

## [Link to heading](#the-next-era)The next era

Agents will become part of every product the way frontends did. The teams that benefit first will be the ones who pair fast iteration with a platform that keeps promises about correctness, security, and total cost. The combination of AI SDK and Vercel AI Cloud gives you that platform. It is a simple surface for complex work, and it is ready when you are.

If you are ready to explore what an agent could do for your team, start with a [template](https://vercel.com/templates?type=ai), adapt it to your workflow, and deploy it on the same infrastructure that serves your customers every day. When you are ready to go deeper, the [marketplace](https://vercel.com/marketplace/category/agents), the [SDK](https://ai-sdk.dev/), and the [cloud](https://vercel.com/blog/the-ai-cloud-a-unified-platform-for-ai-workloads) will meet you where you are and scale with you as you grow.