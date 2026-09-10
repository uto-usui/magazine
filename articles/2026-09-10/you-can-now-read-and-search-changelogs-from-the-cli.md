---
title: "You can now read and search changelogs from the CLI"
source: "https://vercel.com/changelog/you-can-now-read-and-search-changelogs-from-the-cli"
publishedDate: "2026-09-09"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

You and your agents can now read and search the Vercel changelog feed from your terminal using `vercel changelog`.

Coding agents can use this command to discover new Vercel products and features, find updates relevant to your project, and read full announcements to inform their recommendations.

`vercel changelog` returns the latest five changelogs with full Markdown content. You can also set the number of results, search all changelogs using a keyword, and access JSON output for scripts and agents.

```
# return the latest 5 changelogsvercel changelog# set the number of resultsvercel changelog --limit 10 # search using a keywordvercel changelog search "AI SDK"# output changelogs as JSONvercel changelog --json
```

Update the Vercel CLI to version `59.6.0` or later and run `vercel changelog` to get started. See `vercel changelog --help` for all available options.