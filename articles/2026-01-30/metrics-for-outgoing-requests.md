---
title: "Metrics for outgoing requests"
source: "https://vercel.com/changelog/metrics-for-outgoing-requests"
publishedDate: "2024-01-16"
category: "frontend"
feedName: "Vercel"
author: "Darpan Kakadia"
---

1 min read

Jan 16, 2024

![Screenshot of new requests metrics, showing 5 outgoing fetch requests with traces on the side](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4mJJIZgCBfoD3ay58XRtzl%2F2198c504ca4873d279f132cdc441a74b%2FRequest_Metrics_Light.png&w=1920&q=75)![Screenshot of new requests metrics, showing 5 outgoing fetch requests with traces on the side](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FXLWguQ7Jq8AQfhTqfho1l%2Fdbc3f1a229fc1f1da8861d3904a5002a%2FRequest_Metrics_Dark.png&w=1920&q=75)

You can now see all outgoing requests for a selected log in [Runtime Logs](https://vercel.com/docs/observability/runtime-logs).

Logs now display the status, duration, URL, and a trace for each request. Request metrics work with every request on Vercel, so [all frameworks](https://vercel.com/docs/frameworks) are supported. This makes it easier to debug latency and caching inside your Vercel Functions or when calling [databases](https://vercel.com/docs/storage).

This release also includes various of quality-of-life improvements in the Logs UI.

Request metrics are **free while in beta** and only available to Pro and Enterprise customers.