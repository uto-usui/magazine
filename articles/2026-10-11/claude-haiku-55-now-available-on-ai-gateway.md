---
title: "Claude Haiku 5.5 now available on AI Gateway"
source: "https://vercel.com/changelog/claude-haiku-5-5-now-available-on-ai-gateway"
publishedDate: "2026-10-07"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Claude Haiku 5.5](https://vercel.com/ai-gateway/models/claude-haiku-5.5) from Anthropic is now available on [AI Gateway](https://vercel.com/ai-gateway).

Haiku 5.5 is built for high-volume, cost-sensitive tasks such as summarization, context compaction, database queries, and classification. It can also handle coding subtasks alongside larger Claude models. It's the fastest Claude model at standard speed, making it useful for latency-sensitive applications such as live customer support and browser automation.

It's also the first Haiku model with [adjustable effort](https://platform.claude.com/docs/en/build-with-claude/effort). Choose `low`, `medium`, `high`, `xhigh`, or `max` to balance response quality, latency, and token usage. Adaptive thinking is enabled by default. You can disable thinking at `low`, `medium`, or `high`; `xhigh` and `max` require it.

Haiku 5.5 supports [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) on AI Gateway. Its biology and cybersecurity safeguards may cause it to decline some requests.

Use `anthropic/claude-haiku-5.5` as the model ID in the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), [compatible APIs](https://vercel.com/docs/ai-gateway/sdks-and-apis), or [coding agents](https://vercel.com/docs/ai-gateway/coding-agents). Set `AI_GATEWAY_API_KEY` for the API examples below. The AI SDK example requires version 7 or later.

To use it in Claude Code, Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Try Haiku 5.5 in the [model playground](https://vercel.com/ai-gateway/models/claude-haiku-5.5). If you’re upgrading from Haiku 4.5, review [Anthropic’s migration guide](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide) for changes to thinking and request parameters.