---
title: "GPT-6.1 Sol now available on AI Gateway"
source: "https://vercel.com/changelog/gpt-6-1-sol-now-available-on-ai-gateway"
publishedDate: "2026-09-29"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[GPT-6.1 Sol](https://vercel.com/ai-gateway/models/gpt-6.1-sol) from OpenAI is now available on AI Gateway. It improves on GPT-6 Sol for coding, computer use, and professional work, including reading complex documents and carrying out multi-step workflows.

The model is suited to agents that need to debug code, work through business tasks, or extract answers from PDFs with tables and charts. It also improves factual accuracy on difficult questions. Its standard input and output pricing is lower than GPT-6 Astra's, while cheaper cached input makes it useful for requests that reuse a long shared context.

Use `openai/gpt-6.1-sol` as the model name with the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), [OpenAI-compatible Chat Completions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), or [Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses). You can also select it in [coding agents](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway:

To use the model in coding agents like Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Then select `openai/gpt-6.1-sol` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try GPT-6.1 Sol in the [playground](https://vercel.com/ai-gateway/models/gpt-6.1-sol) and learn more about the [GPT-6 model family](https://vercel.com/i/what-is-gpt-6).