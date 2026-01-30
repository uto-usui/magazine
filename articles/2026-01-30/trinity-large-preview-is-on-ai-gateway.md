---
title: "Trinity Large Preview is on AI Gateway"
source: "https://vercel.com/changelog/trinity-large-preview-is-on-ai-gateway"
publishedDate: "2026-01-26"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jan 26, 2026

You can now access Trinity Large Preview via [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required.

Trinity Large Preview is optimized for reasoning-intensive workloads, including math, coding tasks, and complex multi-step agent workflows. It is designed to handle extended multi-turn interactions efficiently while maintaining high inference throughput.

To use this model, set model to `arcee-ai/trinity-large-preview` in the AI SDK:

```
import { streamText } from 'ai'​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‌​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​‌﻿​﻿​﻿‍‍​‍﻿﻿​‍﻿﻿‌‍​‌‌﻿​​‌﻿​​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‌​‍﻿﻿‌﻿​﻿‌﻿​​‌‍​‌‌‍​﻿‌‍‌‌‌﻿​﻿​‍﻿﻿‌‍‌‌​﻿‌‌​﻿​﻿​﻿‍​​﻿​‍‌‍‍​‌‍​﻿‌﻿‌​​﻿‌﻿​﻿‌​‌﻿​﻿‌‍‍‌​‍﻿﻿‌‍‌‌‌‍﻿‍‌﻿‌‍‌‍‍‌‌﻿​‍‌‍﻿﻿‌‍﻿‍‌‍﻿‌‌‍‌‌‌‍﻿‍‌﻿‌​‌﻿​﻿​‍﻿﻿‌‍﻿‌‌‍​‌‌﻿​﻿‌﻿‌​‌‍‌‌‌﻿​‍​‍﻿﻿‌‍‌‌‌‍﻿‍‌﻿‌​‌﻿​‍‌‍‍‌‌‍‌‌‌﻿​﻿​‍﻿﻿​﻿‌‌‌﻿​‍‌‌‌‌‌‌​‍‌​​‍‌​‌‍‌‌‍​‌‌‌﻿‌​‍‍‌﻿‌‌‌‌‌‍‌‌‍‌‌‍﻿‍​﻿​﻿‌﻿‌​‌‍‍​‌​﻿﻿‌​‌‍‌‌‍‍‌‍‌﻿‌﻿​‍‌​‌‌​‍﻿﻿​﻿﻿﻿‌‍‌‍‌‍﻿﻿‌‍​﻿‌﻿‌‌‌﻿​﻿‌‍‌‌‌‍‌​‌​‌‍‌‍‍‌‌‍‌‌‌‍﻿​‌‍‌​​﻿﻿‌‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍‌‍‌‍‌‍‌‍﻿﻿‌‍​﻿‌﻿‌‌‌﻿​﻿‌‍‌‌‌‍‌​‌​﻿​‌‍﻿﻿‌‍​﻿‌‍​‌‌‍﻿​‌‍‌‌​﻿﻿‌‌‍‌‌‌‍﻿‍​‍﻿‌‌‌‌‌‌‌​﻿​‍‌‍‌﻿​﻿‌‍﻿﻿‌﻿‌‌‌﻿​‍‌‍​﻿‌‍‌‌​﻿﻿‌‌﻿‌‍‌‍‌‌‌﻿​‍‌‍​﻿‌‍‌‌‌‍﻿​​‍﻿‌‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍﻿‌‌‍﻿​‌‍‍‌‌‍﻿‍‌‍‍﻿​‍​‍​‍﻿​​‍​‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍​‍​﻿‍‍‌﻿‍﻿​‍​‍‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​‌‍﻿﻿‌﻿​‍‌​‍‌‌‍﻿‍‌﻿‌​‌‍‌‌‌﻿​‍‌‍‌‍‌‍​‌‌‍​﻿‌‍‌‌​‍​‍​﻿‍‍‌﻿‍﻿​‍​‍‌﻿‌﻿‌‍‍‌‌‍‌​‌‍‌﻿‌‍‌‌‌﻿‌​‌​‍‌‌‍‌​​‍​‍​﻿‍‍​‍​‍‌﻿​‍‌‍‍‌‌‍​﻿‌‍‍​‌‌‌​‌‍‌‌‌﻿‍​‌﻿‌​‌​‌‌‌‍‌​‌‍‍‌‌﻿‌​‌‍﻿﻿‌﻿​‍​‍​‍​‍﻿​​‍​‍‌﻿‌﻿‌‍‍‌‌‍‌​‌‍‌﻿‌‍‌‌‌﻿‌​‌​﻿‍‌‍​‌‌‍﻿‌‌‍‌‌‌﻿​﻿‌﻿​​‌‍​‌‌‍​﻿‌‍‌‌​‍​‍​﻿‍‍​‍​‍‌‍​‍‌﻿‌‌‌‍‍‌‌‍﻿​‌﻿‌​‌‍‍‌‌‍﻿‍​‍​‍‌﻿﻿‌​‍﻿​​‍​‍‌‍‌‍‌‍‍‌‌‍‌‌‌‍﻿​‌‍‌​‌‌‌​‌﻿‍‌‌﻿​​‌‍‌‌​‍​‍​﻿‍‍​‍​‍‌‌​‍‌‍‍‌‌‍​﻿‌‍‍​‌‌‌​‌‍‌‌‌﻿‍​‌﻿‌​​‍​‍‌﻿﻿‌‌﻿﻿‌const result = streamText({  model: 'arcee-ai/trinity-large-preview',  prompt:   `Implement a long-context reasoning benchmark with ingested documents,    multi-step analysis, and generate conclusions.`})​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‌​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​‌﻿​﻿​﻿‍‍​‍﻿﻿​‍﻿﻿‌‍​‌‌﻿​​‌﻿​​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‌​‍﻿﻿‌﻿​﻿‌﻿​​‌‍​‌‌‍​﻿‌‍‌‌‌﻿​﻿​‍﻿﻿‌‍‌‌​﻿‌‌​﻿​﻿​﻿‍​​﻿​‍‌‍‍​‌‍​﻿‌﻿‌​​﻿‌﻿​﻿‌​‌﻿​﻿‌‍‍‌​‍﻿﻿‌‍‌‌‌‍﻿‍‌﻿‌‍‌‍‍‌‌﻿​‍‌‍﻿﻿‌‍﻿‍‌‍﻿‌‌‍‌‌‌‍﻿‍‌﻿‌​‌﻿​﻿​‍﻿﻿‌‍﻿‌‌‍​‌‌﻿​﻿‌﻿‌​‌‍‌‌‌﻿​‍​‍﻿﻿‌‍‌‌‌‍﻿‍‌﻿‌​‌﻿​‍‌‍‍‌‌‍‌‌‌﻿​﻿​‍﻿﻿​﻿‌‌‌﻿​‍‌‌‌‌‌‌​‍‌​​‍‌​‌‍‌‌‍​‌‌‌﻿‌​‍‍‌﻿‌‌‌‌‌‍‌‌‍‌‌‍﻿‍​﻿​﻿‌﻿‌​‌‍‍​‌​﻿﻿‌​‌‍‌‌‍‍‌‍‌﻿‌﻿​‍‌​‌‌​‍﻿﻿​﻿﻿﻿‌‍‌‍‌‍﻿﻿‌‍​﻿‌﻿‌‌‌﻿​﻿‌‍‌‌‌‍‌​‌​‌‍‌‍‍‌‌‍‌‌‌‍﻿​‌‍‌​​﻿﻿‌‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍‌‍‌‍‌‍‌‍﻿﻿‌‍​﻿‌﻿‌‌‌﻿​﻿‌‍‌‌‌‍‌​‌​﻿​‌‍﻿﻿‌‍​﻿‌‍​‌‌‍﻿​‌‍‌‌​﻿﻿‌‌‍‌‌‌‍﻿‍​‍﻿‌‌‌‌‌‌‌​﻿​‍‌‍‌﻿​﻿‌‍﻿﻿‌﻿‌‌‌﻿​‍‌‍​﻿‌‍‌‌​﻿﻿‌‌﻿‌‍‌‍‌‌‌﻿​‍‌‍​﻿‌‍‌‌‌‍﻿​​‍﻿‌‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍﻿‌‌‍﻿​‌‍‍‌‌‍﻿‍‌‍‍﻿​‍​‍​‍﻿​​‍​‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍​‍​﻿‍‍‌﻿‍﻿​‍​‍‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​‌‍﻿﻿‌﻿​‍‌​‍‌‌‍﻿‍‌﻿‌​‌‍‌‌‌﻿​‍‌‍‌‍‌‍​‌‌‍​﻿‌‍‌‌​‍​‍​﻿‍‍‌﻿‍﻿​‍​‍‌﻿‌﻿‌‍‍‌‌‍‌​‌‍‌﻿‌‍‌‌‌﻿‌​‌​‍‌‌‍‌​​‍​‍​﻿‍‍​‍​‍‌﻿​‍‌‍‍‌‌‍​﻿‌‍‍​‌‌‌​‌‍‌‌‌﻿‍​‌﻿‌​‌​‌‌‌‍‌​‌‍‍‌‌﻿‌​‌‍﻿﻿‌﻿​‍​‍​‍​‍﻿​​‍​‍‌﻿‌﻿‌‍‍‌‌‍‌​‌‍‌﻿‌‍‌‌‌﻿‌​‌​﻿‍‌‍​‌‌‍﻿‌‌‍‌‌‌﻿​﻿‌﻿​​‌‍​‌‌‍​﻿‌‍‌‌​‍​‍​﻿‍‍​‍​‍‌‍​‍‌﻿‌‌‌‍‍‌‌‍﻿​‌﻿‌​‌‍‍‌‌‍﻿‍​‍​‍‌﻿﻿‌​‍﻿​​‍​‍‌‍‌‍‌‍‍‌‌‍‌‌‌‍﻿​‌‍‌​‌‌‌​‌﻿‍‌‌﻿​​‌‍‌‌​‍​‍​﻿‍‍​‍​‍‌‌​‍‌‍‍‌‌‍​﻿‌‍‍​‌‌‌​‌‍‌‌‌﻿‍​‌﻿‌​​‍​‍‌﻿﻿‌‌﻿﻿‌
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/trinity-large-preview).