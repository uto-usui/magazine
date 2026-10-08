---
title: "Nano Banana 2.1 now available on AI Gateway"
source: "https://vercel.com/changelog/nano-banana-2-1-now-available-on-ai-gateway"
publishedDate: "2026-10-06"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Nano Banana 2.1](https://vercel.com/ai-gateway/models/gemini-nano-banana-2.1) from [Google](https://vercel.com/ai-gateway/models/providers/google) is now available on [AI Gateway](https://vercel.com/ai-gateway). It improves image generation and editing over earlier Nano Banana models.

This release targets product recontextualization, mask- and ink-based editing, and factuality. Product recontextualization places an existing product in a new scene. Mask- and ink-based edits change only the region marked by a mask or by strokes drawn on the image. Factuality is how accurately images depict real-world subjects.

The model renders photorealistic skin tones, intricate materials, sharp lighting, and coherent backgrounds at the latency and cost of a Flash-tier model.

Call it through the [AI SDK](https://vercel.com/docs/ai-gateway/modalities/image-generation/ai-sdk) or the OpenAI-compatible [Chat Completions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation), or the [AI CLI](https://github.com/vercel-labs/ai-cli). AI CLI is an open-source command-line tool from Vercel Labs for generating text, images, video, and audio from your terminal. It runs on AI Gateway, so any Gateway model ID works with -m.

Use `google/gemini-nano-banana-2.1` as the model name. Generated images are returned in `result.files`:

Try Nano Banana 2.1 in [imagen.sh](https://imagen.sh/), or the [model playground](https://vercel.com/ai-gateway/models/gemini-nano-banana-2.1).

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

You can view [all image models](https://vercel.com/ai-gateway/models?type=image) available on AI Gateway.