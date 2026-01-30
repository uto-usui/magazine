---
title: "Every push now receives a new unique URL"
source: "https://vercel.com/changelog/every-push-now-receives-a-unique-url"
publishedDate: "2021-02-26"
category: "frontend"
feedName: "Vercel"
author: "Luc Leray"
---

1 min read

Feb 26, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F40hpfmmprQd1umWAyEsXiP%2Ffe4a70e97970009611a6483f66dc1603%2Fpreview.png&w=1920&q=75)

Today, we're announcing that **every Git push and Vercel CLI invocation will result in a new unique URL and a new immutable Deployment**.

Existing Deployments will no longer be re-used if you try to create a new one.

This change will likely not impact you in a meaningful way. On November 20th 2020, we [enabled automatic System Environment Variables](https://vercel.com/changelog/system-environment-variables-are-now-available-by-default) by default. If that option is enabled, a new immutable Deployment will already be created every time.

Vercel always strives to give you real-time feedback on every change you push. To this end, we are working on leveraging smart incremental computation techniques to **avoid redoing work that’s already been done**.