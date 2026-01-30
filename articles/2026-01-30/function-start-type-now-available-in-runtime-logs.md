---
title: "Function start type now available in Runtime Logs"
source: "https://vercel.com/changelog/function-start-type-now-available-in-runtime-logs"
publishedDate: "2025-12-22"
category: "frontend"
feedName: "Vercel"
author: "Vincent Voyer"
---

1 min read

Dec 22, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7Gir6G0jNsvGBUQWn2sijk%2F6053919fd8d3dcec7167d3d734f94eb9%2FStart_Type_Logs_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F52xJOfO8MhyaNdBxzapUN2%2F10e57c1bac303ebc56bdb4e4b7e72d42%2FStart_Type_Logs_-_Dark.png&w=1920&q=75)

For any request involving a Vercel Function invocation, you can now view the function start type in the right hand details panel of Runtime Logs.

A Function invocation can be either: `Hot`, `Hot (prewarmed)` or `Cold`. When a Function was invoked and it's a `Cold` start, we also display the cold start duration like: `Cold (280ms)`.

[Try it out](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs) or learn more about [Runtime Logs](https://vercel.com/docs/logs/runtime).