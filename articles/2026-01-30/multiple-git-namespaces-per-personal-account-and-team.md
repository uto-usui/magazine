---
title: "Multiple Git namespaces per Personal Account and Team"
source: "https://vercel.com/changelog/multiple-git-namespaces-per-personal-account-and-team"
publishedDate: "2021-01-08"
category: "frontend"
feedName: "Vercel"
author: "Shu Ding"
---

1 min read

Jan 8, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4H3rtzegW5VFZBsowWbHNY%2Fb30fe2f942ee9e82ed347125905974d6%2Fog-image.png&w=1920&q=75)

When connecting a Project on Vercel to a Git repository, the Git repository previously had to be located in the same Git scope as the Git repositories of all other Projects within that Personal Account or Team.

Now that this connection is defined on the Project-level (see above) instead of being configured on the Personal Account or Team, this limitation is lifted. Additionally, problems with an active connection are now surfaced there too.

Every Personal Account or Team can now contain Vercel Projects that are connected to Git repositories located in various different Git scopes. This also means that, when importing one, Vercel no longer forces a certain destination Personal Account or Team.

Check out [the documentation](https://vercel.com/docs/platform/projects#git) as well.