---
title: "New GitHub App permissions for Actions and Workflows"
source: "https://vercel.com/changelog/vercel-github-app-updated-permissions"
publishedDate: "2026-03-17"
category: "frontend"
feedName: "Vercel"
author: "Tom Knickman"
---

1 min read

Mar 17, 2026

The [Vercel GitHub App](https://github.com/apps/vercel) now requests two additional repository permissions on install: **Actions** (`read`) and **Workflows** (`read` & `write`).

These permissions enable [Vercel Agent](https://vercel.com/agent) to read workflow run logs to help diagnose CI failures and configure CI workflow files on your behalf. This also allows [v0](https://v0.app/) to create complete, production-ready repositories with configured CI/CD pipelines. To use these features, [accept the updated permissions in your GitHub organization or account settings](https://docs.github.com/en/apps/using-github-apps/approving-updated-permissions-for-a-github-app).

For full details on all permissions requested by the Vercel GitHub App, see the [documentation](https://vercel.com/docs/git/vercel-for-github#repository-permissions).