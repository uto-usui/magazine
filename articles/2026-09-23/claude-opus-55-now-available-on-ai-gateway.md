---
title: "Claude Opus 5.5 now available on AI Gateway"
source: "https://vercel.com/changelog/claude-opus-5-5-now-available-on-ai-gateway"
publishedDate: "2026-09-22"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[Claude Opus 5.5](https://vercel.com/ai-gateway/models/claude-opus-5.5) from [Anthropic](https://vercel.com/ai-gateway/models/providers/anthropic) is now available on [AI Gateway](https://vercel.com/ai-gateway). It is a step-change improvement over [Opus 5](https://vercel.com/ai-gateway/models/claude-opus-5), with its biggest gains in agentic coding, long-running agent tasks, and knowledge work. Anthropic cites that Opus 5.5 performs at the level of Fable 5.1, but ~30% faster and ~40% cheaper than Opus 5 per task.

Opus 5.5 is also a better collaborator over long runs. It reports back in plain language on what it did, what it found, and what it needs next, making it easier to supervise work that spans many steps or takes place over a longer period.

Opus 5.5 includes two API changes that can turn previously valid requests into HTTP 400 errors:

-   **Thinking is always adaptive.** Requests that disable thinking or set a fixed thinking budget are rejected. The model decides how much to think for each request. Use effort and prompting to steer its thinking behavior.
    
-   **Forced tool use is retired.** Requests cannot require a tool call or force a specific tool. Prompt the model toward the tool, then catch and retry misses in your harness. If you previously forced a tool call to return JSON, use structured outputs instead.
    

Use `anthropic/claude-opus-5.5` across the [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk), [OpenAI-compatible Chat Completions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [Anthropic Messages API](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), and [coding agents](https://vercel.com/docs/ai-gateway/coding-agents) connected to AI Gateway. You can also enable [fast mode](https://vercel.com/docs/ai-gateway/models-and-providers/fast-mode) with the gateway `speed` option r `anthropic/claude-opus-5.5-fast`. The model has a 1M-token context window, returns up to 128K tokens, and has a June 2026 knowledge cutoff.

### [Copy link to heading](#regional-inference-and-zero-data-retention)Regional inference and Zero Data Retention

[Regional inference](https://vercel.com/docs/ai-gateway/security-and-compliance/regional-inference) and [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) are opt-in request controls. This example pins inference to the US and ZDR:

```
const regionalResult = streamText({  model: 'anthropic/claude-opus-5.5',  prompt: 'Summarize this internal document.',  providerOptions: {    gateway: {      inferenceRegion: { scope: 'zone', geoRegion: 'us' },      zeroDataRetention: true,    },  },});
```

### [Copy link to heading](#use-opus-5.5-in-coding-agents)Use Opus 5.5 in coding agents

Install the latest [Vercel CLI](https://vercel.com/docs/cli) and connect your supported coding agents to AI Gateway:

```
npm i -g vercel@latestvercel ai-gateway setup
```

Then select `anthropic/claude-opus-5.5` in the agent. In [Claude Code](https://vercel.com/docs/ai-gateway/coding-agents/claude-code), use `/fast` to toggle fast mode for the session. See the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents) for other agent-specific instructions.

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Try [Claude Opus 5.5 in the model playground](https://vercel.com/ai-gateway/models/claude-opus-5.5), or [view all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.