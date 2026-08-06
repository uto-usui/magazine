---
title: "Vercel Sandbox now supports Devin Outposts"
source: "https://vercel.com/changelog/vercel-sandbox-now-supports-devin-outposts"
publishedDate: "2026-08-04"
category: "frontend"
feedName: "Vercel"
author: "Elisabeth Rülke"
---

[Vercel Sandbox](https://vercel.com/sandbox) now supports [Devin Outposts](https://docs.devin.ai/cloud/outposts/overview). Each Devin session executes in its own isolated Sandbox microVM, with no local Outpost worker to keep online.

The Devin control plane stays with Cognition, where the agent loop handles inference and planning. Session orchestration and command execution run in your Vercel project, and a [durable workflow](https://vercel.com/workflows) manages each session's lifecycle.

With the integration, teams can:

-   Preserve session state with [Sandbox snapshots](https://vercel.com/docs/sandbox/concepts/snapshots).
    
-   Apply Devin network policies through [Sandbox firewall rules](https://vercel.com/changelog/advanced-egress-firewall-filtering-for-vercel-sandbox).
    

To get started, [deploy the quickstart](https://github.com/vercel-labs/devin-outpost-vercel) and approve the connection as a Devin administrator. Encrypted credentials are added to your project automatically, with no token or API key to copy. Then start a session in Devin and select the new Vercel outpost as its virtual environment.

The integration is available to Pro and Enterprise teams with Devin Outposts enabled. Learn more in the [knowledge base guide](https://vercel.com/kb/guide/devin-outposts-vercel-sandbox).