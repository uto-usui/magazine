---
title: "Qwen 3.8 Max 0902 now available on AI Gateway"
source: "https://vercel.com/changelog/qwen-3-8-max-0902-now-available-on-ai-gateway"
publishedDate: "2026-09-01"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Qwen 3.8 Max 0902 from Alibaba](https://vercel.com/ai-gateway/models/qwen3.8-max-0902) is now available on AI Gateway.

This is a new snapshot of Qwen 3.8 Max, with the gains concentrated in coding on larger projects, long-horizon work that runs without supervision, and agent runs. Vision handling is more accurate on charts and dense documents.

To use Qwen 3.8 Max 0902, set `model` to `alibaba/qwen3.8-max-0902`:

The dated ID pins this snapshot, so a later release will not change what your requests run against.

To move existing traffic onto it without a code change, add a rewrite [routing rule](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules). The gateway substitutes the destination transparently, so an application that still asks for `alibaba/qwen3.8-max` runs on the new snapshot:

```
vercel ai-gateway rules add --type rewrite \  --source alibaba/qwen3.8-max \  --destination alibaba/qwen3.8-max-0902
```

To use it in a coding agent, see the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents), then run `vercel ai-gateway coding-agents setup` to connect agents like Claude Code, Codex, OpenCode, Cursor, Pi, and more and select `alibaba/qwen3.8-max-0902`.

Try Qwen3.8-Max-0902 in the [model playground](https://vercel.com/ai-gateway/models/qwen3.8-max-0902).

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.