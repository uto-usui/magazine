---
title: "AI Gateway support for Claude Code"
source: "https://vercel.com/changelog/ai-gateway-support-for-claude-code"
publishedDate: "2026-01-05"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jan 5, 2026

You can now use Claude Code through [Vercel AI Gateway](https://vercel.com/ai-gateway) via its Anthropic-compatible API endpoint.

Route Claude Code requests through AI Gateway to centralize usage and spend, view traces in observability, and benefit from failover between providers for your model of choice.

Log out if you're already logged in, then set these environment variables to configure Claude Code to use AI Gateway:

```
claude /logoutexport ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh"export ANTHROPIC_AUTH_TOKEN="your-ai-gateway-api-key"export ANTHROPIC_API_KEY=""
```

Setting `ANTHROPIC_API_KEY` to an empty string is required. Claude Code checks this variable first, and if it's set to a non-empty value, it will use that instead of `ANTHROPIC_AUTH_TOKEN`.

Start Claude Code. Requests will route through AI Gateway:

```
claude
```

See the [Claude Code documentation](https://vercel.com/docs/ai-gateway/claude-code) for details.