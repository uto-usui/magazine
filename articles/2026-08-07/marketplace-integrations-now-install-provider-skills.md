---
title: "Marketplace integrations now install provider skills"
source: "https://vercel.com/changelog/vercel-marketplace-agent-skills"
publishedDate: "2026-08-06"
category: "frontend"
feedName: "Vercel"
author: "Jathin Singaraju"
---

When you install a [Vercel Marketplace](https://vercel.com/marketplace) integration from the Vercel CLI, it now also installs that provider's agent skills from [skills.sh](https://www.skills.sh/), so your agents know how to use it:

```
vercel integration add neon
```

Provision the Neon integration and install its agent skills in one step.

This happens automatically for any provider that publishes skills.

You can also find integrations without leaving the terminal:

-   `vercel integration discover` browses available providers.
    
-   `vercel integration categories` lists all the Marketplace categories they're grouped into, like databases, AI, and observability.
    

Update to the latest Vercel CLI with `npm i -g vercel@latest`, then read the [integration documentation](https://vercel.com/docs/cli/integration) to get started.