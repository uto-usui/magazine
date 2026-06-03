---
title: "Vercel Blob now supports OIDC authentication"
source: "https://vercel.com/changelog/vercel-blob-now-supports-oidc-authentication"
publishedDate: "2026-06-01"
category: "frontend"
feedName: "Vercel"
author: "Agustin Falco"
---

1 min read

Jun 1, 2026

[Vercel Blob](https://vercel.com/docs/vercel-blob) now supports OIDC authentication and is the default setting when connecting new projects.

Vercel-issued OIDC tokens are short-lived and rotate automatically, so you no longer need a long-lived `BLOB_READ_WRITE_TOKEN`.

To upgrade an existing store, first update your project to use the latest `@vercel/blob`, then navigate to the [Projects tab](https://vercel.com/d?to=/%5Bteam%5D/~/stores/blob/%5Bstore%5D/projects) under your Blob store and select Upgrade to OIDC from the project's context menu.

Functions running on Vercel receive the token automatically and authenticate requests with it:

app/upload.ts

```
import { put } from '@vercel/blob';const { url } = await put('hello.txt', 'Hello, world!', {  access: 'public',});
```

Uploads a file to Blob using OIDC authentication, no long-lived token required.

The Vercel CLI picks up the same environment variables once you update it, so you and your agents can read and write to a private store from your terminal without a long-lived token:

```
vercel linkvercel env pullvercel blob put hello.txt --from-file ./hello.txtvercel blob listvercel blob del hello.txt
```

Links the project, pulls environment variables, then reads and writes to Blob from the terminal.

Read the [documentation](https://vercel.com/docs/vercel-blob/using-blob-sdk#authentication) to get started.