---
title: "Claude Fable 5.1 now available on AI Gateway"
source: "https://vercel.com/changelog/claude-fable-5-1-now-available-on-ai-gateway"
publishedDate: "2026-09-01"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Claude Fable 5.1 from Anthropic](https://vercel.com/ai-gateway/models/claude-fable-5.1) is now available on AI Gateway.

Fable 5.1 improvements compared to previous Claude models are concentrated in long, multi-stage work like agentic coding, knowledge work, and research that takes several rounds of searching and following up.

Anthropic ships Fable 5.1 with cybersecurity and biology safety classifiers enabled. Finding vulnerabilities in source code is allowed, but some routine coding and debugging may still be refused. To ensure requests are still serviced when the safety classifiers are triggered, use [model fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks).

Add a `models` array to `providerOptions.gateway` listing the models to try. AI Gateway sends the request to Fable 5.1 first, and if Anthropic refuses it, works down the array in order and returns the response from the first model that succeeds:

This request falls back to Opus 5, then Sonnet 5, if a safety classifier is triggered. The same `models` option works on every AI Gateway API format, including Chat Completions, Messages, and OpenAI Responses.

Try Fable 5.1 in the [model playground](https://vercel.com/ai-gateway/models/claude-fable-5.1).

To use it in a coding agent, see the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents), then run `vercel ai-gateway coding-agents setup` to connect agents like Claude Code, Codex, OpenCode, Cursor, Pi, and more and select `anthropic/claude-fable-5.1` inside the agent.

Anthropic does not support Zero Data Retention for Fable 5.1. Prompts and completions are retained for 30 days and are not used to train Claude.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.