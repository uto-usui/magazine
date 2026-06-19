---
title: "The Agent Stack"
source: "https://vercel.com/blog/agent-stack"
publishedDate: "2026-06-17"
category: "frontend"
feedName: "Vercel"
author: "Tom Occhino"
---

Agents are designed to do almost any kind of work, from answering support tickets to writing code. No matter how complex the workload, how long it runs, or how many turns it takes to complete, every agent needs three core capabilities to operate:

-   Agents need to connect to models and route between them
    
-   Agents need to run workflows across many steps
    
-   Agents need to connect to the systems that make them useful and the platforms people use to interact with them
    

Implementing these capabilities to build a complete agent forces developers to choose between vendor lock-in with a single provider API, stitching together solutions, or building abstractions themselves.

The Agent Stack gives you all the building blocks you need to create and ship production-grade agents.

## [Link to heading](#connect-to-models)**Connect to models**

Agents don't run on a single model. Every task has a different cost, latency, and capability tradeoff, and the right call depends on what the agent is doing. It needs one interface to reach any of them, a way to route between them, and a way to stream back to the user.

[AI SDK](https://ai-sdk.dev/) gives an agent one interface to call any model, and [AI Gateway](https://vercel.com/ai-gateway) routes across hundreds of them from a single endpoint.

### [Link to heading](#ai-sdk)AI SDK

Every lab exposes model calls through their own API. Streaming, tool calls, structured output, and the shape of the request all vary, so every provider you support adds another integration to build and maintain.

[AI SDK](https://ai-sdk.dev/) is a single interface for building AI apps, agents, and frameworks. It is platform, framework, and model agnostic, and allows you to generate text, images, speech, video, and more.

call-model.ts

```
import { generateText } from 'ai';const { text } = await generateText({  model: 'anthropic/claude-sonnet-4.6',  prompt: 'Summarize the latest deploys.',});console.log(text);
```

Switch models by changing one string, not your code.

### [Link to heading](#ai-gateway)AI Gateway

Tokens are a production dependency now, the way bandwidth is for the web, and agents use different models per task. Integration across labs means separate keys and billing from providers that are expensive, rate-limited, and always changing.

[AI Gateway](https://vercel.com/ai-gateway) is the CDN for tokens, routing them on the global network we have run for over a decade. It routes each call through a single endpoint, fails over when a provider goes down, and tracks cost and usage across all of them. You pay the provider's price with no markup, and you can use your own keys.

> The last thing we want is to rebuild our infrastructure every time a new model drops.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/4YrfWTUgLzGIcZUwc6aaa0/bc842bc6c37f6094bb43155ba1bc8581/greg-chan.jpeg)
> 
> Greg Chan CTO

[SERHANT.](https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration) runs three models from a single key, sending market analysis to Claude, marketing copy to GPT, and image generation to Gemini.

## [Link to heading](#execute-complex-workflows)**Execute complex workflows**

Agents work on tasks sequentially, sometimes for minutes or hours, and those tasks often require them execute code and other operations in a secure environment.

[Workflow SDK](https://workflow-sdk.dev/) makes agent runs durable, and [Vercel Sandbox](https://vercel.com/sandbox) gives agents their own isolated VM.

### [Link to heading](#workflow-sdk)Workflow SDK

When a step fails deep in an agent workflow and there's nothing to resume from, the whole job starts over, re-running every model call you paid for. Solving for durability means building and maintaining retries, state persistence, and orchestration yourself.

[Workflow SDK](https://workflow-sdk.dev/) checkpoints every step of every job, keeps state, retries what fails, and pauses when it needs to wait on a person, a slow API, or a webhook. Runs resume from the last good step, instead of from zero.

> Questions like 'how do we make this durable?' or 'what if the user disconnects mid-generation?' used to eat up our design discussions. Now they're solved, so we can ship as fast as we experiment.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/V1c0MQJlSsmjfsthjZ0le/d926f9a9739c2dda06c5ca816761f5ef/alec-jo.jpeg)
> 
> Alec Jo Head of Applied AI @ FLORA

[FLORA](https://vercel.com/blog/how-flora-shipped-a-creative-agent-on-vercels-ai-stack) built its creative agent on Workflow SDK, where a single creative session fans out across more than fifty image models. Each step persists and retries on failure, so a long run never loses its state.

### [Link to heading](#vercel-sandbox)Vercel Sandbox

Agents read files, run commands, and write code. That freedom is what makes them capable. But without constraints, it's also a risk. The code is unreviewed, a command might be wrong, and one bad step can reach something it should never touch.

[Vercel Sandbox](https://vercel.com/sandbox) gives each agent its own microVM, a full Linux computer with a filesystem, Docker support, and its own kernel, isolated from the host and from every other sandbox. Credentials are injected only when the agent's code calls a service, so it can use what it needs without ever seeing a raw token.

run-agent-code.ts.

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create({ runtime: 'python3.13' });await sandbox.writeFiles([  { path: 'agent.py', content: Buffer.from(agentCode) },]);const result = await sandbox.runCommand('python', ['agent.py']);console.log(await result.stdout());
```

Run an agent's unreviewed code in a throwaway, isolated microVM.

Sandboxes give you and your agents the same primitive behind Vercel's billion preview deployments and six million daily builds.

## [Link to heading](#connect-to-data-and-tools)**Connect to data and tools**

An agent that only talks to models can't do much. To be useful, it has to access data and external systems, and communicate with the people using it. Both connections have to be secure.

[Vercel Connect](https://vercel.com/connect) gives agents scoped, short-lived access to data and systems. [Chat SDK](https://chat-sdk.dev/) ships agents into the apps where your users already are.

### [Link to heading](#vercel-connect)Vercel Connect

Opening a pull request, updating a record, querying a data warehouse. Asking an agent to do that work means giving it access to the platforms you use, and today that usually means a long-lived token broad enough to cover anything the agent might need do. It never expires, and no one can say which user authorized what action the agent took.

With [Vercel Connect](https://vercel.com/blog/introducing-vercel-connect), you integrate with each system once. The agent mints a short-lived token for each task, scoped only to the permissions you explicitly grant.

Every action traces from user to agent to service, so the audit log ties every call to the user the agent acted for.

Vercel Connect is the newest building block in the Agent Stack, in public beta with support for Slack, GitHub, Snowflake, Salesforce, Notion, and Linear, and any other service through OAuth or API.

### [Link to heading](#chat-sdk)Chat SDK

People don’t work in one tab. They move between Slack, GitHub, Linear, WhatsApp, and Discord, and they expect your agent in each one. Putting it there yourself means a different API integration, auth flow, and message format for every platform.

[Chat SDK](https://chat-sdk.dev/) delivers your agent to all of them. You install Chat SDK once, and it handles each platform's adapter, making your agent available where your users already are.

> Chat SDK is how one of our agents shows up in fifteen apps without building fifteen integrations.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/3SFCy0iU4C9vG1f0RCCewm/843963f6e045d9963c70ea6c7bddad31/gavril-cohen-nanoclaw.jpeg)
> 
> Gavriel Cohen Co-founder and CEO

[NanoClaw](https://github.com/nanocoai/nanoclaw) uses Chat SDK to deliver one agent across more than a dozen channels from a single codebase. A conversation can start on Slack and continue in GitHub or Linear, and the agent keeps its context across surfaces.

## [Link to heading](#eve,-the-agent-framework)e**ve, the agent framework**

Over the last year we’ve built hundreds of agents on the Agent Stack. As we repeatedly assembled these building blocks, we learned that agents have a shape.

```
agent/  agent.ts                   # the model it runs on  instructions.md            # who it is  tools/    run_sql.ts               # what it can do    post_chart.ts  skills/    revenue-definitions.md   # what it knows  subagents/    investigator/            # who it delegates to  channels/    slack.ts                 # where it lives  schedules/    monday-summary.ts        # when it acts on its own
```

A data analyst agent, readable at a glance

eve is that shape, as a framework. It’s an opinionated, open-source implementation of the Agent Stack in a single directory. Instructions live in markdown, tools in TypeScript. Durable execution, sandboxed compute, approvals, and delivery are already wired in underneath, running on the blocks above. With eve, the assembly is done, so you write the agent and nothing else.

[eve](https://vercel.com/eve) is in public beta today, and you can learn more in the [launch post](https://vercel.com/blog/introducing-eve).