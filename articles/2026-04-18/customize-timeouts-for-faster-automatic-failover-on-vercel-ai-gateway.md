---
title: "Customize timeouts for faster automatic failover on Vercel AI Gateway"
source: "https://vercel.com/changelog/provider-level-custom-timeouts-for-faster-fail-over-on-ai-gateway"
publishedDate: "2026-03-05"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

1 min read

Mar 5, 2026

AI Gateway now supports per-inference [provider](https://vercel.com/docs/ai-gateway/models-and-providers) timeouts for faster failover than the provider default. If a provider doesn't start responding within your configured timeout, AI Gateway aborts the request and falls back to the next available provider.

Provider timeouts are available in beta for BYOK (Bring Your Own Key) credentials only, with support for system provider timeouts coming soon. Note that some providers don't support stream cancellation, so you may still be charged for timed-out requests depending on the provider.

**Basic usage**

Set timeouts per provider in milliseconds using `providerTimeouts` in `providerOptions.gateway`.

```
/* In this example, the BYOK credentials for GPT 5.4 would timeout   after 15 seconds and fallback to system credentials. */const result = streamText({  model: 'openai/gpt-5.4',  prompt,  providerOptions: {    gateway: {      providerTimeouts: {        byok: { openai: 15000 }, // 15 seconds      },    },  },});
```

**Advanced usage with multiple providers and failover**

Use with `order` to control both the provider sequence and failover speed.

```
/* This example tries Anthropic first with a 10-second timeout, falls back to Bedrock   with 15 seconds, then Vertex with the default gateway timeout. */const result = streamText({  model: 'anthropic/claude-sonnet-4.6',  prompt,  providerOptions: {    gateway: {      order: ['anthropic', 'bedrock', 'vertex'],      providerTimeouts: {        byok: {          anthropic: 10000,          bedrock: 15000,        },      },    },  },});
```

This example tries Anthropic first with a 10-second timeout, falls back to Bedrock with 15 seconds, then Vertex with the default gateway timeout.

  
For more information, read the custom provider timeouts [documentation](https://vercel.com/docs/ai-gateway/models-and-providers/provider-timeouts).