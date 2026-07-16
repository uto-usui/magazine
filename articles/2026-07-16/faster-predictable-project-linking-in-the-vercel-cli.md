---
title: "Faster, predictable project linking in the Vercel CLI"
source: "https://vercel.com/changelog/faster-predictable-project-linking-in-the-vercel-cli"
publishedDate: "2026-07-15"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

The [Vercel CLI](https://vercel.com/docs/cli) now resolves your team before discovering projects, then searches for projects only in that team instead of sweeping every team you belong to. Linking is faster and more predictable, and every command that establishes a link (`vercel link`, `deploy`, `pull`, `dev`, and `git connect`) follows the same flow:

-   Teams resolve from an explicit signal (such as `--team`, `--scope`, the `scope` field in `vercel.json`, or `VERCEL_ORG_ID`), if you only have one team, or from a searchable picker.
    
-   Project suggestions begin with projects already linked to your local Git repository, then fall back to an exact folder-name match before opening up search and project creation across the team.
    
-   The `--yes` flag answers confirmations without ever selecting a team for you.
    

For CI and agent workflows, setting `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` makes `vercel link` fully promptless, while `--team` or `--scope` settles the team on any command. When more than one team is available and no signal is set, non-interactive commands fail with an `action_required: missing_scope` error (JSON output) before they create anything or touch an existing link.

**Vercel CLI 55 is a major version bump and includes breaking changes.** If a script relied on `--yes` or your globally selected team to pick where a project links, pass the team explicitly:

```
vercel pull --team your-team-slug
```

Pinning the team for a non-interactive run.

See the [vercel@55.0.0 release notes](https://github.com/vercel/vercel/releases/tag/vercel%4055.0.0) for the full list of changes.

Update the Vercel CLI to v55.0.0 or later with `npm i -g vercel@latest` to get started. Learn more about [project linking](https://vercel.com/docs/cli/link).