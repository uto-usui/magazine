---
title: "Vercel Agent now installs private packages from npm and custom registries"
source: "https://vercel.com/changelog/vercel-agent-now-installs-private-packages-from-npm-and-custom-registries"
publishedDate: "2026-09-30"
category: "frontend"
feedName: "Vercel"
author: "Matan Kushner"
---

Vercel Agent can install private dependencies from npm and custom registries using credentials stored as shared environment variables on Vercel. `npm`, `pnpm`, and classic Yarn running in Agent sessions authenticate as they do in Vercel builds.

To get started, add a [shared environment variable](https://vercel.com/docs/environment-variables/shared-environment-variables) for Development or Preview:

-   Use `NPM_TOKEN` for private packages hosted on [registry.npmjs.org](https://registry.npmjs.org/).
    
-   Use `NPM_RC` to configure custom or multiple registries.
    

Vercel Agent reads only team-shared variables, not project-scoped ones. Credential values stay outside the sandbox, so the agent cannot read them.

Learn more in the [private dependencies docs](https://vercel.com/docs/agent/private-dependencies).