---
title: "Simplified onboarding for deepsec"
source: "https://vercel.com/changelog/simplified-onboarding-for-deepsec"
publishedDate: "2026-08-10"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

[deepsec](https://deepsec.sh/), the open-source security review harness from Vercel, now lets you set up a repository and run its first security review with a single command.

```
npx deepsec init
```

Initializing deepsec from the repository root

The `init` command now automates the standard setup process:

-   creates the isolated `.deepsec/` workspace, the only thing added to your repository, and installs its dependencies
    
-   configures model access, through [Vercel AI Gateway](https://vercel.com/ai-gateway) or your own provider keys
    
-   generates a description of the codebase and its attack surface that every later review depends on
    
-   runs a pattern scan, generating extra scan patterns where the built-in set leaves coverage gaps
    
-   starts the AI review of the flagged files
    

Setup is checkpointed after each step. If a run stops, whether from closing the process, a failed step, or a hit cost or duration limit, re-running `init` resumes from the last completed step.

Run `npx deepsec init` to start your first scan, or read the [docs](https://deepsec.sh/docs/getting-started) to learn more.