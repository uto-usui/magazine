---
title: "Opus 4.6 Fast Mode available on AI Gateway"
source: "https://vercel.com/changelog/opus-4-6-fast-mode-available-on-ai-gateway"
publishedDate: "2026-04-07"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Apr 7, 2026

Fast mode support for Claude Opus 4.6 is now available on AI Gateway.

Fast mode is a premium high-speed option that delivers 2.5x faster output token speeds with the same model intelligence. This is an early, experimental feature.

Fast mode's increased output token speeds enable new use cases, especially for human-in-the-loop workflows. Run large coding tasks without needing to context switch and get planning results without extended waits.

To enable fast mode, pass `speed: 'fast'` in the `anthropic` provider options in AI SDK:

```
import { streamText } from "ai";const { text } = await streamText({  model: 'anthropic/claude-opus-4.6',  prompt:   `Analyze this codebase structure and create a step-by-step plan    to add user authentication.`,  providerOptions: {    anthropic: {      speed: 'fast',    },  },});
```

You can use fast mode with [Claude Code via AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api#configuring-claude-code) by setting the `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK` variable in your shell configuration file or in `~/.claude/settings.json`.

```
export CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1
```

```
{  "env": {    "CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK": "1"  }}
```

Try fast mode directly in the [AI Gateway playground for Opus 4.6](https://vercel.com/ai-gateway/models/claude-opus-4.6).

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3b7Pw7DYHqiPCWgP7kcDV3%2F4aa9e8ce7ee404b029207b0745bc0315%2FCleanShot_2026-04-07_at_15.15.00_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2whcW35pDRTDZtTjB5QcJd%2F085466a69e0e9e8e018221c85712558c%2FCleanShot_2026-04-07_at_15.15.13_2x.png&w=1920&q=75)

Fast mode is priced at 6x standard Opus rates.

Standard

Fast Mode

Input: $5 / 1M tokens  
Output: $25 / 1M tokens

Input: $30 / 1M tokens  
Output: $150 / 1M tokens

All standard pricing multipliers (e.g., prompt caching) apply on top of these rates.

[

**AI Gateway: Track top AI models by usage**

The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

View the leaderboard



](https://vercel.com/ai-gateway/leaderboards)