---
title: "Vercel Ship AI 2025 recap"
source: "https://vercel.com/blog/ship-ai-2025-recap"
publishedDate: "2025-10-27"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

3 min read

Oct 27, 2025

Earlier this year we introduced the foundations of the [AI Cloud](https://vercel.com/blog/the-ai-cloud-a-unified-platform-for-ai-workloads): a platform for building intelligent systems that think, plan, and act. [Last week at Ship AI](https://vercel.com/ship/ai), we showed what comes next.

We launched new SDKs, infrastructure, and open source templates that make building production-ready agents as intuitive as building a standard feature. You can now define, deploy, and operate intelligent workflows on the same platform that powers your apps.

Whether you're building your first agent or delivering it to millions of users, these releases make AI development as accessible and scalable as web development.

## [Link to heading](#ai-sdk-6-adds-agent-first-architecture)AI SDK 6 adds agent-first architecture

Define an agent once and reuse it across any app or workflow. Instead of wiring together prompts and APIs for each use case, [AI SDK 6](https://ai-sdk.dev/docs/introduction/announcing-ai-sdk-6-beta) introduces an agent abstraction that works everywhere.

Now in beta, AI SDK 6 includes:

-   **Agent abstraction:** Define once, deploy everywhere
    
-   **Tool execution approval:** Built-in human-in-the-loop review
    
-   **Type-safe by design:** End-to-end type safety across models and UI
    

The new tool approval system lets you gate any action that needs human review. Define a tool with `needsApproval: true` and the agent will pause until someone confirms:

```
const weather = tool({  description: 'Get the weather in a city',  inputSchema: z.object({ city: z.string() }),  needsApproval: true, // approval gate  execute: async ({ city }) => {    const weather = await fetchWeather(city);    return weather;  },});// Agent that can call the approved tool in a loopexport const agent = new ToolLoopAgent({  model: "openai/gpt-5",  instructions: 'You are a concise weather assistant.',  tools: { weather },});
```

An agent with human-in-the-loop approval for weather queries.

You can install the beta with `npm i ai@beta` to get started.

[

**Get started with AI SDK 6**

Explore the complete documentation for agent abstractions, tool approval patterns, and migration guides.

Read the docs



](https://v6.ai-sdk.dev/docs/introduction/announcing-ai-sdk-6-beta)

## [Link to heading](#marketplace-for-agents-and-ai-tools)Marketplace for Agents and AI tools

The [Vercel Marketplace](https://vercel.com/marketplace/category/agents) now lets you discover, install, and connect production-ready agents and AI services directly to your projects.

Agents like CodeRabbit, Corridor, and Sourcery automate development workflows, while integrations with Autonoma, Braintrust, Browser Use, Chatbase, Descope, Kernel, Kubiks, and Mixedbread bring model access, analytics, and observability into one place.

![Explore AI Agents and services in the Vercel Marketplace.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FslBdFfZTA2sABqYahwJSa%2F4b52e202807730e8155cfd8b90fddbbd%2Fagents-marketplace-og-light.png&w=1920&q=75)![Explore AI Agents and services in the Vercel Marketplace.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4uIn3WfKCkO3McMbVGg07V%2Feced6ded39ede8132faec28578d6f1d8%2Fagents-marketplace-og-dark.png&w=1920&q=75)

Explore AI Agents and services in the Vercel Marketplace.

Each integration includes unified billing, native observability, and secure credentials management to improve the experience in building on a network of AI-powered tools.

[

**AI agents and services on the Vercel Marketplace**

Learn how agents and services work together, and see the full launch cohort.

Read the announcement



](https://vercel.com/blog/ai-agents-and-services-on-the-vercel-marketplace)

## [Link to heading](#workflow-development-kit-brings-reliability-as-code)Workflow Development Kit brings reliability-as-code

Long-running work needs retries, background steps, and stateful checkpoints. Traditionally, that means wiring together message queues, schedulers, and state storage. `use workflow` turns reliability into code.

Add `use workflow` to any TypeScript function to make it durable:

-   Automatically retries failed steps
    
-   Persists progress between executions
    
-   Adds built-in observability for every run
    

It's open source and runs on any platform, making async work reliable and observable. Works for AI agent loops, data pipelines, commerce workflows, or any process that needs to survive crashes and resume exactly where it stopped.

Vercel automatically detects when a function is durable and dynamically provisions the ideal infrastructure to support it in real time.

Read more about built-in durability with [Workflow Development Kit](https://vercel.com/blog/introducing-workflow).

[

**Build durable workflows**

Get started with the Workflow Development Kit documentation, examples, and quickstart guides.

Get started



](https://useworkflow.dev/)

## [Link to heading](#vercel-agent-joins-your-team)Vercel Agent joins your team

Vercel Agent is your intelligent assistant for shipping on Vercel.

The Agent reviews code, proposes validated patches, and investigates anomalies using real production data. When it detects performance or error spikes, it automatically opens an AI investigation and summarizes the cause and actionable next steps.

Now in beta, Vercel Agent includes:

-   AI code reviews with validated suggestions
    
-   Anomaly alerts that trigger automated investigations
    
-   $100 promo credit to get started
    

[

**Try Vercel Agent**

Join the beta and get $100 credit to start using AI code reviews and automated investigations.

Get started



](https://vercel.com/agent)

## [Link to heading](#python-support-with-zero-configuration)Python support with zero configuration

Python developers can now deploy on the AI Cloud with zero configuration.

Now in beta, the Vercel Python SDK runs frameworks like FastAPI and Flask natively on Vercel, while interacting with platform primitives such as Sandboxes, Blob storage, and Runtime Cache.

You can install the beta with `pip install vercel` to get started.

[

**Zero-config Python backends on Vercel**

Learn how to deploy FastAPI, Flask, and other Python frameworks with zero configuration.

Learn more



](https://vercel.com/changelog/vercel-python-sdk-in-beta)

## [Link to heading](#an-agent-on-every-desk)An Agent on every desk

We believe every company will run its own agents. Purpose-built assistants that accelerate real work. Our new program, An Agent on Every Desk, helps teams ship their first one.

We'll guide you from idea to production: identifying high-value workflows, providing starter templates, and getting an agent live fast.

[

**Join the program**

Work with our team to build and deploy your first production agent.

Express interest



](https://vercel.com/go/an-agent-on-every-desk)

### [Link to heading](#open-source-lead-agent)Open source lead agent

The new OSS lead agent helps go-to-market teams research and qualify inbound leads automatically.

Built with [Next.js](https://nextjs.org/), [AI SDK](https://ai-sdk.dev/), [Workflow DevKit](https://useworkflow.dev/), and the [Vercel Slack Adapter](https://vercel.com/marketplace/slack), it demonstrates how teams can combine open source components to automate daily work.

[

**Deploy the lead agent**

Clone the template and customize it for your go-to-market workflows.

View template



](https://vercel.com/oss-lead-agent)

## [Link to heading](#open-source-data-analyst-agent)Open source data analyst agent

The OSS Data Analyst Agent brings natural language analytics to your team.

It connects Slack and SQL so anyone can ask questions about their data and get instant, query-driven answers. It's a reference architecture for building your own text-to-SQL agents with the AI SDK.

[

**Deploy the data analyst agent**

Get the template and connect it to your database and Slack workspace.

View template



](https://vercel.com/oss-data-analyst)

### [Link to heading](#the-future-of-the-ai-cloud)The future of the AI Cloud

Ship AI brought the tools for moving from calling models to building agents that actually work in production. The SDK handles the abstraction. Workflows make things durable. The marketplace gives you ready-made agents or the services to build your own. Python support means your backend frameworks run here too.

The pieces fit together because they solve the same problem: making agent development feel like web development. Define your logic, deploy it, let the platform handle the rest.

You can just ship agents.