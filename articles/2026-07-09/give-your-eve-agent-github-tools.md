---
title: "Give your eve agent GitHub tools"
source: "https://vercel.com/changelog/github-tools-eve"
publishedDate: "2026-07-07"
category: "frontend"
feedName: "Vercel"
author: "Hugo Richard"
---

[GitHub Tools](https://github-tools.com/frameworks/eve) now ships an [eve](https://eve.dev/) toolset through the new `@github-tools/sdk/eve` subpath. One file in `agent/tools/` can register every GitHub tool, or use a preset such as `maintainer`, so you can build a complete GitHub agent in nine lines of code.

```
// agent/instructions.mdYou are a GitHub code review assistant.// agent/agent.tsimport { defineAgent } from "eve";export default defineAgent({  model: "anthropic/claude-sonnet-5",});// agent/tools/github.tsimport { createGithubTools } from "@github-tools/sdk/eve";export default createGithubTools({  preset: "maintainer",});
```

Configure your GitHub agent with the 'maintainer' preset from GitHub Tools

-   **Safe by default:** Every write tool, such as `mergePullRequest`, requires approval unless you opt out. Gate individual tools with `always`, `once`, or an input-dependent predicate; pauses survive restarts and deploys.
    
-   **Presets:** `code-review`, `issue-triage`, `repo-explorer`, `ci-ops`, and `maintainer` scope the toolset, alone or merged.
    
-   **Trimmed reads:** High-volume read tools such as `listPullRequestFiles` and `getCommit` trim what the model sees, while channels still get full payloads.
    

Get started by following the [knowledge base guide](https://vercel.com/kb/guide/github-agent-eve).