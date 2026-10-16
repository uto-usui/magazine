---
title: "Amazon S3 joins the Vercel Marketplace"
source: "https://vercel.com/changelog/amazon-s3-joins-the-vercel-marketplace"
publishedDate: "2026-10-14"
category: "frontend"
feedName: "Vercel"
author: "Michael Toth"
---

You can now create and connect Amazon S3 resources through the [Vercel Marketplace](https://vercel.com/marketplace/aws) without leaving your Vercel project dashboard.

The Amazon S3 Marketplace integration automatically adds connection details as environment variables and lets you manage resources alongside your application infrastructure, with links to AWS for deeper configuration. Authentication uses short-lived OIDC credentials without storing static AWS keys.

Amazon S3 is also available in [v0](https://v0.app/), which provisions resources, configures connections, and generates code from your prompt.

lib/s3.ts

```
import { createS3 } from '@vercel/aws';const os = createS3();
```

An S3 client authenticated through Vercel OIDC, with no static AWS keys.

app/api/upload/route.ts

```
import { PutObjectCommand } from "@aws-sdk/client-s3";import { s3 } from "@/lib/s3";export async function POST(request: Request) {  const formData = await request.formData();  const file = formData.get("file");  if (!(file instanceof File)) {    return Response.json({ error: "A file is required." }, { status: 400 });  }  await s3.send(    new PutObjectCommand({      Bucket: process.env.S3_BUCKET_NAME!,      Key: file.name,      Body: Buffer.from(await file.arrayBuffer()),      ContentType: file.type || "application/octet-stream",    }),  );  return Response.json({ key: file.name });}
```

Upload a file from a multipart form request to your S3 bucket.

[Vercel Blob](https://vercel.com/docs/vercel-blob) provides public and private storage for application file uploads, with built-in caching and CDN delivery close to your end users. Choose the Amazon S3 integration for existing AWS workflows, analytics on managed Iceberg tables with [S3 Tables](https://vercel.com/marketplace/aws/aws-s3-tables), or vector storage and search with [S3 Vectors](https://vercel.com/marketplace/aws/aws-s3-vectors).

[Get started in the Vercel Marketplace](https://vercel.com/marketplace/aws). Create a new AWS account through Vercel to receive **$100 USD in credits, valid for six months**, or link an existing account and manage your plan and usage from your Vercel dashboard. Linked accounts support only new buckets created through Vercel. Read the [AWS announcement](https://aws.amazon.com/blogs/aws/amazon-s3-vercel-marketplace-v0) for examples and setup details.