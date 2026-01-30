---
title: "Prioritize Production deployments to build before any queued Preview"
source: "https://vercel.com/changelog/prioritize-production-deployments-to-build-before-any-queued-preview"
publishedDate: "2023-08-14"
category: "frontend"
feedName: "Vercel"
author: "Felix Haus"
---

1 min read

Aug 14, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4FfXMmohVDRNUnkKspUBuS%2Fbceb5208f120b8b0d893915aad88167d%2FPrioritize_production_builds_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1qVVuPjG0CKS6HxVbxdktH%2F64280492bfed95691a231abc2096d521%2FPrioritize_production_builds_-_Dark.png&w=1920&q=75)

[Enterprise](https://vercel.com/docs/accounts/plans/enterprise) customers are now able to configure builds of their Production deployments to begin before any builds of their Preview deployments.﻿

With this setting configured, any Production Deployment changes will [skip the line of queued Preview Deployments](https://vercel.com/docs/deployments/concurrent-builds#prioritize-production-builds), so they're ready as soon as possible.

You can also increase your [build concurrency limits](https://vercel.com/docs/concepts/deployments/concurrent-builds) to give you the ability to kick off multiple builds at once.

Read more in [our documentation](https://vercel.com/docs/deployments/concurrent-builds#prioritize-production-builds).