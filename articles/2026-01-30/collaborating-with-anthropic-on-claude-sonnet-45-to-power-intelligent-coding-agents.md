---
title: "Collaborating with Anthropic on Claude Sonnet 4.5 to power intelligent coding agents"
source: "https://vercel.com/blog/collaborating-with-anthropic-on-claude-sonnet-4-5"
publishedDate: "2025-09-29"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

4 min read

Sep 29, 2025

Claude Sonnet 4.5 is now available on [Vercel AI Gateway](https://vercel.com/ai-gateway) with full support in [AI SDK](https://ai-sdk.dev/). We’ve been testing the model in v0, across our Next.js build pipelines, and inside our new Coding Agent Platform template. The model shows improvements in design sensibility and code quality, with measurable gains when building and linting Next.js applications.

Claude Sonnet 4.5 builds on Anthropic's strengths in reasoning and coding. When paired with the [Vercel AI Cloud](https://vercel.com/blog/the-ai-cloud-a-unified-platform-for-ai-workloads), it powers a new class of developer workflows where AI can plan, execute, and ship changes safely inside your repositories.

[

**Claude Sonnet 4.5 Playground**

Try Claude Sonnet 4.5 on AI Gateway instantly, with no setup or install necessary. Open the playground and start prompting.

Try Claude Sonnet 4.5



](https://vercel.com/ai-gateway/models/claude-sonnet-4.5)

## [Link to heading](#claude-sonnet-4.5-improves-agentic-coding-workflows)Claude Sonnet 4.5 improves agentic coding workflows

Our internal evaluations show Claude Sonnet 4.5 outperforms its predecessor on core agentic coding tasks:

-   **Next.js builds**: Higher first-pass success rates with fewer missing dependency errors. The model correctly infers which packages are needed and includes them in `package.json` before attempting builds
    
-   **Linting**: Stronger adherence to Next.js and ESLint defaults
    
-   **Implementing features:** Improved handling of Next.js-specific functionality, such as correctly using `<Image>` from `next/image` and other framework-native components
    

On the v0 side:

-   **Frontend design in v0**: Cleaner component structures, better Tailwind usage, and more accessible UI patterns
    
-   **Handling challenging prompts**: When v0 prompts get nuanced, Claude Sonnet 4.5 finds the right context faster and more accurately. It avoids being tripped up by small details or unclear requirements, staying on track to deliver the right solution
    
-   **Complex applications**: For complicated apps like 3D worlds, Claude Sonnet 4.5 often gets it right in a single attempt, piecing together moving parts, interactions, and structure without extended back and forth
    
-   **Clarification over guessing**: When a query is unclear, Claude Sonnet 4.5 asks for clarification instead of wasting tokens on something irrelevant
    

These improvements make Claude Sonnet 4.5 effective for coding agents that execute full task chains: understanding a request, generating code, verifying with builds and tests, and shipping changes.

## [Link to heading](#introducing:-coding-agent-platform-to-test-agents-in-the-wild)Introducing: Coding Agent Platform to test agents in the wild

To show what’s possible, we’ve released a Coding Agent Platform template that defaults to Anthropic's Claude Code agent using Claude Sonnet 4.5.

It's a multi-agent system that can run Claude Code, OpenAI Codex CLI, Cursor CLI, or opencode. After connecting your GitHub organization, you select a repository and define a task (for example, “add dark mode,” “lint this project,” or “create a new API route”). The agent plans, executes, and commits changes automatically.

Each task runs in an isolated sandbox. The platform installs dependencies (including the coding tool you choose), executes CLI commands with the selected model, and pushes changes back to GitHub. You review the pull request and decide whether to merge.

Progress streams in real time. The UI (built with Next.js and Tailwind CSS) shows commands as they run, builds as they complete, and commits as they’re created. State is persisted in Postgres, with task history and management available for review.

[

**Coding Agent Platform**

Run coding agents in the Vercel AI Cloud with Vercel Sandbox + AI Gateway.

Deploy now



](https://vercel.com/templates/ai/coding-agent-platform)

## [Link to heading](#powered-by-the-vercel-ai-cloud)Powered by the Vercel AI Cloud

The Coding Agent Platform template runs on the Vercel AI Cloud, where each layer of the stack makes background coding agents viable.

At the foundation is [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox), which provisions secure, short-lived environments for installs, builds, and tests. This isolation keeps agent tasks reproducible and prevents interference with the rest of your project. Inside a Sandbox, you have full command-line access to clone repositories, run commands, and use complete agentic coding toolchains.

Sandboxes scale with demand. As you create new prompts and tasks, they spin up in parallel, removing the need for local compute and improving both performance and cost efficiency. Sandbox is powered by [Fluid compute](https://vercel.com/fluid), which scales elastically and uses [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute). Agents can remain idle without incurring charges, so you only pay for CPU when compute is actively used.

Each task also makes lightweight AI calls through the AI SDK and AI Gateway. For example, when an agent starts a task, the system generates a descriptive Git branch name based on the task, repository, and context.

Together, these systems provide an integrated execution layer. Instead of piecing together separate tools, the Vercel AI Cloud connects model reasoning with safe, scalable execution, making autonomous coding agents practical in production.

## [Link to heading](#open-sourcing-the-coding-agent-platform-template)Open-sourcing the Coding Agent Platform template

We are open-sourcing the Coding Agent template under the same vision as our [Open SDK strategy](https://vercel.com/blog/open-sdk-strategy):

-   Fork, audit, and extend the code
    
-   Plug in new agents, domain-specific tools, or custom commit logic
    
-   Reference implementation that you can bootstrap or deploy on your teams while taking advantage of AI Gateway, AI SDK, and Vercel AI Cloud platform
    

We’ll provide documentation, examples, and a contributor guide so that the community can evolve it.

### [Link to heading](#get-started-with-claude-sonnet-4.5)Get started with Claude Sonnet 4.5

Claude Sonnet 4.5 is available today through AI Gateway and AI SDK. You can try it instantly in the [playground](https://vercel.com/ai-gateway/models/claude-sonnet-4.5), or deploy the [Coding Agent Template](https://vercel.com/templates/ai/coding-agent-platform) to run real tasks against your repositories.

[

**Claude Sonnet 4.5 Playground**

Try Claude Sonnet 4.5 on AI Gateway instantly, with no setup or install necessary. Open the playground and start prompting.

Try Claude Sonnet 4.5



](https://vercel.com/ai-gateway/models/claude-sonnet-4.5)