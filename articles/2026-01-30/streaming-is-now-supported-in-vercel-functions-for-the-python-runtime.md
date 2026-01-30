---
title: "Streaming is now supported in Vercel Functions for the Python runtime"
source: "https://vercel.com/changelog/streaming-is-now-supported-in-vercel-functions-for-the-python-runtime"
publishedDate: "2024-11-22"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Nov 22, 2024

[Streaming](https://vercel.com/docs/functions/streaming-functions) is now supported and will soon be enabled by default in Vercel Functions for the [Python runtime](https://vercel.com/docs/functions/runtimes/python), allowing functions to send data to the client as it’s generated rather than waiting for the full response. This is particularly useful for AI applications.

This change will be rolled out progressively. Starting today, **it will apply to all new projects and will take effect for all existing projects on January 5, 2025**. On this date, projects using [Log Drains](https://vercel.com/docs/observability/log-drains) will be migrated, and streaming responses [will impact the format and frequency of runtime logs](https://vercel.com/docs/functions/streaming-functions#runtime-logs).

If you’re using Log Drains, ensure your ingestion pipeline can handle the new log format and increased log frequency.

To enable streaming as the default for your Vercel Functions using Python, add the `VERCEL_FORCE_PYTHON_STREAMING=1` environment variable in your project. Streaming will then be enabled on your next production deployment.

For more information, read the [Python streaming documentation](https://vercel.com/docs/functions/streaming-functions#streaming-python-functions) or get started with [our template](https://vercel.com/templates/python/ai-sdk-python-streaming).