---
title: "Manage Next.js Server Actions in the Vercel Firewall"
source: "https://vercel.com/changelog/manage-next-js-server-actions-in-the-vercel-firewall"
publishedDate: "2025-10-24"
category: "frontend"
feedName: "Vercel"
author: "Sage Abraham"
---

1 min read

Oct 24, 2025

The Vercel [Firewall](https://vercel.com/docs/vercel-firewall) and [Observability Plus](https://vercel.com/docs/observability/observability-plus) has first-class support for Server Actions.

Starting with [Next.js 15.5](https://nextjs.org/blog/next-15-5), customers can now configure custom rules targeting specific server action names. In the example below, you can rate limit `app/auth/actions.ts#getUser` actions to 100 requests per minute per IP address.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5zO4vmTBsEsXU6Oo9eauif%2F0421b7196f31f677a5ef4bcaa83786b1%2FServer_Action_Light_Mode.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5nwCFdRH2gfaeUN9RUC71s%2F2b984bff8a5b6f2893498751251169bb%2FServer_Action_Dark_Mode.png&w=1920&q=75)

```
// app/auth/actions.ts 'use server' export async function getUser(userId: string) {   // ... }
```

Server Action Name is available in the Firewall for all plans at no additional cost. Read the [docs](https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration) to learn more.