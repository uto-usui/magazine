---
title: "AI Taxonomy"
source: "https://dropleaf.app/d/AlXez8scbd"
publishedDate: "2026-03-04"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

## AI Taxonomy

**An Operational Framework for Precision in AI Discourse**

* * *

## Purpose

"AI" has become semantically meaningless. The term now encompasses everything from a regression model to an autonomous robot, creating confusion in strategic discussions, partner conversations, and product positioning. This taxonomy provides a functional framework based on **what the AI actually does**, not what technique it uses.

* * *

## The Framework in One Sentence

We use Analytical AI to **decide**, Semantic AI to **understand and** **remember**, Generative AI to **create**, Agentic AI to **act**, Perceptive AI to **sense**, and Physical AI to **move**.

* * *

## The Six Functional Categories

Category

What It Does

Typical Tech

Relevance

**Analytical AI**

Predicts, classifies, scores, optimizes

ML models, gradient boosting, neural nets on structured data

Propensity models, LTV prediction, fraud detection, churn scoring

**Semantic AI**

Understands meaning, finds relationships, grounds context

Embeddings, vector DBs, knowledge graphs, GraphRAG

Customer intent understanding, intelligent matching, truth anchoring

**Generative AI**

Creates new content: text, images, code, media

LLMs, diffusion models, fine-tuned domain models

Personalized messaging, creative variation, content generation

**Agentic AI**

Plans, reasons, uses tools, executes multi-step workflows

LLM + orchestration (MCP, LangGraph), tool interfaces

Campaign optimization, autonomous workflows, digital coworkers

**Perceptive AI**

Interprets sensory input: vision, speech, documents

Multimodal LLMs, computer vision, ASR

Document processing, visual inspection, voice interfaces

**Physical AI**

Applies intelligence to physical actuators and space

World models, sim-to-real transfer, robotics platforms

Drones, robotics division, autonomous infrastructure

* * *

## Interaction Patterns (Orthogonal Axis)

How AI surfaces to users is separate from what it does. Any functional category can manifest through different interaction patterns:

Pattern

Description

Example

**Invisible AI**

Operates entirely in background; user sees outcomes, not the AI

Fraud detection, automated routing, real-time optimization

**Assistive AI**

Surfaces recommendations or drafts for human decision/approval

Suggested responses, draft campaigns, human-in-the-loop agents

**Generative UI**

Interface itself is constructed by AI based on user intent

Dynamic dashboards, contextual tools, intent-driven experiences

**Conversational**

Turn-based chat or voice interaction

Chatbots, voice assistants, customer service interfaces

* * *

## Composition: The Real Sophistication

Sophisticated AI products are not single-category. They stack multiple functional categories in orchestrated workflows. The competitive advantage is in the architecture, not any single capability.

### Sample Composition Stack

A conceptual Customer Value Management product demonstrates multi-category orchestration:

Layer

Category

Function

Output

**1**

**Analytical AI**

Score customers: propensity, LTV, churn risk

Structured signals (e.g. "87% churn probability")

**2**

**Semantic AI**

Ground context: customer history, intent, relationships

Contextual understanding for personalization

**3**

**Generative AI**

Create personalized messaging and creative

Tailored retention offers, adaptive content

**4**

**Agentic AI**

Orchestrate multi-step optimization loops

Autonomous campaign management, continuous learning

_The pitch is not "we use AI." The pitch is "we orchestrate four distinct AI capabilities into a system that decides, remembers, creates, and acts."_

* * *

## Key Infrastructure Concepts

### Model Context Protocol (MCP)

The emerging (but not yet canonical) "USB-C" of agentic AI. Standardizes how agents connect to tools and data sources. Build an MCP server once; any MCP client can connect. This is what makes Agentic AI composable and interoperable.

### GraphRAG

Combines vector search (conceptual similarity) with knowledge graphs (explicit relationships). Enables multi-hop reasoning: connect a news event to a supplier to a production delay. This is the architecture for grounded, trustworthy AI.

### Edge/SLM Deployment

Small Language Models running on-device or at edge. Driven by privacy (data stays local), latency (real-time response), and cost (reduced cloud inference). Relevant for robotics, voice interfaces, and privacy-sensitive applications.

* * *

## Usage Guide

### When someone says "AI"...

-   Ask: "Which category?" Force specificity.
-   If they can't answer, the strategy isn't concrete yet.

### When positioning products...

-   Lead with the composition story, not any single capability.
-   Use the verb framing: "decides, remembers, creates, acts."

### When evaluating vendors/partners...

-   Map their offering to this taxonomy. Where do they sit?
-   Identify gaps: what categories are missing from their stack?

* * *

## Anti-Patterns to Avoid

Don't Say

Say Instead

"We're using AI for this."

"We're using Analytical AI to score, then Generative AI to personalize."

"It's an AI-powered product."

"It orchestrates three AI capabilities: it decides, creates, and acts."

"We have an AI agent."

"We have an Agentic system that uses MCP to connect to \[specific tools\]."

"GenAI" (as a catch-all)

Specify: Generative (creates content) vs. Agentic (takes actions).

* * *

[_Narain Jashanmal_](https://www.narain.io/) _| January 2026 | v1.1_