---
title: "Sub-second artifact deployments are now supported in Vercel CLI"
source: "https://vercel.com/changelog/sub-second-artifact-deployments-are-now-supported-in-vercel-cli"
publishedDate: "2026-09-17"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

You and your agents can now deploy static artifacts to Vercel in under one second through Vercel CLI.

Run `vercel deploy` to share a prototype, publish an HTML report, or preview a page created by your coding agent.

```
vercel deploy ./my-static-site --prod✓ Created         acme/my-static-site  Inspect         https://vercel.com/acme/my-static-site/9pXk2mQvL7RwYzT4d  Production      https://my-static-site-k3v9x2m1q.vercel.app▲ Aliased         https://my-static-site.vercel.app✓ Ready in 802ms
```

Vercel automatically detects eligible deployments, and valid artifacts will skip the build step, immediately returning a live URL.

Instant deployments support directories with:

-   Up to 10 HTML or Markdown files
    
-   A total size of 5 MB or less
    

Supported file extension include `.html`, `.htm`, and `.md.`

Update to Vercel CLI version `59.16.0` or later to get started, and run `vercel deploy --help` for all available options.