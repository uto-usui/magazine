---
title: "Automatically detect and replay layout shifts from the Vercel Toolbar"
source: "https://vercel.com/changelog/automatically-detect-and-replay-layout-shifts"
publishedDate: "2023-11-14"
category: "frontend"
feedName: "Vercel"
author: "wits"
---

1 min read

Nov 14, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6iTE1OZvCqu0WOYxTXtdL1%2F1a37b99f974d7a63835510fa7ed0a71e%2FLayout_Shifts.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7ibUDL66LUMwgYod7vmD6x%2Fba064b8be537109ba92d1bc7246afe68%2FLayout_Shifts-1.jpg&w=1920&q=75)

Vercel can now automatically detect and replay [layout shifts](https://vercel.com/docs/speed-insights#cumulative-layout-shift-cls) on your deployments from the Vercel Toolbar.

Layout shifts are reported and notified through the Toolbar. Each reported shift includes a summary of what caused the shift and how many elements it affected. Additionally, you replay and animate the shift to see it again.

The Toolbar is automatically added to all Preview Deployments, but can also be used in localhost and in production (likely behind your own staff authentication checks) when using the [@vercel/toolbar package](https://vercel.com/docs/workflow-collaboration/comments/in-production-and-localhost).

[Check out the documentation](https://vercel.com/docs/workflow-collaboration/vercel-toolbar) to learn more.