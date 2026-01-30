---
title: "The AI Cloud: A unified platform for AI workloads"
source: "https://vercel.com/blog/the-ai-cloud-a-unified-platform-for-ai-workloads"
publishedDate: "2025-07-10"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

6 min read

Jul 10, 2025

The same principles and ease of use you expect from Vercel, now for your agentic applications.

For over a decade, Vercel has helped teams develop, preview, and ship everything from static sites to full-stack apps. That mission shaped the Frontend Cloud, now relied on by millions of developers and powering some of the largest sites and apps in the world.

Now, AI is changing what and how we build. Interfaces are becoming conversations and workflows are becoming autonomous.

We've seen this firsthand while building v0 and working with AI teams like Browserbase and Decagon. The pattern is clear: developers need expanded tools, new infrastructure primitives, and even more protections for their intelligent, agent-powered applications.

At [Vercel Ship](https://vercel.com/blog/vercel-ship-2025-recap), we introduced the AI Cloud: a unified platform that lets teams build AI features and apps with the right tools to stay flexible, move fast, and be secure, all while focusing on their products, not infrastructure.

The AI Cloud introduces new AI-first tools and primitives, like:

-   **AI SDK and AI Gateway** to integrate with any model or tool
    
-   **Fluid compute with Active CPU pricing** for high-concurrency, low-latency, cost-efficient AI execution
    
-   **Tool support, MCP servers, and queues,** for autonomous actions and background task execution
    
-   **Secure sandboxes** to run untrusted agent-generated code
    

These solutions all work together so teams can build and iterate on anything from conversational AI frontends to an army of end-to-end autonomous agents, without infrastructure or additional resource overhead.

[

**See what the AI Cloud can do**

Hear Guillermo Rauch introduce the AI Cloud at Vercel Ship 2025.

Watch the Keynote



](https://vercel.com/ship)

## [Link to heading](#a-unified,-self-driving-platform)A unified, self-driving platform

What makes the AI Cloud powerful is the same principle that made the Frontend Cloud successful: infrastructure should emerge from code, not manual configuration. [Framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) turns your application logic into running cloud services, automatically. This is even more important as we see agents and [AI shipping more code than ever before](https://research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead/#:~:text=with%20an%20acceptance%20rate%20by%20software%20engineers%20of%2037%25%5B1%5D%20assisting%20in%20the%20completion%20of%2050%25%20of%20code%20characters%5B2%5D.%20In%20other%20words%2C%20the%20same%20amount%20of%20characters%20in%20the%20code%20are%20now%20completed%20with%20AI%2Dbased%20assistance%20as%20are%20manually%20typed%20by%20developers.).

With the AI Cloud, you (or your agents) can build AI apps without ever touching low-level infrastructure.

Take [AI SDK](https://ai-sdk.dev/), which makes it easy to work with LLMs by standardizing code across the many providers and lets you swap models without changing code. AI inference is made simple by generalizing many provider-specific processes.

When the AI SDK is deployed in a Vercel application, calls are routed to the appropriate vendor. They can also go through the [AI Gateway](https://vercel.com/blog/ai-gateway), a global provider-agnostic layer that manages API keys, provider accounts, and improves availability with retries, fallbacks, and performance optimizations.

app/api/flights/route.ts

```
import { streamText, StreamingTextResponse, tool } from 'ai';import { z } from 'zod';export async function POST(req: Request) {  const { prompt } = await req.json();  const result = await streamText({    model: 'openai/gpt-4o', // This will access the model via AI Gateway    prompt,    tools: {      weather: tool({        description: 'Get the weather in a location',        parameters: z.object({          location: z.string()        }),        execute: async ({ location }) => {          const res = await fetch(            `https://api.weatherapi.com/v1/current.json?q=${location}`          );          const data = await res.json();          return { location, weather: data };        },      }),    },  });  return new StreamingTextResponse(result);}
```

A sample AI API endpoint using AI SDK and AI Gateway. Its structure resembles a traditional endpoint with an easy package to accept a prompt from the frontend and stream a response back.

In this example, AI SDK defines the interaction, while AI Gateway handles the execution. Together, they reduce the overhead of building and scaling AI features that can actually reason and derive intent.

These AI calls often run as simple functions that must scale instantly. But unlike typical workloads, LLM interactions frequently involve wait times and long idle periods. This breaks the operational model of traditional serverless, which isn't efficient during inactivity. AI workloads need a compute model that handles both burst and idle with minimal overhead.

### [Link to heading](#ai-cloud-compute)AI Cloud compute

At the core of the AI Cloud is [Fluid compute](https://vercel.com/fluid), which optimizes for these workloads while eliminating traditional serverless and server tradeoffs such as cold starts, manual scaling, overprovisioning, and inefficient concurrency.

Fluid deploys with the serverless model while intelligently reusing existing resources before scaling to create new ones, and with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute), resources are not only reduced, but you only pay compute rates when your code is actively executing.

For workloads with high idle time, such as AI inference, agents, or MCP servers that wait on external responses, this resource efficiency can reduce costs by up to 90% compared to traditional serverless. This efficiency also applies during an AI agent's tool use.

### [Link to heading](#tool-execution)Tool execution

After reasoning, where intent is identified and plans are generated, agents often execute tools. AI SDK manages this process: registering tools, exposing them to the model, and handling execution, all running on Fluid compute.

Tools can be executed sequentially or in parallel, depending on the task. These tool calls may be simple functions running in [Vercel Functions](https://vercel.com/docs/functions) or routed to MCP servers, a protocol introduced by Anthropic and supported by Vercel.

### [Link to heading](#simplified-mcp-server-support)Simplified MCP server support

MCP servers can resemble API routes in many ways: a single endpoint that can run as Functions, but under the hood they're like a tailored toolkit that helps an AI achieve a particular task. There may be multiple APIs and other business logic used behind the scenes for a single MCP server.

The Vercel MCP adapter simplifies building MCP servers on Vercel. With the [`@vercel/mcp-adapter` package](https://www.npmjs.com/package/@vercel/mcp-adapter), new API endpoints can be created and existing ones transformed to serve MCP and easily provide agentic access to essential app functions.

[

**MCP Server with Next.js**

Get started building your first MCP server on Vercel.

Deploy now



](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)

### [Link to heading](#offloading-tasks-to-the-background)Offloading tasks to the background

For long-running or async tasks, [Vercel Queues](https://vercel.com/changelog/vercel-queues-is-now-in-limited-beta) handle the orchestration. Agents can fan out execution, retry failed steps, or offload background work without blocking.

After a potentially long sequence of actions, tool invocations, and evaluations, the system returns a final output. The output at this point could simply be text or generated content that's returned to the user.

### [Link to heading](#secure-execution-with-vercel-sandbox)Secure execution with Vercel Sandbox

Sometimes actions involve running code that was generated by the agent. As this code hasn't been validated by users, it's considered untrusted. It may be completely harmless, but this code shouldn't have the same privileged access to your Vercel deployments and their associated environment variables, API keys, and more.

This is where [Vercel Sandbox](https://vercel.com/changelog/run-untrusted-code-with-vercel-sandbox) comes in. Running on Fluid compute with Active CPU pricing, agents launch ephemeral, isolated servers for untrusted code. VMs spin up fast, run securely, provide user-accessible URLs, then terminate cleanly.

Sandbox supports multiple runtimes including Node.js and Python, comes with common packages pre-installed, and allows installing additional packages with `sudo` access.

```
const sandbox = await Sandbox.create({  source: {    url: "https://github.com/user/code-repo.git",    type: "git"  },  runtime: "node22",  timeout: ms("2m"),});
```

Sandbox code is simple with an SDK that grants control over initial creation, updates, and termination.

### [Link to heading](#observability-into-agentic-workloads)Observability into agentic workloads

As agentic applications grow and agents become more autonomous, the context, memory, and evolving reasoning chains they generate need to be inspectable and measurable. Each step in those chains requires visibility.

Because agentic systems often loop or retry, it’s not enough to view single requests in isolation, and debugging a single agentic run might not surface critical errors or areas for performance optimizations.

[Vercel Observability](https://vercel.com/docs/observability) gives developers the tools to understand their apps holistically, making it easy to debug slow agents, identify hotspots, and monitor for regressions.

### [Link to heading](#securing-high-value,-critical-routes)Securing high-value, critical routes

These agentic workloads are inherently valuable operations that need protection. The stakes are higher as agentic workloads increase in autonomy and carry direct, tangible costs with LLM providers.

Modern sophisticated bots execute JavaScript, solve CAPTCHAs, and navigate interfaces like real users. Traditional defenses like checking headers or rate limits aren't enough against automation that targets expensive operations like agentic workflows.

﻿[Vercel BotID](https://vercel.com/blog/introducing-botid-5xX3Z8QOTkRRRSP3ccqEDH) is an invisible CAPTCHA that stops browser automation before it reaches your backend. It protects critical routes where automated abuse has real cost: endpoints that trigger LLM calls or agent workflows.

BotID is part of Vercel's larger [Bot Management](https://vercel.com/docs/bot-management) suite of tools that range from protecting entire applications from voluminous spray-and-pray DDoS attacks, to the most sophisticated, stealthy targeted application attacks.

[

**Get started with Vercel BotID**

Detect and stop advanced bots before they reach your most sensitive routes like login, checkout, AI agents, and APIs. Easy to implement, hard to bypass.

Get started



](https://vercel.com/docs/botid/get-started)

## [Link to heading](#the-ai-cloud,-powered-by-vercel)The AI Cloud, powered by Vercel

The web is at the early stages of this major shift: building on the decades-long move from purely static to highly dynamic, it is now entering the generative, agentic era.

Some companies launch as AI-native from day one. Others gradually embed AI into existing applications. Either way, every industry will build with AI, from ecommerce to education to finance. This means new conversational frontends and generative backends that create content, insights, and decisions on demand, including optimizing for [AI crawlers](https://vercel.com/blog/the-rise-of-the-ai-crawler) and [LLM SEO](https://vercel.com/blog/how-were-adapting-seo-for-llms-and-ai-search).

Vercel is where modern apps are built and shipped. From the Frontend Cloud to the AI Cloud, teams operate with the speed, security, and simplicity they expect. But now, with the power of AI. The AI Cloud already powers some of the most ambitious platforms in production. We're here for the next era of the web, where developers don't just write apps. They define agents.

[

**Let us know how we can help**

Whether you're starting a migration, need help optimizing, or want to add AI to your apps and workflows, we're here to partner with you.

Contact Us



](https://vercel.com/contact/sales)