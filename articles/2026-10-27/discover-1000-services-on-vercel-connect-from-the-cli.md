---
title: "Discover 1000+ services on Vercel Connect from the CLI"
source: "https://vercel.com/changelog/discover-1000-services-on-vercel-connect-from-the-cli"
publishedDate: "2026-10-26"
category: "frontend"
feedName: "Vercel"
author: "Bhrigu Srivastava"
---

You and your agents can now browse and search more than 1000 services available in [Vercel Connect](https://vercel.com/docs/connect) without leaving your terminal. `vercel connect discover` searches by name, alias, keyword, and description.

```
vercel connect discover crm
```

Results can be filtered by category, connection method (such as `mcp` or `oauth`) or the product a service exposes. You can also limit results to services that forward webhook triggers. `vercel connect categories` lists the category slugs you can filter by. Both commands support `--format=json` for scripts and agents.

```
vercel connect discover --category ai --category datavercel connect discover --connection-method mcpvercel connect discover --supports-triggers
```

You can then pass the service name while creating any connector to the command:

```
vercel connect create slack
```

Create a slack connector via CLI.

Update to version 64.1.0 or later of the CLI to get started, and read the [Vercel Connect CLI docs](https://vercel.com/docs/cli/connect) to learn more.