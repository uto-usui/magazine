---
title: "Vercel for Slack now in public beta"
source: "https://vercel.com/changelog/vercel-for-slack-now-in-public-beta"
publishedDate: "2026-08-19"
category: "frontend"
feedName: "Vercel"
author: "Bryan Hunter"
---

Vercel Agent is now available in Slack. Mention `@Vercel` in any channel or thread, and Agent joins the conversation with relevant context from your Vercel projects, including deployments, builds, logs, metrics, configuration, and connected repos.

For example, use it to:

-   **Investigate incidents:** Ask why a deployment failed or what’s causing a runtime error. It investigates and explains what it found.
    
-   **Write and review code:** Work with your team and Agent to fix build and CI failures, review pull requests with production context, or turn a decision from the thread into a tested PR.
    
-   **Take action with approval:** Tell it to make a change, such as rolling back a deployment or updating configuration. Agent drafts a plan and waits for your approval. Once approved, it gets temporary access to carry out the plan, then returns to read-only.
    

Vercel Agent acts through its own identity. It's read-only by default, never exceeds the requester’s permissions, and makes no changes without approval. Every action is attributed to Agent, the requester, and the approver.

Vercel for Slack follows [Vercel Agent pricing](https://vercel.com/docs/agent/pricing). During the beta, a limited number of simple requests are free. Paid work is billed on demand.

The public beta is open to Pro and Enterprise teams. Install Agent for Slack from the [Vercel Marketplace](https://vercel.com/marketplace/slack), read the [docs](https://vercel.com/docs/agent/chat/slack), or [see how we use it ourselves](https://vercel.com/blog/introducing-vercel-for-slack).