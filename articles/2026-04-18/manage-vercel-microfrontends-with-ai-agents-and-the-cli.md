---
title: "Manage Vercel Microfrontends with AI Agents and the CLI"
source: "https://vercel.com/changelog/manage-vercel-microfrontends-with-ai-agents-and-the-cli"
publishedDate: "2026-04-07"
category: "frontend"
feedName: "Vercel"
author: "Tim White"
---

1 min read

Apr 7, 2026

Vercel Microfrontends now include two new setup and management tools: an AI skill for coding agents and new Vercel CLI commands.

**New Vercel Microfrontends skill:** Install the Microfrontends skill to let your AI coding agent guide you through group creation with natural language prompts. It will automatically generate `microfrontends.json`, wire up framework integrations, and manage projects, all without leaving your editor.

```
npx skills add vercel/microfrontends
```

Once added, ask your agent to create your first microfrontend group using this prompt.

Create a new microfrontend group for my projects. Walk me through setting up the group. Add the necessary projects and configure the default app and routes.

Get started with the [Microfrontends skill](https://skills.sh/vercel/microfrontends/vercel-microfrontends).

**New CLI commands:** The [Vercel CLI](https://vercel.com/docs/cli/microfrontends) now includes commands for managing microfrontend groups, so you can create, inspect, and manage groups from the terminal without opening the dashboard.

-   `vercel microfrontends create-group`
    
-   `vercel microfrontends inspect-group`
    
-   `vercel microfrontends add-to-group`
    
-   `vercel microfrontends remove-from-group`
    
-   `vercel microfrontends delete-group`
    

Learn more in the [CLI docs](https://vercel.com/docs/cli/microfrontends).