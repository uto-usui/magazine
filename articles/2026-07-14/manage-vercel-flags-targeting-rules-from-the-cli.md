---
title: "Manage Vercel Flags targeting rules from the CLI"
source: "https://vercel.com/changelog/manage-vercel-flags-targeting-rules-from-the-cli"
publishedDate: "2026-07-13"
category: "frontend"
feedName: "Vercel"
author: "Chris Widmaier"
---

You can now manage targeting rules for [Vercel Flags](https://vercel.com/docs/flags) through the [Vercel CLI](https://vercel.com/docs/cli). With the `vercel flags rules` command, you and your agents can add new rules, move existing ones, and inspect the current ordering without leaving your terminal.

Rules you create from the CLI use the same model as the dashboard. Conditions can target [entities](https://vercel.com/docs/flags/vercel-flags/dashboard/entities) or reusable [segments](https://vercel.com/docs/flags/vercel-flags/dashboard/segments), outcomes can serve a single variant, a weighted split, or a progressive rollout, and rules evaluate top to bottom. For scripts and agents, `vercel flags rules ls --json` prints the full rule set.

```
vercel flags rules add checkout-redesign \  --environment production \  --condition "user.country:in:DE,FR,ES" \  --variant new-checkout
```

Adding a rule in production that serves the new-checkout variant to users in Germany, France, and Spain.

An environment can inherit its flag configuration from another environment. When you add or update a rule in an inheriting environment, the CLI switches that environment to its own configuration, so your rule applies there without changing the environment it inherited from.

Update to the latest Vercel CLI version and run `vercel flags rules` to get started. Learn more in the [Vercel Flags CLI documentation](https://vercel.com/docs/cli/flags).