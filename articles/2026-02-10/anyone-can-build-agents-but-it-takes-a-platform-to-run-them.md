---
title: "Anyone can build agents, but it takes a platform to run them"
source: "https://vercel.com/blog/anyone-can-build-agents-but-it-takes-a-platform-to-run-them"
publishedDate: "2026-02-09"
category: "frontend"
feedName: "Vercel"
author: "Eric Dodds"
---

6 min read

Feb 9, 2026

Prototyping is democratized, but production deployment isn't.

AI models have commoditized code and agent generation, making it possible for anyone to build sophisticated software in minutes. Claude can scaffold a fully functional agent before your morning coffee gets cold. But that same AI will happily architect a $5,000/month DevOps setup when the system could run efficiently at $500/month.

In a world where anyone can build internal tools and agents, the build vs. buy equation has fundamentally changed. Competitive advantage no longer comes from whether you can build. It comes from rapid iteration on AI that solves real problems for your business and, more importantly, reliably operating those systems at scale.

To do that, companies need an internal AI stack as robust as their external product infrastructure. That's exactly what Vercel's agent orchestration platform provides.

## [Link to heading](#build-vs.-buy-roi-has-fundamentally-changed)Build vs. buy ROI has fundamentally changed

For decades, the economics of custom internal tools only made sense at large-scale companies. The upfront engineering investment was high, but the real cost was long-term operation with high SLAs and measurable ROI. For everyone else, buying off-the-shelf software was the practical option.

AI has fundamentally changed this equation. Companies of any size can now create agents quickly, and customization delivers immediate ROI for specialized workflows:

-   OpenAI deployed an [internal data agent](https://openai.com/index/inside-our-in-house-data-agent/) to democratize analytics
    
-   Vercel’s [lead qualification agent](https://www.businessinsider.com/ai-agent-entry-level-sales-jobs-vercel-2025-10) helps one SDR do the work of 10 (template [here](https://vercel.com/templates/ai/lead-processing-agent))
    
-   Stripe built a [customer-facing financial impact calculator](https://vercel.com/blog/how-stripe-built-a-game-changing-app-in-a-single-flight-with-v0) (on a flight!)
    

Today the question isn’t build vs. buy. The answer is build _and run_. Instead of separating internal systems and vendors, companies need a single platform that can handle the unique demands of agent workloads.

### [Link to heading](#every-company-needs-an-internal-ai-stack)Every company needs an internal AI stack

The number of use cases for internal apps and agents is exploding, but here's the problem: production is still hard.

Vibe coding has created one of the largest shadow IT problems in history, and understanding production operations requires expertise in security, observability, reliability, and cost optimization. These skills remain rare even as building becomes easier.

The ultimate challenge for agents isn't building them, it's the platform they run on.

## [Link to heading](#the-platform-is-the-product:-how-our-data-agent-runs-on-vercel)The platform is the product: how our data agent runs on Vercel

Like OpenAI, we built our own internal data agent named d0 (OSS template [here](https://vercel.com/templates/ai/oss-data-analyst-agent-reference-architecture)). At its core, d0 is a text-to-SQL engine, which is not a new concept. What made it a successful product was the platform underneath.

Using Vercel’s built-in primitives and deployment infrastructure, one person built d0 in a few weeks using 20% of their time.

This was only possible because Sandboxes, Fluid compute and AI Gateway automatically handled the operational complexity that would have normally taken months of engineering effort to scaffold and secure.

Today, d0 has completely democratized data access that was previously limited to professional analysts. Engineers, marketers, and executives can all ask questions in natural language and get immediate, accurate answers from our data warehouse.

Here’s how it works:

-   **A user asks a question in Slack:** "What was our Enterprise ARR last quarter?" d0 receives the message, determines the right level of data access based on the permissions of the user, and starts the agent workflow.
    
-   **The agent explores a semantic layer:** The semantic layer is a file system of 5 layers of YAML-based configs that describe our data warehouse, our metrics, our products, and our operations.
    
-   **AI SDK handles the model calls:** Streaming responses, tool use, and structured outputs all work out of the box. We didn't build custom LLM plumbing, we used the same abstractions any Vercel developer can use.
    
-   **Agent steps are orchestrated durably:** If a step fails (Snowflake timeout, model hiccup), Vercel Workflows handles retries and state recovery automatically.
    
-   **Automated actions are executed in isolation**: File exploration, SQL generation, and query execution all happen in a secure Vercel Sandbox. Runaway operations can't escape, and the agent can execute arbitrary Python for advanced analysis.
    
-   **Multiple models are used to balance cost and accuracy**: AI Gateway routes simple requests to fast models and complex analysis to Claude Opus, all in one code base.
    
-   **The answer arrives in Slack:** formatted results, often with a chart or Google Sheet link, are delivered back to the Slack using the AI SDK Chatbot primitive.
    

## [Link to heading](#vercel-is-the-platform-for-agents)Vercel is the platform for agents

Vercel provides the infrastructure primitives purpose-built for agent workloads, both internal and customer-facing. You build the agent, Vercel runs it. And it just works.

Using our own agent orchestration platform has enabled us to build and manage an increasing number of custom agents.

Internally, we run:

-   A lead qualification agent
    
-   d0, our analytics agent
    
-   A customer support agent (that reduced tickets by a third),
    
-   An abuse detection agent that flags risky content
    
-   A content agent that turns Slack threads into draft blog posts.
    

On the product side:

-   v0 is a code generation agent, and
    
-   Vercel Agent can review pull requests, analyze incidents, and recommend actions.
    

Both products run on the same primitives as our internal tools.

[**Sandboxes**](https://vercel.com/docs/ai-gateway) give agents a secure, isolated environment for executing sensitive autonomous actions. This is critical for protecting your core systems. When agents generate and run untested code or face prompt injection attacks, sandboxes contain the damage within isolated Linux VMs. When agents need filesystem access for information discovery, sandboxes can dynamically mount VMs with secure access to the right resources.

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create();await sandbox.runCommand({  cmd: 'node',   args: ["-e", 'console.log("Hello from Vercel Sandbox!")'],  stdout: process.stdout,});await sandbox.stop();
```

[**Fluid compute**](https://vercel.com/docs/fluid-compute) automatically handles the unpredictable, long-running compute patterns that agents create. It’s easy to ignore compute when agents are processing text, but when usage scales and you add data-heavy workloads for files, images, and video, cost becomes an issue quickly. Fluid compute automatically scales up and down based on demand, and you're only charged for compute time, keeping costs low and predictable.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1PoOxG1UDe7YStoAfDZFoO%2Fd5f488815adb649dd7d61343f8b208c5%2FFluid_compute_-_Light_-_Desktop.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1GgYZvvA9QlCNWow43wKMM%2Fbae10cc403732316ab3b878505804581%2FFluid_compute_-_Dark_-_Desktop.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F703uGE86SPESaiHPigCGmy%2F5cc98e8b1ab7f04b9013e44fd8251322%2FFluid_compute_-_Light_-_Mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5o5XqQvfXWyD9jaX5ISmXz%2Fcd6b180cad52c8590daffc220eac6169%2FFluid_compute_-_Dark_-_Mobile.png&w=1920&q=75)

[**AI Gateway**](https://vercel.com/docs/ai-gateway) gives you unified access to hundreds of models with built-in budget control, usage monitoring, and load balancing across providers. This is important for avoiding vendor lock-in and getting instant access to the latest models. When your agent needs to handle different types of queries, AI Gateway can route simple requests to fast, inexpensive models while sending complex analysis to more capable ones. If your primary provider hits rate limits or goes down, traffic automatically fails over to backup providers.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5Ym8tzqsNigo7nUCINxYyu%2F894288009e65c38015788a7077d2cea5%2F1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4FThNIY7C3ggb3Y6vQzix7%2Ff2213b9097ece0cfcf3c9d50011e4880%2F1-1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5tR8Xf4Pv0Gb3tQQMseU5t%2F7842252a83a69e7758958e34addb6706%2F1-2.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2YQNNwFtXNKspCGvksQZKg%2F7907765b8f8325908f771609df7f3953%2F6.png&w=1920&q=75)

[**Workflows**](https://useworkflow.dev/) give agents the ability to perform complex, multi-step operations reliably. When agents are used for critical business processes, failures are costly. Durable orchestration provides retry logic and error handling at every step so that interruptions don't require manual intervention or restart the entire operation.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6sHFohyhYd1hbrUYGM6Bk3%2F64b0af8392be2ef4753d0e8e225ed42d%2FShipeAI25_5-blog-just-ship-agents-light-desktop.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6wBb5hbam88rblVLwSuV9v%2F80bdf6be5d423e14beaa81d1b9d91f90%2FShipeAI25_5-blog-just-ship-agents-dark-desktop.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3G4VJbMYENsXA24a7g0r4I%2F7143e973730542b990e832546a7c0cb3%2FShipeAI25_5-blog-just-ship-agents-light-mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5rUK3RX1FTz1Lbc6vM7xRI%2F59f516f14672cb7cbeca9ac132ab1cba%2FShipeAI25_5-blog-just-ship-agents-dark-mobile.png&w=1920&q=75)

[**Observability**](https://vercel.com/docs/observability/insights) reveals what agents are actually doing beyond basic system metrics. This data is essential for debugging unexpected behavior and optimizing agent performance. When your agent makes unexpected decisions, consumes more tokens than expected, or underperforms, observability shows you the exact prompts, model responses, and decision paths, letting you trace issues back to specific model calls or data sources.

## [Link to heading](#build-your-agents,-vercel-will-run-them)Build your agents, Vercel will run them

In the future, every enterprise will build their version of d0. And their internal code review agent. And their customer support routing agent. And hundreds of other specialized tools.

The success of these agents depends on the platform that runs them. Companies who invest in their internal AI stack now will not only move faster, they'll experience far higher ROI as their advantages compound over time.