---
title: "CLI archive deployments are now up to 30% faster with split-tgz archive option"
source: "https://vercel.com/changelog/cli-archive-deployments-are-now-up-to-30-faster-with-split-tgz-archive"
publishedDate: "2025-01-16"
category: "frontend"
feedName: "Vercel"
author: "Austin Merrick"
---

1 min read

Jan 16, 2025

The [archive option](https://vercel.com/docs/cli/deploy#archive) was introduced for CLI deployments hitting rate limits like the [limit on the maximum amount of files](https://vercel.com/docs/limits/overview#files). [Prebuilt deployments](https://vercel.com/docs/cli/deploy#prebuilt) commonly use archive uploads as they generate thousands of files at build time.

Previously, archive deployments were always compressed into one large file with the only existing `--archive` option, `tgz`. Deployments using `tgz` may hit the [file size upload limit](https://vercel.com/docs/limits/overview#static-file-uploads). Additionally, uploading one large archive file is slower than uploading multiple file parts.

The **beta** **`split-tgz`** **format** resolves these issues by splitting large archives into smaller parts. **`split-tgz`** avoids the static file upload limit and uploads large prebuilt projects **up to 30% faster**.

**Example usage:** **`vercel deploy --archive=split-tgz`**

Learn more about [CLI deployments](https://vercel.com/docs/cli/deploy#vercel-deploy).