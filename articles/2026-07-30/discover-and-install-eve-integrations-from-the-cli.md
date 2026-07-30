---
title: "Discover and install eve integrations from the CLI"
source: "https://vercel.com/changelog/discover-and-install-eve-integrations-from-the-cli"
publishedDate: "2026-07-29"
category: "frontend"
feedName: "Vercel"
author: "Colton Padden"
---

You can now discover and install integrations for [eve](https://eve.dev/) agents directly from the eve CLI. Integrations come from the official eve catalog and third-party sources.

Run `eve add` from your eve project to install an integration:

```
eve add extension/agent-browsereve add channel/slackeve add connection/verceleve add instrumentation/braintrust
```

Add the Agent Browser extension, a Slack channel, the Vercel MCP connection, and Braintrust instrumentation

Integrations write their files directly into your project and can add anything an eve agent uses, from a single tool to a channel to a full extension. Review the generated files and add any required configuration before running your agent.

**Find integrations with the new** **`eve registry`** **commands:**

-   `eve registry list`: List available integrations.
    
-   `eve registry search <term>`: Search the catalog for a capability, like `browser`.
    
-   `eve registry view <name>`: Inspect an integration before you install it.
    

You can also browse the [integrations directory](https://eve.dev/integrations) to see the official catalog.

**Add third-party sources with a namespace and URL template**:

```
eve registry add @acme=https://registry.acme.com/r/{name}.json
```

Then install from that source with `eve add @acme/analytics`. Registries use the [shadcn registry format](https://ui.shadcn.com/docs/registry), so any compatible registry works.

You can also pass an integration URL directly without configuring a source:

```
eve add https://registry.acme.com/r/analytics.json
```

Integrations can add dependencies and write files, so treat them like project code. Add sources you trust, inspect integrations with `eve registry view`, and review the project diff before you run the agent.

Get started by reading the [documentation](https://eve.dev/docs/install-integrations) and browsing the [directory](https://eve.dev/integrations).