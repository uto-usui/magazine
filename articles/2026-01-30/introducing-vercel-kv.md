---
title: "Introducing Vercel KV"
source: "https://vercel.com/changelog/vercel-kv"
publishedDate: "2023-05-01"
category: "frontend"
feedName: "Vercel"
author: "Adrian Cooney"
---

1 min read

May 1, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F61VBZYzZXokBwP1FiYlci3%2F5f7d137b2d581404cfa5c85310576576%2FKVLight.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7g51dTliDOVPov7vdk4zjW%2F66a39401feb4783a59dc011a7b09ba9c%2FKVDark.jpg&w=1920&q=75)

The Vercel KV product has been sunset. You can now deploy alternative KV stores and other storage solutions through the [Vercel Marketplace Storage](https://vercel.com/marketplace/category/storage?category=storage&search=redis), with automatic account provisioning and unified billing. [Learn more](https://vercel.com/blog/introducing-the-vercel-marketplace).

[Vercel KV](https://vercel.com/storage/kv) is a serverless, durable Redis database, making it easy to implement features like rate limiting, session management, and also manage application state.

The Redis-compatible SDK works from Edge or Serverless Functions and scales with your traffic. KV stores are single [region](https://vercel.com/docs/storage/vercel-kv/limits#vercel-kv-region-list) by default, but can be replicated to multiple regions for distributed workloads.

user-prefs.ts

```
import kv from '@vercel/kv';export async function getPrefs() {  const prefs = await kv.get('prefs');  return prefs || {};}export async function updatePrefs(prefs: Record<string, string>) { return kv.set('prefs', prefs);}
```

Vercel KV is available for Hobby and Pro users during the public beta.

[Check out our documentation](https://vercel.com/docs/redis) to learn more.