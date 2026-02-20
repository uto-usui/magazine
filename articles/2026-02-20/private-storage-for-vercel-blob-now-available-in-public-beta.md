---
title: "Private storage for Vercel Blob, now available in public beta"
source: "https://vercel.com/changelog/private-storage-for-vercel-blob-now-available-in-public-beta"
publishedDate: "2026-02-19"
category: "frontend"
feedName: "Vercel"
author: "Agustin Falco"
---

1 min read

Feb 19, 2026

Vercel Blob now supports private storage for sensitive files like contracts, invoices, and internal reports. Private storage requires authentication for all operations, preventing exposure via public URLs.

Public storage allows public reads for media assets, while private storage requires authentication.

Create a private store via the [Storage dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fstores&title=Vercel+Storage) or with the CLI:

**CLI command**

```
vercel blob create-store [name] --access private
```

When created inside a linked Vercel project, the CLI prompts you to connect the store, automatically adding the `BLOB_READ_WRITE_TOKEN` environment variable. The SDK uses this variable to authenticate operations in your deployments.

**SDK installation**

```
pnpm add @vercel/blob@2.3
```

To upload, use `put` or `upload` with the `access: 'private'` option.

**Upload example**

upload.ts

```
import { put } from '@vercel/blob';export async function POST(request: Request) {  // Your auth goes here: await authRequest(req)  const filename = request.nextUrl.searchParams.get('filename');  const blob = await put(filename, request.body, {    access: 'private',  });  return Response.json(blob);}
```

To download, use the `get` method to stream files.

**Retrieval example**

retrieve.ts

```
import { get } from '@vercel/blob';export async function GET(req: Request) {  // Your auth goes here: await authRequest(req)  const filename = request.nextUrl.searchParams.get('filename');  const { stream, blob } = await get(filename, {    access: "private",  });  return new Response(stream, {    headers: {      "Content-Type": blob.contentType,    },  });}
```

Private storage is in beta on all plans with standard [Vercel Blob pricing](https://vercel.com/docs/storage/vercel-blob/usage-and-pricing).

[Learn more about private storage](https://vercel.com/docs/storage/vercel-blob/private-storage).