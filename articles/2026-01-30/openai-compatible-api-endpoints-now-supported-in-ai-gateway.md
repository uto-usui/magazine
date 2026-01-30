---
title: "OpenAI-compatible API endpoints now supported in AI Gateway"
source: "https://vercel.com/changelog/openai-compatible-api-endpoints-now-supported-in-ai-gateway"
publishedDate: "2025-07-21"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman"
---

1 min read

Jul 21, 2025

You can now use OpenAI-compatible client libraries and tools with AI Gateway through a simple URL change, allowing you to access 100s of models with no code rewrites required.

Here is a Python example with the OpenAI client library:

```
from openai import OpenAIclient = OpenAI(    api_key='my-ai-gateway-key',    base_url='https://ai-gateway.vercel.sh/v1')stream = client.chat.completions.create(    model='anthropic/claude-4-sonnet',    messages=[        {            'role': 'user',            'content': 'Write a one-sentence bedtime story about a unicorn.'        }    ],    stream=True,)for chunk in stream:    content = chunk.choices[0].delta.content if chunk.choices[0].delta.content else None    if content:        print(content, end='', flush=True)print()
```

This makes it easy to keep your current tools and workflows while improving uptime, tokens per minute, quotas, and reliability via provider failover and adding observability through the AI Gateway.

Learn more in the [AI Gateway docs](https://vercel.com/docs/ai-gateway/openai-compat) and see [more examples here](https://vercel.com/docs/ai-gateway/openai-compat#openai-client-libraries).