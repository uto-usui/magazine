---
title: "Vercel Blob now supports file upload progress"
source: "https://vercel.com/changelog/vercel-blob-now-supports-file-upload-progress"
publishedDate: "2024-11-20"
category: "frontend"
feedName: "Vercel"
author: "Vincent Voyer"
---

1 min read

Nov 20, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2oeyQkVxrcZucs9FaEBaUc%2F0afde916dc1ab5d4a55efb76b052b589%2Fblob-light-2.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2wXOpinRxJX0sCvul95nbQ%2F0ce714b0de2009f9db096c010355b5d7%2Fblob-dark-2.png&w=1920&q=75)

Vercel Blob can now track file upload progress, enabling for a better user experience when uploading files.

With the latest [`@vercel/blob`](https://vercel.com/docs/storage/vercel-blob/using-blob-sdk) package, you can use the new `onUploadProgress` callback to display progress during file uploads. In the Dashboard, you'll also see the upload progress for your files.

```
"use client";import { upload } from '@vercel/blob/client';import { useState } from 'react';export function Uploader() {  const [progress, setProgress] = useState(0);  return  (    <form onSubmit={(e) => {      e.preventDefault();      const file = e.currentTarget.files[0];      await upload(file.name, file, {        access: 'public',        handleUploadUrl: '/api/upload',        onUploadProgress(e) {          setProgress(e.percentage);        }      });    }}>      <input type="file" required />      Upload progress: <progress value={progress} max={100} />    </form>  );}
```

[Try it out](https://vercel.com/dashboard/stores) or [learn more about Vercel Blob](https://vercel.com/docs/storage/vercel-blob).