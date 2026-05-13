---
title: "Fast mode for Opus 4.7 available on AI Gateway"
source: "https://vercel.com/changelog/fast-mode-for-opus-4-7-available-on-ai-gateway"
publishedDate: "2026-05-12"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

May 12, 2026

Fast mode for Claude Opus 4.7 is now available on [AI Gateway](https://vercel.com/ai-gateway) in research preview.

Fast mode delivers ~2.5x faster output token generation with full Opus 4.7 intelligence. This is an early, experimental feature.

To enable fast mode, pass `speed: 'fast'` in the `anthropic` provider options with `anthropic/claude-opus-4.7`.

```
import { streamText } from "ai";const { text } = await streamText({  model: "anthropic/claude-opus-4.7",  prompt: "Analyze this codebase structure and create a plan to add user auth.",  providerOptions: {    anthropic: {      speed: "fast",    },  },});
```

You can use fast mode with [Claude Code via AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api#configuring-claude-code) by setting the `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK` and `CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE` variables in your shell configuration file or in `~/.claude/settings.json`.

```
export CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE=1export CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1
```

```
{  "env": {    "CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK": "1",    "CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE": "1"  }}
```

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