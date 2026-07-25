---
title: "Inspect feature flag history with Vercel CLI"
source: "https://vercel.com/changelog/inspect-feature-flag-history-with-vercel-cli"
publishedDate: "2026-07-23"
category: "frontend"
feedName: "Vercel"
author: "Chris Widmaier"
---

[Vercel Flags](https://vercel.com/docs/flags/vercel-flags) version history can now be inspected from the Vercel CLI with the new `vercel flags versions` command.

Run `vercel flags versions <flag>` to print the full revision history for a flag, with each revision's author, message, timestamp, and changed environments. Filter to a specific environment with `--environment`, paginate with `--limit` and `--cursor`, or add `--json` for scripting.

```
vercel flags versions my-flagvercel flags versions my-flag --environment production
```

Printing the revision history for a flag, optionally filtered to one environment

To compare a revision against the one before it, run `vercel flags versions diff <flag> --revision <n>`. The diff is semantic, surfacing field-level changes to targeting rules, rollout percentages, and conditions. Additions, removals, and modifications appear as colored `+`, `-`, and `~`.

```
vercel flags versions diff my-flag --revision 42
```

Comparing revision 42 against the revision before it

Update to the latest version of the Vercel CLI and learn more in the [Vercel Flags CLI documentation](https://vercel.com/docs/cli/flags#viewing-version-history) to get started.