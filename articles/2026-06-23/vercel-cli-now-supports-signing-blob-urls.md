---
title: "Vercel CLI now supports signing blob URLs"
source: "https://vercel.com/changelog/vercel-cli-now-supports-signing-blob-urls"
publishedDate: "2026-06-22"
category: "frontend"
feedName: "Vercel"
author: "Elliot Dauber"
---

You can now generate signed URLs for Vercel Blob directly from the Vercel CLI. A signed URL is a scoped URL with a set expiration time that lets you perform a single operation on a specific object. Each URL is scoped to one operation (`get`, `head`, `put`, or `delete`), one pathname, and a custom expiry of up to 7 days. Update the Vercel CLI to version `5.14.5` to get started.

### [Link to heading](#generate-a-presigned-url-in-one-command)Generate a presigned URL in one command

Use the new `vercel blob presign` command to sign a URL for a single operation, for example to provide short-lived access to a private file or to allow your users to upload images of a certain size and content type. By default it issues a signed `GET` URL:

```
vercel blob presign media/photo.jpg --access private
```

Scope it to an upload with content-type and size constraints

```
vercel blob presign uploads/image.jpg --access private --operation put --allowed-content-type image/* --maximum-size-in-bytes 10485760
```

Control how long the URL stays valid with `--valid-for` (for example `15m`, `1h`, `7d`) or an absolute `--valid-until` timestamp. Pass `--json` to get the result, operation, and expiry as structured output for scripting.

### [Link to heading](#issue-a-standalone-signed-token)Issue a standalone signed token

Use `vercel blob signed-token` when you want to separate signed token generation from URL generation, for example to restrict write access to your private blob store while your agent investigates an issue.

```
vercel blob signed-token --pathname media/photo.jpg --operation get vercel blob signed-token --operation put --allowed-content-type image/* --maximum-size-in-bytes 10485760
```

You can then feed the resulting delegation and client-signing tokens into `vercel blob presign`:

```
vercel blob presign uploads/image.jpg --access private --operation put --delegation-token <delegationToken> --client-signing-token <clientSigningToken>
```

Update to the latest version of the Vercel CLI and run `vercel blob presign --help` to see all available options. Learn more about signed URLs for Vercel Blob in the [documentation](https://vercel.com/docs/vercel-blob/vercel-signed-urls).