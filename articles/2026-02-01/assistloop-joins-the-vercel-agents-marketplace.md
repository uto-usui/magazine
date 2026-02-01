---
title: "Assistloop joins the Vercel Agents Marketplace"
source: "https://vercel.com/changelog/assistloop-joins-the-vercel-agents-marketplace"
publishedDate: "2026-01-30"
category: "frontend"
feedName: "Vercel"
author: "Marketplace Team"
---

1 min read

Jan 30, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5pe6LC3W3tem0FFB7visel%2F5624eb0f92e1989cb9744a052d019ad5%2FAssist-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5jfwc1avi41I65guMCF1G5%2F5582ba6a5ec5313c2c773f31b1bfc7af%2FAssist-dark.png&w=1920&q=75)

[AssistLoop](https://vercel.com/marketplace/assistloop) is now available in the [Vercel Marketplace](https://vercel.com/marketplace) as an AI-powered customer support integration.

The integration connects natively with Vercel, so adding AI-driven customer support takes minutes. With AssistLoop, teams can:

-   Install AssistLoop with minimal setup using an Agent ID
    
-   Add AI-powered support directly to Next.js apps
    
-   Train agents on internal docs, FAQs, or knowledge bases
    
-   Customize the assistant to match your brand
    
-   Review conversations and hand off to human support when needed
    

This integration fits naturally into existing Vercel workflows, with unified billing, automatic environment variables, and no manual configuration. Teams can ship AI-powered support faster without managing separate dashboards or complex setup.

AssistLoop automatically injects `NEXT_PUBLIC_ASSISTLOOP_AGENT_ID` into your project environment. Add the widget script to your site:

widget.tsx

```
import Script from 'next/script'<Script  src="https://assistloop.ai/assistloop-widget.js"  strategy="afterInteractive"  onLoad={() => {    window.AssistLoopWidget?.init({      agentId: process.env.NEXT_PUBLIC_ASSISTLOOP_AGENT_ID,    });  }}/>
```

AssistLoop automatically injects NEXT\_PUBLIC\_ASSISTLOOP\_AGENT\_ID into your project environment. Just add the widget script to your site:

### [Link to heading](#get-started)Get started

Deploy the [AssistLoop Next.js](https://vercel.com/templates/ai/next-js-assist-loop-template) template from the Marketplace to see it in action.