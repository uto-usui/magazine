---
title: "Use native curl syntax with Vercel CLI"
source: "https://vercel.com/changelog/use-native-curl-syntax-with-vercel-cli"
publishedDate: "2026-05-15"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

1 min read

May 15, 2026

You can now use native `curl` syntax with the Vercel CLI. The [`vercel curl`](https://vercel.com/docs/cli/curl) command accepts full URLs, bare hostnames, and the `--url` flag, and uses your Vercel auth to bypass [Deployment Protection](https://vercel.com/docs/deployment-protection).

```
vercel curl https://example.vercel.app/api/hellovercel curl example.vercel.app/api/users -X POST -H "Content-Type: application/json" -d '{"name":"Ada"}'vercel curl --url https://example.vercel.app/api/status --compressed
```

URL-based invocations against any deployment

If you've linked a project, you can also pass just a path:

```
vercel curl /api/hellovercel curl /api/users -X POST -d '{"ok":true}'
```

Path-based invocations against the linked project

Update to the latest Vercel CLI version and run `vercel curl` to get started. Learn more in the [Vercel CLI documentation](https://vercel.com/docs/cli).