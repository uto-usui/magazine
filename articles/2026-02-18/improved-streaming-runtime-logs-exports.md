---
title: "Improved streaming runtime logs exports"
source: "https://vercel.com/changelog/improved-streaming-runtime-logs-exports"
publishedDate: "2026-02-17"
category: "frontend"
feedName: "Vercel"
author: "Vincent Voyer"
---

1 min read

Feb 17, 2026

With runtime logs, you can view and export your logs. Exports now stream directly to the browser - your download starts immediately and you can continue to use the Vercel dashboard while the export runs in the background. This eliminates the need to wait for large files to buffer.

Additionally, we've added two new options: You can now export exactly what's on your screen or all requests matching your current search.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3cg6k54suILO9Qfq41VYHy%2F51c0224f57ea1d395171817ca64180a5%2FScreenshot_2026-02-16_at_11.14.55.png&w=1080&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F8IuYPaTDDGT3OiPswiJ62%2Fecad4658bbaf95f13b1c5a6350002335%2FScreenshot_2026-02-16_at_11.15.47.png&w=1080&q=75)

All plans can export up to 10,000 requests per export, and [Observability Plus](https://vercel.com/docs/observability/observability-plus) subscribers can export up to 100,000 requests.

Exported log data is now indexed by request to ensure consistency with the [Runtime Logs](https://vercel.com/docs/observability/runtime-logs) dashboard interface. Export limits are now applied by request to ensure that the exported data matches the filtered requests shown on the dashboard.

[Learn more about runtime logs](https://vercel.com/docs/logs/runtime).