---
title: "Vercel CLI commands now scoped to local directory"
source: "https://vercel.com/changelog/vercel-cli-commands-now-scope-to-the-local-directory"
publishedDate: "2026-04-06"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

1 min read

Apr 6, 2026

Commands like `vc project ls` and `vc domains ls` now automatically use the scope of your linked local directory instead of defaulting to your global team.

Previously, querying projects or domains inside a linked repository would return global results, creating an unexpected disconnect between your immediate working environment and the CLI output. This update aligns read-only commands with your local context, though you can still manually override the target team by passing the `--scope` flag.

Run `pnpm i -g vercel@latest` to update to the latest Vercel CLI (at least `v50.40.0`).