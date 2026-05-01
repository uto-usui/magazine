---
title: "Custom tags available in beta on Vercel Sandbox"
source: "https://vercel.com/changelog/custom-tags-available-in-beta-on-vercel-sandbox"
publishedDate: "2026-04-29"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

1 min read

Apr 29, 2026

As teams scale isolated environments for AI agents, code generation, or dev workflows, keeping track of which sandbox belongs to whom, and why, becomes critical. Custom tags allow you to organize, filter, and manage [Vercel Sandboxes](https://vercel.com/docs/sandbox) at scale. Each sandbox supports up to five tags.

### [Link to heading](#organize-by-environment,-team,-or-customer)Organize by environment, team, or customer

Tags are flexible by design. Use them to separate staging from production, attribute usage to specific teams, or isolate sandboxes per customer in multi-tenant platforms:

```
const sandbox = await Sandbox.create({  name: "my-sandbox",  tags: { env: "staging" },});
```

### [Link to heading](#update-tags-as-context-changes)Update tags as context changes

Promote a sandbox from staging to production, reassign ownership, or mark it for cleanup without recreating it:

```
await sandbox.update({  tags: { env: "production", team: "infra" },});
```

### [Link to heading](#easily-track-your-sandboxes)Easily track your sandboxes

Filter sandboxes by any tag to quickly surface the ones that matter. This is useful for dashboards, cleanup scripts, or routing logic that needs to find all sandboxes matching a specific environment or team:

```
const productionSandboxes = await Sandbox.list({  tags: { env: "production" },});console.log(  "Production sandboxes:",  productionSandboxes.sandboxes.map((s) => s.name),); // my-sandbox
```

### [Link to heading](#use-cases)Use Cases

-   **AI agents at scale**: Tag sandboxes by session, user, or agent run to track which execution environment belongs to which workflow.
    
-   **Multi-tenant platforms**: Isolate and filter sandboxes per customer or workspace, making billing attribution and cleanup straightforward.
    
-   **Team-level visibility**: Attribute sandbox usage to specific teams for cost tracking or capacity planning.
    

This feature is in beta and requires upgrading to the beta [SDK](https://www.npmjs.com/package/@vercel/sandbox) and [CLI](https://www.npmjs.com/package/sandbox) packages. Learn more in the [documentation](https://vercel.com/docs/vercel-sandbox/concepts/tags).