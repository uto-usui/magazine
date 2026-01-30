---
title: "Introducing the vercel api CLI command"
source: "https://vercel.com/changelog/introducing-the-vercel-api-cli-command"
publishedDate: "2026-01-27"
category: "frontend"
feedName: "Vercel"
author: "Tom Knickman"
---

1 min read

Jan 27, 2026

`vercel@50.5.1` adds a new `api` command, giving direct access to the full suite of Vercel APIs from your terminal.

The `api` command provides a direct access point for AI agents to interact with Vercel through the CLI. Agents like Claude Code can access Vercel directly with no additional configuration required. If an agent has access to the environment and the Vercel CLI, it inherits the user's access permissions automatically.

List available APIs with `vercel api ls`, build requests interactively with `vercel api`, or send requests directly with `vercel api [endpoint] [options]`.

Get started with `npx vercel@latest api --help`.