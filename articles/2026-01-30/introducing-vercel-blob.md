---
title: "Introducing Vercel Blob"
source: "https://vercel.com/changelog/vercel-blob"
publishedDate: "2023-05-01"
category: "frontend"
feedName: "Vercel"
author: "Vincent Voyer"
---

1 min read

May 1, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7jqvNTGrK4Lt508wyUbiUR%2F74d07d2ebcfb9cbb90cc2dc1584154e0%2FBlobLight.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5MaasIaOQYNLhC6hEi9BvI%2Fac943393d0b1b8b4fb2a4e68b9fa69f3%2FBlobDark.png&w=1920&q=75)

[Vercel Blob](https://vercel.com/storage/blob) is a fast, easy, and efficient solution for storing files in the cloud.

The Vercel Blob API works with any framework. It can be securely called from Edge and Serverless Functions and returns an immutable URL that can be exposed to visitors or put into storage.

app/profile/route.ts

```
import { put } from '@vercel/blob';export async function PUT(request: Request) {  const form = await request.formData();  const file = form.get('file') as File;  const blob = await put('avatars/user-42.png', file, { access: 'public' });  return Response.json(blob);}
```

Vercel Blob is in private beta. Join the [waitlist](https://vercel.com/login?next=%2Fstorage%2Fblob-register) to get early access in the coming weeks.

[Check out our documentation](https://vercel.com/docs/storage/vercel-blob) to learn more.