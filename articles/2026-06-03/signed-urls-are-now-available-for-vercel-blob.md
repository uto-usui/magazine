---
title: "Signed URLs are now available for Vercel Blob"
source: "https://vercel.com/changelog/signed-urls-are-now-available-for-vercel-blob"
publishedDate: "2026-06-02"
category: "frontend"
feedName: "Vercel"
author: "Agustin Falco"
---

1 min read

Jun 2, 2026

You can now generate time-bound signed URLs for [Vercel Blob](https://vercel.com/docs/vercel-blob). A signed URL is a scoped URL with an expiry that allows you to upload, download, inspect, or delete a specific object without giving access to your entire Blob store.

Each URL is scoped to a single operation (`put`, `get`, `head`, or `delete`), a single pathname, and an expiry you choose, up to 7 days. The signature covers the operation and constraints, so a URL signed for a `GET` can't be reused as a `PUT`.

presigned-get.ts

```
import { issueSignedToken, presignUrl } from '@vercel/blob';const token = await issueSignedToken({  operations: ['get'],});const { presignedUrl } = await presignUrl(token, {  pathname: 'invoices/2026-q1.pdf',  operation: 'get',  validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes});// On client<img src={presignedUrl} />
```

Issue a token, mint a 5-minute read URL, and let the browser render the object directly.

## [Link to heading](#direct-uploads-from-the-browser)Direct uploads from the browser

Upload URLs (`put`) support multipart, so the browser can stream large files straight to Blob storage without round-tripping through your server.

presigned-put.ts

```
import { presignUrl } from '@vercel/blob';const { presignedUrl } = await presignUrl(token, {  pathname: 'user-uploads/avatar.png',  operation: 'put',  validUntil: Date.now() + 15 * 60 * 1000,});// On clientawait fetch(presignedUrl, { method: 'PUT', body: file })
```

Mint a 15-minute upload URL so the browser writes the file straight to Blob.

## [Link to heading](#conditional-deletes)Conditional deletes

Delete URLs accept an `ifMatch` option so the delete only applies if the object hasn't been overwritten since you signed the URL:

presigned-delete.ts

```
import { presignUrl } from '@vercel/blob';const { presignedUrl } = await presignUrl(token, {  pathname: 'tmp/session.json',  operation: 'delete',  validUntil: Date.now() + 60 * 1000,  ifMatch: '"a1b2c3"', // ETag of the version you intend to remove});// On clientawait fetch(presignedUrl, { method: 'DELETE' })
```

The delete no-ops if the ETag has changed since you signed the URL.

Signed URLs work alongside [OIDC](https://vercel.com/changelog/vercel-blob-now-supports-oidc-authentication). Your server authenticates to Blob via OIDC, generates a signed token, and produces narrowly scoped, time-bound URLs for the browser, so your long-lived `BLOB_READ_WRITE_TOKEN` never leaves the server.

Update `@vercel/blob` to `2.4.0` and [read the documentation](https://vercel.com/docs/vercel-blob/vercel-signed-urls) to get started.