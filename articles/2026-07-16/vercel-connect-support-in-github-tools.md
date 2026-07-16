---
title: "Vercel Connect support in GitHub Tools"
source: "https://vercel.com/changelog/vercel-connect-support-in-github-tools"
publishedDate: "2026-07-15"
category: "frontend"
feedName: "Vercel"
author: "Hugo Richard"
---

[GitHub Tools](https://github-tools.com/) now has first-class support for [Vercel Connect](https://vercel.com/connect) through the new `@github-tools/sdk/connect` subpath. Instead of storing a long-lived personal access token, your agent mints short-lived, scoped GitHub tokens at runtime from a connector. There is no secret to store, rotate, or leak.

Attach a GitHub connector to your project and pick a preset:

```
import { connectGithubTools } from "@github-tools/sdk/connect";import { generateText } from "ai";const tools = connectGithubTools("github/my-connector", {  preset: "code-review",});const { text } = await generateText({  model: "anthropic/claude-sonnet-5",  tools,  prompt: "Summarize open PRs on vercel-labs/github-tools.",});
```

Review GitHub PRs with a custom agent

-   **Scopes from presets:** Presets such as `code-review`, `issue-triage`, and `maintainer` map to Connect scopes automatically, so tokens carry only the permissions the toolset needs.
    
-   **Works with eve:** Import from `@github-tools/sdk/connect/eve` and one file in `agent/tools/` registers the full toolset with Connect-backed auth.
    
-   **Multi-tenant ready:** Override `installationId`, `repositories`, or `scopes` per call to target a specific installation or narrow access to individual repos.
    
-   **Zero-config on Vercel:** Deployments automatically authenticate with the OIDC token. For local development, run `vercel link` and `vercel env pull`.
    

For custom tool factories, `connectGithubToken` returns a lazy token provider you can pass to `createGithubTools` directly.

Get started by creating a [GitHub connector](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fconnect%2Fcreate%3Ftype%3Dgithub) and reading the [documentation](https://github-tools.com/guide/vercel-connect).