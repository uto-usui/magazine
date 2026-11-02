---
title: "Introducing Vercel CI"
source: "https://vercel.com/blog/introducing-vercel-ci"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Vercel"
author: "Anthony Shew"
---

Coding agents are opening more pull requests than ever, and each one waits on CI before anyone can review or merge it. Most CI systems run the entire workflow on every push, even a one-line change. The more your agents push, the more time you spend waiting on CI.

Today, we're announcing Vercel CI in Beta. It runs only the tasks affected by your code change, and spins up only the compute those checks need, the same way [Fluid compute](https://vercel.com/blog/fluid-compute-takes-any-shape) scales with your traffic.

At Vercel, our CI now keeps up with our coding agents. Time from `git push` to "CI passed" is **2-6x faster** than it was before.

## [Copy link to heading](#how-it-works)How it works

Vercel CI uses Turborepo to understand your tasks and which ones depend on each other. It reads `turbo.json`, so if you're already using Turborepo, there's no separate CI config to write.

If you're not on Turborepo yet, add `turbo.json` and the `turbo` package. It works in single-package repos too.

Then tag the tasks you want Vercel CI to run.

turbo.json

```
{  "tasks": {    "lint": {      "tags": ["ci"]    }  }}
```

`"tags": ["ci"]` is all you need to get started. No workflow YAML to maintain, no drift between your CI config and `turbo.json`, and Remote Cache is on by default.

When you or your agent push code, Vercel CI determines which tasks need to run based on the change. Tasks whose inputs haven't changed come from cache. The remaining tasks each run on their own machine, powered by [Hive](https://vercel.com/blog/a-deep-dive-into-hive-vercels-builds-infrastructure), Vercel's compute layer, and start as soon as their dependencies finish.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6B3V6OLLfucwAmXXTxFDHs%2F1d737ac9dd5740d29d6cf39060992a04%2Fci-task-graph-desktop-light.png&w=3840&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F8AMkUBs6vBlLYaW8oLp5D%2Fda7a3bb63cf3199b687b49741dd6f0b0%2Fci-task-graph-desktop-dark.png&w=3840&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1QPxGZY3BOLK32dgml9PB6%2F8ad8e7150999677d0272e54abe4bcf39%2Fci-task-graph-mobile-light.png&w=1920&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7a7BZ2Zz6tghqb68qFlY12%2F67dc5a051990de5a5c2878953ea30105%2Fci-task-graph-mobile-dark.png&w=1920&q=95)

Vercel CI gives each task the compute it needs and nothing more.

## [Copy link to heading](#running-your-ci-on-vercel)Running your CI on Vercel

To get started, follow the [documentation](https://vercel.com/docs/ci) or prompt your agent from your repo:

Once set up, you or your agent can watch and inspect CI through the [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fci&title=CI), [Vercel CLI](https://vercel.com/docs/cli/ci), or [Vercel MCP](https://vercel.com/docs/agent-resources/vercel-mcp). When something fails, go straight to the failing task, see what's blocked behind it, and open its logs, or search across recent runs to see whether a test has been flaky all week.

Terminal

```
vc ci ls # List CI runs for the repositoryvc ci inspect <run> # List tasks for a runvc ci logs <run> # Get logs for all tasks in a runvc ci logs <run> --task web#test --level=error # Get stderr for a specific taskvc ci grep "WARNING" # Search across run logs for a string
```

Vercel CI posts a check to your pull request on GitHub, so your existing branch protection rules can block merges on failure, the same way they do today.

## [Copy link to heading](#closing-the-loop)Closing the loop

Vercel CI has already completed nearly 8 million tasks across our own repositories and the private beta, and we're just getting started. We're working to keep shrinking the time between writing code and running it in production.

As we work toward general availability, we plan to add:

-   Advanced observability
    
-   A `vc ci` CLI command for distributed execution before pushing code
    
-   More granular test selection
    

[Vercel CI is available in Beta today](https://vercel.com/changelog/vercel-ci-is-now-in-beta) on all plans. [Read the docs](https://vercel.com/docs/ci) and try it on your repository.