---
title: "More detailed report on out of memory or disk space errors on builds"
source: "https://vercel.com/changelog/report-on-out-of-memory-or-disk-space"
publishedDate: "2023-11-08"
category: "frontend"
feedName: "Vercel"
author: "Peter van der Zee"
---

1 min read

Nov 8, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1D1mXxGRal97P7CXrGkkdL%2F8ec37ad26edb3bcd4de6dceb3ebb9b00%2FENOMEM_ENOSPCS_error_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FbtoSbDbQntZfKTz7fTD73%2F0e0174dc98d1bf4234efdf731f8c1d53%2FENOMEM_ENOSPCS_error_-_Dark.png&w=1920&q=75)

You will now see more information in the build logs when your build fails due to either exhausting the available memory (OOM) or disk space (ENOSPC).

In the case of OOM, your build logs will confirm the event. For ENOSPC situations, detailed information on disk space allocation is provided.

Check out [our documentation](https://vercel.com/docs/deployments/troubleshoot-a-build#build-container-resources) to learn more.