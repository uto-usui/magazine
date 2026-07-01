---
title: "An expanded Vercel Agent: chat, investigations, and approved actions, now in public beta"
source: "https://vercel.com/changelog/an-expanded-vercel-agent-chat-investigations-and-approved-actions-now-in-public-beta"
publishedDate: "2026-06-30"
category: "frontend"
feedName: "Vercel"
author: "Kathryn Middleton"
---

Today, we're launching expanded capabilities for Vercel Agent in public beta. Vercel Agent now lives in your dashboard and can investigate production issues, answer questions about your projects, and take action on your behalf.

Because Agent runs inside the platform that deploys and serves your app, it has access to the signals around it: deployments, logs, metrics, project configuration, usage, and connected repositories. That context is what turns a question into an answer and a problem into a fix.

What's new in this beta:

-   **Dashboard chat:** ask questions about your projects and get answers grounded in your real deployment data, right from the dashboard.
    
-   **Production investigations**: point Agent at a failed deployment, a runtime error, or a cost spike, and it traces the cause and recommends a fix.
    
-   **Approved actions**: with your sign-off, Agent can open a PR, roll back, or update a config to remediate an issue.
    

Agent code review works as it does today: Sandbox-validated suggestions on your pull requests, now one capability within a broader Agent.

**You stay in control**

Vercel Agent runs under its own identity and is bounded by the requesting user's permissions. It is read-only by default. When a task requires elevated access, Agent requests a scoped plan and makes no changes until you approve. Generated code runs in Vercel Sandbox before it reaches production, and elevated actions are attributed to the agent, the requester, and the approver.

**Availability**

Dashboard chat, investigations, and approved actions are in public beta for Pro and Enterprise teams. Rollout will be gradual. If you don't have access yet, you can request it in [this form](https://vercel.com/products/early-access).

Simple requests, like finding a setting, explaining a DNS warning, or answering a docs question, are free for a limited number of messages during the beta. Requests that require Agent to investigate, plan, or write code are billed on demand: provider tokens at the underlying rate with no markup, plus a Vercel Token Rate of $0.25 per million tokens. This rate now also applies to Agent code review.

Learn more in the [documentation](https://vercel.com/docs/agent).