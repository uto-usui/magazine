---
title: "DeepSeek V4 Flash is 90% off through Novita on AI Gateway"
source: "https://vercel.com/changelog/deepseek-v4-flash-is-90-off-through-novita"
publishedDate: "2026-08-04"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[DeepSeek v4 Flash](https://vercel.com/ai-gateway/models/deepseek-v4-flash-0731) is 90% off on AI Gateway when you route to Novita. The discount is available to Vercel Pro customers through August 11.

To get the discounted rate, set the `model` to `deepseek/deepseek-v4-flash` or `deepseek/deepseek-v4-flash-0731` and put Novita first with the `order` option:

```
import { streamText } from 'ai';const result = streamText({  model: 'deepseek/deepseek-v4-flash', // or 'deepseek/deepseek-v4-flash-0731'  prompt: 'Fix the failing tests in this repo.',  providerOptions: {    gateway: {      order: ['novita'],    },  },});
```

If Novita can't serve the request, it falls back to other providers at the standard rate. After August 11, the model stays available at standard rates with no markup.

[Create an API key](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway&title=AI+Gateway) in the AI Gateway section of your dashboard, or try the model first in its [playground](https://vercel.com/ai-gateway/models/deepseek-v4-flash-0731).