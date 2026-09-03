---
title: "Gemini 3.8 Flash now available on AI Gateway"
source: "https://vercel.com/changelog/gemini-3-8-flash-now-available-on-ai-gateway"
publishedDate: "2026-09-02"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Gemini 3.8 Flash from Google](https://vercel.com/ai-gateway/models/gemini-3.8-flash) is now available on AI Gateway.

The model is 50% off through December 31st. It has a 1M token context window, accepts text, image, PDF, and video input, returns text, and supports tool calling and web search. Maximum output is 65,536 tokens.

Gemini 3.8 Flash improves on prior Flash models at software engineering, agent work, and multi-step reasoning, at the same speed and cost as the previous release. Thinking is on by default.

To use Gemini 3.8 Flash, set `model` to `google/gemini-3.8-flash`:

To use it in a coding agent, see the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents), then run `vercel ai-gateway coding-agents setup` to connect agents like Claude Code, OpenCode, Cursor, Pi, and more and select `google/gemini-3.8-flash` inside the agent.

Try Gemini 3.8 Flash in the [model playground](https://vercel.com/ai-gateway/models/gemini-3.8-flash).

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.