---
title: "GPT-6.1 Terra now available on AI Gateway"
source: "https://vercel.com/changelog/gpt-6-1-terra-now-available-on-ai-gateway"
publishedDate: "2026-10-26"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[GPT-6.1 Terra](https://vercel.com/ai-gateway/models/gpt-6.1-terra) from [OpenAI](https://vercel.com/ai-gateway/models/providers/openai) is now available on [AI Gateway](https://vercel.com/ai-gateway).

GPT-6.1 Terra is a fast model for visual reasoning, computer use, and writing, and it improves on the previous Terra model in visual reasoning, factual accuracy, and coding. It suits high-volume work in documents and desktop apps, such as filling out forms, interpreting technical drawings, or entering invoice details into accounting software. OpenAI still recommends its larger GPT-6 models for the most complex coding tasks.

The model accepts text and images and returns text, with a context window of more than 1M tokens. It supports configurable [reasoning effort](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning), [structured outputs](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs), tool calling, and implicit and explicit [prompt caching](https://vercel.com/docs/ai-gateway/models-and-providers/automatic-caching). For latency-sensitive work, [fast mode](https://vercel.com/docs/ai-gateway/models-and-providers/fast-mode) is available as `openai/gpt-6.1-terra-fast`.

GPT-6.1 Terra works with the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), the [OpenAI-compatible Chat Completions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), the [Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), and [coding agents](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway. Use `openai/gpt-6.1-terra` as the model name:

To use it in Codex, Cursor, and more, install the latest Vercel CLI and run setup:

```
npx vercel ai-gateway setup
```

Then select `openai/gpt-6.1-terra` in the agent. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for details.

Try GPT-6.1 Terra in the [model playground](https://vercel.com/ai-gateway/models/gpt-6.1-terra).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.