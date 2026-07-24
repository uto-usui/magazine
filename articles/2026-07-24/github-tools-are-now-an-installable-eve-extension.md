---
title: "GitHub tools are now an installable eve extension"
source: "https://vercel.com/changelog/github-tools-eve-extension"
publishedDate: "2026-07-23"
category: "frontend"
feedName: "Vercel"
author: "Hugo Richard"
---

You can now add [GitHub tools](https://github-tools.com/) to your eve agent as an [extension](https://eve.dev/integrations/github-tools).

Add the package, drop one file in `agent/extensions/`, and your agent gets all 42 tools with Vercel Connect auth, presets, and approval rules built in.

**Install** `@github-tools/eve-extension`:

```
pnpm add @github-tools/eve-extension
```

**Then register it from a file in** `agent/extensions/`:

agent/extensions/github.ts

```
import githubExtension from '@github-tools/eve-extension'export default githubExtension({  connector: 'github/my-connector',  preset: 'code-review',  requireApproval: {    addPullRequestComment: ({ toolInput }) => toolInput?.owner !== 'vercel-labs',  },})
```

One file registers the code-review toolset, with approval required before commenting outside your own org.

-   **Connector-backed auth:** Pass a [Vercel Connect](https://vercel.com/connect) connector and the extension mints short-lived, scoped GitHub tokens at runtime.
    
-   **Presets scope the toolset:** `code-review`, `issue-triage`, `repo-explorer`, `ci-ops`, and `maintainer` map to Connect scopes automatically, so tokens carry only the permissions the tools need.
    
-   **Approval rules travel with the config:** Every write tool requires approval by default. Gate individual tools with `always`, `once`, or an input-dependent predicate, like approving comments only outside your own org.
    
-   **Namespaced and versioned:** The filename sets the namespace, so tools run in the agent as `github__addPullRequestComment`. Upgrade the package to pick up new tools and fixes, and the config schema is validated on import.
    

Get started by creating a [GitHub connector](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fconnect%2Fcreate%3Ftype%3Dgithub) and reading the [documentation](https://github-tools.com/frameworks/eve#eve-extension).