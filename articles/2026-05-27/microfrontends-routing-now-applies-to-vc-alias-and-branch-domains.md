---
title: "Microfrontends routing now applies to vc alias and branch domains"
source: "https://vercel.com/changelog/microfrontends-routing-now-applies-to-vc-alias-and-branch-domains"
publishedDate: "2026-05-26"
category: "frontend"
feedName: "Vercel"
author: "Kit Foster"
---

1 min read

May 26, 2026

This week we are gradually rolling out an update to [Vercel Microfrontends](https://vercel.com/docs/microfrontends) routing for aliases and branch-assigned domains.

**Aliases inherit Microfrontends routing**Aliasing a Microfrontends URL with [`vc alias`](https://vercel.com/docs/cli/alias) now preserves the full `microfrontends` routing config from the source deployment. Previously, the new alias only inherited the `deploymentId`. Update to the latest [Vercel CLI](https://vercel.com/docs/cli) to pick up the change.

**Branch domains route across all projects**A [project domain assigned to a git branch](https://vercel.com/docs/domains/working-with-domains/assign-domain-to-a-git-branch) now routes to that branch in every project in the Microfrontend that shares the branch name. Previously, the domain only routed to that branch within the project that owned the domain.

See the [Microfrontends documentation](https://vercel.com/docs/microfrontends) for details on routing, aliases, and domain assignment.