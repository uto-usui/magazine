---
title: "LiteLLM server now supported on Vercel"
source: "https://vercel.com/changelog/litellm-server-now-supported-on-vercel"
publishedDate: "2026-03-16"
category: "frontend"
feedName: "Vercel"
author: "Elvis Pranskevichus"
---

1 min read

Mar 16, 2026

You can now deploy LiteLLM server on Vercel, giving developers LLM access with an OpenAI-compatible gateway connecting to any supported provider, including Vercel AI Gateway.

app.py

```
from litellm.proxy import proxy_serverapp = proxy_server.app
```

Basic LiteLLM Gateway app

To route a single model through Vercel AI Gateway, use the below configuration in `litellm_config.yaml`:

litellm\_config.yaml

```
  - model_name: gpt-5.4-gateway    litellm_params:      model: vercel_ai_gateway/openai/gpt-5.4      api_key: os.environ/VERCEL_AI_GATEWAY_API_KEY
```

Routing a model through Vercel AI Gateway in LiteLLM

Deploy [LiteLLM on Vercel](https://app.contentful.com/spaces/e5382hct74si/entries/45WCTJSiC4oVkbxnp12zsG) or learn more on our documentation