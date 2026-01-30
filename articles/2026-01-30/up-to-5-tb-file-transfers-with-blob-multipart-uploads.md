---
title: "Up to 5 TB file transfers with Blob multipart uploads"
source: "https://vercel.com/changelog/5tb-file-transfers-with-vercel-blob-multipart-uploads"
publishedDate: "2024-01-17"
category: "frontend"
feedName: "Vercel"
author: "Vincent Voyer"
---

1 min read

Jan 17, 2024

Vercel Blob now supports **storing files up to 5 TB** with multipart uploads.

When using `multipart: true`, `put()` and `upload()` will progressively read and chunk data, upload it in parts, and retry if there are issues.

upload.js

```
import { upload } from '@vercel/blob/client';const blob = await upload('big-file.mp4', file, {  access: 'public',  handleUploadUrl: '/api/upload',  multipart: true // 🚀});
```

Uploading a big video file to Vercel Blob

Network output is maximized without consuming too much memory. Multipart uploads support retrying streams (Node.js streams and the Web Streams API), a unique feature amongst file upload APIs.

[Check out the documentation](https://vercel.com/docs/storage/vercel-blob/using-blob-sdk#upload) to learn more.