---
title: "Vercel Blob now supports consistent reads on private storage"
source: "https://vercel.com/changelog/vercel-blob-now-supports-consistent-reads-on-private-storage"
publishedDate: "2026-07-14"
category: "frontend"
feedName: "Vercel"
author: "Agustin Falco"
---

[Vercel Blob](https://vercel.com/docs/vercel-blob) now supports consistent reads on private storage. Pass `useCache: false` to `get()` or `presignUrl()` for a read that reflects the latest write.

A blob written to a fresh pathname has no existing cached entry, so reads reflect the latest write immediately. When you overwrite a blob at an existing pathname, readers might see the cached version for up to 60 seconds.

When a read must reflect the latest write, like an agent's memory file, a session transcript, or a scheduled JSON report, pass `useCache: false`. These reads bypass the CDN, take longer than cached reads, and incur [Fast Origin Transfer](https://vercel.com/docs/manage-cdn-usage#fast-origin-transfer).

```
import { put, get } from '@vercel/blob';await put('reports/latest.json', JSON.stringify(report), {    access: 'private',});// New blobs are read-after-write consistent: this read reflects the fresh writelet result = await get('reports/latest.json', { access: 'private' });// Overwrite the report at the same pathnameawait put('reports/latest.json', JSON.stringify(updatedReport), {    access: 'private',    allowOverwrite: true,});// A default read can return the previous version for up to 60 seconds.// A consistent read is guaranteed to reflect the update:result = await get('reports/latest.json', {    access: 'private',    useCache: false,});
```

You can also bypass the cache without the SDK. Under the hood, `useCache: false` adds a `cache=0` query parameter to the request. You can set it yourself on a private blob URL:

```
curl "https://<store-id>.private.blob.vercel-storage.com/file.json?cache=0" \  -H "Authorization: Bearer $BLOB_READ_WRITE_TOKEN"
```

Install the latest `@vercel/blob` SDK for consistent reads:

```
npm install @vercel/blob@2.6.1
```

Learn more in the [consistent reads documentation](https://vercel.com/docs/vercel-blob/private-storage#consistent-reads).