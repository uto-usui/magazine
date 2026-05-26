---
title: "Configure weighted traffic splits for Vercel Flags from the Vercel CLI"
source: "https://vercel.com/changelog/configure-weighted-traffic-splits-for-vercel-flags-from-the-vercel-cli"
publishedDate: "2026-05-21"
category: "frontend"
feedName: "Vercel"
author: "Chris Widmaier"
---

1 min read

May 21, 2026

You can now configure weighted traffic splits for [Vercel Flags](https://vercel.com/docs/vercel-flags) with the new `vercel flags split` command in the Vercel CLI. This allows you to send a percentage of traffic to one variant and the rest to another.

Run the command interactively, or pass the environment, bucketing attribute, and variant weights as flags:

```
vercel flags split redesigned-checkout \  --environment production \  --by user.id \  --weight off=95 \  --weight on=5
```

Sets a 95/5 weight split on redesigned-checkout for production, bucketing by user.id

Update to the latest version of the [Vercel CLI](https://vercel.com/docs/cli) and read the [documentation](https://vercel.com/docs/cli/flags#configuring-a-weighted-split) to get started.