---
title: "Workflow Builder: Build your own workflow automation platform"
source: "https://vercel.com/blog/workflow-builder-build-your-own-workflow-automation-platform"
publishedDate: "2025-11-24"
category: "frontend"
feedName: "Vercel"
author: "Chris Tate"
---

2 min read

Nov 24, 2025

Workflow Builder is an open-source Next.js template for building workflow automation platforms

Today we're open-sourcing [Workflow Builder](https://workflow-builder.dev/), a complete visual automation platform powered by the [Workflow Development Kit](https://useworkflow.dev/) (WDK).

The project includes a visual editor, execution engine, and infrastructure, giving you what you need to build your own workflow automation tools and agents. Deploy it to Vercel and customize it for your use case.

[

**Deploy the Workflow Builder**

Deploy your own Workflow Builder with one click.

Deploy



](https://vercel.com/templates/ai/workflow-builder)

## [Link to heading](#what's-included-in-workflow-builder)What's included in Workflow Builder

Workflow Builder is a production-ready Next.js application with a fully interactive workflow editor, AI-assisted workflow generation, six prebuilt integration modules, and end-to-end observability.

### [Link to heading](#visual-workflow-editor)Visual workflow editor

The visual workflow editor lets you build, connect, and execute workflows using drag-and-drop steps. You get real-time validation, undo/redo, auto-save, and persistent state without writing code.

Prebuilt integrations include:

-   Resend (emails)
    
-   Linear (issues)
    
-   Slack (notifications)
    
-   PostgreSQL (database)
    
-   HTTP requests (API calls)
    
-   [Vercel AI Gateway](https://vercel.com/ai-gateway) (AI models)
    

### [Link to heading](#ai-powered-text-to-workflow-generation)AI-powered text-to-workflow generation

The AI-powered text-to-workflow feature converts natural language prompts into executable workflows. Type a description of your automation, and the system generates structured step definitions and connections.

### [Link to heading](#webhook-triggers)Webhook triggers

Webhook triggers connect your workflows to external apps and APIs. External events, services, or data sources can trigger workflow execution in real time.

### [Link to heading](#referencing-outputs-from-previous-steps)Referencing outputs from previous steps

Each workflow step can access and reference outputs from previous steps. This creates dynamic, data-driven processes and enables agentic workflows where later steps depend on earlier results.

### [Link to heading](#workflow-code-generation)Workflow code generation

Every visual workflow compiles into executable TypeScript via the Workflow Development Kit (WDK). The `"use workflow"` and `"use step"` directives transform your functions into a runtime execution graph that handles state management, error handling, and step coordination.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1gsOC1yoW9U11Jg8VQnVe1%2Fd0525f836bca0df1138d9cf30329063c%2Fworkflow-builder-code-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2DQsULzLnpmxA5lMJBRvka%2F7879485d34c4c091173a8be158c9ee9f%2Fworkflow-builder-code-dark.png&w=1920&q=75)

## [Link to heading](#use-cases-for-workflow-builder)Use cases for Workflow Builder

With Workflow Builder, you have the foundation to build your own workflow automation platform for internal tools or customer-facing products:

-   **Agents:** Execute multi-step, cross-system workflows powered by AI
    
-   **Internal tools**: Custom automation systems tailored to your organization’s processes and systems
    
-   **Customer-facing workflow tools**: Offer domain-specific workflow builders like Zapier or n8n
    
-   **Integration platforms**: Add drag-and-drop workflow capabilities to your product
    
-   **Data pipelines**: Design ETL or data processing pipelines with visual monitoring and execution tracking