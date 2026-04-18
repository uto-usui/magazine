---
title: "Vercel Flags are now optimized for agents"
source: "https://vercel.com/changelog/vercel-flags-are-now-optimized-for-agents"
publishedDate: "2026-03-11"
category: "frontend"
feedName: "Vercel"
author: "Vincent Derks"
---

1 min read

Mar 11, 2026

The [Vercel CLI](https://vercel.com/docs/cli/flags) now supports programmatic flag management, giving teams a direct way to create and manage feature flags from the terminal without opening the dashboard.

```
vercel flags create my-flag
```

**Add the Flags SDK skill**

Building on this foundation, the [Flags SDK skill](https://skills.sh/vercel/flags/flags-sdk) lets AI agents generate and manage flags through natural language prompts.

The skill leverages the CLI under the hood, enabling agents to implement server-side evaluation that prevents layout shifts and maintains confidentiality. Using the SDK's adapter pattern, agents can connect multiple providers and evaluate user segments without rewriting core flag logic.

```
npx skills add vercel/flags
```

Once added, try prompting your agent with this prompt to create your first flag.

Add a feature-flag for setting up a new banner and set it to true for the preview environment

Start generating flags with the [Flags SDK skill](https://skills.sh/vercel/flags/flags-sdk).