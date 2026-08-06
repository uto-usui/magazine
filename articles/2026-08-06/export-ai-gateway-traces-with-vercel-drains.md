---
title: "Export AI Gateway traces with Vercel Drains"
source: "https://vercel.com/changelog/export-ai-gateway-traces-with-vercel-drains"
publishedDate: "2026-08-05"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

AI Gateway now produces an OpenTelemetry trace for every request. Pro and Enterprise teams can send these traces through Vercel Drains to any OTLP/HTTP-compatible endpoint, including native integrations for Braintrust, Dash0, Kubiks, Sentry, and Statsig.

![Configure an AI Gateway Trace Drain, choose projects, and set the sampling rate.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3Cjm25xEuBYCpyQGuedONN%2F374f25d0b5ff9350fda388bca0ee4498%2Fimage.png&w=1920&q=75)![Configure an AI Gateway Trace Drain, choose projects, and set the sampling rate.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7jRyrPQ4nvYgpaVw7TN4Um%2F3f99a517ef4ecbd34f98a73faaf4044b%2Fimage.png&w=1920&q=75)

Configure an AI Gateway Trace Drain, choose projects, and set the sampling rate.

Each trace shows the full request lifecycle, including:

-   Model and provider routing
    
-   Fallback and retry attempts
    
-   Token usage and cost
    
-   Time to first token, request duration, and response status
    
-   Project, deployment, API key, environment, and custom tag attribution
    

Trace Drains do not include prompt or completion content. Sampling controls let you choose how much traffic to export to each drain.

AI Gateway traces cost $0.05 per 1,000 traces delivered to each drain, plus the standard Drains rate of $0.50 per GB of data transferred. A request counts once per successful drain delivery, even when AI Gateway makes multiple provider attempts. Failed deliveries do not incur a trace charge.

![View delivered AI Gateway trace events by count, project, drain, or source.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F20Jtv5oGe3FWhj1XVWSp2b%2F205646f106c8adc2891e8e84565f762d%2Fimage.png&w=1920&q=75)![View delivered AI Gateway trace events by count, project, drain, or source.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FNmgPzsi1rGsvZhwSE7q1D%2Fe45e73e789c77b3ed63fb5fbc3a726ce%2Fimage.png&w=1920&q=75)

View delivered AI Gateway trace events by count, project, drain, or source.

Set up a Trace Drain from your team's [Drains settings](https://vercel.com/d?title=Go+to+Drains+settings&to=%2F%5Bteam%5D%2F~%2Fsettings%2Fdrains) or learn more in the AI Gateway [documentation](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains).