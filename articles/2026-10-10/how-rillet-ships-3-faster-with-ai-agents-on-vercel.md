---
title: "How Rillet ships 3× faster with AI agents on Vercel"
source: "https://vercel.com/blog/how-rillet-ships-3-faster-with-ai-agents-on-vercel"
publishedDate: "2026-10-09"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

## [Copy link to heading](#rillet-on-vercel)Rillet on Vercel

-   Tripled shipping rate in three months with eve agents deployed on Vercel
    
-   Two-person team closed 800+ Linear tickets in its first 4 months
    
-   Builder access via Enterprise Managed Users, SSO, and Directory Sync
    
-   Ships customer-requested changes to production in as little as two hours
    
-   Gives every builder access to models through [AI Gateway](https://vercel.com/ai-gateway)
    

[Rillet](https://www.rillet.com/) is an AI-native enterprise resource planning (ERP) platform. Their AI agents do accounting work inside a real-time general ledger, with human approval and a full audit trail. Rillet serves more than 600 customers working toward a zero-day close, reducing the time needed to close their books at month-end.

A product that helps customers close their books in near real time needs a team that can respond quickly to their requests. Anthony Liang heads Rillet’s two-person frontend team, formed only a few months ago, and leads the push to put agents to work across internal workflows, from shipping customer fixes to reviewing code.

The team builds agents with eve and runs them on Vercel, using Vercel Connect to give them access to Slack and Linear, while AI Gateway routes their model requests.

## [Copy link to heading](#standardizing-every-internal-agent-on-eve)Standardizing every internal agent on eve

Anthony had been building AI applications since the GPT-3.5 era and had evaluated nearly every agent framework on the market, from the major model providers' SDKs to the open-source ecosystem. Each gave him primitives for the model loop but left him to decide where instructions lived, how tools registered, and how an agent reached Slack and GitHub.

Anthony could make those choices for his own agents, but he wanted conventions everyone at Rillet could follow, including people who had never touched TypeScript.

### [Copy link to heading](#an-agent-is-a-directory)An agent is a directory

Anthony chose [eve](https://eve.dev/), Vercel's open-source agent framework for building, running, and scaling agents that keeps instructions, tools, and skills together in one directory.

```
agent/├── agent.ts             # Model and configuration├── instructions.md      # Instructions for the agent├── tools/               # Tools the agent can call├── skills/              # Knowledge and procedures├── subagents/           # Agents it can delegate to├── channels/            # Where people interact with it└── schedules/           # When it runs on its own
```

Example directory structure.

People who know what an agent should do can shape its behavior through markdown instructions and skills without writing code, while its tools live in TypeScript files whose names become the API. Once an agent is ready, it can move from a laptop to Vercel without changing how it behaves. Rillet manages all of these deployments in one company-controlled Vercel organization.

> Once I saw eve, it just made total sense. It's like how I felt when I first started using Next.js. It makes it very easy for someone to come on board and understand how an agent is built.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/67rZG7dy4uMRTqWZK9nFDr/73d2ddc5e6ca49f0e89d543afce829e3/24eff5a6-c9cf-4299-bd20-58c6959503c7.png)Anthony Liang Software Engineer @ Rillet

Rillet uses [Vercel Connect](https://vercel.com/kb/guide/vercel-connect) to give its agents access to Slack and Linear through reusable connections the team can attach to the projects that need them. Connect supplies short-lived tokens at runtime and handles refresh through its SDK, keeping long-lived provider secrets out of each application and giving builders fewer credentials to maintain. If a runtime token leaks, its expiration limits how long it can be used.

Anthony's team built a Slack bot that picks up tickets and opens PRs, while others run agents for incident analysis and Linear board management. Shared conventions make that work easier to reuse, and agent building has spread beyond engineering.

## [Copy link to heading](#running-customer-requests-through-agents,-end-to-end)Running customer requests through agents, end to end

Before, when a customer would ask for a change, and the request would scatter across a Linear ticket, a Slack thread, and a catch-up conversation with an engineer. By the time anyone had the full context, the fastest part of the job was writing the code.

### [Copy link to heading](#the-person-closest-to-the-customer-ships-the-fix)The person closest to the customer ships the fix

Rillet's customer success team now opens a Chrome extension alongside the Rillet app, highlights what the customer is seeing, and describes the change. The extension's eve agent captures the context and, if the change is safe and well-scoped, hands it to a coding agent that writes the spec, makes the change, and opens a pull request assigned to Anthony. Agents also spin up a browser in a sandbox to test the change and attach screenshots as proof, while Anthony reviews the pull request and merges it. If he requests changes, the agent resumes its session and addresses them.

Rillet's CEO recently posted that the company shipped more in the past few weeks than in the entire first half of 2026, on top of tripling its shipping rate over the prior three months. Rillet’s CPA team ships customer requests through its in-house agent, Nebula, within two hours of the ask. As one of their customers put it, Rillet has "completely ruined my expectations" for how quickly software vendors should make changes.

## [Copy link to heading](#using-ai-gateway-to-give-every-builder-every-model)Using AI Gateway to give every builder every model

As more people at Rillet started building agents, connecting directly to Anthropic and OpenAI meant configuring access to each model provider separately. [AI Gateway](https://vercel.com/docs/ai-gateway) routes model requests to both through one integration, so builders can add an agent without setting up separate provider connections.

### [Copy link to heading](#the-model-is-a-string)The model is a string

In eve, builders choose the model by setting a string in the agent’s configuration:

agent.ts

```
import { defineAgent } from "eve";export default defineAgent({  model: "zai/glm-5.3",});
```

Example configuration using GLM 5.3.

Agents deployed on Vercel authenticate to AI Gateway automatically. Builders can try different models for a task by changing the model string, without changing the integration. Usage breakdowns show Anthony which models the team uses and what they cost, helping him track spending and choose models as more people build autonomous agents.

> Having access to every model with the same key is huge. And the visibility into usage is very helpful: seeing what people are doing, what they're using, setting limits. Especially as we build autonomous agents.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/67rZG7dy4uMRTqWZK9nFDr/73d2ddc5e6ca49f0e89d543afce829e3/24eff5a6-c9cf-4299-bd20-58c6959503c7.png)Anthony Liang Software Engineer @ Rillet

## [Copy link to heading](#managing-builder-access-through-enterprise-managed-users)Managing builder access through Enterprise Managed Users

As more people are building agents, Rillet also needs to manage their access to Vercel. With [Enterprise Managed Users](https://vercel.com/docs/security/enterprise-managed-users), builders sign in through Google Workspace single sign-on using company-managed accounts rather than personal ones. [Directory Sync](https://vercel.com/docs/directory-sync) adds and removes their access based on assignments in Rillet’s identity provider, so account administration follows the company’s directory.

> With Vercel, we can ship fast while keeping accounts company-managed, access automated, and internal tools private by default. Knowing we can control and audit that environment helps me sleep better at night.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/5KNds8tJvFrqdnUpKEpmpw/083a7e48fca00b70ad886449311e7b63/d4361006-654c-4137-94a4-0b6c25bc3207.png)Ed Hirst Founding IT Lead @ Rillet

Rillet set up Enterprise Managed Users on its own and moved builders from personal to company-managed accounts in one transition, bringing their Vercel sign-in and account access under Rillet’s identity provider.

### [Copy link to heading](#what's-next-)What's next

Anthony is building what Rillet thinks of as its agent factory, so bigger features can follow the same pipeline as small fixes. One agent writes PRDs and technical specs, while another connects to Rillet's Linear boards, Miro diagrams, and knowledge base to give other agents the context they need. With subagents and delegation built into eve, Anthony can add these specialized agents as directories within the same framework.

For a company whose mission is collapsing month-long processes into zero days, building agents in eve and running them on Vercel brings that same focus on speed to its internal tooling.

> Vercel's been great as a one-stop shop for everything you need to test things, try out new ideas, and experiment. Being able to deploy your agent, have it built in less than a minute, and see changes that quickly has been huge.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/67rZG7dy4uMRTqWZK9nFDr/73d2ddc5e6ca49f0e89d543afce829e3/24eff5a6-c9cf-4299-bd20-58c6959503c7.png)Anthony Liang Software Engineer @ Rillet

**About Rillet:** [Rillet](https://www.rillet.com/) is the AI-native ERP built for the era of agentic finance. By combining a real-time general ledger, continuous close architecture, and AI agents in one system, Rillet enables humans and agents to run finance together with full context, controls, and auditability.