---
title: "Skew Protection is now enabled by default for new projects"
source: "https://vercel.com/changelog/skew-protection-is-now-enabled-by-default-for-new-projects"
publishedDate: "2024-11-19"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Nov 19, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F53o2uFMrhFObQ0ydC79LD2%2F619ebd637ba281c3780d9a3ab074c4db%2FSkew_Protection_Light__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4WAuiyGfGzJ3iWeXeeEDMW%2F497a350aca67866177e71a067f8bb76e%2FSkew_Protection_Dark__1_.png&w=1920&q=75)

[Skew Protection](https://vercel.com/docs/deployments/skew-protection) eliminates version differences between web clients and servers—available for Pro and Enterprise customers. Starting today, new projects will have Skew Protection enabled by default.

Existing projects will not be changed, however you can manually enable Skew Protection in the project's settings.

Skew Protection ensures client-side code matches the server-side code for the corresponding deployment for a period of time or until a hard page refresh. This protects from version mismatch errors when creating a new deployment, such as file name changes from hashed bundles or even post backs from Server Actions.

Learn more about [Skew Protection](https://vercel.com/docs/deployments/skew-protection).