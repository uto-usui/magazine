---
title: "Use AI Gateway with Clawdbot"
source: "https://vercel.com/changelog/use-ai-gateway-with-clawdbot"
publishedDate: "2026-01-24"
category: "frontend"
feedName: "Vercel"
author: "Timo Lins"
---

1 min read

Jan 24, 2026

Clawdbot is a personal AI assistant powered by Claude with persistent memory. It can browse the web, run shell commands, and manage files across any operating system.

You can use Clawdbot with Vercel AI Gateway to access hundreds of models from multiple providers through a single endpoint. AI Gateway provides unified API access across models without managing separate API keys.

Create an API key in the AI Gateway dashboard, then install Clawdbot:

```
curl -fsSL https://install.clawdbot.com# ornpm install -g clawdbot
```

Run the onboarding wizard:

```
clawdbot onboard --install-daemon
```

Select Vercel AI Gateway as your provider and enter your AI Gateway API key.

You can then choose from hundreds of available models. Your AI assistant is now running and ready to help with tasks across your system.

See the [AI Gateway docs](https://vercel.com/docs/ai-gateway/chat-platforms/clawd-bot) for more details on Clawdbot and more integrations.