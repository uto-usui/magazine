---
title: "Agents can now buy domains with the Vercel CLI"
source: "https://vercel.com/changelog/agents-can-now-buy-domains-with-the-vercel-cli"
publishedDate: "2026-10-09"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

Your agent can now use the [Vercel CLI](https://vercel.com/cli) to buy a domain.

```
buy a domain for this site with the vercel CLI, something like "shipsf26"
```

Prompt your agent to search for and buy a domain.

The agent discovers candidates with `vercel domains search`, checks availability and registrar pricing with `vercel domains check` and `vercel domains price`, and initiates the purchase with `vercel domains buy`.

The purchase decision itself stays with you by design. Run non-interactively, `vercel domains buy` returns a structured, machine-readable error and the suggested next commands, so the agent hands the confirmation back to you, prohibiting it from spending money without your approval.

You can confirm the price, the auto-renew choice, and the registrant contact details in an interactive terminal or the dashboard.

The CLI ships an agent-facing skill covering the discovery, pricing, and purchase workflow, so agents will follow the full sequence without being told the steps.

Read the [documentation](https://vercel.com/docs/cli/domains) to get started.