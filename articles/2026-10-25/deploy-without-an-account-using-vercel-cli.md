---
title: "Deploy without an account using Vercel CLI"
source: "https://vercel.com/changelog/deploy-without-an-account-using-vercel-cli"
publishedDate: "2026-10-22"
category: "frontend"
feedName: "Vercel"
author: "TMO"
---

You can now deploy apps to Vercel without an account using [Vercel CLI](https://vercel.com/docs/cli). Share prototypes faster with a live URL before signing in to claim your project.

From a project directory that isn't linked to Vercel, run:

```
# Deploy the current projectvercel deploy --temporary# Deploy a single filevercel deploy --temporary prototype.html
```

Deploying a project or single file without a Vercel account

The CLI builds your project locally when needed and returns a deployment URL you can share.

Temporary deployments use the dedicated `tmp.now` domain, separate from `vercel.app`, and expire after one hour unless claimed.

To keep your project live, open the claim link in the CLI output and sign in or create an account. Keep this link private.

Read the [Vercel CLI documentation](https://vercel.com/docs/cli/deploy) to get started.