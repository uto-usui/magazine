---
title: "SSH into running Vercel Sandboxes with the CLI"
source: "https://vercel.com/changelog/ssh-into-running-sandboxes-with-the-sandbox-cli"
publishedDate: "2026-01-15"
category: "frontend"
feedName: "Vercel"
author: "Gal Schlezinger"
---

1 min read

Jan 15, 2026

You can now open secure, interactive shell sessions to running Sandboxes with the [Vercel Sandbox CLI](https://vercel.com/docs/vercel-sandbox/cli-reference).

```
pnpm i -g sandboxsandbox loginsandbox create # If you don't have a running Sandbox to SSH intosandbox ssh <sandbox-id>
```

Note: While you’re connected, the Sandbox timeout is automatically extended in 5-minute increments to help avoid unexpected disconnections, for [up to 5 hours](https://vercel.com/docs/vercel-sandbox/pricing#maximum-runtime-duration).

Learn more in the [Sandbox CLI docs](https://vercel.com/docs/vercel-sandbox/cli-reference#sandbox-ssh).