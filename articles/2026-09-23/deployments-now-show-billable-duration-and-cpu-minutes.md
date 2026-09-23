---
title: "Deployments now show billable duration and CPU minutes"
source: "https://vercel.com/changelog/deployments-now-show-billable-duration-and-cpu-minutes"
publishedDate: "2026-09-21"
category: "frontend"
feedName: "Vercel"
author: "Mehul Kar"
---

Deployments now show their billable duration and CPU minutes in the dashboard, `vc inspect`, and the [REST API](https://vercel.com/docs/rest-api/deployments/get-a-deployment-by-id-or-url). Use it to understand how each build contributes to your usage.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7zHRl2ieyiX3QVyo2Gjv6r%2Fcad642b25e07d4bab672a13006bed35a%2Fchangelog-light.png&w=1920&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2MsndbOkkxzSnn8esucQct%2Fa46103b362cec48577fc68de44b4e668%2Fchangelog-dark.png&w=1920&q=95)

Billable duration is the build and post-build time combined, rounded up to the next whole minute. CPU minutes are that figure multiplied by the machine's vCPUs.

To see the same breakdown from the CLI, update to version 59.23.1 or later with `npm i -g vercel@latest`, then run `vc inspect`:

```
vc inspect <deployment>  Duration    build duration       5m 9s    post-build duration  3m 21s    billable duration    9m    CPU Minutes Usage    270 minutes (9m x 30vCPU)
```

Learn more about [build machines and CPU minutes](https://vercel.com/docs/builds/managing-builds) in the docs.