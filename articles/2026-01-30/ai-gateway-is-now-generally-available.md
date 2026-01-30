---
title: "AI Gateway is now generally available"
source: "https://vercel.com/changelog/ai-gateway-is-now-generally-available"
publishedDate: "2025-08-21"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Aug 21, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F75i754DHdrG4E1jAvCJc5V%2F4ef8327b3ab3e0014fa6d0a8c5cb8aa2%2Flight_OG.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4HFVwnemKHT1RbwvJVSCXH%2F8e1b0ad6444a64d226b4c55990d15f49%2FOG.png&w=1920&q=75)

[AI Gateway](https://vercel.com/ai-gateway) is now generally available, providing a single unified API to access hundreds of AI models with transparent pricing and built-in observability.

With sub-20ms latency routing across multiple inference providers, AI Gateway delivers:

-   Transparent pricing with no markup on tokens (including Bring Your Own Keys)
    
-   Automatic failover for higher availability
    
-   High rate limits
    
-   Detailed cost and usage analytics
    

You can use AI Gateway with the [AI SDK](https://ai-sdk.dev/) or through the OpenAI-compatible endpoint. With the AI SDK, it’s just a simple model string switch.

Get started with a single API call:

```
import { streamText } from 'ai'const result = streamText({  model: 'openai/gpt-5',  prompt: 'How can AI Gateway not have a markup on tokens?'})
```

Read more about the [announcement](https://vercel.com/blog/ai-gateway-is-now-generally-available), learn more about [AI Gateway](https://vercel.com/ai-gateway), or [get started now](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fquick-start&title=Get+started+with+AI+Gateway).