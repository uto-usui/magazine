---
title: "Manage Vercel Flags segments with Vercel CLI"
source: "https://vercel.com/changelog/manage-vercel-flags-segments-with-vercel-cli"
publishedDate: "2026-07-03"
category: "frontend"
feedName: "Vercel"
author: "Chris Widmaier"
---

[Vercel Flags](https://vercel.com/docs/flags) segments can now be managed from the [Vercel CLI](https://vercel.com/docs/cli/flags) with the new `vercel flags segments` command.

A segment is the targeting primitive a flag uses to decide who sees what. Membership composes from three repeatable tokens: `include:`, `exclude:`, and `rule:`. Pass them to `--add` or `--remove` for incremental edits. For full replacement, `--data` takes the entire segment definition as raw JSON.

```
# Create a segment and seed it with specific usersvercel flags segments create beta-users \  --label "Beta users" \  --add include:user.id=user_123 \  --add include:user.id=user_456# Add a rule-based condition and remove a specific uservercel flags segments update beta-users \  --add rule:user.plan:eq:enterprise \  --remove include:user.id=user_123
```

Combining include, exclude, and rule tokens across create and update

All segment commands support `--json` output, making them scriptable from CI, local workflows, and agent-driven pipelines that need to inspect or update flag targeting from the terminal.

Update to the latest version of the Vercel CLI and learn more in the [Vercel Flags CLI documentation](https://vercel.com/docs/cli/flags) to get started.