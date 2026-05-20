---
title: "Run Claude Managed Agents with Vercel Sandbox"
source: "https://vercel.com/changelog/run-claude-managed-agents-with-vercel-sandbox"
publishedDate: "2026-05-18"
category: "frontend"
feedName: "Vercel"
author: "Allen Zhou"
---

1 min read

May 18, 2026

You can now run [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview) with [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox).

Claude Managed Agents handles the model, harness, tools, and session state. Self-hosting lets you bring the execution environment, so an agent's tool calls run on your existing Vercel infrastructure with your private APIs, internal services, and customer data.

Each agent session runs in its own isolated Firecracker microVM, using the same infrastructure that powers 1B+ Vercel deployments with enterprise-grade security, availability, and performance.

What you get:

-   **A managed agent loop** from Anthropic, including the model, harness, tools, and session state
    
-   **A Vercel function control plane** that spawns a sandbox per session
    
-   **Firecracker microVM isolation** per session, with millisecond startup
    
-   **Credential brokering** at the firewall, so secrets never enter the sandbox
    
-   **Deny-by-default egress** with a domain allowlist
    
-   **Low-latency connectivity** to your private network and cloud workloads
    

Follow the [step-by-step guide](https://vercel.com/kb/guide/run-claude-managed-agent-tools-with-vercel-sandbox) for a reference implementation and learn more in the [Vercel Sandbox docs](https://vercel.com/docs/vercel-sandbox).