---
title: "v0 now reads npm credentials from shared environment variables"
source: "https://vercel.com/changelog/v0-now-reads-npm-credentials-from-shared-environment-variables"
publishedDate: "2026-09-18"
category: "frontend"
feedName: "Vercel"
author: "Vishal Yathish"
---

[v0](https://v0.app/) now installs private packages from npm and custom registries using credentials stored as shared environment variables on Vercel.

This makes it easier for teams to build with their existing design systems, component libraries, and internal packages directly in v0.

To get started, add one of the following as a [shared environment variable](https://vercel.com/docs/environment-variables/shared-environment-variables) on Vercel, scoped to Development and/or Preview:

-   Use `NPM_TOKEN` for private packages hosted on `registry.npmjs.org`.
    
-   Use `NPM_RC` to configure custom or multiple registries.
    

`NPM_RC` supports scoped registries and references to other environment variables. For example, configure an organization scope such as `@acme` for GitHub Packages, or direct package requests through a private JFrog Artifactory registry.

Credentials can be marked sensitive, and v0 never exposes them to the model or writes them to the sandbox filesystem.

You can view the integration status from **Settings → Integrations** in v0.

Learn more in the [private dependencies docs](https://v0.app/docs/private-dependencies).