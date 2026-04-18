---
title: "A new programming model for durable execution"
source: "https://vercel.com/blog/a-new-programming-model-for-durable-execution"
publishedDate: "2026-04-16"
category: "frontend"
feedName: "Vercel"
author: "Pranay Prakash"
---

9 min read

Apr 16, 2026

Vercel Workflows is the easiest way to write long-running, durable, reliable, and observable agents and backends.

The gap between prototypes and production-ready systems is huge. Code that's trivial to run locally falls apart the moment it needs to handle failures, restarts, and real traffic.

Framework defined infrastructure solved this for web applications. When you deploy, Vercel infers the right configuration from the app itself. Workflows extends that model to long-running systems. Instead of managing a separate codebase for orchestration, durable workflows are an extension of your application code.

Since launching in beta in October 2025, Workflows has processed over 100 million runs and over 500 million steps across more than 1,500 customers, with more than 200K npm downloads every week.

Today, [Vercel Workflows](https://vercel.com/workflows) is generally available.

### [Link to heading](#built-for-agents,-backends,-and-long-running-workloads)**Built for agents, backends, and long-running workloads**

Workflows is built for any workload that doesn’t fit in a single request.

**Agents**: Deep integration with the AI SDK enables [infinitely long running durable agents](https://useworkflow.dev/docs/ai) that can maintain state, tools, and handle external events or interruptions. AI SDK v7 is taking this further with [WorkflowAgent.](https://ai-sdk.dev/v7/docs/agents/workflow-agent#workflowagent)

**Backends**: [Workflow SDK](https://workflow-sdk.dev/docs/getting-started) proved this programming model in TypeScript codebases, and we're bringing it to a new language. The [Workflow Python SDK](https://workflow-sdk.dev/docs/getting-started/python) is now in beta.

**Long-running workloads**: Workflows can be used for any function that needs to execute reliably, including multi-step onboarding flows, payment processing, ETL pipelines, or any backend work that would otherwise require you to wire up your own queues and retry logic.

## [Link to heading](#how-it-works)**How it works**

Shipping a reliable long-running process to production typically means splitting your code across queues, workers, status tables, retry logic, and monitoring. Dedicated orchestration services add yet another layer with long-lived background processes you run in Kubernetes, scale horizontally, and dedicate engineering time to keep healthy. They are distributed systems you pay for on top of your core application compute.

Workflows eliminates the orchestrator entirely. All coordination runs in your application code, not a separate service. The infrastructure is built on three components:

-   [**Event log**:](https://useworkflow.dev/docs/how-it-works/event-sourcing) records every step input, output, stream chunk, sleep, hook, and error in a run. It is the single source of truth for execution state and history.
    
-   **Your functions on** [**Fluid compute**](https://vercel.com/docs/fluid-compute): each step runs as its own function invocation on Fluid compute. The workflow library inside each function handles dequeueing, state loading, encryption, execution, and handoff to the next step.
    
-   [**Vercel Queues**](https://vercel.com/docs/queues): each function enqueues the next step automatically. Queues run automatically on Vercel, in your own Postgres, or in-memory locally.
    

Because there is no separate orchestration service, you only pay for the compute your steps actually use when functions are running.

### [Link to heading](#the-programming-model:-your-code-is-the-orchestrator)**The programming model: your code is the orchestrator**

Workflows lets you write long-running functions in TypeScript or Python using normal control flow and a small API surface.

In TypeScript you [create a workflow](https://useworkflow.dev/docs/foundations/workflows-and-steps) with `"use workflow"`, and isolate units of work with `"use step"`. Workflows handles everything underneath: queues, retries, step isolation, observability, durable state, and streaming.

```
export async function createSite(input: { userId: string }) {  "use workflow"  const profile = await fetchUserProfile(input.userId)  const plan = await generateSitePlan(profile)  const site = await buildSite(plan)  return site}async function fetchUserProfile(userId: string) {  "use step"  return db.user.findUnique({ where: { id: userId } })}async function generateSitePlan(profile: unknown) {  "use step"  return callModel({ prompt: `Generate a site plan for ${JSON.stringify(profile)}` })}async function buildSite(plan: unknown) {  "use step"  return provisionSite(plan)}
```

A workflow that creates a site in three durable steps. "use workflow" marks the function as a workflow, and "use step" isolates each unit of work with automatic retries, persistence, and observability.

At first glance, this looks like one function calling another, and that is exactly the point. Each step gets isolation, retries, persistence, observability, and durable continuation automatically. The orchestration lives in the application code, not in a separate system.

A Next.js app with the Workflow SDK installed runs the same way locally as it does in production at scale, with the same code, real guarantees, and no separate orchestration tooling to configure.

### [Link to heading](#vercel-workflows-in-action:-guillermo's-infinite-chess-game)**Vercel Workflows in action: Guillermo's infinite chess game**

One of the best examples from beta testing is [Guillermo's infinite chess game](https://v0-chess-match.vercel.app/). It continuously pits models against each other, feeding them the current board state, validating moves, rendering the game, and running matches indefinitely, turn after turn.

Each chess match is a workflow run, and when a game ends, the [last step starts a new run](https://useworkflow.dev/docs/foundations/common-patterns#background-execution-via-step). Infinity is modeled as recursion across runs.

Because every workflow run is pegged to a specific deployment, one game can safely finish on the version it started with while the next game begins on the latest deployment. That creates a clean upgrade boundary where each game remains stable within its version, and every new game picks up the latest improvements.

If the backend code powering the chess match crashes or encounters transient errors, the workflow run automatically retries it without causing the application to fail.

## [Link to heading](#why-workflows-matters-for-agents)**Why Workflows matters for agents**

Workflows is purpose-built for the agentic era. It is the only security-first, durable SDK made for building agents and made for agents to build with.

### [Link to heading](#secure-by-default)**Secure by default**

By default, Vercel Workflows [encrypts all data](https://useworkflow.dev/docs/how-it-works/encryption), including step inputs, outputs, and stream chunks, before they leave your deployment. Nothing is readable in transit or at rest outside your environment, and decryption only happens inside the deployment running the workflow.

Encryption is built in and free, not a security add-on you configure after the fact. This is possible because Workflows owns both orchestration and execution in the same environment, so encryption can happen automatically without a separate service or any extra infrastructure on your end.

When you need to inspect encrypted data through the dashboard or `workflow` CLI, explicit decryption is supported with a full [audit trail](https://vercel.com/docs/audit-log).

### [Link to heading](#for-building-agents)**For building agents**

Agents need more than longer timeouts, they need durable execution, reliable orchestration, resumable streams, and enough headroom to move large payloads through long-running systems.

**Durable agents**

Workflow SDK and AI SDK share a [deep integration](https://workflow-sdk.dev/docs/ai) that gives agents durable execution, tool calling, state management, and the ability to handle external events or interruptions gracefully. Tools can be implemented as workflow steps for automatic retries or as regular workflow-level logic that uses primitives like `sleep` and hooks to suspend and resume cleanly. Agents process tool calls iteratively until completion, surviving restarts and failures along the way.

AI SDK v7 takes this further with [`WorkflowAgent`](https://ai-sdk.dev/v7/docs/agents/workflow-agent#workflowagent), a fully native implementation.

**Durable streams**

[Durable streams](https://useworkflow.dev/docs/foundations/streaming) persist agent output. `getWritable()` gives you a persistent stream that multiple clients can connect to, disconnect from, reconnect to later, and resume from any point. The workflow keeps running even if the user closes the browser. When they come back, the client reconnects and continues exactly where the stream left off, no Redis or custom pub/sub required.

In this example, a flight booking agent streams itinerary updates as it plans a trip and searches for flights:

```
import { DurableAgent } from "@workflow/ai/agent";import { getWritable } from "workflow";import type { UIMessage, UIMessageChunk } from "ai";export async function bookingAgent(messages: UIMessage[]) {  "use workflow";  const writable = getWritable<UIMessageChunk>();  const agent = new DurableAgent({    model: "anthropic/claude-haiku-4.5",    system: "You are a flight booking assistant.",    tools: { searchFlights },  });  await agent.stream({ messages, writable });}async function searchFlights(args: { from: string; to: string }) {  "use step";  const result = { flights: [{ from: args.from, to: args.to, price: 199 }] };  return result;}
```

A booking agent that streams durable output to the client. Tools marked with "use step" get automatic retries and persistence.

The API route starts the workflow and returns the durable stream to the client. The run ID in the response header is what enables reconnection:

```
// app/api/chat/route.tsimport { createUIMessageStreamResponse, type UIMessage } from "ai";import { start } from "workflow/api";import { bookingAgent } from "@/workflows/booking-agent";export async function POST(req: Request) {  const { messages }: { messages: UIMessage[] } = await req.json();  const run = await start(bookingAgent, [messages]);  return createUIMessageStreamResponse({    stream: run.readable,    headers: { "x-workflow-run-id": run.runId },  });}
```

The API route starts the workflow and returns the durable stream. The run ID enables reconnection.

If the user closes the browser mid-search, the workflow keeps running. When they re-connect, or share the link with a different user who opens the session, `WorkflowChatTransport` resumes the stream from the last event the client received.

```
"use client";import { useChat } from "@ai-sdk/react";import { WorkflowChatTransport } from "@workflow/ai";export function BookingChat() {  const { messages, sendMessage } = useChat({    transport: new WorkflowChatTransport(),  });  // ...}
```

The client reads the stream and resumes from where it left off if the connection is interrupted.

**Hooks and sleep**

Workflows can suspend without incurring any compute.

[Hooks](https://workflow-sdk.dev/docs/foundations/hooks) let a workflow wait for an external trigger to resume. Hooks are useful for building [human-in-the-loop approval flows](https://useworkflow.dev/docs/ai/human-in-the-loop) and integrating with third-party services.

[Sleep](https://workflow-sdk.dev/docs/ai/sleep-and-delays#adding-a-sleep-tool) lets a workflow suspend for any specified amount of time, from minutes to days or months. Sleep is useful for email drip campaigns and date-sensitive use cases.

**Limits built for multimodal agents**

Workflows [supports](https://vercel.com/docs/workflow/pricing#workflow-run-limits) 50 MB per step payload and up to 2 GB across an entire run, with generous event limits. That's plenty of headroom for agents passing images, video, and large context across long execution chains.

## [Link to heading](#for-agents-to-build-with)**For agents to build with**

Workflows is not just great for building agents. It is also designed for coding agents to use directly.

**The programming model is agent-friendly**

Workflows code is ordinary TypeScript. A workflow is a function, a step is a function, and because orchestration lives in the application code itself, a coding agent only has to reason about one system. There is no separate orchestration layer to configure and no worker fleet to manage.

**Full observability from the CLI**

Workflow SDK ships with a [CLI](https://useworkflow.dev/docs/observability) that any agent can use for inspecting and debugging your workflow runs. If a human can inspect runs in the dashboard, an agent can inspect the same workflow state from the terminal.

```
npx workflow inspect runs <wrun_id> 
```

This works locally with no config. For production deployments on Vercel, the CLI reuses your `vercel` CLI authentication with `--backend vercel` to make authenticated requests against the Vercel API. Agents can investigate state, inspect runs, and debug behavior without leaving the terminal.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3F1dAuczZNavnQQ1Si8Zej%2F78bb129bd12cf4f8e6414da3be8d0026%2FGroup_16.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4kgWzhq69kdgeFaVmGgaN3%2Ff85a8dc6e4a746c1e4dbe4f8e76a8aa7%2FGroup_17.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5WGlLm6wSSOs79zJ80hlM2%2F2fef9736cbda2abf400d999f2b2944dc%2FGroup_18.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F14OUegTrucalrT6Ay2nplI%2F4fb5105a5f01b2f0774f3568a97d786a%2FGroup_19.png&w=1920&q=75)

**Workflows ships with a skill**

Agents can install the [Workflows skill](https://skills.sh/vercel/workflow/workflow) directly and use it to scaffold, debug, and manage workflows without hand-written product knowledge.

```
npx skills add vercel/workflow 
```

## [Link to heading](#run-workflows-anywhere)**Run Workflows anywhere**

Workflow SDK [is open source](https://github.com/vercel/workflow) and part of the same family as AI SDK and Chat SDK. The `workflow` npm package goes stable at GA with 200K+ weekly downloads and 75+ releases shipped during beta.

[Worlds](https://useworkflow.dev/worlds) are the adapter system that makes Workflows portable. Each World provides the three components a workflow needs (an event log, compute, and a queue), backed by different infrastructure.

**Managed**: Vercel handles everything automatically. Deploy your app and Vercel Workflows runs on Fluid compute with Vercel Queues, zero-config E2E encryption, and built-in observability.

**Self-hosted**: Run Workflows on your own infrastructure. We maintain a Postgres reference implementation that real customers run in production, and the Local World ships built in for development.

**Embedded**: The SDK is not locked to one runtime, and the community is already building more Worlds, including adapters for MongoDB, Redis, Turso, Jazz Cloud, and Cloudflare. We'll continue to support anyone who wants to build Worlds.

## [Link to heading](#how-vercel-customers-use-workflows)**How Vercel customers use Workflows**

### [Link to heading](#mux-powers-durable-video-and-ai-pipelines)**Mux powers durable video and AI pipelines**

Mux built their media intelligence layer [on Workflows](https://vercel.com/blog/how-mux-shipped-durable-video-workflows-with-their-mux-ai-sdk), handling execution, retries, and orchestration for AI inference across complex video pipelines. They also shipped `"use workflow"` and `"use step"` directives inside their own `@mux/ai` SDK, so any developer can `npm install @mux/ai` and get a durable, multi-step pipeline as a normal imported function.

> The real complexity isn't the models, it's everything around them. Workflow SDK took a big chunk of that off our plate so we could focus on building the product.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/1QXZBqeDQarTW6xbn5Qp7i/b75259effc7c9c18921320205d3c49ca/dylan-mux.jpeg)
> 
> **Dylan Jhaveri,** Director of Self Service @ Mux

### [Link to heading](#durable-runs-hundreds-of-ai-agents-for-3-million-small-businesses)**Durable runs hundreds of AI agents for 3 million small businesses**

Durable's most critical path is website creation: dozens of parallel AI steps orchestrated by Vercel Workflows to deliver a complete site in under 30 seconds. Their small dev team ripped out their self-hosted infrastructure entirely and [rewrote on Workflows](https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers) with 160+ directives across 75 files.

> Workflow gave our six engineers the ability to ship production AI infrastructure without ever hiring for infra.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/6pdXxSAjV7PECzfYK4hiTv/754b3cc42ff64ab5625f53ae830c33e2/osama-khan.png)
> 
> **Osama Kahn,** CPTO @ Durable

### [Link to heading](#flora-orchestrates-creative-ai-agents-across-50+-image-models)**Flora orchestrates creative AI agents across 50+ image models**

Flora runs their entire media generation pipeline [on Vercel Workflows](https://vercel.com/blog/how-flora-shipped-a-creative-agent-on-vercels-ai-stack), orchestrating 50+ image models with no queues, no state machines, and no separate service. They use rollbacks for credit refunds, recursive workflows for user-defined multi-step pipelines, and `getWritable` for progress streaming. Their customers kick off jobs, close their laptop, and come back to completed results.

> We stopped having infrastructure debates and started having product debates.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/V1c0MQJlSsmjfsthjZ0le/d926f9a9739c2dda06c5ca816761f5ef/alec-jo.jpeg)
> 
> **Alec Jo,** Head of Applied AI @ FLORA

## [Link to heading](#what's-next:-workflows-5-and-python-support)**What's next: Workflows 5 and Python support**

### [Link to heading](#workflows-5)Workflows 5

Workflows 4 focused on getting the developer experience and SDK model right. Workflows 5 keeps the same programming model while pushing harder on performance and runtime efficiency. Here’s what we’re cooking:

-   Native concurrency controls, including a lock primitive for coordinating work across multiple runs
    
-   Globally deployed Workflows infrastructure
    
-   A snapshot-based runtime to reduce replay overhead as event histories grow
    
-   Better bundling and stronger Next.js integration
    

Our goal is to make the overhead of opting into Workflows smaller and smaller until it is the obvious default for any project. Install `workflow@beta` to try Workflows 5 early (and [share feedback](https://github.com/vercel/workflow/discussions/1650) on GitHub).

### [Link to heading](#python-support)Python support

The [Python SDK](https://workflow-sdk.dev/docs/getting-started/python) is now in beta, making Workflows available across the broader AI and backend ecosystem. Here's a quick taste of how the opening example in this post looks in Python:

```
from vercel.workflow import Workflowswf = Workflows()@wf.workflowasync def create_site(*, user_id):    profile = await fetch_user_profile(user_id)    plan = await generate_site_plan(profile)    return await build_site(plan)@wf.stepasync def fetch_user_profile(*, user_id):    return await db.user.find_unique(id=user_id)@wf.stepasync def generate_site_plan(*, profile):    return await call_model(        prompt=f'Generate a site plan for {json.dumps(profile)}'    )@wf.stepasync def build_site(*, plan):    return await provision_site(plan)
```

## [Link to heading](#get-started)**Get started**

Durability, reliability, observability, security, and streaming should be part of your product from the beginning, not chores you take on months later.

When you use Workflows, we take on the complexity so you can focus on what makes your app unique. Learn more about [Vercel Workflows](https://vercel.com/workflows) or [visit the Workflow SDK docs](https://workflow-sdk.dev/docs/getting-started) to get started.

**Vercel Workflows is generally available on April 16.**