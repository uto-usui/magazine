---
title: "Kimi K2.5 is live on AI Gateway"
source: "https://vercel.com/changelog/kimi-k2-5-on-ai-gateway"
publishedDate: "2026-01-26"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jan 26, 2026

You can now access Kimi K2.5 via [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required.

Kimi K2.5 is Moonshot AI's most intelligent and versatile model yet, achieving open-source state-of-the-art performance across agent tasks, coding, visual understanding, and general intelligence. It has more advanced coding abilities compared to previous iterations, especially with frontend code quality and design expressiveness. This enables the creation of fully functional interactive user interfaces with dynamic layouts and animations.

To use this model, set model to `moonshotai/kimi-k2.5` in the AI SDK:

```
import { streamText } from 'ai'​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‌​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​‌﻿​﻿​﻿‍‍​‍﻿﻿​‍﻿﻿‌‍​‌‌﻿​​‌﻿​​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‌​‍﻿﻿‌﻿​﻿‌﻿​​‌‍​‌‌‍​﻿‌‍‌‌‌﻿​﻿​‍﻿﻿‌‍‌‌​﻿‌‌​﻿​﻿​﻿‍​​﻿​‍‌‍‍​‌‍​﻿‌﻿‌​​﻿‌﻿​﻿‌​‌﻿​﻿‌‍‍‌​‍﻿﻿‌‍‌‌‌‍﻿‍‌﻿‌‍‌‍‍‌‌﻿​‍‌‍﻿﻿‌‍﻿‍‌‍﻿‌‌‍‌‌‌‍﻿‍‌﻿‌​‌﻿​﻿​‍﻿﻿‌‍﻿‌‌‍​‌‌﻿​﻿‌﻿‌​‌‍‌‌‌﻿​‍​‍﻿﻿‌‍‌‌‌‍﻿‍‌﻿‌​‌﻿​‍‌‍‍‌‌‍‌‌‌﻿​﻿​‍﻿﻿​﻿‌‌‌﻿​‍‌‌‌‌‌‌​‍‌​​‍‌​‌‍‌‌‍​‌‌‌﻿‌​‍‍‌﻿‌‌‌‌‌‍‌‌‍‌‌‍﻿‍​﻿​﻿‌﻿‌​‌‍‍​‌​﻿﻿‌​‌‍‌‌‍‍‌‍‌﻿‌﻿​‍‌​‌‌​‍﻿﻿​﻿﻿﻿‌‍‌‍‌‍﻿﻿‌‍​﻿‌﻿‌‌‌﻿​﻿‌‍‌‌‌‍‌​‌​‌‍‌‍‍‌‌‍‌‌‌‍﻿​‌‍‌​​﻿﻿‌‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍‌‍‌‍‌‍‌‍﻿﻿‌‍​﻿‌﻿‌‌‌﻿​﻿‌‍‌‌‌‍‌​‌​﻿​‌‍﻿﻿‌‍​﻿‌‍​‌‌‍﻿​‌‍‌‌​﻿﻿‌‌‍‌‌‌‍﻿‍​‍﻿‌‌‌‌‌‌‌​﻿​‍‌‍‌﻿​﻿‌‍﻿﻿‌﻿‌‌‌﻿​‍‌‍​﻿‌‍‌‌​﻿﻿‌‌﻿‌‍‌‍‌‌‌﻿​‍‌‍​﻿‌‍‌‌‌‍﻿​​‍﻿‌‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍﻿‌‌‍﻿​‌‍‍‌‌‍﻿‍‌‍‍﻿​‍​‍​‍﻿​​‍​‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍​‍​﻿‍‍‌﻿‍﻿​‍​‍‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​‌‍﻿﻿‌﻿​‍‌​‍‌‌‍﻿‍‌﻿‌​‌‍‌‌‌﻿​‍‌‍‌‍‌‍​‌‌‍​﻿‌‍‌‌​‍​‍​﻿‍‍‌﻿‍﻿​‍​‍‌﻿‌﻿‌‍‍‌‌‍‌​‌‍‌﻿‌‍‌‌‌﻿‌​‌​‍‌‌‍‌​​‍​‍​﻿‍‍​‍​‍‌﻿​‍‌‍‍‌‌‍​﻿‌‍‍​‌‌‌​‌‍‌‌‌﻿‍​‌﻿‌​‌​‌‌‌‍‌​‌‍‍‌‌﻿‌​‌‍﻿﻿‌﻿​‍​‍​‍​‍﻿​​‍​‍‌﻿‌﻿‌‍‍‌‌‍‌​‌‍‌﻿‌‍‌‌‌﻿‌​‌​﻿‍‌‍​‌‌‍﻿‌‌‍‌‌‌﻿​﻿‌﻿​​‌‍​‌‌‍​﻿‌‍‌‌​‍​‍​﻿‍‍​‍​‍‌‍​‍‌﻿‌‌‌‍‍‌‌‍﻿​‌﻿‌​‌‍‍‌‌‍﻿‍​‍​‍‌﻿﻿‌​‍﻿​​‍​‍‌‍‌‍‌‍‍‌‌‍‌‌‌‍﻿​‌‍‌​‌‌‌​‌﻿‍‌‌﻿​​‌‍‌‌​‍​‍​﻿‍‍​‍​‍‌‌​‍‌‍‍‌‌‍​﻿‌‍‍​‌‌‌​‌‍‌‌‌﻿‍​‌﻿‌​​‍​‍‌﻿﻿‌‌﻿﻿‌const result = streamText({  model: "moonshotai/kimi-k2.5",  prompt:   `Build a playful task dashboard with animations, drag-and-drop chaos,    infinite scroll, theme toggles, and production-ready frontend code.`})​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‌​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​‌﻿​﻿​﻿‍‍​‍﻿﻿​‍﻿﻿‌‍​‌‌﻿​​‌﻿​​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿‌​‍﻿﻿‌﻿​﻿‌﻿​​‌‍​‌‌‍​﻿‌‍‌‌‌﻿​﻿​‍﻿﻿‌‍‌‌​﻿‌‌​﻿​﻿​﻿‍​​﻿​‍‌‍‍​‌‍​﻿‌﻿‌​​﻿‌﻿​﻿‌​‌﻿​﻿‌‍‍‌​‍﻿﻿‌‍‌‌‌‍﻿‍‌﻿‌‍‌‍‍‌‌﻿​‍‌‍﻿﻿‌‍﻿‍‌‍﻿‌‌‍‌‌‌‍﻿‍‌﻿‌​‌﻿​﻿​‍﻿﻿‌‍﻿‌‌‍​‌‌﻿​﻿‌﻿‌​‌‍‌‌‌﻿​‍​‍﻿﻿‌‍‌‌‌‍﻿‍‌﻿‌​‌﻿​‍‌‍‍‌‌‍‌‌‌﻿​﻿​‍﻿﻿​﻿‌‌‌﻿​‍‌‌‌‌‌‌​‍‌​​‍‌​‌‍‌‌‍​‌‌‌﻿‌​‍‍‌﻿‌‌‌‌‌‍‌‌‍‌‌‍﻿‍​﻿​﻿‌﻿‌​‌‍‍​‌​﻿﻿‌​‌‍‌‌‍‍‌‍‌﻿‌﻿​‍‌​‌‌​‍﻿﻿​﻿﻿﻿‌‍‌‍‌‍﻿﻿‌‍​﻿‌﻿‌‌‌﻿​﻿‌‍‌‌‌‍‌​‌​‌‍‌‍‍‌‌‍‌‌‌‍﻿​‌‍‌​​﻿﻿‌‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍‌‍‌‍‌‍‌‍﻿﻿‌‍​﻿‌﻿‌‌‌﻿​﻿‌‍‌‌‌‍‌​‌​﻿​‌‍﻿﻿‌‍​﻿‌‍​‌‌‍﻿​‌‍‌‌​﻿﻿‌‌‍‌‌‌‍﻿‍​‍﻿‌‌‌‌‌‌‌​﻿​‍‌‍‌﻿​﻿‌‍﻿﻿‌﻿‌‌‌﻿​‍‌‍​﻿‌‍‌‌​﻿﻿‌‌﻿‌‍‌‍‌‌‌﻿​‍‌‍​﻿‌‍‌‌‌‍﻿​​‍﻿‌‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍﻿‌‌‍﻿​‌‍‍‌‌‍﻿‍‌‍‍﻿​‍​‍​‍﻿​​‍​‍‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​‌‍‌‍‌﻿‌‌‌‍﻿​​‍​‍​﻿‍‍‌﻿‍﻿​‍​‍‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​‌‍﻿﻿‌﻿​‍‌​‍‌‌‍﻿‍‌﻿‌​‌‍‌‌‌﻿​‍‌‍‌‍‌‍​‌‌‍​﻿‌‍‌‌​‍​‍​﻿‍‍‌﻿‍﻿​‍​‍‌﻿‌﻿‌‍‍‌‌‍‌​‌‍‌﻿‌‍‌‌‌﻿‌​‌​‍‌‌‍‌​​‍​‍​﻿‍‍​‍​‍‌﻿​‍‌‍‍‌‌‍​﻿‌‍‍​‌‌‌​‌‍‌‌‌﻿‍​‌﻿‌​‌​‌‌‌‍‌​‌‍‍‌‌﻿‌​‌‍﻿﻿‌﻿​‍​‍​‍​‍﻿​​‍​‍‌﻿‌﻿‌‍‍‌‌‍‌​‌‍‌﻿‌‍‌‌‌﻿‌​‌​﻿‍‌‍​‌‌‍﻿‌‌‍‌‌‌﻿​﻿‌﻿​​‌‍​‌‌‍​﻿‌‍‌‌​‍​‍​﻿‍‍​‍​‍‌‍​‍‌﻿‌‌‌‍‍‌‌‍﻿​‌﻿‌​‌‍‍‌‌‍﻿‍​‍​‍‌﻿﻿‌​‍﻿​​‍​‍‌‍‌‍‌‍‍‌‌‍‌‌‌‍﻿​‌‍‌​‌‌‌​‌﻿‍‌‌﻿​​‌‍‌‌​‍​‍​﻿‍‍​‍​‍‌‌​‍‌‍‍‌‌‍​﻿‌‍‍​‌‌‌​‌‍‌‌‌﻿‍​‌﻿‌​​‍​‍‌﻿﻿‌‌﻿﻿‌
```

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/observability/ai-sdk-observability), [Bring Your Own Key](https://vercel.com/docs/ai-gateway#bring-your-own-key) support, and intelligent provider routing with automatic retries.

Learn more about [AI Gateway](https://vercel.com/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/kimi-k2.5).