---
title: "Python Vercel Functions now have streaming enabled by default"
source: "https://vercel.com/changelog/python-vercel-functions-now-have-streaming-enabled-by-default"
publishedDate: "2025-01-06"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Jan 6, 2025

[Streaming](https://vercel.com/docs/functions/streaming-functions) is now enabled by default for all Vercel Functions using the [Python runtime](https://vercel.com/docs/functions/runtimes/python), completing the rollout plan [announced last year](https://vercel.com/changelog/streaming-is-now-supported-in-vercel-functions-for-the-python-runtime). Python functions can now send data to the client as it’s generated, rather than waiting for the entire response—particularly beneficial for use cases like AI applications and real-time updates.

The `VERCEL_FORCE_PYTHON_STREAMING` environment variable is no longer necessary, as streaming is now applied automatically in your new deployments.

With streaming responses, the runtime log format and frequency have been updated.

If you’re using Log Drains, ensure your ingestion pipeline can handle the new log format and increased log frequency.

For more details, visit [our documentation](https://vercel.com/docs/functions/streaming-functions#streaming-python-functions) or get started with [our template](https://vercel.com/templates/python/ai-sdk-python-streaming).