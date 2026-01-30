---
title: "Live model performance metrics accessible via AI Gateway"
source: "https://vercel.com/changelog/live-model-performance-metrics-accessible-via-ai-gateway"
publishedDate: "2026-01-26"
category: "frontend"
feedName: "Vercel"
author: "Jeremy Philemon"
---

2 min read

Jan 26, 2026

AI Gateway now displays throughput and latency metrics across hundreds of models, helping you choose the right model based on live performance data.

Metrics appear in three places and are updated every hour:

-   **Model list**: Best performance per model (P50 latency and throughput)
    
-   **Model detail pages**: Provider-level performance breakdown
    
-   **REST API**: Rolling endpoint performance aggregates (latency and throughput, P50/P95)
    

### [Link to heading](#model-list)Model list

The AI Gateway [model list](https://vercel.com/ai-gateway/models) now includes sortable columns for latency and throughput. Each row displays the best P50 metrics (lowest latency, highest throughput) for that model across all its available providers. Metrics are updated every hour and based on live AI Gateway customer requests.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5kmb6L4tL5Ma24kZpaTjoS%2Fb6ecd54b9fd90d036706ee53d1432737%2FScreenshot_2026-01-26_at_5.54.49%C3%A2__PM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6Kl3iztUKwBPY0gBQw6Lss%2F4715f33a50410986fa86dd7a9940c127%2FScreenshot_2026-01-24_at_1.57.49%C3%A2__PM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5kmb6L4tL5Ma24kZpaTjoS%2Fb6ecd54b9fd90d036706ee53d1432737%2FScreenshot_2026-01-26_at_5.54.49%C3%A2__PM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6Kl3iztUKwBPY0gBQw6Lss%2F4715f33a50410986fa86dd7a9940c127%2FScreenshot_2026-01-24_at_1.57.49%C3%A2__PM.png&w=1920&q=75)

Sort by throughput to find the fastest token generation, or by latency to find models with the quickest time-to-first-token.

### [Link to heading](#model-detail-pages)Model detail pages

On the individual model pages, you can see P50 latency and throughput for each provider that has recorded usage. This helps you compare provider performance for the same model and choose the best option for your use case.

To access these pages, click on any model in the [model list](https://vercel.com/ai-gateway/models) to get a more detailed view of the breakdown across all the providers that carry the model in AI Gateway. Metrics are refreshed hourly and only appear for providers with sufficient traffic.

Here is an example for [openai/gpt-oss-120b](https://vercel.com/ai-gateway/models/gpt-oss-120b):

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7cxwj6ahRoZJ8QUZ0eZpPe%2Fc2141bcd15eb5483042d0c04c2674d22%2FScreenshot_2026-01-26_at_5.59.08%C3%A2__PM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3MBZR8X7iWlnJw6XaR9FJ5%2Fb59138ac05fa10bb7f078a6ee7c91ef2%2FScreenshot_2026-01-24_at_1.53.30%C3%A2__PM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7cxwj6ahRoZJ8QUZ0eZpPe%2Fc2141bcd15eb5483042d0c04c2674d22%2FScreenshot_2026-01-26_at_5.59.08%C3%A2__PM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3MBZR8X7iWlnJw6XaR9FJ5%2Fb59138ac05fa10bb7f078a6ee7c91ef2%2FScreenshot_2026-01-24_at_1.53.30%C3%A2__PM.png&w=1920&q=75)

Similar to the overall model list, you can sort by latency and throughput across providers on the model detail pages.

### [Link to heading](#rest-api)REST API

These metrics are also available programmatically via the endpoints REST API. To use this, replace `[ai-gateway-string]` with the `creator/model-name` for the model of interest.

```
curl ai-gateway.vercel.sh/v1/models/[ai-gateway-string]/endpoints
```

This returns live hourly P50 and P95 latency (ms TTFT) and throughput (T/s) for the specified model, by provider. Here is an example output from the endpoint for the Cerebras provider for [zai/glm-4.7](https://ai-gateway.vercel.sh/v1/models/zai/glm-4.7/endpoints).

```
curl ai-gateway.vercel.sh/v1/models/zai/glm-4.7/endpoints
```

```
      {        "name": "cerebras | zai/glm-4.7",        "latency_last_1h": {          "p50": 456.5,          "p95": 774.95        },        "throughput_last_1h": {          "p50": 354,          "p95": 445.45        },      }
```

If you want to query the full list of models, you can also use the model metrics endpoint in conjunction with [https://ai-gateway.vercel.sh/v1/models](https://ai-gateway.vercel.sh/v1/models).