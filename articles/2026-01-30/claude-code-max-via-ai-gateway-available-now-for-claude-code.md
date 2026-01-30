---
title: "Claude Code Max via AI Gateway, available now for Claude Code"
source: "https://vercel.com/changelog/claude-code-max-via-ai-gateway-available-now-for-claude-code"
publishedDate: "2026-01-26"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jan 26, 2026

[AI Gateway](https://vercel.com/ai-gateway) now supports the Claude Code Max subscription for the Claude Code CLI. This allows developers to use their existing subscription on Anthropic models with no additional cost while getting unified observability, usage tracking, and monitoring through Vercel’s platform.

### [Link to heading](#setup)Setup

Set up your environment variables in your shell configuration file (`~/.zshrc` or `~/.bashrc`)

```
export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh"export ANTHROPIC_CUSTOM_HEADERS="x-ai-gateway-api-key: Bearer your-ai-gateway-api-key"
```

Replace `your-ai-gateway-api-key` with your actual AI Gateway API key.

### [Link to heading](#start-claude-code)Start Claude Code

```
claude
```

### [Link to heading](#log-in-with-your-claude-subscription)Log in with your Claude subscription

If you're not already logged in, Claude Code will prompt you to authenticate. Choose **Option 1 - Claude account with subscription** and log in with your Anthropic account.

If you encounter issues, try logging out with `claude /logout` and logging in again.

Your Claude Code requests now route through AI Gateway, giving you full visibility into usage patterns and costs while using your Max subscription.

### [Link to heading](#how-it-works)How it works

When you configure Claude Code to use AI Gateway, Claude Code continues to authenticate with Anthropic. It sends its `Authorization` header and AI Gateway acts as either a passthrough proxy to Anthropic or, when it needs to fall back, a router to other providers.

Since the `Authorization` header is reserved for Claude subscription credentials, AI Gateway uses a separate header `x-ai-gateway-api-key` for its own authentication. This allows both auth mechanisms to coexist.

Read more about how to configure Claude Code Max with AI Gateway in the [docs](https://vercel.com/docs/ai-gateway/coding-agents/claude-code#with-claude-code-max).