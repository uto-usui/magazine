---
title: "Split-tgz is now the default CLI archive deployment behavior"
source: "https://vercel.com/changelog/split-tgz-is-now-the-default-cli-archive-deployment-behavior"
publishedDate: "2025-02-11"
category: "frontend"
feedName: "Vercel"
author: "Austin Merrick"
---

1 min read

Feb 11, 2025

Archive deployments are useful for deploying large projects with thousands of files from the CLI.

We [previously released the split-tgz archive deployment](https://vercel.com/changelog/cli-archive-deployments-are-now-up-to-30-faster-with-split-tgz-archive) as a new archive option: `vercel deploy --archive=split-tgz`. This new capability offered up to 30% faster uploads and avoided [file upload size limits](https://vercel.com/docs/limits/overview#static-file-uploads).

We’ve confirmed `split-tgz`’s stability and made it the default behavior for `tgz`. This means the separate **`split-tgz`** **option is now deprecated** as the `split-tgz` functionality and benefits power the default `tgz` option.

Learn more about [CLI archive deployments](https://vercel.com/docs/cli/deploy#archive).