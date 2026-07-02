---
title: "Vercel Private Blob is now generally available"
source: "https://vercel.com/changelog/vercel-private-blob-is-now-generally-available"
publishedDate: "2026-06-30"
category: "frontend"
feedName: "Vercel"
author: "Agustin Falco"
---

Vercel Private Blob is now generally available for all plans. Store sensitive files like user-uploaded photos, invoices, and agent memory, and control exactly who can read them. Private stores, Signed URLs, and OIDC authentication all graduate from beta with this release.

Vercel Private Blob uses the same Blob API as public blobs. Specify `access: 'private'` when uploading a blob:

```
import { put } from '@vercel/blob';await put('invoices/2026-q1.pdf', file, {    access: 'private',});
```

### [Link to heading](#oidc-authentication)OIDC authentication

Functions running on Vercel now authenticate to Vercel Private Blob with a short-lived, auto-rotating OIDC token scoped to the project, with no static read-write token in your environment.

The Vercel CLI also supports OIDC authentication, so you can read from and write to a private store from your terminal without a long-lived token. For stores still using a static token, you can upgrade to OIDC and revoke the old credential from the dashboard.

### [Link to heading](#signed-urls)Signed URLs

Mint a URL scoped to a single operation, pathname, and an expiration date you choose for up to 7 days, then hand it to a client to perform a `PUT`, `GET`, `HEAD`, or `DELETE` operation on a single object, without ever exposing your store credentials.

```
import { presignUrl } from '@vercel/blob';const token = await issueSignedToken({      pathname: 'invoices/2026-q1.pdf',    operations: ['get'],  // 'get' | 'head' | 'put' | 'delete'    validUntil: Date.now() + 60 * 60 * 1000, // 1 hour});const { presignedUrl } = await presignUrl(token, {    pathname: 'invoices/2026-q1.pdf',    operation: 'get',     validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes});console.log(presignedUrl); // https://store_abc123.private.blob.vercel-storage.com/invoices/2026-q1.pdf?vercel-blob-delegation=eyJ...&vercel-blob-signature=Qm9...
```

Signed URLs work well when you want to grant temporary, narrow access to a private object without putting your server in the data path:

-   Let a user download a private file, like an invoice, a report, or an export, with a link that expires.
    
-   Share an object with a third party or external service for a fixed window.
    
-   Hand an agent one-off `delete` access to clean up a specific object.
    

Learn more about Vercel Private Blob in the [documentation](https://vercel.com/docs/vercel-blob/private-storage).