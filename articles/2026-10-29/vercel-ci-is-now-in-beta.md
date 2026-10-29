---
title: "Vercel CI is now in beta"
source: "https://vercel.com/changelog/vercel-ci-is-now-in-beta"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Vercel"
author: "Anthony Shew"
---

You can now run CI for your Turborepo with one line of configuration.

turbo.json

```
{  "tasks": {    "lint": {      "tags": ["ci"]    }  }}
```

Use tags to make a task run in Vercel CI.

In Vercel's internal repositories, our wait time from `git push` to "CI passed" is 2-6x shorter, dramatically improving our CI's ability to keep up with our coding agents.

To get started, prompt your agent in your repo:

Each task marked with a `ci` tag runs on every push. Vercel CI automatically takes care of:

-   Only running CI that is affected by your code changes
    
-   Task caching with [Vercel Remote Cache](https://vercel.com/docs/monorepos/remote-caching#vercel-remote-cache)
    
-   Installing dependencies once per run
    
-   Caching dependencies across code updates
    

To learn more: