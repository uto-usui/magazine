---
title: "Our Multi-Agent Architecture for Smarter Advertising"
source: "https://engineering.atspotify.com/2026/2/our-multi-agent-architecture-for-smarter-advertising/"
publishedDate: "2026-02-19"
category: "engineering"
feedName: "Spotify Engineering"
author: "Spotify Engineering"
---

## Introduction

When we kicked this off, we weren’t trying to ship an “AI feature.” We were trying to fix a structural problem in how our ads business actually runs in software.

On the business side, we have multiple ways of buying—Direct, Self‑Serve, Programmatic—all sitting on top of a mostly consolidated backend. The infrastructure is shared; the behavior isn’t. Each buying channel has its own workflows, its own decision logic, and its own flavor of “what good looks like.” On the engineering side, that shows up less as “different stacks” and more as “different brains” wired into the same body:

-   One set of services and data powering multiple buying experiences
    
-   Channel‑specific flows that encode slightly different rules and heuristics
    
-   Surface‑specific automation (Spotify Ads Manager, Salesforce, Slack, internal tools) solving overlapping problems in slightly different ways
    
-   A steady stream of “small workflow tweaks” that are all variants of the same planning / optimization problem, but need to be implemented and maintained in multiple places
    

So even though we’ve done the work to consolidate services, we still end up with fragmented behavior at the workflow layer. The same core decisions—how to allocate budget, how to choose inventory, how to balance reach vs efficiency vs STR—get re‑implemented per channel and per surface. Over time, they drift.

The standard playbook here would be familiar: design a new service, define the “right” state machine for planning and managing campaigns, add some Representational State Transfer (REST) endpoints, plug it into the UIs, and call it done.

The problem is that this doesn’t really fit the shape of the work anymore:

-   **Workflows are combinatorial.** Planning, forecasting, audience selection, creative guidance, pacing, and optimization all depend on who the user is, what inventory is available,business priorities and advertiser goals. You can’t capture that in a couple of hard‑coded “happy paths” per channel and expect it to hold up as things change.
    
-   **The same decisions need to show up everywhere.** If we decide on a better way to allocate budget or prioritize inventory, that should consistently show up in Spotify Ads Manager recommendations, Salesforce plans, and Slack workflows. Re‑implementing the same decision logic three different times is an easy way to create tech debt and inconsistent behavior.
    
-   **We’re missing an intent layer.** Our systems are good at _doing_ things (create a line item, run a forecast, fetch insights). They’re not good at taking a goal like “maximize reach in Brazil, protect video inventory, and still hit STR” and turning that into a sequence of tool calls, tradeoffs, and checks that look the same across channels.
    

So the core problem wasn’t “we need a new backend.” The problem was:

We don’t have a unified, programmable decision layer that can understand goals, reason over shared signals, and orchestrate our existing Ads APIs on behalf of users—consistently across buying channels and surfaces.

We also knew we didn’t want to swing to the other extreme and build a giant rules engine. Our ads logic is messy, probabilistic, and constantly changing. Forecasting, optimization, and insights already lean heavily on ML. Freezing all of that into a static decision tree would be brittle almost immediately and painful to maintain.

That’s the gap where we decided to bet on an agentic approach.

Instead of:

-   Hard‑wiring more deterministic workflows per channel
    
-   Burying orchestration logic inside each individual service or surface
    
-   Duplicating “smart” behavior in Spotify Ads Manager, Salesforce, Slack, and whatever comes next
    

We treat campaign planning and management as a set of modular agents that:

-   Consume the same underlying signals (inventory, audiences, STR, quality/risk, performance history)
    
-   Optimize jointly for advertiser goals and Spotify’s business constraints
    
-   Use our existing Ads services as _tools_ instead of re‑implementing capabilities from scratch
    

For our org, this is new territory. Most of our AI work so far has looked like “put a model behind an endpoint” or “add a prompt‑based helper in the UI.” Here, we’re talking about:

-   A long‑running orchestration layer that delegates work to specialized agents
    
-   Agents with shared context and shared evaluation logic
    
-   A single agentic platform that can power all buying channels and surfaces off the same decision engine, instead of a patchwork of overlapping workflows
    

That’s a different mental model than “one more backend service with some workflows.” It forces us to think in terms of:

-   APIs designed as tools for agents, not just CRUD
    
-   Testing as behavioral evaluation, not only unit + integration tests
    
-   Observability as “what did the agent decide and why?” not just p95s and error budgets
    
-   Safety as guardrails on semi‑autonomous decisions, not just input validation
    

We’re taking this bet because the alternative is pretty clear: keep scaling complexity, coordination cost, and duplicated logic every time we improve planning or optimization in a new place. An agentic platform lets us centralize decision‑making once and project it everywhere—on top of the consolidated backend we already have—so the workflows can finally converge even as the products evolve.

From there, the question became: where do we prove this out first?

We chose **Media Planning** as the initial use case because it’s where all of this complexity shows up at once. It’s the point where sales, advertisers, inventory, pacing, and ad products collide. It’s also early enough in the lifecycle that if we get the decisions right here, everything downstream (booking, trafficking, delivery, optimization) benefits.

In the next section, we’ll go deeper on how we turned Media Planning into an agentic workflow: how we decomposed the planner’s job into tools and capabilities, how agents reason over constraints, and how we wired this into existing systems without rewriting the world.

**Ads AI** is our AI-powered advertising platform that leverages Google's Agent Development Kit (ADK) and Vertex AI to transform how advertisers create media plans at Spotify. By decomposing the complex media planning workflow into specialized AI agents that work in parallel, we've built a system that can understand natural language campaign requirements and generate optimized, data-driven media plans in seconds.

**Goal:** Build an intelligent, conversational interface that enables advertisers to generate optimized media plans through natural language interaction, backed by historical performance data.

**Key Takeaway:** A multi-agent architecture with parallel execution can dramatically simplify complex domain problems while improving both developer experience and system performance.

## The Challenge

Media planning for advertising campaigns involves several interconnected decisions:

1.  **Goal Definition:** What does the advertiser want to achieve? (brand awareness, website traffic, app installs)
    
2.  **Audience Targeting:** Who should see the ads? (demographics, interests, geography)
    
3.  **Budget Allocation:** How should the budget be distributed across ad sets?
    
4.  **Schedule Planning:** When should the campaign run?
    
5.  **Format Selection:** Which ad formats (audio, video, display) perform best?
    

Our previous approach required advertisers to manually configure each of these dimensions, often without insight into what historically performs well for similar campaigns.

**Pain points:**

-   **Complex UI flows:** Multiple screens and forms to fill out
    
-   **No optimization guidance:** Advertisers had to guess at optimal configurations
    
-   **Slow iteration:** Testing different approaches required starting over
    
-   **Knowledge gap:** Historical performance data wasn't easily accessible
    

## The Solution: Approach and Implementation

### Design and Architecture

![Ads-AI-System-high-level-overview.png](https://images.ctfassets.net/p762jor363g1/5GUQ6qugVxbGgVaXHUZ6eB/0e500d4d150a74e921415b5252dd1419/Ads-AI-System-high-level-overview.png)

We chose a **multi-agent architecture** where specialized AI agents handle distinct aspects of media planning. This approach offers several advantages:

1.  **Separation of concerns:** Each agent has a focused responsibility and optimized prompts
    
2.  **Parallel execution:** Independent agents can run simultaneously
    
3.  **Testability:** Individual agents can be tested and improved in isolation
    
4.  **Flexibility:** New capabilities can be added as new agents
    

Component

Technology

Purpose

Agent Framework

Google ADK 0.2.0

Provides agent orchestration, session management, and tool integration

LLM Backend

Vertex AI (Gemini 2.5 Pro)

Powers natural language understanding and generation

API Layer

gRPC

High-performance, strongly-typed service communication

Session Storage

Google Cloud

Persistent session state across conversations

Performance Data

PostgreSQL + In-Memory Cache

Historical campaign performance for optimization

Service Framework

Apollo (Spotify)

Service lifecycle, configuration, and observability

### Implementation Details

#### Agent Breakdown

**1\. RouterAgent - The Traffic Controller**

The RouterAgent analyzes incoming user messages and determines what information is present:

![Agentic-advertising-code-block-1.png](https://images.ctfassets.net/p762jor363g1/6T4md5igJ5tnsbAv5Od90g/c609a937e7197adfcf210b59740673b9/Agentic-advertising-code-block-1.png)

This fast routing step prevents unnecessary LLM calls and enables conditional agent execution.

**2\. Specialized Resolution Agents**

Each resolution agent has a focused responsibility:

-   **GoalResolverAgent:** Maps user intent to campaign objectives (REACH, CLICKS, APP\_INSTALLS, etc.) and searches for appropriate ad categories
    
-   **AudienceResolverAgent:** Extracts targeting criteria including interests (from a predefined taxonomy), geographic targets, age ranges, and gender
    
-   **BudgetAgent:** Parses various budget formats ($5000, 5k, €10,000) and converts to micro-units
    
-   **ScheduleAgent:** Handles date parsing including relative dates ("next month", "30 days")
    

**3\. MediaPlannerAgent - The Optimizer**

The MediaPlannerAgent is where the magic happens. It takes all resolved information and generates optimized ad set recommendations using a heuristics-based engine backed by historical performance data.

**Key Optimization Rules:**

1.  **Cost optimization:** Minimize cost metrics (CPM, CPC, CPI) relative to historical medians
    
2.  **Delivery rate optimization:** Target campaigns with delivery rates close to 100%
    
3.  **Budget matching:** Find historically successful campaigns with similar budget ranges
    
4.  **Duration matching:** Match campaign durations to proven performers
    
5.  **Targeting matching:** Score based on demographic and interest overlap
    
6.  **Unique format/goal combinations:** Ensure diversity in recommendations
    
7.  **Budget-based scaling:** Automatically adjust number of recommendations:
    
    -   €0-1,000: 1 recommendation
        
    -   €1,000-5,000: 2 recommendations
        
    -   €5,000-15,000: 3 recommendations
        
    -   €15,000+: 4-5 recommendations
        

**Tool Integration with Function Calling**

We leverage Google ADK's FunctionTool to give agents access to real data:

![Agentic-advertising-code-block-2.png](https://images.ctfassets.net/p762jor363g1/22HCcoN28sAA9Xkq4Isuxs/ffc03f14f285b9148b5ea0e616e8afaa/Agentic-advertising-code-block-2.png)

The @Schema annotations provide the LLM with structured information about tool parameters:

![Agentic-advertising-code-block-3.png](https://images.ctfassets.net/p762jor363g1/8nuWaV3bNTy2PUuCHcg3s/68323169e812eeef2b7bb6294882d6b4/Agentic-advertising-code-block-3.png)

**Prompt engineering for consistent output** Getting LLMs to produce consistent, parseable output is challenging. We developed strict prompt guardrails:

![Agentic-advertising-code-block-4.png](https://images.ctfassets.net/p762jor363g1/7oFaBmjAiuy0uSWXwRHp3d/4c6cd64814e153054eb880b180e1c34c/Agentic-advertising-code-block-4.png)

**Trade-offs considered**

1.  **Single vs. multi-Agent:** A single agent could handle everything, but would have a massive prompt and couldn't parallelize. Multi-agent adds complexity but improves latency and maintainability.
    
2.  **In-memory vs. database cache:** We chose an in-memory cache for historical data to minimize latency. The tradeoff is memory usage, but campaign performance data is bounded and refreshed periodically.
    
3.  **Synchronous vs. streaming:** We opted for synchronous responses initially for simplicity. Streaming would provide better UX for longer operations.
    

## Results and Impact

### Performance Metrics

Metric

Manual

Agentic

Media Plan Creation Time

15-30 minutes (manual)

5-10 seconds

Required User Inputs

20+ form fields

1-3 natural language messages

Optimization Data Used

None (human intuition)

Historical performance from thousands of campaigns

Agent Response Latency

N/A

~3-5s with parallel execution

### Latency Breakdown

![Agentic-advertising-code-block-5.png](https://images.ctfassets.net/p762jor363g1/7egaI2S5lx2xfhMfxmq51v/3daab086291243c4b039944249353466/Agentic-advertising-code-block-5.png)

### Overall Impact

-   **Reduced cognitive load:** Advertisers describe campaigns in natural language
    
-   **Data-driven decisions:** Every recommendation backed by historical performance
    
-   **Faster iteration:** Advertisers can refine by continuing the conversation
    
-   **Democratized expertise:** Optimization knowledge embedded in the system
    

## Lessons Learned and Future Work

### Key Learnings

**Key learning 1: prompt engineering is software engineering**

Treating prompts as code — with version control, testing, and iteration — was essential. Small changes in prompt wording can dramatically affect output consistency. We learned to:

-   Be explicit about output format requirements
    
-   Provide concrete examples in prompts
    
-   Build guardrails at both prompt and parsing layers
    

**Key learning 2: agent boundaries matter**

Drawing the right boundaries between agents is crucial. Too many agents increases latency and coordination overhead. Too few creates monolithic, hard-to-maintain prompts. Our rule of thumb: one agent per distinct skill or data source.

**Key learning 3: tools enable grounding**

LLMs are powerful but can hallucinate. By providing agents with tools that access real data (geo targets, ad categories, historical performance), we ground their outputs in reality. The LLM reasons about _what_ to do; tools provide _accurate data_ to work with.

### Future Work

1.  **Streaming responses:** Implement server-sent events for real-time feedback as agents process
    
2.  **Multi-turn refinement:** Better support for iterative refinement ("frequent cycles of data evaluation")
    
3.  **A/B testing integration:** Automatically test AI-recommended plans against baselines
    
4.  **Expanded agent capabilities:** Creative suggestions, competitive analysis, cross-campaign optimization
    
5.  **Fine-tuned models:** Domain-specific model fine-tuning for advertising terminology
    

## Conclusion

Building Ads AI taught us that complex, multi-step workflows are well-suited to multi-agent architectures. By decomposing the media planning problem into specialized agents — each with focused prompts, relevant tools, and clear responsibilities — we created a system that's both powerful and maintainable.

The combination of Google's ADK for agent orchestration, Vertex AI for LLM capabilities, and our historical performance data creates a system that doesn't just understand what advertisers want — it knows what actually works.

We're excited to continue evolving Ads AI and bringing AI-powered optimization to more advertising workflows at Spotify.